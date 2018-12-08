const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    postDesc: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String
    },
    imageID: {
        type: String
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    views: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Post', postSchema);