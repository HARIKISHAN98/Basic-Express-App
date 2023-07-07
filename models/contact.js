const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    Name:{
        type : String,
        required : true
    },
    phone:{
        type : String,
        required : true
    }
});

const Contact = mongoose.model('Contact',ContactSchema);

module.exports = Contact;

