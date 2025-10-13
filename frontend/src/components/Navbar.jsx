import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/images/logo.jpeg"
            alt="Divine Sound Systems"
            className="h-10 w-10 object-contain"
          />
          <div>
            <h1 className="font-bold text-lg text-gray-800">
              Divine Sound Systems
            </h1>
            <p className="text-sm text-gray-500 -mt-1">
              Quality Audio Solutions
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <li>
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-blue-600 transition">
              Products
            </Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-blue-600 transition">
              Services
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-600 transition">
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <FiShoppingCart className="mr-2" /> Cart
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-sm"
          >
            <ul className="flex flex-col items-center py-4 space-y-4 font-medium text-gray-700">
              <li>
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-blue-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-blue-600"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-blue-600"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <FiShoppingCart className="mr-2" /> Cart
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
