const { Thought } = require('../models');

// Reaction controller methods
const reactionController = {
  // Add a reaction to a thought
  async addReaction(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } }, // Add reaction to the reactions array
        { new: true, runValidators: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought found with this ID!' });
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a reaction by reactionId
  async deleteReaction(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } }, // Remove reaction by reactionId
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought found with this ID!' });
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = reactionController;
