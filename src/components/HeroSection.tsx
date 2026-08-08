"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Layout } from "lucide-react";
import LivingWorldModelCanvas from "./LivingWorldModelCanvas";

interface HeroSectionProps {
  onScrollToWaitlist: () => void;
  onOpenWorkspace: () => void;
}

export default function HeroSection({ onScrollToWaitlist, onOpenWorkspace }: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          {/* Quiet Category Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-wider uppercase text-amber-300/80 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>The World's First Personal Memory Engine</span>
          </motion.div>

          {/* Main Philosophical Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-[1.08] mb-8 font-sans"
          >
            Your life isn't made of conversations.{" "}
            <span className="font-serif italic font-normal text-amber-200/90 block sm:inline">
              It's made of context.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-white/60 font-normal leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Instead of remembering chats, we remember your world. Every voice note,
            meeting, relationship, and project updates a continuous, living model of your life.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              onClick={onScrollToWaitlist}
              id="hero-cta-waitlist"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-black font-medium px-7 py-3.5 rounded-full text-sm transition-all"
            >
              <span>Join the Waitlist</span>
              <ArrowRight className="w-4 h-4 text-black/70" />
            </button>

            <button
              onClick={onOpenWorkspace}
              id="hero-cta-workspace"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/[0.05] hover:bg-white/10 text-white font-mono text-xs px-6 py-3.5 rounded-full border border-white/10 transition-all"
            >
              <Layout className="w-4 h-4 text-amber-400/90" />
              <span>Try Live Workspace</span>
            </button>
          </motion.div>

          {/* Privacy Guarantee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 flex items-center justify-center gap-4 text-xs font-mono text-white/40 uppercase tracking-widest"
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Private & Encrypted
            </span>
            <span>•</span>
            <span>Zero Manual Tagging</span>
          </motion.div>
        </div>

        {/* Dynamic World Model Visual Canvas */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="w-full max-w-5xl mx-auto"
        >
          <LivingWorldModelCanvas />
        </motion.div>
      </div>
    </section>
  );
}
