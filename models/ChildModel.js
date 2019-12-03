//import mongoose
const mongoose = require('mongoose');

//assign the schema object
const Schema = mongoose.Schema;

const ChildSchema = new Schema({
    firstname:
    {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
    },
    age:
    {
    type: Number
    },
    groups:{
        type: Array,
        require: true
    },
    class:{
        type: String,
        
    }
});

module.exports = Child = mongoose.model('child', ChildSchema);