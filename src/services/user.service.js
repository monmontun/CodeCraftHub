const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/jwt.util");

// Register a new user with hashed password
const registerUser = async (data) => {
  const { username, email, password, fullName, bio } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword, fullName, bio });
  await user.save();

  return { user, token: generateToken(user) };
};

// Authenticate user credentials
const loginUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  return { user, token: generateToken(user) };
};

// Get current user's profile
const getUserProfile = async (id) => {
  return await User.findById(id).select("-password");
};

// Update current user's profile
const updateUserProfile = async (id, update) => {
  return await User.findByIdAndUpdate(id, update, { new: true }).select("-password");
};

// Admin route: Get list of all users
const getAllUsers = async () => await User.find().select("-password");

// Admin route: Delete user by ID
const deleteUser = async (id) => await User.findByIdAndDelete(id);

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser
};
