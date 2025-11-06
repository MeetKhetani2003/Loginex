"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Code,
  Shield,
  MessageSquareText,
  FileText,
  Zap,
  ShieldCheck,
} from "lucide-react";

// --- MOCK DATA ---
const teamMembers = [
  {
    name: "Atlas",
    rank: "Lead Architect",
    role: "Backend Infrastructure",
    imageUrl: "https://placehold.co/120x120/1E40AF/ffffff?text=A", // Blue Placeholder
  },
  {
    name: "Nyx",
    rank: "Community Manager",
    role: "Discord Support & Engagement",
    imageUrl: "https://placehold.co/120x120/B91C1C/ffffff?text=N", // Red Placeholder
  },
  {
    name: "Zeno",
    rank: "Operations Head",
    role: "System Uptime & Monitoring",
    imageUrl: "https://placehold.co/120x120/059669/ffffff?text=Z", // Green Placeholder
  },
  {
    name: "Kore",
    rank: "Creative Lead",
    role: "UI/UX & Design",
    imageUrl: "https://placehold.co/120x120/9333EA/ffffff?text=K", // Purple Placeholder
  },
];

// --- SUB-COMPONENT: TEAM CARD ---
const TeamMemberCard = ({ member }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    whileHover={{
      scale: 1.05,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    }}
    className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 flex flex-col items-center text-center transition-all duration-300"
  >
    <img
      src={member.imageUrl}
      alt={member.name}
      className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-md"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "https://placehold.co/120x120/60A5FA/ffffff?text=👤";
      }} // Fallback
    />
    <h3 className="mt-4 text-xl font-bold text-gray-900">{member.name}</h3>
    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
      {member.rank}
    </p>
    <p className="mt-2 text-sm text-gray-500">{member.role}</p>
  </motion.div>
);

// --- MAIN COMPONENT: ABOUT PAGE ---
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-white via-gray-50 to-indigo-50 relative overflow-hidden">
        <div className=" mx-auto px-6 md:px-12 lg:px-28">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-center
                       text-gray-900 drop-shadow-md"
          >
            Who We Are
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-6 text-lg sm:text-xl text-gray-500 max-w-4xl mx-auto text-center"
          >
            Built on trust, powered by performance. Discover the philosophy and
            the people behind our high-speed hosting solutions.
          </motion.p>
        </div>
      </section>

      {/* About Text and Image Section (Text Left, Image Right) */}
      <section className="py-16 md:py-24">
        <div className=" mx-auto px-6 md:px-12 lg:px-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content (Left) */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 flex items-center gap-3">
              <Code className="text-blue-500" size={36} />
              Our Foundation: Speed & Stability
            </h2>
            <p className="text-gray-600 text-lg">
              We started with a single goal: to eliminate compromise in cloud
              hosting. Our infrastructure is engineered from the ground up,
              utilizing **NVMe storage arrays and high-frequency CPUs** to
              ensure that your applications run not just fast, but consistently
              fast, regardless of the load. We believe performance shouldn't be
              a premium add-on; it should be the standard.
            </p>
            <p className="text-gray-600 text-lg">
              Beyond the hardware, we prioritize control and transparency. Our
              control panel offers granular access to every setting, giving
              developers and advanced users the power to fully optimize their
              environments. This commitment to superior tech and user autonomy
              is what sets us apart in a crowded market.
            </p>
            <p className="text-gray-600 text-lg font-semibold border-l-4 border-blue-500 pl-3 italic">
              "Every server deployment is handled with precision and an
              uncompromising focus on uptime and security."
            </p>
          </motion.div>

          {/* Image (Right) */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block w-full h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl shadow-blue-300/50"
          >
            <img
              src="https://placehold.co/700x500/1D4ED8/ffffff?text=Data+Center+View"
              alt="Modern data center server racks"
              className="w-full h-full object-cover transition duration-500 hover:scale-105"
            />
          </motion.div>
        </div>
      </section>

      {/* Team Section: Brotherhood & Brocode */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className=" mx-auto px-6 md:px-12 lg:px-28 text-center">
          {/* Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ShieldCheck size={48} className="mx-auto text-blue-600 mb-4" />
            <h2 className="text-4xl font-extrabold text-gray-900">
              The Team: A Brotherhood Built on Brocode
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              We aren't just staff; we're a dedicated unit. Our collective runs
              on a deep-seated **Brocode** of mutual support, integrity, and
              relentless dedication to our users.
            </p>
          </motion.div>

          {/* Staff Grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>

          {/* Discord & Support CTA */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 bg-blue-700 p-8 rounded-2xl shadow-2xl text-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-left">
                <h3 className="text-3xl font-extrabold flex items-center gap-3">
                  <MessageSquareText size={36} className="text-yellow-300" />
                  24/7 Support: We Got Your Back. Always.
                </h3>
                <p className="mt-2 text-blue-200 text-lg">
                  The Brocode extends to you. Our entire team is available
                  around the clock on **Discord** to handle issues, answer
                  queries, and guide your infrastructure setup.
                </p>
              </div>
              <button className="mt-6 md:mt-0 flex items-center gap-2 bg-yellow-400 text-blue-900 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-yellow-300 transition shrink-0">
                <Zap size={20} /> Join Our Discord
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terms and Conditions Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className=" mx-auto px-6 md:px-12 lg:px-28">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
            <FileText className="text-red-500" size={32} />
            Terms & Conditions (T&C)
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
            className="bg-gray-100 p-8 rounded-xl text-gray-700 space-y-4 text-sm leading-relaxed"
          >
            <p>
              **1. Service Agreement:** All VPS and related services are
              provided "as is" and "as available." While we strive for 100%
              uptime, scheduled maintenance and unforeseen circumstances may
              result in temporary interruptions. We will provide reasonable
              notice for all planned service disruptions.
            </p>
            <p>
              **2. Acceptable Use Policy (AUP):** Users are prohibited from
              engaging in illegal activities, including but not limited to
              hosting malicious software, conducting DDoS attacks, or engaging
              in unauthorized mass mailings (spam). Violation of the AUP will
              result in immediate service termination without refund.
            </p>
            <p>
              **3. Billing and Refunds:** All payments are due on the renewal
              date. We offer a 7-day money-back guarantee for new VPS sign-ups,
              excluding fees for domain registration or custom software
              licenses. After 7 days, services are non-refundable.
            </p>
            <p>
              **4. Data Integrity:** While we perform regular backups for
              disaster recovery, the user is ultimately responsible for
              maintaining their own comprehensive and recent backups of all
              hosted data. We are not liable for data loss.
            </p>
            <p>
              **5. Governing Law:** This agreement is governed by the laws of
              our operational jurisdiction. Any disputes arising under this
              agreement shall be resolved in the local courts. Continued use of
              our services constitutes acceptance of these terms.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
