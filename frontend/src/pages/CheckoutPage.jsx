import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../utils/api";

export default function CheckoutPage() {
  const { cart, getTotal, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formatPhone = (raw) => {
    // naive normalization for Kenya numbers like 0712345678 => +254712345678
    let s = raw.trim();
    if (s.startsWith("0")) s = "+254" + s.substring(1);
    if (!s.startsWith("+")) s = "+" + s;
    return s;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!name || !phone || cart.length === 0) {
      setError("Please provide name, phone and at least one cart item.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        customerName: name,
        phoneNumber: formatPhone(phone),
        items: cart.map((i) => ({ product: i._id, quantity: i.quantity })),
      };

      const res = await api.post("/api/orders", payload);
      const order = res.data.order || res.data; // backend may return either shape
      // clear cart
      clearCart();

      // navigate to confirmation; pass order id in URL
      navigate(`/confirmation/${order._id}`, { replace: true });
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        {error && <div className="text-red-600">{error}</div>}

        <div>
          <label className="block text-sm font-medium">Full name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Phone (e.g. 0712345678 or +254712345678)
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Delivery address (optional)
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
            rows={3}
          />
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Order Summary</h3>
          <div className="space-y-2">
            {cart.map((i) => (
              <div key={i._id} className="flex justify-between">
                <div className="text-sm">
                  <div className="font-medium">
                    {i.name} x{i.quantity}
                  </div>
                  <div className="text-gray-500 text-xs">
                    KES {Number(i.price).toLocaleString()}
                  </div>
                </div>
                <div className="font-semibold">
                  KES {(i.price * i.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-right">
            <div className="text-gray-500">Total</div>
            <div className="text-2xl font-bold">
              KES {getTotal().toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={loading}
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition disabled:opacity-60"
          >
            {loading ? "Placing order..." : "Place Order (Pay on Delivery)"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="px-4 py-2 border rounded-xl"
          >
            Back to cart
          </button>
        </div>
      </form>
    </div>
  );
}
