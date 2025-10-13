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
            mixers, or full sound system setups, we’re here to help.
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
                <p>+254 700497710</p>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-2xl" />
                <p>Divine1Sounds@gmail.com</p>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-2xl" />
                <p>Luthuli Avenue, Nairobi, Kenya</p>
              </div>
            </div>

            <div className="mt-8">
              {/* Embedded Google Map for Divine Sounds (Luthuli Avenue) */}
              <div className="w-full h-56 rounded-lg overflow-hidden border-0">
                <iframe
                  title="Divine Sounds - Luthuli Avenue"
                  src="https://www.google.com/maps?q=-1.2838478,36.8282766&z=18&output=embed"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>

              <p className="text-sm mt-2">
                <a
                  href="https://www.google.com/maps/place/DIVINE+SOUNDS/@-1.2830781,36.8281995,3a,75y,353.99h,90t/data=!3m7!1e1!3m5!1svZmIQIArNSAfSXYpyQYBMA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3DvZmIQIArNSAfSXYpyQYBMA%26yaw%3D353.9894969860002!7i16384!8i8192!4m7!3m6!1s0x182f11297a930053:0x6a3277bde3976543!8m2!3d-1.2838478!4d36.8282766!10e5!16s%2Fg%2F11sh4z0mqb?entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-white"
                >
                  Open in Google Maps
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
