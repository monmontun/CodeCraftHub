const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Public routes
router.post("/register", UserController.register);
router.post("/login", UserController.login);

// Protected routes
router.get("/me", authMiddleware, UserController.getProfile);       // Get own profile
router.put("/me", authMiddleware, UserController.updateProfile);    // Update own profile
router.get("/", authMiddleware, UserController.getAllUsers);        // Admin: list users
router.delete("/:id", authMiddleware, UserController.deleteUser);   // Admin: delete user

module.exports = router;
