const router = require('express').Router();
const { addReaction, deleteReaction } = require('../controllers/reactionController');

// POST route to add a reaction to a thought
// Endpoint: /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// DELETE route to remove a reaction from a thought by reactionId
// Endpoint: /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
