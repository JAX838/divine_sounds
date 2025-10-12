import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../utils/api";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/mail/contact", formData);
      toast.success(res.data.message || "Your message has been sent!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Contact <span className="text-blue-600">Divine Sounds</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We’d love to hear from you! Whether it’s an inquiry about speakers,
            mixers, or full sound system setups — we’re here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-md"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Send Us a Message
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* Contact Information */}
          <div className="bg-blue-600 text-white p-8 rounded-2xl shadow-md flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <div className="space-y-4 text-lg">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-2xl" />
                <p>+254 712 345 678</p>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-2xl" />
                <p>info@divinesounds.co.ke</p>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-2xl" />
                <p>Moi Avenue, Nairobi, Kenya</p>
              </div>
            </div>

            <div className="mt-8">
              <iframe
                title="Divine Sounds Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819181293029!2d36.8238!3d-1.2833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10e89a1c5a8b%3A0xddd6e6a6b62b10f4!2sMoi%20Avenue%2C%20Nairobi!5e0!3m2!1sen!2ske!4v0000000000000"
                className="w-full h-56 rounded-lg border-0"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
