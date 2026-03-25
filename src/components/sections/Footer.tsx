'use client'

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A]">
      {/* Gold top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C6A75E]/30 to-transparent" />

      {/* Container */}
      <div className="mx-auto max-w-7xl px-6 md:px-16 py-8 md:py-14">
        {/* Main footer layout */}
        <div className="grid grid-cols-2 md:flex md:flex-row md:justify-between items-start gap-y-6 gap-x-8 md:gap-14 mb-8 md:mb-10">
          {/* Logo */}
          <div className="col-span-2 md:col-span-1 max-w-xs">
            <img
              src="/images/logo.png"
              alt="Iratha Auto Logo"
              className="h-10 md:h-16 w-auto opacity-90 mb-2"
            />

            <p className="text-[11px] md:text-xs tracking-wide text-white/60 font-light leading-relaxed">
              Premium 4-wheeler service and repair for those who demand excellence.
            </p>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#C6A75E]/60 mb-2">
              Opening Hours
            </h4>

            <div className="text-[11px] md:text-xs text-white/60 space-y-1">
              <div className="flex gap-4">
                <span className="w-16">Mon–Sat</span>
                <span>9:30 AM – 7 PM</span>
              </div>

              <div className="flex gap-4">
                <span className="w-16">Sunday</span>
                <span className="text-[#C6A75E]/60">Closed</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div id="contact" className="max-w-[200px]">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#C6A75E]/60 mb-2">
              Contact
            </h4>

            <div className="flex flex-col gap-1 text-[11px] md:text-xs text-white/60">
              <span>Building No, 2-147-1, Katapady, Moodabettu, Udupi, Karnataka - 574105</span>
              <span>+91 7500408090</span>
              <span>info@irathaauto.com</span>
            </div>
          </div>

          {/* Location */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#C6A75E]/60 mb-2">
              Location
            </h4>

            {/* ---------- MOBILE LOCATION CARD ---------- */}
            <div className="md:hidden border border-white/10 rounded-lg p-4 bg-[#111]">
              <p className="text-[11px] text-white/70 leading-relaxed mb-3">
                IRATHA Auto <br />
                Katapady, Moodabettu <br />
                Udupi, Karnataka
              </p>

              <a
                href="https://maps.app.goo.gl/zLNDiZjfNQvHR3dr8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[10px] tracking-[0.2em] uppercase text-[#C6A75E] border border-[#C6A75E]/40 px-4 py-2 hover:bg-[#C6A75E]/10 transition"
              >
                Open in Maps →
              </a>
            </div>

            {/* ---------- DESKTOP MAP ---------- */}
            <a
              href="https://maps.app.goo.gl/zLNDiZjfNQvHR3dr8"
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden md:block"
            >
              <div className="w-[170px] h-[110px] rounded-lg overflow-hidden border border-white/10 group-hover:border-[#C6A75E]/60 transition-all duration-500">
                <iframe
                  src="https://maps.google.com/maps?q=Iratha%20Auto%20Udupi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>

              <p className="text-[9px] tracking-wide text-white/20 mt-1 uppercase group-hover:text-[#C6A75E]/60 transition">
                Open in Google Maps →
              </p>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-3 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-[9px] md:text-[10px] tracking-[0.2em] text-white/60 text-center md:text-left">
            © 2026 IRATHA Auto. All rights reserved.
          </p>

          <div className="flex gap-5">
            {['Instagram', 'LinkedIn'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-[9px] md:text-[10px] tracking-[0.15em] text-white/60 hover:text-[#C6A75E]/50 uppercase transition"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
