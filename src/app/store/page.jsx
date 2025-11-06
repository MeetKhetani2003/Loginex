"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence for the modal
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
  X, // Icon for closing the modal
} from "lucide-react";

// --- MOCK API DATA & CONSTANTS ---

// This structure simulates the data fetched from the API
const mockPlans = [
  {
    id: "vps-01",
    name: "Nano",
    tagline: "Starter VPS for personal projects and testing.",
    cpu: { value: 1, label: "vCPU @ 3.0GHz", icon: Cpu },
    ram: { value: 1, label: "GB DDR5", icon: MemoryStick },
    storage: { value: 25, label: "NVMe SSD", icon: HardDrive },
    bandwidth: { value: 1, label: "TB High-Speed", icon: Cloud },
    price: 4.99,
    isFeatured: false,
  },
  {
    id: "vps-02",
    name: "Standard",
    tagline: "Ideal balance for small websites and game bots.",
    cpu: { value: 2, label: "vCPUs @ 3.5GHz", icon: Cpu },
    ram: { value: 4, label: "GB DDR5", icon: MemoryStick },
    storage: { value: 80, label: "NVMe SSD", icon: HardDrive },
    bandwidth: { value: 3, label: "TB High-Speed", icon: Cloud },
    price: 19.99,
    isFeatured: true,
  },
  {
    id: "vps-03",
    name: "Pro",
    tagline:
      "High-power performance for demanding applications or small clusters.",
    cpu: { value: 4, label: "vCPUs @ 4.0GHz", icon: Cpu },
    ram: { value: 8, label: "GB DDR5", icon: MemoryStick },
    storage: { value: 150, label: "NVMe SSD", icon: HardDrive },
    bandwidth: { value: 6, label: "TB High-Speed", icon: Cloud },
    price: 49.99,
    isFeatured: false,
  },
  {
    id: "vps-04",
    name: "Elite",
    tagline: "Maximum resources for production environments and traffic.",
    cpu: { value: 8, label: "vCPUs @ 4.5GHz", icon: Cpu },
    ram: { value: 16, label: "GB DDR5", icon: MemoryStick },
    storage: { value: 300, label: "NVMe SSD", icon: HardDrive },
    bandwidth: { value: 10, label: "TB High-Speed", icon: Cloud },
    price: 99.99,
    isFeatured: false,
  },
];

