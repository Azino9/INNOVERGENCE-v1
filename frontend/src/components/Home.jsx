import React from 'react'
import Navbar from './Navbar'
import GlobalTimer from './GlobalTimer'
import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import TimelineSection from './TimelineSection'
import PrizesSection from './PrizesSection'
import SponsorsSection from './SponsorsSection'
import FAQSection from './FAQSection'
import Footer from './Footer'
function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <PrizesSection />
      <SponsorsSection />
      <FAQSection />
      <Footer />
      <GlobalTimer />
    </div>
  );
}

export default Home