//import mongoose
const mongoose = require('mongoose');

//assign the schema object
const Schema = mongoose.Schema;
//var ClassSchema = new Schema({ classname: String, subjectname: String, childname: String });

const InboxSchema = new Schema({
    title:
    {
        type: String,
    },
    messagebody: {
        type: String,
        require: true
    },
    sender: {
        type: String, 
        require: true,
    },
    receiver: {
        type: String,
        require: true,
    },
    cc:
    {
        type:Array,

    },
    group:{
        type: Array,
    },
    date: {
        type: Date,
        default: Date.now
    },
    replies:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inbox'
    }

});

module.exports = Inbox = mongoose.model('inbox', InboxSchema);