"use client";
import { motion } from "framer-motion";
import React from "react";
import {
  Zap,
  ShieldCheck,
  UserCheck,
  CheckCircle,
  HardDrive,
} from "lucide-react";

// The ENHANCED Abstract Illustration representing Speed, Security, and Support (The "Data Nexus")
const AbstractIconIllustration = () => {
  // Animation variants for the container (used for staggered children)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  // Variants for individual moving elements
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  // Component for a simple animated data point
  const DataNode = ({ style, delay, color }) => (
    <motion.div
      className={`absolute w-3 h-3 rounded-full ${color} opacity-80 z-20`}
      style={style}
      animate={{ opacity: [0.8, 0.3, 0.8], scale: [1, 1.5, 1] }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    />
  );

  return (
    <motion.div
      // Increased height to 450px and slightly wider max-w-xl
      className="relative w-full max-w-xl h-[450px] mx-auto flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* 1. Central Glowing Core (Ambient Light) */}
      <div className="absolute inset-10 rounded-full bg-blue-200/50 blur-3xl opacity-70" />

      {/* NEW: Abstract Grid/Circuit Lines (Fills background space) */}
      <motion.div
        className="absolute w-full h-full p-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Horizontal Lines (Infrastructure) */}
          {[10, 30, 50, 70, 90].map((y) => (
            <line
              key={`h-${y}`}
              x1="0"
              y1={`${y}%`}
              x2="100%"
              y2={`${y}%`}
              stroke="#BFDBFE" // blue-200
              strokeWidth="0.5"
            />
          ))}
          {/* Vertical Lines (Infrastructure) */}
          {[10, 30, 50, 70, 90].map((x) => (
            <line
              key={`v-${x}`}
              x1={`${x}%`}
              y1="0"
              x2={`${x}%`}
              y2="100%"
              stroke="#BFDBFE" // blue-200
              strokeWidth="0.5"
            />
          ))}
          {/* Diagonal Lines (Animated Data Paths) */}
          <motion.line
            x1="10%"
            y1="10%"
            x2="90%"
            y2="90%"
            stroke="#06B6D4" // cyan-500
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            strokeDasharray="1 50" // Dashed line for movement illusion
            opacity="0.3"
          />
          <motion.line
            x1="90%"
            y1="10%"
            x2="10%"
            y2="90%"
            stroke="#2563EB" // blue-600
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
              delay: 2.5,
            }}
            strokeDasharray="1 50" // Dashed line for movement illusion
            opacity="0.3"
          />
        </svg>
      </motion.div>

      {/* 2. Outer Rotating Ring (Represents Infrastructure and Support) */}
      <motion.div
        className="absolute w-80 h-80 border border-blue-400 rounded-full opacity-30" // Increased size
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* 3. Inner Pulsing Ring (Represents Speed and Data Flow) */}
      <motion.div
        className="absolute w-60 h-60 border-2 border-cyan-500 rounded-full opacity-70" // Increased size
        animate={{ scale: [1, 1.05, 1], opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 4. Primary Center Element (Reliability/ShieldCheck) */}
      <motion.div
        className="relative p-8 bg-white rounded-full shadow-2xl shadow-blue-500/50 border-4 border-blue-600 z-10" // Increased padding
        variants={itemVariants}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        <ShieldCheck size={55} className="text-blue-600" />{" "}
        {/* Increased icon size */}
      </motion.div>

      {/* 5. Element 1: Speed Icon (Subtle orbital motion) */}
      <motion.div
        className="absolute p-3 bg-white rounded-full shadow-xl border-2 border-cyan-300 z-20"
        style={{ top: "15%", right: "15%" }} // Adjusted position
        variants={itemVariants}
        animate={{ x: [0, 8, 0], y: [0, -8, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Zap size={24} className="text-cyan-500" />
      </motion.div>

      {/* 6. Element 2: Support Icon (Subtle orbital motion) */}
      <motion.div
        className="absolute p-3 bg-white rounded-full shadow-xl border-2 border-blue-300 z-20"
        style={{ bottom: "15%", left: "15%" }} // Adjusted position
        variants={itemVariants}
        animate={{ x: [0, -8, 0], y: [0, 8, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <UserCheck size={24} className="text-blue-500" />
      </motion.div>

      {/* NEW Element 7: Cloud/Storage Icon (Third major orbital element) */}
      <motion.div
        className="absolute p-3 bg-white rounded-full shadow-xl border-2 border-gray-300 z-20"
        style={{ bottom: "10%", right: "40%" }} // New position
        variants={itemVariants}
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        <HardDrive size={24} className="text-gray-600" />
      </motion.div>

      {/* NEW Corner Data Nodes (Increased Density) */}
      <DataNode
        style={{ top: "5%", left: "10%" }}
        delay={0.5}
        color="bg-cyan-400"
      />
      <DataNode
        style={{ top: "15%", right: "5%" }}
        delay={2.0}
        color="bg-blue-400"
      />
      <DataNode
        style={{ bottom: "10%", right: "10%" }}
        delay={1.5}
        color="bg-cyan-400"
      />
      <DataNode
        style={{ bottom: "5%", left: "25%" }}
        delay={3.0}
        color="bg-blue-400"
      />
    </motion.div>
  );
};

const chooseUsPoints = [
  {
    title: "Speed & Performance",
    desc: "Experience blazing-fast loading times with optimized NVMe storage and global low-latency networking.",
  },
  {
    title: "Rock-Solid Reliability",
    desc: "Guaranteed 99.9% uptime for all services, backed by enterprise-grade infrastructure.",
  },
  {
    title: "24/7 Expert Support",
    desc: "Get instant, technical support from our dedicated team of developers, not just automated bots.",
  },
  {
    title: "Scalability on Demand",
    desc: "Easily upgrade CPU, RAM, and storage as your projects grow, without downtime.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-24 px-6 md:px-16 lg:px-28 bg-white">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500 tracking-tight">
          Why Loginex is Your Best Choice
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT COLUMN: SVG Illustration */}
        <div className="lg:order-1 order-2">
          <AbstractIconIllustration />
        </div>

        {/* RIGHT COLUMN: Text Content */}
        <div className="lg:order-2 order-1">
          <motion.p
            className="text-gray-700 text-lg leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            Choosing Loginex means selecting a partner dedicated to your digital
            success. We don't just provide hosting; we provide a fully managed,
            optimized ecosystem where your websites, Minecraft servers, and
            applications can run at peak efficiency. From our global,
            low-latency network to our commitment to instant, expert human
            support, we handle the infrastructure so you can focus entirely on
            development and user experience.
          </motion.p>

          <div className="space-y-6">
            {chooseUsPoints.map((point, i) => (
              <motion.div
                key={i}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <CheckCircle className="flex-shrink-0 w-6 h-6 text-cyan-500 mt-1 mr-3" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800 tracking-tight">
                    {point.title}
                  </h3>
                  <p className="text-gray-600 mt-1">{point.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
