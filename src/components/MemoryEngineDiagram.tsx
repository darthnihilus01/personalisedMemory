"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Brain, Heart, Briefcase, Calendar, Orbit, Lightbulb, ArrowRight, Sparkles } from "lucide-react";

interface PipelineStage {
  id: string;
  name: string;
  icon: any;
  description: string;
  exampleData: {
    raw: string;
    transformation: string;
    modelState: string;
  };
  color: string;
}

const STAGES: PipelineStage[] = [
  {
    id: "voice",
    name: "Voice Notes",
    icon: Mic,
    description: "Raw unstructured spoken thoughts, meetings, audio memos, and casual calls.",
    exampleData: {
      raw: "3 min audio memo: 'Discussed Atlas pivot with Marcus while walking in San Francisco.'",
      transformation: "Acoustic transcription + sentiment & entity extraction",
      modelState: "Extracted: Marcus (Person), Atlas (Project), Pivot (Decision)",
    },
    color: "#a855f7", // purple
  },
  {
    id: "memories",
    name: "Memories",
    icon: Brain,
    description: "Atomic contextual nodes anchored with temporal, spatial, and emotional context.",
    exampleData: {
      raw: "Isolated event node created: SF Walk • Pivot Thesis • Nov 2025",
      transformation: "Cross-referencing with past 14 project memos",
      modelState: "Contextual Node #1,482 mapped into memory graph",
    },
    color: "#ec4899", // pink
  },
  {
    id: "relationships",
    name: "Relationships",
    icon: Heart,
    description: "Evolving dynamics with people—how trust, shared work, and connections change over years.",
    exampleData: {
      raw: "Marcus profile updated: Co-founder • Shared 3-year vision",
      transformation: "Tracking alignment shifts across 40+ conversations",
      modelState: "Relationship Model: Deep alignment on product philosophy",
    },
    color: "#f43f5e", // rose
  },
  {
    id: "projects",
    name: "Projects",
    icon: Briefcase,
    description: "Living focus areas that link deadlines, vision shifts, and technical decisions.",
    exampleData: {
      raw: "Atlas Project graph updated with pivot parameters",
      transformation: "Re-indexing all architecture notes under new paradigm",
      modelState: "Project Atlas: Shifted focus to Context Reasoner",
    },
    color: "#3b82f6", // blue
  },
  {
    id: "life_events",
    name: "Life Events",
    icon: Calendar,
    description: "Milestones that anchor major personal and professional chapters.",
    exampleData: {
      raw: "Chapter Marker: 'The Great Architectural Pivot of 2025'",
      transformation: "Synthesizing career trajectory across 24 months",
      modelState: "Life Narrative: Milestone 4 of 12 cataloged",
    },
    color: "#f59e0b", // amber
  },
  {
    id: "world_model",
    name: "Living World Model",
    icon: Orbit,
    description: "The core continuous engine—a unified, self-updating graph of your existence.",
    exampleData: {
      raw: "Whole-life state vector recalculation",
      transformation: "Unifying work, personal relationships, and personal thesis",
      modelState: "World Model v1.0: 100% Contextually Synchronized",
    },
    color: "#10b981", // emerald
  },
  {
    id: "insights",
    name: "Insights",
    icon: Lightbulb,
    description: "Deep contextual reasoning—answering non-obvious questions about your life.",
    exampleData: {
      raw: "Prompt: 'What changed me during the Atlas project?'",
      transformation: "Reasoning across 482 voice memos, meetings, and notes",
      modelState: "Insight: 'You prioritized autonomy over linear growth.'",
    },
    color: "#6366f1", // indigo
  },
];

export default function MemoryEngineDiagram() {
  const [activeStageId, setActiveStageId] = useState<string>("world_model");
  const activeStage = STAGES.find((s) => s.id === activeStageId) || STAGES[5];

  return (
    <section id="world-model" className="py-24 md:py-36 relative bg-[#08090d] border-t border-white/[0.06]">
      {/* Glow ambient background */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-white/10 text-xs font-mono uppercase tracking-widest text-purple-400 mb-4">
            <Orbit className="w-3.5 h-3.5" />
            <span>Architecture of the Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white leading-tight tracking-tight mb-6">
            Instead of remembering conversations,{" "}
            <span className="font-serif italic text-gradient-purple block sm:inline">
              it remembers your world.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed font-normal">
            No rigid tags. No manual folders. Unstructured life inputs flow continuously into an evolving world model.
          </p>
        </div>

        {/* Pipeline Progression Bar */}
        <div className="mb-12 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-center justify-between min-w-[850px] px-4">
            {STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = stage.id === activeStageId;
              return (
                <div key={stage.id} className="flex items-center flex-1">
                  <button
                    onClick={() => setActiveStageId(stage.id)}
                    id={`pipeline-stage-${stage.id}`}
                    className={`group relative flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? "scale-110 z-10"
                        : "hover:scale-105 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                        isActive
                          ? "bg-white text-black border-white shadow-lg shadow-purple-500/25"
                          : "bg-white/[0.05] text-white/70 border-white/10 group-hover:border-white/30"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-xs font-medium whitespace-nowrap transition-colors ${
                        isActive ? "text-white font-semibold" : "text-white/50"
                      }`}
                    >
                      {stage.name}
                    </span>
                  </button>

                  {/* Flow Arrow */}
                  {idx < STAGES.length - 1 && (
                    <div className="flex-1 px-2 flex items-center justify-center">
                      <div className="h-0.5 w-full bg-gradient-to-r from-white/10 via-purple-500/40 to-white/10 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Stage Transformation Card */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border"
                    style={{
                      backgroundColor: `${activeStage.color}20`,
                      borderColor: activeStage.color,
                      color: activeStage.color,
                    }}
                  >
                    <activeStage.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white">
                      Stage {STAGES.findIndex((s) => s.id === activeStage.id) + 1}: {activeStage.name}
                    </h3>
                    <p className="text-xs font-mono text-white/50">
                      Personal Memory Engine Pipeline Component
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-300">Continuous Processing</span>
                </div>
              </div>

              <p className="text-base text-white/80 leading-relaxed mb-8">
                {activeStage.description}
              </p>

              {/* Data Transformation Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-1">
                    Raw Input
                  </span>
                  <p className="text-xs font-mono text-white/90 leading-relaxed">
                    {activeStage.exampleData.raw}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20">
                  <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider block mb-1">
                    Engine Mutator
                  </span>
                  <p className="text-xs font-mono text-purple-200 leading-relaxed">
                    {activeStage.exampleData.transformation}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                  <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-wider block mb-1">
                    World Model Update
                  </span>
                  <p className="text-xs font-mono text-emerald-200 leading-relaxed">
                    {activeStage.exampleData.modelState}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
