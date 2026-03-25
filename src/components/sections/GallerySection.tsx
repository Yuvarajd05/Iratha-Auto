'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useLayoutEffect, useState } from 'react'

const galleryImages = [
  {
    src: '/images/infrared.png',
    title: 'Infrared Booth',
    subtitle:
      'Advanced infrared curing technology delivering consistent heat and a flawless, high-quality finish.'
  },
  {
    src: '/images/Customer lounge.png',
    title: 'Customer Lounge',
    subtitle: 'A premium lounge designed for your comfort, while we perfect your ride.'
  },
  {
    src: '/images/car-diagnostic.png',
    title: 'Engine Diagnostics',
    subtitle:
      'Advanced computerized diagnostics to identify and resolve engine issues with precision.'
  },
  {
    src: '/images/brake-suspension.png',
    title: 'Brake & Suspension',
    subtitle: 'Complete brake system service and suspension tuning for optimal safety and comfort.'
  },
  {
    src: '/images/body-paint.png',
    title: 'Paint & Bodywork',
    subtitle:
      "Professional collision repair and custom paint services to restore your vehicle's beauty."
  },
  {
    src: '/images/periodic-maintaince.png',
    title: 'Periodic Maintenance',
    subtitle: 'Scheduled maintenance packages to keep your vehicle running at peak performance.'
  },
  {
    src: '/images/electricals.png',
    title: 'Electrical Systems',
    subtitle: 'Expert diagnosis and repair of all electrical components and modern vehicle systems.'
  },
  {
    src: '/images/Tuning.png',
    title: 'Performance Tuning',
    subtitle: 'Custom performance upgrades and tuning to enhance your driving experience.'
  },
  {
    src: '/images/ppf.png',
    title: 'PPF & Ceramic Coating',
    subtitle:
      'PPF and ceramic coating for ultimate paint protection, enhanced gloss, and long-lasting durability.'
  },
  {
    src: '/images/tyre and wheel.png',
    title: 'Tyres & Wheel Care',
    subtitle:
      'Precision wheel alignment for enhanced stability, safety, and peak driving performance.'
  },
  {
    src: '/images/car insurance.png',
    title: 'Cashless Insurance',
    subtitle: 'Comprehensive car insurance solutions for secure and worry-free driving.'
  }
]

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [maxScroll, setMaxScroll] = useState(0)
  const [sectionHeight, setSectionHeight] = useState(2000)
  const [isMobile, setIsMobile] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  })

  /* Always call useTransform (fix for hook error) */
  const scrollXTransform = useTransform(scrollYProgress, [0, 1], [0, -maxScroll])

  const scrollX = isMobile ? 0 : scrollXTransform

  useLayoutEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    const updateSizes = () => {
      if (!containerRef.current) return

      const totalWidth = containerRef.current.scrollWidth
      const visibleWidth = containerRef.current.offsetWidth

      const scrollDistance = totalWidth - visibleWidth

      setMaxScroll(scrollDistance)

      if (window.innerWidth < 768) {
        /* mobile normal height */
        setSectionHeight(containerRef.current.offsetHeight + 100)
      } else {
        /* desktop scroll distance */
        setSectionHeight(scrollDistance + window.innerHeight)
      }
    }

    checkMobile()
    updateSizes()

    window.addEventListener('resize', checkMobile)
    window.addEventListener('resize', updateSizes)

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('resize', updateSizes)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="gallery"
      style={{ height: sectionHeight }}
      className="relative bg-[#0A0A0A] pb-12"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-start md:justify-center overflow-hidden pt-6 md:pt-0">
        {/* Header */}

        <div className="mb-8 md:mb-12 text-center px-6">
          <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-[#C6A75E]/60 block mb-3 md:mb-4">
            IRATHA Gallery
          </span>

          <h2
            className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-light tracking-tight text-white"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Built for Every <span className="text-gradient-gold">Drive</span>
          </h2>
        </div>

        {/* Gallery */}

        <motion.div
          ref={containerRef}
          style={{ x: scrollX }}
          className={`flex gap-4 md:gap-6 px-6 md:px-16 will-change-transform pb-4
          ${isMobile ? 'overflow-x-auto snap-x snap-mandatory touch-pan-x scroll-smooth' : ''}`}
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative flex-shrink-0
              w-[240px] sm:w-[300px] md:w-[420px]
              h-[360px] sm:h-[420px] md:h-[550px]
              rounded-xl md:rounded-2xl overflow-hidden
              snap-center
              transition-all duration-500
              hover:shadow-[0_0_35px_rgba(198,167,94,0.35)]
              hover:-translate-y-2"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                style={{
                  backgroundImage: `url('${image.src}')`
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute inset-0 rounded-xl md:rounded-2xl border border-white/10 transition-all duration-500 group-hover:border-[#C6A75E]/50 group-hover:shadow-[0_0_40px_rgba(198,167,94,0.35)]" />

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                <span className="text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-[#C6A75E]/70 block mb-2">
                  {image.subtitle}
                </span>

                <h3
                  className="text-lg md:text-2xl font-light tracking-wide text-white"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {image.title}
                </h3>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
