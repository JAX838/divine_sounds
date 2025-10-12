import React from "react";
import {
  FiTruck,
  FiShield,
  FiHeadphones,
  FiMusic,
  FiBriefcase,
  FiAlertTriangle,
  FiCheckCircle,
} from "react-icons/fi";
import { motion } from "framer-motion";

// Animation presets
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function WhyChooseUsAndServices() {
  return (
    <div className="bg-gray-50 py-20 overflow-hidden" id="services">
      {/* === WHY CHOOSE US === */}
      <section className="container mx-auto px-6 mb-24">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Why Choose Us
        </motion.h2>
        <motion.div
          className="w-20 h-1 bg-green-500 mx-auto mb-12 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        ></motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: <FiTruck className="text-4xl text-indigo-600 mb-4" />,
              title: "Fast & Reliable Delivery",
              desc: "Nationwide delivery for all your sound equipment — on time and in perfect condition.",
            },
            {
              icon: <FiShield className="text-4xl text-indigo-600 mb-4" />,
              title: "Top Quality & Warranty",
              desc: "We stock only certified and durable brands of professional audio gear with full warranty.",
            },
            {
              icon: <FiHeadphones className="text-4xl text-indigo-600 mb-4" />,
              title: "Expert Technical Support",
              desc: "Get assistance from audio professionals — from product advice to full system setup.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition"
            >
              {item.icon}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === SOUNDWAVE DIVIDER === */}
      <div className="relative h-20 mb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-10"></div>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute inset-0 w-full h-full text-indigo-600 opacity-30"
          initial={{ x: -100 }}
          animate={{ x: 100 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 8,
            ease: "easeInOut",
          }}
        >
          <path
            fill="currentColor"
            d="M0,160L60,154.7C120,149,240,139,360,144C480,149,600,171,720,170.7C840,171,960,149,1080,149.3C1200,149,1320,171,1380,181.3L1440,192V0H1380C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0H0Z"
          ></path>
        </motion.svg>
      </div>

      {/* === OUR SERVICES === */}
      <section className="container mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Services
        </motion.h2>
        <motion.div
          className="w-20 h-1 bg-green-500 mx-auto mb-12 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        ></motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: <FiMusic className="text-4xl text-indigo-600 mb-2" />,
              title: "Sound System Sales",
              items: [
                "Professional speakers and subwoofers",
                "Mixers and amplifiers",
                "Microphones (wired & wireless)",
                "Audio cables and connectors",
                "DJ and studio gear",
                "Public address systems",
              ],
            },
            {
              icon: <FiBriefcase className="text-4xl text-indigo-600 mb-2" />,
              title: "Installation & Setup",
              items: [
                "Event sound system setup",
                "Church and auditorium installations",
                "Conference room sound solutions",
                "Background music systems",
                "Studio acoustic configuration",
                "Cable management & optimization",
              ],
            },
            {
              icon: (
                <FiAlertTriangle className="text-4xl text-indigo-600 mb-2" />
              ),
              title: "Maintenance & Support",
              items: [
                "System troubleshooting and repairs",
                "Speaker and amplifier servicing",
                "Sound calibration & tuning",
                "Firmware & software updates",
                "On-site technical support",
                "Audio consultation & upgrades",
              ],
            },
          ].map((section, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition"
            >
              <div className="flex flex-col items-center text-center mb-4">
                {section.icon}
                <h3 className="text-lg font-semibold text-gray-800">
                  {section.title}
                </h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FiCheckCircle className="text-green-500 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
