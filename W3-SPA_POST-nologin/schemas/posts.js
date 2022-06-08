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
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    post: {
        type: String,
    },
    password: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Posts', postsSchema);
