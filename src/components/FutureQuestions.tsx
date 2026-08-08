"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, CheckCircle2, XCircle } from "lucide-react";

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
        "Your dynamic shifted from cautious technical collaborators in 2023 to deep strategic alignment during the November 2025 Tokyo trip. Key pivot: In Voice Memo #42, Marcus challenged your linear roadmap, prompting the Memory Engine paradigm.",
      sources: [
        "March 2023 Coffee Transcript",
        "Nov 2025 Tokyo Architecture Walk Memo",
        "14 Co-authored Strategic Notes",
      ],
      insight: "Trust rating & strategic synergy evolved to 95% alignment.",
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
        "The Atlas project forced a fundamental shift from productivity metrics to personal autonomy. After 3 midnight voice notes recorded during burnout, you abandoned feature bloat in favor of a quiet background world model.",
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
    <section id="reasoning" className="py-24 md:py-36 relative bg-[#09090b] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-widest text-amber-300/80 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Reasoning Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white leading-tight tracking-tight mb-6">
            Future Questions.{" "}
            <span className="font-serif italic text-amber-200/90 block sm:inline">
              Beyond search boxes.
            </span>
          </h2>
          <p className="text-base text-white/60 leading-relaxed font-normal">
            Stop searching for static files. Start asking questions about your evolving life.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {COMPARISONS.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                id={`tab-question-${item.id}`}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                  isActive
                    ? "bg-white text-black font-medium"
                    : "bg-white/[0.04] text-white/60 hover:text-white border border-white/10"
                }`}
              >
                {item.category}
              </button>
            );
          })}
        </div>

        {/* Comparison Side-by-Side Card */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeComparison.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Old Search Card */}
              <div className="panel-quiet p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                      <XCircle className="w-3.5 h-3.5 text-red-400/80" />
                      <span>Traditional Search Engine</span>
                    </div>
                    <span className="text-[10px] font-mono text-white/30">Keyword Lookup</span>
                  </div>

                  <div className="mb-6">
                    <span className="text-[10px] font-mono text-white/40 uppercase block mb-1.5">User Query</span>
                    <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-white/70 flex items-center gap-2.5">
                      <Search className="w-3.5 h-3.5 text-white/40" />
                      <span>"{activeComparison.oldQuery}"</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase block mb-1.5">Returned Output</span>
                    <div className="p-3.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-white/50 leading-relaxed">
                      {activeComparison.oldResult}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/[0.08] mt-8 text-xs font-mono text-white/40">
                  Limitations: Static keyword matches • No relational memory
                </div>
              </div>

              {/* Personal Memory Engine Card (Trust UI) */}
              <div className="panel-quiet p-6 sm:p-8 rounded-2xl border border-white/15 bg-[#121216] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2 text-xs font-mono text-white">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Personal Memory Engine</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/30">
                      World Model Reasoned
                    </span>
                  </div>

                  <div className="mb-6">
                    <span className="text-[10px] font-mono text-white/40 uppercase block mb-1.5">Contextual Question</span>
                    <div className="p-3 rounded-lg bg-black/40 border border-white/15 text-xs font-mono text-white flex items-center gap-2.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>"{activeComparison.engineQuery}"</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-mono text-white/40 uppercase block mb-1.5">Synthesized Life Context</span>
                      <div className="p-3.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white/90 leading-relaxed font-sans">
                        {activeComparison.engineReasoning.synthesis}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-white/40 uppercase block mb-1.5">Linked Verified Sources</span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeComparison.engineReasoning.sources.map((src, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[10px] font-mono text-white/70"
                          >
                            {src}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/[0.08] mt-8 text-xs font-mono text-amber-300/90 flex items-center justify-between">
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
