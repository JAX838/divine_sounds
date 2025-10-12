import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Quick access to product & order management.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            to="/admin/products/new"
            className="block bg-indigo-600 text-white p-4 rounded-xl shadow hover:scale-[1.01] transition"
          >
            ➕ Add Product
          </Link>

          <Link
            to="/admin/products"
            className="block bg-blue-600 text-white p-4 rounded-xl shadow hover:scale-[1.01] transition"
          >
            🛍️ Manage Products
          </Link>

          <Link
            to="/admin/orders"
            className="block bg-green-600 text-white p-4 rounded-xl shadow hover:scale-[1.01] transition"
          >
            📦 Manage Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
