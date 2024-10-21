//import mongoose from 'mongoose';
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  thoughts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thought',
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

// Virtual for friend count
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = mongoose.model('User', userSchema);
// export default User;
module.exports = User