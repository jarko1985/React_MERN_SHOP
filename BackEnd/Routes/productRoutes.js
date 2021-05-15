const express = require("express");
const productRoutes = express.Router();
const {
  create,
  getAllProducts,
  getProductPhoto,
  getRelatedProducts,
  getProductBySearch,
  getProductWithSameCategory,
  getProductById,
  deleteProductById,
  updateProductById,
} = require("../Controllers/productController");
const {
  isAdmin,
  isAuth,
  requireSignin,
} = require("../Controllers/authController");
const { userById } = require("../Controllers/userController");
const { productById } = require("../Controllers/productController");

productRoutes.get("/", getAllProducts);
productRoutes.get("/photo/:productId", getProductPhoto);
productRoutes.get("/related/:productId", getRelatedProducts);
productRoutes.post("/by/search", getProductBySearch);
productRoutes.get("/same-category", getProductWithSameCategory);
productRoutes.get("/:productId/", getProductById);
productRoutes.post("/create/:userId", requireSignin, isAdmin, isAuth, create);
productRoutes.delete(
  "/:productId/:userId",
  requireSignin,
  isAdmin,
  isAuth,
  deleteProductById
);
productRoutes.put(
  "/:productId/:userId",
  requireSignin,
  isAdmin,
  isAuth,
  updateProductById
);

productRoutes.param("userId", userById);
productRoutes.param("productId", productById);

module.exports = productRoutes;
