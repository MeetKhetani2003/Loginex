"use client";
import { motion } from "framer-motion";
import { Code, Server, Gamepad2 } from "lucide-react";
import React from "react";

const services = [
  {
    title: "Website Development",
    icon: <Code size={40} className="text-cyan-400" />,
    desc: "Modern, secure, and fully responsive web applications and interfaces tailored to your brand and business goals.",
  },
  {
    title: "Minecraft Server Development",
    icon: <Gamepad2 size={40} className="text-cyan-400" />,
    desc: "Custom server setup, professional plugin configuration, and performance optimization for engaging multiplayer experiences.",
  },
  {
    title: "VPS with Control Panel",
    icon: <Server size={40} className="text-cyan-400" />,
    desc: "Complete setup and configuration of high-performance VPS environments with user-friendly control panels (cPanel, Plesk, Hestia).",
  },
];

const ServicesSection = () => {
  return (
    <section className="relative py-28 px-6 md:px-16 lg:px-28 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 overflow-hidden border-t border-b border-blue-900/30">
      {/* === Background Glows === */}
      <div className="absolute top-[-250px] left-[-200px] w-[700px] h-[700px] bg-cyan-500/30 blur-[200px] rounded-full"></div>
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-blue-500/30 blur-[220px] rounded-full"></div>

      <div className="relative z-20 text-center mb-16">
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent tracking-tight">
          High-Impact Developer Services
        </h2>
        <p className="mt-5 text-zinc-300 text-lg max-w-2xl mx-auto">
          Delivering reliable, scalable, and developer-friendly cloud
          experiences built for speed and stability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-20">
        {services.map((srv, i) => (
          <motion.div
            key={srv.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 12,
              delay: i * 0.15,
            }}
            viewport={{ once: true, amount: 0.5 }}
            className="group p-8 rounded-3xl bg-gradient-to-br from-zinc-800/80 via-zinc-900/80 to-zinc-800/80
                       border border-blue-500/20 shadow-[0_0_40px_-10px_rgba(0,150,255,0.25)]
                       transition-all duration-500 ease-out 
                       hover:scale-[1.04] hover:shadow-[0_0_60px_-10px_rgba(0,200,255,0.4)] hover:border-cyan-400/40"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                className="p-5 rounded-full bg-zinc-900 border border-cyan-400/30 group-hover:border-cyan-400/70
                           shadow-[0_0_20px_-5px_rgba(0,200,255,0.3)] transition-all duration-500"
                whileHover={{ scale: 1.15, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {srv.icon}
              </motion.div>
            </div>

            <h3 className="text-2xl font-bold text-zinc-100 mb-3 text-center tracking-tight">
              {srv.title}
            </h3>
            <p className="text-zinc-400 text-base text-center leading-relaxed">
              {srv.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
