"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Zap, Shield, ChevronRight } from "lucide-react";

// VPS plan data
const vpsPlans = [
  {
    name: "Starter VPS",
    price: "$1.99",
    billing: "/mo",
    features: [
      "1 vCPU Core",
      "2 GB ECC RAM",
      "25 GB NVMe SSD",
      // "1 TB Bandwidth",
      "Standard DDoS Protection",
    ],
    highlight: false,
    icon: Zap,
  },
  {
    name: "Performance Pro",
    price: "$3.99",
    billing: "/mo",
    features: [
      "3 vCPU Cores (High Clock)",
      "4 GB ECC RAM",
      "40 GB NVMe SSD",
      // "2 TB Bandwidth",
      "Standard DDoS Protection",
    ],
    highlight: true,
    icon: Shield,
  },
  {
    name: "Enterprise Cloud",
    price: "$9.99",
    billing: "/mo",
    features: [
      "6 vCPU Cores (Dedicated)",
      "10 GB ECC RAM",
      "120 GB NVMe SSD",
      // "5 TB Bandwidth",
      "Standard DDoS Protection",
    ],
    highlight: false,
    icon: CheckCircle,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const VPSTiersSection = () => {
  return (
    <section className="relative py-32 px-6 md:px-16 lg:px-28 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 overflow-hidden text-white">
      {/* === Background FX === */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-200px] right-[-300px] w-[800px] h-[800px] bg-blue-500/40 blur-[250px] rounded-full" />
        <div className="absolute bottom-[-250px] left-[-200px] w-[700px] h-[700px] bg-cyan-400/40 blur-[220px] rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-cyan-800/30 mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        {/* === Header === */}
        <div className="text-center mb-16">
          <h3 className="text-sm font-extrabold tracking-[0.25em] text-cyan-400 uppercase mb-3">
            AFFORDABLE PERFORMANCE
          </h3>
          <h2 className="text-5xl md:text-6xl font-extrabold leading-snug bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,150,255,0.35)]">
            Select Your Cloud Power Tier
          </h2>
          <p className="mt-5 text-lg text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Experience unparalleled speed and reliability tailored for any
            project, from personal sites to enterprise applications.
          </p>
        </div>

        {/* === Plan Cards === */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch"
        >
          {vpsPlans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              whileHover={{
                y: plan.highlight ? -15 : -8,
                scale: 1.03,
                transition: { duration: 0.4, type: "spring", stiffness: 150 },
                boxShadow: plan.highlight
                  ? "0 40px 60px -15px rgba(0,150,255,0.4)"
                  : "0 20px 30px -5px rgba(0,150,255,0.15)",
              }}
              className={`p-9 rounded-3xl transition-all duration-500 relative overflow-hidden group ${
                plan.highlight
                  ? "bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-[0_0_50px_-10px_rgba(0,150,255,0.4)]"
                  : "bg-zinc-800/60 backdrop-blur-md border border-blue-500/20 text-zinc-200 shadow-[0_0_35px_-10px_rgba(0,150,255,0.2)]"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-cyan-300 text-blue-900 text-xs font-extrabold uppercase py-1 px-4 rounded-bl-xl shadow-md">
                  ⚡ Recommended
                </div>
              )}

              {/* Title */}
              <div
                className={`flex items-center mb-6 ${
                  plan.highlight ? "text-cyan-200" : "text-blue-400"
                }`}
              >
                <plan.icon className="w-8 h-8 mr-3" />
                <h3
                  className={`text-3xl font-extrabold ${
                    plan.highlight ? "text-white" : "text-zinc-100"
                  }`}
                >
                  {plan.name}
                </h3>
              </div>

              {/* Price */}
              <div className="mb-10 flex items-baseline">
                <span
                  className={`text-6xl font-black ${
                    plan.highlight ? "text-white" : "text-blue-400"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-2xl font-semibold ml-2 ${
                    plan.highlight ? "text-cyan-100" : "text-zinc-400"
                  }`}
                >
                  {plan.billing}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-12">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle
                      className={`w-5 h-5 mr-3 flex-shrink-0 mt-1 ${
                        plan.highlight ? "text-cyan-300" : "text-blue-400"
                      }`}
                    />
                    <p
                      className={`text-base font-medium ${
                        plan.highlight ? "text-cyan-50" : "text-zinc-300"
                      }`}
                    >
                      {feature}
                    </p>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-xl relative overflow-hidden ${
                  plan.highlight
                    ? "bg-cyan-300 text-blue-900 hover:bg-cyan-200 shadow-cyan-400/70 border-2 border-white/30"
                    : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 shadow-[0_0_25px_rgba(0,150,255,0.4)]"
                }`}
              >
                Start Now
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* === Explore More Plans === */}
        <div className="mt-24 flex justify-center">
          <motion.a
            href="/vps-plans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true, amount: 0.5 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(0,150,255,0.3)",
            }}
            className="inline-flex items-center bg-transparent border-4 border-blue-500/60 text-blue-400 font-extrabold 
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
