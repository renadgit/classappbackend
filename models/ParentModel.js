//import mongoose
const mongoose = require('mongoose');

//assign the schema object
const Schema = mongoose.Schema;
//var ClassSchema = new Schema({ classname: String, subjectname: String, childname: String });

const ParentSchema = new Schema({
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