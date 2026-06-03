/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Play, ArrowRight, MousePointerClick } from "lucide-react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get percentage positions
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-frost-bg-dark pt-20 px-6"
    >
      {/* Dynamic Mouse responsive spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-100 ease-out"
        style={{
          background: `radial-gradient(circle 450px at ${mousePos.x}% ${mousePos.y}%, rgba(125, 211, 252, 0.04), transparent 80%), radial-gradient(circle 250px at ${mousePos.x}% ${mousePos.y}%, rgba(167, 139, 250, 0.03), transparent 70%)`,
        }}
      />

      {/* Static premium ambient gradient background */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-frost-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-frost-secondary/5 blur-[140px] pointer-events-none" />

      {/* Analog Grain overlay wrapper */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-repeat animate-grain" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%2523noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Hero content container */}
      <div className="max-w-[1244px] w-full mx-auto relative z-10 flex flex-col justify-center py-20">
        <div className="max-w-4xl">
          {/* Accent label */}
          <motion.div
            id="hero-label-wrap"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 w-fit"
          >
            <div className="w-2 h-2 rounded-full bg-frost-accent shadow-[0_0_8px_#7dd3fc]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-300">
              Premium Content Growth Studio
            </span>
          </motion.div>
 
          {/* Central Massive Title */}
          <h1 id="hero-main-heading" className="leading-[0.85] text-white font-heading font-black select-none text-left tracking-tighter uppercase mb-8">
            <motion.span
              className="block overflow-hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[6rem]">
                TURNING CONTENT
              </span>
            </motion.span>
            <motion.span
              className="block overflow-hidden text-transparent"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[6rem] italic font-medium" style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.85)" }}>
                INTO A
              </span>
            </motion.span>
            <motion.span
              className="block overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[6rem]">
                BUSINESS ASSET.
              </span>
            </motion.span>
          </h1>
 
          {/* Subheading text */}
          <motion.p
            id="hero-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 text-base sm:text-lg md:text-xl text-gray-400 font-sans font-normal leading-relaxed max-w-2xl"
          >
            Editing, thumbnails, content strategy, and distribution systems designed to help brands, creators, and businesses generate measurable growth from every piece of content.
          </motion.p>
 
          {/* Action Call to Action buttons */}
          <motion.div
            id="hero-cta-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-wrap gap-8 items-center"
          >
            {/* Primary Strategy Button - Sleek styling */}
            <button
              id="hero-primary-cta"
              onClick={() => onNavigate("contact")}
              className="group relative px-8 py-4 bg-white text-black font-semibold font-sans text-xs uppercase tracking-widest transition-all duration-300 hover:bg-frost-accent hover:text-black cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(125,211,252,0.4)]"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Book Strategy Call</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
 
            {/* Secondary Sleek Case Studies Button */}
            <button
              id="hero-secondary-cta"
              onClick={() => onNavigate("case-studies")}
              className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white hover:text-frost-accent transition-colors cursor-pointer"
            >
              <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-frost-accent group-hover:border-frost-accent group-hover:text-black transition-all">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transform transition-transform group-hover:rotate-45">
                  <path d="M1 1L11 11M11 11V1M11 11H1" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </span>
              <span>View Client Work</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Down arrow indicator decoration */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center flex-col cursor-pointer opacity-40 hover:opacity-100 transition-opacity duration-300"
           onClick={() => onNavigate("services")}>
        <span className="font-mono text-[9px] uppercase tracking-widest text-gray-500 mb-2">Explore Studio</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-1 h-3 bg-frost-accent rounded"
        />
      </div>
    </section>
  );
}
