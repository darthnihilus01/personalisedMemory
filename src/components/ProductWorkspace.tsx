"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Search, Users, Compass, Orbit, Sparkles, Clock, ArrowRight, ShieldCheck, ChevronRight, X, UserCheck, Layers, FileText, CheckCircle2, MessageSquare } from "lucide-react";

interface MemoryItem {
  id: string;
  title: string;
  category: "Voice Note" | "Connected Memory" | "Relationship Shift" | "Project Pivot";
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
    title: "Lunch with Priya — Career Transition",
    category: "Voice Note",
    timestamp: "Today at 1:30 PM • 45s audio",
    people: ["Priya"],
    summary: "Quick memo after lunch. Priya told me she's finally quitting her job to start her own business. Really excited for her.",
    rawQuote: "Just had lunch with Priya, and she told me she's finally quitting her job. Really happy for her.",
    inference: "Major career update for Priya; marked for long-term friendship follow-up.",
    tags: ["Priya", "Career Shift", "Friendship"],
  },
  {
    id: "mem-2",
    title: "Tuesday, Oct 14",
    category: "Connected Memory",
    timestamp: "Yesterday • End of day",
    people: ["Priya", "Mom"],
    summary: "Started a bit rough waking up late. Had lunch with Priya celebrating her news. Afternoon project review with team went smoothly, followed by a quick check-in call with Mom.",
    rawQuote: "Mom mentioned her knee physical therapy is going well. Team gave great feedback on the project.",
    inference: "Mood shifted from sluggish morning to energized and upbeat afternoon.",
    tags: ["Daily Synthesis", "Priya", "Mom"],
  },
  {
    id: "mem-3",
    title: "Sunday Phone Call with Mom",
    category: "Voice Note",
    timestamp: "Last Sunday • 2 min reflection",
    people: ["Mom"],
    summary: "Mom shared updates about volunteering at the neighborhood library and Aunt Linda's move.",
    rawQuote: "Mom sounded really relaxed talking about her new weekend volunteering schedule.",
    inference: "Family life updates captured naturally in passing without dedicated note-taking.",
    tags: ["Family Core", "Mom", "Updates"],
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
    id: "priya",
    name: "Priya",
    role: "Close Friend",
    coOccurrences: 14,
    lastMentioned: "Today at 1:30 PM",
    trustScore: "Close Friend",
    narrativeArc: "Regular catch-ups over coffee and walks. Transitioned from former co-worker in 2023 to close confidant through career changes and city moves.",
    recentMemories: [
      "Lunch with Priya — Career Transition",
      "Monthly Sunday Phone Catch-up",
      "Oct 12 Weekend Visit",
    ],
  },
  {
    id: "mom",
    name: "Mom",
    role: "Family Core",
    coOccurrences: 28,
    lastMentioned: "Sunday at 6:00 PM",
    trustScore: "Family Core",
    narrativeArc: "Weekly Sunday calls and passing reflections on knee recovery, library volunteering, and family updates.",
    recentMemories: [
      "Sunday Phone Call with Mom",
      "September Family Check-in",
      "Knee Physical Therapy Update",
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
  const [query, setQuery] = useState("How has my friendship with Priya changed since she moved cities?");
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
        <div className="flex items-center gap-1 bg-[#121215] p-1 rounded-xl border border-white/[0.08] overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab("feed")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap flex-shrink-0 ${
              activeTab === "feed"
                ? "bg-white/10 text-white font-medium shadow-sm"
                : "text-white/50 hover:text-white"
            }`}
          >
            Memories
          </button>
          <button
            onClick={() => setActiveTab("people")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap flex-shrink-0 ${
              activeTab === "people"
                ? "bg-white/10 text-white font-medium shadow-sm"
                : "text-white/50 hover:text-white"
            }`}
          >
            People
          </button>
          <button
            onClick={() => setActiveTab("graph")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap flex-shrink-0 ${
              activeTab === "graph"
                ? "bg-white/10 text-white font-medium shadow-sm"
                : "text-white/50 hover:text-white"
            }`}
          >
            The Memory Engine
          </button>
          <button
            onClick={() => setActiveTab("reasoning")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap flex-shrink-0 ${
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
                Listening... "Just had lunch with Priya... she's quitting her job..."
              </span>
            ) : recordingSuccess ? (
              <span className="text-xs font-mono text-teal-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Added to memory • Resolved Priya (Friend) & Career Transition
              </span>
            ) : (
              <input
                type="text"
                readOnly
                placeholder="Say it messy. We'll clean it up and connect it."
                onClick={handleStartRecord}
                className="w-full bg-transparent text-xs text-white/80 placeholder-white/40 focus:outline-none cursor-pointer min-w-0"
              />
            )}
          </div>

          <button
            onClick={handleStartRecord}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${
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
        <div className="panel-quiet p-6 sm:p-8 rounded-2xl max-w-4xl mx-auto text-center space-y-6">
          <div className="space-y-2 text-left pb-4 border-b border-white/[0.08]">
            <h3 className="text-lg font-medium text-white">The Memory Engine</h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
              Every person, place, and event you mention gets connected automatically — you never tag or organize anything. Search a person's name and see everything you've ever said involving them, in order. Search an event and see everyone who was part of it. It looks like a map because that's what it is: a map of your life, built without you doing any of the mapping.
            </p>
            <p className="text-xs font-mono text-amber-300/90 pt-1">
              e.g., Search "Priya" → every lunch, every conversation, every mention of her, going back as far as you've been using the app.
            </p>
          </div>

          <div className="relative h-80 rounded-xl bg-[#09090b] border border-white/10 flex items-center justify-center overflow-hidden">
            {/* Visual SVG Nodes representation */}
            <svg className="absolute inset-0 w-full h-full">
              <line x1="25%" y1="50%" x2="50%" y2="35%" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
              <line x1="50%" y1="35%" x2="75%" y2="55%" stroke="rgba(212,163,115,0.4)" strokeWidth="2" />
              <line x1="50%" y1="35%" x2="50%" y2="75%" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
            </svg>

            <div className="relative z-10 flex items-center justify-around w-full px-8">
              <div className="p-3 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-white">
                Priya (Close Friend)
              </div>
              <div className="p-4 rounded-full bg-amber-500/20 border border-amber-500/40 text-xs font-mono text-amber-200">
                Career Transition
              </div>
              <div className="p-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/50">
                Mom (Family)
              </div>
            </div>
          </div>
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
              Ask
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
                  You talk less frequently (dropping from weekly dinners to a 45-minute monthly Sunday call), but conversations are significantly longer and deeper. In your last 3 voice notes, you noted feeling closer despite the distance, especially after supporting each other through her career transition.
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
                    <span>Audio Memo #14 • Lunch Catch-up</span>
                  </div>
                  <p className="text-white/90 italic">"Just had lunch with Priya, and she told me she's finally quitting her job. Really happy for her."</p>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono space-y-1">
                  <div className="flex items-center gap-2 text-amber-300">
                    <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-[10px] text-amber-200">ENGINE INFERENCE</span>
                    <span>Synthesis</span>
                  </div>
                  <p className="text-amber-100/90">Communication volume dropped ~60%, but emotional depth and mutual support increased.</p>
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
