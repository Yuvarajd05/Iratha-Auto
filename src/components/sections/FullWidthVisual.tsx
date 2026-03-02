"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Calendar, Search, Wrench, ShieldCheck } from "lucide-react";

const specs = [
  {
    label: "Schedule",
    value: "Book your appointment online or by phone at your convenience",
    icon: Calendar,
  },
  {
    label: "Inspect",
    value: "Comprehensive inspection and transparent diagnosis of your vehicle",
    icon: Search,
  },
  {
    label: "Repair",
    value: "Expert technicians perform repairs with precision and care",
    icon: Wrench,
  },
  {
    label: "Quality Check",
    value: "Rigorous testing to ensure everything meets our high standards",
    icon: ShieldCheck,
  },
];

export default function FullWidthVisual() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      id="specs"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: bgY }}
      >
        <div
          className="h-[110%] w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/background.png')",
          }}
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 -z-10 bg-black/60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]" />

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between px-8 md:px-16 lg:px-24 py-16">

        {/* Top Text */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#C6A75E]/60 block mb-4">
            A streamlined approach to automotive excellence, every step of the way.
          </span>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our Service
            <br />
            <span className="text-gradient-gold">Process</span>
          </h2>
        </motion.div>

        {/* 🔥 Bottom Specs (Moved Down) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-between gap-y-10 mt-10"
        >
          {specs.map((spec, index) => {
            const Icon = spec.icon;

            return (
              <div key={index} className="w-full sm:w-[45%] lg:w-[22%]">
                
                {/* Icon */}
                <div className="mb-4 text-[#C6A75E]">
                  <Icon size={28} strokeWidth={1.5} />
                </div>

                {/* Label */}
                <p className="text-base md:text-lg tracking-[0.25em] uppercase text-[#C6A75E] mb-3 font-semibold">
                {spec.label}
                </p>
                
                {/* Description */}
                <p className="text-sm tracking-wide text-white/80 font-light leading-relaxed">
                  {spec.value}
                </p>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}