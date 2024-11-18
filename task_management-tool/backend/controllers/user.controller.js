const {validationResult} = require('express-validator')
const User = require('../models/user.model.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {username, email, password, phonenumber} = req.body;

    try {
        let user = await User.findOne({email: email})

        if(user){
            return res.status(400).json({message: 'Email already exists'})
        }

        user = new User({username, email, password, phonenumber})
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        user.password = hashedPassword

        await user.save();
        console.log('New User Created')

        const payload ={user: {id : user.id}}
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '3d'})
        console.log('Token Generated for the new user')
        res.status(201).json({username,email, token})


    } catch (error) {
        console.error(error.message)
        res.status(500).json({message: 'Server Error while creating new user'})
    }
}

exports.loginUser = async (req,res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;

    try {
        const user = await User.findOne({email: email})
        
        if(!user){
            return res.status(400).json({message: 'Invalid Credentials'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message: 'Invalid Credentials'})
        }

        const payload = {user: {id : user.id}}
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '3d'})
        console.log('Token generated for the user')
        res.status(200).json({message: 'Login Success', username: user.username, email: user.email, token})
        console.log('Login Success')
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message: 'Server Error while logging in user'})
    }
}

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
         if (!user) {
            return res.status(404).json({ message: 'User not found' });
         }

         res.json(user);
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message: 'Server Error while fetching user profile'})
    }
}

exports.updateUserProfile = async (req, res) => {

    const {username, email, phonenumber, password} = req.body

    const updatedUser = {}

    if(username) updatedUser.username = username
    if(email) updatedUser.email = email
    if(phonenumber) updatedUser.phonenumber = phonenumber
    if(password) {
        updatedUser.password = await bcrypt.hash(password, 10)
    }
try {
    
    const user = await User.findByIdAndUpdate(req.user.id, { $set: updatedUser }, { new: true }).select('-password');

    res.json(user)
} catch (error) {
    console.error(error.message)
    res.status(500).json({message: 'Server Error while updating user profile'})
}
}