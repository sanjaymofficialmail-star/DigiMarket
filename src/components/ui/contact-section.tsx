"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, ShieldCheck, CheckCircle2 } from "lucide-react";

interface ContactSectionProps {
  onEnrollClick?: () => void;
}

export default function ContactSection({ onEnrollClick }: ContactSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative w-full py-20 px-4 sm:px-6 md:px-12 bg-transparent scroll-mt-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1a5c2a]/10 dark:bg-[#22c55e]/15 border border-[#1a5c2a]/20 dark:border-[#22c55e]/30 text-[#1a5c2a] dark:text-[#4ade80] text-xs font-bold uppercase tracking-wider mb-3.5">
            <MessageSquare className="w-3.5 h-3.5" />
            Connect With Us
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0a1f11] dark:text-[#faf7f2] tracking-tight">
            Start a <span className="text-[#1a5c2a] dark:text-[#4ade80]">Conversation.</span>
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#3d5a42] dark:text-[#9cbba2] leading-relaxed">
            Have questions about the experiential curriculum, fees, or campus admissions? Our academic counselors are here to help.
          </p>
        </div>

        {/* Content Grid: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Info Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Campus Headquarters */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0b1d11] border border-[#1a5c2a]/15 dark:border-[#22c55e]/25 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1a5c2a]/10 dark:bg-[#22c55e]/20 text-[#1a5c2a] dark:text-[#4ade80] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0a1f11] dark:text-white">Chennai HQ Campus</h4>
                  <p className="text-xs text-[#3d5a42] dark:text-[#9cbba2] mt-1 leading-relaxed">
                    Plant Green Inertia Pvt. Ltd.<br />
                    Maduravoyal, Chennai, Tamil Nadu — 600095
                  </p>
                  <div className="mt-2 text-[11px] font-semibold text-[#1a5c2a] dark:text-[#4ade80] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Official Training Partner · TN Skills, TNSDC
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Phone & WhatsApp */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0b1d11] border border-[#1a5c2a]/15 dark:border-[#22c55e]/25 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1a5c2a]/10 dark:bg-[#22c55e]/20 text-[#1a5c2a] dark:text-[#4ade80] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#0a1f11] dark:text-white">Call / WhatsApp</h4>
                  <p className="text-xs text-[#3d5a42] dark:text-[#9cbba2]">
                    Admissions Desk:{" "}
                    <a href="tel:+919345029705" className="text-[#1a5c2a] dark:text-[#4ade80] font-semibold hover:underline">
                      +91 93450 29705
                    </a>
                  </p>
                  <p className="text-xs text-[#3d5a42] dark:text-[#9cbba2]">
                    Coordination:{" "}
                    <a href="https://wa.me/918220699083" target="_blank" rel="noopener noreferrer" className="text-[#1a5c2a] dark:text-[#4ade80] font-semibold hover:underline">
                      +91 82206 99083
                    </a>
                  </p>
                  <div className="pt-1 flex items-center gap-1 text-[11px] text-[#5b7a60] dark:text-[#7b9c80]">
                    <Clock className="w-3 h-3" />
                    Mon – Sat, 9:00 AM – 7:00 PM IST
                  </div>
                </div>
              </div>
            </div>

            {/* Official Email */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0b1d11] border border-[#1a5c2a]/15 dark:border-[#22c55e]/25 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1a5c2a]/10 dark:bg-[#22c55e]/20 text-[#1a5c2a] dark:text-[#4ade80] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0a1f11] dark:text-white">Email Us</h4>
                  <p className="text-xs text-[#3d5a42] dark:text-[#9cbba2] mt-1">
                    General:{" "}
                    <a href="mailto:hello@plantgreeninertia.com" className="text-[#1a5c2a] dark:text-[#4ade80] font-semibold hover:underline">
                      hello@plantgreeninertia.com
                    </a>
                  </p>
                  <p className="text-xs text-[#3d5a42] dark:text-[#9cbba2] mt-0.5">
                    Admissions:{" "}
                    <a href="mailto:admissions@plantgreeninertia.com" className="text-[#1a5c2a] dark:text-[#4ade80] font-semibold hover:underline">
                      admissions@plantgreeninertia.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Reach-Out Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0b1d11] border border-[#1a5c2a]/15 dark:border-[#22c55e]/25 rounded-3xl p-6 sm:p-9 shadow-lg shadow-[#0a1f11]/5">
            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#1a5c2a]/15 text-[#1a5c2a] dark:text-[#4ade80] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#0a1f11] dark:text-white">Message Received!</h3>
                <p className="text-xs sm:text-sm text-[#3d5a42] dark:text-[#9cbba2] max-w-md mx-auto">
                  Thank you for reaching out. An admissions mentor will contact you on WhatsApp or phone within 2 business hours.
                </p>
                <div className="pt-3">
                  <a
                    href="https://wa.me/919345029705?text=Hi%20Plant%20Green%20Inertia!%20I%20just%20submitted%20an%20inquiry%20form."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-bold shadow-md hover:brightness-105"
                  >
                    Chat Instantly on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-[#0a1f11] dark:text-white">Send Us a Direct Message</h3>
                <p className="text-xs text-[#3d5a42] dark:text-[#9cbba2]">
                  Fill in your details and our team will get in touch with you shortly.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#0a1f11] dark:text-[#b8d4bd] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sanjay Kumar"
                      className="w-full h-11 px-3.5 rounded-xl bg-[#f5f8f5] dark:bg-[#07170a] border border-[#1a5c2a]/20 dark:border-[#22c55e]/25 text-[#0a1f11] dark:text-white text-sm focus:outline-none focus:border-[#1a5c2a] dark:focus:border-[#22c55e]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0a1f11] dark:text-[#b8d4bd] mb-1.5">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9345029705"
                      className="w-full h-11 px-3.5 rounded-xl bg-[#f5f8f5] dark:bg-[#07170a] border border-[#1a5c2a]/20 dark:border-[#22c55e]/25 text-[#0a1f11] dark:text-white text-sm focus:outline-none focus:border-[#1a5c2a] dark:focus:border-[#22c55e]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0a1f11] dark:text-[#b8d4bd] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@email.com"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#f5f8f5] dark:bg-[#07170a] border border-[#1a5c2a]/20 dark:border-[#22c55e]/25 text-[#0a1f11] dark:text-white text-sm focus:outline-none focus:border-[#1a5c2a] dark:focus:border-[#22c55e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0a1f11] dark:text-[#b8d4bd] mb-1.5">
                    Questions / Message
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you want to know about the batch or curriculum..."
                    className="w-full p-3.5 rounded-xl bg-[#f5f8f5] dark:bg-[#07170a] border border-[#1a5c2a]/20 dark:border-[#22c55e]/25 text-[#0a1f11] dark:text-white text-sm focus:outline-none focus:border-[#1a5c2a] dark:focus:border-[#22c55e] resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 h-11 rounded-xl bg-[#1a5c2a] hover:bg-[#144720] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-md shadow-[#1a5c2a]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry</span>
                  </button>

                  {onEnrollClick && (
                    <button
                      type="button"
                      onClick={onEnrollClick}
                      className="px-6 h-11 rounded-xl bg-[#0a1f11] dark:bg-white text-white dark:text-black font-semibold text-xs sm:text-sm tracking-wide shadow-md transition-all cursor-pointer hover:opacity-90"
                    >
                      Fill Application Form &rarr;
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
