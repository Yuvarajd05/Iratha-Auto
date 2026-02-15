"use client";

const footerLinks = {
  Contact: [
    "Katapady,Udupi 574105",
    "+91 7500408090",
    "info@irathaauto.com",
  ],
  Company: ["About", "Careers", "Press", "Contact"],
  Legal: ["Privacy", "Terms", "Cookies"],
};

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A]">
      {/* Gold top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C6A75E]/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-8 md:px-16 py-20">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
          
          {/* Logo Section */}
          <div>
            <img
              src="images/logo.png"
              alt="Iratha Auto Logo"
              className="h-25 md:h-20 w-auto opacity-90 hover:opacity-100 transition duration-500 mb-6"
            />

            <p className="text-xs tracking-wide text-white/25 font-light max-w-xs leading-relaxed">
              Premium 4-wheeler service and repair for those who demand excellence.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16 md:gap-24 flex-wrap">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#C6A75E]/50 mb-6">
                  {category}
                </h4>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-xs tracking-wide text-white/30 hover:text-white/60 transition-colors duration-300 font-light"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] tracking-[0.2em] text-white/20 font-light">
            &copy; 2026 IRATHA Auto. All rights reserved.
          </p>

          <div className="flex gap-6">
            {["Instagram", "LinkedIn", "X", "Maps"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-[10px] tracking-[0.15em] text-white/20 hover:text-[#C6A75E]/60 transition-colors duration-300 uppercase"
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
