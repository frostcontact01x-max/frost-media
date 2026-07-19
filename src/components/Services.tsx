import React from "react";
import { motion } from "motion/react";
import { Zap, Sliders, Palette, Compass, Video, Share2, BarChart2, ArrowUpRight } from "lucide-react";
import { SERVICES } from "../data/portfolioData";
import Logo from "./Logo";

interface ServicesProps {
  onNavigate: (sectionId: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  return (
    <section id="services" className="relative py-28 md:py-36 bg-[#0A0A0A] overflow-hidden">
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

      {/* Decorative subtle full-page analog noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.01] pointer-events-none bg-repeat animate-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%2523noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Oversized transparent brand mascot background accent */}
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[850px] h-[850px] opacity-[0.012] text-white pointer-events-none select-none z-0">
        <Logo className="w-full h-full" watermark />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#CC0000] font-bold">01 // Expertise</span>
              <div className="h-[1px] w-8 bg-white/10" />
            </div>
            <h2 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter leading-none uppercase">
              OUR CONTENT SYSTEMS FUEL VALUE GROWTH.
            </h2>
          </div>
          <p className="text-slate-400 max-w-sm font-sans text-sm md:text-base leading-relaxed">
            We don't sell random views or viral loops. We construct sustainable attention distribution hubs configured to scale your brand authority.
          </p>
        </div>

        {/* Services Grid (Layout 12-column cards) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              id={`service-card-${service.id}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-[#121212] p-6 md:p-8 flex flex-col justify-between transition-colors duration-300 min-h-[260px] col-span-12 md:col-span-6 lg:col-span-4 rounded-none border-none"
            >
              <div>
                {/* Service Details */}
                <h3 className="font-sans font-black text-xl text-white mb-1 group-hover:text-[#CC0000] transition-colors duration-0 uppercase tracking-tight">
                  {service.title}
                </h3>
              </div>

              {/* Bullet Features */}
              <div className="mt-auto">
                <ul className="space-y-2 mb-5 border-t border-white/5 pt-4">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-xs text-slate-400 font-mono uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 bg-[#CC0000] mr-2.5 flex-shrink-0" />
                      <span className="group-hover:text-white transition-colors duration-0">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Micro CTA arrow with instant red transition */}
                <button
                  onClick={() => onNavigate("contact")}
                  className="flex items-center text-[11px] font-sans font-black uppercase tracking-wider text-[#CC0000] group-hover:text-white transition-colors duration-0 group/btn cursor-pointer"
                >
                  <span className="mr-1.5 font-sans">Inquire About Service</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-0 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </motion.div>
          ))}
          
          {/* Custom Bento Callout Container - occupying same columns */}
          <motion.div
            id="services-callout"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-[#121212] p-6 md:p-8 flex flex-col justify-between min-h-[260px] col-span-12 md:col-span-6 lg:col-span-4 rounded-none border-none"
          >
            <div>
              <div className="inline-block px-2 py-0.5 bg-white/5 text-[9px] font-mono uppercase text-[#CC0000] tracking-widest mb-4 font-bold">
                Direct Collaboration
              </div>
              <h3 className="font-sans font-black text-xl text-white mb-2 uppercase tracking-tight">
                Let's audit your current setup
              </h3>
              <p className="text-slate-400 font-sans text-xs leading-relaxed">
                Connect directly with us to audit your existing videos, thumbnails, and publishing calendar. We will identify clear opportunities to refine your content systems.
              </p>
            </div>
            
            <button
              id="services-callout-btn"
              onClick={() => onNavigate("contact")}
              className="w-full text-center py-2.5 bg-transparent text-white border border-white/40 font-black font-sans text-xs uppercase tracking-widest hover:bg-[#CC0000] hover:border-[#CC0000] transition-colors duration-0 cursor-pointer mt-4 rounded-none"
            >
              Book Strategy Call
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
