"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Search, Users, Compass, Orbit, Sparkles, Clock, ArrowRight, ShieldCheck, ChevronRight, X, UserCheck, Layers, FileText, CheckCircle2, MessageSquare } from "lucide-react";

interface MemoryItem {
  id: string;
  title: string;
  category: "Voice Note" | "Compiled Entry" | "Relationship Shift" | "Project Pivot";
  timestamp: string;
  people: string[];
  summary: string;
  rawQuote?: string;
  inference?: string;
  tags: string[];
}

const MEMORY_FEED: MemoryItem[] = [
  {
    id: "mem-1",
    title: "Atlas Architecture Shift & Autonomy Thesis",
    category: "Voice Note",
    timestamp: "Today at 2:14 PM • 3 min audio",
    people: ["Marcus"],
    summary: "Recorded walking through SF. Decided to pivot Atlas from a task list into a quiet background memory model. Realized filing folders rots memory.",
    rawQuote: "We shouldn't ask users to tag or organize anything. Memory should just sit quietly in the background and connect their life.",
    inference: "Shifted core product philosophy from productivity tracking to organic identity modeling.",
    tags: ["Atlas Project", "Product Philosophy", "Autonomy"],
  },
  {
    id: "mem-2",
    title: "Daily Compilation — Nov 14, 2025",
    category: "Compiled Entry",
    timestamp: "Yesterday • End-of-Day Batch",
    people: ["Marcus", "Sarah"],
    summary: "Morning coffee with Sarah discussing family oral history. Afternoon product review with Marcus. Realigned co-founder vision around privacy-first offline models.",
    rawQuote: "Sarah mentioned vintage Japanese ceramics during our walk. Marcus challenged my linear roadmap.",
    inference: "Co-founder alignment increased to 95%. Relationship arc entering high-trust phase.",
    tags: ["Daily Synthesis", "Marcus", "Sarah"],
  },
  {
    id: "mem-3",
    title: "Tokyo Architecture Retreat & Nezu Gardens",
    category: "Project Pivot",
    timestamp: "2 weeks ago • Nov 2025",
    people: ["Marcus"],
    summary: "Reflections on Japanese organic spatial layout. Realized software interfaces should feel like composed quiet gardens rather than frantic SaaS dashboards.",
    rawQuote: "The museum grounds don't force paths. You wander through natural spatial connections.",
    inference: "Directly inspired the force-directed memory graph layout.",
    tags: ["Tokyo Retreat", "Design Principles"],
  },
];

interface PersonProfile {
  id: string;
  name: string;
  role: string;
  coOccurrences: number;
  lastMentioned: string;
  trustScore: string;
  narrativeArc: string;
  recentMemories: string[];
}

const PEOPLE_DATA: PersonProfile[] = [
  {
    id: "marcus",
    name: "Marcus",
    role: "Co-founder & Product Lead",
    coOccurrences: 48,
    lastMentioned: "Today at 2:14 PM",
    trustScore: "95% High Alignment",
    narrativeArc: "Evolved from cautious technical collaborator in 2023 to deep strategic co-founder. Pivotal moment occurred during the SF walk when Marcus challenged the linear roadmap.",
    recentMemories: [
      "Atlas Architecture Shift & Autonomy Thesis",
      "Tokyo Architecture Retreat & Nezu Gardens",
      "Series A Vision Alignment Session",
    ],
  },
  {
    id: "sarah",
    name: "Sarah",
    role: "Sister & Design Advisor",
    coOccurrences: 18,
    lastMentioned: "Yesterday at 9:30 AM",
    trustScore: "Family Core",
    narrativeArc: "Frequent walks discussing family oral history, design aesthetics, and rare print typography. Prefers quiet experiences over material gifts.",
    recentMemories: [
      "SF Walk & Japanese Ceramics Discussion",
      "Family Memory Archive Conversation",
    ],
  },
];

