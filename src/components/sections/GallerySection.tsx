"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
    title: "Mountain Pass",
    subtitle: "Alpine Performance",
  },
  {
    src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
    title: "Urban Drive",
    subtitle: "City Precision",
  },
  {
    src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    title: "Coastal Route",
    subtitle: "Limitless Range",
  },
  {
    src: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80",
    title: "Desert Terrain",
    subtitle: "All-Surface Control",
  },
  {
    src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80",
    title: "Night Circuit",
    subtitle: "Track Ready",
  },
];

export default function GallerySection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="gallery" className="relative bg-[#0A0A0A] py-28 md:py-40">
      {/* Section header */}
      <div className="mx-auto max-w-7xl px-8 md:px-16 mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#C6A75E]/60 block mb-6">
            Terrain Gallery
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Built for Every{" "}
            <span className="text-gradient-gold">Drive</span>
          </h2>
        </motion.div>
      </div>

      {/* Horizontal scroll gallery */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-8 md:px-16 pb-8 scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
            viewport={{ once: true }}
            className="group relative flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px] h-[450px] sm:h-[500px] md:h-[550px] rounded-2xl overflow-hidden cursor-pointer"
          >
            {/* Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
              style={{ backgroundImage: `url('${image.src}')` }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Gold border glow on hover */}
            <div className="absolute inset-0 rounded-2xl border border-transparent transition-all duration-500 group-hover:border-[#C6A75E]/40 group-hover:shadow-[0_0_30px_rgba(198,167,94,0.1)]" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C6A75E]/70 block mb-2">
                {image.subtitle}
              </span>
              <h3
                className="text-2xl font-light tracking-wide text-white"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {image.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="flex justify-center mt-8 md:hidden">
        <div className="flex items-center gap-2 text-white/20">
          <span className="h-px w-4 bg-[#C6A75E]/30" />
          <span className="text-[9px] tracking-[0.3em] uppercase">Swipe</span>
          <span className="h-px w-4 bg-[#C6A75E]/30" />
        </div>
      </div>
    </section>
  );
}
