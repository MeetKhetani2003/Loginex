"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Server,
  Code,
  CheckCircle,
  Quote,
  Zap,
  Cpu,
  Package,
  GanttChart,
  HardHat,
  Monitor,
  Rocket,
  X,
  Send,
  Loader2,
  Mail,
  Smartphone,
} from "lucide-react";
import axios from "axios";
import { submitInquiry } from "@/lib/api";

// --- 1. Data Structure for Services ---

const servicesData = [
  {
    id: "minecraft",
    icon: Server,
    title: "High-Performance Minecraft Hosting",
    subtitle: "Lag-Free Gameplay with Optimized Hardware and Mod Support.",
    theme: "text-orange-600",
    gradient: "from-orange-500/10 to-orange-50/70",
    features: [
      "Dedicated high-frequency CPU cores (up to 5.0 GHz).",
      "Automatic Modpack and Plugin deployment.",
      "Optimized DDoS protection tailored for gaming.",
      "Instant one-click server version switching (Paper, Fabric, Forge).",
      "Unlimited NVMe SSD storage for blazing fast chunk loading.",
    ],
    pricing: "Starting at $14.99/mo",
    stats: [
      { count: "99.98%", label: "Uptime" },
      { count: "1.2k+", label: "Servers" },
      { count: "15ms", label: "Latency" },
    ],
    testimonial: {
      feedback:
        "The responsiveness is unparalleled. We haven't had a single lag spike since moving to Loginex. The best host for large community servers.",
      name: "Alex 'GameMaster' Chen",
      role: "Community Server Owner",
    },
    visualIcon: Package,
  },
  {
    id: "webdev",
    icon: Code,
    title: "Full-Stack Web Development & Consulting",
    subtitle: "Custom Solutions built with Next.js, React, and Modern APIs.",
    theme: "text-blue-600",
    gradient: "from-blue-500/10 to-blue-50/70",
    features: [
      "Bespoke UI/UX design and mobile-first responsiveness.",
      "Robust Backend API development (Node.js/Express/Databases).",
      "Seamless payment gateway integration (Stripe, Razorpay, PayPal).",
      "SEO optimization and high performance grading.",
      "Scalable deployment strategies (Vercel, AWS, DigitalOcean).",
    ],
    pricing: "Projects start at $1,500",
    stats: [
      { count: "100+", label: "Projects Launched" },
      { count: "4.9", label: "Page Speed" },
      { count: "100%", label: "Satisfaction" },
    ],
    testimonial: {
      feedback:
        "Loginex delivered our e-commerce site faster than quoted. Their technical expertise with modern frameworks made the site incredibly fast and easy to manage.",
      name: "Priya Soni",
      role: "E-commerce Founder",
    },
    visualIcon: GanttChart,
  },
  {
    id: "vps",
    icon: Cpu,
    title: "Managed VPS Hosting (Pterodactyl Panel)",
    subtitle: "Complete Control and Easy Management for All Your Applications.",
    theme: "text-cyan-600",
    gradient: "from-cyan-500/10 to-cyan-50/70",
    features: [
      "Instant deployment and full root access (SSH).",
      "Intuitive Pterodactyl panel for easy resource management.",
      "High-speed NVMe SSDs and dedicated IP addresses.",
      "Choice of Linux OS and one-click firewall setup.",
      "Perfect for hosting Docker, websites, bots, and multiple game servers.",
    ],
    pricing: "Starting at $29.99/mo",
    stats: [
      { count: "99.99%", label: "Uptime" },
      { count: "5+", label: "Data Centers" },
      { count: "10k+", label: "Instances" },
    ],
    testimonial: {
      feedback:
        "The Pterodactyl panel integration is a game-changer. Managing multiple services across different OSs is incredibly simple and reliable.",
      name: "David K.",
      role: "DevOps Engineer",
    },
    visualIcon: Monitor,
  },
];

// --- 2. Sub-components for structure and styling ---

