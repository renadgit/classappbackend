//import mongoose
const mongoose = require('mongoose');

//assign the schema object
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
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
    classes: {
        type: Array,
        require: true
    }

});

module.exports = Teacher = mongoose.model('teacher', TeacherSchema);