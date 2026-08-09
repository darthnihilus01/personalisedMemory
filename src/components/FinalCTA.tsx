'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Zap, Search, User, Rocket, MessageSquare, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ObsidianGraph from './ObsidianGraph';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const SEARCH_QUERY = 'Marcus';
const TYPING_SPEED = 160;

interface FinalCTAProps {
  isUnlocked?: boolean;
  onComplete?: () => void;
}

export default function FinalCTA({ isUnlocked = true, onComplete }: FinalCTAProps) {
  // Strict sequential state phases
  const [phase, setPhase] = useState<
    | 'centered_graph'
    | 'shifting_graph'
    | 'search_bar_enter'
    | 'typing'
    | 'search_executing'
    | 'result_1'
    | 'result_2'
    | 'result_3'
  >('centered_graph');

  const [typedText, setTypedText] = useState('');
  const hasStarted = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const startSequence = useCallback(() => {
    if (hasStarted.current || !isUnlocked) return;
    hasStarted.current = true;

    // STEP 1: Pause 2.5 seconds on centered graph, then shift graph to left
    setTimeout(() => {
      setPhase('shifting_graph');
    }, 2500);
  }, [isUnlocked]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startSequence();
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startSequence]);

  // STEP 2: After graph shifts (800ms), introduce Search Bar
  useEffect(() => {
    if (phase === 'shifting_graph') {
      const timer = setTimeout(() => {
        setPhase('search_bar_enter');
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // STEP 3: After search bar settles (500ms), start typing "Marcus"
  useEffect(() => {
    if (phase === 'search_bar_enter') {
      const timer = setTimeout(() => {
        setPhase('typing');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // STEP 4: Live character typing
  useEffect(() => {
    if (phase !== 'typing') return;
    if (typedText.length < SEARCH_QUERY.length) {
      const timer = setTimeout(() => {
        setTypedText(SEARCH_QUERY.slice(0, typedText.length + 1));
      }, TYPING_SPEED);
      return () => clearTimeout(timer);
    } else {
      // STEP 5: AFTER typing full "Marcus" completes, execute search
      const timer = setTimeout(() => {
        setPhase('search_executing');
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [phase, typedText]);

  // STEP 6: Reveal results ONE BY ONE sequentially
  useEffect(() => {
    if (phase === 'search_executing') {
      const timer = setTimeout(() => setPhase('result_1'), 400);
      return () => clearTimeout(timer);
    }
    if (phase === 'result_1') {
      const timer = setTimeout(() => setPhase('result_2'), 550);
      return () => clearTimeout(timer);
    }
    if (phase === 'result_2') {
      const timer = setTimeout(() => setPhase('result_3'), 550);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // STEP 7: After all results revealed, notify parent to unlock Waitlist
  useEffect(() => {
    if (phase === 'result_3' && onComplete) {
      const timer = setTimeout(onComplete, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  const isShifted = phase !== 'centered_graph';
  const showSearchBar = phase !== 'centered_graph' && phase !== 'shifting_graph';

  // Count how many results are currently revealed
  const revealedCount =
    phase === 'result_1' ? 1 : phase === 'result_2' ? 2 : phase === 'result_3' ? 3 : 0;
  const showResultsCard = revealedCount > 0;

  if (!isUnlocked) {
    return null;
  }

  return (
    <motion.div
      ref={sectionRef}
      className="w-full relative z-20 text-white pt-24 pb-16 px-6 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease }}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-cyan-600/[0.04] blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">

        {/* Top Tag */}
        <motion.div
          className="text-xs text-cyan-400 font-medium tracking-tight mb-4 flex items-center gap-2 bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>PERSONAL KNOWLEDGE GRAPH</span>
        </motion.div>

        {/* Main Headlines */}
        <motion.h2
          className="text-[32px] sm:text-[44px] md:text-[56px] font-medium text-white leading-[1.1] tracking-tight mb-4 max-w-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          Not another place to store your life.
        </motion.h2>

        <motion.h3
          className="text-[32px] sm:text-[44px] md:text-[56px] font-medium leading-[1.1] tracking-tight text-cyan-500 mb-8 max-w-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          A memory that grows with it.
        </motion.h3>

        {/* ── STAGE CONTAINER ── */}
        <div className="w-full relative min-h-[640px] flex flex-col items-center justify-center">

          {/* SEARCH BAR FLOATS ON TOP OF GRAPH */}
          <AnimatePresence>
            {showSearchBar && (
              <motion.div
                className="absolute top-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-[480px] px-4"
                initial={{ opacity: 0, y: -25, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease }}
              >
                <div className="w-full bg-[#050914]/95 backdrop-blur-2xl border border-cyan-500/40 rounded-full p-2.5 pl-5 pr-3 shadow-[0_10px_40px_rgba(0,0,0,0.9)] flex items-center justify-between group">
                  <div className="flex items-center gap-3 flex-1">
                    <Search className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <div className="text-sm text-zinc-100 font-medium flex items-center">
                      <span>{typedText}</span>
                      {phase === 'typing' && (
                        <span className="inline-block w-[2px] h-[1.1em] bg-cyan-400 animate-pulse ml-0.5" />
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-zinc-400 bg-white/[0.08] px-2.5 py-1 rounded-full border border-white/10">
                    ⌘K
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* RESULTS CARD FLOATS ON THE SIDE (ONLY AFTER TYPING "MARCUS") */}
          <AnimatePresence>
            {showResultsCard && (
              <motion.div
                className="absolute right-2 sm:right-6 top-24 z-40 w-full max-w-[420px] px-4 sm:px-0"
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.5, ease }}
              >
                <div className="w-full bg-[#050914]/95 backdrop-blur-2xl border border-white/[0.12] rounded-2xl p-4 shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex flex-col gap-2.5 relative overflow-hidden">
                  {/* Top Status Header */}
                  <div className="flex items-center justify-between px-2 pb-2 border-b border-white/[0.06] text-[11.5px] text-zinc-400 font-medium">
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{revealedCount} Linked Entities Found</span>
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">CONFIDENCE: 98%</span>
                  </div>

                  {/* Result 1: Marcus Thorne (Appears First) - Cyan */}
                  {revealedCount >= 1 && (
                    <motion.div
                      className="p-3.5 rounded-xl bg-white/[0.04] hover:bg-cyan-500/10 border border-white/[0.06] hover:border-cyan-500/30 transition-all flex items-center justify-between cursor-pointer group"
                      initial={{ opacity: 0, y: 15, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4, ease }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-medium text-xs">
                          <User className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-[13.5px] font-medium text-zinc-100 group-hover:text-cyan-400 transition-colors">
                            Marcus Thorne
                          </span>
                          <span className="text-[11px] text-zinc-400">Lead Developer • 14 Linked Convos</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                    </motion.div>
                  )}

                  {/* Result 2: Project Atlas (Appears Second) - Sky */}
                  {revealedCount >= 2 && (
                    <motion.div
                      className="p-3.5 rounded-xl bg-white/[0.04] hover:bg-sky-500/10 border border-white/[0.06] hover:border-sky-500/30 transition-all flex items-center justify-between cursor-pointer group"
                      initial={{ opacity: 0, y: 15, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4, ease }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 text-xs">
                          <Rocket className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-[13.5px] font-medium text-zinc-100 group-hover:text-sky-400 transition-colors">
                            Project Atlas
                          </span>
                          <span className="text-[11px] text-zinc-400">Initiative • Collaborating with Marcus</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all" />
                    </motion.div>
                  )}

                  {/* Result 3: Backend Scalability Concern (Appears Third) - Teal */}
                  {revealedCount >= 3 && (
                    <motion.div
                      className="p-3.5 rounded-xl bg-white/[0.04] hover:bg-teal-500/10 border border-white/[0.06] hover:border-teal-500/30 transition-all flex items-center justify-between cursor-pointer group"
                      initial={{ opacity: 0, y: 15, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4, ease }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 text-xs">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-[13.5px] font-medium text-zinc-100 group-hover:text-teal-400 transition-colors">
                            Backend Scalability Concern
                          </span>
                          <span className="text-[11px] text-zinc-400 font-normal">Raw Observation • 3 weeks ago</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* OBSIDIAN GRAPH (Pass revealedCount to pulse nodes sequentially) */}
          <div className="w-full">
            <ObsidianGraph isShifted={isShifted} revealedCount={revealedCount} />
          </div>

        </div>

        {/* Footer Navigation */}
        <footer className="w-full pt-16 border-t border-white/[0.06] mt-20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold tracking-tight text-white">PERSONAL MEMORY ENGINE</span>
            <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full font-mono">v1.0</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Twitter / X</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#waitlist" className="hover:text-white transition-colors">Waitlist</a>
          </div>

          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Personal Memory Engine. All rights reserved.
          </p>
        </footer>

      </div>
    </motion.div>
  );
}
