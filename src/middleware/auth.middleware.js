const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Middleware to protect routes and verify JWT
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Ensure token exists and follows 'Bearer' format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user to request (excluding password)
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
