//import User from '../models/User.js';
const { User } = require('../models')

// Get all users
 const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    console.log("Data: ", users);
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get a single user
 const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Create a new user
 const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Update a user
 const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Delete a user
 const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Add a friend
 const addFriend = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Remove a friend
 const removeFriend = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};


module.exports = { 
  getUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser, 
  addFriend, 
  removeFriend
}