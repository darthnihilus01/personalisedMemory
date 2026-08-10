'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, Calendar, Link2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

type InstanceType = 'investor' | 'personal';

interface InstanceData {
  id: InstanceType;
  title: string;
  time: string;
  dateStr: string;
  compiledText: React.ReactNode;
  connections: string[];
  words: { text: string; highlight?: boolean }[];
}

const INSTANCES: Record<InstanceType, InstanceData> = {
  investor: {
    id: 'investor',
    title: 'Investor Call',
    time: '3:45 PM',
    dateStr: 'Aug 9, 2026',
    compiledText: (
      <>
        &ldquo;Call with <strong className="font-medium text-white">Marcus</strong> from <strong className="font-medium text-white">Solstice Capital</strong> about the investment. Was nervous going in, but it went really well — feels like a weight lifted.&rdquo;
      </>
    ),
    connections: ['Marcus', 'Solstice Capital'],
    words: [
      { text: '"So' }, { text: 'today,' }, { text: 'I' }, { text: 'had' }, { text: 'a' },
      { text: 'call' }, { text: 'with' }, { text: 'Alicia' },
      { text: '—' }, { text: 'oh' }, { text: 'sorry,' },
      { text: 'Marcus', highlight: true }, { text: '—' }, { text: 'from' },
      { text: 'Solstice', highlight: true }, { text: 'Capital', highlight: true },
      { text: 'about' }, { text: 'the' }, { text: 'investment.' },
      { text: 'Honestly' }, { text: 'was' }, { text: 'pretty' }, { text: 'nervous' },
      { text: 'going' }, { text: 'in,' }, { text: 'but' }, { text: 'it' }, { text: 'went' },
      { text: 'really' }, { text: 'well,' },
      { text: 'I' }, { text: 'think' }, { text: "they're" }, { text: 'actually' },
      { text: 'interested' }, { text: 'this' }, { text: 'time.' },
      { text: 'Feels' }, { text: 'like' }, { text: 'a' }, { text: 'weight' },
      { text: 'off,' }, { text: 'to' }, { text: 'be' }, { text: 'honest."' },
    ],
  },
  personal: {
    id: 'personal',
    title: 'Personal',
    time: '7:20 PM',
    dateStr: 'Aug 9, 2026',
    compiledText: (
      <>
        &ldquo;Caught up with <strong className="font-medium text-white">Priya</strong> at <strong className="font-medium text-white">California Burrito</strong> today. Didn&apos;t realize how much I&apos;d missed her until we were sitting there again — felt like no time had passed.&rdquo;
      </>
    ),
    connections: ['Priya', 'California Burrito'],
    words: [
      { text: '"Caught' }, { text: 'up' }, { text: 'with' },
      { text: 'Priya', highlight: true }, { text: 'today' }, { text: 'after' }, { text: 'two' }, { text: 'years' }, { text: '—' },
      { text: 'stopped' }, { text: 'by' }, { text: 'my' }, { text: 'favorite' }, { text: 'place' }, { text: 'as' }, { text: 'always,' },
      { text: 'California', highlight: true }, { text: 'Burrito.', highlight: true },
      { text: 'It' }, { text: 'was' }, { text: 'so' }, { text: 'good' }, { text: 'to' }, { text: 'see' }, { text: 'her,' },
      { text: 'honestly' }, { text: "didn't" }, { text: 'realize' }, { text: 'how' }, { text: 'much' },
      { text: "I'd" }, { text: 'missed' }, { text: 'her' }, { text: 'until' }, { text: 'we' }, { text: 'were' },
      { text: 'sitting' }, { text: 'there' }, { text: 'again.' },
      { text: 'Felt' }, { text: 'like' }, { text: 'no' }, { text: 'time' }, { text: 'had' }, { text: 'passed."' },
    ],
  },
};

const TYPING_SPEED = 80;
const PAUSE_BEFORE_TYPING = 200;

interface CaptureDemoProps {
  onComplete?: () => void;
}

type Phase = 'idle' | 'typing' | 'done' | 'shift_up' | 'compiling' | 'compiled';

