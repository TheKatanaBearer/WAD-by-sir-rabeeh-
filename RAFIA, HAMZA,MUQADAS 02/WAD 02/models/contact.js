const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({

    fullname: String,
    email: String,
    phone: String,
    productLink: String,
    companyName: String, 
    userType: [String],         // to store the list of checkboxes
    message: String,
    submittedAt: { type: Date , default: Date.now}
});

module.exports = mongoose.model ( 'Contact',contactSchema);