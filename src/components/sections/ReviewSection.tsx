'use client'

import { motion } from 'framer-motion'

export default function ReviewSection() {
  const reviews = [
    {
      name: 'Aarav Parekh',
      text: 'Paint protection work done flawlessly. Professional handling and premium finish.'
    },
    {
      name: 'Salil Chand',
      text: 'Ceramic coating exceeded expectations. Clean space and skilled technicians.'
    },
    {
      name: 'Umesh Kamat',
      text: 'PPF installation was precise and smooth. Highly satisfied with the results.'
    }
  ]

  return (
    <section className="relative bg-[#0A0A0A] py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2
            className="text-4xl md:text-6xl font-light text-white"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Customer <span className="text-[#C6A75E]">Reviews</span>
          </h2>

          <div className="mt-6">
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="text-2xl tracking-[0.3em] text-yellow-400 inline-block"
            >
              ★★★★★
            </motion.span>

            <p className="text-white/60 mt-3 text-sm tracking-wide">
              4.9 Rating (350+ Google Reviews)
            </p>
          </div>
        </div>

        {/* ---------------- DESKTOP REVIEWS ---------------- */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-20">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -6 }}
              className="bg-[#111] border border-white/10 rounded-2xl p-8 
              hover:border-[#C6A75E]/40 
              hover:shadow-[0_0_25px_rgba(198,167,94,0.35)] 
              transition-all duration-500"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="text-yellow-400 mb-4 tracking-widest"
              >
                ★★★★★
              </motion.div>

              <p className="text-white/70 text-sm leading-relaxed mb-6">{review.text}</p>

              <h4 className="text-white font-medium tracking-wide">{review.name}</h4>
            </motion.div>
          ))}
        </div>

        {/* ---------------- MOBILE REVIEWS (SLIDER) ---------------- */}
        <div className="flex md:hidden gap-6 mb-16 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.04 }}
              className="snap-center flex-shrink-0 w-[85%] bg-[#111] border border-white/10 rounded-xl p-6 
              hover:border-[#C6A75E]/40 
              hover:shadow-[0_0_25px_rgba(198,167,94,0.35)] 
              transition-all duration-500"
            >
              <div className="text-yellow-400 mb-3 tracking-widest">★★★★★</div>

              <p className="text-white/70 text-sm leading-relaxed mb-4">{review.text}</p>

              <h4 className="text-white text-sm font-medium tracking-wide">{review.name}</h4>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="border-t border-white/10 pt-8 md:pt-12 text-center">
          {/* MOBILE: grid | DESKTOP: flex */}
          <div className="grid grid-cols-3 md:flex md:flex-row justify-center items-center gap-6 md:gap-12">
            <div>
              <h3 className="text-2xl md:text-4xl text-[#C6A75E] font-light">2500+</h3>
              <p className="text-white/50 text-[9px] md:text-xs tracking-wider uppercase">
                Cars Serviced
              </p>
            </div>

            <div>
              <h3 className="text-2xl md:text-4xl text-[#C6A75E] font-light">5+</h3>
              <p className="text-white/50 text-[9px] md:text-xs tracking-wider uppercase">
                Years Experience
              </p>
            </div>

            <div>
              <h3 className="text-2xl md:text-4xl text-[#C6A75E] font-light">350+</h3>
              <p className="text-white/50 text-[9px] md:text-xs tracking-wider uppercase">
                Google Reviews
              </p>
            </div>
          </div>

          <div className="mt-8 md:mt-12">
            <a
              href="https://maps.app.goo.gl/zLNDiZjfNQvHR3dr8"
              target="_blank"
              className="inline-block border border-[#C6A75E]/50 text-[#C6A75E] uppercase tracking-[0.2em] text-[10px] md:text-xs py-3 md:py-4 px-8 md:px-10 hover:bg-[#C6A75E]/10 transition-all"
            >
              View on Google
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
