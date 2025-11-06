"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MessageSquareText,
  Send,
  Loader2,
  Zap,
  Clock,
  ShieldCheck,
  Disc,
} from "lucide-react";

// --- SUB-COMPONENT: Contact Form ---
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API submission delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const success = Math.random() > 0.1; // Demo success rate

    if (success) {
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      console.log("Form submitted successfully:", formData);
    } else {
      setSubmitStatus("error");
      console.error("Form submission failed.");
    }

    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  const inputClasses =
    "w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition shadow-inner hover:bg-white";

  return (
    <motion.form
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.7 }}
      onSubmit={handleSubmit}
      className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100/50 space-y-7"
    >
      <h3 className="text-4xl font-bold text-gray-900 mb-2">Submit a Ticket</h3>
      <p className="text-gray-500 mb-6">
        For less urgent or detailed business inquiries.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className={inputClasses}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Your Detailed Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
          className={inputClasses}
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full flex items-center justify-center gap-2 py-4 rounded-full font-bold text-lg transition duration-300 shadow-lg ${
          isSubmitting
            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 shadow-indigo-500/50 hover:shadow-indigo-500/70"
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={20} className="animate-spin" /> Submitting Request...
          </>
        ) : (
          <>
            <Send size={20} /> Send Inquiry
          </>
        )}
      </button>

      {submitStatus === "success" && (
        <p className="text-center text-green-600 font-semibold mt-4 flex items-center justify-center gap-2">
          <ShieldCheck size={18} /> Thank you! Your ticket has been logged.
        </p>
      )}
      {submitStatus === "error" && (
        <p className="text-center text-red-600 font-semibold mt-4 flex items-center justify-center gap-2">
          <MessageSquareText size={18} /> Submission failed. Please use Discord
          for immediate assistance.
        </p>
      )}
    </motion.form>
  );
};

// --- SUB-COMPONENT: Contact Info Card ---
const InfoCard = ({
  icon: Icon,
  title,
  description,
  link,
  linkText,
  color,
  isPrimary,
}) => (
  <motion.div
    initial={{ x: 30, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.7 }}
    // Removed h-full to fix empty space issue
    className={`p-6 rounded-2xl flex flex-col items-start transition-all duration-300 ${
      isPrimary
        ? "bg-discord-blurple text-white shadow-xl shadow-indigo-400/50 hover:shadow-2xl"
        : "bg-white text-gray-900 border border-gray-200/50 shadow-md hover:shadow-lg"
    }`}
    style={{
      "--tw-bg-opacity": isPrimary ? "1" : undefined,
      "--discord-blurple": "#5865F2",
    }}
  >
    <Icon
      size={32}
      className={`mb-3 ${isPrimary ? "text-white" : `text-${color}-600`}`}
    />
    <h3
      className={`text-2xl font-bold ${
        isPrimary ? "text-white" : "text-gray-900"
      }`}
    >
      {title}
    </h3>
    <p
      className={`mt-1 text-base ${
        isPrimary ? "text-indigo-200" : "text-gray-600"
      }`}
    >
      {description}
    </p>

    {link && (
      <a
        href={link}
        // Added max-w-full to ensure button doesn't overflow container
        className={`mt-4 w-full text-center py-2.5 rounded-full font-extrabold transition text-lg shadow-md max-w-full ${
          isPrimary
            ? "bg-white text-discord-blurple hover:bg-gray-100 shadow-xl"
            : `bg-${color}-50 text-${color}-600 hover:bg-${color}-100 truncate`
        }`}
        style={{ "--discord-blurple": "#5865F2" }}
      >
        {linkText}
      </a>
    )}
  </motion.div>
);

// --- MAIN COMPONENT: APP ---
const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-white via-indigo-50 to-blue-100 relative overflow-hidden">
        <div className=" mx-auto px-6 md:px-12 lg:px-28 text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter 
                       bg-gradient-to-r from-indigo-700 to-blue-800 
                       bg-clip-text text-transparent drop-shadow-lg"
          >
            The Support Nexus
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto font-medium"
          >
            Instant answers or in-depth inquiries. Choose your preferred way to
            connect with our global support team.
          </motion.p>
        </div>
      </section>

      {/* Main Content Grid: Form (Left) & Info (Right) */}
      <section className="py-16 md:py-24">
        <div className=" mx-auto px-6 md:px-12 lg:px-28">
          {/* Removed items-stretch from the main grid to prevent cards from stretching */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form (2/3 width on desktop) */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Information Cards (1/3 width on desktop) */}
            <div className="lg:col-span-1 space-y-8 pt-4">
              <h2 className="text-3xl font-extrabold text-gray-900 border-b-4 border-indigo-400/50 pb-3">
                Contact Channels
              </h2>

              {/* PRIMARY CTA: Discord (Should no longer have empty space) */}
              <InfoCard
                icon={Disc}
                title="24/7 Priority Discord Support"
                description="This is the **FASTEST** way to get technical, live assistance. Connect with our dedicated support team and community now."
                link="#"
                linkText="Launch Discord (Immediate)"
                color="indigo"
                isPrimary={true}
              />

              {/* Sales card (Should no longer overflow) */}
              <InfoCard
                icon={Mail}
                title="Sales & Custom Inquiries"
                description="For business partnerships, detailed custom plans, or non-technical questions, please email our sales department."
                link="mailto:sales@examplehost.com"
                linkText="Email Sales Department"
                color="blue"
                isPrimary={false}
              />

              <InfoCard
                icon={Clock}
                title="Administrative Hours"
                description="Our office is open for administrative, billing, and postal matters Mon-Fri, 9:00 AM - 5:00 PM EST."
                link="#"
                linkText="Check Local Time"
                color="gray"
                isPrimary={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final Support Guarantee CTA */}
      <section className="bg-indigo-900 py-12 md:py-16">
        <div className=" mx-auto px-6 md:px-12 lg:px-28 text-center text-white">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <Zap size={64} className="mx-auto text-yellow-400 mb-4" />
            <h3 className="text-4xl font-extrabold mb-3">Commitment to You</h3>
            <p className="text-xl text-indigo-200 max-w-4xl mx-auto">
              Our support team is globally distributed and online around the
              clock. Your stability is our priority, no matter the time zone or
              severity of the issue.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Required custom style for Discord color */}
      <style>{`
        /* Custom Tailwind color definition for Discord Blurple */
        .bg-discord-blurple {
            background-color: #5865F2;
        }
        .text-discord-blurple {
            color: #5865F2;
        }
      `}</style>
    </div>
  );
};

export default App;
