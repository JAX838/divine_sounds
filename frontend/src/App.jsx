import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/NavBar";
// Pages & Components
import HomePage from "./pages/HomePage";
import ProductList from "./components/ProductList";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import WhyChooseUsAndServices from "./components/WhyChooseUsAndServices";

// Admin Imports
import AdminDashboard from "./pages/AdminDashboard";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";
import AdminLogin from "./pages/AdminLogin";
import AdminCategories from "./pages/AdminCategories";
import AdminEditProduct from "./pages/AdminEditProduct";
import AdminRegister from "./pages/AdminRegister";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import AboutUsSection from "./components/AboutUsSection";
import ContactUs from "./components/ContactUs";
import WhatsAppButton from "./components/WhatsAppButton";
function App() {
  return (
    <CartProvider>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />

        {/* ✅ Global Navbar visible on all pages */}
        <Navbar />

        <main className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public User Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/confirmation/:id" element={<ConfirmationPage />} />
            <Route path="/services" element={<WhyChooseUsAndServices />} />
            <Route path="/about" element={<AboutUsSection />} />
            <Route path="/contact" element={<ContactUs />} />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route path="/admin/products/new" element={<AdminAddProduct />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route
              path="/admin/products/edit/:id"
              element={<AdminEditProduct />}
            />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </Router>
    </CartProvider>
  );
}

export default App;
