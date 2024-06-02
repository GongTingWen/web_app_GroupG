const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Book = new Schema({
    bookID: {
        type: String,
        required: true,
        unique: true
    },
    bookName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    coverURL: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
        enum: ['choice', 'reward', 'no'] // assuming 'no' means not selected or not in any special state
    }
});

module.exports = mongoose.model('book', Book);
