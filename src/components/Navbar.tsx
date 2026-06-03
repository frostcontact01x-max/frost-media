/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "case-studies", label: "Case Studies" },
    { id: "process", label: "Process" },
    { id: "showcase", label: "Showcase" },
    { id: "about", label: "Philosophy" },
    { id: "testimonials", label: "Collaborations" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const scrollPosition = window.scrollY + 150;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleItemClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "py-4 md:py-5 glass-nav"
            : "py-6 md:py-8 bg-transparent"
        }`}
      >
        <div className="max-w-[1244px] mx-auto px-6 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            id="nav-logo"
            onClick={() => handleItemClick("home")}
            className="flex items-center space-x-3 group cursor-pointer text-left"
          >
            <Logo className="w-10 h-10 text-white group-hover:text-frost-accent transition-all duration-300 transform group-hover:scale-105" />
            <span className="font-heading font-bold text-lg md:text-xl tracking-tight text-white group-hover:text-frost-accent transition-colors duration-300">
              FROST<span className="text-frost-accent">.</span>MEDIA
            </span>
          </button>

          {/* Desktop Nav Items */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative px-4 py-2 font-sans text-xs uppercase tracking-widest font-medium transition-colors duration-300 cursor-pointer ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-white/5 rounded"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="hidden lg:block">
            <button
              id="cta-strategy"
              onClick={() => handleItemClick("contact")}
              className="group relative px-6 py-3 rounded overflow-hidden bg-white text-black font-semibold font-sans text-xs uppercase tracking-widest transition-all duration-300 hover:bg-frost-accent hover:text-black cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(125,211,252,0.4)]"
            >
              <span className="relative z-10 flex items-center space-x-1">
                <span>Book Strategy Call</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            id="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-frost-accent transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-x-0 top-0 pt-24 pb-12 bg-[#050505]/98 backdrop-blur-2xl border-b border-white/10 z-40 lg:hidden px-6"
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    id={`mobile-nav-item-${item.id}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleItemClick(item.id)}
                    className={`py-3 text-left font-heading text-lg font-medium tracking-wide border-b border-white/5 cursor-pointer ${
                      isActive ? "text-frost-accent pl-2" : "text-gray-300"
                    }`}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
              <button
                id="mobile-cta-strategy"
                onClick={() => handleItemClick("contact")}
                className="mt-6 w-full py-4 rounded bg-frost-accent text-black font-semibold uppercase tracking-wider text-sm flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(125,211,252,0.3)] cursor-pointer"
              >
                <span>Book a Strategy Call</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
