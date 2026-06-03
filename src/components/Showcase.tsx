/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Sparkles, Timer, Sliders, X } from "lucide-react";
import Logo from "./Logo";

interface ShowcaseItem {
  id: string;
  type: "SHORT FORM" | "LONG FORM";
  title: string;
  industry: string;
  videoId: string;
  description: string;
  thumbnailUrl: string;
  featured?: boolean;
}

const ITEMS: ShowcaseItem[] = [
  // --- SHORT FORM PROJECTS ---
  {
    id: "show-short-1",
    type: "SHORT FORM",
    title: "Luxury Real Estate Tour",
    industry: "Real Estate",
    videoId: "upZ-PuIuurE",
    description: "Fast-paced real estate edit focused on luxury presentation, motion flow, and premium visual pacing.",
    thumbnailUrl: "https://img.youtube.com/vi/upZ-PuIuurE/hqdefault.jpg"
  },
  {
    id: "show-short-2",
    type: "SHORT FORM",
    title: "B2B Content Packaging",
    industry: "B2B",
    videoId: "MATzSChX8Ng",
    description: "Short-form business content optimized for engagement, retention, and audience education.",
    thumbnailUrl: "https://img.youtube.com/vi/MATzSChX8Ng/hqdefault.jpg"
  },
  {
    id: "show-short-3",
    type: "SHORT FORM",
    title: "Color Grading Breakdown",
    industry: "Creative Education",
    videoId: "YecUpyoXQPY",
    description: "Demonstration of advanced color grading techniques and visual enhancement workflows.",
    thumbnailUrl: "https://img.youtube.com/vi/YecUpyoXQPY/hqdefault.jpg"
  },
  {
    id: "show-short-4",
    type: "SHORT FORM",
    title: "Property Showcase Reel",
    industry: "Real Estate",
    videoId: "hK8CnUTM-C8",
    description: "Property marketing content focused on cinematic presentation and visual storytelling.",
    thumbnailUrl: "https://img.youtube.com/vi/hK8CnUTM-C8/hqdefault.jpg"
  },
  {
    id: "show-short-5",
    type: "SHORT FORM",
    title: "SaaS Growth Content",
    industry: "SaaS",
    videoId: "K40gbMu01dk",
    description: "Short-form SaaS content designed for clarity, retention, and product communication.",
    thumbnailUrl: "https://img.youtube.com/vi/K40gbMu01dk/hqdefault.jpg"
  },
  {
    id: "show-short-6",
    type: "SHORT FORM",
    title: "Fitness Content Edit",
    industry: "Fitness",
    videoId: "MyH7o-X5k9M",
    description: "High-energy fitness edit optimized for audience attention and content consumption.",
    thumbnailUrl: "https://img.youtube.com/vi/MyH7o-X5k9M/hqdefault.jpg"
  },

  // --- LONG FORM PROJECTS ---
  {
    id: "show-long-1",
    type: "LONG FORM",
    title: "Anime Story Explained",
    industry: "Entertainment",
    videoId: "nZObU2h3VfA",
    description: "Narrative-driven long-form edit focused on storytelling, pacing, and audience retention.",
    thumbnailUrl: "https://img.youtube.com/vi/nZObU2h3VfA/hqdefault.jpg"
  },
  {
    id: "show-long-2",
    type: "LONG FORM",
    title: "SaaS Growth Framework",
    industry: "SaaS",
    videoId: "fFCc-ZFU9Q4",
    description: "Business-focused educational content edited for clarity and viewer engagement.",
    thumbnailUrl: "https://img.youtube.com/vi/fFCc-ZFU9Q4/hqdefault.jpg",
    featured: true
  },
  {
    id: "show-long-3",
    type: "LONG FORM",
    title: "SaaS Product Education",
    industry: "SaaS",
    videoId: "p5OzPk9Ved0",
    description: "Long-form software content structured to simplify complex ideas and improve watch time.",
    thumbnailUrl: "https://img.youtube.com/vi/p5OzPk9Ved0/hqdefault.jpg"
  },
  {
    id: "show-long-4",
    type: "LONG FORM",
    title: "Business Strategy Breakdown",
    industry: "Business",
    videoId: "T9Rn-vhGBPY",
    description: "Educational business content combining clean editing, pacing, and information delivery.",
    thumbnailUrl: "https://img.youtube.com/vi/T9Rn-vhGBPY/hqdefault.jpg"
  }
];

const FILTERS = [
  { id: "all", label: "ALL WORK" },
  { id: "short", label: "SHORT FORM" },
  { id: "long", label: "LONG FORM" },
  { id: "real-estate", label: "REAL ESTATE" },
  { id: "saas", label: "SAAS" },
  { id: "business", label: "BUSINESS" },
  { id: "fitness", label: "FITNESS" },
  { id: "creative", label: "CREATIVE" }
];

