/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Sliders, ChevronRight, Check, Sparkles, Layers, Video } from "lucide-react";
import { CASE_STUDIES } from "../data/portfolioData";

export default function CaseStudies() {
  const [activeCaseId, setActiveCaseId] = useState(CASE_STUDIES[0].id);
  const activeCase = CASE_STUDIES.find((c) => c.id === activeCaseId) || CASE_STUDIES[0];

  return (
    <section id="case-studies" className="relative py-24 md:py-32 bg-[#050505] border-t border-white/5">
      {/* Absolute graphic lighting accents */}
      <div className="absolute top-1/2 left-[-10%] w-[500px] h-[500px] rounded-full bg-frost-accent/2 blur-[140px] pointer-events-none" />
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-frost-secondary/2 blur-[140px] pointer-events-none" />

      <div className="max-w-[1244px] mx-auto px-6 md:px-8">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="flex items-center space-x-2 mb-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-frost-accent">02 // Authentic Outcomes</span>
            <div className="h-[1px] w-8 bg-frost-accent/20" />
          </div>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter leading-none uppercase">
            REAL CLIENT WORK & CASE STUDIES.
          </h2>
          <p className="mt-4 text-gray-400 font-sans text-sm sm:text-base max-w-xl leading-relaxed">
            Detailed breakdowns of actual channel strategy, video editing, scripts, and production support provided directly to our active publishers.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div id="case-tabs-row" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 border-b border-white/5 pb-8 mb-12">
          {CASE_STUDIES.map((study) => {
            const isActive = study.id === activeCaseId;
            const isMeher = study.clientName === "Meher Shaikh";
            return (
              <button
                key={study.id}
                id={`case-tab-btn-${study.id}`}
                onClick={() => setActiveCaseId(study.id)}
                className={`relative p-4 rounded-xl text-left transition-all duration-300 cursor-pointer group flex items-center gap-4 border ${
                  isActive
                    ? "bg-white text-black border-transparent shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                    : isMeher
                    ? "bg-[#111111] text-gray-300 border-frost-accent/20 hover:border-frost-accent/40 shadow-[0_0_15px_rgba(125,211,252,0.03)]"
                    : "bg-[#111111] text-gray-400 hover:text-white border-white/5 hover:border-white/10"
                }`}
              >
                {/* Accent glow on tab for Meher */}
                {isMeher && !isActive && (
                  <span className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-frost-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-frost-accent"></span>
                  </span>
                )}
                {study.profileImage && (
                  <img
                    src={study.profileImage}
                    alt={study.clientName}
                    referrerPolicy="no-referrer"
                    className={`w-10 h-10 rounded-full object-cover border-2 shrink-0 transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 ${
                      isActive ? "border-black grayscale-0" : isMeher ? "border-frost-accent/50 grayscale-0" : "border-white/10 grayscale group-hover:border-frost-accent/50"
                    }`}
                  />
                )}
                <div>
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider block flex items-center gap-1">
                    {study.clientName}
                    {isMeher && <span className={`text-[8px] font-mono font-bold uppercase ${isActive ? "text-frost-accent" : "text-[#7dd3fc]"}`}>★</span>}
                  </h4>
                  <span className={`block text-[9px] font-mono uppercase tracking-widest mt-0.5 ${
                    isActive ? "text-gray-600" : isMeher ? "text-frost-accent" : "text-gray-500"
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
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
          >
            {/* Left Narrative Column - Col span 7 */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="font-mono text-xs text-frost-accent uppercase tracking-[0.2em] block font-semibold">
                    {activeCase.category} — {activeCase.industry}
                  </span>
                  {activeCase.badge && (
                    <span className={`font-mono text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border ${
                      activeCase.clientName === "Meher Shaikh"
                        ? "text-black bg-frost-accent border-frost-accent shadow-[0_0_10px_rgba(125,211,252,0.4)]"
                        : "text-frost-accent bg-frost-accent/10 border-frost-accent/20"
                    }`}>
                      {activeCase.badge}
                    </span>
                  )}
                </div>

                {/* Profile Photo and Headline Title block */}
                <div className="flex items-center gap-5 mt-3 mb-8 group/title">
                  {activeCase.profileImage && (
                    <div className="relative">
                      {/* Glow effect */}
                      <div className={`absolute inset-0 rounded-full blur-md opacity-20 transition-opacity duration-500 group-hover/title:opacity-100 ${
                        activeCase.clientName === "Meher Shaikh" ? "bg-frost-accent opacity-60" : "bg-frost-accent/25"
                      }`} />
                      <img
                        src={activeCase.profileImage}
                        alt={activeCase.clientName}
                        referrerPolicy="no-referrer"
                        className={`w-16 h-16 rounded-full object-cover border-2 transition-all duration-500 relative z-10 hover:shadow-[0_0_15px_rgba(125,211,252,0.4)] ${
                          activeCase.clientName === "Meher Shaikh" ? "border-frost-accent grayscale-0" : "border-frost-accent/40 group-hover/title:border-frost-accent grayscale group-hover/title:grayscale-0"
                        }`}
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-heading font-black text-3xl sm:text-4xl text-white uppercase tracking-tight leading-none">
                      {activeCase.clientName}
                    </h3>
                    <p className="font-sans font-medium text-[#7dd3fc] text-xs uppercase tracking-wider mt-1.5 flex flex-wrap items-center gap-1.5 leading-none">
                      <Sparkles className="w-3 h-3" />
                      <span>{activeCase.title || activeCase.company || "Independent Creator"}</span>
                      {activeCase.company && activeCase.title && (
                        <>
                          <span className="text-gray-600">|</span>
                          <span className="text-gray-400">{activeCase.company}</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Overview & Short Description Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="p-5 rounded-xl bg-[#111111]/80 border border-white/5">
                    <span className="font-mono text-[9px] text-frost-accent uppercase tracking-widest block mb-2.5 font-bold">
                      The Engagement Overview
                    </span>
                    <p className="font-sans text-xs text-gray-300 leading-relaxed">
                      {activeCase.overview}
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-[#111111]/80 border border-white/5">
                    <span className="font-mono text-[9px] text-frost-accent uppercase tracking-widest block mb-2.5 font-bold">
                      Target Audience & Strategy
                    </span>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed">
                      {activeCase.shortDescription || "Tailored positioning and video distribution designed to match client business benchmarks."}
                    </p>
                  </div>
                </div>

                {/* Meher Shaikh (or any other study with growth stats) Premium growth stats visual display cards */}
                {activeCase.growthStats && (
                  <div className="mb-8">
                    <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-4 font-semibold">
                      Performance Metrics & Growth Result
                    </span>
                    <div className="grid grid-cols-3 gap-4">
                      {/* Card 1: Starting */}
                      <div className="relative overflow-hidden p-5 bg-[#111111] border border-white/5 rounded-xl group/stat hover:border-frost-accent/20 transition-all duration-300">
                        <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest leading-none">Starting Audience</span>
                        <div className="mt-2.5 flex items-baseline gap-1">
                          <span className="font-heading font-black text-xl sm:text-2xl text-rose-400">
                            {activeCase.growthStats.starting}
                          </span>
                        </div>
                        <span className="block text-[10px] font-sans text-gray-500 mt-1">Initial Followers</span>
                        <div className="absolute -bottom-2 -right-2 text-white/[0.01] font-heading font-bold text-5xl select-none pointer-events-none">START</div>
                      </div>

                      {/* Card 2: Current */}
                      <div className="relative overflow-hidden p-5 bg-gradient-to-br from-[#121c24] to-[#111111] border border-frost-accent/25 rounded-xl group/stat hover:border-frost-accent/50 transition-all duration-300 shadow-[0_0_20px_rgba(125,211,252,0.05)]">
                        <span className="block font-mono text-[9px] text-frost-accent uppercase tracking-widest font-bold leading-none">Current Audience</span>
                        <div className="mt-2.5 flex items-baseline gap-1">
                          <span className="font-heading font-black text-xl sm:text-2.5xl text-[#7dd3fc] drop-shadow-[0_0_12px_rgba(125,211,252,0.4)]">
                            {activeCase.growthStats.current}
                          </span>
                        </div>
                        <span className="block text-[10px] font-sans text-emerald-400 mt-1 font-semibold flex items-center gap-1">
                          ⚡ 10x Increase
                        </span>
                        <div className="absolute -bottom-2 -right-2 text-[#7dd3fc]/[0.02] font-heading font-bold text-5xl select-none pointer-events-none">GROWTH</div>
                      </div>

                      {/* Card 3: Timeline */}
                      <div className="relative overflow-hidden p-5 bg-[#111111] border border-white/5 rounded-xl group/stat hover:border-frost-secondary/20 transition-all duration-300">
                        <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest leading-none">Timeline</span>
                        <div className="mt-2.5 flex items-baseline gap-1">
                          <span className="font-heading font-black text-xl sm:text-2xl text-white">
                            {activeCase.growthStats.timeline}
                          </span>
                        </div>
                        <span className="block text-[10px] font-sans text-gray-500 mt-1">Accelerated Period</span>
                        <div className="absolute -bottom-2 -right-2 text-white/[0.01] font-heading font-bold text-5xl select-none pointer-events-none">TIME</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Services Provided */}
                <div className="mb-8">
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-4 font-semibold">
                    Services Rendered
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeCase.services.map((service, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-white/2 rounded-md border border-white/5">
                        <div className="w-5 h-5 rounded bg-frost-accent/15 flex items-center justify-center text-frost-accent">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-sans text-xs text-gray-300 font-medium">
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Display deliverables & Assets previews list */}
              <div className="border-t border-white/5 pt-8 mt-4">
                <h4 className="font-heading font-medium text-xs uppercase tracking-widest text-gray-400 mb-6 flex items-center">
                  <Layers className="w-4 h-4 text-frost-accent mr-2" />
                  Key Creative Deliverables
                </h4>
                
                <div className="space-y-3">
                  {activeCase.displays.map((displayItem, index) => (
                    <div key={index} className="flex items-center justify-between bg-[#111111]/40 border border-white/5 p-4 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-frost-accent shadow-[0_0_8px_#7dd3fc]" />
                        <span className="font-sans text-xs sm:text-sm text-gray-200">
                          {displayItem}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] text-[#7dd3fc] uppercase tracking-wider bg-frost-accent/10 px-2 py-0.5 rounded border border-frost-accent/20">
                        Verified Deliverable
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Metric Counter Cards / Information Column - Col span 5 */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
              <div className="relative rounded-2xl bg-gradient-to-b from-[#111111] to-[#0A0A0A] border border-white/5 p-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-frost-accent/5 rounded-full blur-[60px]" />
                
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                    Collaboration Status
                  </span>
                  {activeCase.isActiveClient ? (
                    <span className="font-mono text-[9px] uppercase font-bold tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full animate-pulse-slow">
                      ● Active Client
                    </span>
                  ) : (
                    <span className="font-mono text-[9px] uppercase font-bold tracking-widest bg-white/5 text-gray-400 border border-white/10 px-2.5 py-1 rounded-full">
                      Project Completed
                    </span>
                  )}
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="p-4 bg-white/2 rounded-xl border border-white/5">
                    <span className="font-mono text-[9px] uppercase text-gray-500 tracking-wider">Client Industry</span>
                    <h5 className="font-heading font-bold text-base text-white mt-1 uppercase">{activeCase.industry}</h5>
                  </div>

                  <div className="p-4 bg-white/2 rounded-xl border border-white/5 animate-pulse-slow border-frost-accent/20">
                    <span className="font-mono text-[9px] uppercase text-frost-accent tracking-wider font-bold">Key Outcome Achieved</span>
                    <h5 className="font-heading font-black text-sm text-[#7dd3fc] mt-1.5 uppercase leading-snug">{activeCase.keyOutcome || "Exceptional channel analytics & high-converting creative design assets."}</h5>
                  </div>

                  <div className="p-4 bg-white/2 rounded-xl border border-white/5">
                    <span className="font-mono text-[9px] uppercase text-gray-500 tracking-wider">Services Implemented</span>
                    <ul className="mt-2 space-y-1.5">
                      {activeCase.services.map((srv, idx) => (
                        <li key={idx} className="flex items-center text-xs text-gray-400 font-sans">
                          <ChevronRight className="w-3.5 h-3.5 text-frost-accent mr-1.5" />
                          {srv}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Decorative Case mockup card displaying activeCase.heroImage */}
              <div className="relative rounded-2xl overflow-hidden h-[240px] border border-white/5 group bg-[#111111]">
                <img
                  src={activeCase.heroImage}
                  alt={activeCase.clientName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-102 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div className="max-w-[70%]">
                    <span className="font-mono text-[8px] text-frost-accent uppercase tracking-[0.2em] block mb-1">
                      Project Portfolio Visuals
                    </span>
                    <span className="font-heading font-bold text-sm text-white uppercase tracking-tight">
                      Creative framing & style layout
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black group-hover:bg-frost-accent transition-colors duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
