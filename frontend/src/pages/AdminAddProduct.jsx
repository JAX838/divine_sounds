import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

export default function AdminAddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [specifications, setSpecifications] = useState([
    { key: "", value: "" },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    api
      .get("/api/categories")
      .then((res) => mounted && setCategories(res.data))
      .catch((err) => console.error(err));
    return () => (mounted = false);
  }, []);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    setImageFile(f);
  };

  const handleSpecChange = (index, field, value) => {
    const updated = [...specifications];
    updated[index][field] = value;
    setSpecifications(updated);
  };

  const handleAddSpec = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
  };

  const handleRemoveSpec = (index) => {
    const updated = specifications.filter((_, i) => i !== index);
    setSpecifications(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!name || !price || !imageFile) {
      setMessage({
        type: "error",
        text: "Name, price and an image are required.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    if (category) formData.append("category", category);
    formData.append("image", imageFile);
    formData.append("specifications", JSON.stringify(specifications));

    try {
      setLoading(true);
      await api.post("/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage({ type: "success", text: "Product added successfully." });
      setTimeout(() => navigate("/admin/products"), 800);
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: err?.response?.data?.message || "Failed to add product.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Add New Product</h1>
          <Link to="/admin/dashboard" className="text-sm text-indigo-600">
            ← Back to dashboard
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
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2"
              rows={3}
            />
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Price (KES)</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Stock</label>
              <input
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                type="number"
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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

          {/* Specifications */}
          <div>
            <label className="block text-sm font-medium">Specifications</label>
            <div className="space-y-2 mt-2">
              {specifications.map((spec, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-center border p-2 rounded-md"
                >
                  <input
                    type="text"
                    placeholder="Key (e.g. Voltage)"
                    value={spec.key}
                    onChange={(e) =>
                      handleSpecChange(index, "key", e.target.value)
                    }
                    className="border rounded px-2 py-1 flex-1"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g. 220V)"
                    value={spec.value}
                    onChange={(e) =>
                      handleSpecChange(index, "value", e.target.value)
                    }
                    className="border rounded px-2 py-1 flex-1"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSpec(index)}
                      className="text-red-500 text-sm hover:text-red-700"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddSpec}
              className="mt-2 text-sm text-indigo-600 hover:underline"
            >
              + Add another specification
            </button>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium">Product Image</label>
            <input
              onChange={handleFileChange}
              type="file"
              accept="image/*"
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              JPEG / PNG recommended. Image will be uploaded to Cloudinary.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              disabled={loading}
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
            >
              {loading ? "Uploading..." : "Add Product"}
            </button>
            <Link to="/admin/products" className="px-4 py-2 border rounded-xl">
              View Products
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
