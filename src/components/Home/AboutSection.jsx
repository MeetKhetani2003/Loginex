"use client";
import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import aboutImg from "../../assets/about.jpg";

const AboutSection = () => {
  // Removed mouseX, mouseY, rotateX, rotateY, and handleMouseMove
  // as the image should no longer tilt.

  const textVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.9, staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      className="relative flex flex-col-reverse md:flex-row items-center justify-between max-w-8xl mx-auto
                 gap-16 py-32 px-6 md:px-16 lg:px-28
                 bg-[#f9fcff] overflow-hidden border-b border-gray-100/70"
    >
      {/* === BACKGROUND EFFECTS === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-250px] left-[5%] w-[800px] h-[800px] bg-cyan-300/60 blur-[200px] opacity-30 rounded-full"></div>
        <div className="absolute bottom-[-300px] right-[0%] w-[700px] h-[700px] bg-blue-400/60 blur-[220px] opacity-30 rounded-full"></div>
      </div>

      {/* === LEFT TEXT === */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={textVariants}
        viewport={{ once: true, amount: 0.3 }}
        className="z-10 w-full md:w-[45%]"
      >
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          className="text-5xl md:text-6xl font-extrabold 
                     bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-600
                     bg-clip-text text-transparent drop-shadow-md tracking-tight"
        >
          Discover <span className="text-blue-800">Loginex</span>
        </motion.h2>

        <motion.div
          variants={{
            hidden: { opacity: 0, scaleX: 0.1 },
            visible: {
              opacity: 1,
              scaleX: 1,
              transition: { duration: 0.6, delay: 0.2 },
            },
          }}
          className="w-1/4 h-1.5 mb-10 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full origin-left"
        />

        <motion.p
          variants={itemVariants}
          whileHover={{
            scale: 1.01,
            y: -2,
            boxShadow: "0 10px 40px rgba(0, 150, 255, 0.15)",
          }}
          transition={{ duration: 0.3 }}
          className="text-gray-700 text-lg leading-relaxed bg-white/80 backdrop-blur-md
                     border border-blue-300/50 rounded-[2rem] shadow-[0_4px_40px_-10px_rgba(0,180,255,0.08)] p-8
                     transition-all duration-500 will-change-transform"
        >
          <span className="font-extrabold text-blue-700">Loginex</span> is your
          all-in-one platform for <strong>high-performance VPS servers</strong>,
          scalable <strong>cloud infrastructure</strong>, and expert{" "}
          <strong>web development solutions</strong>.
          <br />
          <br />
          We empower individuals and enterprises globally with{" "}
          <span className="text-cyan-600 font-bold">
            cutting-edge technology
          </span>
          , an unyielding focus on
          <span className="text-blue-600 font-bold"> security</span>, and{" "}
          <span className="text-blue-500 font-bold">
            dedicated 24/7 expert support
          </span>
          . Experience speed, reliability, and unparalleled scalability.
        </motion.p>

        <div
          className="mt-8 flex flex-wrap justify-between gap-4 p-5 rounded-xl
                        bg-gradient-to-r from-white to-blue-50 border border-blue-200 shadow-lg shadow-blue-100/50"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="text-center flex-1 min-w-[100px] border-r border-blue-200 last:border-r-0"
          >
            <p className="text-4xl font-extrabold text-blue-700">99.9%</p>
            <p className="text-sm text-gray-600 mt-1 font-medium">Uptime SLA</p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="text-center flex-1 min-w-[100px] border-r border-blue-200 last:border-r-0"
          >
            <p className="text-4xl font-extrabold text-blue-700">20+</p>
            <p className="text-sm text-gray-600 mt-1 font-medium">
              Global Regions
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="text-center flex-1 min-w-[100px] border-r border-blue-200 last:border-r-0"
          >
            <p className="text-4xl font-extrabold text-blue-700">5K+</p>
            <p className="text-sm text-gray-600 mt-1 font-medium">
              Active Servers
            </p>
          </motion.div>
        </div>

        <motion.button
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{
            scale: 1.06,
            boxShadow: "0 15px 45px rgba(0, 180, 255, 0.5)",
            y: -4,
          }}
          whileTap={{ scale: 0.98 }}
          className="mt-12 bg-gradient-to-r from-[#00b4ff] to-[#34d6d3] text-white px-12 py-4
                     rounded-full font-bold text-lg shadow-2xl shadow-cyan-400/50
                     relative overflow-hidden group transition-all duration-500"
        >
          <div className="absolute inset-0 rounded-full border-4 border-white/0 group-hover:border-white/50 transition-all duration-500"></div>
          Explore VPS Plans
        </motion.button>
      </motion.div>

      {/* === RIGHT BIGGER IMAGE (No Tilt, No Border, No Shadow, Covers Right Part) === */}
      <motion.div
        initial={{ opacity: 0, x: 100, scale: 0.9 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.3 }}
        // Removed onMouseMove
        className="relative z-10 w-full md:w-[50%] flex justify-center items-center" // Adjusted width and added items-center for vertical centering
      >
        <motion.div
          // Removed style={{ rotateX, rotateY }}
          animate={{ y: [0, -10, 0] }} // Subtle vertical float remains for life
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          // Removed border, shadow, and background classes for a clean look
          className="relative rounded-[2.5rem] overflow-hidden w-[95%] h-[550px] md:h-[650px] lg:h-[700px] flex items-center justify-center
                     bg-gradient-to-br from-blue-100/70 via-cyan-100/70 to-blue-200/70 p-2" // Added a very subtle gradient background and padding
        >
          <Image
            src={aboutImg}
            alt="About Loginex"
            width={900}
            height={700}
            className="w-full h-full rounded-[2.2rem] object-cover" // Ensure image covers its container
            priority
          />

          {/* Existing Gradient overlay - made it slightly stronger to blend with new background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent"></div>

          {/* Inner Glow is removed as per "no borders and shadows" for a simpler look, 
              but a very subtle full-image overlay for enhancement can be considered.
              Let's add a very subtle, static overlay for perceived depth. */}
          <div
            className="absolute inset-0 rounded-[2.2rem] pointer-events-none 
                       bg-gradient-to-tr from-blue-300/10 via-transparent to-cyan-300/10 mix-blend-overlay"
          ></div>
        </motion.div>

        {/* Glow Behind Image - Enhanced and moved for better effect */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -z-10 w-[95%] md:w-[105%] h-[90%] bg-blue-300/40 blur-[180px] rounded-full"
        />
      </motion.div>
    </section>
  );
};

export default AboutSection;
