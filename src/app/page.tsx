"use client";

import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import SplitSection from "@/components/sections/SplitSection";
import GallerySection from "@/components/sections/GallerySection";
import FullWidthVisual from "@/components/sections/FullWidthVisual";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <HeroSection />
        <SplitSection />
        <GallerySection />
        <FullWidthVisual />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
