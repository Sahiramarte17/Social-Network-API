// Import required modules
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes/index.js';  // Import your routes

// Load environment variables from .env file
dotenv.config();

// Create an instance of Express
const app = express();

// Set the port from environment variables or default to 3001
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialnetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use API routes
app.use('/api', routes);

// Home route for testing server
app.get('/', (req, res) => {
  res.send('Welcome to the Social Network API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
