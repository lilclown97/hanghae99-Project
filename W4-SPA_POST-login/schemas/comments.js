const mongoose = require('mongoose');

const CommentsSchema = mongoose.Schema({
    postsId: {
        type: Number,
        required: true,
    },
    commentsId: {
        type: Number,
        required: true,
        unique: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    comments: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Comments', CommentsSchema);
