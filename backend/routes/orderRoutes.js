const express = require("express");
const {
  placeOrder,
  getOrders,
  updateOrderStatus,
  getOrderById,
  deleteOrder,
} = require("../controllers/orderController");
const { verifyToken } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/", placeOrder);
router.get("/", verifyToken, getOrders);
router.get("/:id", verifyToken, getOrderById);
router.patch("/:id/status", verifyToken, updateOrderStatus);
router.delete("/:id", verifyToken, deleteOrder);
module.exports = router;
