import React, { useEffect, useState } from "react";
import api, { API_BASE } from "../utils/api";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/products");
      const data = Array.isArray(res.data) ? res.data : res.data.products || [];
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    setDeleting(id);
    try {
      await api.delete(`/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to delete product");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Manage Products</h1>
          <div className="flex gap-3">
            <Link
              to="/admin/products/new"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow"
            >
              ➕ Add Product
            </Link>
            <Link
              to="/admin/dashboard"
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              ← Dashboard
            </Link>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="border rounded-xl shadow-sm hover:shadow-md transition bg-white"
              >
                <img
                  src={p.imageUrl || `${API_BASE}/${p.image}`}
                  alt={p.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h2 className="font-semibold text-lg">{p.name}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {p.description}
                  </p>
                  <div className="mt-2 text-sm text-gray-700">
                    <div>💰 KES {p.price.toLocaleString()}</div>
                    <div>📦 Stock: {p.stock}</div>
                    {p.category && (
                      <div>🏷️ Category: {p.category?.name || "N/A"}</div>
                    )}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleDelete(p._id)}
                      disabled={deleting === p._id}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      {deleting === p._id ? "Deleting..." : "Delete"}
                    </button>

                    <Link
                      to={`/admin/products/edit/${p._id}`}
                      className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
