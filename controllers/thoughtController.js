const {Thought, User, Reaction} = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    async getThoughtById({params}, res) {
        try {
            const thought = await Thought.findById(params.thoughtId);
            if (!thought) {
                return res.status(404).json({message: 'No thought found with this id!'});
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    async createThought({params, body}, res) {
        try {
            const thought = await Thought.create(body);
            const user = await User.findByIdAndUpdate(
                params.userId,
                {$push: {thoughts: thought._id}},
                {new: true}
            );
            if (!user) {
                return res.status(404).json({message: 'No user found with this id!'});
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    async updateThought({params, body}, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(params
            .thoughtId, body, {new: true, runValidators: true});
            if (!thought) {
                return res.status(404).json({message: 'No thought found with this id!'});
            }
            res.json(thought);
        }
        catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    async deleteThought({params}, res) {
        try {
            const thought = await Thought.findByIdAndDelete(params.thoughtId);
            if (!thought) {
                return res.status(404).json({message: 'No thought found with this id!'});
            }
            const user = await User.findByIdAndUpdate(
                params.userId,
                {$pull: {thoughts: params.thoughtId}},
                {new: true}
            );
            if (!user) {
                return res.status(404).json({message: 'No user found with this id!'});
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    async addReaction({params, body}, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                params.thoughtId,
                {$push: {reactions: body}},
                {new: true, runValidators: true}
            );
            if (!thought) {
                return res.status(404).json({message: 'No thought found with this id!'});
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    async removeReaction({params}, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                params.thoughtId,
                {$pull: {reactions: {reactionId: params.reactionId}}},
                {new: true}
            );
            if (!thought) {
                return res.status(404).json({message: 'No thought found with this id!'});
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }


};
