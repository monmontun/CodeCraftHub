// File: src/index.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.routes");

dotenv.config();

const app = express();
app.use(express.json());

// Base route for user-related actions
app.use("/users", userRoutes);

// Export app for testing
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error("MongoDB connection error:", err));
}

module.exports = app;
