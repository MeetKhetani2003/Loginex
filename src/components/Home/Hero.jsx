"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
// Ensure this path is correct for your project structure
import globeImg from "../../assets/worldmap.png"; 

const HeroSection = () => {
  return (
    <section
      className="relative flex flex-col md:flex-row items-center justify-between 
                 min-h-[100vh] px-6 md:px-16 lg:px-28 py-24 overflow-hidden
                 bg-gradient-to-b from-[#fdfefe] via-[#f4faff] to-[#e8f9ff]"
    >
      {/* ===== BACKGROUND DECORATIONS (Soft, dynamic light theme glows) ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top-Right Cyan Glow */}
        <div
          className="absolute w-[800px] h-[800px] top-[-400px] right-[-400px] 
                     rounded-full bg-cyan-300/30 blur-[250px]
                     [mask-image:radial-gradient(circle,white_50%,transparent_100%)]"
        ></div>

        {/* Bottom-Left Blue Glow */}
        <div
          className="absolute w-[700px] h-[700px] bottom-[-400px] left-[-400px]
                     rounded-full bg-blue-300/25 blur-[250px]
                     [mask-image:radial-gradient(circle,white_50%,transparent_100%)]"
        ></div>

        {/* Soft blend overlay at the edges */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/30" />
      </div>

      {/* ===== LEFT CONTENT (Text and CTA) ===== */}
      <div className="z-20 w-full md:w-1/2 text-center md:text-left pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[2.8rem] sm:text-5xl lg:text-[4.5rem] leading-tight font-extrabold 
                     bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600
                     bg-clip-text text-transparent tracking-tighter
                     drop-shadow-[0_4px_15px_rgba(0,180,255,0.4)]"
        >
          Powering the Next Generation of Hosting
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          // Electric Border and subtle frosted glass effect
          className="text-gray-700 text-lg mt-8 mb-10 max-w-lg mx-auto md:mx-0 
                     bg-white/75 backdrop-blur-xl rounded-2xl p-6 leading-relaxed
                     shadow-xl shadow-blue-100/50 
                     border border-blue-200/50"
        >
          Experience seamless VPS hosting with{" "}
          <span className="font-extrabold text-blue-600">Loginex</span> — fast,
          secure, and reliable solutions globally. Designed for modern businesses and developers.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center md:justify-start gap-4"
        >
          <button
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-9 py-4 
                       rounded-full font-bold text-lg shadow-lg shadow-cyan-400/50
                       hover:shadow-blue-500/70 hover:scale-[1.05] transition-all duration-300"
          >
            Start Your Free Trial
          </button>
          <button
            className="border-2 border-blue-400 text-blue-600 px-9 py-4 rounded-full 
                       font-semibold text-lg hover:bg-blue-50/80 hover:scale-[1.05]
                       transition-all duration-300"
          >
            View Pricing
          </button>
        </motion.div>
      </div>

      {/* ===== RIGHT IMAGE (Globe Visualization) ===== */}
      <motion.div
        initial={{ opacity: 0, x: 50, rotate: -5 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ delay: 0.5, duration: 1.2, type: "spring", stiffness: 50 }}
        className="relative mt-20 md:mt-0 max-w-xl w-full"
      >
        <Image
          src={globeImg}
          alt="Global Connectivity Map"
          width={1000}
          height={1000}
          // Enhanced shadow reflecting light source
          className="rounded-xl opacity-95 drop-shadow-[0_0_40px_rgba(0,180,255,0.4)]"
          priority
        />

        {/* India marker (bottom-right area on globe) */}
        <div className="absolute left-[58%] top-[70%] flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-ping shadow-lg shadow-blue-500/50"></span>
          <span className="bg-blue-600 text-white px-2 py-1 text-xs font-medium rounded-full shadow-lg">
            🇮🇳 India
          </span>
        </div>

        {/* Canada marker (top-left area on globe) */}
        <div className="absolute left-[34%] top-[32%] flex items-center gap-2">
          <span className="w-3 h-3 bg-cyan-400 rounded-full animate-ping shadow-lg shadow-cyan-400/50"></span>
          <span className="bg-cyan-600 text-white px-2 py-1 text-xs font-medium rounded-full shadow-lg">
            🇨🇦 Canada
          </span>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-100/70 to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
