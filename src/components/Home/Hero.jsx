"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import globeImg from "../../assets/worldmap.png"; // Your static world map image

const HeroSection = () => {
  return (
    <section
      className="relative flex flex-col md:flex-row items-center justify-between 
                 min-h-[100vh] px-6 md:px-16 lg:px-28 py-24 overflow-hidden
                 bg-gradient-to-b from-[#fdfefe] via-[#f4faff] to-[#e8f9ff]"
    >
      {/* ===== BACKGROUND DECORATIONS (fixed glow cutoff issue) ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft radial glows with masks for seamless blending */}
        <div
          className="absolute w-[700px] h-[700px] top-[-300px] right-[-300px] 
                     rounded-full bg-cyan-300/25 blur-[180px]
                     [mask-image:radial-gradient(circle,white,transparent)]"
        ></div>

        <div
          className="absolute w-[600px] h-[600px] bottom-[-300px] left-[-300px]
                     rounded-full bg-blue-300/20 blur-[180px]
                     [mask-image:radial-gradient(circle,white,transparent)]"
        ></div>

        {/* Faint gradient ring */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     w-[950px] h-[950px] border border-white/10 rounded-full blur-2xl"
        ></div>

        {/* Soft blend overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/40" />
      </div>

      {/* ===== LEFT CONTENT ===== */}
      <div className="z-20 w-full md:w-1/2 text-center md:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[2.8rem] sm:text-5xl lg:text-[4.2rem] leading-tight font-extrabold 
                     bg-gradient-to-r from-[#00B4FF] via-[#34D6D3] to-[#0088FF] 
                     bg-clip-text text-transparent tracking-tight
                     drop-shadow-[0_2px_10px_rgba(0,180,255,0.3)]"
        >
          Powering the Next Generation of Hosting
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-600 text-lg mt-6 mb-10 max-w-lg mx-auto md:mx-0 
                     bg-white/70 backdrop-blur-xl border border-white/40 
                     rounded-2xl shadow-lg p-6 leading-relaxed"
        >
          Experience seamless VPS hosting with{" "}
          <span className="font-semibold text-cyan-600">Loginex</span> — fast,
          secure, and reliable solutions from{" "}
          <span className="text-blue-600 font-bold">India</span> to{" "}
          <span className="text-cyan-600 font-bold">Canada</span>. Designed for
          modern businesses and developers.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center md:justify-start gap-4"
        >
          <button
            className="bg-gradient-to-r from-[#00b4ff] to-[#40e0d0] text-white px-8 py-3 
                       rounded-full font-semibold text-lg shadow-md shadow-cyan-300/30
                       hover:shadow-cyan-400/60 hover:scale-[1.03] transition-all duration-300"
          >
            Get Started
          </button>
          <button
            className="border border-cyan-400 text-cyan-600 px-8 py-3 rounded-full 
                       font-semibold text-lg hover:bg-cyan-50/80 hover:scale-[1.03]
                       transition-all duration-300"
          >
            Learn More
          </button>
        </motion.div>
      </div>

      {/* ===== RIGHT IMAGE ===== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="relative mt-20 md:mt-0"
      >
        <Image
          src={globeImg}
          alt="Global Connectivity Map"
          width={700}
          height={700}
          className="rounded-xl opacity-95 drop-shadow-[0_0_30px_rgba(0,180,255,0.3)]"
          priority
        />

        {/* India marker (bottom-right area on globe) */}
        <div className="absolute left-[57%] top-[68%] flex items-center gap-2 animate-fade-in">
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></span>
          <span className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full shadow-lg">
            🇮🇳 India
          </span>
        </div>

        {/* Canada marker (top-left area on globe) */}
        <div className="absolute left-[34%] top-[32%] flex items-center gap-2 animate-fade-in delay-150">
          <span className="w-3 h-3 bg-cyan-400 rounded-full animate-ping"></span>
          <span className="bg-cyan-600 text-white px-2 py-1 text-xs rounded-full shadow-lg">
            🇨🇦 Canada
          </span>
        </div>
      </motion.div>

      {/* ===== SUBTLE DIVIDER ===== */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
