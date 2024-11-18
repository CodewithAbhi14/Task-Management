const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/user.controller.js");
const { check } = require("express-validator");
const auth = require('../middleware/auth.js')

const router = express.Router();

router.post(
  "/register",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required")
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
    check("phonenumber", "Phone number is required").not().isEmpty(),
  ],
  registerUser
);

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").exists(),
  ],
  loginUser
);

router.get('/profile', auth,getUserProfile)

router.put('/profile', auth,updateUserProfile)

module.exports = router;
