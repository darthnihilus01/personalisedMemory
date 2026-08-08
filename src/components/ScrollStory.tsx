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
    title: "Life happens in small moments.",
    description:
      "A 30-second voice memo walking home from lunch. A quick audio note about Priya quitting her job. A reflection after a team meeting.",
    quote: "Current notes apps treat every voice memo as a forgotten audio file.",
    visualData: {
      fragments: [
        "Voice Memo: 'Had lunch with Priya, she is quitting her job...'",
        "Morning Note: 'Woke up late, missed the gym again.'",
        "Evening Audio: 'Meeting with manager went well, got good feedback.'",
      ],
      reconstructedStory: "Quick audio recordings captured whenever something happens",
      keyInsight: "Zero friction: just speak into your phone and move on with your day",
    },
  },
  {
    id: "events",
    number: "02",
    stage: "Events",
    title: "Fragments become daily diary pages.",
    description:
      "At the end of each day, quick audio fragments compile into a single coherent diary entry written in your exact voice.",
    quote: "Say it messy. The app cleans it up and puts it in order.",
    visualData: {
      fragments: [
        "Lunch with Priya • 1:30 PM",
        "Project Review Meeting • 4:00 PM",
        "Evening Check-in with Mom • 7:30 PM",
      ],
      reconstructedStory: "One unified, beautifully formatted daily diary page",
      keyInsight: "Preserves your real words, removes false starts and verbal filler",
    },
  },
  {
    id: "stories",
    number: "03",
    stage: "Stories",
    title: "Days become connected memories.",
    description:
      "Over weeks and months, daily entries connect into continuous storylines: friendships, career transitions, and family milestones.",
    quote: "Software shouldn't be a filing cabinet. It should remember your life.",
    visualData: {
      fragments: [
        "Priya's Journey from Corporate to Starting Her Business",
        "Months of Catch-up Phone Calls with Mom",
        "Managing Work Stress and Getting Team Recognition",
      ],
      reconstructedStory: "An interconnected map of people, places, and memories",
      keyInsight: "Search any person to see everything you've ever said involving them",
    },
  },
  {
    id: "identity",
    number: "04",
    stage: "Recall",
    title: "Your life, remembered without the work.",
    description:
      "You never have to organize folders or tag documents. You talk when something happens, and your memory stays intact forever.",
    quote: "That's it. You talk. It remembers.",
    visualData: {
      fragments: [
        "Connected Friendship Timelines",
        "Career Decisions & Milestones",
        "Quiet Emotional Mood Signals",
      ],
      reconstructedStory: "A searchable, private memory of your entire life",
      keyInsight: "Ask natural questions and get grounded answers from your own words",
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
