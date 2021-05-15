const express = require("express");
const categoryRoutes = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  categoryById,
} = require("../Controllers/categoryController");
const {
  isAdmin,
  isAuth,
  requireSignin,
} = require("../Controllers/authController");
const { userById } = require("../Controllers/userController");

categoryRoutes.post(
  "/create/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  createCategory
);

categoryRoutes.get("/", getAllCategories);
categoryRoutes.get("/:categoryId", getCategoryById);

categoryRoutes.put(
  "/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  updateCategoryById
);

categoryRoutes.delete(
  "/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  deleteCategoryById
);

categoryRoutes.param("userId", userById);
categoryRoutes.param("categoryId", categoryById);

module.exports = categoryRoutes;
