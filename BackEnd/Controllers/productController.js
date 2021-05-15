const Product = require("../Models/Product");
const { errorHandler } = require("../Helpers/errorHandler");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

/*****Create a New Product *****/
exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image couldn't be uploaded" });
    }
    //check for all fields
    const { name, description, price, quantity, category, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !quantity ||
      !category ||
      !shipping
    ) {
      return res.status(400).json({ error: "All Fields are required!!" });
    }

    let product = new Product(fields);
    if (files.photo) {
      if (files.photo.size > 3000000) {
        return res
          .status(400)
          .json({ error: "Image Size must be less than 3 MB" });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      res.json({ result });
    });
  });
};

/*****Get All Products *****/
exports.getAllProducts = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 9;

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No Products Found!!",
        });
      }
      res.json(products);
    });
};

/*****Get Product Photo *****/
exports.getProductPhoto = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

/*****Get Products By Search *****/
exports.getProductBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, product) => {
      if (err) {
        return res
          .status(400)
          .json({ err: "Cannot find Products matching your Search Criteria" });
      }
      res.json({ size: product.length, product });
    });
};

/*****Get Related Products *****/
exports.getRelatedProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 4;
  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate("category", "_id name")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No Products Found!!",
        });
      }
      res.json(products);
    });
};

/*****Get All Product Categories *****/
exports.getProductWithSameCategory = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No Categories Found!!",
      });
    }
    res.json(categories);
  });
};

/*****Get Product By Id *****/
exports.getProductById = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({ error: "Product Not Found!!" });
    }
    req.product = product;
    next();
  });
};

/*****Update Product By Id*****/
exports.updateProductById = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image couldn't be uploaded" });
    }
    //check for all fields
    const { name, description, price, quantity, category, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !quantity ||
      !category ||
      !shipping
    ) {
      return res.status(400).json({ error: "All Fields are required!!" });
    }

    let product = req.product;
    product = _.extend(product, fields);
    if (files.photo) {
      if (files.photo.size > 3000000) {
        return res
          .status(400)
          .json({ error: "Image Size must be less than 3 MB" });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      res.json({ result });
    });
  });
};

/*****Delete Product By Id*****/
exports.deleteProductById = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json({
      deletedProduct,
      message: "Product Deleted Successfully",
    });
  });
};
