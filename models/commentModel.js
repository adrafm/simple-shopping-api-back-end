const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, 'A comment must have a title'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'A comment must have a content'],
        trim: true
    }
});

module.exports = mongoose.model('Comment', CommentSchema); 
