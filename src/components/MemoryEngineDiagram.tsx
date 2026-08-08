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
    description: "Casual spoken thoughts, commute reflections, and quick audio memos captured in the moment.",
    exampleData: {
      raw: "30-sec memo: 'Had lunch with Priya, she told me she is quitting her job.'",
      transformation: "On-device transcription + live self-correction",
      modelState: "Extracted: Priya (Person), Career Change (Topic), Lunch (Event)",
    },
    color: "#f4f4f5",
  },
  {
    id: "memories",
    name: "Connected Memories",
    icon: Brain,
    description: "Individual moments automatically linked with dates, people, and how you were feeling.",
    exampleData: {
      raw: "Entry saved: Lunch with Priya • Tuesday afternoon",
      transformation: "Connecting to earlier mentions of Priya from past entries",
      modelState: "Linked to 14 past conversations and memories with Priya",
    },
    color: "#d4a373",
  },
  {
    id: "relationships",
    name: "People & Relationships",
    icon: Heart,
    description: "Follows how friendships, family connections, and work relationships evolve over months and years.",
    exampleData: {
      raw: "Priya profile updated with career transition notes",
      transformation: "Connecting 2 years of coffee chats, moving cities, and new projects",
      modelState: "Timeline: Transitioned from co-worker in 2023 to close confidant",
    },
    color: "#e4e4e7",
  },
  {
    id: "projects",
    name: "Work & Ambitions",
    icon: Briefcase,
    description: "Follows the real story behind your projects, career shifts, and personal goals.",
    exampleData: {
      raw: "Mentioned: 'Meeting with manager went well, got good project feedback'",
      transformation: "Linking feedback to project goals discussed 3 weeks ago",
      modelState: "Goal Progress: Positive team review & milestone cleared",
    },
    color: "#a1a1aa",
  },
  {
    id: "life_events",
    name: "Life Chapters",
    icon: Calendar,
    description: "Milestones that mark major transitions in your life over time.",
    exampleData: {
      raw: "Milestone: 'Moving into the new apartment next week'",
      transformation: "Connecting packing reflections, neighborhood walks, and moving day",
      modelState: "Life Chapter: New City & Home Transition cataloged",
    },
    color: "#d4a373",
  },
  {
    id: "world_model",
    name: "The Memory Brain",
    icon: Orbit,
    description: "Every person, place, and event you mention gets connected automatically — you never tag or organize anything. Search a person's name and see everything you've ever said involving them, in order. Search an event and see everyone who was part of it. It looks like a map because that's what it is: a map of your life, built without you doing any of the mapping.",
    exampleData: {
      raw: "Search 'Priya'",
      transformation: "Traversing all linked memories, lunches, and voice notes across your history",
      modelState: "Result: Every lunch, conversation, and mention of her in order, going back as far as you've used the app",
    },
    color: "#f4f4f5",
  },
  {
    id: "insights",
    name: "Conversational Recall",
    icon: Lightbulb,
    description: "Ask natural questions about your life and get synthesized answers grounded in your own past words.",
    exampleData: {
      raw: "Question: 'How has my friendship with Priya changed since she moved?'",
      transformation: "Synthesizing memories, call frequency, and emotional depth",
      modelState: "Answer: 'You talk less often, but your conversations are significantly deeper.'",
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
            <span>The Memory Brain</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white leading-tight tracking-tight mb-6">
            Instead of searching through files,{" "}
            <span className="font-serif italic text-amber-200/90 block sm:inline">
              it remembers your life as it happens.
            </span>
          </h2>
          <p className="text-base text-white/60 leading-relaxed font-normal max-w-2xl mx-auto">
            Every person, place, and event you mention gets connected automatically — you never tag or organize anything.
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
