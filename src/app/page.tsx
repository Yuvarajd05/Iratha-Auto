'use client'

import { useState } from 'react'

import LoadingScreen from '@/components/LoadingScreen'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import SplitSection from '@/components/sections/SplitSection'
import GallerySection from '@/components/sections/GallerySection'
import FullWidthVisual from '@/components/sections/FullWidthVisual'
import BeforeAfterSection from '@/components/sections/BeforeAfterSection'
import CTASection from '@/components/sections/CTASection'
import BrandSection from '@/components/sections/BrandSection'
import InstagramSection from '@/components/sections/InstagramSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/sections/Footer'
import ReviewSection from '@/components/sections/ReviewSection'
import WhatsAppFloating from '@/components/ui/WhatsAppFloating'

import { ServiceRequestForm } from '@/components/Forms/ServiceRequestForm'

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  return (
    <>
      {/* Loading Screen */}
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}

      <Navbar onBookService={() => setIsFormOpen(true)} />

      <main>
        <HeroSection />
        <SplitSection />
        <GallerySection />
        <FullWidthVisual />
        <BeforeAfterSection />
        <CTASection onBookService={() => setIsFormOpen(true)} />
        <BrandSection />
        <ReviewSection />
        <InstagramSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Service Form Modal */}
      <ServiceRequestForm show={isFormOpen} onClose={() => setIsFormOpen(false)} />
      <WhatsAppFloating />
    </>
  )
}
