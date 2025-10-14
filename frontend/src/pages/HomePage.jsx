import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FeaturedProducts from "../components/FeaturedProducts";
import AboutUsSection from "../components/AboutUsSection";

const slides = [
  {
    id: 1,
    title: "Premium Sound Systems",
    description:
      "Experience crystal-clear audio with our top-tier speakers, amplifiers, and mixers for every event or venue.",
    image: "/images/speakers-bg.jpg",
  },
  {
    id: 2,
    title: "Professional Audio Solutions",
    description:
      "From microphones to studio setups — Divine Sounds delivers unmatched quality and reliability for your sound needs.",
    image: "/images/microphones-bg.jpg",
  },
  {
    id: 3,
    title: "Cables, Mixers & Accessories",
    description:
      "We supply durable cables, professional mixers, and all essential accessories for your sound systems.",
    image: "/images/mixer-bg.jpg",
  },
  {
    id: 4,
    title: "Cables, Mixers & Accessories",
    description:
      "We supply durable cables, professional mixers, and all essential accessories for your sound systems.",
    image: "/images/about4.jpg",
  },
];

const HomePage = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ✅ Carousel Section */}
      <div className="relative w-full h-[85vh] overflow-hidden">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === current ? 1 : 0 }}
            transition={{ duration: 1 }}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-6">
              <motion.h2
                key={slide.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                {slide.title}
              </motion.h2>
              <motion.p
                key={slide.description}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl mb-6 max-w-2xl"
              >
                {slide.description}
              </motion.p>
              <motion.button
                onClick={() => navigate("/products")}
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition cursor-pointer"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Explore Products
              </motion.button>
            </div>
          </motion.div>
        ))}

        {/* Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-colorless bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-colorless bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full"
        >
          ›
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-3 w-3 rounded-full cursor-pointer transition ${
                i === current ? "bg-white" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      </div>
      <FeaturedProducts />
      <AboutUsSection />
    </div>
  );
};

export default HomePage;
