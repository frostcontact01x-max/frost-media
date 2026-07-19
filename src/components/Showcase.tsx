import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
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

// Reusable magnetic project card with scroll parallax thumbnail scaling
function ShowcaseCard({
  item,
  isVideoPlaying,
  onPlay,
  onClose,
  isHoveredByParent,
  onMouseEnter,
  onMouseLeave
}: {
  item: ShowcaseItem;
  isVideoPlaying: boolean;
  onPlay: () => void;
  onClose: () => void;
  isHoveredByParent: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 1. Scroll Parallax setup (scale down and vertical focal shift)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const scrollScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.0, 0.94]);
  const scrollYPos = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  // 2. Hover Magnetic physics setup (tracks the cursor in strict boundary of 18px)
  const hoverX = useMotionValue(0);
  const hoverY = useMotionValue(0);
  const springX = useSpring(hoverX, { damping: 20, stiffness: 160 });
  const springY = useSpring(hoverY, { damping: 20, stiffness: 160 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    hoverX.set(x * 18);
    hoverY.set(y * 18);
  };

  const handleMouseLeaveInternal = () => {
    hoverX.set(0);
    hoverY.set(0);
    onMouseLeave();
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ 
        opacity: isHoveredByParent ? 0.35 : 1,
        y: 0 
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeaveInternal}
      data-cursor="view"
      data-cursor-text="PLAY"
      className="group relative flex flex-col overflow-hidden bg-[#121212] transition-opacity duration-300 rounded-none border-none"
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
                onClose();
              }}
              className="absolute top-3 right-3 bg-black text-white hover:bg-[#CC0000] border border-white/10 px-3 py-1.5 text-[9px] font-mono uppercase tracking-wider transition-colors duration-0 cursor-pointer z-20 flex items-center gap-1 rounded-none"
            >
              <X className="w-3 h-3" />
              <span>Close Player</span>
            </button>
          </div>
        ) : (
          <div className="w-full h-full relative overflow-hidden">
            {/* Media Image layer with parallax scroll scaling & magnetic hover pull */}
            <motion.div
              style={{
                scale: scrollScale,
                y: scrollYPos,
                x: springX,
                y_mag: springY, // framer motion allows custom key names or applying directly
              }}
              className="w-full h-full origin-center relative"
            >
              {/* Extra layer to bind custom magnetic offset directly */}
              <motion.img
                style={{
                  x: springX,
                  y: springY,
                }}
                src={item.thumbnailUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 brightness-[0.7] transition-all duration-300"
              />
            </motion.div>

            {/* Solid Dark Overlay */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />
            
            {/* Interactive Play Button in scarlet red with magnetic pull tracking */}
            <button
              onClick={onPlay}
              className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 w-full h-full cursor-pointer z-10"
              aria-label="Play project clip"
            >
              <motion.div 
                style={{
                  x: springX,
                  y: springY,
                }}
                className="w-12 h-12 bg-white/10 group-hover:bg-[#CC0000] text-white flex items-center justify-center transition-colors duration-0"
              >
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </motion.div>
            </button>
          </div>
        )}

        {/* Left overlay badge tag */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          {item.featured && (
            <span className="font-mono text-[9px] font-black text-white uppercase bg-[#CC0000] px-2.5 py-0.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-current text-white" />
              Featured Project
            </span>
          )}
          <span className="font-mono text-[9px] font-bold text-white uppercase bg-[#0A0A0A] px-2.5 py-1">
            {item.type}
          </span>
          <span className="font-mono text-[9px] uppercase bg-white/10 text-white font-bold px-2.5 py-1">
            {item.industry}
          </span>
        </div>
      </div>

      {/* Descriptions block */}
      <div className="p-8 flex-grow flex flex-col justify-between">
        <div>
          {/* Category and Type Tag list */}
          <div className="flex items-center justify-between mb-3 text-[10px]">
            <span className="font-mono font-bold uppercase tracking-widest text-[#CC0000]">
              {item.industry}
            </span>
            <span className="font-mono font-bold text-slate-500 uppercase">
              {item.type}
            </span>
          </div>

          <h4 className="font-sans font-black text-lg text-white group-hover:text-[#CC0000] transition-colors duration-0 uppercase tracking-tight mb-2">
            {item.title}
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            {item.description}
          </p>
        </div>

        <div className="pt-6 mt-6 flex justify-between items-center border-t border-white/5">
          {/* Instantaneous background color inversion button */}
          <button
            onClick={onPlay}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-white text-white font-mono text-[10px] uppercase font-bold tracking-wider hover:bg-[#CC0000] hover:border-[#CC0000] transition-colors duration-0 cursor-pointer rounded-none"
          >
            <Play className="w-3 h-3 fill-current" />
            Watch Project
          </button>

          <div className="flex items-center gap-1 bg-white/5 px-2.5 py-1 font-mono text-[8px] text-slate-400">
            <Timer className="w-3 h-3 text-[#CC0000]" />
            <span>PREMIUM EDIT</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Showcase() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  
  // Hover state to dim surrounding cards in grid
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  // Interactive Slider State (Split Thumbnail Comparison)
  const [sliderPosition, setSliderPosition] = useState<number>(65); // percentage
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    };
    updateWidth();
    const timer = setTimeout(updateWidth, 100);
    window.addEventListener("resize", updateWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateWidth);
    };
  }, [activeCategory]);

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
    <section id="showcase" className="relative py-28 md:py-36 bg-[#0A0A0A]">
      {/* Horizontal rule animation */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: false }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="h-full bg-[#CC0000]"
        />
      </div>

      {/* Oversized transparent brand mascot background accent */}
      <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-[850px] h-[850px] opacity-[0.012] text-white pointer-events-none select-none z-0">
        <Logo className="w-full h-full" watermark />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#CC0000] font-bold">03 // Showcase</span>
              <div className="h-[1px] w-8 bg-white/10" />
            </div>
            <h2 className="font-sans font-black text-4xl sm:text-5xl text-white tracking-tighter uppercase leading-[0.9]">
              OUR EDITING WORK
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl text-sm sm:text-base font-sans leading-relaxed">
              A selection of long-form and short-form projects showcasing editing, storytelling, pacing, motion design, color grading, and content packaging.
            </p>
          </div>

          {/* Interactive filter switcher - sharp flat styling */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-[#121212] rounded-none self-start max-w-full">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  setActiveCategory(filter.id);
                  setPlayingVideoId(null);
                }}
                className={`relative px-4 py-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider font-bold transition-colors duration-0 rounded-none cursor-pointer ${
                  activeCategory === filter.id ? "text-white bg-[#CC0000]" : "text-slate-400 hover:text-white"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* INTERACTIVE COMPONENT: Split Slider Thumbnail Comparison */}
        {activeCategory === "all" && (
          <div className="mb-28">
            {/* New Title & Description */}
            <div className="max-w-3xl mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1 px-2.5 bg-white/5">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#CC0000] font-bold">A/B Testing Tool</span>
                </div>
                <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">• Click & Drag Slider</span>
              </div>
              <h3 className="font-sans font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                REAL CLIENT THUMBNAIL TRANSFORMATION
              </h3>
              <p className="mt-2 text-sm text-slate-400 font-sans leading-relaxed">
                See how strategic thumbnail packaging can transform a video's first impression. Drag the slider to compare the original thumbnail against Frost Media's optimized version.
              </p>
            </div>

            <div 
              id="slider-container"
              ref={containerRef}
              data-cursor="drag"
              data-cursor-text="DRAG"
              className="relative w-full max-w-[1280px] mx-auto aspect-[16/9] overflow-hidden select-none cursor-ew-resize group bg-[#121212] rounded-2xl border border-white/10"
              onTouchMove={handleTouchMove}
              onMouseMove={handleMouseMove}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
            >
              {/* After State (The Optimized Frost version - Base layer) */}
              <div 
                className="absolute inset-0 bg-center bg-no-repeat" 
                style={{ 
                  backgroundImage: "url('https://i.ibb.co/7NZRP0xM/Desktop-Screenshot-2026-07-19-12-07-51-80.png')",
                  backgroundSize: "100% 100%"
                }}
              >
                <div className="absolute inset-0 bg-black/5" />
                
                {/* AFTER SIDE LABEL */}
                <div className="absolute bottom-6 right-6 z-10 px-4 py-2 bg-black text-white font-mono text-[0.75rem] font-bold uppercase tracking-widest rounded-none border border-white/10 select-none">
                  FROST ENGINEERED
                </div>
              </div>

              {/* Before State (The Raw Render - Clipped overlay) */}
              <div 
                className="absolute inset-y-0 left-0 overflow-hidden" 
                style={{ width: `${sliderPosition}%` }}
              >
                <div 
                  className="absolute inset-y-0 left-0 h-full bg-center bg-no-repeat" 
                  style={{ 
                    backgroundImage: "url('https://i.ibb.co/zTqQ1cMw/Desktop-Screenshot-2026-07-19-12-07-23-50.png')",
                    width: containerWidth ? `${containerWidth}px` : "100%",
                    backgroundSize: "100% 100%"
                  }}
                >
                  <div className="absolute inset-0 bg-black/20" />
                  
                  {/* BEFORE SIDE LABEL */}
                  <div className="absolute bottom-6 left-6 z-10 px-4 py-2 bg-black text-white font-mono text-[0.75rem] font-bold uppercase tracking-widest rounded-none border border-white/10 select-none">
                    RAW ASSET
                  </div>
                </div>
              </div>

              {/* Slider Split Line */}
              <div 
                className="absolute inset-y-0 w-[2px] bg-[#CC0000] z-20"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Animated Percentage Indicator Floating Pill */}
                <div className={`absolute -top-1 px-2.5 py-1 bg-[#CC0000] text-[9px] font-mono font-bold text-white -translate-x-1/2 transform transition-all duration-200 ${
                  isDragging ? "scale-110 opacity-100 top-2 -translate-y-0" : "scale-100 opacity-0 group-hover:opacity-100 top-4"
                }`}>
                  {Math.round(sliderPosition)}%
                </div>

                {/* Main Handle knob in solid scarlet red */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48px] h-[48px] bg-[#CC0000] flex items-center justify-center pointer-events-none rounded-none">
                  <Sliders className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Floating Instructions Indicator */}
              <div className="absolute top-6 left-6 z-10 pointer-events-none">
                <span className="font-mono text-[9px] text-white/90 bg-[#0A0A0A] px-3 py-1.5 uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 bg-[#CC0000] animate-ping" />
                  ← Drag comparison Slider →
                </span>
              </div>
            </div>

            {/* TRUST ELEMENTS BAR */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-4 bg-[#121212] flex flex-col justify-center">
                <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest block leading-none mb-1">PROVEN VERIFIED</span>
                <span className="font-sans font-black text-xs text-white uppercase tracking-wider">REAL CLIENT WORK</span>
              </div>
              <div className="p-4 bg-[#121212] flex flex-col justify-center">
                <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest block leading-none mb-1">AUDIENCE HOOK</span>
                <span className="font-sans font-bold text-xs text-slate-300 uppercase tracking-wider">Thumbnail Strategy</span>
              </div>
              <div className="p-4 bg-[#121212] flex flex-col justify-center">
                <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest block leading-none mb-1">GRAPHICS & CONTRAST</span>
                <span className="font-sans font-bold text-xs text-slate-300 uppercase tracking-wider">Visual Packaging</span>
              </div>
              <div className="p-4 bg-[#121212] flex flex-col justify-center col-span-1">
                <span className="font-mono text-[8px] text-[#CC0000] uppercase tracking-widest block leading-none mb-1">METRIC GROWTH</span>
                <span className="font-sans font-bold text-xs text-white uppercase tracking-wider">CTR Optimization</span>
              </div>
              <div className="p-4 bg-[#121212] flex flex-col justify-center col-span-2 sm:col-span-1">
                <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest block leading-none mb-1">FROST SYSTEM</span>
                <span className="font-sans font-bold text-xs text-slate-300 uppercase tracking-wider">Creative Direction</span>
              </div>
            </div>
          </div>
        )}

        {/* Grid display list of showcase works - strict 12-column subgrid layout where 2 items span 6 cols each */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <div key={item.id} className="md:col-span-6">
                <ShowcaseCard
                  item={item}
                  isVideoPlaying={playingVideoId === item.id}
                  onPlay={() => setPlayingVideoId(item.id)}
                  onClose={() => setPlayingVideoId(null)}
                  isHoveredByParent={hoveredItemId !== null && hoveredItemId !== item.id}
                  onMouseEnter={() => setHoveredItemId(item.id)}
                  onMouseLeave={() => setHoveredItemId(null)}
                />
              </div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
