import React from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 bg-[#0A0A0A]">
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
        
        {/* Story Section & Philosophy */}
        <div id="about-mission-block" className="max-w-4xl mx-auto text-center">
          
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="h-[1px] w-8 bg-white/10" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#CC0000] font-bold">06 // Core Philosophy</span>
            <div className="h-[1px] w-8 bg-white/10" />
          </div>
          
          {/* Flat Solid Block for Philosophy Quote */}
          <div className="group relative p-8 md:p-14 bg-[#121212] max-w-4xl mx-auto mb-16 rounded-none border-none">
            {/* Big Editorial Quote Statement in pure white and flat red */}
            <h3 className="font-sans font-black text-xl sm:text-2xl md:text-3xl text-white leading-relaxed tracking-tight uppercase max-w-3xl mx-auto">
              "We believe most businesses don't need more content. They need <span className="text-[#CC0000]">better systems</span> for planning, producing, distributing, and extracting value from the content they already create."
            </h3>

            {/* Quote Attribution */}
            <div className="mt-10 flex flex-col items-center">
              <span className="font-sans text-xs sm:text-sm font-black tracking-wider text-white uppercase">
                — Hasan Afridi
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-slate-500 mt-2 font-bold">
                Founder, Frost Media
              </span>
            </div>
          </div>

          {/* Supporting Text block in slate grey */}
          <div className="max-w-2xl mx-auto">
            <p className="text-slate-400 font-sans text-sm sm:text-base leading-relaxed">
              Frost Media helps creators and businesses build repeatable content systems through editing, scripting, thumbnails, strategy, and channel management.
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#CC0000]" />
              <span>Built for High-Trust Creators & Brands</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
