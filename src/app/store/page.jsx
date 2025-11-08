"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Server,
  Cloud,
  DollarSign,
  Zap,
  HardDrive,
  BarChart3,
  Loader2,
  AlertTriangle,
  MemoryStick,
  Trophy,
  X,
} from "lucide-react";

// --- HELPER: Safe string split ---
const safeSplit = (str, fallbackValue = "N/A", fallbackLabel = "") => {
  if (!str || typeof str !== "string") {
    return { value: fallbackValue, label: fallbackLabel };
  }
  const parts = str.trim().split(" ");
  return {
    value: parts[0] || fallbackValue,
    label: parts.slice(1).join(" ") || fallbackLabel,
  };
};

// --- SUB-COMPONENT: PLAN FEATURE PILL ---
const FeaturePill = ({ icon: Icon, value, label }) => (
  <div className="flex items-center p-3 sm:p-4 bg-zinc-700 rounded-xl shadow-inner border border-zinc-600">
    <Icon size={24} className="text-blue-400 flex-shrink-0 mr-3" />
    <div className="text-left">
      <span className="text-xl font-bold text-zinc-100 block leading-tight">
        {value}
      </span>
      <span className="text-xs text-zinc-400 uppercase font-medium leading-tight">
        {label}
      </span>
    </div>
  </div>
);

// --- SUB-COMPONENT: VPS CARD ---
const VPSCard = ({ plan, onOrderClick }) => {
  const isFeatured = plan.isFeatured;
  const baseClasses = `p-6 md:p-8 rounded-3xl transition-all duration-500 h-full flex flex-col`;
  const featuredClasses =
    "bg-blue-600 text-white shadow-2xl shadow-blue-500/50 border-4 border-yellow-300 transform scale-105";
  const regularClasses =
    "bg-zinc-800 text-zinc-100 shadow-xl hover:shadow-2xl border-2 border-zinc-700 hover:border-blue-500";

  const cpu = safeSplit(plan.cpu, "N/A", "vCPU");
  const ram = safeSplit(plan.ram, "N/A", "GB RAM");
  const storage = safeSplit(plan.storage, "N/A", "NVMe");
  const bandwidth = safeSplit(plan.bandwidth, "N/A", "Unlimited");

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className={`${baseClasses} ${
        isFeatured ? featuredClasses : regularClasses
      } relative`}
    >
      {isFeatured && (
        <div className="absolute top-0 right-0 bg-yellow-400 text-blue-900 font-black text-sm uppercase px-4 py-1 rounded-bl-xl rounded-tr-3xl flex items-center gap-1">
          <Trophy size={16} /> Best Value
        </div>
      )}
      <h3
        className={`text-4xl font-extrabold tracking-tighter ${
          isFeatured ? "text-white" : "text-zinc-100"
        }`}
      >
        {plan.name}
      </h3>
      <p
        className={`mt-2 text-md ${
          isFeatured ? "text-blue-200" : "text-zinc-400"
        } mb-6`}
      >
        {plan.description || "High-performance VPS"}
      </p>
      <div
        className={`py-4 border-y ${
          isFeatured ? "border-blue-400" : "border-zinc-700"
        } mb-6`}
      >
        <span className="text-6xl font-black">${plan.pricePerMonth}</span>
        <span
          className={`text-lg ml-2 ${
            isFeatured ? "text-blue-200" : "text-zinc-400"
          }`}
        >
          /mo
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 flex-grow">
        <FeaturePill icon={Cpu} value={cpu.value} label={cpu.label} />
        <FeaturePill icon={MemoryStick} value={ram.value} label={ram.label} />
        <FeaturePill
          icon={HardDrive}
          value={storage.value}
          label={storage.label}
        />
        <FeaturePill
          icon={Cloud}
          value={bandwidth.value}
          label={bandwidth.label}
        />
      </div>
      <button
        onClick={() => onOrderClick(plan)}
        className={`mt-8 w-full py-3 rounded-full font-bold text-lg transition shadow-lg ${
          isFeatured
            ? "bg-yellow-400 text-blue-900 hover:bg-yellow-300 shadow-yellow-500/50"
            : "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-300/50"
        }`}
      >
        Order Now <Zap size={18} className="inline ml-2" />
      </button>
    </motion.div>
  );
};

