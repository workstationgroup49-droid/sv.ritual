import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/home/HeroSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { FeaturedSection } from '@/components/home/FeaturedSection'
import { AboutSection } from '@/components/home/AboutSection'
import { ContactSection } from '@/components/home/ContactSection'
import { ReviewsSection } from '@/components/home/ReviewsSection'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <FeaturedSection />
        <AboutSection />
        <ContactSection />
        <ReviewsSection />
      </main>
      <Footer />
    </>
  )
}
