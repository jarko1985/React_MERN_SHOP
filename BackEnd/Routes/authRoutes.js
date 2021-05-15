const express = require("express");
const userRoutes = express.Router();
const {
  signup,
  signin,
  signout,
  requireSignin,
} = require("../Controllers/authController");
const { userSignupValidator } = require("../Validator");

userRoutes.post("/signup", userSignupValidator, signup);
userRoutes.post("/signin", signin);
userRoutes.get("/signout", signout);

module.exports = userRoutes;
