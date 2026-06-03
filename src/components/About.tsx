/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-frost-accent/2 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-frost-secondary/2 blur-[130px] pointer-events-none" />

      <div className="max-w-[1244px] mx-auto px-6 md:px-8">
        
        {/* Story Section & Philosophy */}
        <div id="about-mission-block" className="max-w-4xl mx-auto text-center">
          
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="h-[1px] w-8 bg-frost-accent/20" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-frost-accent font-semibold">04 // Core Philosophy</span>
            <div className="h-[1px] w-8 bg-frost-accent/20" />
          </div>
          
          {/* Big Editorial Quote Statement */}
          <h3 className="font-heading font-medium text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight uppercase max-w-3xl mx-auto">
            "We believe most businesses don't need more content. They need <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7dd3fc] to-white font-bold italic">better systems</span> for planning, producing, distributing, and extracting value from the content they already create."
          </h3>

          {/* Quote Attribution */}
          <div className="mt-6 flex flex-col items-center">
            <span className="font-sans text-xs sm:text-sm font-semibold tracking-wide text-gray-300">
              — Hasan Afridi
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-gray-500 mt-1 font-bold">
              Founder, Frost Media
            </span>
          </div>

          {/* Supporting Text block */}
          <div className="mt-8 max-w-2xl mx-auto">
            <p className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed">
              Frost Media helps creators and businesses build repeatable content systems through editing, scripting, thumbnails, strategy, and channel management.
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/2 backdrop-blur text-xs font-mono text-gray-500 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-frost-accent" />
              <span>Built for High-Trust Creators & Brands</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
