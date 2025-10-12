import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // persist to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = (product, quantity = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p._id === product._id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx].quantity = Math.min(
          (copy[idx].quantity || 0) + quantity,
          999
        );
        return copy;
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prev) => {
      if (quantity <= 0) return prev.filter((p) => p._id !== productId);
      return prev.map((p) => (p._id === productId ? { ...p, quantity } : p));
    });
  };

  const removeItem = (productId) => {
    setCart((prev) => prev.filter((p) => p._id !== productId));
  };

  const clearCart = () => setCart([]);

  const getTotal = () =>
    cart.reduce((s, it) => s + (Number(it.price) || 0) * (it.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