export default function CaptureDemo({ onComplete }: CaptureDemoProps) {
  const [activeInstance, setActiveInstance] = useState<InstanceType>('investor');
  const [phase, setPhase] = useState<Phase>('idle');
  const [wordIndex, setWordIndex] = useState(0);
  const hasStarted = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const startAnimation = useCallback(() => {
    setPhase('idle');
    setWordIndex(0);
    setTimeout(() => setPhase('typing'), PAUSE_BEFORE_TYPING);
  }, []);

  // Intersection Observer for initial play
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startAnimation]);

  const handleToggle = (instance: InstanceType) => {
    if (activeInstance === instance) return;
    setActiveInstance(instance);
    startAnimation();
  };

  const data = INSTANCES[activeInstance];

  // Sequence Effect
  useEffect(() => {
    if (phase === 'typing') {
      if (wordIndex >= data.words.length) {
        const timer = setTimeout(() => setPhase('done'), 500);
        return () => clearTimeout(timer);
      }
      const timer = setTimeout(() => setWordIndex((i) => i + 1), TYPING_SPEED);
      return () => clearTimeout(timer);
    }
    if (phase === 'done') {
      const timer = setTimeout(() => setPhase('shift_up'), 300);
      return () => clearTimeout(timer);
    }
    if (phase === 'shift_up') {
      const timer = setTimeout(() => setPhase('compiling'), 400);
      return () => clearTimeout(timer);
    }
    if (phase === 'compiling') {
      const timer = setTimeout(() => {
        setPhase('compiled');
        if (onComplete) {
          setTimeout(onComplete, 500);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase, wordIndex, data.words.length, onComplete, activeInstance]);

  // Enter to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && phase !== 'compiled') {
        setPhase('compiled');
        setWordIndex(data.words.length);
        if (onComplete) {
          onComplete();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, data.words.length, onComplete]);

  const showCompiled = ['compiling', 'compiled'].includes(phase);
  const isFullyCompiled = phase === 'compiled';

  const cameraVariants = {
    idle: { y: 0 },
    typing: { y: 0 },
    done: { y: 0 },
    shift_up: { y: -28 },
    compiling: { y: -28 },
    compiled: { y: -28 },
  };

  return (
    <div ref={sectionRef} className="w-full py-24 md:py-32 px-6 relative z-20">
      
      {/* ── SECTION HEADER ── */}
      <motion.section
        className="text-center max-w-[1200px] mx-auto flex flex-col gap-3 items-center mb-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease }}
      >
        <h2 className="font-display w-full text-[32px] sm:text-[48px] md:text-[56px] font-medium leading-[1.1] tracking-tight md:whitespace-nowrap">
          <span className="text-white">Everything you tell it</span> <br className="hidden md:block" />
          <span className="text-gradient-cyan">becomes part of your story.</span>
        </h2>
        <p className="text-[#a1a1aa] text-[14px] md:text-[15px] max-w-lg leading-[1.6]">
          Talk naturally — stumble, correct yourself, ramble. Lattice listens through the noise and compiles your raw thoughts into clean, structured memory.
        </p>
      </motion.section>

      {/* ── GLOBAL SKIP HINT ── */}
      <AnimatePresence>
        {!isFullyCompiled && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 text-[10px] text-zinc-500 bg-black/40 px-3 py-1.5 rounded-full border border-white/[0.05] backdrop-blur-md flex items-center gap-1.5 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            Press <span className="font-mono text-zinc-400 bg-white/[0.05] px-1 py-0.5 rounded">Enter</span> to skip
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── INSTANCE TOGGLE ── */}
      <div className="flex justify-center mb-12 relative z-30 px-2 max-w-full">
        <div className="flex items-center bg-[#0d0e14] border border-white/[0.08] rounded-full p-1 shadow-sm overflow-x-auto">
          {(Object.keys(INSTANCES) as InstanceType[]).map((key) => {
            const isActive = activeInstance === key;
            return (
              <button
                key={key}
                onClick={() => handleToggle(key)}
                className={`px-4 py-2 text-[12px] font-medium rounded-full transition-all flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${
                  isActive 
                    ? 'bg-zinc-800/80 text-white shadow-sm border border-white/[0.05]' 
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span className="font-mono text-[10px] opacity-70">{INSTANCES[key].time}</span>
                {INSTANCES[key].title}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── STAGE CONTAINER ── */}
      <motion.div
        className="relative w-full max-w-[760px] mx-auto z-10 min-h-[500px]"
        animate={phase}
        variants={cameraVariants}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="flex flex-col items-center gap-6">

          {/* ── STAGE 1: Voice Input Card ── */}
          <motion.div
            className="w-full bg-[#0d0e14] rounded-2xl flex flex-col border border-white/[0.08] p-4 sm:p-6 md:p-8 gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 h-5">
                  {[
                    { min: 4, max: 12, speed: 0.65 },
                    { min: 6, max: 16, speed: 0.8 },
                    { min: 4, max: 10, speed: 0.55 },
                    { min: 5, max: 14, speed: 0.75 },
                    { min: 4, max: 9, speed: 0.6 },
                  ].map((bar, i) => (
                    <motion.span
                      key={i}
                      className="w-[2.5px] bg-zinc-400 rounded-full"
                      animate={
                        phase === 'typing'
                          ? { height: [bar.min, bar.max, bar.min] }
                          : { height: 4 }
                      }
                      transition={
                        phase === 'typing'
                          ? { duration: bar.speed, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
                          : { duration: 0.5 }
                      }
                    />
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-300 font-medium tracking-tight">
                    {phase === 'typing' ? 'Capturing…' : 'Voice Note'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-zinc-500 font-mono">
                {data.time}
              </div>
            </div>

            {/* Live Typed Text */}
            <div className="text-zinc-300 leading-relaxed font-normal tracking-tight text-[15px] md:text-[17px] min-h-[80px]">
              {data.words.slice(0, wordIndex).map((word, i) => (
                <React.Fragment key={i}>
                  {word.highlight ? (
                    <span className="text-white font-medium border-b border-zinc-700 pb-[1px]">{word.text}</span>
                  ) : (
                    <span>{word.text}</span>
                  )}
                  {' '}
                </React.Fragment>
              ))}
              {phase === 'typing' && wordIndex < data.words.length && (
                <span className="inline-block w-[2px] h-[1em] bg-zinc-400 animate-pulse align-middle ml-0.5" />
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/[0.04] pt-4">
              <div className="text-[12px] font-medium text-zinc-500 flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5" /> 
                {phase === 'typing' ? 'Recording' : 'Done'}
              </div>
            </div>
          </motion.div>

          {/* ── STAGE 2: Compiled Entry ── */}
          <AnimatePresence>
            {showCompiled && (
              <motion.div
                className="flex flex-col items-center w-full"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              >
                {/* Minimal connector line */}
                <div className="w-[1px] h-8 bg-zinc-800 my-1 relative overflow-hidden">
                  <motion.div
                    className="w-full h-full bg-zinc-400 absolute top-0"
                    initial={{ y: '-100%' }}
                    animate={isFullyCompiled ? { y: '100%' } : { y: '0%' }}
                    transition={{ duration: 0.6 }}
                  />
                </div>

                <AnimatePresence>
                  {isFullyCompiled && (
                    <motion.div
                      className="w-full bg-[#08090d] rounded-2xl p-6 border border-white/[0.06] flex flex-col gap-4 mt-2"
                      initial={{ opacity: 0, y: 20, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 100, damping: 18 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-zinc-500 text-[11px] font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{data.dateStr} — {data.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link2 className="w-3.5 h-3.5 text-zinc-600" />
                        <div className="flex items-center gap-1.5 text-[11px]">
                          {data.connections.map((conn, idx) => (
                            <React.Fragment key={conn}>
                              <span className="text-zinc-300 font-medium bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.05]">
                                {conn}
                              </span>
                              {idx < data.connections.length - 1 && <span className="text-zinc-600">·</span>}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      <p className="text-[14px] md:text-[15px] text-zinc-300 leading-relaxed">
                        {data.compiledText}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>

      {/* ── FULL DAY COMPILED ENTRY (ALWAYS VISIBLE AT BOTTOM) ── */}
      <AnimatePresence>
        {isFullyCompiled && (
          <motion.div 
            className="w-full max-w-[800px] mx-auto mt-16 pb-12 z-20 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="w-full bg-[#0a0b10] border border-white/[0.06] rounded-2xl p-6 md:p-8 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-white/[0.04] pb-4 mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-zinc-400" />
                  <h4 className="text-[13px] font-medium text-zinc-200 tracking-tight">Full Day Summary</h4>
                </div>
                <div className="flex items-center gap-2 text-zinc-500 text-[12px]">
                  <Calendar className="w-3.5 h-3.5" /><span>Aug 9, 2026</span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Link2 className="w-3.5 h-3.5 text-zinc-600" />
                {['Marcus', 'Solstice Capital', 'Priya', 'California Burrito'].map((e) => (
                  <span key={e} className="text-[11px] text-zinc-400 font-medium bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.05]">{e}</span>
                ))}
              </div>

              <p className="text-[14px] md:text-[15px] text-zinc-300 leading-[1.7]">
                &ldquo;Today started with a call with <strong className="font-medium text-zinc-100">Marcus</strong> from <strong className="font-medium text-zinc-100">Solstice Capital</strong> about the investment. I was honestly nervous going in, but it went really well — felt like a weight lifted. Later on, I caught up with <strong className="font-medium text-zinc-100">Priya</strong> after two years. We stopped by my favorite spot, <strong className="font-medium text-zinc-100">California Burrito</strong>, like always, and it hit me sitting there just how much I&apos;d missed her — no time had passed at all. Good day overall — relief on one end, and a reminder of how some friendships just don&apos;t change.&rdquo;
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
