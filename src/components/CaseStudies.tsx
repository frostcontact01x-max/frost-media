import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ChevronRight, Sparkles, Layers, Video } from "lucide-react";
import { CASE_STUDIES } from "../data/portfolioData";

interface CaseStudiesProps {
  onNavigate?: (id: string) => void;
}

export default function CaseStudies({ onNavigate }: CaseStudiesProps) {
  const [activeCaseId, setActiveCaseId] = useState(CASE_STUDIES[0].id);
  const activeCase = CASE_STUDIES.find((c) => c.id === activeCaseId) || CASE_STUDIES[0];

  return (
    <section id="case-studies" className="relative py-28 md:py-36 bg-[#0A0A0A]">
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

      {/* Decorative full-page analog noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.01] pointer-events-none bg-repeat animate-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%2523noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-24">
          <div className="flex items-center space-x-2 mb-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#CC0000] font-bold">02 // Authentic Outcomes</span>
            <div className="h-[1px] w-8 bg-white/10" />
          </div>
          <h2 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter leading-none uppercase">
            REAL CLIENT WORK & CASE STUDIES.
          </h2>
          <p className="mt-4 text-slate-400 font-sans text-sm sm:text-base max-w-xl leading-relaxed">
            Detailed breakdowns of actual channel strategy, video editing, scripts, and production support provided directly to our active publishers.
          </p>
        </div>

        {/* Tab Selection Row - sharp industrial grids */}
        <div id="case-tabs-row" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-8 mb-16 border-b border-white/10">
          {CASE_STUDIES.map((study) => {
            const isActive = study.id === activeCaseId;
            const isMeher = study.clientName === "Meher Shaikh";
            return (
              <button
                key={study.id}
                id={`case-tab-btn-${study.id}`}
                onClick={() => setActiveCaseId(study.id)}
                className={`relative p-5 text-left transition-colors duration-0 cursor-pointer group flex items-center gap-4 rounded-none border-none ${
                  isActive
                    ? "bg-[#CC0000] text-white"
                    : "bg-[#121212] text-slate-400 hover:text-white"
                }`}
              >
                {study.profileImage && (
                  <img
                    src={study.profileImage}
                    alt={study.clientName}
                    referrerPolicy="no-referrer"
                    className={`w-10 h-10 object-cover shrink-0 transition-all duration-300 rounded-none border-none ${
                      isActive ? "grayscale-0" : "grayscale group-hover:grayscale-0"
                    }`}
                  />
                )}
                <div>
                  <h4 className="font-sans font-black text-xs uppercase tracking-wider block flex items-center gap-1 text-white">
                    {study.clientName}
                  </h4>
                  <span className={`block text-[9px] font-mono uppercase tracking-widest mt-0.5 ${
                    isActive ? "text-white/80" : "text-slate-500 group-hover:text-slate-300"
                  }`}>
                    {isMeher ? "Featured Success" : study.category}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Case Presentation Body */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCaseId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12"
          >
            {/* Left Narrative Column - Col span 7, or centered full width if case-3 */}
            <div className={activeCase.id === "case-3" ? "lg:col-span-8 lg:col-start-3 flex flex-col justify-between" : "lg:col-span-7 flex flex-col justify-between"}>
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-[#CC0000] uppercase tracking-[0.2em] block font-bold">
                    {activeCase.category} — {activeCase.industry}
                  </span>
                  {activeCase.badge && (
                    <span className="font-mono text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 bg-white/10 text-white">
                      {activeCase.badge}
                    </span>
                  )}
                </div>

                {/* Profile Photo and Headline Title block */}
                <div className="flex items-center gap-5 mt-4 mb-10 group/title">
                  {activeCase.profileImage && (
                    <img
                      src={activeCase.profileImage}
                      alt={activeCase.clientName}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover border-none rounded-none grayscale group-hover/title:grayscale-0 transition-all duration-300 relative z-10"
                    />
                  )}
                  <div>
                    <h3 className="font-sans font-black text-3xl sm:text-4xl text-white uppercase tracking-tight leading-none">
                      {activeCase.clientName}
                    </h3>
                    <p className="font-sans font-medium text-slate-400 text-xs uppercase tracking-wider mt-1.5 flex flex-wrap items-center gap-1.5 leading-none">
                      <Sparkles className="w-3 h-3 text-[#CC0000]" />
                      <span>{activeCase.title || activeCase.company || "Independent Creator"}</span>
                      {activeCase.company && activeCase.title && (
                        <>
                          <span className="text-slate-600">|</span>
                          <span className="text-slate-400">{activeCase.company}</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* growth stats visual display cards - starting metric, ending metric, timeline */}
                {activeCase.growthStats && (
                  <div className="mb-0">
                    <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block mb-4 font-bold">
                      Performance Metrics & Growth Result
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Card 1: Starting */}
                      <div className="relative overflow-hidden p-6 bg-[#121212] rounded-none border border-white/5 group/stat">
                        <span className="block font-mono text-[9px] text-slate-500 uppercase tracking-widest leading-none font-bold">Starting Audience</span>
                        <div className="mt-3 flex items-baseline gap-1">
                          <span className="font-sans font-black text-2xl text-white">
                            {activeCase.growthStats.starting}
                          </span>
                        </div>
                        <span className="block text-[10px] font-sans text-slate-400 mt-1">Initial Followers</span>
                      </div>

                      {/* Card 2: Current */}
                      <div className="relative overflow-hidden p-6 bg-[#CC0000] rounded-none border border-[#CC0000] group/stat">
                        <span className="block font-mono text-[9px] text-white/95 uppercase tracking-widest font-black leading-none">Current Audience</span>
                        <div className="mt-3 flex items-baseline gap-1">
                          <span className="font-sans font-black text-2xl text-white">
                            {activeCase.growthStats.current}
                          </span>
                        </div>
                        <span className="block text-[10px] font-sans text-white/90 mt-1 font-bold">
                          ⚡ Verified Growth
                        </span>
                      </div>

                      {/* Card 3: Timeline */}
                      <div className="relative overflow-hidden p-6 bg-[#121212] rounded-none border border-white/5 group/stat">
                        <span className="block font-mono text-[9px] text-slate-500 uppercase tracking-widest leading-none font-bold">Timeline</span>
                        <div className="mt-3 flex items-baseline gap-1">
                          <span className="font-sans font-black text-2xl text-white">
                            {activeCase.growthStats.timeline}
                          </span>
                        </div>
                        <span className="block text-[10px] font-sans text-slate-400 mt-1">Accelerated Period</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Embedded Vertical Video player consuming full visual hierarchy */}
            {activeCase.id !== "case-3" && (
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] mx-auto overflow-hidden bg-[#121212] border border-white/5 shadow-2xl">
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black text-white font-mono text-[9px] font-bold uppercase tracking-widest border border-white/10 select-none">
                    {activeCase.clientName} Video Case
                  </div>
                  <iframe
                    className="absolute inset-0 w-full h-full pointer-events-auto"
                    src={`https://www.youtube.com/embed/${
                      activeCase.id === "case-1"
                        ? "MATzSChX8Ng"
                        : "MyH7o-X5k9M"
                    }?autoplay=0&mute=1&loop=1&playlist=${
                      activeCase.id === "case-1"
                        ? "MATzSChX8Ng"
                        : "MyH7o-X5k9M"
                    }&controls=1&showinfo=0&rel=0&playsinline=1&modestbranding=1`}
                    title={`${activeCase.clientName} Case Study Video`}
                    allow="autoplay; encrypted-media"
                    frameBorder="0"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
