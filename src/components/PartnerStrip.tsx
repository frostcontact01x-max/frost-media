/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export default function PartnerStrip() {
  const industries = ["SAAS", "REAL ESTATE", "EDUCATION", "FITNESS", "BUSINESS"];

  return (
    <section id="credibility-strip" className="relative py-8 bg-[#030303] border-t border-b border-white/5 overflow-hidden">
      <div className="max-w-[1244px] mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center md:text-left">
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-gray-500 font-bold">
          CONTENT SYSTEMS FOR :
        </span>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          {industries.map((ind, idx) => (
            <React.Fragment key={ind}>
              {idx > 0 && (
                <span className="text-frost-accent opacity-50 select-none hidden sm:inline">•</span>
              )}
              <span className="font-heading font-black text-xs md:text-sm tracking-widest text-[#e5e5e5] hover:text-frost-accent transition-colors duration-300 uppercase">
                {ind}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
