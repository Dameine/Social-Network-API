const {Schema, model} = require('mongoose');

const ReactionSchema = new Schema({
    reactionBody: {
        type: String,
        required: 'You need to leave a reaction!',
        maxlength: 280
    },
    username: {
        type: String,
        required: 'You need to leave a username!'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
{
    toJSON: {
        getters: true
    },
    id: false
});

const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;
