import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import api from "../utils/api";
import { Link } from "react-router-dom";
import WhyChooseUsAndServices from "./WhyChooseUsAndServices";
import { useNavigate } from "react-router-dom";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = (product) => {
    if (product.stock <= 0) {
      toast.error("This product is out of stock");
      return;
    }
    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
  };
  const handleViewDetails = (id) => {
    navigate(`/products/${id}`);
  };
  return (
    <>
      <section className="py-16 bg-gray-50" id="featured">
        <div className="container mx-auto px-4 text-center">
          {/* Heading */}
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Featured Products
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6 rounded"></div>
          <p className="text-gray-600 mb-10">
            Discover our top-quality electrical and security products,
            professionally selected for your needs.
          </p>

          {/* Loading skeleton */}
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-white rounded-2xl shadow-md overflow-hidden"
                >
                  <div className="w-full h-52 bg-gray-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <p className="text-gray-500">No featured products available.</p>
          ) : (
            // Product grid
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((p, index) => (
                <motion.div
                  key={p._id}
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="relative bg-white rounded-2xl shadow-md overflow-hidden group cursor-pointer"
                  onClick={() => handleViewDetails(p._id)}
                >
                  {/* Product image */}
                  <div className="w-full h-52 bg-gray-100 overflow-hidden">
                    <img
                      src={p.imageUrl || "/placeholder.png"}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Stock badge */}
                  <div
                    className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full text-white ${
                      p.stock > 0 ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {p.stock > 0 ? "In Stock" : "Out of Stock"}
                  </div>

                  {/* Product details */}
                  <div className="p-4 text-left">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {p.name}
                    </h3>
                    <p className="text-sm text-gray-900 mb-2 font-bold ">
                      {p.category?.name || "Uncategorized"}
                    </p>
                    <p className="text-indigo-600 font-bold text-lg">
                      KES {Number(p.price).toLocaleString()}
                    </p>
                  </div>

                  {/* Add to cart button */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(p);
                    }}
                    whileHover={{ scale: 1.05 }}
                    disabled={p.stock <= 0}
                    className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 px-5 py-2 rounded-xl text-white font-medium transition-opacity duration-300 group-hover:opacity-100 ${
                      p.stock > 0
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-gray-400 cursor-not-allowed"
                    } opacity-0`}
                  >
                    {p.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}

          {/* View all button */}
          {!loading && products.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10"
            >
              <Link
                to="/products"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold transition text-3xl"
              >
                View All Products
              </Link>
            </motion.div>
          )}
        </div>
      </section>
      <WhyChooseUsAndServices />
    </>
  );
}
