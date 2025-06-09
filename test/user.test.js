// Import necessary modules
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/index"); // Import the Express app
require("dotenv").config();
const User = require("../src/models/user.model");

let token; // Will hold the authentication token after login/registration
let userId; // Will store the user ID after registration

// Connect to the database before running the tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

// Disconnect from the database after all tests are complete
afterAll(async () => {
  await mongoose.connection.close();
});

describe("User API", () => {
  // Define test user data
  const testUser = {
    username: "testuser",
    email: "testuser@example.com",
    password: "Password123!",
    fullName: "Test User",
    bio: "This is a test user."
  };

  // Test user registration endpoint
  it("should register a new user", async () => {
    const res = await request(app).post("/users/register").send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user).toHaveProperty("email", testUser.email);
    token = res.body.token;
    userId = res.body.user._id;
  });

  // Test login endpoint
  it("should login an existing user", async () => {
    const res = await request(app).post("/users/login").send({
      email: testUser.email,
      password: testUser.password
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  // Test get profile endpoint (GET /users/me)
  it("should get user profile", async () => {
    const res = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty("email", testUser.email);
  });

  // Test update profile endpoint (PUT /users/me)
  it("should update user profile", async () => {
    const updatedInfo = {
      fullName: "Updated User",
      bio: "Updated bio."
    };
    const res = await request(app)
      .put("/users/me")
      .set("Authorization", `Bearer ${token}`)
      .send(updatedInfo);
    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty("fullName", updatedInfo.fullName);
  });

  // Test get all users endpoint (GET /users)
  it("should get all users", async () => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.users)).toBe(true);
  });

  // Test delete user endpoint (DELETE /users/:id)
  it("should delete the user", async () => {
    const res = await request(app)
      .delete(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User deleted");
  });
});
