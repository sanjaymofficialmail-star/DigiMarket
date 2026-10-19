import React from 'react';
import { HeroSection } from '@/components/ui/hero-section-2';

interface HeroSectionDemoProps {
  onScrollToAbout?: () => void;
  onEnroll?: () => void;
}

export default function HeroSectionDemo({ onScrollToAbout, onEnroll }: HeroSectionDemoProps) {
  const handleKnowMore = () => {
    if (onScrollToAbout) {
      onScrollToAbout();
    } else {
      const el = document.getElementById('about');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="w-full">
      <HeroSection
        id="home"
        logo={{
          url: "https://plantgreeninertia.com/newpgi%20logo%20.png",
          alt: "Plant Green Inertia Logo",
          text: "Plant Green Inertia"
        }}
        slogan="THE WORLD'S FIRST EXPERIENTIAL TRAINING COMPANY"
        badge="OFFICIAL TNSDC PARTNER"
        title={
          <>
            <span className="inline-block sm:whitespace-nowrap">Master digital marketing.</span>
            <span className="block text-primary italic mt-0 sm:mt-0">Get career-ready.</span>
          </>
        }
        subtitle="Industry-aligned training in AI SEO, paid ads, analytics, lead generation and more, taught through hands-on practice."
        pricing={{
          online: "\u20B94,999",
          onlineOriginal: "\u20B910,000",
          offline: "\u20B914,999",
          offlineOriginal: "\u20B950,000"
        }}
        callToAction={{
          text: "ENROLL NOW",
          onClick: onEnroll,
          href: "#application/forms",
        }}
        secondaryAction={{
          text: "Know More ↓",
          onClick: handleKnowMore,
        }}
        backgroundImage="/assets/hero.jpeg"
        contactInfo={{
          website: "pgidigital.vercel.app",
          phone: "+91 93450 29705",
          address: "Maduravoyal, Chennai - 600095",
        }}
      />
    </div>
  );
}

export { default as DemoOne } from './modern-login-signup';
