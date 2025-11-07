"use client";
import { motion } from "framer-motion";
import React from "react";
import { Quote } from "lucide-react";

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

const loopedTestimonials = [...testimonials, ...testimonials];

const getRandomRotation = () => (Math.random() * 0.5 - 0.25) * 0.5;

const TestimonialsSection = () => {
  return (
    <>
      <style jsx global>{`
        @keyframes marquee-scroll-ltr {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes marquee-scroll-rtl {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .marquee-content-ltr {
          animation: marquee-scroll-ltr 40s linear infinite;
        }

        .marquee-content-rtl {
          animation: marquee-scroll-rtl 60s linear infinite;
        }

        .marquee-content-ltr:hover,
        .marquee-content-rtl:hover {
          animation-play-state: paused;
        }

        .marquee-fade {
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

      <section className="relative py-28 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 overflow-hidden border-t border-b border-blue-900/30">
        {/* Background Glow */}
        <div className="absolute top-[-250px] left-[-250px] w-[700px] h-[700px] bg-cyan-500/20 blur-[200px] rounded-full"></div>
        <div className="absolute bottom-[-250px] right-[-250px] w-[700px] h-[700px] bg-blue-600/20 blur-[200px] rounded-full"></div>

        <div className="text-center mb-12 relative z-20 px-6 md:px-16 lg:px-28">
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent tracking-tight">
            Trusted by Developers Worldwide
          </h2>
          <p className="mt-4 text-zinc-300 text-lg">
            Hear what our satisfied users have to say about our reliability and
            speed.
          </p>
        </div>

        <div className="marquee-fade relative z-20">
          {/* Row 1 */}
          <div className="overflow-hidden whitespace-nowrap py-3">
            <motion.div className="marquee-content-ltr flex">
              {loopedTestimonials.map((t, i) => (
                <motion.div
                  key={`row1-${i}`}
                  style={{ rotate: `${getRandomRotation()}deg` }}
                  className="relative w-[300px] min-w-[300px] inline-block mx-[0.5px] p-6
                             bg-gradient-to-br from-zinc-800/80 to-zinc-900/90
                             border border-blue-500/20
                             shadow-[0_0_35px_-10px_rgba(0,150,255,0.25)]
                             rounded-xl text-center transition-all duration-300
                             hover:shadow-[0_0_55px_-10px_rgba(0,200,255,0.4)] hover:border-cyan-400/40 hover:scale-[1.02]"
                >
                  <Quote
                    size={64}
                    className="absolute top-4 left-4 text-blue-900 opacity-30 z-0"
                  />
                  <p className="relative text-zinc-200 italic mb-4 text-base whitespace-normal font-medium leading-relaxed z-10">
                    “{t.feedback}”
                  </p>
                  <div className="relative pt-3 mt-3 border-t border-blue-900/40 z-10">
                    <h4 className="font-bold text-cyan-400">{t.name}</h4>
                    <span className="text-zinc-400 text-sm">{t.location}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="overflow-hidden whitespace-nowrap py-3 mt-1">
            <motion.div className="marquee-content-rtl flex">
              {loopedTestimonials.map((t, i) => (
                <motion.div
                  key={`row2-${i}`}
                  style={{ rotate: `${getRandomRotation() * -1}deg` }}
                  className="relative w-[300px] min-w-[300px] inline-block mx-[0.5px] p-6
                             bg-gradient-to-br from-zinc-800/80 to-zinc-900/90
                             border border-blue-500/20
                             shadow-[0_0_35px_-10px_rgba(0,150,255,0.25)]
                             rounded-xl text-center transition-all duration-300
                             hover:shadow-[0_0_55px_-10px_rgba(0,200,255,0.4)] hover:border-cyan-400/40 hover:scale-[1.02]"
                >
                  <Quote
                    size={64}
                    className="absolute top-4 left-4 text-blue-900 opacity-30 z-0"
                  />
                  <p className="relative text-zinc-200 italic mb-4 text-base whitespace-normal font-medium leading-relaxed z-10">
                    “{t.feedback}”
                  </p>
                  <div className="relative pt-3 mt-3 border-t border-blue-900/40 z-10">
                    <h4 className="font-bold text-cyan-400">{t.name}</h4>
                    <span className="text-zinc-400 text-sm">{t.location}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;
