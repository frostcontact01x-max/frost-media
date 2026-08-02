/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Analytics } from "@vercel/analytics/react";
import Logo from "./components/Logo";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PartnerStrip from "./components/PartnerStrip";
import Services from "./components/Services";
import CaseStudies from "./components/CaseStudies";
import Proof from "./components/Proof";
import ProcessTimeline from "./components/ProcessTimeline";
import Showcase from "./components/Showcase";
import About from "./components/About";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

function MascotDivider() {
  return (
    <div className="flex items-center justify-center py-3 md:py-5 opacity-[0.15] pointer-events-none select-none">
      <div className="h-[1px] w-12 sm:w-20 bg-white/40" />
      <Logo className="w-5 h-5 mx-3 text-white" />
      <div className="h-[1px] w-12 sm:w-20 bg-white/40" />
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Elegant timing to simulate luxury preloader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white font-sans antialiased overflow-x-hidden selection:bg-[#CC0000] selection:text-white lg:cursor-none">
      {/* Premium Custom Cursor */}
      <CustomCursor />

      {/* Dynamic Preloader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 bg-[#0A0A0A] z-[9999] flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center"
            >
              {/* Mascot Logo */}
              <div className="relative w-24 h-24 mb-6">
                <Logo className="w-full h-full text-white" />
              </div>
              
              {/* Muted Premium Lettering */}
              <span className="font-sans font-black text-xs uppercase tracking-[0.25em] text-white">
                FROST<span className="text-[#CC0000] font-black">.</span>MEDIA
              </span>
              <div className="w-24 h-[2px] bg-white/15 mt-3.5 relative overflow-hidden">
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 bg-[#CC0000]" 
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                  style={{ width: "65%" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative full-page subtle ambient noise grain overlay */}
      <div 
        className="fixed inset-0 opacity-[0.012] pointer-events-none bg-repeat z-50 animate-grain" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%2523noiseFilter)'/%3E%3C/svg%3E")` 
        }} 
      />

      {/* Brutalist extreme viewport corner mascot textures */}
      <div className="fixed top-0 left-0 w-80 h-80 pointer-events-none select-none z-0 overflow-hidden opacity-[0.02] mix-blend-screen">
        <img
          src="https://ibb.co/LhkjCqRK"
          alt=""
          referrerPolicy="no-referrer"
          className="w-[200%] h-[200%] max-w-none absolute -top-1/2 -left-1/2 grayscale invert brightness-[0.2] contrast-[1.5]"
        />
      </div>
      <div className="fixed bottom-0 right-0 w-80 h-80 pointer-events-none select-none z-0 overflow-hidden opacity-[0.02] mix-blend-screen">
        <img
          src="https://ibb.co/LhkjCqRK"
          alt=""
          referrerPolicy="no-referrer"
          className="w-[200%] h-[200%] max-w-none absolute -bottom-1/2 -right-1/2 grayscale invert brightness-[0.2] contrast-[1.5]"
        />
      </div>

      {/* Floating navigation system */}
      <Navbar onNavigate={handleNavigate} />

      {/* Main vertical content sections pile */}
      <main id="app-main-canvas" className="relative">
        <Hero onNavigate={handleNavigate} />
        <PartnerStrip />
        <MascotDivider />
        <Services onNavigate={handleNavigate} />
        <CaseStudies onNavigate={handleNavigate} />
        <MascotDivider />
        <Proof />
        <ProcessTimeline />
        <Showcase />
        <MascotDivider />
        <About />
        <ContactForm />
      </main>

      {/* Bottom framework footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}

