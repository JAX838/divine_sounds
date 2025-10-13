import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await api.get("/api/products");
        const allProducts = res.data || [];

        // Basic name/category match
        const results = allProducts.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category?.name?.toLowerCase().includes(query.toLowerCase())
        );

        setProducts(results);
      } catch (err) {
        console.error("Error fetching search results:", err);
      } finally {
        setLoading(false);
      }
    }

    if (query) {
      setLoading(true);
      fetchResults();
    }
  }, [query]);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Search Results for "<span className="text-blue-600">{query}</span>"
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading results...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p, index) => (
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
              {/* Image */}
              <div className="w-full h-52 bg-gray-50 overflow-hidden flex items-center justify-center">
                <img
                  src={p.imageUrl || "/placeholder.png"}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
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

                <p className="text-indigo-600 font-bold text-lg mb-3">
                  KES {Number(p.price).toLocaleString()}
                </p>

                {/* Add to Cart */}
                {p.stock > 0 ? (
                  <button
                    onClick={(e) => handleAddToCart(p, e)}
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-xl 
                    hover:bg-indigo-700 transition font-medium text-sm"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-200 text-gray-500 px-4 py-2 rounded-xl cursor-not-allowed font-medium text-sm"
                  >
                    Out of Stock
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
