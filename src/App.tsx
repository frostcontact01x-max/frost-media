/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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

function MascotDivider() {
  return (
    <div className="flex items-center justify-center py-6 md:py-10 opacity-[0.14] pointer-events-none select-none">
      <div className="h-[1px] w-20 sm:w-32 bg-gradient-to-r from-transparent via-white/40 to-white/10" />
      <Logo className="w-6 h-6 mx-4 text-white" />
      <div className="h-[1px] w-20 sm:w-32 bg-gradient-to-l from-transparent via-white/40 to-white/10" />
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
    <div className="relative min-h-screen bg-frost-bg-dark text-white font-sans antialiased overflow-x-hidden selection:bg-frost-accent selection:text-black">
      {/* Dynamic Preloader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 bg-[#030303] z-[9999] flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.82, opacity: 0 }}
              animate={{ scale: [0.82, 1.04, 1], opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative flex flex-col items-center"
            >
              {/* Pulsing Mascot Logo */}
              <div className="relative w-24 h-24 mb-6">
                <Logo className="w-full h-full text-white" />
                <motion.div 
                  className="absolute inset-0 rounded-full bg-frost-accent/10 border border-frost-accent/20 blur-md pointer-events-none"
                  animate={{ scale: [0.95, 1.15, 0.95], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
              </div>
              
              {/* Muted Premium Lettering */}
              <span className="font-heading font-black text-xs uppercase tracking-[0.25em] text-white">
                FROST<span className="text-frost-accent font-bold">.</span>MEDIA
              </span>
              <div className="w-24 h-[1px] bg-white/15 mt-3.5 relative overflow-hidden rounded">
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 bg-frost-accent" 
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
    </div>
  );
}

