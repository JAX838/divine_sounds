import React, { useEffect, useState } from "react";
import api from "../utils/api";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const res = await api.get("/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await api.post(
        "/api/categories",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories([...categories, res.data]);
      setName("");
    } catch (err) {
      alert("Error adding category");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      const token = localStorage.getItem("adminToken");
      await api.delete(`/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(categories.filter((c) => c._id !== id));
    } catch (err) {
      alert("Error deleting category");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Manage Categories
        </h1>

        <form onSubmit={handleAdd} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="New category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 border rounded-lg p-2 outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Add
          </button>
        </form>

        {loading ? (
          <p className="text-gray-500 text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-600 text-center">No categories yet.</p>
        ) : (
          <ul className="divide-y">
            {categories.map((c) => (
              <li
                key={c._id}
                className="flex justify-between items-center py-3"
              >
                <span>{c.name}</span>
                <button
                  onClick={() => handleDelete(c._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
