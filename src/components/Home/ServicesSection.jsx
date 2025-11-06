"use client";
import { motion } from "framer-motion";
import { Code, Server, Gamepad2 } from "lucide-react";
import React from "react";

const services = [
  {
    title: "Website Development",
    icon: <Code size={40} className="text-blue-600" />,
    desc: "Modern, secure, and fully responsive web applications and interfaces tailored to your brand and business goals.",
  },
  {
    title: "Minecraft Server Development",
    icon: <Gamepad2 size={40} className="text-blue-600" />,
    desc: "Custom server setup, professional plugin configuration, and performance optimization for engaging multiplayer experiences.",
  },
  {
    title: "VPS with Control Panel",
    icon: <Server size={40} className="text-blue-600" />,
    desc: "Complete setup and configuration of high-performance VPS environments with a user-friendly control panel (e.g., cPanel, Plesk, Hestia).",
  },
];

const ServicesSection = () => {
  return (
    // Light background with a subtle blue gradient for depth
    <section className="py-24 px-6 md:px-16 lg:px-28 bg-gradient-to-b from-white via-blue-50/50 to-white border-t border-b border-gray-100">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500 tracking-tight">
          High-Impact Developer Services
        </h2>
        <p className="mt-4 text-gray-600 text-xl max-w-2xl mx-auto">
          Delivering reliable, scalable, and developer-friendly cloud
          experiences built for speed and stability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {services.map((srv, i) => (
          <motion.div
            key={srv.title}
            // Spring animation for smooth entrance
            initial={{ opacity: 0, y: 50, rotateX: 5 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 12,
              delay: i * 0.1,
            }}
            viewport={{ once: true, amount: 0.5 }}
            className="group p-8 bg-white border border-gray-200 rounded-3xl shadow-xl shadow-gray-100 
                       transition-all duration-500 ease-out 
                       hover:bg-blue-50/50 hover:scale-[1.03] 
                       hover:shadow-2xl hover:shadow-blue-200/50" // Clean blue hover shadow
          >
            <div className="flex justify-center mb-6">
              <motion.div
                // Interactive hover effect on the icon wrapper
                className="p-4 rounded-full bg-blue-50/70 border border-blue-200 group-hover:border-blue-500 transition-colors duration-500"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {srv.icon}
              </motion.div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center tracking-tight">
              {srv.title}
            </h3>
            <p className="text-gray-600 text-base text-center leading-relaxed">
              {srv.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
