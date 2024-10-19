const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Reaction schema (used as a subdocument in Thought model)
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId(), // Automatically generates a new ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280, // Reaction character limit
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp), // Use getter to format the date
    },
  },
  {
    toJSON: {
      getters: true, // Enable getters to transform output
    },
    id: false, // Do not include the 'id' field, only '_id'
  }
);

module.exports = reactionSchema;
