"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ServiceRequestForm } from "@/components/Forms/ServiceRequestForm"; // ✅ adjust path if needed

const navLinks = [
  { label: "Services", href: "#gallery" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
  { label: "Specs", href: "#cta" },
];

export default function Navbar({onBookService}:{onBookService:()=>void}) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false); // ✅ ADDED

  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ OPTIONAL (prevents background scroll when modal open)
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showForm]);

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
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
          <a href="#" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Iratha Auto Logo"
              width={500}
              height={200}
              className="h-14 w-auto object-contain"
              priority
            />
          </a>

          {/* Desktop Menu */}
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

          {/* ✅ CTA BUTTON NOW OPENS FORM */}
          <button
            onClick={onBookService}
            className="hidden md:block text-[11px] tracking-[0.2em] uppercase text-[#C6A75E] border border-[#C6A75E]/40 px-7 py-2.5 hover:bg-[#C6A75E]/10 transition-all duration-300"
          >
            Book a Service
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 relative z-50"
            aria-label="Menu"
          >
            <span className={`w-6 h-px bg-[#C6A75E] transition-all ${isOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`w-4 h-px bg-[#C6A75E] transition-all ${isOpen ? "-rotate-45 -translate-y-1" : ""}`} />
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

            {/* ✅ Mobile CTA opens form */}
            <button
              onClick={() => {
                setIsOpen(false);
                setShowForm(true);
              }}
              className="mt-6 text-sm tracking-[0.2em] uppercase text-[#C6A75E] border border-[#C6A75E]/40 px-8 py-3"
            >
              Book a Service
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ FORM MODAL */}
      {showForm && (
        <ServiceRequestForm onClose={() => setShowForm(false)} />
      )}
    </>
  );
}