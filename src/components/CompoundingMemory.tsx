"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, CalendarClock } from "lucide-react";

const MILESTONES = [
  {
    id: "day1",
    label: "Day 1",
    title: "Three names, no connections yet.",
    items: ["Marcus", "Atlas", "Priya"],
  },
  {
    id: "week4",
    label: "Week 4",
    title: "The first links appear on their own.",
    items: ["Marcus", "Atlas", "Priya"],
    note: "Mentions of the same people start linking together — without you doing anything.",
  },
  {
    id: "month6",
    label: "Month 6",
    title: "Each person carries their own context.",
    clusters: [
      {
        name: "Marcus",
        branches: ["Atlas", "previous decisions", "career conversations"],
      },
      {
        name: "Priya",
        branches: ["work", "relationship history", "career transition"],
      },
      {
        name: "Atlas",
        branches: ["launch", "delays", "collaborators", "decisions"],
      },
    ],
  },
  {
    id: "year2",
    label: "Year 2",
    title: "Questions that need months of context:",
    questions: [
      "What changed most about me this year?",
      "Which goals have I quietly abandoned?",
      "What decisions shaped my career?",
      "What relationships became more important?",
    ],
  },
] as const;

type Milestone = (typeof MILESTONES)[number];

function MilestoneContent({ milestone }: { milestone: Milestone }) {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-medium text-white">{milestone.title}</h3>

      {"items" in milestone && (
        <div className="flex flex-wrap gap-2.5">
          {milestone.items.map((item) => (
            <span
              key={item}
              className="px-3.5 py-2 rounded-lg bg-white/[0.05] border border-white/15 text-xs font-mono text-white/85"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {"note" in milestone && (
        <p className="text-sm text-white/60 leading-relaxed font-sans">
          {milestone.note}
        </p>
      )}

      {"clusters" in milestone && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {milestone.clusters.map((cluster, ci) => (
            <motion.div
              key={cluster.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: ci * 0.15 }}
              className="p-4 rounded-xl bg-white/[0.03] border border-white/10"
            >
              <span className="text-sm font-mono text-amber-200/90 block mb-3">
                {cluster.name}
              </span>
              <ul className="space-y-2">
                {cluster.branches.map((branch) => (
                  <li
                    key={branch}
                    className="flex items-center gap-2 text-xs font-mono text-white/70"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/25 shrink-0" />
                    {branch}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      )}

      {"questions" in milestone && (
        <ul className="space-y-2.5">
          {milestone.questions.map((question, qi) => (
            <motion.li
              key={question}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: qi * 0.15 }}
              className="p-3.5 rounded-xl bg-teal-950/15 border border-teal-500/20 text-sm text-emerald-100/90 font-serif italic leading-relaxed"
            >
              &ldquo;{question}&rdquo;
            </motion.li>
          ))}
        </ul>
      )}

      <p className="pt-2 text-xs text-white/50 leading-relaxed font-sans">
        It becomes more useful because it has more context to work with —
        nothing more, nothing magical.
      </p>
    </div>
  );
}

export default function CompoundingMemory() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (activeIdx >= MILESTONES.length - 1) return;
    const t = setTimeout(() => setActiveIdx((prev) => prev + 1), 3800);
    return () => clearTimeout(t);
  }, [activeIdx]);

  return (
    <section id="over-time" className="py-24 md:py-32 relative bg-[#09090b] border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-widest text-amber-300/80 mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Over time</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white leading-tight tracking-tight">
            It gets more useful{" "}
            <span className="font-serif italic text-amber-200/90">
              the longer you live with it.
            </span>
          </h2>
        </div>

        {/* Timeline nav */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {MILESTONES.map((milestone, idx) => {
            const isActive = idx === activeIdx;
            const isPast = idx < activeIdx;
            return (
              <button
                key={milestone.id}
                onClick={() => setActiveIdx(idx)}
                id={`milestone-${milestone.id}`}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all flex items-center gap-2 ${
                  isActive
                    ? "bg-white text-black font-medium"
                    : isPast
                    ? "bg-white/[0.04] text-white/70 border border-white/10"
                    : "bg-white/[0.04] text-white/50 border border-white/10 hover:text-white"
                }`}
              >
                {isPast && <span className="text-teal-500">✓</span>}
                {milestone.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="panel-quiet p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={MILESTONES[activeIdx].id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <MilestoneContent milestone={MILESTONES[activeIdx]} />
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-6 text-center text-xs font-mono text-white/40 flex items-center justify-center gap-2">
          <CalendarClock className="w-3.5 h-3.5" />
          The memory grows with you — it never resets.
        </p>
      </div>
    </section>
  );
}
