import { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const phoneNumber = "+254700497710";
  const message = encodeURIComponent(
    "Hello Divine Sounds! I’d like to inquire about your sound systems."
  );
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center space-x-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm shadow-lg hidden md:block"
        >
          Chat with us
        </motion.span>
      )}

      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
        initial={{ y: 0 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Chat with us on WhatsApp"
      >
        <FaWhatsapp size={28} />
      </motion.a>
    </div>
  );
}
