/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Send, CheckCircle, Clock, ChevronRight, Briefcase, Sparkles, Check } from "lucide-react";
import Logo from "./Logo";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    details: "",
    budget: "To be discussed during call",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const budgets = [
    "$1,500 - $3,000 /mo",
    "$3,000 - $6,000 /mo",
    "To be discussed during call"
  ];

  const timeSlots = [
    "09:00 AM UTC",
    "11:30 AM UTC",
    "02:00 PM UTC",
    "04:30 PM UTC"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitted(true);
  };

  const handleConfirmBooking = () => {
    setIsBookingConfirmed(true);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-[#050505] overflow-hidden border-t border-white/5">
      {/* Brand Mascot Watermark Accent */}
      <div className="absolute -right-20 -bottom-20 w-[450px] h-[450px] opacity-[0.015] text-white pointer-events-none select-none z-0 transform rotate-12">
        <Logo className="w-full h-full" watermark />
      </div>

      {/* Background spot spotlights */}
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-frost-secondary/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] bg-frost-accent/2 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1244px] mx-auto px-6 md:px-8">
        
        {/* Header Title */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="flex items-center space-x-2 mb-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-frost-accent font-semibold">07 // Start Collaboration</span>
            <div className="h-[1px] w-8 bg-frost-accent/20" />
          </div>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl md:text-6.5xl text-white tracking-tighter leading-none uppercase">
            LET'S TALK ABOUT YOUR CONTENT.
          </h2>
          <p className="mt-4 text-gray-400 font-sans text-sm sm:text-base max-w-xl leading-relaxed">
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
                  className="space-y-6"
                >
                  {/* Name field */}
                  <div>
                    <label id="lbl-name" className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">
                      Your Full Name
                    </label>
                    <input
                      id="inp-name"
                      type="text"
                      required
                      placeholder="e.g. Richard Kessler"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#111111] border border-white/8 rounded px-5 py-4 font-sans text-sm text-white placeholder-gray-600 focus:outline-none focus:border-frost-accent focus:bg-[#151515] transition-all duration-300"
                    />
                  </div>

                  {/* Email & Business Fields side-by-side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label id="lbl-email" className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">
                        Your Email Address
                      </label>
                      <input
                        id="inp-email"
                        type="email"
                        required
                        placeholder="e.g. richard@capitalflow.io"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#111111] border border-white/8 rounded px-5 py-4 font-sans text-sm text-white placeholder-gray-600 focus:outline-none focus:border-frost-accent focus:bg-[#151515] transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label id="lbl-business" className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">
                        Company or Channel Name
                      </label>
                      <input
                        id="inp-business"
                        type="text"
                        placeholder="e.g. CapitalFlow / @capitalflow"
                        value={formData.business}
                        onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                        className="w-full bg-[#111111] border border-white/8 rounded px-5 py-4 font-sans text-sm text-white placeholder-gray-600 focus:outline-none focus:border-frost-accent focus:bg-[#151515] transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Budget Ranges Selection */}
                  <div>
                    <label id="lbl-budget" className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">
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
                            className={`px-4 py-3 rounded text-left font-sans text-xs sm:text-sm border transition-all duration-300 cursor-pointer ${
                              isSel
                                ? "bg-frost-accent/10 border-frost-accent text-white"
                                : "bg-[#111111] border-white/8 text-gray-400 hover:border-white/20 hover:text-white"
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
                    <label id="lbl-details" className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">
                      Tell us about your content goals & targets
                    </label>
                    <textarea
                      id="inp-details"
                      rows={4}
                      placeholder="Share your current video workflow, links to your content, or any targets you are aiming to solve..."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full bg-[#111111] border border-white/8 rounded px-5 py-4 font-sans text-sm text-white placeholder-gray-600 focus:outline-none focus:border-frost-accent focus:bg-[#151515] transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Submit Trigger in form */}
                  <div className="pt-4">
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      className="w-full sm:w-auto px-10 py-5 rounded bg-white text-black font-semibold uppercase tracking-widest font-sans text-xs transition-colors duration-300 hover:bg-frost-accent cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-none flex items-center justify-center space-x-3"
                    >
                      <span className="font-heading">Submit Inquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success-key"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl bg-frost-card border border-frost-accent/20 p-8 md:p-10"
                >
                  {/* Success indicator */}
                  <div className="flex items-center space-x-3 mb-6">
                    <Check className="w-8 h-8 text-frost-accent bg-frost-accent/10 p-1.5 rounded-full border border-frost-accent/20" />
                    <div>
                      <h3 className="font-heading font-bold text-2xl text-white uppercase tracking-tight">
                        Inquiry Received
                      </h3>
                      <p className="text-xs font-mono text-frost-accent uppercase tracking-widest mt-0.5">
                        We will get back to you within 24 hours.
                      </p>
                    </div>
                  </div>

                  <p className="font-sans text-sm text-gray-400 mb-8 leading-relaxed">
                    Thanks <span className="text-white font-medium">{formData.name}</span>. Underneath, secure a session on our direct booking selector to lock in our discovery call slot immediately.
                  </p>

                  {/* Calendly Interface Simulation */}
                  <div className="bg-[#111111] border border-white/8 rounded-xl p-6">
                    <AnimatePresence mode="wait">
                      {!isBookingConfirmed ? (
                        <motion.div
                          key="booking-selection"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                            <div className="flex items-center space-x-2.5">
                              <Calendar className="w-5 h-5 text-frost-accent" />
                              <div>
                                <span className="block font-heading font-bold text-sm text-white uppercase tracking-tight">Select Discovery Call</span>
                                <span className="block font-sans text-[10px] text-gray-500">20 minute casual brief</span>
                              </div>
                            </div>
                            <div className="flex items-center text-xs font-mono text-gray-500 space-x-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>Instant Booking</span>
                            </div>
                          </div>

                          {/* Virtual time slots list */}
                          <div className="grid grid-cols-2 gap-3 mb-6">
                            {timeSlots.map((slot) => {
                              const isSelect = selectedSlot === slot;
                              return (
                                <button
                                  key={slot}
                                  id={`timeslot-btn-${slot.replace(/\s+/g, '-')}`}
                                  onClick={() => setSelectedSlot(slot)}
                                  className={`py-3.5 rounded text-center text-xs font-medium uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
                                    isSelect
                                      ? "bg-frost-accent text-black font-semibold border-transparent shadow-[0_0_15px_rgba(125,211,252,0.3)]"
                                      : "bg-[#050505] border-white/5 text-gray-300 hover:border-white/10"
                                  }`}
                                >
                                  {slot}
                                </button>
                              );
                            })}
                          </div>

                          <button
                            id="confirm-booking-btn"
                            disabled={!selectedSlot}
                            onClick={handleConfirmBooking}
                            className="w-full py-4 rounded bg-frost-secondary disabled:bg-frost-secondary/20 disabled:text-gray-500 text-black font-semibold font-sans text-xs uppercase tracking-widest hover:bg-white transition-colors duration-300 cursor-pointer"
                          >
                            {selectedSlot ? `Confirm Booking for ${selectedSlot}` : "Choose a time slot to lock booking"}
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="booking-success"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center py-6"
                        >
                          <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                          <h4 className="font-heading font-bold text-lg text-white uppercase tracking-tight">Discovery Call Scheduled</h4>
                          <p className="font-sans text-xs text-gray-400 mt-2 max-w-md mx-auto leading-relaxed">
                            We have scheduled your discovery session for <strong className="text-white">{selectedSlot}</strong> using the email address <strong className="text-white">{formData.email}</strong>. Check your inbox for coordinates!
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Highlights details - Col span 5 */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#111111]/80 rounded-xl border border-white/5 p-8 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[9px] text-frost-accent uppercase tracking-widest block mb-4 font-bold">
                  Boutique Model Focus
                </span>
                <h4 className="font-heading font-bold text-lg text-white uppercase tracking-tight mb-2">
                  What we'll talk about:
                </h4>
                
                <ul className="space-y-4 my-6">
                  <li className="flex items-start text-xs sm:text-sm text-gray-400 font-sans">
                    <Check className="w-4 h-4 text-frost-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span>Your overall content objectives, current planning workflows, and delivery frequency.</span>
                  </li>
                  <li className="flex items-start text-xs sm:text-sm text-gray-400 font-sans">
                    <Check className="w-4 h-4 text-frost-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span>How we can support your strategic scripting, pacing edits, and CTR thumb layouts.</span>
                  </li>
                  <li className="flex items-start text-xs sm:text-sm text-gray-400 font-sans">
                    <Check className="w-4 h-4 text-frost-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span>Whether our boutique active client capacity lines up with your long-term publishing growth.</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-white/5 pt-6 mt-4 flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[9px] text-gray-400 tracking-wider">
                  Accepting 2 new client partnerships this month
                </span>
              </div>
            </div>

            {/* Direct contact link */}
            <div className="p-6 rounded-xl border border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-3.5">
                <div className="w-9 h-9 rounded bg-[#151515] flex items-center justify-center text-frost-accent">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-heading font-medium text-xs text-white">Direct Studio Email</span>
                  <span className="block font-sans text-[11px] text-gray-500">frostcontact01x@gmail.com</span>
                </div>
              </div>
              <a
                href="mailto:frostcontact01x@gmail.com"
                className="w-10 h-10 rounded bg-[#111111] flex items-center justify-center text-gray-400 hover:text-white border border-white/5 hover:border-white/10 transition-colors"
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
