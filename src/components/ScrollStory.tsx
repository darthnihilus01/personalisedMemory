"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, FileText, Sparkles, User, RefreshCw, ArrowRight } from "lucide-react";

interface StoryStep {
  id: string;
  number: string;
  stage: string;
  title: string;
  description: string;
  quote: string;
  visualData: {
    fragments: string[];
    reconstructedStory: string;
    keyInsight: string;
  };
}

const STORY_STEPS: StoryStep[] = [
  {
    id: "fragments",
    number: "01",
    stage: "Fragments",
    title: "Humans experience life in fragments.",
    description:
      "A 30-second voice memo recorded in a taxi. A quick message about a pivot. An unorganized meeting transcript. A date stamped on a calendar.",
    quote: "Current tools treat every entry as an isolated file that rots in storage.",
    visualData: {
      fragments: [
        "Voice Memo #14: 'We need to rethink the memory model...'",
        "Calendar: Dinner with Marcus @ 8 PM",
        "Slack: 'Did we ever figure out the Tokyo architectural thesis?'",
      ],
      reconstructedStory: "Disconnected audio files & scattered notes",
      keyInsight: "Zero relational awareness between items",
    },
  },
  {
    id: "events",
    number: "02",
    stage: "Events",
    title: "Fragments become events.",
    description:
      "When individual moments converge, they form milestones: launching the Atlas product, resolving co-founder friction, or discovering a core philosophy.",
    quote: "You don't care about the raw timestamp. You care about what changed.",
    visualData: {
      fragments: [
        "Atlas V1 Pivot Milestone",
        "Co-founder Alignment Session",
        "Tokyo Design Synthesis",
      ],
      reconstructedStory: "Structured event nodes linked across time",
      keyInsight: "Automatic grouping by emotional and strategic weight",
    },
  },
  {
    id: "stories",
    number: "03",
    stage: "Stories",
    title: "Events become stories.",
    description:
      "Over months and years, events weave together into narrative arcs—the story of how your perspective shifted, how your relationships evolved, how your identity formed.",
    quote: "Software shouldn't be a filing cabinet. It should be a biographer.",
    visualData: {
      fragments: [
        "2023 - 2026 Founder Evolution Arc",
        "3-Year Relationship Trajectory with Marcus",
        "The Philosophical Shift to Offline-First Memory",
      ],
      reconstructedStory: "Living narrative model continuously updating",
      keyInsight: "Context preserved across years of change",
    },
  },
  {
    id: "identity",
    number: "04",
    stage: "Identity",
    title: "Stories shape who we become.",
    description:
      "You are not your notes app. You are the continuous context of your experiences, choices, and reflections. The engine keeps your world intact.",
    quote: "Never lose context again.",
    visualData: {
      fragments: [
        "Core Values Matrix",
        "Relationship Depth Index",
        "Evolving Life Thesis",
      ],
      reconstructedStory: "Your Complete Personal World Model",
      keyInsight: "Continuous self-understanding without effort",
    },
  },
];

export default function ScrollStory() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = STORY_STEPS[activeStepIndex];

  return (
    <section id="story" className="py-24 md:py-36 relative bg-[#060709] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Scroll Narrative</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white leading-tight tracking-tight mb-6">
            Current software stores fragments.{" "}
            <span className="font-serif italic text-gradient-purple block sm:inline">
              Our engine reconstructs the story.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed font-normal">
            Every traditional app forces you to organize, tag, and search through static files.
            We built a system that understands the organic progression of human experience.
          </p>
        </div>

        {/* Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Narrative Timeline Steps */}
          <div className="lg:col-span-5 space-y-4">
            {STORY_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStepIndex(idx)}
                  id={`story-step-${step.id}`}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-400 border ${
                    isActive
                      ? "bg-white/[0.05] border-purple-500/40 shadow-xl shadow-purple-950/20"
                      : "bg-transparent border-white/[0.06] hover:border-white/20 hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-purple-400 font-semibold">
                      {step.number} • {step.stage.toUpperCase()}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    )}
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Narrative Showcase Card */}
          <div className="lg:col-span-7 sticky top-28">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden min-h-[460px] flex flex-col justify-between">
              {/* Background Glow */}
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-8 relative z-10"
                >
                  {/* Stage Indicator Badge */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 font-mono text-xs">
                        {activeStep.number}
                      </div>
                      <span className="text-sm font-semibold text-white tracking-wide">
                        {activeStep.stage} Phase Visualization
                      </span>
                    </div>
                    <span className="text-xs font-mono text-white/40">
                      Step {activeStepIndex + 1} of 4
                    </span>
                  </div>

                  {/* Contrast comparison visual */}
                  <div className="space-y-6">
                    {/* Raw Input Fragments */}
                    <div className="space-y-2">
                      <span className="text-xs font-mono text-white/40 uppercase tracking-wider">
                        Incoming Raw Life Inputs
                      </span>
                      <div className="space-y-2">
                        {activeStep.visualData.fragments.map((fragment, i) => (
                          <div
                            key={i}
                            className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-white/80 flex items-center gap-3"
                          >
                            <FileText className="w-4 h-4 text-purple-400 shrink-0" />
                            <span className="truncate">{fragment}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Transformation Flow Arrow */}
                    <div className="flex items-center justify-center gap-3 py-1">
                      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent flex-1" />
                      <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-[11px] font-mono text-purple-300 flex items-center gap-1.5">
                        <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: "10s" }} />
                        <span>Continuous World Model Synthesis</span>
                      </div>
                      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent flex-1" />
                    </div>

                    {/* Engine Output Context */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/40 via-indigo-950/20 to-black border border-purple-500/30 shadow-lg">
                      <div className="text-xs font-mono text-purple-300 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        <span>Reconstructed Story Model</span>
                      </div>
                      <p className="text-base font-medium text-white mb-2">
                        {activeStep.visualData.reconstructedStory}
                      </p>
                      <div className="text-xs text-emerald-400/90 font-mono flex items-center gap-1.5">
                        <span>✓</span> {activeStep.visualData.keyInsight}
                      </div>
                    </div>
                  </div>

                  {/* Philosophical Quote */}
                  <blockquote className="pt-4 border-t border-white/10 text-sm font-serif italic text-white/70">
                    "{activeStep.quote}"
                  </blockquote>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
