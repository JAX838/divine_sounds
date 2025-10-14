import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { FaWhatsapp, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    api
      .get(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => toast.error("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const handleWhatsAppOrder = () => {
    const phone = "254700497710"; // ✅ Replace with your business number
    const message = encodeURIComponent(
      `Hello! I'm interested in *${
        product.name
      }* (KES ${product.price.toLocaleString()}).\n\nCan you tell me more about availability and delivery?`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading product...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-20">
        <p className="text-gray-500 text-lg">Product not found.</p>
        <Link to="/" className="text-blue-600 underline">
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      {/* Back button */}
      <Link
        to="/products"
        className="inline-flex items-center text-blue-600 mb-8 hover:underline text-sm font-medium"
      >
        <FaArrowLeft className="mr-2" /> Back to Products
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-3xl overflow-hidden grid md:grid-cols-2 gap-8 p-8"
      >
        {/* Product Image */}
        <div className="relative flex items-center justify-center bg-gray-50 rounded-2xl p-4">
          <img
            src={product.imageUrl || "/placeholder.png"}
            alt={product.name}
            className="rounded-2xl max-h-[480px] object-contain"
          />
          <span
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
              product.stock > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-500 text-sm mb-3">
              {product.category?.name || "Uncategorized"}
            </p>
            <p className="text-indigo-600 font-semibold text-2xl mb-6">
              KES {Number(product.price).toLocaleString()}
            </p>

            <p className="text-gray-700 text-base leading-relaxed mb-8">
              {product.description}
            </p>

            {/* ✅ Specifications Section (beautiful, no borders) */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 text-lg mb-4">
                  Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
                  {product.specifications.map((spec, i) => (
                    <div key={i}>
                      <p className="text-gray-500 text-sm">{spec.key}</p>
                      <p className="text-gray-900 font-medium text-base">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ✅ Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            {product.stock > 0 && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex-1 font-semibold text-base shadow-sm transition"
              >
                Add to Cart
              </motion.button>
            )}

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsAppOrder}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl flex-1 font-semibold text-base flex items-center justify-center gap-2 shadow-sm transition"
            >
              <FaWhatsapp className="text-lg" /> Order on WhatsApp
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
