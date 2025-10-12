const express = require("express");
const router = express.Router();
const { sendContactMessage } = require("../controllers/mailController");

router.post("/contact", sendContactMessage);

module.exports = router;
