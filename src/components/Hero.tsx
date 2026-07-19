import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Play, Eye, Activity, Sparkles, Check, Sliders, Layers } from "lucide-react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

type CategoryKey = "finance" | "tech" | "lifestyle";

const BACKGROUND_CLIPS = [
  { id: "clip-1", videoId: "upZ-PuIuurE" },
  { id: "clip-2", videoId: "MATzSChX8Ng" },
  { id: "clip-3", videoId: "fFCc-ZFU9Q4" },
  { id: "clip-4", videoId: "MyH7o-X5k9M" },
  { id: "clip-5", videoId: "hK8CnUTM-C8" }
];

export default function Hero({ onNavigate }: HeroProps) {
  const clipTransition = { duration: 0.85, ease: [0.16, 1, 0.3, 1] };
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("finance");
  const [clockTime, setClockTime] = useState("");

  // Keep a clean live UTC clock for the console aesthetics
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClockTime(now.toUTCString().replace("GMT", "UTC"));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const pipelines = {
    finance: {
      channel: "WealthEngine IQ",
      status: "Final Audio Mastering & Color Grading",
      progress: 90,
      metric: "14.2% Estimated CTR",
      editor: "Hasan A. (Lead)",
      deliverable: "1x YouTube Editorial, 3x Micro-Shorts"
    },
    tech: {
      channel: "SaaS Systems Framework",
      status: "Dynamic Hook & B-Roll Assembly",
      progress: 65,
      metric: "82% Targeted Retention",
      editor: "Mimoho B. (Strategy)",
      deliverable: "2x Structured Script Layouts, 1x Video Release"
    },
    lifestyle: {
      channel: "Nomad Capital Venture",
      status: "Billboard Thumbnail Placement A/B Test",
      progress: 45,
      metric: "+240K Average Impressions",
      editor: "Creative Staff",
      deliverable: "4x High-Impact Short Forms"
    }
  };

  const selectedPipe = pipelines[activeCategory];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A] pt-28 pb-16 md:py-36 px-6"
    >
      {/* Decorative full-page subtle ambient noise grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.01] pointer-events-none bg-repeat animate-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%2523noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle Premium Ambient Video Background Loops (Showcase Clips Scrolling Marquee Left-to-Right) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none opacity-[0.12] mix-blend-screen z-0 flex items-center justify-center">
        <div className="relative w-full flex flex-col gap-6 overflow-hidden py-10">
          {/* Continuous scrolling marquee track from left to right */}
          <div className="flex w-max gap-8 animate-marquee-reverse">
            {/* First Set of Video Cards */}
            {BACKGROUND_CLIPS.map((clip) => (
              <div
                key={`bg-clip-first-${clip.id}`}
                className="relative w-[320px] h-[560px] sm:w-[440px] sm:h-[770px] shrink-0 overflow-hidden rounded-3xl bg-[#121212] border border-white/5"
              >
                <iframe
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[100%] min-w-full aspect-video scale-[1.8] pointer-events-none select-none"
                  src={`https://www.youtube.com/embed/${clip.videoId}?autoplay=1&mute=1&loop=1&playlist=${clip.videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&cc_load_policy=0&hl=en&modestbranding=1&disablekb=1&fs=0`}
                  title={`Showcase Bg ${clip.id}`}
                  allow="autoplay; encrypted-media"
                  frameBorder="0"
                />
                {/* Visual vignette to soften the edges of the video blocks */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]/60" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]/60" />
              </div>
            ))}
            {/* Second Set of Video Cards for Perfect Seamless Loop */}
            {BACKGROUND_CLIPS.map((clip) => (
              <div
                key={`bg-clip-second-${clip.id}`}
                className="relative w-[320px] h-[560px] sm:w-[440px] sm:h-[770px] shrink-0 overflow-hidden rounded-3xl bg-[#121212] border border-white/5"
              >
                <iframe
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[100%] min-w-full aspect-video scale-[1.8] pointer-events-none select-none"
                  src={`https://www.youtube.com/embed/${clip.videoId}?autoplay=1&mute=1&loop=1&playlist=${clip.videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&cc_load_policy=0&hl=en&modestbranding=1&disablekb=1&fs=0`}
                  title={`Showcase Bg ${clip.id}-loop`}
                  allow="autoplay; encrypted-media"
                  frameBorder="0"
                />
                {/* Visual vignette to soften the edges of the video blocks */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]/60" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]/60" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero content container - Max width 1440px master wrapper */}
      <div className="max-w-[1440px] w-full mx-auto relative z-10 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Core Brand Messaging */}
          <div className="col-span-12 lg:col-span-7 text-left flex flex-col justify-center min-w-0 w-full">
            
            {/* Accent label with flat industrial styling (no blur, no border, no shadow) */}
            <motion.div
              id="hero-label-wrap"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#121212] w-fit"
            >
              <div className="w-2 h-2 rounded-none bg-[#CC0000]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-slate-300">
                Premium Content Growth Studio
              </span>
            </motion.div>

            {/* Central Massive Title with Clipping Mask Slide-Up Reveals */}
            <h1
              id="hero-main-heading"
              className="leading-[1.1] sm:leading-[1.0] md:leading-[0.95] text-white font-sans font-black select-none text-left tracking-tighter uppercase mb-6"
            >
              <span className="block overflow-hidden relative">
                <motion.span
                  className="block text-[clamp(1.25rem,8vw,2.5rem)] sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5.5rem] tracking-tight font-black"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={clipTransition}
                >
                  TURNING CONTENT
                  <span className="text-[#CC0000]">.</span>
                </motion.span>
              </span>
              <span className="block overflow-hidden relative">
                <motion.span
                  className="block text-[clamp(1.25rem,8vw,2.5rem)] sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5.5rem] tracking-tight font-black italic text-transparent"
                  style={{ WebkitTextStroke: "2px #CC0000" }}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ ...clipTransition, delay: 0.1 }}
                >
                  INTO A
                </motion.span>
              </span>
              <span className="block overflow-hidden relative">
                <motion.span
                  className="block text-[clamp(1.25rem,8vw,2.5rem)] sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5.5rem] tracking-tight font-black"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ ...clipTransition, delay: 0.2 }}
                >
                  BUSINESS ASSET.
                </motion.span>
              </span>
            </h1>

            {/* Minimal Sleek Line Animation */}
            <div className="relative h-[2px] w-full max-w-md bg-white/10 overflow-hidden my-8">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-[#CC0000]"
              />
            </div>

            {/* Subheading text in slate grey */}
            <motion.p
              id="hero-subtext"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[1rem] text-slate-400 font-sans font-normal leading-relaxed max-w-2xl w-full block"
            >
              Premium editing, thumbnails, and distribution <br />systems built for content growth.
            </motion.p>

            {/* Action buttons (Instant background color inversion to scarlet on hover) */}
            <motion.div
              id="hero-cta-wrap"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8"
            >
              {/* Primary Strategy Button */}
              <button
                id="hero-primary-cta"
                onClick={() => onNavigate("contact")}
                className="group relative px-8 py-4 bg-transparent text-white border border-white/40 font-black font-sans text-xs uppercase tracking-widest hover:bg-[#CC0000] hover:border-[#CC0000] hover:text-white transition-colors duration-0 cursor-pointer rounded-none"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Book Strategy Call</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-0 group-hover:translate-x-1 text-white" />
                </span>
              </button>

              {/* Secondary Sleek Case Studies Button */}
              <button
                id="hero-secondary-cta"
                onClick={() => onNavigate("case-studies")}
                className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white cursor-pointer"
              >
                <span className="w-12 h-12 rounded-none bg-white/5 flex items-center justify-center group-hover:bg-[#CC0000] transition-colors duration-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transform transition-transform duration-0 group-hover:translate-x-0.5 group-hover:translate-y-0.5 text-white"
                  >
                    <line x1="7" y1="7" x2="17" y2="17"></line>
                    <polyline points="17 7 17 17 7 17"></polyline>
                  </svg>
                </span>
                <span className="text-slate-400 group-hover:text-white transition-colors duration-0">View Client Work</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Live Interactive Operations Console (Saves screen from PC emptiness) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-5 hidden lg:flex flex-col gap-6"
          >
            <div className="bg-[#121212] border border-white/10 p-6 relative flex flex-col justify-between rounded-none">
              
              {/* Header of Console */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#CC0000] animate-pulse" />
                  <span className="font-mono text-[10px] text-white uppercase tracking-widest font-black">
                    FROST ENGINE LIVE
                  </span>
                </div>
                <div className="font-mono text-[9px] text-slate-500 uppercase font-bold">
                  {clockTime || "ACTIVE PIPELINE"}
                </div>
              </div>

              {/* Subtitle / Interactive Instructions */}
              <div className="mb-4">
                <span className="font-sans text-[11px] text-slate-400 block uppercase font-bold tracking-wider">
                  ACTIVE PARTNER WORKSPACES:
                </span>
              </div>

              {/* Category Selection Tabs (Interactive buttons) */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {(["finance", "tech", "lifestyle"] as CategoryKey[]).map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`py-2 text-center font-mono text-[9px] uppercase tracking-wider font-bold transition-colors duration-0 cursor-pointer ${
                        isActive
                          ? "bg-[#CC0000] text-white"
                          : "bg-white/5 text-slate-500 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Console Workspace Display with Slide Animations */}
              <div className="bg-[#0A0A0A] p-5 border border-white/5 relative overflow-hidden min-h-[200px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col justify-between h-full space-y-4"
                  >
                    <div>
                      {/* Brand Label */}
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-xs font-black text-white uppercase">
                          {selectedPipe.channel}
                        </span>
                        <span className="font-mono text-[9px] text-[#CC0000] uppercase font-bold">
                          {selectedPipe.metric}
                        </span>
                      </div>

                      {/* Editorial status */}
                      <p className="font-sans text-xs text-slate-400 mt-2 leading-relaxed">
                        <strong className="text-white">Active Stage:</strong> {selectedPipe.status}
                      </p>
                    </div>

                    {/* Progress Slider Bar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between font-mono text-[9px] text-slate-500">
                        <span>PRE-PRODUCTION</span>
                        <span>RELEASE READY</span>
                      </div>
                      <div className="h-[3px] bg-white/10 w-full relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedPipe.progress}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="absolute left-0 top-0 bottom-0 bg-[#CC0000]"
                        />
                      </div>
                      <div className="flex justify-between font-mono text-[9px] text-slate-500">
                        <span>ACTIVE STAGE PROGRESS</span>
                        <span className="text-[#CC0000] font-bold">{selectedPipe.progress}%</span>
                      </div>
                    </div>

                    {/* Meta info bottom */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Sliders className="w-3 h-3 text-[#CC0000]" />
                        <span className="font-mono text-[9px] text-slate-400 uppercase font-bold">
                          Assigned: {selectedPipe.editor}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] text-slate-500 uppercase">
                        Secured
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Sub-Bento Info Footer containing brief strategic values */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-[#121212] border border-white/5 p-4 flex flex-col justify-between">
                  <span className="font-mono text-[9px] text-slate-500 uppercase block font-bold">
                    SYSTEM CAPACITY
                  </span>
                  <span className="font-sans font-black text-xl text-white mt-1 block">
                    80% <span className="text-xs text-slate-500">ENGAGED</span>
                  </span>
                  <span className="font-sans text-[9px] text-slate-400 mt-1 block uppercase font-bold">
                    2 open slots left
                  </span>
                </div>

                <div className="bg-[#121212] border border-white/5 p-4 flex flex-col justify-between">
                  <span className="font-mono text-[9px] text-slate-500 uppercase block font-bold">
                    IMMEDIATE RELEASE
                  </span>
                  <span className="font-sans font-black text-xs text-[#CC0000] mt-1.5 block uppercase tracking-wide">
                    {selectedPipe.deliverable}
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Industrial indicator block */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center flex-col cursor-pointer opacity-40 hover:opacity-100 transition-opacity duration-300"
        onClick={() => onNavigate("services")}
      >
        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 mb-2 font-bold">Explore Studio</span>
        <div className="w-1.5 h-1.5 bg-[#CC0000]" />
      </div>
    </section>
  );
}
