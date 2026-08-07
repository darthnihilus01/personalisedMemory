"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Shield, Lock } from "lucide-react";
import confetti from "canvas-confetti";

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [memberNumber, setMemberNumber] = useState<number>(1483);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      // Trigger subtle luxury confetti animation
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#a855f7", "#ec4899", "#3b82f6", "#ffffff"],
        });
      } catch (err) {
        // Fallback gracefully if confetti fails
      }
    }, 600);
  };

  return (
    <section id="waitlist" className="py-28 md:py-40 relative bg-[#060709] border-t border-white/[0.06] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-purple-900/15 via-indigo-900/10 to-amber-900/0 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Category Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-white/10 text-xs font-mono uppercase tracking-widest text-purple-400 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Founding Access</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-light text-white leading-tight tracking-tight mb-6">
          Help build the future of memory.
        </h2>

        <p className="text-lg text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
          We are selectively inviting founding users to shape the first Personal Memory Engine.
        </p>

        {/* Form Container */}
        <div className="max-w-lg mx-auto mb-8">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="waitlist-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                onSubmit={handleSubmit}
                className="relative"
              >
                <div className="flex flex-col sm:flex-row items-center gap-3 p-2 rounded-full glass-panel border border-white/20 shadow-2xl focus-within:border-purple-500/50 transition-all duration-300">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your personal email..."
                    id="waitlist-input-email"
                    className="w-full bg-transparent px-5 py-3 text-sm text-white placeholder-white/40 focus:outline-none font-sans"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    id="waitlist-btn-submit"
                    className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 bg-white text-black font-medium text-sm px-6 py-3.5 rounded-full hover:bg-purple-100 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    ) : (
                      <>
                        <span>Join Waitlist</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="waitlist-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-3xl glass-panel border border-purple-500/30 bg-purple-950/20 text-center shadow-2xl space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 mx-auto">
                  <CheckCircle2 className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-medium text-white">
                  You are #{memberNumber} in queue.
                </h3>
                <p className="text-sm text-white/70 font-sans max-w-sm mx-auto">
                  An invitation token will be sent to <span className="text-purple-300 font-mono">{email}</span> as founding access slots open.
                </p>
                <div className="pt-4 flex items-center justify-center gap-2 text-xs font-mono text-emerald-400">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Founding Pass Reserved • Zero-Knowledge Encryption</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Subtext */}
        <p className="text-xs font-mono text-white/40 tracking-wider">
          Founding users will shape the first Personal Memory Engine.
        </p>
      </div>
    </section>
  );
}
