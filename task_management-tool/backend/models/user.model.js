const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,    
        required: true,
        unique: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        match:[/^\S+@\S+\.\S+$/,"Please enter a valid 10 digit phone number"],
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 6,
    },
    phonenumber:{
        type: String,
        required: true,
        match:[/^\d{10}$/,"Please enter a valid 10 digit phone number"]
    }
},{ timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User