"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Models", href: "#models" },
  { label: "Performance", href: "#performance" },
  { label: "Gallery", href: "#gallery" },
  { label: "Specs", href: "#specs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.4, duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6"
    >
      {/* Background Blur Layer */}
      <motion.div
        className="absolute inset-0 backdrop-blur-xl"
        style={{
          opacity: bgOpacity,
          backgroundColor: "rgba(10,10,10,0.92)",
        }}
      />

      {/* Gold bottom glow when scrolled */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C6A75E]/40 to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative flex items-center justify-between max-w-7xl mx-auto">
        
        {/* PREMIUM LOGO */}
        <a href="#" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Iratha Auto Logo"
            width={400}
            height={150}
            className="h-30 w-auto object-contain"
            priority
          />
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative text-[13px] tracking-[0.18em] uppercase text-white/60 hover:text-white transition-colors duration-300"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#C6A75E] transition-all duration-500 ease-out group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="#contact"
          className="hidden md:block text-[11px] tracking-[0.2em] uppercase text-[#C6A75E] border border-[#C6A75E]/40 px-7 py-2.5 hover:bg-[#C6A75E]/10 transition-all duration-300"
        >
          Reserve
        </a>

        {/* Mobile Menu Button */}
        <button className="md:hidden flex flex-col gap-1.5" aria-label="Menu">
          <span className="w-6 h-px bg-[#C6A75E]" />
          <span className="w-4 h-px bg-[#C6A75E]" />
        </button>
      </div>
    </motion.nav>
  );
}