export default function Showcase() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  
  // Interactive Slider State (Split Thumbnail Comparison)
  const [sliderPosition, setSliderPosition] = useState<number>(65); // percentage
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderMove = (clientX: number, containerRect: DOMRect) => {
    const x = clientX - containerRect.left;
    const percentage = Math.max(0, Math.min(100, (x / containerRect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const container = e.currentTarget.getBoundingClientRect();
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX, container);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 || isDragging) {
      const container = e.currentTarget.getBoundingClientRect();
      handleSliderMove(e.clientX, container);
    }
  };

  const filteredItems = ITEMS.filter(item => {
    if (activeCategory === "all") return true;
    if (activeCategory === "short") return item.type === "SHORT FORM";
    if (activeCategory === "long") return item.type === "LONG FORM";
    
    // Normalize and filter industries
    const ind = item.industry.toLowerCase();
    if (activeCategory === "real-estate") return ind.includes("real estate");
    if (activeCategory === "saas") return ind.includes("saas");
    if (activeCategory === "business") return ind.includes("business") || ind.includes("b2b");
    if (activeCategory === "fitness") return ind.includes("fitness");
    if (activeCategory === "creative") return ind.includes("creative") || ind.includes("entertainment");
    
    return true;
  });

  return (
    <section id="showcase" className="relative py-24 md:py-32 bg-[#080808] border-t border-white/5">
      {/* Oversized transparent brand mascot background accent */}
      <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-[850px] h-[850px] opacity-[0.012] text-white pointer-events-none select-none z-0">
        <Logo className="w-full h-full" watermark />
      </div>

      {/* Decorative Blur Spheres */}
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-frost-accent/2 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[450px] h-[450px] rounded-full bg-frost-secondary/2 blur-[130px] pointer-events-none" />

      <div className="max-w-[1244px] mx-auto px-6 md:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-frost-accent font-semibold">03 // Showcase</span>
              <div className="h-[1px] w-8 bg-frost-accent/20" />
            </div>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-white tracking-tighter uppercase leading-[0.9]">
              OUR EDITING WORK
            </h2>
            <p className="mt-4 text-gray-400 max-w-xl text-sm sm:text-base font-sans leading-relaxed">
              A selection of long-form and short-form projects showcasing editing, storytelling, pacing, motion design, color grading, and content packaging.
            </p>
          </div>

          {/* Interactive filter switcher */}
          <div className="flex flex-wrap gap-1.5 p-1 border border-white/5 bg-white/2 rounded-xl self-start max-w-full">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  setActiveCategory(filter.id);
                  setPlayingVideoId(null);
                }}
                className={`relative px-3.5 py-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold transition-all duration-300 rounded-lg cursor-pointer ${
                  activeCategory === filter.id ? "text-black bg-white font-black" : "text-gray-400 hover:text-white"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* INTERACTIVE COMPONENT: Split Slider Thumbnail Comparison */}
        {activeCategory === "all" && (
          <div className="mb-20">
            {/* New Title & Description */}
            <div className="max-w-3xl mb-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1 px-2.5 rounded bg-frost-accent/10 border border-frost-accent/20">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#7dd3fc] font-bold">A/B Testing Tool</span>
                </div>
                <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">• Click & Drag Slider</span>
              </div>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                REAL CLIENT THUMBNAIL TRANSFORMATION
              </h3>
              <p className="mt-2 text-sm text-gray-400 font-sans leading-relaxed">
                See how strategic thumbnail packaging can transform a video's first impression. Drag the slider to compare the original thumbnail against Frost Media's optimized version.
              </p>
            </div>

            <div 
              id="slider-container"
              className="relative w-full h-[380px] sm:h-[480px] rounded-2xl overflow-hidden border border-white/10 select-none cursor-ew-resize group shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              onTouchMove={handleTouchMove}
              onMouseMove={handleMouseMove}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
            >
              {/* After State (The Optimized Frost version - Base layer) */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
                style={{ backgroundImage: "url('https://www.image2url.com/r2/default/images/1780468919156-3fcc8717-572d-4d2e-b1ed-47ea34302fad.jpg')" }}
              >
                <div className="absolute inset-0 bg-black/5" />
                
                {/* AFTER SIDE LABEL */}
                <div className="absolute bottom-6 right-6 z-10 p-4 sm:p-5 bg-black/90 backdrop-blur-md border border-frost-accent/30 rounded-xl max-w-[260px] sm:max-w-[320px] shadow-2xl transition-transform duration-300 group-hover:scale-102">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[9px] uppercase text-black font-black tracking-widest bg-frost-accent px-2 py-0.5 rounded shadow-[0_0_8px_#7dd3fc]">
                      AFTER
                    </span>
                    <span className="font-mono text-[9px] text-emerald-400 font-bold uppercase tracking-wider">
                      OPTIMIZED
                    </span>
                  </div>
                  <h4 className="font-heading text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
                    Frost Media Optimization
                  </h4>
                  <p className="font-sans text-[10px] sm:text-xs text-gray-400 mt-1.5 leading-relaxed">
                    Improved visual hierarchy, stronger attention capture, and clearer viewer intent.
                  </p>
                </div>
              </div>

              {/* Before State (The Raw Render - Clipped overlay) */}
              <div 
                className="absolute inset-y-0 left-0 overflow-hidden" 
                style={{ width: `${sliderPosition}%` }}
              >
                <div 
                  className="absolute inset-y-0 left-0 h-full bg-cover bg-center bg-no-repeat" 
                  style={{ 
                    backgroundImage: "url('https://www.image2url.com/r2/default/images/1780468890548-6bd1ba7d-a18e-4dac-a840-a80280795056.jpg')",
                    width: "100vw",
                    maxWidth: "1244px"
                  }}
                >
                  <div className="absolute inset-0 bg-black/20" />
                  
                  {/* BEFORE SIDE LABEL */}
                  <div className="absolute bottom-6 left-6 z-10 p-4 sm:p-5 bg-black/90 backdrop-blur-md border border-white/5 rounded-xl max-w-[260px] sm:max-w-[320px] shadow-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[9px] uppercase text-gray-300 font-bold tracking-widest bg-white/10 px-2 py-0.5 rounded border border-white/10">
                        BEFORE
                      </span>
                      <span className="font-mono text-[9px] text-rose-400 font-bold uppercase tracking-wider">
                        ORIGINAL
                      </span>
                    </div>
                    <h4 className="font-heading text-xs sm:text-sm font-bold text-white/90 uppercase tracking-tight">
                      Original Client Thumbnail
                    </h4>
                    <p className="font-sans text-[10px] sm:text-xs text-gray-400 mt-1.5 leading-relaxed">
                      Limited visual hierarchy, weaker curiosity triggers, and lower click appeal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Slider Split Line */}
              <div 
                className={`absolute inset-y-0 w-[2px] transition-colors z-20 ${
                  isDragging ? "bg-frost-accent" : "bg-white/80 group-hover:bg-frost-accent"
                }`}
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Subtle vertical glow container */}
                <div className={`absolute inset-y-0 -left-1 w-3 bg-frost-accent/10 blur-[3px] pointer-events-none transition-opacity duration-300 ${
                  isDragging ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                }`} />

                {/* Animated Percentage Indicator Floating Pill */}
                <div className={`absolute -top-1 px-2 py-0.5 rounded bg-black/90 border border-frost-accent/30 text-[9px] font-mono font-bold text-white -translate-x-1/2 transform transition-all duration-200 shadow-lg ${
                  isDragging ? "scale-110 opacity-100 top-2 -translate-y-0" : "scale-100 opacity-0 group-hover:opacity-100 top-4"
                }`}>
                  {Math.round(sliderPosition)}%
                </div>

                {/* Main Handle knob */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-black border rounded-full flex items-center justify-center pointer-events-none transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.8)] ${
                  isDragging 
                    ? "border-frost-accent scale-110 ring-4 ring-frost-accent/20 bg-frost-accent/10 shadow-[0_0_20px_#7dd3fc]" 
                    : "border-white/50 group-hover:border-frost-accent group-hover:scale-105"
                }`}>
                  <Sliders className={`w-4 h-4 transition-colors duration-350 ${
                    isDragging ? "text-frost-accent animate-pulse" : "text-white group-hover:text-frost-accent"
                  }`} />
                </div>
              </div>

              {/* Floating Instructions Indicator */}
              <div className="absolute top-6 left-6 z-10 pointer-events-none">
                <span className="font-mono text-[9px] text-white/90 bg-black/80 px-3 py-1.5 rounded-lg border border-white/10 uppercase tracking-widest backdrop-blur-sm font-semibold flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-frost-accent animate-ping" />
                  ← Drag comparison Slider →
                </span>
              </div>
            </div>

            {/* TRUST ELEMENTS BAR */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-3 bg-white/2 rounded-xl border border-white/5 flex flex-col justify-center">
                <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block leading-none mb-1">PROVEN VERIFIED</span>
                <span className="font-heading font-black text-xs text-white uppercase tracking-wider">REAL CLIENT WORK</span>
              </div>
              <div className="p-3 bg-white/2 rounded-xl border border-white/5 flex flex-col justify-center">
                <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block leading-none mb-1">AUDIENCE HOOK</span>
                <span className="font-heading font-bold text-xs text-gray-300 uppercase tracking-wider">Thumbnail Strategy</span>
              </div>
              <div className="p-3 bg-white/2 rounded-xl border border-white/5 flex flex-col justify-center">
                <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block leading-none mb-1">GRAPHICS & CONTRAST</span>
                <span className="font-heading font-bold text-xs text-gray-300 uppercase tracking-wider">Visual Packaging</span>
              </div>
              <div className="p-3 bg-white/2 rounded-xl border border-white/5 flex flex-col justify-center col-span-1">
                <span className="font-mono text-[8px] text-[#7dd3fc] uppercase tracking-widest block leading-none mb-1">METRIC GROWTH</span>
                <span className="font-heading font-bold text-xs text-white uppercase tracking-wider">CTR Optimization</span>
              </div>
              <div className="p-3 bg-white/2 rounded-xl border border-white/5 flex flex-col justify-center col-span-2 sm:col-span-1">
                <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block leading-none mb-1">FROST SYSTEM</span>
                <span className="font-heading font-bold text-xs text-gray-300 uppercase tracking-wider">Creative Direction</span>
              </div>
            </div>
          </div>
        )}

        {/* Grid display list of showcase works */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const isVideoPlaying = playingVideoId === item.id;
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  key={item.id}
                  className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${
                    item.featured
                      ? "border border-frost-accent/40 bg-gradient-to-b from-[#121c24]/80 to-[#111111]/90 ring-1 ring-frost-accent/20 hover:border-frost-accent/60 hover:shadow-[0_0_40px_rgba(125,211,252,0.06)]"
                      : "border border-white/5 bg-[#111111] hover:border-frost-accent/20 hover:bg-[#131313] hover:shadow-[0_0_35px_rgba(125,211,252,0.02)]"
                  }`}
                >
                  
                  {/* Aspect Media Area */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black flex items-center justify-center">
                    
                    {isVideoPlaying ? (
                       /* Active Responsive Iframe Video Player */
                      <div className="absolute inset-0 w-full h-full z-15 bg-black">
                        <iframe
                          src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&mute=0&rel=0`}
                          title={item.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPlayingVideoId(null);
                          }}
                          className="absolute top-3 right-3 bg-black/90 hover:bg-black text-white hover:text-frost-accent border border-white/10 px-3 py-1.5 rounded-lg text-[9px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer z-20 flex items-center gap-1 shadow-lg"
                        >
                          <X className="w-3 h-3" />
                          <span>Close Player</span>
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* Media Image layer */}
                        <img
                          src={item.thumbnailUrl}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 grayscale hover:grayscale-0 filter brightness-[0.7]"
                        />
 
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 pointer-events-none" />
                        
                        {/* Interactive Play Button */}
                        <button
                          onClick={() => setPlayingVideoId(item.id)}
                          className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/35 transition-all duration-300 w-full h-full cursor-pointer z-10"
                          aria-label="Play project clip"
                        >
                          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white backdrop-blur group-hover:scale-110 group-hover:bg-frost-accent group-hover:border-frost-accent group-hover:text-black transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>
                        </button>
                      </>
                    )}
 
                    {/* Left overlay badge tag */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10 pointer-events-none">
                      {item.featured && (
                        <span className="font-mono text-[9px] font-black text-black uppercase bg-frost-accent px-2 py-0.5 rounded shadow-[0_0_10px_#7dd3fc] flex items-center gap-1">
                          <Sparkles className="w-3 h-3 fill-current animate-pulse text-black" />
                          Featured Project
                        </span>
                      )}
                      <span className="font-mono text-[9px] font-bold text-white uppercase bg-[#111111]/90 backdrop-blur px-2.5 py-1 rounded border border-white/5 shadow-md">
                        {item.type}
                      </span>
                      <span className="font-mono text-[9px] uppercase bg-frost-accent/15 backdrop-blur text-[#7dd3fc] font-bold px-2.5 py-1 rounded border border-frost-accent/20">
                        {item.industry}
                      </span>
                    </div>
 
                  </div>
 
                  {/* Descriptions block */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Category and Type Tag list */}
                      <div className="flex items-center justify-between mb-3 text-[10px]">
                        <span className="font-mono font-bold uppercase tracking-widest text-frost-accent">
                          {item.industry}
                        </span>
                        <span className="font-mono font-bold text-gray-500 uppercase">
                          {item.type}
                        </span>
                      </div>

                      <h4 className="font-heading font-black text-base sm:text-lg text-white group-hover:text-frost-accent transition-colors duration-300 uppercase tracking-tight mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>

                    <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center">
                      <button
                        onClick={() => setPlayingVideoId(item.id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-frost-accent hover:bg-frost-accent hover:text-black font-mono text-[9px] uppercase font-bold tracking-wider transition-all duration-300 cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        Watch Project
                      </button>

                      <div className="flex items-center gap-1 bg-white/2 border border-white/5 px-2 py-0.5 rounded font-mono text-[8px] text-gray-500">
                        <Timer className="w-3 h-3 text-frost-accent" />
                        <span>PREMIUM EDIT</span>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
