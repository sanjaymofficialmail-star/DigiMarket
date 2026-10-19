"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import createGlobe, { type COBEOptions } from "cobe";
import { cn } from "@/lib/utils";

// White & Green Theme Globe Configuration
const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => { },
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.25,
  dark: 0,
  diffuse: 1.0,
  mapSamples: 16000,
  mapBrightness: 2.8,
  baseColor: [1, 1, 1], // Pure clean white sphere
  markerColor: [26 / 255, 128 / 255, 55 / 255], // Rich emerald green markers
  glowColor: [0.2, 0.85, 0.4], // Emerald green atmospheric halo glow
  markers: [
    { location: [13.0827, 80.2707], size: 0.12 }, // Chennai HQ (Maduravoyal)
    { location: [19.076, 72.8777], size: 0.08 },  // Mumbai
    { location: [28.6139, 77.2090], size: 0.07 }, // Delhi
    { location: [1.3521, 103.8198], size: 0.06 }, // Singapore
    { location: [25.2048, 55.2708], size: 0.07 }, // Dubai
    { location: [51.5074, -0.1278], size: 0.08 }, // London
    { location: [40.7128, -74.006], size: 0.09 }, // New York
    { location: [37.7749, -122.4194], size: 0.07 }, // San Francisco
    { location: [35.6762, 139.6503], size: 0.07 }, // Tokyo
    { location: [-33.8688, 151.2093], size: 0.06 }, // Sydney
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 200);
    }
  };

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phi += 0.005;
      state.phi = phi + r;
      state.width = (width || 400) * 2;
      state.height = (width || 400) * 2;
    },
    [r],
  );

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const w = width || (canvasRef.current ? canvasRef.current.offsetWidth : 400) || 400;
    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: w * 2,
      height: w * 2,
      onRender,
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    });

    return () => {
      window.removeEventListener("resize", onResize);
      globe.destroy();
    };
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current,
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}

export interface Featured_05Props {
  className?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}

export default function Featured_05({
  className,
  title,
  subtitle,
  ctaText = "Enroll Now",
  ctaHref = "https://wa.me/919345029705?text=Hi%20Plant%20Green%20Inertia!%20I%20would%20like%20to%20enroll%20in%20the%20Digital%20Marketing%20Course.",
  onCtaClick,
}: Featured_05Props = {}) {
  return (
    <section
      className={cn(
        "relative w-full mx-auto overflow-hidden rounded-3xl bg-white dark:bg-[#07170a] border-2 border-[#1a5c2a]/20 dark:border-[#22c55e]/30 shadow-xl shadow-[#1a5c2a]/5 px-6 py-10 sm:py-12 md:px-12 md:py-14 mt-0",
        className,
      )}
    >
      <div className="flex flex-col-reverse items-center justify-between gap-10 md:flex-row">
        {/* Left Side: All Content in Green */}
        <div className="z-10 max-w-xl text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1a5c2a] dark:text-[#4ade80] leading-snug tracking-tight">
            {title ? (
              title
            ) : (
              <>
                Ready to Launch Your Career with{" "}
                <span className="text-[#2d663b] dark:text-[#86efac]">
                  Plant Green Inertia?
                </span>
              </>
            )}
          </h2>

          <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-[#2d663b] dark:text-[#86efac]/90 font-medium font-sans max-w-lg">
            {subtitle ? (
              subtitle
            ) : (
              "Reserve your seat for the upcoming experiential cohort. Master AI SEO, Meta Ads, and GA4 with live budgets and official TNSDC certification."
            )}
          </p>

          <div className="mt-6">
            {onCtaClick ? (
              <button
                type="button"
                onClick={onCtaClick}
                className="inline-flex items-center gap-2 rounded-full bg-[#1a5c2a] hover:bg-[#144720] text-white px-7 py-3 text-xs sm:text-sm font-semibold tracking-wider shadow-md shadow-[#1a5c2a]/25 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                {ctaText} <ArrowRight className="h-4 w-4 text-white" />
              </button>
            ) : (
              <a
                href={ctaHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#1a5c2a] hover:bg-[#144720] text-white px-7 py-3 text-xs sm:text-sm font-semibold tracking-wider shadow-md shadow-[#1a5c2a]/25 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                {ctaText} <ArrowRight className="h-4 w-4 text-white" />
              </a>
            )}
          </div>
        </div>

        {/* Right Side: 3D White & Green Globe */}
        <div className="relative h-[220px] sm:h-[260px] md:h-[200px] w-full max-w-xl">
          <Globe className="absolute -bottom-20 -right-40 scale-150" />
        </div>
      </div>
    </section>
  );
}
