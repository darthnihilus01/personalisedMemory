"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Lock } from "lucide-react";

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [memberNumber] = useState<number>(1483);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <section id="waitlist" className="py-24 md:py-36 relative bg-[#09090b] border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-widest text-amber-300/80 mb-6">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Founding Access</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-light text-white leading-tight tracking-tight mb-6">
          Help build the future of memory.
        </h2>

        <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
          We are selectively inviting founding users to shape the first Personal Memory Engine.
        </p>

        {/* Form Container */}
        <div className="max-w-md mx-auto mb-8">
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
                <div className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-full bg-[#121215] border border-white/15 focus-within:border-white/30 transition-all">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your personal email..."
                    id="waitlist-input-email"
                    className="w-full bg-transparent px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none font-sans"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    id="waitlist-btn-submit"
                    className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-1.5 bg-white text-black font-medium text-xs px-5 py-2.5 rounded-full hover:bg-zinc-200 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    ) : (
                      <>
                        <span>Join Waitlist</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="waitlist-success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl panel-quiet border border-white/20 text-center space-y-3"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white mx-auto">
                  <CheckCircle2 className="w-5 h-5 text-amber-300" />
                </div>
                <h3 className="text-xl font-medium text-white">
                  You are #{memberNumber} in queue.
                </h3>
                <p className="text-xs text-white/70 font-sans max-w-xs mx-auto">
                  An invitation token will be sent to <span className="text-amber-200 font-mono">{email}</span> as founding access slots open.
                </p>
                <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <Lock className="w-3 h-3" />
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
