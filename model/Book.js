const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    theme:{
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    bookmark: {
        type: String,
        default: 'bookmark-off.png'
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

