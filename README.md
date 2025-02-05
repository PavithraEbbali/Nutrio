# Nutrio - A Comprehensive Platform for Nutrition and Fitness

This project proposes a web application that serves as a comprehensive platform for health and wellness. 
It addresses the growing need for reliable, personalized health and fitness information by offering a holistic, 
centralized hub that combines nutritious food options, healthy meal recommendations, and customized exercise tips in one accessible location.
By integrating essential resources into an easy-to-navigate interface, the platform empowers users to improve their health and well-being, 
making healthy living both accessible and practical for everyone

## Setup Instructions

Follow these steps to set up the Nutrio project

### Prerequisites

Make sure you have the following installed:

- Node.js (v14.x or later)
- npm (v6.x or later)

 ### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/PavithraEbbali/Nutrio.git
   ```
2. Install the dependencies:
   ```bash
   npm init -y
   npm install express mongoose body-parser bcrypt express-session ejs
   ```

3. In server.js file , setting up the Nodemailer transporter

To configure a Nodemailer transporter in a Node.js application to send emails.

```
// Send password reset email
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Or another email service
    auth: {
      user: 'your_email@gmail.com', // Your email
      pass: 'your_email_password', // Your email password or app password
    },
  });

```

 ### Running the Application

To start the development server, run:

```sh
node server.js
```
### Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.
