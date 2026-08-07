"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import LivingWorldModelCanvas from "./LivingWorldModelCanvas";

interface HeroSectionProps {
  onScrollToWaitlist: () => void;
}

export default function HeroSection({ onScrollToWaitlist }: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden radial-glow">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-purple-900/15 via-indigo-900/10 to-amber-900/0 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          {/* Category Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-white/10 text-xs font-mono tracking-wider uppercase text-purple-300/90 mb-8 shadow-inner"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span>Introducing The World's First Personal Memory Engine</span>
          </motion.div>

          {/* Main Philosophical Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-[1.08] mb-8 font-sans"
          >
            Your life isn't made of conversations.{" "}
            <span className="font-serif italic font-normal text-gradient-purple block sm:inline">
              It's made of context.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/60 font-normal leading-relaxed max-w-2xl mx-auto mb-10"
          >
            AI remembers chats. We remember your world. Every voice note,
            meeting, relationship, and project updates a continuous, living
            model of your life.
          </motion.p>

          {/* Single Focused CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={onScrollToWaitlist}
              id="hero-cta-waitlist"
              className="group relative inline-flex items-center gap-3 bg-white text-black font-medium px-8 py-4 rounded-full text-base shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:shadow-[0_0_60px_rgba(168,85,247,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Join the Waitlist</span>
              <ArrowRight className="w-4 h-4 text-black/70 group-hover:text-black group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </motion.div>

          {/* Core Stance / Guarantee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-6 flex items-center justify-center gap-6 text-xs font-mono text-white/40 uppercase tracking-widest"
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Private & Encrypted
            </span>
            <span>•</span>
            <span>Founding Access Only</span>
          </motion.div>
        </div>

        {/* Dynamic World Model Visual Canvas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full max-w-5xl mx-auto"
        >
          <LivingWorldModelCanvas />
        </motion.div>
      </div>
    </section>
  );
}
