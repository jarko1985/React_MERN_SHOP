const User = require("../Models/User");
const jwt = require("jsonwebtoken"); //Generate a Signed token
const expressJWT = require("express-jwt"); //Authorization Check
const { errorHandler } = require("../Helpers/errorHandler");
require("dotenv").config();

exports.signup = (req, res) => {
  const newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    newUser.salt = undefined;
    newUser.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

exports.signin = (req, res) => {
  //Find user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ err: "user with such email doesn't exist...please sign up" });
    }
    //if email is found ==> make sure email and password match
    //create authenticate method in user Model
    if (!user.authenticate(password)) {
      return res.status(401).json({ error: "Email and password dont match" });
    }
    //generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //persist the token as 't'
    res.cookie("t", token, { expire: new Date() + 9999 });
    //return response with user and token to frontend
    const { _id, name, email, role } = user;
    return res.json({ user: { _id, name, email, role }, token });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Sign out Success" });
};

/*****Protecting Routes MiddleWare*****/
exports.requireSignin = expressJWT({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({ error: "Access Denied" });
  }

  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({ error: "Admin Only...Access Denied" });
  }
  next();
};
