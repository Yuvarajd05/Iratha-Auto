"use client";
 
import { useState, useEffect } from "react";
 
const works = [
  {
    title: "Paint Correction",
    car: "BMW 5 Series",
    before: "/images/before1.jpg",
    after: "/images/after1.jpg",
  },
  {
    title: "Ceramic Coating",
    car: "Audi A6",
    before: "/images/before2.jpg",
    after: "/images/after2.jpg",
  },
  {
    title: "Interior Detailing",
    car: "Mercedes C Class",
    before: "/images/before3.jpg",
    after: "/images/after3.jpg",
  },
  {
    title: "Headlight Restoration",
    car: "Hyundai Creta",
    before: "/images/before4.jpg",
    after: "/images/after4.jpg",
  },
];
 
export default function BeforeAfterSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slider, setSlider] = useState(50);
  const [isHovering, setIsHovering] = useState(false);
 
  /* AUTO SLIDE */
  useEffect(() => {
    if (isHovering) return;
 
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % works.length);
      setSlider(50);
    }, 2000);
 
    return () => clearInterval(interval);
  }, [isHovering]);
 
  return (
    <section className="w-full py-12 bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto px-6 text-center">
 
        {/* Header */}
        <span className="text-[10px] tracking-[0.4em] uppercase text-[#C6A75E]/70 block mb-8">
          Transformations
        </span>
 
        <h2
          className="text-3xl md:text-5xl font-light text-white mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          The Difference We Deliver
        </h2>
 
        {/* Slider Container */}
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="
          group relative w-full
          h-[240px] md:h-[300px]
          overflow-hidden rounded-xl
          border border-white/10
          transition-all duration-500
 
          hover:border-[#C6A75E]
          hover:shadow-[0_20px_80px_rgba(198,167,94,0.45)]
          hover:-translate-y-2
          hover:scale-[1.02]
        "
        >
 
          {works.map((work, index) => (
            <div
              key={index}
              className={`
                absolute inset-0
                transition-opacity duration-700
                ${index === activeIndex ? "opacity-100" : "opacity-0"}
              `}
            >
 
              {/* AFTER IMAGE */}
              <img
                src={work.after}
                className="absolute inset-0 w-full h-full object-cover"
              />
 
              {/* BEFORE IMAGE */}
              <div
                className="absolute top-0 left-0 h-full overflow-hidden"
                style={{ width: `${slider}%` }}
              >
                <img
                  src={work.before}
                  className="w-full h-full object-cover"
                />
              </div>
 
            </div>
          ))}
 
          {/* Divider */}
          <div
            className="absolute top-0 bottom-0 w-[3px] bg-[#C6A75E] shadow-[0_0_20px_rgba(198,167,94,0.9)]"
            style={{ left: `${slider}%` }}
          />
 
          {/* Handle */}
          <div
            className="
            absolute top-1/2 -translate-y-1/2 -translate-x-1/2
            w-5 h-5 rounded-full
            bg-[#C6A75E]
            border border-white/50
            shadow-[0_0_25px_rgba(198,167,94,1)]
            pointer-events-none
            "
            style={{ left: `${slider}%` }}
          />
 
          {/* Slider Input */}
          <input
            type="range"
            min="0"
            max="100"
            value={slider}
            onChange={(e) => setSlider(Number(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-ew-resize"
          />
 
        </div>
 
        {/* Description */}
        <div className="mt-4">
          <h3 className="text-xl md:text-2xl text-white font-light">
            {works[activeIndex].car}
          </h3>
 
          <p className="text-[#C6A75E] mt-2 tracking-wide">
            {works[activeIndex].title}
          </p>
        </div>
 
        {/* Dots */}
        <div className="flex justify-center gap-4 mt-8">
          {works.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setSlider(50);
              }}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${
                  index === activeIndex
                    ? "bg-[#C6A75E] shadow-[0_0_10px_rgba(198,167,94,0.8)]"
                    : "bg-white/30 hover:bg-[#C6A75E]/60"
                }
              `}
            />
          ))}
        </div>
 
      </div>
    </section>
  );
}
 