const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    imageUrl: [{ type: String }], //cloudinary will provide the URL
    stock: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    specifications: [
      {
        key: { type: String },
        value: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
