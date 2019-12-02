// Import mongoose
const mongoose = require('mongoose');

// Assign the Schema object
const Schema = mongoose.Schema;

const FeedSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    comments: {
        type: Array,
    },
    tags: {
        type: Array
    },
    image: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    },
    shares: {
        type: Array,
        default: []
    },
    seenBy: {
        type: Array,
        default: "everyone",
    
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = FeedModel = mongoose.model('feeds', FeedSchema);