//import express from 'express';
const express = require('express');
//import db from './config/connection.js';
const db = require('./config/connection.js');
//import routes from './routes/index.js';
const routes = require('./routes/index.js');
//import dotenv from 'dotenv';
const dotenv = require('dotenv');
// import { errorHandler } from './middleware/errorHandler.js';
// import { logger } from './middleware/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(logger); // Add logger middleware

// Routes
app.use(routes);

// Error handling middleware
// app.use(errorHandler);

// Connect to MongoDB
db.once('open', () => {
  console.log("Db connected .... ")
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
