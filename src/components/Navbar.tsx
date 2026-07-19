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
            ? "py-4 md:py-5 bg-[#0A0A0A] border-b border-white/10"
            : "py-6 md:py-8 bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            id="nav-logo"
            onClick={() => handleItemClick("home")}
            className="flex items-center space-x-3.5 group cursor-pointer text-left"
          >
            <Logo className="w-12 h-12 text-white group-hover:text-[#CC0000] transition-colors duration-0 transform scale-100" />
            <span className="font-sans font-black text-lg md:text-xl tracking-tight text-white group-hover:text-[#CC0000] transition-colors duration-0">
              FROST<span className="text-[#CC0000]">.</span>MEDIA
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
                  className={`relative px-4 py-2 font-sans text-xs uppercase tracking-widest font-medium transition-colors duration-0 cursor-pointer ${
                    isActive ? "text-[#CC0000]" : "text-slate-400 hover:text-[#CC0000]"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-white/5 rounded-none"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* CTA Button - Instant background color inversion to scarlet on hover with zero delay */}
          <div className="hidden lg:block">
            <button
              id="cta-strategy"
              onClick={() => handleItemClick("contact")}
              className="group relative px-6 py-3 rounded-none bg-transparent text-white border border-white/40 font-extrabold font-sans text-xs uppercase tracking-widest transition-colors duration-0 hover:bg-[#CC0000] hover:border-[#CC0000] hover:text-white cursor-pointer"
            >
              <span className="relative z-10 flex items-center space-x-1.5 px-0.5">
                <span className="font-sans tracking-[0.08em] font-black text-[11px] sm:text-xs">Book Strategy Call</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-[#CC0000] transition-colors duration-0 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu - sharp style */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[73px] bg-[#0A0A0A] border-b border-white/10 z-40 lg:hidden py-8 px-6 overflow-y-auto"
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-item-${item.id}`}
                    onClick={() => handleItemClick(item.id)}
                    className={`py-3 text-left font-sans text-xs uppercase tracking-widest font-black border-b border-white/5 transition-colors duration-0 cursor-pointer ${
                      isActive ? "text-[#CC0000]" : "text-slate-400 hover:text-[#CC0000]"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* Instant hover inversion CTA for mobile */}
              <button
                id="mobile-cta-strategy"
                onClick={() => handleItemClick("contact")}
                className="mt-6 w-full py-4 rounded-none bg-transparent text-white border border-white/40 hover:bg-[#CC0000] hover:border-[#CC0000] font-extrabold uppercase tracking-widest text-xs flex items-center justify-center space-x-2 transition-colors duration-0 cursor-pointer"
              >
                <span>Book Strategy Call</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
