"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Zap, Shield, ChevronRight } from "lucide-react";

// 1. Define Plan Data (unchanged)
const vpsPlans = [
  {
    name: "Starter VPS",
    price: "$5.99",
    billing: "/mo",
    features: [
      "1 vCPU Core",
      "2 GB ECC RAM",
      "50 GB NVMe SSD",
      "1 TB Bandwidth",
      "Standard DDoS Protection",
    ],
    highlight: false,
    icon: Zap,
  },
  {
    name: "Performance Pro",
    price: "$14.99",
    billing: "/mo",
    features: [
      "2 vCPU Cores (High Clock)",
      "4 GB ECC RAM",
      "100 GB NVMe SSD",
      "2 TB Bandwidth",
      "Advanced DDoS Mitigation",
    ],
    highlight: true,
    icon: Shield,
  },
  {
    name: "Enterprise Cloud",
    price: "$29.99",
    billing: "/mo",
    features: [
      "4 vCPU Cores (Dedicated)",
      "8 GB ECC RAM",
      "200 GB NVMe SSD",
      "5 TB Bandwidth",
      "Dedicated Firewall & Backup",
    ],
    highlight: false,
    icon: CheckCircle,
  },
];

// Animation Variants (unchanged)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

// 2. Main Component
const VPSTiersSection = () => {
  return (
    <section
      className="relative py-32 px-6 md:px-16 lg:px-28 bg-[#f5faff] overflow-hidden" // Lighter, modern background
    >
      {/* === Background Shape Enhancement (Subtle Grids and Glows) === */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        {/* Subtle grid pattern for tech feel */}
        <div className="absolute inset-0 bg-[length:50px_50px] bg-grid-blue-50/50"></div>
        {/* Deep blue glow */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-400 blur-[250px] opacity-10 rounded-full animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        {/* === Header === */}
        <div className="text-center mb-16">
          <h3 className="text-md font-extrabold tracking-[0.2em] text-cyan-600 uppercase mb-3">
            AFFORDABLE PERFORMANCE
          </h3>
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-snug drop-shadow-sm">
            Select Your <span className="text-blue-700">Cloud Power</span> Tier
          </h2>
          <p className="mt-5 text-xl text-gray-700 max-w-3xl mx-auto">
            Experience unparalleled speed and reliability tailored for any
            project, from personal sites to enterprise applications.
          </p>
        </div>

        {/* === Plan Cards Container === */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch"
        >
          {vpsPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              // ENHANCEMENT: Complex, layered hover effect
              whileHover={{
                y: plan.highlight ? -15 : -8,
                scale: 1.03,
                transition: { duration: 0.4, type: "spring", stiffness: 150 },
                boxShadow: plan.highlight
                  ? "0 40px 60px -15px rgba(0, 100, 255, 0.4)" // Stronger shadow for featured
                  : "0 20px 30px -5px rgba(0, 50, 150, 0.15)", // Subtle shadow for others
              }}
              className={`p-9 rounded-3xl transition-all duration-500 relative overflow-hidden group 
                         ${
                           plan.highlight
                             ? "bg-gradient-to-br from-blue-700 to-cyan-600 text-white shadow-3xl shadow-blue-500/50"
                             : "bg-white/70 backdrop-blur-xl text-gray-800 border border-blue-200/50" // Glassmorphism style
                         }`}
            >
              {/* === CARD BACKGROUND OVERLAY (For Featured Card) === */}
              {plan.highlight && (
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              )}

              {/* Highlight Badge */}
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-cyan-300 text-blue-900 text-xs font-extrabold uppercase py-1 px-4 rounded-bl-xl shadow-lg">
                  ⚡ Recommended
                </div>
              )}

              {/* Icon and Title */}
              <div
                className={`flex items-center mb-6 ${
                  plan.highlight ? "text-cyan-200" : "text-blue-600"
                }`}
              >
                <plan.icon className="w-8 h-8 mr-3 fill-current" />
                <h3
                  className={`text-3xl font-extrabold ${
                    plan.highlight ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </h3>
              </div>

              {/* Price */}
              <div className="mb-10 flex items-baseline">
                <span
                  className={`text-6xl font-black ${
                    plan.highlight ? "text-white" : "text-blue-700"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-2xl font-semibold ml-2 ${
                    plan.highlight ? "text-cyan-100" : "text-gray-500"
                  }`}
                >
                  {plan.billing}
                </span>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-12">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle
                      className={`w-5 h-5 mr-3 flex-shrink-0 mt-1 ${
                        plan.highlight ? "text-cyan-400" : "text-cyan-500"
                      }`}
                    />
                    <p
                      className={`text-base font-medium ${
                        plan.highlight ? "text-cyan-50" : "text-gray-700"
                      }`}
                    >
                      {feature}
                    </p>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-xl relative overflow-hidden transform 
                           ${
                             plan.highlight
                               ? "bg-cyan-300 text-blue-900 hover:bg-cyan-200 shadow-cyan-400/70 border-2 border-white/50" // Highly visible, strong contrast
                               : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-blue-400/40"
                           }`}
              >
                Start Now
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* === Explore More Plans Button === */}
        <div className="mt-24 flex justify-center">
          <motion.a
            href="/vps-plans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true, amount: 0.5 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(0, 150, 255, 0.25)",
            }}
            className="inline-flex items-center bg-transparent border-4 border-blue-500/70 text-blue-600 font-extrabold 
                       px-10 py-4 rounded-full transition-all duration-300 group hover:bg-blue-600 hover:text-white hover:border-blue-600"
          >
            Explore All 10+ VPS Configurations
            <ChevronRight className="w-6 h-6 ml-2 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default VPSTiersSection;
