const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Author = new Schema({
    authorID: {
        type: String,
        required: true,
        unique: true
    },
    authorName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('author', Author);
