const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/index"); // Assuming index.js exports your app
const User = require("../src/models/user.model");

let token;
let userId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe("User Management Service", () => {
  const userData = {
    username: "testuser",
    email: "test@example.com",
    password: "password123",
    fullName: "Test User",
    bio: "Test bio"
  };

  it("should register a user", async () => {
    const res = await request(app)
      .post("/users/register")
      .send(userData);

    expect(res.statusCode).toEqual(201);
    expect(res.body.user.email).toBe(userData.email);
    token = res.body.token;
    userId = res.body.user._id;
  });

  it("should login the user", async () => {
    const res = await request(app)
      .post("/users/login")
      .send({ email: userData.email, password: userData.password });

    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it("should get the current user profile", async () => {
    const res = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe(userData.email);
  });

  it("should update the user profile", async () => {
    const updatedBio = { bio: "Updated bio" };

    const res = await request(app)
      .put(`/users/${userData.username}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedBio);

    expect(res.statusCode).toBe(200);
    expect(res.body.user.bio).toBe("Updated bio");
  });

  it("should delete the user", async () => {
    const res = await request(app)
      .delete(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User deleted");
  });
});
