import React from "react";
import { motion } from "motion/react";
import { Video, FileText, Palette, Users, Globe } from "lucide-react";

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
      icon: <Video className="w-5 h-5 text-white" />
    },
    {
      label: "Scripts Structured",
      value: "80+",
      description: "Hook frameworks, narrative story arcs, and structured reading sheets.",
      icon: <FileText className="w-5 h-5 text-white" />
    },
    {
      label: "Thumbnails Designed",
      value: "150+",
      description: "CTR billboard layout templates optimized for small-screen viewports.",
      icon: <Palette className="w-5 h-5 text-white" />
    },
    {
      label: "Active Clients",
      value: "8",
      description: "Boutique, deep-collaboration workflows where we operate as direct strategic partners.",
      icon: <Users className="w-5 h-5 text-white" />
    },
    {
      label: "Industries Served",
      value: "5",
      description: "Lead Generation, Travel, Business Consultation, E-Commerce, and SaaS.",
      icon: <Globe className="w-5 h-5 text-white" />
    }
  ];

  return (
    <section id="proof" className="relative py-28 md:py-36 bg-[#0A0A0A]">
      {/* Horizontal rule animation */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: false }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="h-full bg-[#CC0000]"
        />
      </div>

      {/* Decorative full-page analog noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.01] pointer-events-none bg-repeat animate-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%2523noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-24">
          <div className="flex items-center space-x-2 mb-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#CC0000] font-bold">05 // Studio Verification</span>
            <div className="h-[1px] w-8 bg-white/10" />
          </div>
          <h2 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter leading-none uppercase">
            PROOF, NOT PROMISES.
          </h2>
          <p className="mt-4 text-slate-400 font-sans text-sm sm:text-base max-w-xl leading-relaxed">
            We work as a dedicated, focused boutique. We don't invent billion-impression stats. Here are the realistic, verified assets we've produced and manage.
          </p>
        </div>

        {/* Metrics Grid - 12 columns total, elegant placement */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
              className="group relative p-6 bg-[#121212] flex flex-col justify-between min-h-[220px] rounded-none border-none"
            >
              <div>
                <div className="w-10 h-10 bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#CC0000] transition-colors duration-0 rounded-none border-none">
                  {metric.icon}
                </div>
                <span className="block font-sans font-black text-4xl text-white group-hover:text-[#CC0000] transition-colors duration-0 uppercase">
                  {metric.value}
                </span>
                <span className="block font-sans font-bold text-xs uppercase text-slate-300 tracking-wider mt-1.5">
                  {metric.label}
                </span>
              </div>
              
              <p className="font-sans text-[11px] text-slate-500 leading-relaxed mt-4 pt-4 border-t border-white/5 group-hover:text-slate-300 transition-colors duration-0 uppercase font-bold tracking-wider">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer verification banner - flat and borderless */}
        <div className="mt-12 p-5 bg-[#121212] flex items-center space-x-3.5 max-w-xl rounded-none border-none">
          <span className="w-1.5 h-1.5 bg-[#CC0000] flex-shrink-0" />
          <p className="font-sans text-xs text-slate-400 leading-relaxed">
            <strong>Internal Audit Rule:</strong> Every production log is archived and verified internally. We will gladly share sample catalogs of any workflow category during our discovery call.
          </p>
        </div>

      </div>
    </section>
  );
}
