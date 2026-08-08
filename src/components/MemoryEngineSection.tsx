"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Orbit, ArrowDown, Sparkles } from "lucide-react";
import LivingWorldModelCanvas from "./LivingWorldModelCanvas";

const QUESTION = "How has my relationship with Priya changed?";

const TIMELINE = [
  { month: "March", note: "First mentioned" },
  { month: "April", note: "Started meeting regularly" },
  { month: "June", note: "Priya talked about leaving her job" },
  { month: "August", note: "Priya became part of a new project" },
];

const SYNTHESIS =
  "Priya started as someone you occasionally mentioned. Over the past six months, you've interacted more often and she has become connected to both your work and personal life.";

function QuestionDemo() {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    if (step >= TIMELINE.length) return;
    const t = setTimeout(() => {
      setStep((prev) => prev + 1);
      if (step + 1 >= TIMELINE.length) setRunning(false);
    }, 900);
    return () => clearTimeout(t);
  }, [step, running]);

  const showSynthesis = step >= TIMELINE.length;

  return (
    <div className="panel-quiet p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl">
      {/* Question */}
      <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-sm font-mono text-white flex items-center gap-2.5 mb-6">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
        <span>&ldquo;{QUESTION}&rdquo;</span>
      </div>

      {/* Timeline */}
      <div className="space-y-0 mb-6">
        {TIMELINE.map((item, idx) => {
          const shown = idx < step;
          return (
            <div key={item.month} className="flex flex-col">
              {shown && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between gap-4 p-3 rounded-lg bg-white/[0.03] border border-white/[0.08]"
                >
                  <span className="text-xs font-mono text-white/85">{item.month}</span>
                  <span className="text-xs font-mono text-white/50 text-right">{item.note}</span>
                </motion.div>
              )}
              {shown && idx < TIMELINE.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowDown className="w-3.5 h-3.5 text-white/25" />
                </div>
              )}
            </div>
          );
        })}
        {!showSynthesis && (
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-amber-950/20 border border-amber-500/20 text-amber-200/90 text-xs font-mono">
            <span className="w-3.5 h-3.5 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
            <span>Connecting context across time…</span>
          </div>
        )}
      </div>

      {/* Synthesis */}
      <AnimatePresence>
        {showSynthesis && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/25"
          >
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-2">
              How it understands it
            </span>
            <p className="text-sm text-white/90 leading-relaxed font-sans">
              {SYNTHESIS}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MemoryEngineSection() {
  return (
    <section id="memory-engine" className="py-24 md:py-32 relative bg-[#09090b] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-widest text-amber-300/80 mb-4">
            <Orbit className="w-3.5 h-3.5" />
            <span>The memory engine</span>
          </div>
          <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-normal">
            Every person, place, event, project, and goal you mention can
            become part of a connected memory — without you tagging or
            organizing anything.
          </p>
          <p className="mt-4 text-base text-white/60 leading-relaxed font-normal">
            The longer you use it, the more context it can connect.
          </p>
        </div>

        {/* Question demo */}
        <div className="max-w-2xl mx-auto mb-12">
          <QuestionDemo />
        </div>

        {/* Memory engine visual */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <LivingWorldModelCanvas />
        </motion.div>

        <p className="mt-4 text-center text-xs font-mono text-white/40">
          People, projects, and moments — staying connected as your life moves
          forward.
        </p>
      </div>
    </section>
  );
}
