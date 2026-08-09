"use client";

import { motion } from "framer-motion";
import { Mic, ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onScrollToWaitlist: () => void;
  onScrollToContent: () => void;
}

export default function HeroSection({ onScrollToWaitlist, onScrollToContent }: HeroSectionProps) {
  return (
    <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 overflow-hidden radial-glow-hero">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Tagline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-[1.08] mb-8 font-sans"
        >
          Never lose the thread{" "}
          <span className="font-serif italic font-normal text-gradient-cyan">
            of your life.
          </span>
        </motion.h1>

        {/* Supporting line */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-base sm:text-lg text-slate-300/80 font-normal leading-relaxed max-w-2xl mx-auto mb-14"
        >
          A personal memory engine that connects the people, moments,
          decisions, and stories that make up your life — so you never have to
          reconstruct the context again.
        </motion.p>

        {/* Mic visual */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          onClick={onScrollToWaitlist}
          id="hero-mic-button"
          aria-label="Press to talk"
          className="relative mx-auto mb-14 group"
        >
          <span className="absolute inset-0 rounded-full bg-cyan-500/25 blur-2xl group-hover:bg-cyan-500/40 transition-all" />
          <span className="absolute -inset-3 rounded-full border border-cyan-400/30 animate-pulse-slow" />
          <span className="absolute -inset-7 rounded-full border border-cyan-400/15 animate-pulse-slower" />
          <span className="relative w-24 h-24 rounded-full glass-pill-cyan flex items-center justify-center text-cyan-200 shadow-xl shadow-cyan-900/40 group-hover:text-white group-hover:scale-105 transition-all duration-300">
            <Mic className="w-9 h-9" />
          </span>
        </motion.button>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          <button
            onClick={onScrollToWaitlist}
            id="hero-cta-waitlist"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 btn-white-glow font-medium px-8 py-3.5 rounded-full text-sm"
          >
            <span>Join the waitlist</span>
            <ChevronDown className="w-4 h-4 text-black/70" />
          </button>

          <button
            onClick={onScrollToContent}
            id="hero-cta-content"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/10 text-white font-mono text-xs px-6 py-3.5 rounded-full border border-white/15 transition-all"
          >
            <span>See how it works</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
