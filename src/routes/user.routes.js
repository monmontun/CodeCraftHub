const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/me", authMiddleware, UserController.getProfile);
router.put("/:username", authMiddleware, UserController.updateProfile);
router.get("/", authMiddleware, UserController.getAllUsers);
router.delete("/:id", authMiddleware, UserController.deleteUser);

module.exports = router;
