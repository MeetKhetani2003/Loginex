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

// === Abstract Animated Illustration (Dark Theme Optimized) ===
const AbstractIconIllustration = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

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
      className="relative w-full max-w-xl h-[450px] mx-auto flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* === Ambient Core Glow === */}
      <div className="absolute inset-10 rounded-full bg-blue-500/20 blur-3xl opacity-60" />

      {/* === Grid Lines (Cooler tones for dark mode) === */}
      <motion.div
        className="absolute w-full h-full p-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.25 }}
        transition={{ duration: 1 }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {[10, 30, 50, 70, 90].map((y) => (
            <line
              key={`h-${y}`}
              x1="0"
              y1={`${y}%`}
              x2="100%"
              y2={`${y}%`}
              stroke="#1E3A8A" // blue-900 tone
              strokeWidth="0.5"
            />
          ))}
          {[10, 30, 50, 70, 90].map((x) => (
            <line
              key={`v-${x}`}
              x1={`${x}%`}
              y1="0"
              x2={`${x}%`}
              y2="100%"
              stroke="#1E3A8A"
              strokeWidth="0.5"
            />
          ))}
          {/* Animated Data Paths */}
          <motion.line
            x1="10%"
            y1="10%"
            x2="90%"
            y2="90%"
            stroke="#06B6D4"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            strokeDasharray="1 50"
            opacity="0.4"
          />
          <motion.line
            x1="90%"
            y1="10%"
            x2="10%"
            y2="90%"
            stroke="#3B82F6"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
              delay: 2.5,
            }}
            strokeDasharray="1 50"
            opacity="0.4"
          />
        </svg>
      </motion.div>

      {/* === Outer Ring === */}
      <motion.div
        className="absolute w-80 h-80 border border-blue-400/30 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* === Inner Pulsing Ring === */}
      <motion.div
        className="absolute w-60 h-60 border-2 border-cyan-400/70 rounded-full"
        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* === Central Shield === */}
      <motion.div
        className="relative p-8 bg-gradient-to-br from-zinc-900 to-blue-950 rounded-full border-4 border-blue-600 shadow-[0_0_40px_-5px_rgba(0,150,255,0.4)] z-10"
        variants={itemVariants}
      >
        <ShieldCheck size={55} className="text-cyan-400" />
      </motion.div>

      {/* === Orbiting Icons === */}
      <motion.div
        className="absolute p-3 bg-zinc-900 border-2 border-cyan-500/40 rounded-full shadow-[0_0_15px_rgba(0,200,255,0.2)]"
        style={{ top: "15%", right: "15%" }}
        variants={itemVariants}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Zap size={24} className="text-cyan-400" />
      </motion.div>

      <motion.div
        className="absolute p-3 bg-zinc-900 border-2 border-blue-500/40 rounded-full shadow-[0_0_15px_rgba(0,150,255,0.2)]"
        style={{ bottom: "15%", left: "15%" }}
        variants={itemVariants}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <UserCheck size={24} className="text-blue-400" />
      </motion.div>

      <motion.div
        className="absolute p-3 bg-zinc-900 border-2 border-cyan-400/40 rounded-full shadow-[0_0_15px_rgba(0,200,255,0.25)]"
        style={{ bottom: "10%", right: "40%" }}
        variants={itemVariants}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <HardDrive size={24} className="text-cyan-300" />
      </motion.div>

      {/* === Data Nodes === */}
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

// === Main Section ===
const WhyChooseUsSection = () => {
  return (
    <section className="relative py-28 px-6 md:px-16 lg:px-28 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 overflow-hidden text-zinc-100">
      {/* Glowing Background Elements */}
      <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-blue-500/40 blur-[200px] rounded-full"></div>
      <div className="absolute bottom-[-200px] left-[-200px] w-[600px] h-[600px] bg-cyan-500/30 blur-[200px] rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Why <span className="text-cyan-400">Loginex</span> is Your Best
            Choice
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Illustration */}
          <div className="lg:order-1 order-2">
            <AbstractIconIllustration />
          </div>

          {/* Text */}
          <div className="lg:order-2 order-1">
            <motion.p
              className="text-zinc-300 text-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              Choosing Loginex means selecting a partner dedicated to your
              digital success. We don’t just provide hosting — we deliver an
              optimized ecosystem where your websites, servers, and applications
              run at peak performance, backed by instant human support and a
              robust global network.
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
                  <CheckCircle className="flex-shrink-0 w-6 h-6 text-cyan-400 mt-1 mr-3" />
                  <div>
                    <h3 className="text-xl font-bold text-zinc-100 tracking-tight">
                      {point.title}
                    </h3>
                    <p className="text-zinc-400 mt-1">{point.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
