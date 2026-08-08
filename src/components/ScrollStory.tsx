"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Sparkles, RefreshCw } from "lucide-react";

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
      "A 30-second voice memo recorded walking home. A quick message about a pivot. An unorganized meeting transcript. A date stamped on a calendar.",
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
    <section id="story" className="py-24 md:py-36 relative bg-[#09090b] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400/80 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Narrative Progression</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white leading-tight tracking-tight mb-6">
            Current software stores fragments.{" "}
            <span className="font-serif italic text-amber-200/90 block sm:inline">
              Our engine reconstructs the story.
            </span>
          </h2>
          <p className="text-base text-white/60 leading-relaxed font-normal">
            Traditional apps force you to organize, tag, and search through static files.
            We built a system that understands the organic progression of human experience.
          </p>
        </div>

        {/* Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Quiet Interactive Narrative Steps */}
          <div className="lg:col-span-5 space-y-3">
            {STORY_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStepIndex(idx)}
                  id={`story-step-${step.id}`}
                  className={`p-5 rounded-xl cursor-pointer transition-all border ${
                    isActive
                      ? "bg-white/[0.06] border-white/20"
                      : "bg-transparent border-transparent hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-amber-300/80 font-medium">
                      {step.number} • {step.stage.toUpperCase()}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400/90" />
                    )}
                  </div>
                  <h3 className="text-lg font-medium text-white mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Narrative Inspector */}
          <div className="lg:col-span-7 sticky top-28">
            <div className="panel-quiet p-8 rounded-2xl border border-white/10 shadow-xl min-h-[420px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* Stage Indicator Badge */}
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono text-white/40">Phase {activeStep.number}</span>
                      <span className="text-sm font-medium text-white">
                        {activeStep.stage} Visualization
                      </span>
                    </div>
                    <span className="text-xs font-mono text-white/40">
                      Step {activeStepIndex + 1} of 4
                    </span>
                  </div>

                  {/* Incoming Fragments */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-white/40 uppercase tracking-wider block">
                      Incoming Unstructured Inputs
                    </span>
                    <div className="space-y-2">
                      {activeStep.visualData.fragments.map((fragment, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-white/80 flex items-center gap-2.5"
                        >
                          <FileText className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                          <span className="truncate">{fragment}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reconstructed Narrative State */}
                  <div className="p-4 rounded-xl bg-[#141418] border border-white/10 space-y-2">
                    <div className="text-xs font-mono text-amber-300/90 uppercase tracking-widest flex items-center gap-2">
                      <RefreshCw className="w-3 h-3 text-amber-400/80" />
                      <span>Reconstructed Narrative</span>
                    </div>
                    <p className="text-sm font-medium text-white">
                      {activeStep.visualData.reconstructedStory}
                    </p>
                    <div className="text-xs text-emerald-400 font-mono">
                      ✓ {activeStep.visualData.keyInsight}
                    </div>
                  </div>

                  <blockquote className="pt-2 text-xs font-serif italic text-white/60">
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
