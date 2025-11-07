"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await fetch("/api/auth/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      } else {
        console.error("Login failed:", data);
      }
    } catch (err) {
      console.error("Error logging in:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "VPS", path: "/store" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-cyan-50/10 border-b border-cyan-100/10 shadow-[0_0_25px_rgba(0,255,255,0.15)]"
            : "bg-transparent"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
      >
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? "max-w-full px-8 py-4"
              : "max-w-6xl mt-6 px-8 py-3 rounded-full backdrop-blur-2xl bg-cyan-100/10 border border-cyan-200/20 shadow-lg"
          }`}
        >
          {/* Brand */}
          <Link
            href="/"
            className="text-3xl font-corpta tracking-wider bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-300 text-transparent bg-clip-text font-bold drop-shadow-[0_0_15px_rgba(0,255,255,0.25)]"
          >
            Loginex
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <li key={link.name} className="relative group">
                  <Link
                    href={link.path}
                    className={`font-medium transition ${
                      isActive
                        ? "text-cyan-400"
                        : "text-zinc-100 hover:text-cyan-400"
                    }`}
                  >
                    {link.name}
                  </Link>
                  <motion.span
                    layoutId="active-link"
                    className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-300 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </li>
              );
            })}
          </ul>

          {/* Profile / Login Section */}
          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <div className="bg-white/10 backdrop-blur-lg rounded-full px-3 py-1 shadow-lg">
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={() => console.error("Google login failed")}
                  theme="outline"
                  size="medium"
                  shape="pill"
                />
              </div>
            ) : (
              <div className="relative group">
                <img
                  src={user.picture || "/default-avatar.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-cyan-300 cursor-pointer"
                />
                <div className="absolute right-0 mt-3 w-44 bg-cyan-900/60 backdrop-blur-lg border border-cyan-300/30 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all p-2">
                  <p className="text-sm text-cyan-100 px-3 truncate">
                    {user.name}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left text-red-400 hover:text-red-300 px-3 py-2 rounded-md transition"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-zinc-900 focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 80 }}
            className="fixed top-0 right-0 w-3/4 h-full backdrop-blur-2xl bg-cyan-50/10 border-l border-cyan-100/20 shadow-[0_0_30px_rgba(0,255,255,0.15)] z-40 p-8 flex flex-col space-y-6 md:hidden"
          >
            <button
              className="absolute top-5 right-5 text-zinc-900"
              onClick={() => setMenuOpen(false)}
            >
              <X size={28} />
            </button>

            <Link
              href="/"
              className="text-3xl font-corpta tracking-wider bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-300 text-transparent bg-clip-text font-bold"
              onClick={() => setMenuOpen(false)}
            >
              Loginex
            </Link>

            <ul className="flex flex-col gap-6 text-zinc-900 mt-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`text-lg font-medium transition ${
                        isActive ? "text-cyan-500" : "hover:text-cyan-500"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto">
              {!user ? (
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={() => console.error("Google login failed")}
                  theme="outline"
                  size="large"
                  shape="pill"
                />
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={user.picture || "/default-avatar.png"}
                    alt="Profile"
                    className="w-14 h-14 rounded-full border-2 border-cyan-300"
                  />
                  <p className="text-cyan-100 text-sm">{user.name}</p>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm transition"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
