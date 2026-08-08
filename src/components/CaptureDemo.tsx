'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StopCircle, Code, Share2, Link2, Rocket, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

// The words to type, with some marked as highlighted
const WORDS: { text: string; highlight?: boolean }[] = [
  { text: '"Just' }, { text: 'got' }, { text: 'out' }, { text: 'of' }, { text: 'a' },
  { text: 'meeting' }, { text: 'with' }, { text: 'Marcus.', highlight: true },
  { text: "We're" }, { text: 'pushing' }, { text: 'Atlas', highlight: true },
  { text: 'two' }, { text: 'weeks.' }, { text: 'Honestly,' },
  { text: "I'm" }, { text: 'relieved."', highlight: true },
];

const TYPING_SPEED = 200;
const PAUSE_BEFORE_TYPING = 1000;
const PAUSE_AFTER_TYPING = 1500;

const ENTITY_CHIPS = ['Marcus (Person)', 'Atlas (Project)', 'Decision (Delay)', 'Emotion (Relief)'];

export default function CaptureDemo() {
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
    const timer = setTimeout(() => setPhase('context'), 900);
    return () => clearTimeout(timer);
  }, [phase]);

  const isExpanded = phase === 'idle' || phase === 'typing';
  const showContext = phase === 'context';

  return (
    <div ref={sectionRef} className="w-full py-24 md:py-32 px-6 relative z-20 bg-[#050505] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-blue-500/[0.06] blur-[140px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <motion.section
        className="text-center max-w-3xl mx-auto flex flex-col gap-4 items-center mb-20 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease }}
      >
        <h2 className="text-[32px] md:text-[48px] font-medium text-white leading-[1.1] tracking-tight">
          Everything you tell it <br className="hidden md:block" />
          <span className="text-blue-500">becomes part of your story.</span>
        </h2>
        <p className="text-[#a1a1aa] text-[15px] md:text-[17px] max-w-xl leading-[1.6]">
          It doesn&apos;t just record; it comprehends. It links people, projects, and decisions automatically, building a deeply personal knowledge graph over time.
        </p>
      </motion.section>

      {/* Demo Section */}
      <section className="relative w-full max-w-[1100px] mx-auto z-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── LEFT COLUMN: Voice Input ── */}
          <motion.div
            className="relative flex flex-col gap-6"
            animate={{ flex: isExpanded ? '1 1 100%' : '1 1 0%' }}
            transition={{ duration: 0.8, ease }}
          >
            {/* Listening Card */}
            <div
              className={`bg-white/[0.03] backdrop-blur-xl rounded-2xl flex flex-col relative border border-white/10 shadow-[0_0_20px_rgba(59,130,246,0.05)] hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:border-blue-500/30 transition-all duration-700 group ${
                isExpanded ? 'p-10 md:p-12 gap-8' : 'p-8 gap-6'
              }`}
            >
              <div className="absolute -inset-1 bg-blue-500/20 blur-xl rounded-2xl z-[-1] opacity-50 group-hover:opacity-70 transition-opacity animate-pulse" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 h-6">
                    <span className="w-1.5 h-3 bg-blue-500 animate-pulse rounded-sm" />
                    <span className="w-1.5 h-6 bg-blue-500 animate-pulse rounded-sm" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1.5 h-5 bg-blue-500 animate-pulse rounded-sm" style={{ animationDelay: '0.4s' }} />
                    <span className="w-1.5 h-3 bg-blue-500 animate-pulse rounded-sm" style={{ animationDelay: '0.1s' }} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[12px] text-blue-500 uppercase tracking-widest leading-none">
                      {phase === 'typing' ? 'Listening...' : phase === 'idle' ? 'Ready' : 'Captured'}
                    </span>
                    <span className="font-mono text-[9px] text-blue-500/60 uppercase tracking-tighter mt-1.5">
                      System Status: {phase === 'typing' ? 'Processing' : phase === 'idle' ? 'Standby' : 'Complete'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  {phase === 'typing' && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  )}
                  <span className="font-mono text-[9px] text-blue-500/60 mt-1.5">EPOCH: 1715.42</span>
                </div>
              </div>

              {/* Typed text */}
              <div className={`text-white leading-relaxed font-medium min-h-[80px] transition-all duration-700 ${isExpanded ? 'text-xl md:text-2xl' : 'text-[15px] md:text-base'}`}>
                {WORDS.slice(0, wordIndex).map((word, i) => (
                  <React.Fragment key={i}>
                    {word.highlight ? (
                      <span className="text-blue-400 border-b border-blue-500/30 pb-0.5">{word.text}</span>
                    ) : (
                      <span>{word.text}</span>
                    )}
                    {' '}
                  </React.Fragment>
                ))}
                {phase === 'typing' && wordIndex < WORDS.length && (
                  <span className="inline-block w-[2px] h-[1.2em] bg-blue-500 animate-pulse align-text-bottom ml-0.5" />
                )}
              </div>

              <div className="flex gap-4 items-center border-t border-white/10 pt-5">
                <button className="text-sm font-medium text-black bg-white px-5 py-2.5 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2">
                  <StopCircle className="w-4 h-4" /> Stop Recording
                </button>
              </div>
            </div>

            {/* Entity chips — appear after context phase */}
            <AnimatePresence>
              {showContext && (
                <motion.div
                  className="flex flex-col gap-4 pl-4 border-l border-white/10 relative"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5, ease }}
                >
                  <div className="absolute -top-6 left-[-1px] w-px h-6 bg-gradient-to-b from-blue-500 to-white/10" />

                  <div className="font-mono text-[10px] text-white/50 flex items-center gap-2 mb-2 uppercase tracking-wider">
                    <Code className="w-3 h-3" />
                    <span>Extracting Entities</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {ENTITY_CHIPS.map((label, i) => (
                      <motion.div
                        key={label}
                        className="rounded-full px-3 py-1 border border-white/10 font-mono text-[11px] text-white/70 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/30 cursor-pointer flex items-center gap-2 transition-all"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + i * 0.1, duration: 0.4, ease }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {label}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── RIGHT COLUMN: Knowledge Graph ── */}
          <AnimatePresence>
            {showContext && (
              <motion.div
                className="flex-[1.5] relative z-10 flex flex-col pt-0"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease }}
              >
                {/* Connector lines */}
                <svg className="absolute top-1/2 -left-16 w-32 h-64 -translate-y-1/2 pointer-events-none hidden lg:block" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
                      <stop offset="50%" stopColor="rgba(59, 130, 246, 0.6)" />
                      <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                    </linearGradient>
                  </defs>
                  <path d="M 0,120 C 50,120 50,40 120,40" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1" />
                  <path d="M 0,120 C 50,120 50,40 120,40" fill="none" stroke="url(#flowGradient)" strokeDasharray="20 100" strokeWidth="1.5">
                    <animate attributeName="stroke-dashoffset" from="120" to="0" dur="3s" repeatCount="indefinite" />
                  </path>
                  <path d="M 0,120 C 50,120 50,200 120,200" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1" />
                  <path d="M 0,120 C 50,120 50,200 120,200" fill="none" stroke="url(#flowGradient)" strokeDasharray="20 100" strokeWidth="1.5">
                    <animate attributeName="stroke-dashoffset" from="120" to="0" dur="4s" repeatCount="indefinite" />
                  </path>
                </svg>

                <motion.div
                  className="font-mono text-[10px] text-white/50 flex items-center gap-2 mb-8 ml-0 lg:ml-8 uppercase tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <Share2 className="w-3 h-3" />
                  <span>Synthesizing Context</span>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                  {/* Marcus Node */}
                  <motion.div
                    className="bg-white/[0.02] border border-white/10 rounded-xl p-6 flex flex-col gap-4 transform transition-transform hover:scale-[1.02] cursor-default hover:border-blue-500/30 group"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.15, duration: 0.5, ease }}
                  >
                    <div className="flex justify-between items-start relative">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 font-mono text-sm group-hover:bg-blue-500/10 transition-colors">M</div>
                        <div>
                          <h4 className="text-[15px] font-medium text-white">Marcus Thorne</h4>
                          <span className="font-mono text-[10px] text-white/50">Lead Developer</span>
                        </div>
                      </div>
                      <Link2 className="w-4 h-4 text-blue-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5 text-[12px] text-white/60 italic leading-relaxed">
                      &quot;Last convo (3w ago): Marcus expressed concern about backend scalability for Atlas.&quot;
                    </div>
                  </motion.div>

                  {/* Atlas Node */}
                  <motion.div
                    className="bg-white/[0.02] border border-white/10 rounded-xl p-6 flex flex-col gap-4 transform transition-transform hover:scale-[1.02] cursor-default hover:border-blue-500/30 group"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5, ease }}
                  >
                    <div className="flex justify-between items-start relative">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                          <Rocket className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-[15px] font-medium text-white">Project Atlas</h4>
                          <span className="font-mono text-[10px] text-white/50">Active Initiative</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5 flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-white/50">Original Launch</span>
                        <span className="line-through text-white/30">Oct 12</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-blue-400">
                        <span>New Target</span>
                        <span>Oct 26 (+14d)</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Insight Node */}
                  <motion.div
                    className="rounded-xl p-6 flex flex-col gap-4 col-span-1 md:col-span-2 mt-2 bg-gradient-to-br from-blue-900/20 to-transparent border-t border-l border-blue-500/20 shadow-inner group relative overflow-hidden"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5, ease }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2" />
                    <div className="flex items-center gap-2 mb-1 relative z-10">
                      <Sparkles className="w-4 h-4 text-blue-500" />
                      <h4 className="font-mono text-[11px] text-blue-500 uppercase tracking-widest">System Inference</h4>
                    </div>
                    <p className="text-[14px] text-white/80 leading-relaxed relative z-10">
                      The decision to delay <strong className="font-medium text-white">Atlas</strong> aligns with <strong className="font-medium text-white">Marcus&apos;s</strong> previous technical concerns. Your recorded emotion (<em className="text-blue-400 not-italic">Relief</em>) suggests this delay resolves a significant unspoken pressure point.
                    </p>
                    <div className="mt-3 flex gap-3 relative z-10">
                      <button className="px-4 py-1.5 rounded-full border border-white/10 font-mono text-[10px] text-white/70 hover:bg-white/10 hover:text-white transition-colors uppercase tracking-wider">View Atlas Timeline</button>
                      <button className="px-4 py-1.5 rounded-full border border-white/10 font-mono text-[10px] text-white/70 hover:bg-white/10 hover:text-white transition-colors uppercase tracking-wider">Analyze Team Morale</button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
