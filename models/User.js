const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  age: { type: Number, required: false, min: 1, max: 150 },
  gender: { type: String, required: false, enum: ['male', 'female', 'other'] },
  dob: { type: Date, required: false },
  weight: { type: Number, required: false, min: 1 }, // Weight in kg must be greater than 0
  height: { type: Number, required: false, min: 0.1 } // Height in meters must be greater than 0
});

// Pre-save hook to hash the password before storing it
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
