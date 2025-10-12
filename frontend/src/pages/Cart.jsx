import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, updateQuantity, removeItem, getTotal } = useCart();
  const navigate = useNavigate();

  const total = getTotal();

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500">Your cart is empty.</p>
          <Link to="/" className="mt-4 inline-block text-indigo-600">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 bg-white p-4 rounded-xl shadow"
              >
                <img
                  src={item.imageUrl || "/placeholder.png"}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-500">
                    KES {Number(item.price).toLocaleString()}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          Math.max(1, (item.quantity || 1) - 1)
                        )
                      }
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <input
                      className="w-14 text-center border rounded"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item._id,
                          Math.max(1, Number(e.target.value || 1))
                        )
                      }
                    />
                    <button
                      onClick={() =>
                        updateQuantity(item._id, (item.quantity || 1) + 1)
                      }
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="ml-4 text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    KES {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <p className="text-gray-600 mb-2">Items: {cart.length}</p>
            <p className="text-2xl font-bold mb-4">
              KES {total.toLocaleString()}
            </p>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-green-600 text-white py-3 rounded-xl"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
