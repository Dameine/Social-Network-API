const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: 'You need to leave a username!',
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: 'You need to leave an email!',
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    toObject: {
        virtuals: true
    }
});

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;