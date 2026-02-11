"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const specs = [
  { label: "Engine Calibration", value: "Neural AI V12" },
  { label: "Precision Diagnostics", value: "360° Sensor Array" },
  { label: "Performance Tuning", value: "Adaptive Torque" },
  { label: "Drive System", value: "Quad Motor AWD" },
];

export default function FullWidthVisual() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      id="specs"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Massive background image with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY }}
      >
        <div
          className="h-[120%] w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1920&q=80')",
          }}
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/50" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-16 lg:p-24">
        {/* Top text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#C6A75E]/60 block mb-4">
            Engineering Excellence
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Beyond
            <br />
            <span className="text-gradient-gold">Performance</span>
          </h2>
        </motion.div>

        {/* Bottom specs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-x-12 gap-y-6 md:gap-x-16"
        >
          {specs.map((spec, index) => (
            <div key={index} className="flex items-start gap-6">
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#C6A75E]/60 mb-1">
                  {spec.label}
                </p>
                <p className="text-sm tracking-wide text-white/80 font-light">
                  {spec.value}
                </p>
              </div>
              {index < specs.length - 1 && (
                <div className="hidden md:block h-10 w-px bg-[#C6A75E]/20 ml-6" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
