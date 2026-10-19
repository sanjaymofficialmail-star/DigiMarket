"use client";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function AboutSection3() {
  const heroRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.15,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const scaleVariants = {
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.2,
        duration: 0.6,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background text-foreground transition-colors duration-300" ref={heroRef} id="about">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* Header with badge & social icons */}
          <div className="flex justify-between items-center mb-8 w-full sm:w-[90%] md:w-[85%] absolute lg:top-4 md:top-2 sm:-top-2 -top-4 z-10 px-2 sm:px-0">
            <div className="flex items-center gap-2">
              <span className="text-primary animate-spin text-base sm:text-xl">✱</span>
              <TimelineContent
                as="span"
                animationNum={0}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-xs sm:text-sm font-semibold tracking-wider text-muted-foreground uppercase"
              >
                WHO WE ARE · PGI
              </TimelineContent>
            </div>
            
            {/* PGI Official Social Links */}
            <div className="flex gap-2 sm:gap-3">
              <TimelineContent
                as="a"
                animationNum={0}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="https://www.instagram.com/pginertia"
                target="_blank"
                rel="noopener noreferrer"
                title="PGI Instagram"
                className="w-7 h-7 sm:w-8 sm:h-8 border border-border bg-card/80 backdrop-blur-sm rounded-lg flex items-center justify-center cursor-pointer transition-transform hover:scale-105 hover:border-primary"
              >
                <img src="https://cdn.21st.dev/assets/mirror/80/8060ef38a7f4c25ea5e8bf5df005a4472de35f56836c64442341a9e590591e56.svg" alt="Instagram" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </TimelineContent>

              <TimelineContent
                as="a"
                animationNum={1}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="https://www.linkedin.com/company/plantgreeninertia/"
                target="_blank"
                rel="noopener noreferrer"
                title="PGI LinkedIn"
                className="w-7 h-7 sm:w-8 sm:h-8 border border-border bg-card/80 backdrop-blur-sm rounded-lg flex items-center justify-center cursor-pointer transition-transform hover:scale-105 hover:border-primary"
              >
                <img src="https://cdn.21st.dev/assets/mirror/23/2371179e72304e6296cb7324ea9ea67a1ad6cb1fe3a35c40a689ed7bf6dd5064.svg" alt="LinkedIn" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </TimelineContent>

              <TimelineContent
                as="a"
                animationNum={2}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="https://youtube.com/@plantgreeninertia"
                target="_blank"
                rel="noopener noreferrer"
                title="PGI YouTube"
                className="w-7 h-7 sm:w-8 sm:h-8 border border-border bg-card/80 backdrop-blur-sm rounded-lg flex items-center justify-center cursor-pointer transition-transform hover:scale-105 hover:border-primary"
              >
                <img src="https://cdn.21st.dev/assets/mirror/37/3792b7e33f779b6c2819619228cdcc8d279b3020f19c34dc1ef311756eccbf22.svg" alt="YouTube" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </TimelineContent>
            </div>
          </div>

          {/* Architectural Cut-Out Image Container */}
          <TimelineContent
            as="figure"
            animationNum={3}
            timelineRef={heroRef}
            customVariants={scaleVariants}
            className="relative group pt-6 sm:pt-4"
          >
            <svg
              className="w-full drop-shadow-sm"
              width={"100%"}
              height={"100%"}
              viewBox="0 0 100 40"
            >
              <defs>
                <clipPath
                  id="clip-inverted"
                  clipPathUnits={"objectBoundingBox"}
                >
                  <path
                    d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z"
                    fill="#D9D9D9"
                  />
                </clipPath>
              </defs>
              <image
                clipPath="url(#clip-inverted)"
                preserveAspectRatio="xMidYMid slice"
                width={"100%"}
                height={"100%"}
                xlinkHref="https://plantgreeninertia.com/assets/int2.JPG"
              ></image>
            </svg>
          </TimelineContent>

          {/* Stats Bar (Sourced from PGI & pgidigital) */}
          <div className="flex flex-wrap lg:justify-start justify-between items-center py-4 text-sm">
            <TimelineContent
              as="div"
              animationNum={4}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="flex flex-wrap gap-4 sm:gap-6"
            >
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-primary font-bold">2+</span>
                <span className="text-muted-foreground">years active</span>
                <span className="text-border">|</span>
              </div>
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-primary font-bold">70,000+</span>
                <span className="text-muted-foreground">students trained</span>
              </div>
            </TimelineContent>

            <div className="lg:absolute right-0 bottom-14 flex lg:flex-col flex-row-reverse lg:gap-0 gap-4">
              <TimelineContent
                as="div"
                animationNum={5}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex lg:text-3xl sm:text-2xl text-xl items-center gap-2 mb-1"
              >
                <span className="text-primary font-bold font-serif">59+</span>
                <span className="text-muted-foreground uppercase text-xs sm:text-sm font-semibold tracking-wider">colleges</span>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex items-center gap-2 mb-2 sm:text-base text-xs"
              >
                <span className="text-accent font-bold">100%</span>
                <span className="text-muted-foreground">placement support</span>
                <span className="text-border lg:hidden block">|</span>
              </TimelineContent>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-8 sm:gap-10 mt-6">
          <div className="md:col-span-2">
            <h2 className="font-serif sm:text-4xl md:text-5xl text-3xl !leading-[1.12] font-bold text-foreground mb-6">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.08}
                staggerFrom="first"
                reverse={true}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                  delay: 0.3,
                }}
              >
                Skills Employers Actually Hire For.
              </VerticalCutReveal>
            </h2>

            <TimelineContent
              as="div"
              animationNum={7}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="grid sm:grid-cols-2 gap-6 sm:gap-8 text-muted-foreground"
            >
              <div className="sm:text-base text-sm">
                <p className="leading-relaxed text-justify">
                  Plant Green Inertia Pvt. Ltd. is an Official Training Partner of TN Skills, Tamil Nadu Skill Development Corporation (TNSDC), dedicated to delivering industry-aligned skill development programs that enhance students' knowledge, practical competencies, and career readiness.
                </p>
              </div>
              <div className="sm:text-base text-sm">
                <p className="leading-relaxed text-justify">
                  Our experiential learning approach bridges the gap between academic education and industry requirements. From hands-on AI SEO and Meta Ads to real-time analytics, we empower learners with future-ready skills that transform students into work-ready professionals.
                </p>
              </div>
            </TimelineContent>
          </div>

          {/* Right Column Action Card */}
          <div className="md:col-span-1 flex flex-col justify-between">
            <div className="text-left md:text-right">
              <TimelineContent
                as="div"
                animationNum={8}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="font-serif text-primary text-2xl font-bold mb-1"
              >
                Plant Green Inertia
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={9}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-muted-foreground text-xs font-semibold tracking-wider uppercase mb-5"
              >
                Official TN Skills & TNSDC Partner
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={10}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-6"
              >
                <p className="text-foreground font-medium text-sm leading-relaxed mb-4">
                  Ready to transform your career through hands-on experiential training?
                </p>
              </TimelineContent>

              <TimelineContent
                as="a"
                animationNum={11}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="#application/forms"
                className="inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3 text-xs sm:text-sm font-semibold tracking-wider text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>ENROLL NOW</span>
                <ArrowRight className="h-4 w-4" />
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
