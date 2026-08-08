"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Brain, Heart, Briefcase, Calendar, Orbit, Lightbulb } from "lucide-react";

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
    description: "Raw unstructured spoken thoughts, audio memos, and casual call transcripts.",
    exampleData: {
      raw: "3 min audio memo: 'Discussed Atlas pivot with Marcus walking in SF.'",
      transformation: "On-Device Whisper ASR + self-correction pass",
      modelState: "Extracted: Marcus (Person), Atlas (Project), Pivot (Decision)",
    },
    color: "#f4f4f5",
  },
  {
    id: "memories",
    name: "Memories",
    icon: Brain,
    description: "Atomic contextual nodes anchored with temporal, spatial, and emotional metadata.",
    exampleData: {
      raw: "Isolated event node created: SF Walk • Pivot Thesis • Nov 2025",
      transformation: "Cross-referencing with past project notes",
      modelState: "Contextual Node #1,482 mapped into memory graph",
    },
    color: "#d4a373",
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
    color: "#e4e4e7",
  },
  {
    id: "projects",
    name: "Projects",
    icon: Briefcase,
    description: "Living focus areas that link deadlines, vision shifts, and technical choices.",
    exampleData: {
      raw: "Atlas Project graph updated with pivot parameters",
      transformation: "Re-indexing architecture notes under new paradigm",
      modelState: "Project Atlas: Shifted focus to Context Reasoner",
    },
    color: "#a1a1aa",
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
    color: "#d4a373",
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
    color: "#f4f4f5",
  },
  {
    id: "insights",
    name: "Insights",
    icon: Lightbulb,
    description: "Deep contextual reasoning—answering non-obvious questions about your life.",
    exampleData: {
      raw: "Prompt: 'What changed me during the Atlas project?'",
      transformation: "Reasoning across voice memos, meetings, and notes",
      modelState: "Insight: 'You prioritized autonomy over linear growth.'",
    },
    color: "#d4a373",
  },
];

export default function MemoryEngineDiagram() {
  const [activeStageId, setActiveStageId] = useState<string>("world_model");
  const activeStage = STAGES.find((s) => s.id === activeStageId) || STAGES[5];

  return (
    <section id="world-model" className="py-24 md:py-36 relative bg-[#09090b] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-widest text-amber-300/80 mb-4">
            <Orbit className="w-3.5 h-3.5" />
            <span>Architecture Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white leading-tight tracking-tight mb-6">
            Instead of remembering conversations,{" "}
            <span className="font-serif italic text-amber-200/90 block sm:inline">
              it remembers your world.
            </span>
          </h2>
          <p className="text-base text-white/60 leading-relaxed font-normal">
            No rigid tags. No manual folders. Unstructured life inputs flow continuously into an evolving world model.
          </p>
        </div>

        {/* Pipeline Progression Bar */}
        <div className="mb-12 overflow-x-auto pb-4">
          <div className="flex items-center justify-between min-w-[850px] px-2">
            {STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = stage.id === activeStageId;
              return (
                <div key={stage.id} className="flex items-center flex-1">
                  <button
                    onClick={() => setActiveStageId(stage.id)}
                    id={`pipeline-stage-${stage.id}`}
                    className={`group relative flex flex-col items-center gap-2 p-2.5 rounded-xl transition-all ${
                      isActive ? "scale-105" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                        isActive
                          ? "bg-white text-black border-white"
                          : "bg-white/[0.04] text-white/70 border-white/10"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-xs font-mono whitespace-nowrap transition-colors ${
                        isActive ? "text-white font-medium" : "text-white/40"
                      }`}
                    >
                      {stage.name}
                    </span>
                  </button>

                  {idx < STAGES.length - 1 && (
                    <div className="flex-1 px-2 flex items-center justify-center">
                      <div className="h-[1px] w-full bg-white/10" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Stage Transformation Card */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="panel-quiet p-8 rounded-2xl border border-white/10 shadow-xl space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white">
                    <activeStage.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-white">
                      Stage {STAGES.findIndex((s) => s.id === activeStage.id) + 1}: {activeStage.name}
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400">Continuous Processing</span>
              </div>

              <p className="text-sm text-white/80 leading-relaxed font-sans">
                {activeStage.description}
              </p>

              {/* Data Transformation Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-1">
                    Raw Input
                  </span>
                  <p className="text-xs font-mono text-white/80 leading-relaxed">
                    {activeStage.exampleData.raw}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.1]">
                  <span className="text-[10px] font-mono text-amber-300/80 uppercase tracking-wider block mb-1">
                    Engine Mutator
                  </span>
                  <p className="text-xs font-mono text-amber-200/90 leading-relaxed">
                    {activeStage.exampleData.transformation}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
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
