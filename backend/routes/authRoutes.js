const express = require("express");
const { login, registerAdmin } = require("../controllers/authController.js");
const router = express.Router();

// Route for admin registration (one-time setup)
router.post("/register", registerAdmin);
router.post("/login", login);

module.exports = router;
