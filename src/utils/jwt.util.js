const jwt = require("jsonwebtoken");

// Generate a JWT token for a user
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token valid for 7 days
  });
};

module.exports = generateToken;
