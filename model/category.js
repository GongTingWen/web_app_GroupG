const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Category = new Schema({
    categoryID: {
        type: Number,
        required: true,
        unique: true
    },
    categoryName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('category', Category);
