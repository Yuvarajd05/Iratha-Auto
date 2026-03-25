'use client'

import { motion } from 'framer-motion'

export default function CTASection({ onBookService }: { onBookService: () => void }) {
  return (
    <section
      id="cta"
      className="relative py-32 md:py-48 bg-gradient-to-b from-[#0A0A0A] via-[#0D0D0D] to-[#0A0A0A] overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[400px] w-[600px] rounded-full bg-[#C6A75E]/3 blur-[150px]" />
      </div>

      {/* Subtle Hexagon Pattern */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.08]">
        <div
          className="w-[900px] h-[900px]"
          style={{
            backgroundImage: `
            url("data:image/svg+xml,%3Csvg width='120' height='104' viewBox='0 0 120 104' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='60,2 118,34 118,70 60,102 2,70 2,34' fill='none' stroke='%23C6A75E' stroke-width='1'/%3E%3C/svg%3E")
            `,
            backgroundSize: '120px 104px'
          }}
        />
      </div>

      {/* Extra soft gold glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[500px] w-[500px] rounded-full bg-[#C6A75E]/5 blur-[180px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Decorative lines */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#C6A75E]/40" />
            <span className="h-1.5 w-1.5 rotate-45 border border-[#C6A75E]/40" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#C6A75E]/40" />
          </div>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-tight"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Where Machines
            <br />
            Meet <span className="text-gradient-gold">Mastery</span>.
          </h2>

          <p className="mt-8 text-sm tracking-wide text-white/35 font-dark max-w-md mx-auto">
            Authorized partner for 20+ insurance companies, ensuring seamless claim support.
          </p>

          {/* CTA button */}
          <motion.button
            onClick={() => onBookService && onBookService()}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="group relative mt-12 inline-block overflow-hidden border border-[#C6A75E]/40 px-14 py-4 text-[11px] tracking-[0.3em] uppercase text-[#C6A75E] transition-all duration-500 hover:border-[#C6A75E] hover:bg-[#C6A75E]/10 hover:shadow-[0_0_40px_rgba(198,167,94,0.1)]"
          >
            <span className="relative z-10">Reserve Now</span>

            {/* Shine sweep animation */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#C6A75E]/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
