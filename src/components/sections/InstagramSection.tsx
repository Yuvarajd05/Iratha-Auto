'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function InstagramSection() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).instgrm) {
      ;(window as any).instgrm.Embeds.process()
    }
  }, [])

  return (
    <section className="bg-[#0A0A0A] py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-4xl text-white mb-12 font-light">
          Follow Our <span className="text-[#C6A75E]">Instagram</span>
        </h2>

        {/* Scroll Container */}
        <div className="flex gap-8 overflow-x-auto pb-4 items-stretch">
          {[
            'https://www.instagram.com/reel/DUYpivvDLRV/',
            'https://www.instagram.com/reel/DUyEhcOCYdv/',
            'https://www.instagram.com/reel/DUtFdqRjGkT/',
            'https://www.instagram.com/reel/DUbI2FMDMRx/',
            'https://www.instagram.com/reel/DUslyR6jJkP/'
          ].map((url, index) => (
            <div
              key={index}
              className="w-[320px] h-[320px] md:h-[480px] flex-shrink-0 overflow-hidden rounded-xl bg-white"
            >
              <blockquote
                className="instagram-media w-full h-full"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{ width: '100%', height: '100%' }}
              ></blockquote>
            </div>
          ))}
        </div>
      </div>

      {/* Instagram Embed Script */}
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          if ((window as any).instgrm) {
            ;(window as any).instgrm.Embeds.process()
          }
        }}
      />
    </section>
  )
}
