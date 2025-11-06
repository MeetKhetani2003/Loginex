"use client";
import { motion } from "framer-motion";
import React from "react";
import { Quote } from "lucide-react"; // Imported for the visual icon

const testimonials = [
  {
    name: "Ravi Kumar",
    location: "India",
    feedback:
      "Loginex VPS performance is absolutely top-notch. My website runs smoother than ever!",
  },
  {
    name: "Ava Williams",
    location: "Canada",
    feedback:
      "Their customer support is 24/7 indeed — fast, friendly, and efficient!",
  },
  {
    name: "Lucas Smith",
    location: "USA",
    feedback:
      "I host my Minecraft server with Loginex — super low latency and rock-solid uptime.",
  },
  // Adding more mock data for a smoother, longer marquee effect
  {
    name: "Mia Chang",
    location: "South Korea",
    feedback:
      "Unbeatable reliability for my development environment. Deployment has never been easier.",
  },
  {
    name: "Juan Perez",
    location: "Mexico",
    feedback:
      "The VPS control panel setup was seamless and very intuitive for managing multiple sites.",
  },
];

// Combine the array twice to ensure a seamless looping effect
const loopedTestimonials = [...testimonials, ...testimonials];

// Helper function to generate a random slight rotation for visual interest
const getRandomRotation = () => {
  // Returns a value between -0.25deg and 0.25deg
  return (Math.random() * 0.5 - 0.25) * 0.5;
};

const TestimonialsSection = () => {
  return (
    <>
      {/* Custom CSS for the marquee effect and the fade mask */}
      <style jsx global>{`
        /* --- LTR Scroll (Row 1: Left-to-Right) --- */
        @keyframes marquee-scroll-ltr {
          0% {
            transform: translate3d(0, 0, 0);
          }
          /* Scrolls exactly one full set of testimonials (50% of the doubled content) */
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        /* --- RTL Scroll (Row 2: Right-to-Left) --- */
        @keyframes marquee-scroll-rtl {
          /* Starts fully translated to the left (50% of doubled content) */
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          /* Scrolls back to the original position (moves content to the right) */
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .marquee-content-ltr {
          animation: marquee-scroll-ltr 40s linear infinite; /* Adjust speed (40s) as needed */
        }

        .marquee-content-rtl {
          animation: marquee-scroll-rtl 60s linear infinite; /* Slower speed for contrast */
        }

        /* Pause marquee on hover */
        .marquee-content-ltr:hover,
        .marquee-content-rtl:hover {
          animation-play-state: paused;
        }

        /* --- FADE EFFECT MASK --- */
        .marquee-fade {
          /* Create a horizontal gradient mask: Transparent at 0% (left) and 100% (right), Black in the middle (7%-93%) */
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 7%,
            black 93%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 7%,
            black 93%,
            transparent 100%
          );
        }
      `}</style>

      {/* Main Section - Enhanced Light Blue Theme (Horizontal padding removed for edge-to-edge scroll) */}
      <section className="py-24 bg-gradient-to-b from-white via-blue-50 to-white">
        <div className="text-center mb-12 px-6 md:px-16 lg:px-28">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 tracking-tight">
            Trusted by Developers Worldwide
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Hear what our satisfied users have to say about our reliability and
            speed.
          </p>
        </div>
        {/* --- Wrapper for both marquee rows and the fade effect --- */}
        <div className="marquee-fade">
          {/* --- First Marquee Row (Left-to-Right) --- */}
          <div className="marquee-container w-full overflow-hidden whitespace-nowrap py-2">
            <motion.div className="marquee-content-ltr flex">
              {" "}
              {/* Applied LTR class */}
              {loopedTestimonials.map((t, i) => (
                <motion.div
                  key={`row1-${i}`}
                  // Added: relative positioning for quote, style for slight random rotation
                  style={{ rotate: `${getRandomRotation()}deg` }}
                  // Card Design: subtle hover scale, 1px gap, cleaner shadow
                  className="relative w-[300px] min-w-[300px] inline-block p-6 bg-white border border-blue-100 shadow-lg shadow-blue-200/50 
                               rounded-xl text-center mx-[0.5px] transition-all duration-300 hover:shadow-xl hover:shadow-blue-400/50 hover:scale-[1.01]"
                >
                  {/* Large, semi-transparent quote icon in the background */}
                  <Quote
                    size={64}
                    className="absolute top-4 left-4 text-blue-100 opacity-70 z-0"
                  />

                  <p className="relative text-gray-800 italic mb-4 text-base whitespace-normal font-medium leading-relaxed z-10">
                    “{t.feedback}”
                  </p>

                  {/* Visual Separator */}
                  <div className="relative pt-3 mt-3 border-t border-blue-200 z-10">
                    <h4 className="font-bold text-blue-800">{t.name}</h4>
                    <span className="text-gray-500 text-sm">{t.location}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* --- Second Marquee Row (Right-to-Left) --- */}
          {/* Removed dir="rtl" and now rely purely on the animation for reverse direction */}
          <div className="marquee-container w-full overflow-hidden whitespace-nowrap py-2 mt-0.5">
            <motion.div
              className="marquee-content-rtl flex" // Applied RTL class
            >
              {/* Use the testimonials array for the second row */}
              {loopedTestimonials.map((t, i) => (
                <motion.div
                  key={`row2-${i}`}
                  // Added: relative positioning for quote, style for slight random rotation
                  style={{ rotate: `${getRandomRotation() * -1}deg` }} // Rotate opposite direction for row 2
                  // Card Design: subtle hover scale, 1px gap, cleaner shadow
                  className="relative w-[300px] min-w-[300px] inline-block p-6 bg-white border border-blue-100 shadow-lg shadow-blue-200/50 
                                       rounded-xl text-center mx-[0.5px] transition-all duration-300 hover:shadow-xl hover:shadow-blue-400/50 hover:scale-[1.01]"
                >
                  {/* Large, semi-transparent quote icon in the background */}
                  <Quote
                    size={64}
                    className="absolute top-4 left-4 text-blue-100 opacity-70 z-0"
                  />

                  <p className="relative text-gray-800 italic mb-4 text-base whitespace-normal font-medium leading-relaxed z-10">
                    “{t.feedback}”
                  </p>
                  {/* Visual Separator */}
                  <div className="relative pt-3 mt-3 border-t border-blue-200 z-10">
                    <h4 className="font-bold text-blue-800">{t.name}</h4>
                    <span className="text-gray-500 text-sm">{t.location}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>{" "}
        {/* End of marquee-fade wrapper */}
      </section>
    </>
  );
};

export default TestimonialsSection;