const ServiceFeature = ({ text, theme }) => (
  <li className="flex items-start gap-3 text-gray-700 text-lg">
    {/* Consistent color for checkmarks for readability */}
    <CheckCircle size={20} className={`flex-shrink-0 mt-1 text-green-500`} />
    {text}
  </li>
);

const StatBox = ({ count, label, theme }) => (
  <div className="text-center p-3 bg-white/80 backdrop-blur-md rounded-xl border border-white shadow-xl hover:shadow-2xl transition duration-300">
    <motion.div
      initial={{ scale: 0.8 }}
      whileInView={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`text-2xl sm:text-3xl font-extrabold ${theme}`}
    >
      {count}
    </motion.div>
    <p className="mt-1 text-gray-600 font-medium text-xs sm:text-sm">{label}</p>
  </div>
);

// Added onInquire prop
const DetailedServiceSection = ({ service, index, onInquire }) => {
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.2 }}
      className={`relative py-16 md:py-24 border-b border-gray-100 last:border-b-0 overflow-hidden 
                  ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
    >
      <div
        className={` mx-auto px-6 md:px-12 lg:px-28 
                    flex flex-col-reverse md:flex-row gap-10 lg:gap-20 items-center 
                    ${isReversed ? "md:flex-row-reverse" : ""}`}
      >
        {/* LEFT/RIGHT Content (Features, Pricing, CTA) - Takes full width on mobile */}
        <div className="w-full md:w-1/2">
          <div className="flex items-center gap-4 mb-4">
            <service.icon
              size={36}
              className={`hidden sm:block ${service.theme}`}
            />
            <h2
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-800 ${service.theme}`}
            >
              {service.title}
            </h2>
          </div>
          <p className="text-lg text-gray-500 mb-8 max-w-lg">
            {service.subtitle}
          </p>

          {/* Feature List */}
          <ul className="space-y-4 mb-10">
            {service.features.map((feature, i) => (
              <ServiceFeature key={i} text={feature} theme={service.theme} />
            ))}
          </ul>

          {/* Pricing and CTA */}
          <div className="p-5 rounded-2xl border-2 border-dashed border-blue-200 bg-white shadow-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-500">
                Service Plans
              </p>
              <p className={`text-3xl font-extrabold ${service.theme} mt-1`}>
                {service.pricing}
              </p>
            </div>
            {/* Button updated to trigger the modal and set the service */}
            <button
              onClick={() => onInquire(service)}
              className={`w-full sm:w-auto px-8 py-3 rounded-full font-bold text-white transition 
                          bg-gradient-to-r from-blue-600 to-cyan-500 shadow-xl shadow-blue-300/50 
                          hover:scale-[1.03] hover:shadow-blue-400/70`}
            >
              Start Now
              <Rocket size={18} className="inline ml-2" />
            </button>
          </div>
        </div>

        {/* RIGHT/LEFT Visual Block (Stats and Testimonial) - Takes full width on mobile */}
        <div
          className={`w-full md:w-1/2 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-gray-300/50 border border-white 
                      bg-gradient-to-br ${service.gradient} flex flex-col gap-6 h-full`}
        >
          {/* Visual Icon Header */}
          <div className="flex justify-center items-center h-40 sm:h-52 rounded-2xl bg-white/70 border border-white shadow-inner shadow-gray-200/50">
            <service.visualIcon
              size={100}
              className={`${service.theme} opacity-30`}
            />
          </div>

          {/* Service Stats */}
          <div className="grid grid-cols-3 gap-3">
            {service.stats.map((stat, i) => (
              <StatBox
                key={i}
                count={stat.count}
                label={stat.label}
                theme={service.theme}
              />
            ))}
          </div>

          {/* Testimonial Card */}
          <div className="p-6 bg-white rounded-xl shadow-2xl shadow-blue-100/70 border-l-4 border-blue-500 relative mt-4">
            <Quote
              size={28}
              className="text-blue-400 opacity-60 mb-3 absolute top-3 left-3"
            />
            <p className="text-gray-700 italic leading-relaxed pt-3">
              "{service.testimonial.feedback}"
            </p>
            <div className="mt-4 text-right border-t pt-3">
              <p className="text-sm font-semibold text-gray-800">
                — {service.testimonial.name}
              </p>
              <p className="text-xs text-gray-500">
                {service.testimonial.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- 3. Inquiry Modal Component ---

const InquiryModal = ({ isOpen, onClose, service }) => {
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // null, 'success', 'error'

  if (!isOpen || !service) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
   e.preventDefault();
   setIsSubmitting(true);
   setStatus(null);

   try {
     let serviceType = "general";
     if (service.id === "minecraft") serviceType = "minecraft";
     else if (service.id === "webdev") serviceType = "webdev";
     else if (service.id === "vps") serviceType = "vps";

     await submitInquiry({
       type: serviceType,
       email: formData.email,
       mobile: formData.mobile,
       description: formData.description,
     });

     setStatus("success");
   } catch (err) {
     setStatus("error");
     console.error("Inquiry failed:", err.message);
   } finally {
     setIsSubmitting(false);
   }

   // Auto-close after success
   if (status === "success") {
     setTimeout(() => {
       onClose();
       setFormData({ email: "", mobile: "", description: "" });
       setStatus(null);
     }, 2000);
   }
 };

  const inputClasses =
    "w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition shadow-sm";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-blue-600 text-white">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <service.icon size={24} /> Service Inquiry
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Selected Service Detail */}
          <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
            <p className="text-sm font-semibold text-blue-700">
              Service Selected:
            </p>
            <p className="text-xl font-extrabold text-gray-900">
              {service.title}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-1 flex items-center"
              >
                <Mail size={16} className="mr-2 text-blue-500" /> Email Address
                (Required)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClasses}
                placeholder="you@example.com"
              />
            </div>

            {/* Mobile Field */}
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-semibold text-gray-700 mb-1 flex items-center"
              >
                <Smartphone size={16} className="mr-2 text-blue-500" /> Mobile
                Number (Optional)
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className={inputClasses}
                placeholder="+1 555 123 4567"
              />
            </div>

            {/* Description Field */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Detailed Requirement Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="5"
                value={formData.description}
                onChange={handleChange}
                required
                className={inputClasses}
                placeholder={`Please describe your needs, budget, and timeline for the ${service.title} service...`}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || status === "success"}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-bold text-lg transition duration-300 shadow-md ${
                isSubmitting
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : status === "success"
                  ? "bg-green-500 text-white"
                  : status === "error"
                  ? "bg-red-500 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> Sending...
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle size={20} /> Sent!
                </>
              ) : status === "error" ? (
                <>
                  <X size={20} /> Failed
                </>
              ) : (
                <>
                  <Send size={20} /> Submit Inquiry
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// --- 4. Main Page Component ---

const ServicesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Function passed to the children to open the modal
  const handleOpenModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-to-br from-white via-blue-50 to-cyan-50 relative overflow-hidden">
        {/* Background Glows (Enhanced for depth) */}
        <div className="absolute w-[800px] h-[800px] top-[-500px] left-1/2 -translate-x-1/2 rounded-full bg-blue-300/20 blur-[200px] pointer-events-none" />
        <div className="absolute w-[600px] h-[600px] bottom-[-400px] right-[-300px] rounded-full bg-cyan-300/15 blur-[150px] pointer-events-none" />

        <div className=" mx-auto px-6 md:px-12 lg:px-28 text-center relative z-10">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter 
                       bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 
                       bg-clip-text text-transparent drop-shadow-md"
          >
            Infrastructure and Code, <br className="hidden md:inline" /> Built
            to Scale
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Explore our professional hosting and development services—each
            designed for **maximum performance, reliability, and ease of
            management**.
          </motion.p>
        </div>
      </section>

      {/* Services Detail Sections */}
      <section className="bg-white">
        {servicesData.map((service, index) => (
          <DetailedServiceSection
            key={service.id}
            service={service}
            index={index}
            onInquire={handleOpenModal} // Pass the handler here
          />
        ))}
      </section>

      {/* Inquiry Modal (Renders conditionally) */}
      <InquiryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        service={selectedService}
      />
    </div>
  );
};

export default ServicesPage;
