"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A0A]"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[300px] w-[300px] rounded-full bg-[#C6A75E]/5 blur-[100px]" />
          </div>

          {/* Wheel container */}
          <div className="relative h-[200px] w-[200px]">
            {/* Rotating wheel */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="relative h-full w-full"
            >
              {/* Outer rim */}
              <svg viewBox="0 0 200 200" className="h-full w-full">
                {/* Tire */}
                <circle
                  cx="100"
                  cy="100"
                  r="95"
                  fill="none"
                  stroke="#1A1A1A"
                  strokeWidth="10"
                />
                {/* Outer rim ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="88"
                  fill="none"
                  stroke="#2A2A2A"
                  strokeWidth="3"
                />
                {/* Gold rim accent */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="#C6A75E"
                  strokeWidth="1.5"
                  opacity="0.8"
                />
                {/* Inner rim */}
                <circle
                  cx="100"
                  cy="100"
                  r="82"
                  fill="#111111"
                  stroke="#222222"
                  strokeWidth="2"
                />

                {/* Spokes - 5 spoke alloy design */}
                {[0, 72, 144, 216, 288].map((angle, i) => (
                  <g key={i} transform={`rotate(${angle} 100 100)`}>
                    <path
                      d="M100 30 L108 70 Q100 75 92 70 Z"
                      fill="#1E1E1E"
                      stroke="#2A2A2A"
                      strokeWidth="1"
                    />
                    {/* Spoke highlight */}
                    <path
                      d="M100 32 L105 65 Q100 68 95 65 Z"
                      fill="none"
                      stroke="#333333"
                      strokeWidth="0.5"
                    />
                  </g>
                ))}

                {/* Center hub */}
                <circle cx="100" cy="100" r="22" fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="2" />
                <circle cx="100" cy="100" r="18" fill="#151515" stroke="#C6A75E" strokeWidth="1" opacity="0.6" />
                <circle cx="100" cy="100" r="8" fill="#1E1E1E" stroke="#333333" strokeWidth="1" />

                {/* Lug nuts */}
                {[0, 72, 144, 216, 288].map((angle, i) => (
                  <circle
                    key={`lug-${i}`}
                    cx={100 + 14 * Math.cos((angle - 90) * Math.PI / 180)}
                    cy={100 + 14 * Math.sin((angle - 90) * Math.PI / 180)}
                    r="2.5"
                    fill="#2A2A2A"
                    stroke="#333333"
                    strokeWidth="0.5"
                  />
                ))}

                {/* Between-spoke cutouts with depth */}
                {[36, 108, 180, 252, 324].map((angle, i) => (
                  <g key={`cut-${i}`} transform={`rotate(${angle} 100 100)`}>
                    <path
                      d="M95 35 Q100 32 105 35 L112 72 Q100 78 88 72 Z"
                      fill="#0D0D0D"
                      opacity="0.8"
                    />
                  </g>
                ))}
              </svg>
            </motion.div>

            {/* Light reflection sweep */}
            <motion.div
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
              animate={{
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    "linear-gradient(135deg, transparent 30%, rgba(198,167,94,0.15) 50%, transparent 70%)",
                    "linear-gradient(135deg, transparent 50%, rgba(198,167,94,0.15) 70%, transparent 90%)",
                    "linear-gradient(135deg, transparent 30%, rgba(198,167,94,0.15) 50%, transparent 70%)",
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>

          {/* Brand text below wheel */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute bottom-[25%] flex flex-col items-center gap-3"
          >
            <span
              className="text-sm font-light tracking-[0.4em] text-[#C6A75E]/70"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              IRATHA AUTO
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