const API_MODEL = "gemini-2.5-flash-preview-09-2025";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${API_MODEL}:generateContent?key=`; // Key will be added by Canvas

/**
 * Simulates fetching VPS plans from an external API.
 */
const fetchVPSPlans = async () => {
  const apiKey = "";
  const apiUrl = API_URL + apiKey;

  // Simulate network request delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Return mock data for demonstration
  return mockPlans;
};

// --- SUB-COMPONENT: PLAN FEATURE PILL ---

const FeaturePill = ({ icon: Icon, value, label }) => (
  <div className="flex items-center p-3 sm:p-4 bg-white rounded-xl shadow-inner border border-gray-100">
    <Icon size={24} className="text-blue-500 flex-shrink-0 mr-3" />
    <div className="text-left">
      <span className="text-xl font-bold text-gray-800 block leading-tight">
        {value}
      </span>
      <span className="text-xs text-gray-500 uppercase font-medium leading-tight">
        {label}
      </span>
    </div>
  </div>
);

// --- SUB-COMPONENT: VPS CARD (Modified to include onOrderClick) ---

const VPSCard = ({ plan, onOrderClick }) => {
  const isFeatured = plan.isFeatured;
  const baseClasses = `p-6 md:p-8 rounded-3xl transition-all duration-500 h-full flex flex-col`;
  const featuredClasses =
    "bg-blue-600 text-white shadow-2xl shadow-blue-500/50 border-4 border-yellow-300 transform scale-105";
  const regularClasses =
    "bg-white text-gray-900 shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-blue-200";

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: isFeatured ? -5 : -5 }}
      className={`${baseClasses} ${
        isFeatured ? featuredClasses : regularClasses
      } relative`}
    >
      {isFeatured && (
        <div className="absolute top-0 right-0 bg-yellow-400 text-blue-900 font-black text-sm uppercase px-4 py-1 rounded-bl-xl rounded-tr-3xl flex items-center gap-1">
          <Trophy size={16} /> Best Value
        </div>
      )}

      {/* Header and Title */}
      <h3
        className={`text-4xl font-extrabold tracking-tighter ${
          isFeatured ? "text-white" : "text-gray-800"
        }`}
      >
        {plan.name}
      </h3>
      <p
        className={`mt-2 text-md ${
          isFeatured ? "text-blue-200" : "text-gray-500"
        } mb-6`}
      >
        {plan.tagline}
      </p>

      {/* Pricing Block */}
      <div
        className={`py-4 border-y ${
          isFeatured ? "border-blue-400" : "border-gray-200"
        } mb-6`}
      >
        <span className="text-6xl font-black">${plan.price}</span>
        <span
          className={`text-lg ml-2 ${
            isFeatured ? "text-blue-200" : "text-gray-500"
          }`}
        >
          /mo
        </span>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-2 gap-4 flex-grow">
        <FeaturePill
          icon={plan.cpu.icon}
          value={`${plan.cpu.value} ${plan.cpu.label.split(" ")[0]}`}
          label={plan.cpu.label.split(" ").slice(1).join(" ") || "CPU"}
        />
        <FeaturePill
          icon={plan.ram.icon}
          value={`${plan.ram.value} GB`}
          label={plan.ram.label}
        />
        <FeaturePill
          icon={plan.storage.icon}
          value={`${plan.storage.value} GB`}
          label={plan.storage.label}
        />
        <FeaturePill
          icon={plan.bandwidth.icon}
          value={`${plan.bandwidth.value} TB`}
          label={plan.bandwidth.label}
        />
      </div>

      {/* CTA Button - Now triggers the modal */}
      <button
        onClick={() => onOrderClick(plan)}
        className={`mt-8 w-full py-3 rounded-full font-bold text-lg transition shadow-lg 
                    ${
                      isFeatured
                        ? "bg-yellow-400 text-blue-900 hover:bg-yellow-300 shadow-yellow-500/50"
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-300/50"
                    }`}
      >
        Order Now
        <Zap size={18} className="inline ml-2" />
      </button>
    </motion.div>
  );
};

// --- SUB-COMPONENT: ORDER MODAL ---

const OrderModal = ({ plan, onClose }) => {
  // Safety check: if no plan is provided, don't render the modal
  if (!plan) return null;

  // NOTE: Using a custom alert instead of window.alert() as per instructions.
  const handleFinalOrder = () => {
    const message = `Order placed successfully for the ${plan.name} Plan at $${plan.price}/mo! We'll redirect you to the payment gateway shortly.`;
    // Replace this with a custom message box UI in a production environment
    console.log(message);
    onClose();

    // Use a simple, non-blocking UI alert message (as a console log equivalent in the absence of a custom component)
    const mockAlert = document.createElement("div");
    mockAlert.className =
      "fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-xl z-[9999]";
    mockAlert.textContent = message.split(".")[0] + "!";
    document.body.appendChild(mockAlert);
    setTimeout(() => document.body.removeChild(mockAlert), 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/50"
      onClick={onClose} // Close when clicking outside
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -50, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to backdrop
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b bg-gray-50 flex justify-between items-center">
          <h2 className="text-3xl font-extrabold text-gray-800 flex items-center">
            <Server size={30} className="text-blue-600 mr-3" />
            Confirm Your Order
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Plan Summary */}
          <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
            <p className="text-xl font-semibold text-blue-700">
              Selected Plan:
            </p>
            <h3 className="text-4xl font-black text-blue-800 mt-1">
              {plan.name}
            </h3>
            <p className="text-sm text-gray-600 mt-2">{plan.tagline}</p>
          </div>

          {/* Pricing */}
          <div className="flex justify-between items-center py-3 border-t border-b">
            <span className="text-lg font-medium text-gray-600">
              Monthly Price:
            </span>
            <span className="text-3xl font-extrabold text-blue-600">
              ${plan.price}
            </span>
          </div>

          {/* Technical Specs Review */}
          <div className="space-y-4">
            <p className="text-xl font-semibold text-gray-800">
              Technical Specifications:
            </p>
            <div className="grid grid-cols-2 gap-4">
              <FeaturePill
                icon={plan.cpu.icon}
                value={`${plan.cpu.value} ${plan.cpu.label.split(" ")[0]}`}
                label={plan.cpu.label.split(" ").slice(1).join(" ") || "CPU"}
              />
              <FeaturePill
                icon={plan.ram.icon}
                value={`${plan.ram.value} GB`}
                label={plan.ram.label}
              />
              <FeaturePill
                icon={plan.storage.icon}
                value={`${plan.storage.value} GB`}
                label={plan.storage.label}
              />
              <FeaturePill
                icon={plan.bandwidth.icon}
                value={`${plan.bandwidth.value} TB`}
                label={plan.bandwidth.label}
              />
            </div>
          </div>
        </div>

        {/* Footer and Final CTA */}
        <div className="p-6 md:p-8 bg-gray-50 border-t flex justify-end">
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

