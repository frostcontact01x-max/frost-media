import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, ChevronRight, Briefcase, Check, Loader2, AlertCircle, MessageCircle } from "lucide-react";
import Logo from "./Logo";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    phone: "",
    details: "",
    budget: "To be discussed during call",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const budgets = [
    "$1,500 - $3,000 /mo",
    "$3,000 - $6,000 /mo",
    "To be discussed during call"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setError("Name, Email, and Phone Number are required fields.");
      return;
    }

    // Basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please provide a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Submission failed:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 bg-[#0A0A0A] overflow-hidden">
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

      {/* Decorative subtle full-page analog noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.01] pointer-events-none bg-repeat animate-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%2523noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Brand Mascot Watermark Accent */}
      <div className="absolute -right-20 -bottom-20 w-[450px] h-[450px] opacity-[0.015] text-white pointer-events-none select-none z-0 transform rotate-12">
        <Logo className="w-full h-full" watermark />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="max-w-3xl mb-24">
          <div className="flex items-center space-x-2 mb-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#CC0000] font-bold">07 // Start Collaboration</span>
            <div className="h-[1px] w-8 bg-white/10" />
          </div>
          <h2 className="font-sans font-black text-4xl sm:text-5xl md:text-6.5xl text-white tracking-tighter leading-none uppercase">
            LET'S TALK ABOUT YOUR CONTENT.
          </h2>
          <p className="mt-4 text-slate-400 font-sans text-sm sm:text-base max-w-xl leading-relaxed">
            Tell us about your content goals and we'll explore whether Frost Media is a good fit.
          </p>
        </div>

        {/* Dynamic Transition Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form-key"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  {/* Name field */}
                  <div>
                    <label id="lbl-name" className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2 font-bold">
                      Your Full Name
                    </label>
                    <input
                      id="inp-name"
                      type="text"
                      required
                      placeholder="e.g. Richard Kessler"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#121212] border border-white/10 px-5 py-4 font-sans text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#CC0000] focus:bg-[#151515] transition-colors duration-0 rounded-none"
                    />
                  </div>

                  {/* Email & Business & Phone Fields - 3-col Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label id="lbl-email" className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2 font-bold">
                        Your Email Address
                      </label>
                      <input
                        id="inp-email"
                        type="email"
                        required
                        placeholder="e.g. richard@capitalflow.io"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#121212] border border-white/10 px-5 py-4 font-sans text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#CC0000] focus:bg-[#151515] transition-colors duration-0 rounded-none"
                      />
                    </div>

                    <div>
                      <label id="lbl-business" className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2 font-bold">
                        Company or Channel Name
                      </label>
                      <input
                        id="inp-business"
                        type="text"
                        placeholder="e.g. CapitalFlow"
                        value={formData.business}
                        onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                        className="w-full bg-[#121212] border border-white/10 px-5 py-4 font-sans text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#CC0000] focus:bg-[#151515] transition-colors duration-0 rounded-none"
                      />
                    </div>

                    <div>
                      <label id="lbl-phone" className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2 font-bold">
                        Phone Number
                      </label>
                      <input
                        id="inp-phone"
                        type="tel"
                        required
                        placeholder="e.g. +1 555-019-283"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#121212] border border-white/10 px-5 py-4 font-sans text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#CC0000] focus:bg-[#151515] transition-colors duration-0 rounded-none"
                      />
                    </div>
                  </div>

                  {/* Budget Ranges Selection */}
                  <div>
                    <label id="lbl-budget" className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2 font-bold">
                      Strategic monthly investment range (Optional)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {budgets.map((b) => {
                        const isSel = formData.budget === b;
                        return (
                          <button
                            key={b}
                            id={`budget-opt-${b.replace(/\s+/g, '-')}`}
                            type="button"
                            onClick={() => setFormData({ ...formData, budget: b })}
                            className={`px-5 py-4 text-left font-sans text-xs sm:text-sm border transition-colors duration-0 cursor-pointer rounded-none font-bold uppercase tracking-wider ${
                              isSel
                                ? "bg-[#CC0000] border-[#CC0000] text-white"
                                : "bg-[#121212] border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
                            }`}
                          >
                            {b}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Project details area */}
                  <div>
                    <label id="lbl-details" className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2 font-bold">
                      Tell us about your content goals & targets
                    </label>
                    <textarea
                      id="inp-details"
                      rows={4}
                      placeholder="Share your current video workflow, links to your content, or any targets you are aiming to solve..."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full bg-[#121212] border border-white/10 px-5 py-4 font-sans text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#CC0000] focus:bg-[#151515] transition-colors duration-0 resize-none rounded-none"
                    />
                  </div>

                  {/* Validation Action Error Alert Step 1 */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 bg-rose-950/40 border border-rose-800/40 text-rose-200 text-xs flex items-start space-x-2.5 font-sans rounded-none"
                    >
                      <AlertCircle className="w-4.5 h-4.5 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block text-white mb-0.5">Inquiry Submission Failed</span>
                        <span>{error}</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Submit Trigger in form - Instantaneous background color inversion to scarlet on hover */}
                  <div className="pt-2">
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-10 py-5 bg-transparent text-white border border-white/40 font-black uppercase tracking-widest font-sans text-xs transition-colors duration-0 hover:bg-[#CC0000] hover:border-[#CC0000] cursor-pointer flex items-center justify-center space-x-3 rounded-none"
                    >
                      <span>
                        {isSubmitting ? "Sending Inquiry..." : "Submit Inquiry"}
                      </span>
                      {isSubmitting ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                      ) : (
                        <Send className="w-3.5 h-3.5 text-white" />
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success-key"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#121212] p-8 md:p-10 rounded-none border-none"
                >
                  {/* Success indicator */}
                  <div className="flex items-center space-x-3 mb-6">
                    <Check className="w-8 h-8 text-white bg-[#CC0000] p-1.5" />
                    <div>
                      <h3 className="font-sans font-black text-2xl text-white uppercase tracking-tight leading-none">
                        Inquiry Received
                      </h3>
                      <p className="text-xs font-mono text-[#CC0000] uppercase tracking-widest mt-1 font-bold">
                        Filing secured. Let's align on WhatsApp.
                      </p>
                    </div>
                  </div>

                  <p className="font-sans text-sm text-slate-400 mb-8 leading-relaxed">
                    Thanks <span className="text-white font-black">{formData.name}</span>. Your inquiry details are securely recorded in our database.
                  </p>

                  {/* WhatsApp Connect Block */}
                  <div className="bg-[#0A0A0A] p-6 text-center border border-white/10">
                    <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-[#CC0000] mx-auto mb-4">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <h4 className="font-sans font-black text-base text-white uppercase tracking-tight mb-2">Connect via WhatsApp</h4>
                    <p className="font-sans text-xs text-slate-400 max-w-sm mx-auto mb-6 leading-relaxed">
                      To accelerate your onboarding and coordinate the content consultation immediately, please tap the button below to text our chief team.
                    </p>
                    
                    <a
                      href="https://wa.me/message/ME4KGS4IC52VN1"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center space-x-2.5 w-full py-4 bg-[#CC0000] text-white font-black font-sans text-xs uppercase tracking-widest transition-colors duration-0"
                    >
                      <span>Connect with WhatsApp</span>
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Highlights details - Col span 5 */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121212] p-8 flex flex-col justify-between rounded-none border-none">
              <div>
                <span className="font-mono text-[9px] text-[#CC0000] uppercase tracking-widest block mb-4 font-bold">
                  Boutique Model Focus
                </span>
                <h4 className="font-sans font-black text-lg text-white uppercase tracking-tight mb-2">
                  What we'll talk about:
                </h4>
                
                <ul className="space-y-4 my-6">
                  <li className="flex items-start text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                    <Check className="w-4 h-4 text-[#CC0000] mr-3 mt-0.5 flex-shrink-0" />
                    <span>Your overall content objectives, current planning workflows, and delivery frequency.</span>
                  </li>
                  <li className="flex items-start text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                    <Check className="w-4 h-4 text-[#CC0000] mr-3 mt-0.5 flex-shrink-0" />
                    <span>How we can support your strategic scripting, pacing edits, and CTR thumb layouts.</span>
                  </li>
                  <li className="flex items-start text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                    <Check className="w-4 h-4 text-[#CC0000] mr-3 mt-0.5 flex-shrink-0" />
                    <span>Whether our boutique active client capacity lines up with your long-term publishing growth.</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-white/5 pt-6 mt-4 flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[9px] text-slate-500 tracking-wider font-bold">
                  Accepting 2 new client partnerships this month
                </span>
              </div>
            </div>

            {/* Direct contact link */}
            <div className="p-6 bg-[#121212] flex items-center justify-between rounded-none border-none">
              <div className="flex items-center space-x-3.5">
                <div className="w-9 h-9 bg-white/5 flex items-center justify-center text-[#CC0000]">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-sans font-black text-xs text-white uppercase">Direct Studio Email</span>
                  <span className="block font-sans text-[11px] text-slate-500">hello.frostmedia@gmail.com</span>
                </div>
              </div>
              <a
                href="mailto:hello.frostmedia@gmail.com"
                className="w-10 h-10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors duration-0"
              >
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
