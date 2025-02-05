# Nutrio - A Comprehensive Platform for Nutrition and Fitness

This web application serves as a comprehensive health and wellness platform, addressing the growing need for reliable,
personalized fitness and nutrition information. By integrating nutritious food options, healthy meal recommendations
and customized exercise tips into an easy-to-navigate interface, it empowers users to improve their well-being 
and make healthy living both accessible and practical.

## Key Features:
- Personalized Meal Plans – Tailored recommendations based on dietary preferences and health goals.
- Nutritional Insights – Get food recommendations backed by expert guidance and scientific data.
- Exercise Suggestions – Explore tailored workout plans to complement nutrition.
- Calorie Counter – Track your daily calorie intake seamlessly.
- User Profiles – Enable users to create and update profiles with key information like height, weight, and age for personalized tracking.
- Smart Interactive Search – Look up health topics like “weight loss” and get directed to dedicated pages with structured diet plans.

## Tech Stack Overview:
- Frontend: HTML, CSS, JavaScript , EJS 
- Backend: Node.js, Express.js 
- Database: MongoDB 
- Bcrypt for password encryption

## Setup Instructions

Follow these steps to set up the Nutrio project

### Prerequisites

Make sure you have the following installed:

- Node.js (v14.x or later)
- npm (v6.x or later)
- MongoDB (for local development, or use MongoDB Atlas for cloud-based storage)
  
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
      pass: 'your_email_password', // Your email app password
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
