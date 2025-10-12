const Category = require("../models/Category");
const Product = require("../models/Product");
// GET /api/categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/categories
exports.addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    // duplicate name handling
    if (err.code === 11000) {
      return res.status(400).json({ message: "Category already exists" });
    }
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    // Prevent deletion if products use this category
    const linkedProducts = await Product.countDocuments({ category: id });
    if (linkedProducts > 0) {
      return res
        .status(400)
        .json({ message: "Cannot delete category with associated products" });
    }

    await Category.findByIdAndDelete(id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
