const { User, Thought } = require('../models');

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('thoughts').populate('friends');
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get a single user by ID
const getSingleUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId }).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Create a user
const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
        res.status(500).json(err);
    }
};

// Add a friend
const addFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        ).populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Remove a friend
const removeFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
};
