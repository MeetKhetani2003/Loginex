"use client";
import React from "react";
// Icons used in the footer
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

// Define the navigation links for the Quick Links section
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
    // Outer container: Elevated light gray background for contrast, heavy padding
    <footer className="bg-gray-100 text-gray-800 pt-24 pb-12 border-t border-blue-200 shadow-inner shadow-blue-100/50">
      <div className=" mx-auto px-6 md:px-16 lg:px-28">
        {/* Main Grid: Clean, structured layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-gray-300 pb-12">
          {/* 1. Brand and Contact (Span 4 columns) */}
          <div className="md:col-span-4 space-y-6">
            <a href="#" className="inline-block">
              {/* Logo: Large, bold gradient for maximum visual impact */}
              <h3 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 drop-shadow-[0_0_5px_rgba(0,180,255,0.1)]">
                Loginex
              </h3>
            </a>
            <p className="text-gray-600 text-base leading-relaxed max-w-sm">
              Building the next generation of cloud infrastructure with a focus
              on speed, security, and developer control.
            </p>

            {/* Contact Block - Enhanced readability and icons */}
            <div className="text-sm space-y-3 pt-4">
              <p className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                <Mail size={18} className="text-blue-500 flex-shrink-0" />
                support@loginex.com
              </p>
              <p className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                <Phone size={18} className="text-blue-500 flex-shrink-0" />
                +91 98765 43210
              </p>
              <p className="flex items-center gap-3 text-gray-700 font-medium">
                <MapPin size={18} className="text-blue-500 flex-shrink-0" />
                Mumbai, India (Global HQ)
              </p>
            </div>
          </div>

          {/* 2. Dynamic Navigation Links (Spans 6 columns) */}
          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {navSections.map((section) => (
              <div key={section.title}>
                {/* Headers: Bolder, clearer color */}
                <h4 className="text-lg font-extrabold text-blue-800 mb-5 flex items-center gap-2 tracking-wide">
                  <section.icon size={18} className="text-cyan-500" />
                  {section.title}
                </h4>
                <ul className="space-y-3 text-sm">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.path}
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:ml-1 inline-block"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 3. Social Media Block (Spans 2 columns) */}
          <div className="md:col-span-2 flex flex-col md:items-start items-start">
            <h4 className="text-lg font-extrabold text-blue-800 mb-5 tracking-wide">
              Follow Us
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  // Social buttons: White background, subtle border, strong hover effect
                  className="p-3 rounded-xl bg-white border border-gray-300 text-blue-500 
                             transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-md"
                  aria-label={`Follow us on ${link.label}`}
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section - Separated by the border */}
        <div className="mt-8 text-gray-500 text-sm md:text-xs text-center">
          &copy; {new Date().getFullYear()} Loginex. All rights reserved. |{" "}
          <a href="/terms" className="hover:text-blue-600">
            Terms of Service
          </a>{" "}
          |{" "}
          <a href="/privacy" className="hover:text-blue-600">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
