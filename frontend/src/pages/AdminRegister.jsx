import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";

export default function AdminRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      await api.post("/api/auth/register", { name, email, password });
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/admin/login"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
          Admin Registration
        </h2>

        {error && (
          <p className="text-red-600 bg-red-50 border border-red-200 rounded p-2 text-sm mb-4 text-center">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-600 bg-green-50 border border-green-200 rounded p-2 text-sm mb-4 text-center">
            {success}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Admin User"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition font-medium"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/admin/login" className="text-indigo-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
