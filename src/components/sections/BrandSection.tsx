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
    <section className="bg-[#0A0A0A] py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-center text-2xl md:text-3xl tracking-[0.4em] text-white/70 mb-12 uppercase">
          Brands We Service
        </h2>

        <div className="relative overflow-hidden">

          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />

          <div className="flex gap-16 animate-scroll whitespace-nowrap">
            {[...brands, ...brands].map((brand, index) => (
              <img
                key={index}
                src={brand}
                alt="brand logo"
                className="h-8 md:h-10 w-auto transition duration-500 hover:scale-110"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
