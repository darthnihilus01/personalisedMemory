"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  Sparkles,
  Clock,
  BookOpen,
  Smile,
  ArrowRight,
  RotateCcw,
  Check,
  CheckCircle2,
  Volume2,
} from "lucide-react";

interface WalkthroughStep {
  id: string;
  stepNumber: string;
  badge: string;
  title: string;
  caption: string;
}

const STEPS: WalkthroughStep[] = [
  {
    id: "step-1",
    stepNumber: "01",
    badge: "Step 1 • Voice Capture",
    title: "You record a quick voice note",
    caption: "Whenever something happens during your day, just tap and talk.",
  },
  {
    id: "step-2",
    stepNumber: "02",
    badge: "Step 2 • Live Self-Correction",
    title: "It catches your correction automatically",
    caption: "Say it messy. It cleans itself up.",
  },
  {
    id: "step-3",
    stepNumber: "03",
    badge: "Step 3 • Ambient Daily Capture",
    title: "You do this a few times through the day",
    caption: "Whenever something happens. No structure needed.",
  },
  {
    id: "step-4",
    stepNumber: "04",
    badge: "Step 4 • Daily Compilation",
    title: "At the end of the day, it's one clean page",
    caption: "Same words you used. Just yours, cleaned up and in order.",
  },
  {
    id: "step-5",
    stepNumber: "05",
    badge: "Step 5 • Mood Tracking",
    title: "It also tracks how you're feeling",
    caption: "Builds into a quiet emotional timeline over weeks and months.",
  },
  {
    id: "step-6",
    stepNumber: "06",
    badge: "Step 6 • The Continuous Loop",
    title: "Back to the mic",
    caption: "That's it. You talk. It remembers.",
  },
];

