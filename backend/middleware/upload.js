const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "e-shop",
    allowedFormats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 1200, crop: "limit" }],
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
