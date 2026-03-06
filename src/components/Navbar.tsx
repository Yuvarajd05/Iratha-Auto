"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Services", href: "#gallery" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
  { label: "Specs", href: "#cta" },
];

export default function Navbar({ onBookService }: { onBookService: () => void }) {

  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-3"
      >
        {/* Background */}
        <motion.div
          className="absolute inset-0 backdrop-blur-xl"
          style={{
            opacity: bgOpacity,
            backgroundColor: "rgba(10,10,10,0.92)",
          }}
        />

        {/* Gold line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C6A75E]/40 to-transparent transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="relative flex items-center justify-between max-w-7xl mx-auto">

          {/* Logo */}
          <div className="w-[140px] md:w-[180px] flex items-center">
            <a href="#" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Iratha Auto Logo"
                width={500}
                height={200}
                className="h-9 sm:h-10 md:h-14 w-auto object-contain"
                priority
              />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative text-[13px] tracking-[0.18em] uppercase text-white/80 hover:text-white transition-colors duration-300"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#C6A75E] transition-all duration-500 ease-out group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={onBookService}
            className="hidden md:block text-[11px] tracking-[0.2em] uppercase text-[#C6A75E] border border-[#C6A75E]/40 px-7 py-2.5 hover:bg-[#C6A75E]/10 transition-all duration-300"
          >
            Book a Service
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 relative z-50 p-2"
            aria-label="Menu"
          >
            <span
              className={`w-7 h-[2px] bg-[#C6A75E] transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-[4px]" : ""
              }`}
            />
            <span
              className={`w-7 h-[2px] bg-[#C6A75E] transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-[4px]" : ""
              }`}
            />
          </button>

        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 right-0 w-full h-screen bg-[#0A0A0A] z-40 flex flex-col items-center justify-center gap-8"
          >

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-xl tracking-[0.2em] uppercase text-white/80 hover:text-[#C6A75E] transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* Mobile CTA */}
            <button
              onClick={() => {
                setIsOpen(false);
                onBookService();
              }}
              className="mt-6 text-sm tracking-[0.2em] uppercase text-[#C6A75E] border border-[#C6A75E]/40 px-8 py-3"
            >
              Book a Service
            </button>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}