// --- SUB-COMPONENT: ORDER MODAL ---
const OrderModal = ({ plan, onClose }) => {
  if (!plan) return null;

  const handleFinalOrder = async () => {
    const userData = localStorage.getItem("user");
    if (!userData) return alert("Please log in to continue.");

    let user;
    try {
      user = JSON.parse(userData);
    } catch {
      return alert("Invalid user data.");
    }

    if (!user._id || !user.email) return alert("User profile incomplete.");

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan._id,
          planName: plan.name,
          price: plan.pricePerMonth,
          userEmail: user.email,
          userId: user._id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch (err) {
      alert("Failed to start checkout: " + err.message);
    }
  };

  const cpu = safeSplit(plan.cpu, "N/A", "vCPU");
  const ram = safeSplit(plan.ram, "N/A", "GB RAM");
  const storage = safeSplit(plan.storage, "N/A", "NVMe");
  const bandwidth = safeSplit(plan.bandwidth, "N/A", "Unlimited");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/70"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -50, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-zinc-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8 border-b border-zinc-700 bg-zinc-900 flex justify-between items-center">
          <h2 className="text-3xl font-extrabold flex items-center">
            <Server size={30} className="text-blue-500 mr-3" />
            Confirm Your Order
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-200 transition"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 md:p-8 space-y-6">
          <div className="bg-zinc-700 p-5 rounded-xl border border-zinc-600">
            <p className="text-xl font-semibold text-blue-400">
              Selected Plan:
            </p>
            <h3 className="text-4xl font-black text-blue-500 mt-1">
              {plan.name}
            </h3>
            <p className="text-sm text-zinc-300 mt-2">{plan.description}</p>
          </div>
          <div className="flex justify-between items-center py-3 border-t border-b border-zinc-700">
            <span className="text-lg font-medium text-zinc-300">
              Monthly Price:
            </span>
            <span className="text-3xl font-extrabold text-blue-500">
              ${plan.pricePerMonth}
            </span>
          </div>
          <div className="space-y-4">
            <p className="text-xl font-semibold text-zinc-100">
              Technical Specifications:
            </p>
            <div className="grid grid-cols-2 gap-4">
              <FeaturePill icon={Cpu} value={cpu.value} label={cpu.label} />
              <FeaturePill
                icon={MemoryStick}
                value={ram.value}
                label={ram.label}
              />
              <FeaturePill
                icon={HardDrive}
                value={storage.value}
                label={storage.label}
              />
              <FeaturePill
                icon={Cloud}
                value={bandwidth.value}
                label={bandwidth.label}
              />
            </div>
          </div>
        </div>
        <div className="p-6 md:p-8 bg-zinc-900 border-t border-zinc-700 flex justify-end">
          <button
            onClick={handleFinalOrder}
            className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow-xl shadow-green-300/50 hover:bg-green-700 transition w-full justify-center"
          >
            <DollarSign size={20} /> Proceed to Checkout
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
const VPSPlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await fetch("/api/plans");
        const json = await res.json();
        console.log("Plans API Response:", json);

        if (!res.ok) throw new Error(json.message || "Failed to load plans");
        setPlans(json.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch VPS plans:", err);
        setError("Unable to load plans. Please try again later.");
        setLoading(false);
      }
    };
    loadPlans();
  }, []);

  const handleOrderNow = (plan) => setSelectedPlan(plan);
  const handleCloseModal = () => setSelectedPlan(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-6">
        <Loader2 size={48} className="text-blue-500 animate-spin" />
        <p className="mt-4 text-xl text-zinc-300">
          Loading high-performance plans...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-6">
        <AlertTriangle size={48} className="text-red-500" />
        <p className="mt-4 text-xl text-red-500">{error}</p>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-6">
        <p className="text-xl text-zinc-300">No VPS plans available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-inter bg-zinc-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-blue-950 relative overflow-hidden">
        <div className="mx-auto px-6 md:px-12 lg:px-28 text-center relative z-10">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-md"
          >
            Blazing Fast VPS Hosting
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-6 text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto"
          >
            Select from our range of Virtual Private Servers, built on{" "}
            <strong>NVMe SSDs</strong>, high-frequency CPUs, and managed with{" "}
            <strong>Pterodactyl</strong> for ultimate control.
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-10 flex justify-center gap-4"
          >
            {/* <button className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-xl shadow-blue-300/50 hover:bg-blue-500 transition">
              <BarChart3 size={20} /> View Performance Stats
            </button> */}
          </motion.div>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto px-6 md:px-12 lg:px-28">
          <h2 className="text-4xl font-extrabold text-zinc-100 text-center mb-12">
            VPS Tiers for Every Need
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
            {plans
              .sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
              .map((plan) => (
                <div key={plan._id} className="relative">
                  <VPSCard plan={plan} onOrderClick={handleOrderNow} />
                </div>
              ))}
          </div>
          <p className="mt-16 text-center text-zinc-400 text-sm">
            Need a custom solution?{" "}
            <a href="#" className="text-blue-500 font-semibold hover:underline">
              Contact our sales team
            </a>{" "}
            for a tailored enterprise quote.
          </p>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <OrderModal plan={selectedPlan} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default VPSPlansPage;
