"use client";

export default function ContactSection() {
  return (
    <section className="bg-[#0A0A0A] py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Top Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#C6A75E]/30 to-transparent mb-20" />

        <div className="grid md:grid-cols-2 gap-16">

          {/* Left Text */}
          <div>
            <h2
              className="text-4xl md:text-5xl text-white font-light"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Get In Touch
            </h2>

            <p className="mt-6 text-white/40 text-sm max-w-md leading-relaxed">
              Have a question about repairs, insurance claims or bookings?
              Fill the form and our team will contact you shortly.
            </p>
          </div>

          {/* Right Form */}
          <form className="flex flex-col gap-6">

            <input
              type="text"
              placeholder="Full Name"
              className="bg-black border border-white/10 px-5 py-4 text-sm text-white placeholder-white/30 focus:border-[#C6A75E] outline-none transition-all"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="bg-black border border-white/10 px-5 py-4 text-sm text-white placeholder-white/30 focus:border-[#C6A75E] outline-none transition-all"
            />

            <textarea
              rows={5}
              placeholder="Your Message"
              className="bg-black border border-white/10 px-5 py-4 text-sm text-white placeholder-white/30 focus:border-[#C6A75E] outline-none resize-none transition-all"
            />

            <button
              type="submit"
              className="border border-[#C6A75E]/50 text-[#C6A75E] uppercase tracking-[0.2em] text-xs py-4 hover:bg-[#C6A75E]/10 hover:border-[#C6A75E] transition-all"
            >
              Send Message
            </button>

          </form>

        </div>
      </div>
    </section>
  );
}
