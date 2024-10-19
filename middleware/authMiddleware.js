import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

// Load environment variables from .env
dotenv.config();

// Middleware function to authenticate the token
export const authenticateToken = (req, res, next) => {
  // Retrieve the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token

  // If no token is found, return a 401 Unauthorized response
  if (!token) return res.status(401).json({ message: 'Access denied, no token provided.' });

  // Verify the token using the secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token.' });

    // Add the user data to the request object and move to the next middleware
    req.user = user;
    next();
  });
};