const express = require("express");
const userRoutes = express.Router();
const {
  userById,
  getUserById,
  updateUserById,
} = require("../Controllers/userController");
const {
  requireSignin,
  isAdmin,
  isAuth,
} = require("../Controllers/authController");

userRoutes.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) =>
  res.json({ user: req.profile })
);

userRoutes.get("/:userId", requireSignin, isAuth, getUserById);
userRoutes.put("/:userId", requireSignin, isAuth, updateUserById);

userRoutes.param("userId", userById);

module.exports = userRoutes;
