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
## ⚙️ Environment Variables
Create a .env file in the root directory:

      PORT=3000
      MONGODB_URI=mongodb://localhost:27017/userdb
      JWT_SECRET=your_jwt_secret

Create your JWT secret key

      node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
      
## 📦 Installation & Setup
### Clone and Install
      git clone https://github.com/monmontun/CodeCraftHub.git
      cd CodeCraftHub
      npm install 
### Start the Server
      npm start

## 🐳 Run with Docker
### Build and Run with Docker Compose
      docker-compose up --build

This will:
- Start a MongoDB container
- Build and start the Node.js app container

### Stop Containers
      docker-compose down
### Environment Variables
      Edit .env file for local and docker-compose.yml file for production-safe secrets.

## 🧪 Run Tests
Tests are written using Jest and Supertest.

      npm test
      
## 🔐 API Endpoints
| Method | Endpoint          | Description                 | Auth Required |
| ------ | ----------------- | --------------------------- | ------------- |
| POST   | `/users/register` | Register a new user         | ❌             |
| POST   | `/users/login`    | Authenticate a user         | ❌             |
| GET    | `/users/me`       | Get current user profile    | ✅ Bearer JWT  |
| PUT    | `/users/me`       | Update current user profile | ✅ Bearer JWT  |
| GET    | `/users`          | Get all users               | ✅ Bearer JWT  |
| DELETE | `/users/:id`      | Delete user by ID           | ✅ Bearer JWT  |

## 🧪 Examples of API Testing with cURL
### Register a New User
      curl -X POST http://localhost:3000/users/register \
      -H "Content-Type: application/json" \
      d '{"username": "testuser", "email": "testuser@example.com", "password": "Password123!", "fullName": "Test User", "bio": "This is a test user."}'
### Login User
      curl -X POST http://localhost:3000/users/login \
      -H "Content-Type: application/json" \
      -d '{"email": "testuser@example.com", "password": "Password123!"}'
### Get Current User Profile
      curl -X GET http://localhost:3000/users/me \
      -H "Authorization: Bearer YOUR_JWT_TOKEN"
### Update Current User Profiles
      curl -X PUT http://localhost:3000/users/me \
      -H "Authorization: Bearer YOUR_JWT_TOKEN" \
      -H "Content-Type: application/json" \
      -d '{"fullName": "Updated User", "bio": "Updated bio."}'
### Get all Users
      curl -X GET http://localhost:3000/users \
      -H "Authorization: Bearer YOUR_JWT_TOKEN"
### Delete User
      curl -X DELETE http://localhost:3000/users/USER_ID \
      -H "Authorization: Bearer YOUR_JWT_TOKEN"

## 📦 Docker Compose Overview
      Dockerfile builds the Node.js application.
      MongoDB is run as a service inside Docker.
      Environment variables are injected via .env file or docker-compose environment fields.

## 🔐 Security Notes
- Never commit .env files or sensitive keys to GitHub.
- Use .gitignore to exclude them.
- Inject secrets via Docker, CI/CD environment configs, or vault services in production.

## 📝 License
      MIT License

## 👥 Author
      Aye Mon Tun
