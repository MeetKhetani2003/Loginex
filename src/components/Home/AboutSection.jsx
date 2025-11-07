"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import aboutImg from "../../assets/about.jpg";

const AboutSection = () => {
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
                 gap-16 py-32 px-6 md:px-16 lg:px-28 overflow-hidden border-b border-zinc-700/60
                 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 text-zinc-100"
    >
      {/* === BACKGROUND EFFECTS (Refined Blue Glows) === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft deep blue glow (top-left) */}
        <div className="absolute top-[-250px] left-[5%] w-[800px] h-[800px] bg-blue-500/40 blur-[250px] rounded-full"></div>

        {/* Bright cool blue glow (bottom-right) */}
        <div className="absolute bottom-[-300px] right-[0%] w-[700px] h-[700px] bg-blue-400/50 blur-[250px] rounded-full"></div>

        {/* Subtle ambient wash */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-transparent to-indigo-900/30 mix-blend-overlay" />
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
                     bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600
                     bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,150,255,0.4)] tracking-tight"
        >
          Discover <span className="text-blue-400">Loginex</span>
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
          className="w-1/4 h-1.5 mb-10 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full origin-left shadow-[0_0_20px_rgba(0,150,255,0.5)]"
        />

        <motion.p
          variants={itemVariants}
          whileHover={{
            scale: 1.01,
            y: -2,
            boxShadow: "0 10px 40px rgba(0, 150, 255, 0.15)",
          }}
          transition={{ duration: 0.3 }}
          className="text-zinc-200 text-lg leading-relaxed bg-zinc-800/60 backdrop-blur-md
             border border-blue-500/30 rounded-[2rem] shadow-[0_4px_40px_-10px_rgba(0,150,255,0.15)] p-8
             transition-all duration-500"
        >
          <span className="font-extrabold text-blue-400">Loginex</span> is your
          all-in-one platform for
          <strong className="text-zinc-100">
            high-performance VPS servers
          </strong>
          , scalable
          <strong className="text-zinc-100">cloud infrastructure</strong>, and
          expert
          <strong className="text-zinc-100">web development solutions</strong>.
          <br />
          <br />
          We empower individuals and enterprises globally with
          <span className="text-blue-400 font-bold">
            cutting-edge technology
          </span>
          , an unyielding focus on
          <span className="text-blue-400 font-bold">security</span>, and
          <span className="text-blue-300 font-bold">
            dedicated 24/7 expert support
          </span>
          . Experience speed, reliability, and unparalleled scalability.
        </motion.p>
        {/* === STATS (Dark Mode Themed) === */}
        <div
          className="mt-8 flex flex-wrap justify-between gap-4 p-5 rounded-xl
             bg-gradient-to-r from-zinc-900/70 via-zinc-800/60 to-zinc-900/70
             border border-blue-500/30 shadow-[0_0_40px_-10px_rgba(0,150,255,0.25)]"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="text-center flex-1 min-w-[100px] border-r border-blue-500/20 last:border-r-0"
          >
            <p className="text-4xl font-extrabold text-blue-400">99.9%</p>
            <p className="text-sm text-zinc-300 mt-1 font-medium">Uptime SLA</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="text-center flex-1 min-w-[100px] border-r border-blue-500/20 last:border-r-0"
          >
            <p className="text-4xl font-extrabold text-cyan-400">20+</p>
            <p className="text-sm text-zinc-300 mt-1 font-medium">
              Global Regions
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="text-center flex-1 min-w-[100px]"
          >
            <p className="text-4xl font-extrabold text-blue-400">5K+</p>
            <p className="text-sm text-zinc-300 mt-1 font-medium">
              Active Servers
            </p>
          </motion.div>
        </div>

        {/* === CTA Button === */}
        <motion.button
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{
            scale: 1.06,
            boxShadow: "0 15px 45px rgba(0, 180, 255, 0.6)",
            y: -4,
          }}
          whileTap={{ scale: 0.98 }}
          className="mt-12 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white px-12 py-4
                     rounded-full font-bold text-lg shadow-[0_0_25px_rgba(0,180,255,0.45)]
                     relative overflow-hidden group transition-all duration-500"
        >
          <div className="absolute inset-0 rounded-full border-4 border-white/0 group-hover:border-white/20 transition-all duration-500"></div>
          Explore VPS Plans
        </motion.button>
      </motion.div>

      {/* === RIGHT IMAGE === */}
      <motion.div
        initial={{ opacity: 0, x: 100, scale: 0.9 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 w-full md:w-[50%] flex justify-center items-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative rounded-[2.5rem] overflow-hidden w-[95%] h-[550px] md:h-[650px] lg:h-[700px]
                     bg-gradient-to-br from-blue-950/50 via-zinc-800/70 to-blue-900/50 p-2"
        >
          <Image
            src={aboutImg}
            alt="About Loginex"
            width={900}
            height={700}
            className="w-full h-full rounded-[2.2rem] object-cover opacity-95"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"></div>

          <div
            className="absolute inset-0 rounded-[2.2rem] pointer-events-none 
                       bg-gradient-to-tr from-blue-500/20 via-transparent to-blue-400/20 mix-blend-overlay"
          ></div>
        </motion.div>

        {/* Blue Glow Behind Image */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -z-10 w-[95%] md:w-[105%] h-[90%] bg-blue-500/35 blur-[180px] rounded-full"
        />
      </motion.div>
    </section>
  );
};

export default AboutSection;
