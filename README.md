# Auth and Authorization Using Express and Mongoose

This project demonstrates how to implement authentication and authorization in an Express.js
application using Mongoose for MongoDB interactions. It includes routes for user login and 
signup and middleware for role-based access control.

## Features

- User Signup
- User Login
- Role-based Access Control
  - Middleware for authentication
  - Middleware for authorizing student and admin roles

## Installation

1. Clone the repository
    ```bash
    git clone https://github.com/your-username/auth-authorization-express-mongoose.git
    ```

2. Navigate to the project directory
    ```bash
    cd auth-authorization-express-mongoose
    ```

3. Install dependencies
    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add your JWT secret
    ```
    JWT_SECRET=your_jwt_secret
    ```

5. Start the server
    ```bash
    npm start
    ```

## API Endpoints

### Auth Routes

- `POST /login` - Login a user
- `POST /signup` - Signup a new user
- `GET /test` - Test route (requires authentication)
- `GET /student` - Student route (requires student role)
- `GET /admin` - Admin route (requires admin role)

## Middleware

### auth.js

This file contains middleware functions for authentication and role-based authorization.

- **auth**: Verifies the JWT token and attaches the decoded user information to the request object.
- **isStudent**: Checks if the authenticated user has a "Student" role.
- **isAdmin**: Checks if the authenticated user has an "Admin" role.
