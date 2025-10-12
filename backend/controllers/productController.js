const Product = require("../models/Product");
const Category = require("../models/Category");

// GET /api/products
exports.getProducts = async (req, res) => {
  try {
    // optional filters: ?category=ID, ?featured=true, ?limit=6
    const filter = {};
    if (req.query.category) filter.category = req.query.category;

    if (typeof req.query.featured !== "undefined") {
      const v = String(req.query.featured).toLowerCase();
      filter.featured = v === "true" || v === "1";
    }

    const limit = req.query.limit ? parseInt(req.query.limit, 10) || 0 : 0;

    const query = Product.find(filter).populate("category");
    if (limit > 0) query.limit(limit);

    const products = await query.exec();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/products  (with image upload middleware)
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, specifications } =
      req.body;

    // If category ID provided, ensure it exists
    let categoryId = undefined;
    if (category) {
      const cat = await Category.findById(category);
      if (!cat) return res.status(400).json({ message: "Invalid category ID" });
      categoryId = cat._id;
    }

    const imageUrl =
      req.file?.path || req.file?.secure_url || req.body.imageUrl || "";

    const product = new Product({
      name,
      description,
      price,
      stock,
      category: categoryId,
      imageUrl,
      specifications,
    });

    // ✅ Parse specifications if included
    if (specifications) {
      try {
        product.specifications = JSON.parse(specifications);
      } catch (e) {
        console.warn("Invalid specifications JSON:", e);
      }
    }

    await product.save();
    await product.populate("category");
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/products/:id  (update)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, description, price, stock, category, specifications } =
      req.body;

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;
    if (category !== undefined) product.category = category;

    // ✅ Parse and update specifications
    if (specifications) {
      try {
        product.specifications = JSON.parse(specifications);
      } catch (e) {
        console.warn("Invalid specifications JSON:", e);
      }
    }

    if (req.file) {
      product.imageUrl = req.file.path || req.file.secure_url;
    }

    await product.save();
    await product.populate("category");
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
