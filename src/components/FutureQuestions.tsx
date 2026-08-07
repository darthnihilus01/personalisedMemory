"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, ArrowRight, CornerDownRight, CheckCircle2, XCircle } from "lucide-react";

interface ComparisonItem {
  id: string;
  category: string;
  oldQuery: string;
  oldResult: string;
  engineQuery: string;
  engineReasoning: {
    synthesis: string;
    sources: string[];
    insight: string;
  };
}

const COMPARISONS: ComparisonItem[] = [
  {
    id: "marcus",
    category: "Relationship Evolution",
    oldQuery: "When did I meet Marcus?",
    oldResult: "Found 1 calendar invite: 'Coffee with Marcus - March 14, 2023'",
    engineQuery: "How has my relationship with Marcus evolved?",
    engineReasoning: {
      synthesis:
        "Your dynamic shifted from cautious tech collaborators in 2023 to deep strategic alignment during the November 2025 Tokyo trip. Key pivot: In Voice Memo #42, Marcus challenged your linear roadmap, prompting the Memory Engine paradigm.",
      sources: [
        "March 2023 Coffee Transcript",
        "Nov 2025 Tokyo Architecture Walk Memo",
        "14 Co-authored Strategic Notes",
      ],
      insight: "Trust rating & strategic synergy evolved from 40% to 95% across 3 years.",
    },
  },
  {
    id: "atlas",
    category: "Project & Life Shifts",
    oldQuery: "Find launch notes",
    oldResult: "Found 18 files with keyword 'launch': launch_v1_draft.doc, notes.txt...",
    engineQuery: "What changed me during the Atlas project?",
    engineReasoning: {
      synthesis:
        "The Atlas project forced a fundamental shift from productivity metrics to personal autonomy. After 3 midnight voice notes recorded during burnout, you abandoned feature bloat in favor of a quiet, background world model.",
      sources: [
        "August 2025 Midnight Voice Memo",
        "Atlas Roadmap V2 Deletion Log",
        "Reflective Journal Entry #88",
      ],
      insight: "Shifted core motivation from external metrics to internal clarity.",
    },
  },
  {
    id: "sarah",
    category: "Subtle Human Context",
    oldQuery: "Where is the gift list?",
    oldResult: "No matching documents found for 'gift list'.",
    engineQuery: "What subtle preferences has Sarah mentioned across all our walks?",
    engineReasoning: {
      synthesis:
        "Sarah mentioned 3 key preferences over 8 audio memos: vintage Japanese ceramics (noted during Nezu Museum walk), rare print typography books, and filter coffee roast preferences from SF.",
      sources: [
        "SF Walk Audio Memo • Oct 2025",
        "Family Sunday Call Transcript",
        "Nezu Museum Audio Note",
      ],
      insight: "Prefers experiences & artisan craft over generic material gifts.",
    },
  },
];

export default function FutureQuestions() {
  const [activeId, setActiveId] = useState<string>("marcus");
  const activeComparison = COMPARISONS.find((c) => c.id === activeId) || COMPARISONS[0];

  return (
    <section id="reasoning" className="py-24 md:py-36 relative bg-[#08090d] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-white/10 text-xs font-mono uppercase tracking-widest text-purple-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Reasoning Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white leading-tight tracking-tight mb-6">
            Future Questions.{" "}
            <span className="font-serif italic text-gradient-purple block sm:inline">
              Beyond search boxes.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed font-normal">
            Stop searching for static files. Start asking questions about your evolving life.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-12 flex-wrap">
          {COMPARISONS.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                id={`tab-question-${item.id}`}
                className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-white text-black font-semibold shadow-lg shadow-purple-500/20"
                    : "glass-panel text-white/60 hover:text-white hover:border-white/20"
                }`}
              >
                {item.category}
              </button>
            );
          })}
        </div>

        {/* Side-by-Side Interactive Comparison Card */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeComparison.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Old Search Card */}
              <div className="glass-panel p-8 rounded-3xl border border-red-500/20 bg-red-950/5 relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2 text-xs font-mono text-red-400">
                      <XCircle className="w-4 h-4" />
                      <span>Traditional Search Engine</span>
                    </div>
                    <span className="text-[10px] font-mono text-white/30">
                      Keyword Lookup
                    </span>
                  </div>

                  <div className="mb-6">
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-2">
                      User Query
                    </span>
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-sm font-mono text-white/70 flex items-center gap-3">
                      <Search className="w-4 h-4 text-white/40" />
                      <span>"{activeComparison.oldQuery}"</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-2">
                      Returned Output
                    </span>
                    <div className="p-4 rounded-xl bg-black/40 border border-red-500/20 text-xs font-mono text-red-300/80 leading-relaxed">
                      {activeComparison.oldResult}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 mt-8 text-xs font-mono text-white/40">
                  Limitations: No contextual memory • No relational depth
                </div>
              </div>

              {/* Personal Memory Engine Card */}
              <div className="glass-panel p-8 rounded-3xl border border-purple-500/30 bg-purple-950/10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-500/20">
                    <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      <span>Personal Memory Engine</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      World Model Reasoned
                    </span>
                  </div>

                  <div className="mb-6">
                    <span className="text-[10px] font-mono text-purple-300/80 uppercase tracking-widest block mb-2">
                      Contextual Question
                    </span>
                    <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-sm font-mono text-white flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                      <span>"{activeComparison.engineQuery}"</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1.5">
                        Synthesized Life Context
                      </span>
                      <div className="p-4 rounded-xl bg-black/60 border border-purple-500/20 text-xs text-white/90 leading-relaxed font-sans">
                        {activeComparison.engineReasoning.synthesis}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1.5">
                        Linked Contextual Sources
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeComparison.engineReasoning.sources.map((src, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-[10px] font-mono text-purple-300/90"
                          >
                            {src}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-purple-500/20 mt-8 text-xs font-mono text-emerald-400 flex items-center justify-between">
                  <span>Insight: {activeComparison.engineReasoning.insight}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
