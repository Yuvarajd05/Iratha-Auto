"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

const galleryImages = [
  {
    src: "/images/infrared.png",
    title: "Infrared Booth",
    subtitle:
      "Advanced infrared curing technology delivering consistent heat and a flawless, high-quality finish.",
  },
  {
    src: "/images/car-diagnostic.png",
    title: "Engine Diagnostics",
    subtitle:
      "Advanced computerized diagnostics to identify and resolve engine issues with precision.",
  },
  {
    src: "/images/brake-suspension.png",
    title: "Brake & Suspension",
    subtitle:
      "Complete brake system service and suspension tuning for optimal safety and comfort.",
  },
  {
    src: "/images/body-paint.png",
    title: "Paint & Bodywork",
    subtitle:
      "Professional collision repair and custom paint services to restore your vehicle's beauty.",
  },
  {
    src: "/images/periodic-maintaince.png",
    title: "Periodic Maintenance",
    subtitle:
      "Scheduled maintenance packages to keep your vehicle running at peak performance.",
  },
  {
    src: "/images/electricals.png",
    title: "Electrical Systems",
    subtitle:
      "Expert diagnosis and repair of all electrical components and modern vehicle systems.",
  },
  {
    src: "/images/Tuning.png",
    title: "Performance Tuning",
    subtitle:
      "Custom performance upgrades and tuning to enhance your driving experience.",
  },
  {
    src: "/images/ppf.png",
    title: "PPF & Ceramic Coating",
    subtitle:
      "PPF and ceramic coating for ultimate paint protection, enhanced gloss, and long-lasting durability.",
  },
  {
    src: "/images/tyre and wheel.png",
    title: "Tyres & Wheel Care",
    subtitle:
      "Precision wheel alignment for enhanced stability, safety, and peak driving performance.",
  },
  {
    src: "/images/car insurance.png",
    title: "Cashless Insurance",
    subtitle:
      "Comprehensive car insurance solutions for secure and worry-free driving.",
  },
  {
    src: "/images/Customer lounge.png",
    title: "Customer Lounge",
    subtitle:
      "A premium lounge designed for your comfort, while we perfect your ride.",
  },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [autoMove, setAutoMove] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const cardWidth = 444;
  const totalScrollWidth =
    (galleryImages.length - 3) * cardWidth;

  const scrollX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -totalScrollWidth]
  );

  const hoverX = autoMove ? -totalScrollWidth : scrollX;

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative h-[300vh] bg-[#0A0A0A]"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

        {/* Header */}
        <div className="mb-10 text-center">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#C6A75E]/60 block mb-4">
            IRATHA Gallery
          </span>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Built for Every{" "}
            <span className="text-gradient-gold">Drive</span>
          </h2>
        </div>

        {/* Horizontal Scroll */}
        <motion.div
          style={{ x: scrollX }}
          onMouseEnter={() => setAutoMove(true)}
          onMouseLeave={() => setAutoMove(false)}
          animate={autoMove ? { x: -totalScrollWidth } : {}}
          transition={{
            duration: 6,
            ease: "linear",
          }}
          className="flex gap-6 px-8 md:px-16"
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative flex-shrink-0 w-[320px] sm:w-[380px] md:w-[420px] h-[480px] md:h-[550px] rounded-2xl overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                style={{
                  backgroundImage: `url('${image.src}')`,
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute inset-0 rounded-2xl border border-transparent transition-all duration-500 group-hover:border-[#C6A75E]/40 group-hover:shadow-[0_0_25px_rgba(198,167,94,0.1)]" />

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
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}