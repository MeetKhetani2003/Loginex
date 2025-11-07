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
import { submitInquiry } from "@/lib/api";

// --- SUB-COMPONENT: Contact Form ---
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await submitInquiry({
        type: "general",
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setSubmitStatus("error");
      console.error("Contact form failed:", err.message);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 border border-zinc-700 bg-zinc-800 text-white rounded-xl focus:ring-blue-500 focus:border-blue-500 transition shadow-inner hover:bg-zinc-700 placeholder:text-zinc-400";

  return (
    <motion.form
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.7 }}
      onSubmit={handleSubmit}
      className="bg-zinc-900 p-8 md:p-12 rounded-3xl shadow-xl border border-zinc-800 space-y-7"
    >
      <h3 className="text-4xl font-bold text-white mb-2">Submit a Ticket</h3>
      <p className="text-zinc-400 mb-6">
        For less urgent or detailed business inquiries.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-zinc-200 mb-1"
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
            className="block text-sm font-semibold text-zinc-200 mb-1"
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
          className="block text-sm font-semibold text-zinc-200 mb-1"
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
          className="block text-sm font-semibold text-zinc-200 mb-1"
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
            ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-blue-500/50 hover:shadow-blue-500/70"
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
        <p className="text-center text-green-500 font-semibold mt-4 flex items-center justify-center gap-2">
          <ShieldCheck size={18} /> Thank you! Your ticket has been logged.
        </p>
      )}
      {submitStatus === "error" && (
        <p className="text-center text-red-500 font-semibold mt-4 flex items-center justify-center gap-2">
          <MessageSquareText size={18} /> Submission failed. Please use Discord
          for immediate assistance.
        </p>
      )}
    </motion.form>
  );
};

// --- SUB-COMPONENT: Info Card ---
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
    className={`p-6 rounded-2xl flex flex-col items-start transition-all duration-300 ${
      isPrimary
        ? "bg-blue-700 text-white shadow-xl shadow-blue-500/50 hover:shadow-2xl"
        : "bg-zinc-800 text-zinc-200 border border-zinc-700 shadow-md hover:shadow-lg"
    }`}
  >
    <Icon
      size={32}
      className={`mb-3 ${isPrimary ? "text-white" : `text-${color}-400`}`}
    />
    <h3
      className={`text-2xl font-bold ${
        isPrimary ? "text-white" : "text-white"
      }`}
    >
      {title}
    </h3>
    <p
      className={`mt-1 text-base ${
        isPrimary ? "text-blue-200" : "text-zinc-400"
      }`}
    >
      {description}
    </p>

    {link && (
      <a
        href={link}
        className={`mt-4 w-full text-center py-2.5 rounded-full font-extrabold transition text-lg shadow-md ${
          isPrimary
            ? "bg-white text-blue-700 hover:bg-gray-200 shadow-xl"
            : "bg-zinc-700 text-blue-400 hover:bg-zinc-600 truncate"
        }`}
      >
        {linkText}
      </a>
    )}
  </motion.div>
);

// --- MAIN COMPONENT: App ---
const App = () => {
  return (
    <div className="min-h-screen bg-zinc-900 font-inter">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-blue-950 relative overflow-hidden">
        <div className=" mx-auto px-6 md:px-12 lg:px-28 text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter 
                       bg-gradient-to-r from-blue-500 to-blue-700 
                       bg-clip-text text-transparent drop-shadow-lg"
          >
            The Support Nexus
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-6 text-xl text-zinc-300 max-w-3xl mx-auto font-medium"
          >
            Instant answers or in-depth inquiries. Choose your preferred way to
            connect with our global support team.
          </motion.p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 md:py-24">
        <div className=" mx-auto px-6 md:px-12 lg:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div className="lg:col-span-1 space-y-8 pt-4">
              <h2 className="text-3xl font-extrabold text-white border-b-4 border-blue-500/50 pb-3">
                Contact Channels
              </h2>

              <InfoCard
                icon={Disc}
                title="24/7 Priority Discord Support"
                description="This is the **FASTEST** way to get technical, live assistance. Connect with our dedicated support team and community now."
                link="#"
                linkText="Launch Discord (Immediate)"
                color="blue"
                isPrimary={true}
              />

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
                color="blue"
                isPrimary={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final Support Guarantee CTA */}
      <section className="bg-blue-950 py-12 md:py-16">
        <div className=" mx-auto px-6 md:px-12 lg:px-28 text-center text-white">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <Zap size={64} className="mx-auto text-yellow-400 mb-4" />
            <h3 className="text-4xl font-extrabold mb-3">Commitment to You</h3>
            <p className="text-xl text-blue-300 max-w-4xl mx-auto">
              Our support team is globally distributed and online around the
              clock. Your stability is our priority, no matter the time zone or
              severity of the issue.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default App;
