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
    <footer className="bg-[#0A0A0A] border-t border-white/10 py-20 md:py-28 relative overflow-hidden">
      {/* Decorative full-page analog noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.01] pointer-events-none bg-repeat animate-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%2523noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-8 relative z-10">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 md:pb-16 border-b border-white/10">
          
          {/* Column 1: Logo & statement - span 5 */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <button
                id="footer-logo"
                onClick={() => onNavigate("home")}
                className="flex items-center space-x-4 mb-6 group text-left cursor-pointer border-none bg-transparent"
              >
                <Logo className="w-14 h-14 text-white group-hover:text-[#CC0000] transition-colors duration-0" />
                <span className="font-sans font-black text-xl md:text-2xl tracking-tighter text-white group-hover:text-[#CC0000] transition-colors duration-0">
                  FROST<span className="text-[#CC0000] font-black">.</span>MEDIA
                </span>
              </button>

              <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed max-w-sm font-bold uppercase tracking-wider">
                Engineers of high-yielding media systems that convert raw viewer attention into direct enterprise capital growth and authority.
              </p>
            </div>

            {/* Social channels lookups - flat sharp blocks, instantaneous hover inversion to CC0000 */}
            <div className="flex items-center space-x-3 mt-8">
              <a
                href="https://www.instagram.com/frost_studio/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Profile"
                className="w-10 h-10 bg-white/5 hover:bg-[#CC0000] hover:text-white flex items-center justify-center text-slate-400 transition-colors duration-0 rounded-none border-none"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/message/ME4KGS4IC52VN1"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Chat"
                className="w-10 h-10 bg-white/5 hover:bg-[#CC0000] hover:text-white flex items-center justify-center text-slate-400 transition-colors duration-0 rounded-none border-none"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Jump Navigation - span 4 */}
          <div className="md:col-span-4">
            <h4 className="font-sans font-black text-xs uppercase tracking-widest text-white mb-6">
              Platform Nodes
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => onNavigate("home")}
                  className="font-sans text-xs text-left text-slate-500 hover:text-white transition-colors duration-0 cursor-pointer uppercase font-bold tracking-wider"
                >
                  Home Layout
                </button>
                <button
                  onClick={() => onNavigate("services")}
                  className="font-sans text-xs text-left text-slate-500 hover:text-white transition-colors duration-0 cursor-pointer uppercase font-bold tracking-wider"
                >
                  Expertise
                </button>
                <button
                  onClick={() => onNavigate("case-studies")}
                  className="font-sans text-xs text-left text-slate-500 hover:text-white transition-colors duration-0 cursor-pointer uppercase font-bold tracking-wider"
                >
                  Client Proof
                </button>
              </div>

              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => onNavigate("process")}
                  className="font-sans text-xs text-left text-slate-500 hover:text-white transition-colors duration-0 cursor-pointer uppercase font-bold tracking-wider"
                >
                  Timeline Process
                </button>
                <button
                  onClick={() => onNavigate("showcase")}
                  className="font-sans text-xs text-left text-slate-500 hover:text-white transition-colors duration-0 cursor-pointer uppercase font-bold tracking-wider"
                >
                  Craft Showcase
                </button>
                <button
                  onClick={() => onNavigate("about")}
                  className="font-sans text-xs text-left text-slate-500 hover:text-white transition-colors duration-0 cursor-pointer uppercase font-bold tracking-wider"
                >
                  Philosophy
                </button>
              </div>
            </div>
          </div>

          {/* Column 3: Contact & Info - span 3 */}
          <div className="md:col-span-3">
            <h4 className="font-sans font-black text-xs uppercase tracking-widest text-white mb-6">
              Agency Operations
            </h4>
            <div className="space-y-4">
              <div>
                <span className="block font-mono text-[9px] uppercase text-slate-500 font-bold">Principal Desk</span>
                <span className="block font-sans text-xs text-slate-300 mt-1 uppercase font-bold tracking-wider">hello.frostmedia@gmail.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Lower footer copyright details */}
        <div className="pt-8 md:pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-bold">
            &copy; {currentYear} FROST MEDIA INC. ALL STRATEGIES PERSISTED.
          </span>
          
          {/* Back to top button - sharp flat block, instantaneous inversion to CC0000 on hover */}
          <button
            id="back-to-top-btn"
            onClick={handleScrollToTop}
            className="group flex items-center space-x-3 text-xs font-mono text-slate-500 hover:text-white transition-colors duration-0 cursor-pointer uppercase font-bold"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 bg-white/5 text-white flex items-center justify-center group-hover:bg-[#CC0000] transition-colors duration-0 rounded-none border-none">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}
