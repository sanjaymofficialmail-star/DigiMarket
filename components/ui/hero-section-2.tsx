import React from 'react';
import { cn } from "@/lib/utils";
import { motion, type Variants } from 'framer-motion';

// Icon component for contact details
const InfoIcon = ({ type }: { type: 'website' | 'phone' | 'address' }) => {
  const icons = {
    website: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" x2="22" y1="12" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
    phone: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
    address: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
  };
  return <div className="mr-2 flex-shrink-0">{icons[type]}</div>;
};

// Prop types for the HeroSection component
export interface HeroSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  logo?: {
    url: string;
    alt: string;
    text?: string;
  };
  slogan?: string;
  badge?: string;
  title: React.ReactNode;
  subtitle: string;
  pricing?: {
    online: string;
    onlineOriginal?: string;
    offline: string;
    offlineOriginal?: string;
  };
  callToAction: {
    text: string;
    href: string;
  };
  secondaryAction?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  backgroundImage: string;
  contactInfo: {
    website: string;
    phone: string;
    address: string;
  };
}

const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(
  ({
    className,
    logo,
    slogan,
    badge = "OFFICIAL TNSDC PARTNER",
    title,
    subtitle,
    pricing,
    callToAction,
    secondaryAction,
    backgroundImage,
    contactInfo,
    id = "home",
    style
  }, ref) => {

    // Animation variants for the container to orchestrate children animations
    const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.1,
        },
      },
    };

    // Animation variants for individual text/UI elements
    const itemVariants: Variants = {
      hidden: { y: 16, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.45,
          ease: "easeOut",
        },
      },
    };

    // Animation variant for the right side image with clipPath
    const imageVariants: Variants = {
      hidden: {
        clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
        opacity: 0.5
      },
      visible: {
        clipPath: 'polygon(18% 0, 100% 0, 100% 100%, 0% 100%)',
        opacity: 1,
        transition: {
          duration: 1.1,
          ease: "circOut",
        },
      },
    };

    return (
      <motion.section
        ref={ref}
        id={id}
        style={style}
        className={cn(
          "relative flex min-h-[96vh] md:min-h-[97vh] w-full flex-col overflow-hidden bg-background text-foreground md:flex-row md:items-stretch select-none",
          className
        )}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Left Side: Generous breathing room, well-balanced whitespace */}
        <div className="flex w-full flex-col justify-between py-8 px-6 sm:py-10 sm:px-10 md:w-1/2 md:py-10 md:px-12 lg:w-3/5 lg:py-12 lg:px-16 xl:px-20 z-10">
          {/* Top Logo Section with space */}
          <motion.header variants={itemVariants} className="pt-2">
            {logo && (
              <div className="flex items-center gap-3">
                <img src={logo.url} alt={logo.alt} className="h-9 sm:h-10 w-auto object-contain" />
                <div>
                  {logo.text && <p className="font-serif text-lg sm:text-xl font-bold tracking-tight text-foreground leading-none mb-1">{logo.text}</p>}
                  {slogan && <p className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-muted-foreground leading-none">{slogan}</p>}
                </div>
              </div>
            )}
          </motion.header>

          {/* Main Center Content with ample whitespace */}
          <motion.main variants={containerVariants} className="my-auto py-4">
            {badge && (
              <motion.div className="mb-4 inline-block" variants={itemVariants}>
                <span className="rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                  {badge}
                </span>
              </motion.div>
            )}

            {/* Heading with generous line space between lines */}
            <motion.h1
              className="font-serif text-3xl sm:text-4xl md:text-[2.45rem] lg:text-[2.85rem] xl:text-[3.15rem] font-bold leading-snug sm:leading-[1.28] tracking-tight text-foreground max-w-2xl"
              variants={itemVariants}
            >
              {title}
            </motion.h1>

            <motion.div className="my-5 h-1 w-14 rounded-full bg-primary" variants={itemVariants}></motion.div>

            <motion.p className="mb-6 max-w-md text-sm sm:text-base leading-relaxed text-muted-foreground font-sans" variants={itemVariants}>
              {subtitle}
            </motion.p>

            {/* Course 2 Fees with refined, clean pill cards */}
            {pricing && (
              <motion.div className="mb-7 flex flex-wrap items-center gap-3" variants={itemVariants}>
                <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs">
                  <span className="font-medium text-muted-foreground">Online Batch:</span>
                  {pricing.onlineOriginal && (
                    <span className="text-muted-foreground line-through opacity-60">{pricing.onlineOriginal}</span>
                  )}
                  <span className="font-bold text-primary">{pricing.online}</span>
                  <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-bold text-primary">50% OFF</span>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs">
                  <span className="font-medium text-muted-foreground">Offline Classroom:</span>
                  {pricing.offlineOriginal && (
                    <span className="text-muted-foreground line-through opacity-60">{pricing.offlineOriginal}</span>
                  )}
                  <span className="font-bold text-accent">{pricing.offline}</span>
                  <span className="rounded-full bg-accent/25 px-1.5 py-0.5 text-[10px] font-bold text-accent">70% OFF</span>
                </div>
              </motion.div>
            )}

            {/* CTA Action Row */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3.5 pt-1">
              <a
                href={callToAction.href}
                className="group inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-xs sm:text-sm font-semibold tracking-wider text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
              >
                {callToAction.text}
                <svg className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>

              {secondaryAction && (
                secondaryAction.onClick ? (
                  <button
                    type="button"
                    onClick={secondaryAction.onClick}
                    className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-xs sm:text-sm font-semibold tracking-wider text-foreground transition-all hover:bg-card hover:border-primary/50 cursor-pointer"
                  >
                    {secondaryAction.text}
                  </button>
                ) : (
                  <a
                    href={secondaryAction.href || "#about"}
                    className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-xs sm:text-sm font-semibold tracking-wider text-foreground transition-all hover:bg-card hover:border-primary/50"
                  >
                    {secondaryAction.text}
                  </a>
                )
              )}
            </motion.div>
          </motion.main>

          {/* Bottom Footer Info with subtle border */}
          <motion.footer className="w-full pt-4 pb-1 border-t border-border/40" variants={itemVariants}>
            <div className="grid grid-cols-1 gap-3 sm:gap-4 text-xs text-muted-foreground sm:grid-cols-3">
              <div className="flex items-center">
                <InfoIcon type="website" />
                <span className="font-medium truncate">{contactInfo.website}</span>
              </div>
              <div className="flex items-center">
                <InfoIcon type="phone" />
                <span className="font-medium truncate">{contactInfo.phone}</span>
              </div>
              <div className="flex items-center">
                <InfoIcon type="address" />
                <span className="font-medium truncate">{contactInfo.address}</span>
              </div>
            </div>
          </motion.footer>
        </div>

        {/* Right Side: Guaranteed to render with img and parent variant orchestration */}
        <motion.div
          className="relative w-full min-h-[380px] md:min-h-full md:w-1/2 lg:w-2/5 overflow-hidden"
          variants={imageVariants}
        >
          <img
            src={backgroundImage}
            alt="Plant Green Inertia Classroom Training"
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
          />
          {/* Official site emerald green gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0d2b12]/80 via-[#1a5c2a]/55 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
        </motion.div>
      </motion.section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export { HeroSection };
