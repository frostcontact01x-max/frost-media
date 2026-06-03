/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Video, FileText, Palette, Users, Globe, CheckCircle2 } from "lucide-react";

interface ProofMetric {
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

export default function Proof() {
  const metrics: ProofMetric[] = [
    {
      label: "Videos Edited",
      value: "120+",
      description: "Direct long-form and short-form video releases customized for client channels.",
      icon: <Video className="w-5 h-5 text-frost-accent" />
    },
    {
      label: "Scripts Structured",
      value: "80+",
      description: "Hook frameworks, narrative story arcs, and structured reading sheets.",
      icon: <FileText className="w-5 h-5 text-frost-accent" />
    },
    {
      label: "Thumbnails Designed",
      value: "150+",
      description: "CTR billboard layout templates optimized for small-screen viewports.",
      icon: <Palette className="w-5 h-5 text-frost-accent" />
    },
    {
      label: "Active Clients",
      value: "8",
      description: "Boutique, deep-collaboration workflows where we operate as direct strategic partners.",
      icon: <Users className="w-5 h-5 text-frost-secondary" />
    },
    {
      label: "Industries Served",
      value: "5",
      description: "Lead Generation, Travel, Business Consultation, E-Commerce, and SaaS.",
      icon: <Globe className="w-5 h-5 text-frost-secondary" />
    }
  ];

  return (
    <section id="proof" className="relative py-24 md:py-32 bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Visual lighting background layers */}
      <div className="absolute top-[15%] right-[-5%] w-[400px] h-[400px] rounded-full bg-frost-accent/2 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[-5%] w-[400px] h-[400px] rounded-full bg-frost-secondary/2 blur-[120px] pointer-events-none" />

      <div className="max-w-[1244px] mx-auto px-6 md:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="flex items-center space-x-2 mb-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-frost-accent font-semibold">05 // Studio Verification</span>
            <div className="h-[1px] w-8 bg-frost-accent/20" />
          </div>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter leading-none uppercase">
            PROOF, NOT PROMISES.
          </h2>
          <p className="mt-4 text-gray-400 font-sans text-sm sm:text-base max-w-xl leading-relaxed">
            We work as a dedicated, focused boutique. We don't invent billion-impression stats. Here are the realistic, verified assets we've produced and manage.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-xl bg-[#111111] border border-white/5 flex flex-col justify-between hover:border-white/10 hover:bg-[#151515] transition-all min-h-[220px]"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-frost-accent/10 group-hover:border-frost-accent/20 transition-all">
                  {metric.icon}
                </div>
                <span className="block font-heading font-black text-4xl text-white group-hover:text-frost-accent transition-colors">
                  {metric.value}
                </span>
                <span className="block font-sans font-bold text-xs uppercase text-gray-300 tracking-wider mt-1.5">
                  {metric.label}
                </span>
              </div>
              
              <p className="font-sans text-[11px] text-gray-500 leading-relaxed mt-4 pt-4 border-t border-white/5 group-hover:text-gray-400 transition-colors">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer verification banner */}
        <div className="mt-12 p-4 rounded-xl bg-white/2 border border-white/5 flex items-center space-x-3 max-w-xl">
          <CheckCircle2 className="w-4 h-4 text-frost-accent flex-shrink-0" />
          <p className="font-sans text-xs text-gray-400">
            <strong>Internal Audit Rule:</strong> Every production log is archived and verified internally. We will gladly share sample catalogs of any workflow category during our discovery call.
          </p>
        </div>

      </div>
    </section>
  );
}
