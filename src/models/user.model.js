const mongoose = require("mongoose");

// Define user schema and validation
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Unique username
  email: { type: String, required: true, unique: true }, // Unique email
  password: { type: String, required: true }, // Hashed password
  fullName: String, // Optional full name
  bio: String, // Optional bio
  createdAt: { type: Date, default: Date.now } // Automatically set on creation
});

module.exports = mongoose.model("User", userSchema);
