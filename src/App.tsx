import { useState, useEffect } from 'react'
import HeroSectionDemo from '@/components/ui/demo'
import AboutSection3 from '@/components/ui/about-section'
import Timeline from '@/components/ui/timeline'
import Pricing from '@/components/ui/pricing-01'
import Featured_05 from '@/components/ui/globe-feature-section'
import ContactSection from '@/components/ui/contact-section'
import FooterSection from '@/components/ui/footer-section'
import ModernLoginSignup from '@/components/ui/modern-login-signup'

function App() {
  const [isDark, setIsDark] = useState(false)
  const [activeSection, setActiveSection] = useState<'home' | 'about' | 'syllabus' | 'pricing' | 'apply' | 'contact'>('home')
  const [isEnrollOpen, setIsEnrollOpen] = useState(false)
  const [enrollMode, setEnrollMode] = useState<'Online' | 'Offline'>('Online')

  // Check URL Hash for direct route to #application/forms or #enroll
  useEffect(() => {
    const checkHash = () => {
      const h = window.location.hash
      if (h === '#application/forms' || h === '#enroll' || h.startsWith('#application')) {
        setIsEnrollOpen(true)
      } else {
        setIsEnrollOpen(false)
      }
    }

    checkHash()
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const contactEl = document.getElementById('contact')
      const applyEl = document.getElementById('apply')
      const pricingEl = document.getElementById('pricing')
      const syllabusEl = document.getElementById('syllabus')
      const aboutEl = document.getElementById('about')

      if (contactEl && contactEl.getBoundingClientRect().top <= window.innerHeight * 0.45) {
        setActiveSection('contact')
      } else if (applyEl && applyEl.getBoundingClientRect().top <= window.innerHeight * 0.45) {
        setActiveSection('apply')
      } else if (pricingEl && pricingEl.getBoundingClientRect().top <= window.innerHeight * 0.4) {
        setActiveSection('pricing')
      } else if (syllabusEl && syllabusEl.getBoundingClientRect().top <= window.innerHeight * 0.4) {
        setActiveSection('syllabus')
      } else if (aboutEl && aboutEl.getBoundingClientRect().top <= window.innerHeight * 0.45) {
        setActiveSection('about')
      } else {
        setActiveSection('home')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setActiveSection(id as 'home' | 'about' | 'syllabus' | 'pricing' | 'apply' | 'contact')
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleOpenEnroll = (mode: 'Online' | 'Offline' = 'Online') => {
    setEnrollMode(mode)
    setIsEnrollOpen(true)
    window.location.hash = '#application/forms'
  }

  const handleCloseEnroll = () => {
    setIsEnrollOpen(false)
    window.location.hash = '#apply'
  }

  // If Enroll / Application fill page is active, show the modern WebGL Dot canvas portal
  if (isEnrollOpen) {
    return (
      <div className={isDark ? 'dark' : ''}>
        <ModernLoginSignup onBack={handleCloseEnroll} defaultMode={enrollMode} />
      </div>
    )
  }

  return (
    <div className={`min-h-screen w-full font-sans transition-colors duration-300 ${isDark ? 'dark bg-[#081a0b] text-[#faf7f2]' : 'bg-[#faf7f2] text-[#1a1a1a]'}`}>
      {/* Centered Floating Navigation Bar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 sm:gap-1.5 p-1 bg-background/90 backdrop-blur-md border border-border/80 rounded-full shadow-md max-w-[94vw] overflow-x-auto">
        <button
          onClick={() => scrollToSection('home')}
          className={`px-3 sm:px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer shrink-0 ${activeSection === 'home'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
            }`}
        >
          Home
        </button>
        <button
          onClick={() => scrollToSection('about')}
          className={`px-3 sm:px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer shrink-0 ${activeSection === 'about'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
            }`}
        >
          About Us
        </button>
        <button
          onClick={() => scrollToSection('syllabus')}
          className={`px-3 sm:px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer shrink-0 ${activeSection === 'syllabus'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
            }`}
        >
          Syllabus
        </button>
        <button
          onClick={() => scrollToSection('pricing')}
          className={`px-3 sm:px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer shrink-0 ${activeSection === 'pricing'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
            }`}
        >
          Pricing
        </button>
        <button
          onClick={() => scrollToSection('contact')}
          className={`px-3 sm:px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer shrink-0 ${activeSection === 'contact'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
            }`}
        >
          Contact
        </button>
        <button
          onClick={() => handleOpenEnroll('Online')}
          className="px-3.5 sm:px-5 py-1.5 text-xs font-bold rounded-full bg-[#1a5c2a] text-white hover:bg-[#144720] shadow-sm transition-all duration-300 cursor-pointer shrink-0"
        >
          Enroll Now
        </button>
      </nav>

      {/* Floating Theme Toggle (Top-Right) */}
      <div className="fixed top-4 right-4 sm:right-8 z-50">
        <button
          onClick={() => setIsDark(!isDark)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border shadow-sm backdrop-blur-md transition-all bg-background/85 hover:bg-background border-border text-foreground hover:scale-105 active:scale-95 cursor-pointer"
          title="Toggle Dark / Light theme"
        >
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      {/* Unified Scrollable Single Page */}
      <main className="w-full">
        {/* Section 1: Hero Landing */}
        <section id="home" className="w-full min-h-[96vh] flex flex-col justify-center">
          <HeroSectionDemo
            onScrollToAbout={() => scrollToSection('about')}
            onEnroll={() => handleOpenEnroll('Online')}
          />
        </section>

        {/* Section 2: About Section */}
        <section id="about" className="w-full border-t border-border/40 scroll-mt-6">
          <AboutSection3 />
        </section>

        {/* Section 3: Course Syllabus Horizontal Timeline */}
        <div className="w-full border-t border-border/40 scroll-mt-6">
          <Timeline
            title="Course Syllabus"
            periodLabel="8 Weeks · 100+ Live Practical Hours"
            imageUrl="/assets/dm3.jpeg"
            imageAlt="Plant Green Inertia Digital Marketing Course"
            activeColor="#1a5c2a"
          />
        </div>

        {/* Section 4: Course Fees & Pricing */}
        <Pricing onEnroll={handleOpenEnroll} />

        {/* Section 5: 3D Globe CTA Section */}
        <section id="apply" className="w-full border-t border-border/40 scroll-mt-6 px-4 pt-4 pb-14 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Featured_05
              className="mt-0"
              title={
                <>
                  Ready to Launch Your Career with{" "}
                  <span className="text-[#143d22] dark:text-[#86efac]">
                    Plant Green Inertia
                  </span>?
                </>
              }
              subtitle="Reserve your seat for the upcoming experiential cohort. Master AI SEO, Meta Ads, and GA4 with live budgets and official TNSDC certification."
              ctaText="Enroll Now"
              onCtaClick={() => handleOpenEnroll('Online')}
            />
          </div>
        </section>

        {/* Section 6: Contact Us Section */}
        <div className="w-full border-t border-border/40">
          <ContactSection onEnrollClick={() => handleOpenEnroll('Online')} />
        </div>

        {/* Section 7: Brand Footer */}
        <FooterSection
          onEnrollClick={() => handleOpenEnroll('Online')}
          onScrollToSection={scrollToSection}
        />
      </main>
    </div>
  )
}

export default App
