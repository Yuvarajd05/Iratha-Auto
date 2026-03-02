"use client";

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A]">
      {/* Gold top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C6A75E]/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-8 md:px-16 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">

          {/* Logo */}
          <div className="max-w-xs">
            <img
              src="images/logo.png"
              alt="Iratha Auto Logo"
              className="h-20 w-auto opacity-90 mb-6"
            />

            <p className="text-xs tracking-wide text-white/25 font-light leading-relaxed">
              Premium 4-wheeler service and repair for those who demand excellence.
            </p>
          </div>

          {/* Right Side */}
          <div className="flex gap-12 md:gap-16 items-start flex-wrap md:flex-nowrap">

            {/* ✅ Contact (Added id="contact") */}
            <div id="contact" className="max-w-[260px]">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#C6A75E]/50 mb-6">
                Contact
              </h4>

              <div className="flex flex-col gap-3 text-xs text-white/30">
                <span>
                  Building No, 2-147-1, Katapady, Moodabettu,
                  Udupi, Karnataka - 574105
                </span>
                <span>+91 7500408090</span>
                <span>info@irathaauto.com</span>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#C6A75E]/50 mb-6">
                Company
              </h4>

              <div className="flex flex-col gap-3 text-xs text-white/30">
                <a href="#">About</a>
                <a href="#">Careers</a>
                <a href="#">Contact</a>
              </div>
            </div>

            {/* Location */}
            <div>
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#C6A75E]/50 mb-6">
                Location
              </h4>

              <a
                href="https://maps.app.goo.gl/zLNDiZjfNQvHR3dr8"
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="w-[180px] h-[120px] rounded-lg overflow-hidden border border-white/10 group-hover:border-[#C6A75E]/50 transition-all duration-500">

                  <iframe
                    src="https://maps.google.com/maps?q=Iratha%20Auto%20Udupi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                  />

                </div>

                <p className="text-[9px] tracking-wide text-white/20 mt-2 uppercase group-hover:text-[#C6A75E]/60 transition">
                  Open in Google Maps →
                </p>
              </a>
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] tracking-[0.2em] text-white/20">
            © 2026 IRATHA Auto. All rights reserved.
          </p>

          <div className="flex gap-6">
            {["Instagram", "LinkedIn"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-[10px] tracking-[0.15em] text-white/20 hover:text-[#C6A75E]/60 uppercase"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}