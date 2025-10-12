import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 mt-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* 🟣 Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Divine Sounds</h2>
          <p className="text-sm leading-relaxed">
            Your one-stop shop for premium speakers, mixers, microphones,
            amplifiers, and all sound systems. Experience crystal-clear audio
            for every occasion.
          </p>
        </div>

        {/* 🔗 Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-blue-400 transition">
                Products
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-blue-400 transition">
                Services
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* 🌐 Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Connect With Us
          </h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full hover:bg-pink-500 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full hover:bg-sky-400 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full hover:bg-red-600 transition"
            >
              <FaYoutube />
            </a>
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full hover:bg-green-500 transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* 🩶 Divider */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Divine Sounds. All Rights Reserved. Maroots
        did it.
      </div>
    </footer>
  );
}
