const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const User = require('./models/User'); // Import User model
const nodemailer = require('nodemailer');


const app = express();
const port = 3002;

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '/')));

// MongoDB connection
mongoose
  .connect('mongodb://localhost:27017/nutrio_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));


// Add this middleware to your express app setup
app.use(session({
    secret: 'your-secret-key',  // Change this to a more secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // For development, set secure to false. In production, use HTTPS and set it to true.
}));
  
// Handle signup requests
app.post('/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  try {
    // Check if the exact user (name and email) already exists
    const existingUserWithNameAndEmail = await User.findOne({ name, email });

    if (existingUserWithNameAndEmail) {
      return res.status(400).send('User already exists. Try logging in.');
    }

    // Check if the email alone is already registered
    const existingUserWithEmail = await User.findOne({ email });

    if (existingUserWithEmail) {
      return res.status(400).send('Email already registered. Try logging in.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    req.session.user = { name: newUser.name, email: newUser.email };
    res.redirect('/profile');
  } catch (err) {
    console.log('Error during signup:', err);
    res.status(500).send('An error occurred during signup. Please try again.');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send('Invalid email or password');
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // Set session data for the authenticated user
      req.session.user = { name: user.name, email: user.email };

      // Respond with a success message
      res.status(200).send('Login successful');
    } else {
      // If the passwords don't match
      res.status(400).send('Invalid email or password');
    }
  } catch (err) {
    // Error handling
    console.error(err);
    res.status(500).send('An error occurred during login. Please try again.');
  }
});


// Profile route (GET)
app.get('/profile', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const { name, email } = req.session.user;
  res.render('profile', { name, email, successMessage: '', errorMessage: '' });
});

// Profile route (POST)
app.post('/profile', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const { age, gender, dob, weight, height } = req.body;

  if (!age || !gender || !dob || !weight || !height) {
    return res.render('profile', {
      name: req.session.user.name,
      email: req.session.user.email,
      errorMessage: 'All fields are mandatory to proceed.',
      successMessage: '',
    });
  }

  try {
    await User.updateOne(
      { email: req.session.user.email },
      { $set: { age, gender, dob, weight, height } }
    );

    res.render('profile', {
      name: req.session.user.name,
      email: req.session.user.email,
      successMessage: 'Profile saved successfully!',
      errorMessage: '',
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('An error occurred while saving your profile.');
  }
});


app.get('/updateProfile', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  try {
    // Fetch user details from the database
    const user = await User.findOne({ email: req.session.user.email });

    if (!user) {
      return res.render('updateProfile', {
        user: {},
        successMessage: '',
        errorMessage: 'User data could not be loaded. Please try again later.',
      });
    }

    // Remove 'dob' from the user object to prevent it from being rendered in the view
    const { dob, ...userWithoutDob } = user.toObject();

   

    // Pass user data to the EJS view without 'dob'
    res.render('updateProfile', {
      user: userWithoutDob,  // Pass user data excluding 'dob'
      successMessage: '',
      errorMessage: '',
    });
  } catch (err) {
    console.error(err);
    res.render('updateProfile', {
      user: {},
      successMessage: '',
      errorMessage: 'An error occurred while loading user data.',
    });
  }
});




// POST /updateProfile Route
app.post('/updateProfile', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const { age, weight, height } = req.body;

  try {
    // Prepare update fields
    const updateFields = {
      age: parseInt(age, 10),
      weight: parseFloat(weight),  // Parse weight as float
      height: parseFloat(height),  // Parse height as float
    };

    // Update user in the database
    await User.updateOne(
      { email: req.session.user.email },
      { $set: updateFields }
    );

    // Update session data
    req.session.user.age = age;
    req.session.user.weight = weight;
    req.session.user.height = height;

    // Render the updated profile with success message
    res.render('updateProfile', {
      user: req.session.user,
      successMessage: 'Profile updated successfully!',
      errorMessage: '',
    });

  } catch (err) {
    console.error(err);
    res.render('updateProfile', {
      user: req.session.user,
      successMessage: '',
      errorMessage: 'An error occurred while updating your profile.',
    });
  }
});

app.get('/weightloss', (req, res) => {
  res.sendFile(path.join(__dirname, 'weightloss.html'));
});


// Serve login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Serve signup page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup.html'));
});

// Serve the Forgot Password Page
app.get('/forgot-password', (req, res) => {
  res.sendFile(path.join(__dirname, 'forgot-password.html'));
});

// Serve Reset Password Page
app.get("/reset-password", (req, res) => {
  res.sendFile(path.join(__dirname,  "reset-password.html"));
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});




// Forgot Password Route
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Email not registered" });
    }

    // Send password reset email
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Or another email service
      auth: {
        user: 'your_email@gmail.com', // Your email
        pass: 'your_email_password', // Your email password or app password
      },
    });

    const resetLink = `http://localhost:${port}/reset-password?email=${email}`;
    // Update with your reset link logic
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      html: `<p>Click the link below to reset your password:</p>
             <a href="${resetLink}">Reset Password</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send reset link. Please try again." });
  }
});




// Handle Password Reset Request
app.post("/reset-password", async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.json({ error: "Passwords do not match!" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.updateOne({ email }, { $set: { password: hashedPassword } });

    res.json({ success: true, message: "Password reset successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while resetting the password." });
  }
});

