import React from "react";

export default function PartnerStrip() {
  const industries = ["SAAS", "REAL ESTATE", "EDUCATION", "FITNESS", "BUSINESS"];

  return (
    <section id="credibility-strip" className="relative py-12 bg-[#0A0A0A] border-t border-b border-white/10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center md:text-left">
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-slate-500 font-bold">
          CONTENT SYSTEMS FOR :
        </span>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          {industries.map((ind, idx) => (
            <React.Fragment key={ind}>
              {idx > 0 && (
                <span className="text-[#CC0000] opacity-50 select-none hidden sm:inline">•</span>
              )}
              <span className="font-sans font-black text-xs md:text-sm tracking-widest text-[#e5e5e5] hover:text-[#CC0000] transition-colors duration-0 uppercase cursor-default">
                {ind}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
