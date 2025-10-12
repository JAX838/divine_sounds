import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";

const STATUSES = ["Pending", "Confirmed", "Shipped", "Delivered"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/orders");
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.orders || res.data;
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    setUpdating(orderId);
    try {
      await api.patch(`/api/orders/${orderId}/status`, { status });
      await loadOrders();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to update status");
    } finally {
      setUpdating(null);
    }
  };

  // 🗑️ DELETE ORDER HANDLER
  const handleDeleteOrder = async (orderId, customerName) => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${customerName}'s order?`
      )
    )
      return;

    setDeleting(orderId);
    try {
      await api.delete(`/api/orders/${orderId}`);
      alert("Order deleted successfully!");
      await loadOrders();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to delete order");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Orders</h1>
          <div>
            <Link to="/admin/dashboard" className="text-indigo-600 mr-4">
              ← Dashboard
            </Link>
            <button onClick={loadOrders} className="px-3 py-1 border rounded">
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <div
                key={o.id || o._id}
                className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <h2 className="font-semibold">Order #{o.id || o._id}</h2>
                    <span className="text-sm text-gray-500">
                      · {new Date(o.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 mt-1">
                    <div>
                      <strong>Customer:</strong> {o.customerName}
                    </div>
                    <div>
                      <strong>Phone:</strong> {o.phoneNumber}
                    </div>
                  </div>

                  <div className="mt-2">
                    {o.items.map((it, idx) => (
                      <div key={idx} className="text-sm flex justify-between">
                        <div>
                          {it.productName} x{it.quantity}
                        </div>
                        <div>
                          KES {(it.price * it.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                    <div className="mt-2 font-bold">
                      Total: KES {o.totalAmount.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-64 flex flex-col gap-2">
                  <select
                    value={o.status}
                    onChange={(e) =>
                      handleStatusChange(o.id || o._id, e.target.value)
                    }
                    className="w-full border rounded px-3 py-2"
                    disabled={updating === (o.id || o._id)}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() =>
                      handleStatusChange(o.id || o._id, "Confirmed")
                    }
                    className="w-full bg-indigo-600 text-white py-2 rounded"
                    disabled={
                      o.status === "Confirmed" || updating === (o.id || o._id)
                    }
                  >
                    {updating === (o.id || o._id)
                      ? "Updating..."
                      : "Quick Confirm"}
                  </button>

                  {/* 🗑️ DELETE BUTTON */}
                  <button
                    onClick={() =>
                      handleDeleteOrder(o.id || o._id, o.customerName)
                    }
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                    disabled={deleting === (o.id || o._id)}
                  >
                    {deleting === (o.id || o._id)
                      ? "Deleting..."
                      : "Delete Order"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
