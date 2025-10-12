import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition duration-200 flex flex-col">
      <Link to={`/products/${product._id}`} className="block">
        <div className="w-full h-44 md:h-40 lg:h-44 overflow-hidden rounded-xl mb-3 bg-gray-100">
          <img
            src={product.imageUrl || "/placeholder.png"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      </Link>

      <div className="mt-auto">
        <p className="text-sm text-gray-500">
          {product.category?.name || "Uncategorized"}
        </p>
        <p className="text-indigo-600 font-bold text-lg mb-3">
          KES {Number(product.price).toLocaleString()}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onAdd(product)}
            className="flex-1 bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            Add to Cart
          </button>
          <Link
            to={`/products/${product._id}`}
            className="px-3 py-2 border rounded-xl flex items-center justify-center"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
