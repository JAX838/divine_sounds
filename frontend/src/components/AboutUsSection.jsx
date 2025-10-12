import React from "react";
import { motion } from "framer-motion";
import ContactUs from "./ContactUs";

export default function AboutUsSection() {
  const handleDiscoverClick = () => {
    const section = document.getElementById("services");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section id="about" className="bg-white py-20 px-6 md:px-12">
        {/* === SECTION HEADING === */}
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            About <span className="text-indigo-700">Divine Sounds</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="h-1 bg-indigo-600 mx-auto mt-3 rounded-full"
          ></motion.div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Experience sound perfection — providing reliable, high-quality audio
            systems for every environment.
          </p>
        </div>

        {/* === CONTENT GRID === */}
        <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* === IMAGE GRID === */}
          <div className="grid grid-cols-2 gap-4">
            {["about1.jpg", "about2.jpg", "about3.jpg", "about4.jpg"].map(
              (img, index) => (
                <motion.div
                  key={img}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="overflow-hidden rounded-xl shadow-md"
                >
                  <motion.img
                    src={`/images/${img}`}
                    alt={`Divine Sounds - ${img}`}
                    className="object-cover w-full h-56 md:h-64 cursor-pointer"
                    whileHover={{ scale: 1.08, y: -5 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  />
                </motion.div>
              )
            )}
          </div>

          {/* === TEXT CONTENT === */}
          <motion.div
            className="bg-indigo-900 text-white rounded-xl shadow-lg p-8 md:p-10"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="uppercase tracking-widest text-sm text-indigo-300 mb-3">
              Who We Are
            </p>

            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Setting the Standard for Quality Sound
            </h3>

            <p className="font-semibold text-indigo-200 mb-4">
              We believe great sound transforms every experience.
            </p>

            <p className="text-sm md:text-base leading-relaxed text-indigo-100 mb-6">
              <strong>Divine Sounds</strong> is your trusted partner for premium
              audio equipment from professional-grade speakers and mixers to
              studio microphones, amplifiers, and accessories. We cater to
              concerts, churches, events, studios, and home entertainment
              setups.
              <br />
              <br />
              Our mission is simple: to deliver powerful, reliable, and
              immersive sound experiences through top-tier products and expert
              installation. Whether you’re setting up a stage, a worship hall,
              or your personal space, we bring clarity and power to every beat.
            </p>

            <button
              onClick={handleDiscoverClick}
              className="bg-indigo-600 hover:bg-indigo-700 transition text-white font-medium px-6 py-2.5 rounded-md text-sm shadow-md"
            >
              Discover More
            </button>
          </motion.div>
        </div>
      </section>
      <ContactUs />
    </>
  );
}
