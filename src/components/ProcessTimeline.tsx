/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { PROCESS_STEPS } from "../data/portfolioData";

export default function ProcessTimeline() {
  return (
    <section id="process" className="relative py-24 md:py-32 bg-[#050505] overflow-hidden">
      {/* Visual lighting background layers */}
      <div className="absolute top-[40%] right-[-10%] w-[450px] h-[450px] rounded-full bg-frost-secondary/2 blur-[130px] pointer-events-none" />

      <div className="max-w-[1244px] mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 md:mb-28">
          <div className="flex items-center space-x-2 mb-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-frost-accent">04 // Workflow</span>
            <div className="h-[1px] w-8 bg-frost-accent/20" />
          </div>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter leading-none">
            A COHESIVE ROADMAP FOR SCALE.
          </h2>
          <p className="mt-4 text-gray-400 font-sans text-sm sm:text-base max-w-xl leading-relaxed">
            Four focused execution chapters configured to build momentum, eliminate distribution waste, and optimize for lead acquisition.
          </p>
        </div>

        {/* Timeline List Layout */}
        <div className="relative border-l border-white/5 pl-6 md:pl-12 ml-4 md:ml-8 space-y-16 md:space-y-24">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              id={`process-item-${step.number}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Bullets layout indicating active digit node */}
              <div className="absolute -left-[31px] md:-left-[61px] top-0 w-12 h-12 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center font-heading font-bold text-sm text-frost-accent shadow-[0_0_15px_rgba(125,211,252,0.1)]">
                {step.number}
              </div>

              {/* Main Content Card Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Text Block - Col span 6 */}
                <div className="lg:col-span-6">
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="font-sans text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Bullets list drawer - Col span 6 */}
                <div className="lg:col-span-6 lg:pl-12 flex items-center">
                  <div className="w-full bg-[#111111]/40 border border-white/5 p-6 rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {step.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex flex-col">
                        <span className="font-mono text-[9px] uppercase text-gray-500 mb-1">
                          Phase 0{index + 1}.0{dIdx + 1}
                        </span>
                        <span className="font-sans font-medium text-xs sm:text-sm text-gray-300">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Editorial Quote Attribution (Closing Thought) */}
        <div className="max-w-4xl mx-auto text-center mt-24 md:mt-32 border-t border-b border-white/5 py-12 md:py-16">
          <p className="font-heading font-medium text-lg sm:text-xl md:text-2xl text-gray-300 italic tracking-tight leading-relaxed max-w-3xl mx-auto">
            "Creative work scales when creativity is supported by systems. Without structure, even the best ideas eventually burn out."
          </p>
          <div className="mt-6 flex flex-col items-center">
            <span className="font-sans text-xs sm:text-sm font-semibold tracking-wider text-white uppercase">
              — Mimoho Biswas
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-gray-500 mt-1.5 font-bold">
              Founder, Operations & Strategy Director
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
