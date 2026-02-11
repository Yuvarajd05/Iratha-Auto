"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          poster="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-a-dark-suv-driving-on-a-road-1573/1080p.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65" />
        {/* Gradient bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </div>

      {/* Grain overlay */}
      <div className="grain-overlay absolute inset-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 2.4,
            duration: 1.2,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
          className="flex flex-col items-center text-center"
        >
          {/* Main headline */}
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-light tracking-[0.15em] text-white leading-none"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            IRATHA
          </h1>
          <span
            className="mt-2 text-lg sm:text-xl md:text-2xl tracking-[0.5em] text-[#C6A75E]/80 font-light uppercase"
          >
            AUTO
          </span>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.8 }}
            className="mt-8 text-sm md:text-base tracking-[0.35em] text-white/50 font-light uppercase"
          >
            Performance. Precision. Power.
          </motion.p>

          {/* CTA Button */}
          <motion.a
            href="#models"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.3, duration: 0.8 }}
            className="group relative mt-12 overflow-hidden border border-[#C6A75E]/40 px-10 py-3.5 text-[11px] tracking-[0.3em] uppercase text-[#C6A75E] transition-all duration-500 hover:border-[#C6A75E] hover:bg-[#C6A75E]/10"
          >
            <span className="relative z-10">Explore Models</span>
            {/* Shine sweep */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#C6A75E]/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.8, duration: 0.8 }}
          className="absolute bottom-10 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px bg-gradient-to-b from-[#C6A75E]/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