export default function ProductWorkspace() {
  const [activeTab, setActiveTab] = useState<"feed" | "people" | "graph" | "reasoning">("feed");
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<PersonProfile | null>(null);
  
  // Voice Recording Simulation
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSuccess, setRecordingSuccess] = useState(false);

  // Conversational Recall State
  const [query, setQuery] = useState("How has my relationship with Marcus changed over 3 years?");
  const [searched, setSearched] = useState(true);

  const handleStartRecord = () => {
    setIsRecording(true);
    setRecordingSuccess(false);
    setTimeout(() => {
      setIsRecording(false);
      setRecordingSuccess(true);
      setTimeout(() => setRecordingSuccess(false), 4000);
    }, 2500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Product Top Header & Navigation Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-400/90 animate-pulse" />
            <h2 className="text-sm font-mono uppercase tracking-widest text-white/80 font-medium">
              Personal Memory Engine • Live Workspace
            </h2>
          </div>
          <p className="text-xs text-white/50 font-sans">
            Continuously building an evolving model of your life.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-[#121215] p-1 rounded-xl border border-white/[0.08]">
          <button
            onClick={() => setActiveTab("feed")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === "feed"
                ? "bg-white/10 text-white font-medium shadow-sm"
                : "text-white/50 hover:text-white"
            }`}
          >
            Memories
          </button>
          <button
            onClick={() => setActiveTab("people")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === "people"
                ? "bg-white/10 text-white font-medium shadow-sm"
                : "text-white/50 hover:text-white"
            }`}
          >
            People
          </button>
          <button
            onClick={() => setActiveTab("graph")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === "graph"
                ? "bg-white/10 text-white font-medium shadow-sm"
                : "text-white/50 hover:text-white"
            }`}
          >
            Memory Graph
          </button>
          <button
            onClick={() => setActiveTab("reasoning")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === "reasoning"
                ? "bg-white/10 text-white font-medium shadow-sm"
                : "text-white/50 hover:text-white"
            }`}
          >
            Reasoning Engine
          </button>
        </div>
      </div>

      {/* Floating Lightweight Voice Capture Bar */}
      <div className="mb-10 max-w-2xl mx-auto">
        <div className="panel-quiet p-2.5 rounded-2xl flex items-center justify-between gap-3 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-3 pl-3 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isRecording ? "bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse" : "bg-white/[0.05] text-white/60 border border-white/10"
            }`}>
              <Mic className="w-4 h-4" />
            </div>
            {isRecording ? (
              <span className="text-xs font-mono text-red-300 animate-pulse">
                Listening... "Recorded walking through SF..."
              </span>
            ) : recordingSuccess ? (
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Added to memory • Resolved Marcus & Atlas Project
              </span>
            ) : (
              <input
                type="text"
                readOnly
                placeholder="Say it. We'll remember."
                onClick={handleStartRecord}
                className="w-full bg-transparent text-xs text-white/80 placeholder-white/40 focus:outline-none cursor-pointer"
              />
            )}
          </div>

          <button
            onClick={handleStartRecord}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
              isRecording
                ? "bg-red-500/20 text-red-300 border border-red-500/30"
                : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
            }`}
          >
            <span>{isRecording ? "Recording..." : "Tap to Speak"}</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: RECENT MEMORIES FEED */}
      {activeTab === "feed" && (
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-between text-xs font-mono text-white/40 px-1 mb-2">
            <span>RECENT MEMORY STREAM</span>
            <span>3 Captured Events</span>
          </div>

          {MEMORY_FEED.map((mem) => (
            <div
              key={mem.id}
              onClick={() => setSelectedMemory(mem)}
              className="panel-quiet panel-quiet-hover p-6 rounded-2xl cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/[0.06] text-white/70 border border-white/10">
                    {mem.category}
                  </span>
                  <span className="text-xs font-mono text-white/40">{mem.timestamp}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-amber-300/80">
                  <Users className="w-3.5 h-3.5" />
                  <span>{mem.people.join(", ")}</span>
                </div>
              </div>

              <h3 className="text-lg font-medium text-white">{mem.title}</h3>
              <p className="text-xs text-white/70 leading-relaxed font-sans">{mem.summary}</p>

              {/* Visual Trust Indicator Badges */}
              <div className="pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] text-white/60 border border-white/10">
                    User Said
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-200/90 border border-amber-500/20">
                    Engine Inference
                  </span>
                </div>
                <span className="text-white/40 flex items-center gap-1 hover:text-white">
                  Inspect Narrative <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 2: PEOPLE & RELATIONSHIPS */}
      {activeTab === "people" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {PEOPLE_DATA.map((person) => (
            <div
              key={person.id}
              onClick={() => setSelectedPerson(person)}
              className="panel-quiet panel-quiet-hover p-6 rounded-2xl cursor-pointer space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center font-mono text-sm text-white font-medium">
                      {person.name[0]}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{person.name}</h3>
                      <span className="text-xs text-white/50">{person.role}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {person.trustScore}
                  </span>
                </div>

                <p className="text-xs text-white/70 leading-relaxed font-sans mb-4">
                  {person.narrativeArc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-white/40">
                <span>{person.coOccurrences} Mentions</span>
                <span>{person.lastMentioned}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 3: MEMORY GRAPH */}
      {activeTab === "graph" && (
        <div className="panel-quiet p-6 rounded-2xl max-w-4xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 text-xs font-mono">
            <span className="text-white/60">OBSIDIAN-STYLE FORCE GRAPH</span>
            <span className="text-amber-400/90">Recency Edge Fading Active</span>
          </div>

          <div className="relative h-80 rounded-xl bg-[#09090b] border border-white/10 flex items-center justify-center overflow-hidden">
            {/* Visual SVG Nodes representation */}
            <svg className="absolute inset-0 w-full h-full">
              <line x1="25%" y1="50%" x2="50%" y2="35%" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
              <line x1="50%" y1="35%" x2="75%" y2="55%" stroke="rgba(212,163,115,0.4)" strokeWidth="2" />
              <line x1="50%" y1="35%" x2="50%" y2="75%" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
            </svg>

            <div className="relative z-10 flex items-center justify-around w-full px-12">
              <div className="p-3 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-white">
                Marcus (Co-founder)
              </div>
              <div className="p-4 rounded-full bg-amber-500/20 border border-amber-500/40 text-xs font-mono text-amber-200">
                Atlas Project Shift
              </div>
              <div className="p-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/50">
                Tokyo Retreat
              </div>
            </div>
          </div>

          <p className="text-xs text-white/60 font-sans max-w-md mx-auto">
            Nodes represent people, projects, and events. Edges reflect mention frequency and decay gracefully over time unless reinforced.
          </p>
        </div>
      )}

      {/* VIEW 4: REASONING ENGINE (TRUST UI) */}
      {activeTab === "reasoning" && (
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="panel-quiet p-4 rounded-2xl flex items-center gap-3">
            <Search className="w-4 h-4 text-white/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-white font-mono focus:outline-none"
            />
            <button
              onClick={() => setSearched(true)}
              className="px-4 py-1.5 rounded-lg bg-white/10 text-white font-mono text-xs hover:bg-white/15"
            >
              Reason
            </button>
          </div>

          {searched && (
            <div className="panel-quiet p-6 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 text-xs font-mono">
                <span className="text-amber-400">Contextual Reasoning Output</span>
                <span className="text-white/40">3 Verified Sources</span>
              </div>

              <div className="space-y-4 font-sans text-sm text-white/90 leading-relaxed">
                <p>
                  Your relationship with Marcus evolved from technical collaboration in early 2023 to deep strategic alignment during the November 2025 Tokyo trip.
                </p>
              </div>

              {/* Trust Differentiation Block */}
              <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest block">
                  Ground Truth vs Engine Inference
                </span>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono space-y-1">
                  <div className="flex items-center gap-2 text-white/60">
                    <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-white">USER SAID</span>
                    <span>Audio Memo #42 • SF Walk</span>
                  </div>
                  <p className="text-white/90 italic">"Marcus challenged my linear roadmap and urged me to build an organic memory model."</p>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono space-y-1">
                  <div className="flex items-center gap-2 text-amber-300">
                    <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-[10px] text-amber-200">ENGINE INFERENCE</span>
                    <span>Synthesis</span>
                  </div>
                  <p className="text-amber-100/90">Co-founder trust index reached 95% following the Atlas architectural alignment.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* NARRATIVE MEMORY DETAIL SHEET (MODAL/DRAWER) */}
      <AnimatePresence>
        {selectedMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMemory(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-2xl panel-quiet p-8 rounded-2xl shadow-2xl z-10 space-y-6 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {selectedMemory.category}
                </span>
                <h3 className="text-2xl font-semibold text-white">{selectedMemory.title}</h3>
                <span className="text-xs font-mono text-white/40 block">{selectedMemory.timestamp}</span>
              </div>

              <div className="space-y-4 text-sm text-white/80 font-sans leading-relaxed">
                <div>
                  <h4 className="text-xs font-mono text-white/40 uppercase mb-1">Summary</h4>
                  <p>{selectedMemory.summary}</p>
                </div>

                {selectedMemory.rawQuote && (
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs text-white/90">
                    <span className="text-[10px] text-white/40 uppercase block mb-1">User Explicit Statement</span>
                    "{selectedMemory.rawQuote}"
                  </div>
                )}

                {selectedMemory.inference && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 font-mono text-xs text-amber-200">
                    <span className="text-[10px] text-amber-400 uppercase block mb-1">Synthesized Impact</span>
                    {selectedMemory.inference}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
