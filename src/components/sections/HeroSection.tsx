"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showContent, setShowContent] = useState(false);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    // Change 2.8 to match the best cinematic moment in your video
    if (videoRef.current.currentTime >= 5) {
      setShowContent(true);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          className="h-full w-full object-cover scale-105"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </div>

      {/* Content */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
        >
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-light tracking-[0.15em] text-white leading-none"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            IRATHA
          </h1>

          <span className="mt-2 text-lg sm:text-xl md:text-2xl tracking-[0.5em] text-[#C6A75E]/90 uppercase">
            AUTO
          </span>

          <p className="mt-8 text-sm md:text-base tracking-[0.35em] text-white/50 uppercase">
            Performance. Precision. Power.
          </p>

          <a
            href="#models"
            className="group relative mt-12 overflow-hidden border border-[#C6A75E]/50 px-10 py-3.5 text-[11px] tracking-[0.3em] uppercase text-[#C6A75E] transition-all duration-500 hover:border-[#C6A75E] hover:bg-[#C6A75E]/10"
          >
            <span className="relative z-10">Explore Services</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#C6A75E]/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>

          <div className="absolute bottom-10 flex flex-col items-center gap-3">
            <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase">
              Scroll
            </span>
            <div className="h-8 w-px bg-gradient-to-b from-[#C6A75E]/70 to-transparent animate-pulse" />
          </div>
        </motion.div>
      )}
    </section>
  );
}
