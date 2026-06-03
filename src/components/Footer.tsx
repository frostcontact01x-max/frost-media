/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Instagram, MessageCircle, ArrowUp } from "lucide-react";
import Logo from "./Logo";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050505] border-t border-white/5 py-12 md:py-20 relative overflow-hidden">
      {/* Absolute faint lighting decorative */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-frost-accent/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-[1244px] mx-auto px-6 md:px-8">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 md:pb-16 border-b border-white/5">
          
          {/* Column 1: Logo & statement - span 5 */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <button
                id="footer-logo"
                onClick={() => onNavigate("home")}
                className="flex items-center space-x-4 mb-6 group text-left cursor-pointer"
              >
                <Logo className="w-14 h-14 text-white group-hover:text-frost-accent transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3 drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]" />
                <span className="font-heading font-black text-xl md:text-2xl tracking-tighter text-white group-hover:text-frost-accent transition-colors">
                  FROST<span className="text-frost-accent font-bold">.</span>MEDIA
                </span>
              </button>

              <p className="text-gray-500 font-sans text-xs sm:text-sm leading-relaxed max-w-sm">
                Engineers of high-yielding media systems that convert raw viewer attention into direct enterprise capital growth and authority.
              </p>
            </div>

            {/* Social channels lookups */}
            <div className="flex items-center space-x-4 mt-8">
              <a
                href="https://www.instagram.com/frost_studio/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Profile"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-frost-accent hover:text-black flex items-center justify-center text-gray-400 transition-all duration-300 border border-white/5"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/message/ME4KGS4IC52VN1"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Chat"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-frost-accent hover:text-black flex items-center justify-center text-gray-400 transition-all duration-300 border border-white/5"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Jump Navigation - span 4 */}
          <div className="md:col-span-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-white mb-6">
              Platform Nodes
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => onNavigate("home")}
                  className="font-sans text-xs text-left text-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                  Home Layout
                </button>
                <button
                  onClick={() => onNavigate("services")}
                  className="font-sans text-xs text-left text-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                  Expertise
                </button>
                <button
                  onClick={() => onNavigate("case-studies")}
                  className="font-sans text-xs text-left text-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                  Client Proof
                </button>
                <button
                  onClick={() => onNavigate("ecosystem")}
                  className="font-sans text-xs text-left text-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                  The Ecosystem
                </button>
              </div>

              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => onNavigate("process")}
                  className="font-sans text-xs text-left text-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                  Timeline Process
                </button>
                <button
                  onClick={() => onNavigate("showcase")}
                  className="font-sans text-xs text-left text-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                  Craft Showcase
                </button>
                <button
                  onClick={() => onNavigate("about")}
                  className="font-sans text-xs text-left text-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                  Philosophy
                </button>
                <button
                  onClick={() => onNavigate("testimonials")}
                  className="font-sans text-xs text-left text-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                  Partner Reviews
                </button>
                <button
                  onClick={() => onNavigate("contact")}
                  className="font-sans text-xs text-left text-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                  Strategy Request
                </button>
              </div>
            </div>
          </div>

          {/* Column 3: Contact & Info - span 3 */}
          <div className="md:col-span-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-white mb-6">
              Agency Operations
            </h4>
            <div className="space-y-4">
              <div>
                <span className="block font-mono text-[9px] uppercase text-gray-500">Principal Desk</span>
                <span className="block font-sans text-xs text-gray-300 mt-1">frostcontact01x@gmail.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Lower footer copyright details */}
        <div className="pt-8 md:pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
            &copy; {currentYear} FROST MEDIA INC. ALL STRATEGIES PERSISTED.
          </span>
          
          <button
            id="back-to-top-btn"
            onClick={handleScrollToTop}
            className="group flex items-center space-x-2 text-xs font-mono text-gray-500 hover:text-white transition-colors duration-350 cursor-pointer"
          >
            <span>Back to top</span>
            <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}
