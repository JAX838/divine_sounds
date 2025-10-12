import React, { useEffect, useState } from "react";
import api from "../utils/api";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addItem } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api
      .get("/api/products")
      .then((res) => {
        if (mounted) setProducts(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        🛍️ Our Products
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onAdd={(prod) => addItem(prod, 1)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
