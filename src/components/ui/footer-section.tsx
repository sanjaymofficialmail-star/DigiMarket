"use client";

import React from "react";
import { ArrowUp, ShieldCheck, Phone, Mail, MapPin } from "lucide-react";

interface FooterProps {
  onEnrollClick?: () => void;
  onScrollToSection?: (id: string) => void;
}

export default function FooterSection({ onEnrollClick, onScrollToSection }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNav = (id: string) => {
    if (onScrollToSection) {
      onScrollToSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#071309] text-[#e8f0e9] border-t border-[#1a5c2a]/30 pt-16 pb-12 px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="font-serif font-black tracking-tight text-2xl text-white">
                Plant<span className="text-[#4ade80]">Green</span>
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-[#163e20] text-[#4ade80] border border-[#22c55e]/40">
                Inertia
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#9cbba2] leading-relaxed max-w-sm">
              Plant Green Inertia Pvt. Ltd. — The World's First Experiential Training Company. Industry-aligned digital marketing training, delivered as an Official Training Partner of TN Skills, TNSDC.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0d2613] border border-[#22c55e]/30 text-xs font-semibold text-[#4ade80]">
              <ShieldCheck className="w-4 h-4 text-[#4ade80]" />
              Official Training Partner · TN Skills, TNSDC
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onEnrollClick}
                className="inline-flex items-center gap-2 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-xs sm:text-sm px-6 py-2.5 shadow-md shadow-[#22c55e]/20 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                Enroll Now &rarr;
              </button>
            </div>
          </div>

          {/* Course Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Course</h4>
            <ul className="space-y-2 text-xs text-[#9cbba2]">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav("home")}
                  className="hover:text-[#4ade80] transition-colors cursor-pointer"
                >
                  Overview
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav("syllabus")}
                  className="hover:text-[#4ade80] transition-colors cursor-pointer"
                >
                  8-Week Syllabus
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav("pricing")}
                  className="hover:text-[#4ade80] transition-colors cursor-pointer"
                >
                  Course Fees & Plans
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onEnrollClick}
                  className="hover:text-[#4ade80] transition-colors cursor-pointer text-[#4ade80] font-semibold"
                >
                  Apply Online &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-2 text-xs text-[#9cbba2]">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav("about")}
                  className="hover:text-[#4ade80] transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <a
                  href="https://plantgreeninertia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#4ade80] transition-colors"
                >
                  Official Website ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.tnskill.tn.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#4ade80] transition-colors"
                >
                  TN Skills (TNSDC) ↗
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav("contact")}
                  className="hover:text-[#4ade80] transition-colors cursor-pointer"
                >
                  Contact Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Campus & Support (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Campus & Support</h4>
            <div className="space-y-2.5 text-xs text-[#9cbba2]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#4ade80] shrink-0 mt-0.5" />
                <span>Maduravoyal, Chennai, Tamil Nadu — 600095</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#4ade80] shrink-0" />
                <a href="tel:+919345029705" className="hover:text-[#4ade80] transition-colors">
                  +91 93450 29705
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#4ade80] shrink-0" />
                <a href="mailto:hello@plantgreeninertia.com" className="hover:text-[#4ade80] transition-colors">
                  hello@plantgreeninertia.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#719678]">
          <div>
            © 2026 Plant Green Inertia Pvt. Ltd. All rights reserved.
          </div>
          <div className="text-center sm:text-left text-[#9cbba2]">
            Official Training Partner of TN Skills, TNSDC · Government of Tamil Nadu
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-white hover:text-[#4ade80] transition-colors cursor-pointer font-semibold"
          >
            Back to Top <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
