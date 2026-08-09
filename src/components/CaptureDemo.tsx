'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StopCircle, Share2, Link2, Rocket, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Words to type live
const WORDS: { text: string; highlight?: boolean }[] = [
  { text: '"Just' }, { text: 'got' }, { text: 'out' }, { text: 'of' }, { text: 'a' },
  { text: 'meeting' }, { text: 'with' }, { text: 'Marcus.', highlight: true },
  { text: "We're" }, { text: 'pushing' }, { text: 'Atlas', highlight: true },
  { text: 'two' }, { text: 'weeks.' }, { text: 'Honestly,' },
  { text: "I'm" }, { text: 'relieved."', highlight: true },
];

const TYPING_SPEED = 210;
const PAUSE_BEFORE_TYPING = 250;
const PAUSE_AFTER_TYPING = 500;

interface CaptureDemoProps {
  onComplete?: () => void;
}

export default function CaptureDemo({ onComplete }: CaptureDemoProps) {
  const [phase, setPhase] = useState<'idle' | 'typing' | 'done' | 'context'>('idle');
  const [wordIndex, setWordIndex] = useState(0);
  const hasStarted = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const startAnimation = useCallback(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    setTimeout(() => setPhase('typing'), PAUSE_BEFORE_TYPING);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startAnimation();
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startAnimation]);

  useEffect(() => {
    if (phase !== 'typing') return;
    if (wordIndex >= WORDS.length) {
      const timer = setTimeout(() => setPhase('done'), PAUSE_AFTER_TYPING);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setWordIndex((i) => i + 1), TYPING_SPEED);
    return () => clearTimeout(timer);
  }, [phase, wordIndex]);

  useEffect(() => {
    if (phase !== 'done') return;
    const timer = setTimeout(() => {
      setPhase('context');
      if (onComplete) {
        setTimeout(onComplete, 400);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [phase, onComplete]);

  const showContext = phase === 'context';

  // Camera viewport transforms for cinematic zoom/pan effect
  const cameraVariants = {
    idle: { scale: 1, y: 0 },
    typing: { scale: 1.15, y: 30 },
    done: { scale: 1, y: 0 },
    context: { scale: 1.06, y: -120 },
  };

  return (
    <div ref={sectionRef} className="w-full py-24 md:py-32 px-6 relative z-20 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-cyan-600/[0.04] blur-[160px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <motion.section
        className="text-center max-w-2xl mx-auto flex flex-col gap-3 items-center mb-14 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease }}
      >
        <h2 className="text-[28px] md:text-[40px] font-medium text-white leading-[1.15] tracking-tight">
          Everything you tell it <br className="hidden md:block" />
          <span className="text-cyan-500">becomes part of your story.</span>
        </h2>
        <p className="text-[#a1a1aa] text-[14px] md:text-[15px] max-w-lg leading-[1.6]">
          It doesn&apos;t just record; it comprehends. It links people, projects, and decisions automatically, building a deeply personal knowledge graph over time.
        </p>
      </motion.section>

      {/* ── CINEMATIC CAMERA CONTAINER ── */}
      <motion.div
        className="relative w-full max-w-[860px] mx-auto z-10 origin-top"
        animate={phase}
        variants={cameraVariants}
        transition={{ duration: 0.9, ease }}
      >
        <div className="flex flex-col items-center gap-6">

          {/* ── STAGE 1: Centered Voice Input Card (Zoomed in during typing) ── */}
          <motion.div
            className="w-full max-w-[720px] bg-[#0d0e14]/90 backdrop-blur-2xl rounded-2xl flex flex-col relative border border-cyan-500/20 border-t-cyan-500/30 shadow-[0_0_35px_rgba(45,212,191,0.08)] p-6 md:p-8 gap-5 group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            {/* Ambient light bar */}
            <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

            {/* Card Top Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 h-5 px-0.5">
                  {[
                    { min: 5, max: 13, speed: 0.65, delay: 0 },
                    { min: 7, max: 16, speed: 0.8, delay: 0.12 },
                    { min: 4, max: 11, speed: 0.55, delay: 0.06 },
                    { min: 6, max: 14, speed: 0.75, delay: 0.18 },
                    { min: 5, max: 10, speed: 0.6, delay: 0.24 },
                  ].map((bar, i) => (
                    <motion.span
                      key={i}
                      className="w-[2.5px] bg-cyan-400/90 rounded-full shadow-[0_0_6px_rgba(45,212,191,0.5)]"
                      animate={
                        phase === 'typing'
                          ? { height: [bar.min, bar.max, bar.min] }
                          : { height: 4 }
                      }
                      transition={
                        phase === 'typing'
                          ? {
                              duration: bar.speed,
                              repeat: Infinity,
                              repeatType: 'reverse',
                              ease: 'easeInOut',
                              delay: bar.delay,
                            }
                          : { duration: 0.5 }
                      }
                    />
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-cyan-400 font-medium tracking-tight leading-none">
                    {phase === 'typing' ? 'Listening...' : phase === 'idle' ? 'Ready' : 'Captured'}
                  </span>
                  <span className="text-[11px] text-zinc-400 font-normal mt-0.5">
                    System Status: {phase === 'typing' ? 'Processing' : phase === 'idle' ? 'Standby' : 'Complete'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end">
                {phase === 'typing' && (
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                )}
                <span className="text-[11px] text-zinc-500 font-normal">Epoch: 1715.42</span>
              </div>
            </div>

            {/* Live Typed Text */}
            <div className="text-zinc-100 leading-relaxed font-normal tracking-tight text-lg md:text-xl min-h-[60px]">
              {WORDS.slice(0, wordIndex).map((word, i) => (
                <React.Fragment key={i}>
                  {word.highlight ? (
                    <span className="text-cyan-400 border-b border-cyan-500/40 pb-0.5 font-medium">{word.text}</span>
                  ) : (
                    <span>{word.text}</span>
                  )}
                  {' '}
                </React.Fragment>
              ))}
              {phase === 'typing' && wordIndex < WORDS.length && (
                <span className="inline-block w-[2px] h-[1.1em] bg-cyan-400 animate-pulse align-text-bottom ml-0.5" />
              )}
            </div>

            {/* Card Footer */}
            <div className="flex gap-4 items-center justify-between border-t border-white/[0.08] pt-4">
              <button className="text-[12px] font-medium text-zinc-950 bg-white hover:bg-zinc-200 px-3.5 py-1.5 rounded-full transition-all shadow-sm flex items-center gap-1.5">
                <StopCircle className="w-3.5 h-3.5" /> Stop Recording
              </button>

              {phase === 'typing' && (
                <span className="text-[12px] text-cyan-400/80 animate-pulse font-normal">Extracting entities...</span>
              )}
            </div>
          </motion.div>

          {/* ── STAGE 2 & 3: Branch Line & Knowledge Graph Cards ── */}
          <AnimatePresence>
            {showContext && (
              <motion.div
                className="flex flex-col items-center w-full"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.6, ease }}
              >
                {/* Vertical Branch Line */}
                <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500/60 via-cyan-500/30 to-transparent relative my-1">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-cyan-400 absolute left-[-2px]"
                    animate={{ y: [0, 44] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>

                {/* Synthesizing Context Label */}
                <motion.div
                  className="text-[11.5px] text-zinc-300 font-medium flex items-center gap-1.5 my-3 bg-[#0d0e14] px-3.5 py-1.5 rounded-full border border-white/[0.08]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Synthesizing Context</span>
                </motion.div>

                {/* Knowledge Graph Cards Below */}
                <div className="w-full flex flex-col gap-4 mt-2">
                  {/* Top Row: Marcus Thorne & Project Atlas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Marcus Node */}
                    <motion.div
                      className="bg-[#0b0d14]/90 backdrop-blur-xl border border-white/[0.08] border-t-white/[0.14] rounded-2xl p-5 flex flex-col gap-3 shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:border-white/[0.18] transition-all group"
                      initial={{ opacity: 0, y: 20, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.5, ease }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-cyan-400 text-xs font-medium group-hover:bg-cyan-500/10 transition-colors">
                            M
                          </div>
                          <div>
                            <h4 className="text-[14px] font-medium text-zinc-100">Marcus Thorne</h4>
                            <span className="text-[11px] text-zinc-400 font-normal">Lead Developer</span>
                          </div>
                        </div>
                        <Link2 className="w-3.5 h-3.5 text-cyan-400/60 group-hover:text-cyan-400 transition-colors" />
                      </div>
                      <div className="bg-zinc-950/70 rounded-xl p-2.5 border border-white/[0.05] text-[12px] text-zinc-400 italic leading-relaxed">
                        &quot;Last convo (3w ago): Marcus expressed concern about backend scalability for Atlas.&quot;
                      </div>
                    </motion.div>

                    {/* Atlas Node */}
                    <motion.div
                      className="bg-[#0b0d14]/90 backdrop-blur-xl border border-white/[0.08] border-t-white/[0.14] rounded-2xl p-5 flex flex-col gap-3 shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:border-white/[0.18] transition-all group"
                      initial={{ opacity: 0, y: 20, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.45, duration: 0.5, ease }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                            <Rocket className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <h4 className="text-[14px] font-medium text-zinc-100">Project Atlas</h4>
                            <span className="text-[11px] text-zinc-400 font-normal">Active Initiative</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-zinc-950/70 rounded-xl p-2.5 border border-white/[0.05] flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-[11.5px]">
                          <span className="text-zinc-400">Original Launch</span>
                          <span className="line-through text-zinc-500">Oct 12</span>
                        </div>
                        <div className="flex items-center justify-between text-[11.5px] text-cyan-400">
                          <span className="font-medium">New Target</span>
                          <span className="font-semibold">Oct 26 (+14d)</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Bottom Full-Width Row: System Inference */}
                  <motion.div
                    className="rounded-2xl p-5 md:p-6 flex flex-col gap-3 bg-gradient-to-br from-cyan-950/20 via-[#0c0e17] to-[#080a10] border border-cyan-500/20 border-t-cyan-500/30 shadow-[0_10px_32px_rgba(0,0,0,0.6)] relative overflow-hidden group"
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.5, ease }}
                  >
                    <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/[0.08] blur-[45px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                    <div className="flex items-center gap-2 relative z-10">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-xs font-medium text-cyan-400 tracking-tight">System Inference</h4>
                    </div>

                    <p className="text-[13.5px] text-zinc-300 leading-relaxed relative z-10">
                      The decision to delay <strong className="font-medium text-white">Atlas</strong> aligns with <strong className="font-medium text-white">Marcus&apos;s</strong> previous technical concerns. Your recorded emotion (<em className="text-cyan-400 not-italic font-medium">Relief</em>) suggests this delay resolves a significant unspoken pressure point.
                    </p>

                    <div className="mt-1 flex flex-wrap gap-2 relative z-10">
                      <button className="px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-zinc-300 hover:text-white transition-all font-medium">
                        View Atlas Timeline
                      </button>
                      <button className="px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-zinc-300 hover:text-white transition-all font-medium">
                        Analyze Team Morale
                      </button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