// --- MAIN COMPONENT: VPS PLANS PAGE (Updated with Modal State) ---

const VPSPlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for Modal
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const data = await fetchVPSPlans();
        setPlans(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch VPS plans:", err);
        setError("Unable to load plans. Please try again later.");
        setLoading(false);
      }
    };
    loadPlans();
  }, []);

  // Handler to open the modal and set the selected plan
  const handleOrderNow = (plan) => {
    setSelectedPlan(plan);
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setSelectedPlan(null);
  };

  // --- RENDERING LOGIC ---

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <Loader2 size={48} className="text-blue-500 animate-spin" />
        <p className="mt-4 text-xl text-gray-600">
          Loading high-performance plans...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <AlertTriangle size={48} className="text-red-500" />
        <p className="mt-4 text-xl text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-white via-blue-50 to-indigo-100 relative overflow-hidden">
        <div className=" mx-auto px-6 md:px-12 lg:px-28 text-center relative z-10">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter 
                       bg-gradient-to-r from-blue-700 to-indigo-800 
                       bg-clip-text text-transparent drop-shadow-md"
          >
            Blazing Fast VPS Hosting
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Select from our range of Virtual Private Servers, built on **NVMe
            SSDs, high-frequency CPUs, and managed with Pterodactyl** for
            ultimate control and performance.
          </motion.p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-10 flex justify-center gap-4"
          >
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold shadow-xl shadow-indigo-300/50 hover:bg-indigo-700 transition">
              <BarChart3 size={20} /> View Performance Stats
            </button>
          </motion.div>
        </div>
      </section>

      {/* Plans Grid Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className=" mx-auto px-6 md:px-12 lg:px-28">
          <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-12">
            VPS Tiers for Every Need
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
            {plans
              // Sort to ensure the featured plan appears early in the display
              .sort((a, b) => b.isFeatured - a.isFeatured)
              .map((plan) => (
                <div key={plan.id} className="relative">
                  {/* Pass the handler to the VPSCard */}
                  <VPSCard plan={plan} onOrderClick={handleOrderNow} />
                </div>
              ))}
          </div>

          <p className="mt-16 text-center text-gray-500 text-sm">
            Need a custom solution?{" "}
            <a href="#" className="text-blue-600 font-semibold hover:underline">
              Contact our sales team
            </a>{" "}
            for a tailored enterprise quote.
          </p>
        </div>
      </section>

      {/* Order Modal (Conditionally Rendered with Animations) */}
      <AnimatePresence>
        {selectedPlan && (
          <OrderModal plan={selectedPlan} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default VPSPlansPage;
