const Category = require("../Models/Catergory");
const { errorHandler } = require("../Helpers/errorHandler");

/*****Create a New Category *****/

exports.createCategory = (req, res) => {
  const newCategory = new Category(req.body);
  newCategory.save((err, cat) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ cat });
  });
};

/*****Get All Categories *****/

exports.getAllCategories = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};

/*****Get Category By Id *****/
exports.getCategoryById = (req, res) => {
  return res.json(req.category);
};

/*****Update Category By Id *****/
exports.updateCategoryById = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json({ data });
  });
};

/*****Delete Category By Id *****/
exports.deleteCategoryById = (req, res) => {
  let category = req.category;
  category.remove((err, deletedCategory) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json({
      deletedCategory,
      message: "Category Deleted Successfully",
    });
  });
};

/*****Helper Method *****/

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({ error: "Category Not Found" });
    }
    req.category = category;
    next();
  });
};
