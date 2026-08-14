"use client";

import { motion } from "framer-motion";
import { Lock, Fingerprint, EyeOff } from "lucide-react";

export default function PrivacySection() {
  return (
    <section className="relative pt-32 pb-16 flex flex-col items-center justify-center px-6 overflow-hidden z-10">
      
      <div className="w-full max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.02)]">
            <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-400" strokeWidth={1.5} />
          </div>
          
          <h2 className="font-display text-[32px] sm:text-[48px] md:text-[56px] font-medium leading-[1.1] tracking-tight mb-6 text-white">
            Private by design.<br />
            <span className="text-gradient-cyan">Secure by default.</span>
          </h2>
          
          <p className="text-[15px] sm:text-[17px] leading-relaxed text-zinc-400 max-w-xl mb-16">
            Your personal memory graph is exactly that—personal. We use industry-standard encryption to keep your data secure, and we adhere to strict privacy policies. 
            <span className="block mt-2 text-zinc-300 font-medium">We never train on your life, and we never sell your data.</span>
          </p>
        </motion.div>

        {/* Minimal feature row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
        >
          <div className="p-6 rounded-2xl bg-[#0a0b10] border border-white/[0.04] flex items-start gap-4 hover:border-white/[0.08] transition-colors">
            <Lock className="w-5 h-5 text-cyan-400/70 shrink-0 mt-0.5" />
            <div className="text-left">
              <h4 className="text-[14px] font-medium text-zinc-200 mb-1.5">Data Security</h4>
              <p className="text-[13px] text-zinc-500 leading-relaxed">Your memories are encrypted both in transit and at rest using enterprise-grade security protocols.</p>
            </div>
          </div>
          
          <div className="p-6 rounded-2xl bg-[#0a0b10] border border-white/[0.04] flex items-start gap-4 hover:border-white/[0.08] transition-colors">
            <EyeOff className="w-5 h-5 text-cyan-400/70 shrink-0 mt-0.5" />
            <div className="text-left">
              <h4 className="text-[14px] font-medium text-zinc-200 mb-1.5">Zero Training</h4>
              <p className="text-[13px] text-zinc-500 leading-relaxed">Your knowledge graph is yours alone. We explicitly opt out of all AI model training and never sell your data.</p>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
