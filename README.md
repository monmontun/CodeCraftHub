# 👤 User Management Service

This is a **User Management microservice** built with **Node.js**, **Express**, and **MongoDB** for a personalized online learning platform. It supports user registration, login, profile management, and secure authentication using **JWT**.

## 🚀 Features

- User Registration and Login
- JWT Authentication
- CRUD operations for User Profile
- MongoDB for data storage
- RESTful API design
- Dockerized for containerized deployment

---

## 📁 Project Structure
├── src/
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ └── index.js
├── test/
│ └── user.test.js
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── .gitignore
├── package.json
└── README.md

Installation (local)
1. Clone the repository
   git clone https://github.com/monmontun/CodeCraftHub.git
   cd CodeCraftHub
2. Install dependencies
   # Core dependencies
     npm install express mongoose bcryptjs jsonwebtoken dotenv
   # Dev dependencies
      npm install --save-dev nodemon jest supertest
3. Create .env file
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/userdb
   JWT_SECRET=your_jwt_secret
4. Create your secret key
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
5. Start the Server
   npm start

🐳 Docker Setup
1. Build and Run with Docker Compose
   docker-compose up --build
2. Environment Variables
   Edit .env for local and docker-compose.yml for production-safe secrets.

🔐 API Endpoints
Public
POST /users/register – Register a new user
POST /users/login – Authenticate a user

Protected (Requires JWT)
GET /users/me – Get current user's profile
PUT /users/:username – Update user profile
DELETE /users/:username – Delete a user

🧪 API Testing with cURL
Register
curl -X POST http://localhost:5000/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice123","email":"alice@example.com","password":"SecurePass123"}'

Login
curl -X POST http://localhost:5000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"SecurePass123"}'

Get Profile
curl -X GET http://localhost:5000/users/me \
  -H "Authorization: Bearer <your_jwt_token>"

🧪 Running Tests
npm test
##Tests are written using Jest and Supertest.

📦 Docker Compose Overview
Dockerfile builds the Node.js application.
MongoDB is run as a service inside Docker.
Environment variables are injected via .env file or docker-compose environment fields.

🛡️ Security Best Practices
Never commit .env files or secrets. Use .env.example for sharing variable structure.
In production, use secure JWT secrets and managed MongoDB.

📝 License
MIT License

👥 Authors
Your Name
