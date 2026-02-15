"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function InstagramSection() {
  useEffect(() => {
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  }, []);

  return (
    <section className="bg-[#0A0A0A] py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <h2 className="text-4xl text-white mb-12 font-light">
          Follow Our <span className="text-[#C6A75E]">Instagram</span>
        </h2>

        {/* Scroll Container */}
        <div className="flex gap-8 overflow-x-auto pb-4">
          
          <blockquote
            className="instagram-media"
            data-instgrm-permalink="https://www.instagram.com/reel/DUYpivvDLRV/"
            data-instgrm-version="14"
            style={{ minWidth: "320px" }}
          ></blockquote>

          <blockquote
            className="instagram-media"
            data-instgrm-permalink="https://www.instagram.com/reel/DUYFrC-DOi-/"
            data-instgrm-version="14"
            style={{ minWidth: "320px" }}
          ></blockquote>

          <blockquote
            className="instagram-media"
            data-instgrm-permalink="https://www.instagram.com/reel/DUtFdqRjGkT/"
            data-instgrm-version="14"
            style={{ minWidth: "320px" }}
          ></blockquote>

          <blockquote
            className="instagram-media"
            data-instgrm-permalink="https://www.instagram.com/reel/DUbI2FMDMRx/"
            data-instgrm-version="14"
            style={{ minWidth: "320px" }}
          ></blockquote>

          <blockquote
            className="instagram-media"
            data-instgrm-permalink="https://www.instagram.com/reel/DUOIcI5EgG2/"
            data-instgrm-version="14"
            style={{ minWidth: "320px" }}
          ></blockquote>

        </div>
      </div>

      {/* Instagram Embed Script */}
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          if ((window as any).instgrm) {
            (window as any).instgrm.Embeds.process();
          }
        }}
      />
    </section>
  );
}
