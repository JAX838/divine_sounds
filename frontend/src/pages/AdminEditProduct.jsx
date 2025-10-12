import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../utils/api";

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await api.get(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProduct(res.data);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to load product." });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await api.get("/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to load categories");
    }
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    setImageFile(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.name || !product.price) {
      setMessage({ type: "error", text: "Name and price are required." });
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    if (product.category) formData.append("category", product.category);
    if (imageFile) formData.append("image", imageFile);

    try {
      const token = localStorage.getItem("adminToken");
      await api.put(`/api/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage({ type: "success", text: "Product updated successfully!" });
      setTimeout(() => navigate("/admin/products"), 1000);
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: err?.response?.data?.message || "Update failed.",
      });
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!product) return <p className="text-center py-10">Product not found.</p>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Edit Product</h1>
          <Link to="/admin/products" className="text-sm text-indigo-600">
            ← Back to products
          </Link>
        </div>

        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              message.type === "error"
                ? "bg-red-50 text-red-700"
                : "bg-green-50 text-green-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="mt-1 w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              className="mt-1 w-full border rounded px-3 py-2"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Price (KES)</label>
              <input
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                type="number"
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Stock</label>
              <input
                value={product.stock}
                onChange={(e) =>
                  setProduct({ ...product, stock: Number(e.target.value) })
                }
                type="number"
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              value={product.category || ""}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
              className="mt-1 w-full border rounded px-3 py-2"
            >
              <option value="">Uncategorized</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Product Image</label>
            <input
              onChange={handleFileChange}
              type="file"
              accept="image/*"
              className="mt-1"
            />
            {product.image && (
              <img
                src={product.image}
                alt="Current"
                className="mt-3 w-24 h-24 rounded object-cover"
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
