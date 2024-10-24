# Social-Network-API
Welcome to the Social-Network-API! This API provides a comprehensive backend solution for managing a social networking application, enabling features such as user profiles, posts, comments, and friendships.

# Table of Contents
Features
Technologies
Installation
Usage
API Endpoints
Contributing
License

# Features
User registration and authentication
Create, read, update, and delete (CRUD) operations for posts
Commenting on posts
Friend request management and user connections
Real-time data updates with WebSocket support

# Technologies
This API is built using:

Node.js
Express.js
MongoDB
Mongoose
JSON Web Tokens (JWT) for authentication
Socket.IO for real-time communication

# Installation
Clone the repository
Navigate to the project directory
Install the dependencies
Set up your environment variables. Create a .env file in the root directory with the following content
Start the server

# Usage
Once the server is running, you can interact with the API using tools like Postman or curl. Make sure to include your JWT in the authorization header for protected routes.

# API Endpoints
Here are some of the key API endpoints:

# User Routes
POST /api/users - Create a new user
GET /api/users/:userId - Get a user by ID
PUT /api/users/:userId - Update user details
DELETE /api/users/:userId - Delete a user

# Post Routes
POST /api/posts - Create a new post
GET /api/posts - Get all posts
GET /api/posts/:postId - Get a post by ID
PUT /api/posts/:postId - Update a post
DELETE /api/posts/:postId - Delete a post

# Comment Routes
POST /api/posts/:postId/comments - Add a comment to a post
DELETE /api/posts/:postId/comments/:commentId - Delete a comment

# Friend Routes
POST /api/users/:userId/friends/:friendId - Send a friend request
DELETE /api/users/:userId/friends/:friendId - Remove a friend

# Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.

# License
This project is licensed under the MIT License. See the LICENSE file for details.

