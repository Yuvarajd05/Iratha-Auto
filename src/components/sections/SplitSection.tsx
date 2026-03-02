"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SplitSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="models"
      ref={sectionRef}
      className="relative bg-[#0A0A0A] py-16 overflow-hidden"
    >
      <div className="mx-auto flex max-w-7xl flex-col md:flex-row items-stretch">

        {/* LEFT CONTENT */}
        <div className="flex flex-1 flex-col justify-center px-8 md:px-16 lg:px-24 py-8 md:py-0 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-8 bg-[#C6A75E]/50" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C6A75E]/70">
                The Experience
              </span>
            </div>

            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[0.95] tracking-tight text-white"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Comprehensive
              <br />
              <span className="text-gradient-gold">Auto</span>
              <br />
              Services
            </h2>

            <p className="mt-6 max-w-md text-sm leading-relaxed tracking-wide text-white/40 font-light">
              From routine maintenance to complex repairs, we deliver excellence in every service.
            </p>

            <motion.a
              href="#performance"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="group mt-8 inline-flex items-center gap-4 text-[11px] tracking-[0.25em] uppercase text-[#C6A75E]"
            >
              <span>Discover More</span>
              <span className="h-px w-8 bg-[#C6A75E]/40 transition-all duration-500 group-hover:w-14 group-hover:bg-[#C6A75E]" />
            </motion.a>
          </motion.div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex-1 overflow-hidden min-h-[400px] md:min-h-[500px]">

          <motion.div
            className="absolute inset-0"
            style={{ y: imageY }}
          >
            <div
              className="h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{
                backgroundImage: "url('/images/toyota.png')",
              }}
            />

            {/* Soft Left Fade */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent md:w-1/3" />

            {/* Soft Bottom Fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent opacity-60" />
          </motion.div>

          {/* Gold Line */}
          <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#C6A75E]/30 to-transparent hidden md:block" />
        </div>

      </div>
    </section>
  );
}