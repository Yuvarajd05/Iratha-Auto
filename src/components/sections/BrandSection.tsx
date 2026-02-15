"use client";

export default function BrandSection() {
  const brands = [
    "/brands/tata.webp",
    "/brands/mg.png",
    "/brands/toyota1.png",
    "/brands/honda.png",
    "/brands/mitsubishi.png",
    "/brands/lexus.png",
    "/brands/hyundai.png",
    "/brands/kia.png",
    "/brands/bmw.png",
    "/brands/audi.png",
    "/brands/benz.png",
    "/brands/porsche.png",
    "/brands/volkswagen.png",
  ];

  return (
    <section className="bg-[#0A0A0A] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-center text-2xl md:text-3xl tracking-[0.5em] text-[#C6A75E] mb-14 uppercase">
          Brands We Service
        </h2>

        {/* Scroll Wrapper */}
        <div className="relative overflow-hidden">

          {/* Left Fade */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />

          {/* Right Fade */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />

          {/* Moving Logos */}
          <div className="flex gap-20 items-center whitespace-nowrap animate-scroll">
            {[...brands, ...brands].map((brand, index) => (
              <img
                key={index}
                src={brand}
                alt="brand logo"
                className="h-10 md:h-12 w-auto opacity-80 hover:opacity-100 transition duration-500 
                           hover:scale-110"
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
