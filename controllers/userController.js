const { User } = require('../models');

module.exports = {
    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // Get a single user by its _id and populated thought and friend data
    async getUserById({ params }, res) {
        try {
            const user = await User.findById(params.userId)
                .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v' });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // Create a new user
    async createUser({ body }, res) {
        try {
            const user = await User.create(body);
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // Update a user by its _id
    async updateUser({ params, body }, res) {
        try {
            const user = await User.findByIdAndUpdate(params.userId, body, { new: true, runValidators: true });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        }
        catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // Delete a user by its _id
    async deleteUser({ params }, res) {
        try {
            const user = await User.findByIdAndDelete(params.userId);
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        }
        catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // Add a new friend to a user's friend list
    async addFriend({ params }, res) {
        try {
            const user = await User.findByIdAndUpdate(
                params.userId,
                { $push: { friends: params.friendId } },
                { new: true, runValidators: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        }
        catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // Remove a friend from a user's friend list
    async removeFriend({ params }, res) {
        try {
            const user = await User.findByIdAndUpdate(
                params.userId,
                { $pull: { friends: params.friendId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        }
        catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
};