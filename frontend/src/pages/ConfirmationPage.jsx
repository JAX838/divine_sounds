import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";

export default function ConfirmationPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api
      .get(`/api/orders/${id}`)
      .then((res) => {
        if (!cancelled) setOrder(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => (cancelled = true);
  }, [id]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!order)
    return <p className="text-center mt-8 text-red-500">Order not found.</p>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <h1 className="text-2xl font-bold mb-2">✅ Order Received</h1>
        <p className="text-gray-600 mb-4">
          Order ID: <span className="font-medium">{order.id || order._id}</span>
        </p>

        <div className="text-left space-y-3 mb-4">
          <div>
            <strong>Customer:</strong> {order.customerName}
          </div>
          <div>
            <strong>Phone:</strong> {order.phoneNumber}
          </div>
          <div>
            <strong>Status:</strong> {order.status}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded mb-4">
          <h3 className="font-semibold mb-2">Items</h3>
          {order.items.map((it, idx) => (
            <div key={idx} className="flex justify-between text-sm mb-2">
              <div>
                {it.productName} x{it.quantity}
              </div>
              <div>KES {(it.price * it.quantity).toLocaleString()}</div>
            </div>
          ))}
          <div className="border-t pt-2 text-right font-bold">
            Total: KES {order.totalAmount.toLocaleString()}
          </div>
        </div>

        <p className="text-gray-600">
          A confirmation SMS has been sent to your phone.
        </p>

        <Link
          to="/"
          className="inline-block mt-4 bg-indigo-600 text-white px-6 py-2 rounded-xl"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
