// Import necessary packages
const express = require("express"); // Express framework for building APIs
const mongoose = require("mongoose"); // Mongoose ODM to interact with MongoDB
const dotenv = require("dotenv"); // dotenv to load environment variables from .env file
const userRoutes = require("./routes/user.routes"); // Import user route handlers

// Load environment variables from .env file
dotenv.config();

// Create an Express application instance
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Mount user-related API routes under the '/users' path
app.use("/users", userRoutes);

// Define the port from environment variables or use default 5000
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start the server on success
mongoose
  .connect(process.env.MONGODB_URI) // Connect using MongoDB URI from .env
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server once connected to MongoDB
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err)); // Log errors if connection fails

// Export the app for testing purposes
module.exports = app;
