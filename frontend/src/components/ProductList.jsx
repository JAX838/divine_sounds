import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FiBox, FiTag } from "react-icons/fi";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const categoryRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get("/api/products"),
          api.get("/api/categories"),
        ]);

        if (mounted) {
          setProducts(prodRes.data);
          setCategories(catRes.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  const scrollToCategory = (categoryName) => {
    const ref = categoryRefs.current[categoryName];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8" id="top">
      {/* Page Title */}
      <div className="flex items-center justify-center mb-10 gap-3">
        <FiBox className="text-indigo-600 text-3xl" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Our Products
        </h1>
      </div>

      {/* Sticky Category Bar */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm mb-10 py-3">
        <div className="flex overflow-x-auto no-scrollbar gap-3 px-2 justify-start sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => scrollToCategory(cat.name)}
              className="flex-shrink-0 border border-gray-300 text-gray-700 px-5 py-2 rounded-full 
              hover:bg-indigo-600 hover:text-white font-medium transition text-sm md:text-base"
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Loading or No Products */}
      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">
          Loading products...
        </p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        categories.map((cat) => {
          const catProducts = products.filter(
            (p) => p.category?.name === cat.name
          );
          if (catProducts.length === 0) return null;

          return (
            <section
              key={cat._id}
              ref={(el) => (categoryRefs.current[cat.name] = el)}
              className="mb-16"
            >
              {/* Category Header */}
              <div className="flex items-center gap-2 mb-5">
                <FiTag className="text-indigo-600 text-lg" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  {cat.name}
                </h2>
              </div>

              {/* Product Grid */}
              <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {catProducts.map((p, index) => (
                  <motion.div
                    key={p._id}
                    whileHover={{ scale: 1.03 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onClick={() => handleProductClick(p._id)}
                    className="relative bg-white rounded-2xl shadow-sm overflow-hidden group 
                      hover:shadow-md transition cursor-pointer border border-gray-100"
                  >
                    {/* Product Image */}
                    <div className="w-full h-52 bg-gray-50 overflow-hidden flex items-center justify-center">
                      <img
                        src={p.imageUrl || "/placeholder.png"}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-5 text-left relative">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                          {p.name}
                        </h3>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            p.stock > 0
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {p.stock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 mb-1">
                        {p.category?.name || "Uncategorized"}
                      </p>

                      <p className="text-indigo-600 font-bold text-lg mb-3">
                        KES {Number(p.price).toLocaleString()}
                      </p>

                      {/* Add to Cart */}
                      {p.stock > 0 ? (
                        <button
                          onClick={(e) => handleAddToCart(p, e)}
                          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-xl 
                          hover:bg-indigo-700 transition font-medium text-sm
                          sm:opacity-0 sm:group-hover:opacity-100 sm:absolute sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-[90%]
                          block sm:block"
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <button
                          disabled
                          className="w-full bg-gray-200 text-gray-500 px-4 py-2 rounded-xl 
                          cursor-not-allowed font-medium text-sm"
                        >
                          Out of Stock
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
