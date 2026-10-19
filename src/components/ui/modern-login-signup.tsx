"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, Copy, ExternalLink, ShieldCheck, Upload, Sparkles, User, Lock, Mail } from "lucide-react";

export interface ModernEnrollmentProps {
  onBack?: () => void;
  defaultMode?: "Online" | "Offline";
  initialView?: "apply" | "login";
}

export default function ModernLoginSignup({
  onBack,
  defaultMode = "Online",
  initialView = "apply",
}: ModernEnrollmentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // View Mode: Application vs Sign In / Login
  const [viewMode, setViewMode] = useState<"apply" | "login">(initialView);

  // Form State for Application
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [learningMode, setLearningMode] = useState<"Online" | "Offline">(defaultMode);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [screenshotName, setScreenshotName] = useState("");
  const [applicationId, setApplicationId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    college: "",
    degree: "Undergraduate (UG)",
    status: "Pursuing",
    utr: "",
  });

  // Login Form State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoginSubmitted, setIsLoginSubmitted] = useState(false);

  const price = learningMode === "Online" ? "₹4,999" : "₹14,999";
  const numPrice = learningMode === "Online" ? "4999" : "14999";

  // Three.js Dynamic WebGL Dot Grid Shader (Theme Matched: Plant Green Inertia)
  useEffect(() => {
    let active = true;
    let renderer: any = null;
    let geometry: any = null;
    let material: any = null;
    let scene: any = null;
    let camera: any = null;
    let animationId: number;

    const initThree = (THREE: any) => {
      if (!canvasRef.current || !active) return;
      const canvas = canvasRef.current;
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      // Green & Emerald Theme Palette for WebGL Dots
      const uniforms = {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth * 2, window.innerHeight * 2) },
        u_opacities: { value: [0.2, 0.25, 0.3, 0.45, 0.5, 0.6, 0.75, 0.8, 0.9, 1.0] },
        u_colors: {
          value: [
            new THREE.Vector3(0.08, 0.42, 0.18), // Deep Forest
            new THREE.Vector3(0.14, 0.65, 0.28), // Emerald Green
            new THREE.Vector3(0.22, 0.82, 0.42), // Mint Green
            new THREE.Vector3(0.05, 0.28, 0.12), // Dark Pine
            new THREE.Vector3(0.85, 0.95, 0.88), // Light Sage
            new THREE.Vector3(0.16, 0.52, 0.24), // Mid Foliage
          ],
        },
        u_total_size: { value: 24.0 },
        u_dot_size: { value: 5.5 },
        u_reverse: { value: 0 },
      };

      material = new THREE.ShaderMaterial({
        vertexShader: `
          precision mediump float;
          uniform vec2 u_resolution;
          out vec2 fragCoord;
          void main() {
            gl_Position = vec4(position, 1.0);
            fragCoord = (position.xy + 1.0) * 0.5 * u_resolution;
            fragCoord.y = u_resolution.y - fragCoord.y;
          }
        `,
        fragmentShader: `
          precision mediump float;
          in vec2 fragCoord;

          uniform float u_time;
          uniform float u_opacities[10];
          uniform vec3 u_colors[6];
          uniform float u_total_size;
          uniform float u_dot_size;
          uniform vec2 u_resolution;
          uniform int u_reverse;

          out vec4 fragColor;

          float PHI = 1.61803398874989484820459;
          float random(vec2 xy) {
              return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
          }

          void main() {
              vec2 st = fragCoord.xy;
              st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));
              st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));

              float opacity = step(0.0, st.x) * step(0.0, st.y);
              vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));

              float frequency = 4.5;
              float show_offset = random(st2);
              float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency));
              opacity *= u_opacities[int(rand * 10.0)];
              opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
              opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

              vec3 color = u_colors[int(show_offset * 6.0)];

              float animation_speed_factor = 2.8;
              vec2 center_grid = u_resolution / 2.0 / u_total_size;
              float dist_from_center = distance(center_grid, st2);

              float timing_offset_intro = dist_from_center * 0.01 + (random(st2) * 0.15);
              float current_timing_offset = timing_offset_intro;
              opacity *= step(current_timing_offset, u_time * animation_speed_factor);
              opacity *= clamp((1.0 - step(current_timing_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);

              fragColor = vec4(color, opacity);
              fragColor.rgb *= fragColor.a;
          }
        `,
        uniforms,
        glslVersion: THREE.GLSL3,
        blending: THREE.CustomBlending,
        blendSrc: THREE.SrcAlphaFactor,
        blendDst: THREE.OneFactor,
        transparent: true,
      });

      geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const startTime = performance.now();
      const animate = () => {
        if (!active) return;
        animationId = requestAnimationFrame(animate);
        uniforms.u_time.value = (performance.now() - startTime) / 1000.0;
        if (renderer && scene && camera) {
          renderer.render(scene, camera);
        }
      };
      animate();

      const handleResize = () => {
        if (!renderer) return;
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.u_resolution.value.set(window.innerWidth * 2, window.innerHeight * 2);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    };

    if ((window as any).THREE) {
      const cleanUp = initThree((window as any).THREE);
      return () => {
        active = false;
        if (cleanUp) cleanUp();
        if (animationId) cancelAnimationFrame(animationId);
        if (renderer) renderer.dispose();
        if (geometry) geometry.dispose();
        if (material) material.dispose();
      };
    } else {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      script.async = true;
      script.onload = () => {
        if ((window as any).THREE && active) {
          initThree((window as any).THREE);
        }
      };
      document.head.appendChild(script);
    }

    return () => {
      active = false;
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) renderer.dispose();
      if (geometry) geometry.dispose();
      if (material) material.dispose();
    };
  }, []);

  const handleCopy = (text: string, type: "upi" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "upi") {
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `PGI-DM-${Math.floor(10000 + Math.random() * 90000)}`;
    setApplicationId(newId);
    setStep(4);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginSubmitted(true);
  };

  const handleBackToOverview = () => {
    if (onBack) {
      onBack();
    } else {
      if (window.location.pathname.startsWith('/form')) {
        window.history.pushState(null, '', '/');
      }
      window.location.hash = "#apply";
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-y-auto overflow-x-hidden bg-[#071309] text-[#f4f7f4] font-sans py-12 px-4 sm:px-6">
      {/* WebGL Animated Dot Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-45" />

      {/* Vignette Overlay */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(7,19,9,0.5)_0%,rgba(7,19,9,0.92)_100%)] pointer-events-none" />

      {/* Floating Top Back Button */}
      <button
        onClick={handleBackToOverview}
        type="button"
        className="fixed top-5 left-5 sm:left-8 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d2613]/90 hover:bg-[#143d1f] border border-[#22c55e]/30 text-white text-xs font-semibold backdrop-blur-md transition-all shadow-lg hover:-translate-x-0.5 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Course</span>
      </button>

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-xl bg-[#0b1d11]/95 border border-[#22c55e]/25 rounded-3xl p-6 sm:p-9 shadow-2xl shadow-black/80 backdrop-blur-xl transition-all my-auto">
        {/* Top View Mode Switcher: Application vs Login */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex p-1 rounded-full bg-[#07170a] border border-[#22c55e]/25">
            <button
              type="button"
              onClick={() => setViewMode("apply")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewMode === "apply"
                  ? "bg-[#22c55e] text-black shadow-md shadow-[#22c55e]/20"
                  : "text-[#8cb494] hover:text-white"
              }`}
            >
              Course Admission Application
            </button>
            <button
              type="button"
              onClick={() => setViewMode("login")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewMode === "login"
                  ? "bg-[#22c55e] text-black shadow-md shadow-[#22c55e]/20"
                  : "text-[#8cb494] hover:text-white"
              }`}
            >
              Candidate Sign In
            </button>
          </div>
        </div>

        {/* =========================================================================
            VIEW 1: CANDIDATE SIGN IN / LOGIN
           ========================================================================= */}
        {viewMode === "login" ? (
          <div className="space-y-5">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#163e20] border border-[#22c55e]/40 flex items-center justify-center mx-auto mb-3 text-[#4ade80] font-black text-lg">
                PGI
              </div>
              <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
                Sign in to <span className="text-[#4ade80]">Student Portal</span>
              </h2>
              <p className="text-xs text-[#9cbba2] mt-1">
                Access your cohort syllabus, live labs, and certification ledger.
              </p>
            </div>

            {isLoginSubmitted ? (
              <div className="text-center py-6 space-y-3 bg-[#07170a] rounded-2xl border border-[#22c55e]/30 p-5">
                <div className="w-10 h-10 rounded-full bg-[#22c55e]/20 text-[#22c55e] flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">Check Your Email</h4>
                <p className="text-xs text-[#9cbba2]">
                  We sent a secure magic sign-in link to <strong>{loginEmail || "your email"}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setIsLoginSubmitted(false)}
                  className="text-xs text-[#4ade80] underline pt-2 cursor-pointer"
                >
                  Use a different email
                </button>
              </div>
            ) : (
              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#b8d4bd] mb-1.5">
                    Registered Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#07170a] border border-[#22c55e]/20 text-white placeholder-[#537359] text-sm focus:outline-none focus:border-[#22c55e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#b8d4bd] mb-1.5">
                    Password / Access Key
                  </label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password or leave blank for magic link"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#07170a] border border-[#22c55e]/20 text-white placeholder-[#537359] text-sm focus:outline-none focus:border-[#22c55e]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-sm tracking-wide transition-all shadow-md shadow-[#22c55e]/20 cursor-pointer"
                >
                  Continue with Email &rarr;
                </button>

                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-[11px] text-[#719678] uppercase font-bold tracking-wider">or sign in with</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => alert("Google Single Sign-On for Plant Green Inertia is connecting...")}
                    className="h-10 rounded-xl bg-[#07170a] hover:bg-[#122e18] border border-white/15 text-xs text-white font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>

                  <button
                    type="button"
                    onClick={() => alert("GitHub Single Sign-On for Plant Green Inertia is connecting...")}
                    className="h-10 rounded-xl bg-[#07170a] hover:bg-[#122e18] border border-white/15 text-xs text-white font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                    GitHub
                  </button>
                </div>

                <div className="text-center pt-3 text-xs text-[#9cbba2]">
                  Don't have an enrollment yet?{" "}
                  <button
                    type="button"
                    onClick={() => setViewMode("apply")}
                    className="text-[#4ade80] font-bold hover:underline cursor-pointer"
                  >
                    Apply for Admission &rarr;
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* =========================================================================
              VIEW 2: COURSE ADMISSION APPLICATION (3 STEPS)
             ========================================================================= */
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#163e20] border border-[#22c55e]/40 text-[#4ade80] text-[11px] font-bold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4ade80]" />
                Official Training Partner · TN Skills, TNSDC
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Course Admission <span className="text-[#4ade80]">Application</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#9cbba2] mt-1.5">
                Complete 3 simple steps to secure your batch credentials.
              </p>
            </div>

            {step !== 4 && (
              /* Stepper Bar */
              <div className="flex items-center justify-between mb-8 px-2 sm:px-4">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === 1
                        ? "bg-[#22c55e] text-black shadow-lg shadow-[#22c55e]/40"
                        : step > 1
                        ? "bg-[#144720] text-[#4ade80] border border-[#22c55e]/50"
                        : "bg-[#142819] text-[#719678] border border-white/10"
                    }`}
                  >
                    {step > 1 ? <Check className="w-3.5 h-3.5" /> : 1}
                  </div>
                  <span className={`text-[11px] font-semibold ${step === 1 ? "text-[#4ade80]" : "text-[#719678]"}`}>
                    Personal
                  </span>
                </div>

                <div className={`flex-1 h-0.5 mx-2.5 transition-all ${step > 1 ? "bg-[#22c55e]" : "bg-white/10"}`} />

                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === 2
                        ? "bg-[#22c55e] text-black shadow-lg shadow-[#22c55e]/40"
                        : step > 2
                        ? "bg-[#144720] text-[#4ade80] border border-[#22c55e]/50"
                        : "bg-[#142819] text-[#719678] border border-white/10"
                    }`}
                  >
                    {step > 2 ? <Check className="w-3.5 h-3.5" /> : 2}
                  </div>
                  <span className={`text-[11px] font-semibold ${step === 2 ? "text-[#4ade80]" : "text-[#719678]"}`}>
                    Course
                  </span>
                </div>

                <div className={`flex-1 h-0.5 mx-2.5 transition-all ${step > 2 ? "bg-[#22c55e]" : "bg-white/10"}`} />

                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === 3
                        ? "bg-[#22c55e] text-black shadow-lg shadow-[#22c55e]/40"
                        : "bg-[#142819] text-[#719678] border border-white/10"
                    }`}
                  >
                    3
                  </div>
                  <span className={`text-[11px] font-semibold ${step === 3 ? "text-[#4ade80]" : "text-[#719678]"}`}>
                    Payment
                  </span>
                </div>
              </div>
            )}

            {/* STEP 1: Personal Details */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#b8d4bd] mb-1.5">
                    Full Student Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#07170a] border border-[#22c55e]/20 text-white placeholder-[#537359] text-sm focus:outline-none focus:border-[#22c55e]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#b8d4bd] mb-1.5">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full h-11 px-3.5 rounded-xl bg-[#07170a] border border-[#22c55e]/20 text-white placeholder-[#537359] text-sm focus:outline-none focus:border-[#22c55e]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#b8d4bd] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@email.com"
                      className="w-full h-11 px-3.5 rounded-xl bg-[#07170a] border border-[#22c55e]/20 text-white placeholder-[#537359] text-sm focus:outline-none focus:border-[#22c55e]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#b8d4bd] mb-1.5">
                    City / Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Chennai, Tamil Nadu"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#07170a] border border-[#22c55e]/20 text-white placeholder-[#537359] text-sm focus:outline-none focus:border-[#22c55e]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!formData.name || !formData.phone || !formData.email) {
                        alert("Please fill in your Name, WhatsApp Number, and Email.");
                        return;
                      }
                      setStep(2);
                    }}
                    className="w-full h-11 rounded-xl bg-[#1a5c2a] hover:bg-[#154d23] text-white font-semibold text-sm tracking-wide transition-all shadow-md shadow-[#1a5c2a]/30 cursor-pointer flex items-center justify-center gap-2"
                  >
                    Next: Course Details &rarr;
                  </button>
                </div>

                <div className="text-center pt-2 text-xs text-[#9cbba2]">
                  Already enrolled?{" "}
                  <button
                    type="button"
                    onClick={() => setViewMode("login")}
                    className="text-[#4ade80] font-bold hover:underline cursor-pointer"
                  >
                    Sign In to Portal &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Course Details */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#b8d4bd] mb-2">
                    Select Learning Format *
                  </label>
                  <div className="grid grid-cols-2 gap-3 bg-[#07170a] p-1.5 rounded-2xl border border-[#22c55e]/20">
                    <button
                      type="button"
                      onClick={() => setLearningMode("Online")}
                      className={`py-3 px-3 rounded-xl flex flex-col items-center transition-all cursor-pointer ${
                        learningMode === "Online"
                          ? "bg-[#163e20] border border-[#22c55e]/50 text-white shadow-md shadow-[#22c55e]/15"
                          : "text-[#8cb494] hover:text-white"
                      }`}
                    >
                      <span className="text-base font-bold text-[#4ade80]">₹4,999</span>
                      <span className="text-[11px] font-medium opacity-90">Online Batch (50% Off)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLearningMode("Offline")}
                      className={`py-3 px-3 rounded-xl flex flex-col items-center transition-all cursor-pointer ${
                        learningMode === "Offline"
                          ? "bg-[#163e20] border border-[#22c55e]/50 text-white shadow-md shadow-[#22c55e]/15"
                          : "text-[#8cb494] hover:text-white"
                      }`}
                    >
                      <span className="text-base font-bold text-[#4ade80]">₹14,999</span>
                      <span className="text-[11px] font-medium opacity-90">Offline Classroom (70% Off)</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#b8d4bd] mb-1.5">
                    College / University Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    placeholder="Enter college or company name"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#07170a] border border-[#22c55e]/20 text-white placeholder-[#537359] text-sm focus:outline-none focus:border-[#22c55e]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#b8d4bd] mb-1.5">
                      Highest Degree *
                    </label>
                    <select
                      value={formData.degree}
                      onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl bg-[#07170a] border border-[#22c55e]/20 text-white text-sm focus:outline-none focus:border-[#22c55e]"
                    >
                      <option value="Undergraduate (UG)" className="bg-[#0b1d11]">Undergraduate (UG)</option>
                      <option value="Postgraduate (PG)" className="bg-[#0b1d11]">Postgraduate (PG)</option>
                      <option value="Diploma / HSC" className="bg-[#0b1d11]">Diploma / HSC</option>
                      <option value="Working Professional" className="bg-[#0b1d11]">Working Professional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#b8d4bd] mb-1.5">
                      Academic Status *
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl bg-[#07170a] border border-[#22c55e]/20 text-white text-sm focus:outline-none focus:border-[#22c55e]"
                    >
                      <option value="Pursuing" className="bg-[#0b1d11]">Pursuing</option>
                      <option value="Completed" className="bg-[#0b1d11]">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 h-11 rounded-xl bg-[#07170a] hover:bg-[#122e18] border border-white/15 text-[#b8d4bd] font-semibold text-xs tracking-wide transition-all cursor-pointer"
                  >
                    &larr; Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-2/3 h-11 rounded-xl bg-[#1a5c2a] hover:bg-[#154d23] text-white font-semibold text-sm tracking-wide transition-all shadow-md shadow-[#1a5c2a]/30 cursor-pointer flex items-center justify-center gap-2"
                  >
                    Next: Payment &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment Verification & Confirmation */}
            {step === 3 && (
              <form onSubmit={handleAppSubmit} className="space-y-4">
                {/* Direct GPay Button */}
                <a
                  href={`upi://pay?pa=lokeshlaven-2@okicici&pn=Laven%20Lokesh%20Barani&am=${numPrice}&cu=INR&tn=Plant%20Green%20Course%20Fee`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-[#0f2416] border border-[#22c55e]/40 hover:border-[#22c55e] transition-all group cursor-pointer shadow-md shadow-black/40"
                >
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z"/>
                      <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.13z"/>
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z"/>
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      Open in Google Pay (GPay)
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#22c55e] text-black font-extrabold uppercase">Direct UPI</span>
                    </div>
                    <div className="text-[11px] text-[#9cbba2]">Pay {price} directly via UPI app &rarr;</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#4ade80] group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* UPI Details Box */}
                <div className="bg-[#07170a] border border-[#22c55e]/20 rounded-2xl p-3.5 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#4ade80] font-bold">UPI / GPay Payment</span>
                    <span className="text-white font-bold">{price}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#9cbba2]">
                    <span>UPI ID: <strong className="text-white">lokeshlaven-2@okicici</strong></span>
                    <button
                      type="button"
                      onClick={() => handleCopy("lokeshlaven-2@okicici", "upi")}
                      className="px-2 py-0.5 rounded bg-[#163e20] border border-[#22c55e]/40 text-[#4ade80] text-[10px] font-bold hover:bg-[#1f592d] cursor-pointer flex items-center gap-1"
                    >
                      <Copy className="w-2.5 h-2.5" />
                      {copiedUpi ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="flex justify-between items-center text-[#9cbba2]">
                    <span>GPay / PhonePe: <strong className="text-white">8220699083</strong></span>
                    <button
                      type="button"
                      onClick={() => handleCopy("8220699083", "phone")}
                      className="px-2 py-0.5 rounded bg-[#163e20] border border-[#22c55e]/40 text-[#4ade80] text-[10px] font-bold hover:bg-[#1f592d] cursor-pointer flex items-center gap-1"
                    >
                      <Copy className="w-2.5 h-2.5" />
                      {copiedPhone ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="text-[10px] text-[#719678]">
                    Recipient: Mr. Laven Lokesh Barani
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#b8d4bd] mb-1.5">
                    12-Digit UPI / UTR Ref Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.utr}
                    onChange={(e) => setFormData({ ...formData, utr: e.target.value })}
                    placeholder="Enter 12-digit UTR from payment receipt"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#07170a] border border-[#22c55e]/20 text-white placeholder-[#537359] text-sm focus:outline-none focus:border-[#22c55e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#b8d4bd] mb-1.5">
                    Payment Proof Screenshot (Optional)
                  </label>
                  <label className="w-full h-11 rounded-xl border border-dashed border-[#22c55e]/40 hover:border-[#22c55e] bg-[#07170a] flex items-center justify-center gap-2 text-xs text-[#9cbba2] hover:text-white cursor-pointer transition-all">
                    <Upload className="w-3.5 h-3.5 text-[#4ade80]" />
                    <span className="truncate max-w-[280px]">
                      {screenshotName || "Attach payment screenshot file"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setScreenshotName(e.target.files[0].name);
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-1/3 h-11 rounded-xl bg-[#07170a] hover:bg-[#122e18] border border-white/15 text-[#b8d4bd] font-semibold text-xs tracking-wide transition-all cursor-pointer"
                  >
                    &larr; Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 h-11 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#22c55e]/30 cursor-pointer flex items-center justify-center gap-2"
                  >
                    Submit Application ✓
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: Success & Confirmation */}
            {step === 4 && (
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#163e20] border-2 border-[#22c55e] flex items-center justify-center mx-auto text-[#4ade80] shadow-lg shadow-[#22c55e]/25">
                  <Check className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-serif font-bold text-white">Application Submitted!</h3>
                <p className="text-xs text-[#9cbba2] max-w-sm mx-auto">
                  Your admission details have been saved in our verified admissions ledger.
                </p>

                <div className="bg-[#07170a] border border-dashed border-[#22c55e]/40 rounded-2xl p-4 text-left space-y-1">
                  <div className="text-[10px] uppercase font-bold text-[#719678] tracking-wider">
                    Application Reference ID
                  </div>
                  <div className="text-lg font-mono font-bold text-[#4ade80]">{applicationId}</div>
                  <div className="text-xs text-[#9cbba2]">
                    {learningMode} Batch · {price} · Status: Pending UTR Verification
                  </div>
                </div>

                <a
                  href={`https://wa.me/918220699083?text=Hi%20Plant%20Green%20Inertia,%20I%20have%20submitted%20my%20application%20(${applicationId})%20for%20the%20Digital%20Marketing%20Course.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm transition-all shadow-lg shadow-[#25D366]/25 cursor-pointer"
                >
                  Notify Coordinator on WhatsApp
                </a>

                <div>
                  <button
                    type="button"
                    onClick={handleBackToOverview}
                    className="text-xs text-[#9cbba2] hover:text-[#4ade80] transition-colors underline pt-2 cursor-pointer"
                  >
                    Back to Course Overview
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
