import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll } from "motion/react";
import { PROCESS_STEPS } from "../data/portfolioData";

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 50%", "end 50%"]
  });

  const [activeNodes, setActiveNodes] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => {
      const triggerY = window.innerHeight * 0.5; // 50% of viewport height
      const updated: Record<string, boolean> = {};

      PROCESS_STEPS.forEach((step) => {
        const el = document.getElementById(`process-item-${step.number}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active if the top of the item has scrolled past (is above) the 50% trigger Y
          updated[step.number] = rect.top <= triggerY;
        }
      });

      setActiveNodes(updated);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section id="process" className="relative py-28 md:py-36 bg-[#0A0A0A] overflow-hidden">
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
        
        {/* Section Header */}
        <div className="max-w-3xl mb-24 md:mb-32">
          <div className="flex items-center space-x-2 mb-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#CC0000] font-bold">04 // Workflow</span>
            <div className="h-[1px] w-8 bg-white/10" />
          </div>
          <h2 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-[-0.05em] leading-none uppercase">
            A COHESIVE ROADMAP FOR SCALE.
          </h2>
          <p className="mt-4 text-slate-400 font-sans text-sm sm:text-base max-w-xl leading-relaxed">
            Four focused execution chapters configured to build momentum, eliminate distribution waste, and optimize for lead acquisition.
          </p>
        </div>

        {/* Timeline List Layout */}
        <div ref={containerRef} className="relative pl-10 md:pl-16 ml-3 md:ml-8 space-y-24 md:space-y-36">
          {/* Faint white transparent baseline */}
          <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-white/10" />

          {/* Scroll-linked scarlet progress bar */}
          <motion.div
            className="absolute left-0 top-2 bottom-2 w-[1px] bg-[#CC0000] origin-top"
            style={{ scaleY: scrollYProgress }}
          />

          {PROCESS_STEPS.map((step, index) => {
            const isActive = activeNodes[step.number];

            return (
              <motion.div
                key={step.number}
                id={`process-item-${step.number}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Bullets layout indicating active digit node - Instantly snapping colors */}
                <div
                  className={`absolute -left-[51px] md:-left-[81px] top-1 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-sans font-black text-xs md:text-sm rounded-none border transition-colors duration-0 ease-linear ${
                    isActive
                      ? "bg-[#CC0000] border-[#CC0000] text-white"
                      : "bg-[#0A0A0A] border-white/20 text-[#CC0000]"
                  }`}
                >
                  {step.number}
                </div>

                {/* Main Content Card Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Text Block - Col span 6 */}
                  <div className="lg:col-span-6">
                    <h3 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl text-white mb-2 uppercase tracking-[-0.04em] leading-none">
                      {step.title}
                    </h3>
                  </div>

                  {/* Bullets list drawer - Col span 6 - Sharp and flat card */}
                  <div className="lg:col-span-6 lg:pl-12 flex items-center">
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {step.details.map((detail, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex flex-col bg-[#121212] p-5 border border-white/5 hover:bg-[#1E1E1E] transition-colors duration-0 ease-linear cursor-default rounded-none"
                        >
                          <span className="font-mono text-[9px] uppercase text-slate-500 mb-1 font-bold">
                            Phase 0{index + 1}.0{dIdx + 1}
                          </span>
                          <span className="font-sans font-bold text-xs sm:text-sm text-slate-300 uppercase tracking-wider">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Editorial Quote Attribution (Closing Thought) */}
        <div className="max-w-4xl mx-auto text-center mt-36 md:mt-48 border-t border-b border-white/10 py-16 md:py-24">
          <p className="font-sans font-medium text-lg sm:text-xl md:text-2xl text-slate-300 italic tracking-tight leading-relaxed max-w-3xl mx-auto">
            "Creative work scales when creativity is supported by systems. Without structure, even the best ideas eventually burn out."
          </p>
          <div className="mt-8 flex flex-col items-center">
            <span className="font-sans text-xs sm:text-sm font-black tracking-wider text-white uppercase">
              — Mimoho Biswas
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-slate-500 mt-2 font-bold">
              Founder, Operations & Strategy Director
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
