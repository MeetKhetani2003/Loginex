"use client";
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  Globe,
  Server,
  Code,
} from "lucide-react";

// Navigation links
const navSections = [
  {
    title: "Platform",
    links: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Pricing", path: "/pricing" },
      { name: "Template Store", path: "/store" },
    ],
    icon: Globe,
  },
  {
    title: "Company",
    links: [
      { name: "About Us", path: "/about" },
      { name: "Careers", path: "/careers" },
      { name: "Blog", path: "/blog" },
      { name: "Contact", path: "/contact" },
    ],
    icon: Server,
  },
  {
    title: "Developers",
    links: [
      { name: "API Docs", path: "/api" },
      { name: "Status Page", path: "/status" },
      { name: "GitHub Repo", path: "https://github.com" },
      { name: "Security", path: "/security" },
    ],
    icon: Code,
  },
];

const socialLinks = [
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
  { href: "#", icon: Github, label: "GitHub" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-24 pb-12 border-t border-gray-700 shadow-inner">
      <div className="mx-auto px-6 md:px-16 lg:px-28">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-gray-700 pb-12">
          {/* Brand & Contact */}
          <div className="md:col-span-4 space-y-6">
            <a href="#" className="inline-block">
              <h3 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r font-corpta from-cyan-400 to-blue-500 drop-shadow-[0_0_5px_rgba(0,180,255,0.2)]">
                Loginex
              </h3>
            </a>
            <p className="text-gray-400 text-base leading-relaxed max-w-sm">
              Building the next generation of cloud infrastructure with a focus
              on speed, security, and developer control.
            </p>

            {/* Contact Info */}
            <div className="text-sm space-y-3 pt-4">
              <p className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors font-medium">
                <Mail size={18} className="text-cyan-400 flex-shrink-0" />
                support@loginex.com
              </p>
              <p className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors font-medium">
                <Phone size={18} className="text-cyan-400 flex-shrink-0" />
                +91 98765 43210
              </p>
              <p className="flex items-center gap-3 text-gray-300 font-medium">
                <MapPin size={18} className="text-cyan-400 flex-shrink-0" />
                Mumbai, India (Global HQ)
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {navSections.map((section) => (
              <div key={section.title}>
                <h4 className="text-lg font-extrabold text-cyan-400 mb-5 flex items-center gap-2 tracking-wide">
                  <section.icon size={18} className="text-cyan-500" />
                  {section.title}
                </h4>
                <ul className="space-y-3 text-sm">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.path}
                        className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 hover:ml-1 inline-block"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social Media */}
          <div className="md:col-span-2 flex flex-col md:items-start items-start">
            <h4 className="text-lg font-extrabold text-cyan-400 mb-5 tracking-wide">
              Follow Us
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="p-3 rounded-xl bg-gray-800 border border-gray-700 text-cyan-400 transition-all duration-300 hover:scale-105 hover:bg-cyan-500 hover:text-gray-900 hover:border-cyan-500 shadow-md"
                  aria-label={`Follow us on ${link.label}`}
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-gray-500 text-sm md:text-xs text-center">
          &copy; {new Date().getFullYear()} Loginex. All rights reserved. |{" "}
          <a href="/terms" className="hover:text-cyan-400">
            Terms of Service
          </a>{" "}
          |{" "}
          <a href="/privacy" className="hover:text-cyan-400">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
