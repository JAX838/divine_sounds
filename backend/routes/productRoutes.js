const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { verifyToken } = require("../middleware/authMiddleware.js");

// public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// admin-ish routes (unprotected for now)
router.post("/", verifyToken, upload.single("image"), addProduct);
router.put("/:id", verifyToken, upload.single("image"), updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;