export default function HowItWorksWalkthrough() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = STEPS[activeStepIndex];

  return (
    <section
      id="how-it-works"
      className="py-20 md:py-32 relative bg-[#070709] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-white/10 text-xs font-mono uppercase tracking-widest text-purple-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>See It In Action</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white leading-tight tracking-tight mb-4">
            How it works in practice.{" "}
            <span className="font-serif italic text-gradient-purple block sm:inline">
              From speech to memory.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300/80 max-w-xl mx-auto leading-relaxed">
            No folders, no tags, and no sitting down at a keyboard. Watch what happens when you speak a thought.
          </p>
        </div>

        {/* Step Progression Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                id={`walkthrough-step-tab-${idx + 1}`}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all shrink-0 flex items-center gap-2 ${
                  isActive
                    ? "bg-white text-black font-medium shadow-md scale-[1.02]"
                    : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/10 hover:bg-white/[0.08]"
                }`}
              >
                <span>{step.stepNumber}</span>
                <span className="hidden md:inline">{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Step Card Container */}
        <div className="max-w-4xl mx-auto">
          <div className="panel-quiet p-6 sm:p-10 rounded-3xl border border-white/15 bg-[#0c0c11] shadow-2xl relative min-h-[460px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Step Header Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-mono">
                      {activeStep.badge}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-white/40">
                    Step {activeStepIndex + 1} of {STEPS.length}
                  </span>
                </div>

                {/* Main Visual Display Per Step */}
                <div className="py-2">
                  {/* STEP 1: VOICE CAPTURE */}
                  {activeStepIndex === 0 && (
                    <div className="space-y-6">
                      <h3 className="text-xl sm:text-2xl font-light text-white">
                        {activeStep.title}
                      </h3>

                      {/* Mic & Waveform UI */}
                      <div className="p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-center gap-6">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 animate-pulse">
                            <Mic className="w-8 h-8" />
                          </div>
                          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-red-500 text-[10px] font-mono text-white uppercase tracking-wider font-bold">
                            REC
                          </span>
                        </div>

                        {/* Animated Waveform & Transcription */}
                        <div className="flex-1 space-y-3 w-full text-center sm:text-left">
                          <div className="flex items-center justify-center sm:justify-start gap-1 h-6">
                            {[40, 75, 90, 50, 100, 60, 85, 30, 95, 70, 45, 80].map((h, i) => (
                              <div
                                key={i}
                                className="w-1 bg-purple-400/80 rounded-full animate-pulse"
                                style={{
                                  height: `${h}%`,
                                  animationDelay: `${i * 0.08}s`,
                                }}
                              />
                            ))}
                          </div>
                          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                            <p className="text-sm sm:text-base font-sans text-white/90 italic leading-relaxed">
                              "Just had lunch with Sarah — sorry, I mean Priya — and she told me she's finally quitting her job. Really happy for her."
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: LIVE SELF-CORRECTION */}
                  {activeStepIndex === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-xl sm:text-2xl font-light text-white">
                        {activeStep.title}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Raw Transcript with Strikethrough */}
                        <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                          <div className="text-[11px] font-mono text-white/40 uppercase tracking-wider flex items-center justify-between">
                            <span>What You Said</span>
                            <span className="text-red-400">Raw Speech</span>
                          </div>
                          <p className="text-xs sm:text-sm font-sans text-white/70 leading-relaxed pt-1">
                            "Just had lunch with{" "}
                            <span className="line-through text-red-400/90 bg-red-500/10 px-1 py-0.5 rounded">
                              Sarah — sorry, I mean Priya
                            </span>{" "}
                            — and she told me she's finally quitting her job. Really happy for her."
                          </p>
                        </div>

                        {/* Corrected Clean Note */}
                        <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                          <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider flex items-center justify-between">
                            <span>What It Stores</span>
                            <span className="flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Cleaned Live
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm font-sans text-white leading-relaxed pt-1">
                            "Just had lunch with{" "}
                            <span className="text-emerald-300 font-semibold bg-emerald-500/20 px-1 py-0.5 rounded">
                              Priya
                            </span>
                            , and she told me she's finally quitting her job. Really happy for her."
                          </p>
                        </div>
                      </div>

                      <p className="text-xs font-mono text-purple-300 text-center sm:text-left">
                        ✨ {activeStep.caption}
                      </p>
                    </div>
                  )}

                  {/* STEP 3: AMBIENT FRAGMENTS THROUGHOUT THE DAY */}
                  {activeStepIndex === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-xl sm:text-2xl font-light text-white">
                        {activeStep.title}
                      </h3>

                      <div className="space-y-2.5">
                        <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-white/60">
                              9:15 AM
                            </span>
                            <span className="text-xs sm:text-sm text-white/80 font-sans">
                              "Woke up late, missed the gym again."
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-white/40 shrink-0">Fragment 1</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300">
                              1:30 PM
                            </span>
                            <span className="text-xs sm:text-sm text-white font-sans">
                              "Just had lunch with Priya, and she told me she's finally quitting her job. Really happy for her."
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-purple-300 shrink-0">Fragment 2</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-white/60">
                              6:45 PM
                            </span>
                            <span className="text-xs sm:text-sm text-white/80 font-sans">
                              "Meeting with my manager went well, got good feedback on the project."
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-white/40 shrink-0">Fragment 3</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-white/60">
                              10:00 PM
                            </span>
                            <span className="text-xs sm:text-sm text-white/80 font-sans">
                              "Good day overall, a bit tired."
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-white/40 shrink-0">Fragment 4</span>
                        </div>
                      </div>

                      <p className="text-xs font-mono text-slate-400 text-center sm:text-left">
                        {activeStep.caption}
                      </p>
                    </div>
                  )}

                  {/* STEP 4: DAILY COMPILED PAGE */}
                  {activeStepIndex === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-xl sm:text-2xl font-light text-white">
                        {activeStep.title}
                      </h3>

                      {/* Compiled Journal Entry Page */}
                      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#14141c] to-[#0d0d12] border border-white/15 shadow-xl space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-purple-400" />
                            <span className="text-xs font-mono text-purple-300 uppercase tracking-wider">
                              Daily Compiled Entry • Tuesday, Oct 14
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/30">
                            100% In Your Voice
                          </span>
                        </div>

                        <p className="text-sm sm:text-base font-serif italic text-white/95 leading-relaxed">
                          "Today started a bit rough — woke up late and missed the gym again. Had lunch with Priya and she told me she's finally quitting her job, which made me really happy for her. My meeting with my manager went well in the afternoon, and I got good feedback on the project. Overall a good day, just a little tired by the end."
                        </p>
                      </div>

                      <p className="text-xs font-mono text-purple-300 text-center sm:text-left">
                        ✨ {activeStep.caption}
                      </p>
                    </div>
                  )}

                  {/* STEP 5: MOOD TRACKING */}
                  {activeStepIndex === 4 && (
                    <div className="space-y-6">
                      <h3 className="text-xl sm:text-2xl font-light text-white">
                        {activeStep.title}
                      </h3>

                      <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-white/40 uppercase tracking-wider">
                            Daily Emotional Signal
                          </span>
                          <span className="text-xs font-mono text-amber-300">Inferred from Tone & Words</span>
                        </div>

                        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
                          <span className="text-2xl">🙂</span>
                          <div>
                            <div className="text-sm font-medium text-white">
                              Mostly upbeat, one rough start
                            </div>
                            <div className="text-xs text-amber-200/70 font-sans">
                              Warming tone following lunch with Priya and afternoon team validation.
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-white/[0.08] text-xs font-mono text-slate-300 leading-relaxed">
                          Over weeks and months, these daily mood signals automatically build into a quiet emotional timeline of your life.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 6: BACK TO THE MIC */}
                  {activeStepIndex === 5 && (
                    <div className="space-y-8 text-center py-4">
                      <div className="relative inline-block mx-auto">
                        <div className="w-24 h-24 rounded-full bg-purple-500/20 border-2 border-purple-400 flex items-center justify-center text-white mx-auto shadow-2xl shadow-purple-500/30 animate-pulse">
                          <Mic className="w-10 h-10 text-purple-300" />
                        </div>
                      </div>

                      <div className="space-y-2 max-w-md mx-auto">
                        <h3 className="text-3xl sm:text-4xl font-light text-white font-serif italic">
                          "That's it. You talk. It remembers."
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300/80 font-sans">
                          No folders. No manual tagging. Just speak whenever something happens, and let the engine connect your life behind the scenes.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Step Controls */}
            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
              <button
                onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : STEPS.length - 1))}
                className="px-4 py-2 rounded-full text-xs font-mono text-slate-400 hover:text-white border border-white/10 hover:bg-white/[0.05] transition-all"
              >
                {activeStepIndex === 0 ? "Loop to End" : "← Previous Step"}
              </button>

              <div className="flex items-center gap-1.5">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStepIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === activeStepIndex ? "w-6 bg-purple-400" : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveStepIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : 0))}
                className="px-5 py-2 rounded-full text-xs font-mono font-medium text-black bg-white hover:bg-slate-200 transition-all flex items-center gap-1.5"
              >
                <span>{activeStepIndex === STEPS.length - 1 ? "Restart Walkthrough" : "Next Step"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
