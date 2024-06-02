
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Page = new Schema({
    pageID: {
        type: String,
        required: true,
        unique: true
    },
    bookID: {
        type: String,
        required: true
    },
    pageNumber: {
        type: Number,
        required: true
    },
    frameURL: {
        type: String,
        required: true
    },
    diffURL: {
        type: String,
        required: true
    },
    gradientURL: {
        type: String,
        required: true
    },
    fixURL: {
        type: String,
        required: true
    }
});

// Instance methods
Page.methods.getFrameURL = function() {
    return this.frameURL;
};

Page.methods.getDiffURL = function() {
    return this.diffURL;
};

Page.methods.getGradientURL = function() {
    return this.gradientURL;
};

Page.methods.getFixURL = function() {
    return this.fixURL;
};

Page.methods.isUnderConstruction = function() {
    return this.frameURL.includes('construction') || 
           this.diffURL.includes('construction') || 
           this.gradientURL.includes('construction') || 
           this.fixURL.includes('construction');
};

Page.methods.isTransparent = function() {
    return this.frameURL.includes('transparent') && 
           this.diffURL.includes('transparent') && 
           this.gradientURL.includes('transparent') && 
           this.fixURL.includes('transparent');
};

Page.methods.toString = function() {
    return `Page ${this.pageNumber} of Book ${this.bookID}: 
            Frame URL: ${this.frameURL}, 
            Diff URL: ${this.diffURL}, 
            Gradient URL: ${this.gradientURL}, 
            Fix URL: ${this.fixURL}`;
};

module.exports = mongoose.model('Page', Page);
