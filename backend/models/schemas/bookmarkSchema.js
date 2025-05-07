const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        default: 'Untitled Bookmark',
    },
    favicon: {
        type: String,
        default: '/favicon.ico',
    },
    summary: {
        type: String,
        default: 'No summary available',
    },
},{
    timestamps: true,
});

module.exports = bookmarkSchema;