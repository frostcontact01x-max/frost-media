/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
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

export default function App() {
  const handleNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen bg-frost-bg-dark text-white font-sans antialiased overflow-x-hidden selection:bg-frost-accent selection:text-black">
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
        <Services onNavigate={handleNavigate} />
        <CaseStudies />
        <Proof />
        <ProcessTimeline />
        <Showcase />
        <About />
        <ContactForm />
      </main>

      {/* Bottom framework footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

