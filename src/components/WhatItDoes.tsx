"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mic, Sparkles } from "lucide-react";

const EXAMPLE_TEXT =
  "Hey journal — today I hosted a get-together with my friends. It was really fun, we hadn't all been in the same room in months.";

export default function WhatItDoes() {
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTyped((prev) => {
        if (prev >= EXAMPLE_TEXT.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 28);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="what-it-does" className="py-24 md:py-32 relative bg-[#09090b] border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex items-center justify-center"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-widest text-amber-300/80">
            <Sparkles className="w-3.5 h-3.5" />
            <span>What it does</span>
          </span>
        </motion.div>

        {/* Voice note, transcribed live */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="panel-quiet p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl"
        >
          <div className="flex items-center gap-3 pb-5 border-b border-white/[0.08] mb-5">
            <span className="relative flex w-9 h-9 rounded-full bg-red-500/10 border border-red-500/30 items-center justify-center text-red-400">
              <span className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse" />
              <Mic className="w-4 h-4 relative" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-mono text-white/80">Voice note</span>
              <span className="text-[11px] font-mono text-white/40">Transcribing…</span>
            </div>
          </div>

          <p className="text-base sm:text-lg text-white/90 leading-relaxed font-sans min-h-[5.5rem]">
            {EXAMPLE_TEXT.slice(0, typed)}
            {typed < EXAMPLE_TEXT.length && (
              <span className="inline-block w-[2px] h-[1.1em] bg-amber-300/80 align-middle ml-0.5 animate-pulse" />
            )}
          </p>
        </motion.div>

        {/* One plain line */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center text-lg sm:text-xl text-slate-300/90 leading-relaxed font-normal"
        >
          You talk. It gets cleaned up, saved, and added to your memory
          journal — automatically.
        </motion.p>
      </div>
    </section>
  );
}
