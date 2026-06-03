/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Zap, Sliders, Palette, Compass, Video, Share2, BarChart2, ArrowUpRight, ChevronRight } from "lucide-react";
import { SERVICES } from "../data/portfolioData";

interface ServicesProps {
  onNavigate: (sectionId: string) => void;
}

const getIcon = (name: string) => {
  switch (name) {
    case "Compass":
      return <Compass className="w-7 h-7 text-frost-accent group-hover:scale-110 transition-transform duration-300" />;
    case "Video":
      return <Video className="w-7 h-7 text-frost-accent group-hover:scale-110 transition-transform duration-300" />;
    case "Zap":
      return <Zap className="w-7 h-7 text-frost-accent group-hover:scale-110 transition-transform duration-300" />;
    case "Palette":
      return <Palette className="w-7 h-7 text-frost-accent group-hover:scale-110 transition-transform duration-300" />;
    case "Sliders":
      return <Sliders className="w-7 h-7 text-frost-accent group-hover:scale-110 transition-transform duration-300" />;
    case "Share2":
      return <Share2 className="w-7 h-7 text-frost-accent group-hover:scale-110 transition-transform duration-300" />;
    case "BarChart":
      return <BarChart2 className="w-7 h-7 text-frost-accent group-hover:scale-110 transition-transform duration-300" />;
    default:
      return <Zap className="w-7 h-7 text-frost-accent" />;
  }
};

export default function Services({ onNavigate }: ServicesProps) {
  return (
    <section id="services" className="relative py-24 md:py-32 bg-[#050505] overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-[20%] right-[-5%] w-[450px] h-[450px] rounded-full bg-frost-accent/3 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-frost-secondary/3 blur-[130px] pointer-events-none" />

      <div className="max-w-[1244px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 mb-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-frost-accent">01 // Expertise</span>
              <div className="h-[1px] w-8 bg-frost-accent/20" />
            </div>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter leading-none">
              OUR CONTENT SYSTEMS FUEL VALUE GROWTH.
            </h2>
          </div>
          <p className="text-gray-400 max-w-sm font-sans text-sm md:text-base leading-relaxed">
            We don't sell random views or viral loops. We construct sustainable attention distribution hubs configured to scale your brand authority.
          </p>
        </div>

        {/* Services Grid (Layout 12 column cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              id={`service-card-${service.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-xl bg-[#111111]/60 border border-white/5 p-8 md:p-10 flex flex-col justify-between hover:border-frost-accent/30 hover:bg-[#151515] transition-all duration-300 min-h-[380px]"
            >
              {/* Background interactive hover aura */}
              <div className="absolute inset-0 bg-gradient-to-br from-frost-accent/0 to-frost-secondary/0 group-hover:from-frost-accent/[0.02] group-hover:to-frost-secondary/[0.02] rounded-xl pointer-events-none transition-all duration-300" />
              
              <div>
                {/* Icon wrapper with subtle glow */}
                <div className="w-14 h-14 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center mb-8 group-hover:bg-frost-accent/10 group-hover:border-frost-accent/20 transition-all duration-300">
                  {getIcon(service.iconName)}
                </div>

                {/* Service Details */}
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-4 group-hover:text-frost-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 font-sans text-xs sm:text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Bullet Features with micro animations */}
              <div className="mt-auto">
                <ul className="space-y-2 mb-8 border-t border-white/5 pt-6">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-xs text-gray-500 font-mono">
                      <ChevronRight className="w-3.5 h-3.5 text-frost-accent/40 mr-1.5 flex-shrink-0" />
                      <span className="group-hover:text-gray-300 transition-colors duration-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Micro CTA arrow */}
                <button
                  onClick={() => onNavigate("contact")}
                  className="flex items-center text-xs font-heading font-semibold uppercase tracking-wider text-frost-accent group-hover:text-white transition-colors duration-300 group/btn mt-2 cursor-pointer"
                >
                  <span className="mr-1.5 font-sans">Inquire About Service</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </motion.div>
          ))}
          
          {/* Custom Bento Callout Container */}
          <motion.div
            id="services-callout"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="group relative rounded-xl bg-gradient-to-br from-[#111111] to-[#151515] border border-frost-secondary/20 p-8 md:p-10 flex flex-col justify-between min-h-[380px]"
          >
            <div>
              <div className="inline-block px-3 py-1 bg-frost-secondary/15 border border-frost-secondary/30 rounded-full text-[10px] font-mono uppercase text-frost-secondary tracking-widest mb-6 font-semibold">
                Direct Collaboration
              </div>
              <h3 className="font-heading font-bold text-2xl text-white mb-4">
                Let's audit your current setup
              </h3>
              <p className="text-gray-400 font-sans text-xs sm:text-sm leading-relaxed">
                Connect directly with us to audit your existing videos, thumbnails, and publishing calendar. We will identify clear opportunities to refine your content systems.
              </p>
            </div>
            
            <button
              id="services-callout-btn"
              onClick={() => onNavigate("contact")}
              className="w-full text-center py-4 rounded bg-frost-secondary font-medium font-sans text-xs uppercase tracking-widest text-black hover:bg-white transition-colors duration-300 shadow-[0_0_15px_rgba(167,139,250,0.3)] hover:shadow-none cursor-pointer mt-6"
            >
              Book Strategy Call
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
