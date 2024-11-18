const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match:[/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    phonenumber:{
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, "Please enter a valid phone number"]
    },
    password:{
        type: String,
        required: true,
    },
});

const admin = mongoose.model('Admin', AdminSchema);

module.exports = admin;