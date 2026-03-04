"use client";

import { motion } from "framer-motion";

export default function ReviewSection() {
  return (
    <section className="relative bg-[#0A0A0A] py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h2
            className="text-4xl md:text-6xl font-light text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Customer{" "}
            <span className="text-[#C6A75E]">Reviews</span>
          </h2>

          <div className="mt-6">
            <span className="text-2xl tracking-[0.3em] text-yellow-400">
              ★★★★★
            </span>

            <p className="text-white/60 mt-3 text-sm tracking-wide">
              4.9 Rating (350+ Google Reviews)
            </p>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              name: "Aarav Parekh",
              text: "Paint protection work done flawlessly. Professional handling and premium finish.",
            },
            {
              name: "Salil Chand",
              text: "Ceramic coating exceeded expectations. Clean space and skilled technicians.",
            },
            {
              name: "Umesh Kamat",
              text: "PPF installation was precise and smooth. Highly satisfied with the results.",
            },
          ].map((review, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-[#111] border border-white/10 rounded-2xl p-8 hover:border-[#C6A75E]/40 transition-all duration-500"
            >
              <div className="text-yellow-400 mb-4 tracking-widest">
                ★★★★★
              </div>

              <p className="text-white/70 text-sm leading-relaxed mb-6">
                {review.text}
              </p>

              <h4 className="text-white font-medium tracking-wide">
                {review.name}
              </h4>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="border-t border-white/10 pt-12 text-center">
          <div className="flex flex-col md:flex-row justify-center items-center gap-12">

            <div>
              <h3 className="text-4xl text-[#C6A75E] font-light">
                2500+
              </h3>
              <p className="text-white/50 text-xs tracking-wider uppercase">
                Cars Serviced
              </p>
            </div>

            <div>
              <h3 className="text-4xl text-[#C6A75E] font-light">
                5+
              </h3>
              <p className="text-white/50 text-xs tracking-wider uppercase">
                Years Experience
              </p>
            </div>

            <div>
              <h3 className="text-4xl text-[#C6A75E] font-light">
                350+
              </h3>
              <p className="text-white/50 text-xs tracking-wider uppercase">
                Google Reviews
              </p>
            </div>

          </div>

          <div className="mt-12">
            <a
              href="https://maps.app.goo.gl/zLNDiZjfNQvHR3dr8"
              target="_blank"
              className="inline-block border border-[#C6A75E]/50 text-[#C6A75E] uppercase tracking-[0.2em] text-xs py-4 px-10 hover:bg-[#C6A75E]/10 transition-all"
            >
              View on Google
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}