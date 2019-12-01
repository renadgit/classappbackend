//import mongoose
const mongoose = require('mongoose');

//assign the schema object
const Schema = mongoose.Schema;

const ParentSchema = new Schema({
    firstName:
    {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    relationship: {
        type: String,
        require: true
    },
    children: {
        type: Array,
        require: true
    },
    classes:{
        type: Array,
        require: true
    }

});

module.exports = Parent = mongoose.model('parent', ParentSchema);