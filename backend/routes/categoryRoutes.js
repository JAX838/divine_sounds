const express = require("express");
const router = express.Router();
const {
  getCategories,
  addCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { verifyToken } = require("../middleware/authMiddleware");

// GET /api/categories
router.get("/", getCategories);

// POST /api/categories
router.post("/", verifyToken, addCategory);
router.delete("/:id", verifyToken, deleteCategory);

module.exports = router;
