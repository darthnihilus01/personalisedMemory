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
    <section className="relative pt-32 pb-16 md:pt-44 md:pb-28 overflow-hidden radial-glow-hero">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          {/* Category Pill matching image */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill-purple text-xs font-mono tracking-wider uppercase text-purple-300 mb-8 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span>Introducing The World's First Personal Memory Engine</span>
          </motion.div>

          {/* Main Philosophical Headline matching image */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-[1.08] mb-8 font-sans"
          >
            Your life isn't made of conversations.{" "}
            <span className="font-serif italic font-normal text-gradient-purple block sm:inline">
              It's made of context.
            </span>
          </motion.h1>

          {/* Subtitle matching image */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300/80 font-normal leading-relaxed max-w-2xl mx-auto mb-10"
          >
            AI remembers chats. We remember your world. Every voice note,
            meeting, relationship, and project updates a continuous, living model of your life.
          </motion.p>

          {/* Actions - Glowing White Button matching image */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5"
          >
            <button
              onClick={onScrollToWaitlist}
              id="hero-cta-waitlist"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 btn-white-glow font-medium px-8 py-3.5 rounded-full text-sm"
            >
              <span>Join the Waitlist</span>
              <ArrowRight className="w-4 h-4 text-black/70" />
            </button>

            <button
              onClick={onOpenWorkspace}
              id="hero-cta-workspace"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/10 text-white font-mono text-xs px-6 py-3.5 rounded-full border border-white/15 transition-all"
            >
              <Layout className="w-4 h-4 text-purple-400" />
              <span>Try Live Workspace</span>
            </button>
          </motion.div>

          {/* Green Security Stance matching image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex items-center justify-center gap-4 text-xs font-mono text-slate-400 uppercase tracking-widest"
          >
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>PRIVATE & ENCRYPTED</span>
            </span>
            <span>•</span>
            <span>FOUNDING ACCESS ONLY</span>
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
