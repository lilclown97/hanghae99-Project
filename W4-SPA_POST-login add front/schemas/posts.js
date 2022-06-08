const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    postsId: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
    },
    nickname: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    posts: {
        type: String,
    },
});

module.exports = mongoose.model('Posts', postsSchema);
