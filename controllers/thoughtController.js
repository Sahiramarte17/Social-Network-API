// import Thought from '../models/Thought.js';
// import User from '../models/User.js';
const { User, Thought } = require('../models')

// Get all thoughts
 const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().populate('reactions');
    res.json(thoughts);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get a single thought
 const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Create a new thought
 const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
    res.status(201).json(thought);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Update a thought
 const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Delete a thought
 const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json({ message: 'Thought deleted' });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Create a reaction
 const createReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true });
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Delete a reaction
 const deleteReaction = async (req, res) => {
//  console.log("incoming data: ", req.body);
  console.log("incoming params: ", req.params);

  try {
    const thought = await Thought.findByIdAndUpdate(
      { _id: req.params.thoughtId }, 
      { $pull: { reactions: { reactionId: req.params.reactionId }}},
      { new : true}
    );
    res.status(204).json(thought);
  }
  catch(error) {
    console.log("Error: ", error);
    res.status(400).json(error.message);
  }
}

module.exports = {
  getThoughts, 
  getThoughtById, 
  createThought, 
  updateThought, 
  deleteThought,
  createReaction,
  deleteReaction,
}