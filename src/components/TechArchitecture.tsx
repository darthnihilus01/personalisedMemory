"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, ShieldCheck, GitMerge, PenTool, Database, Lock, EyeOff, Sparkles, Layers, ArrowUpRight } from "lucide-react";

interface FeatureCard {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  icon: any;
  description: string;
  prdSpecs: {
    label: string;
    value: string;
  }[];
  interactiveDemo: {
    type: "entity" | "security" | "style" | "physics";
  };
}

const PRD_FEATURES: FeatureCard[] = [
  {
    id: "entity-resolution",
    badge: "Effortless Organization",
    title: "Automatic People & Place Connections",
    subtitle: "Connects everyone and everything without folders or manual tagging",
    icon: GitMerge,
    description:
      "Manual tagging always fails. Every person, place, and event you mention gets connected automatically — you never tag or organize anything. If you mention 'Priya', 'P', or 'my friend from lunch', it knows it's the same Priya, linking every memory without you lifting a finger.",
    prdSpecs: [
      { label: "People & Places", value: "Automatically recognized from natural speech" },
      { label: "Nickname Linking", value: "Connects first names, nicknames, and context" },
      { label: "Manual Work", value: "0 tags, 0 folders, 0 organizing" },
    ],
    interactiveDemo: { type: "entity" },
  },
  {
    id: "security-physics",
    badge: "Privacy First",
    title: "Private by Design",
    subtitle: "Voice transcription happens on your device • 100% private memory",
    icon: ShieldCheck,
    description:
      "Your personal thoughts and life reflections belong to you alone. Voice notes are transcribed locally on your device, your private memories are encrypted with dedicated keys, and your words are never used to train public AI models.",
    prdSpecs: [
      { label: "Voice Processing", value: "Transcribed locally on your device" },
      { label: "Data Encryption", value: "Private hardware-level encryption keys" },
      { label: "AI Training", value: "0% of your diary is ever used for model training" },
    ],
    interactiveDemo: { type: "security" },
  },
  {
    id: "writing-fingerprint",
    badge: "Daily Compilation",
    title: "Compiled in Your Exact Voice",
    subtitle: "Cleaned up into a daily entry that sounds like you wrote it",
    icon: PenTool,
    description:
      "At the end of each day, the app gathers your quick audio fragments and compiles them into a single, beautifully written diary page. It learns your unique phrasing, vocabulary, and rhythm — never making things up or sounding like generic AI.",
    prdSpecs: [
      { label: "Daily Compilation", value: "Automatic end-of-day summary" },
      { label: "Voice Matching", value: "Uses your real phrasing and vocabulary" },
      { label: "Accuracy Guarantee", value: "Only includes facts you actually mentioned" },
    ],
    interactiveDemo: { type: "style" },
  },
  {
    id: "graph-physics",
    badge: "The Memory Brain",
    title: "The Memory Brain (Visual Life Map)",
    subtitle: "A map of your life, built without you doing any of the mapping",
    icon: Layers,
    description:
      "The Memory Brain. Every person, place, and event you mention gets connected automatically — you never tag or organize anything. Search a person's name and see everything you've ever said involving them, in order. Search an event and see everyone who was part of it. It looks like a map because that's what it is: a map of your life, built without you doing any of the mapping.\n\ne.g., Search 'Priya' → every lunch, every conversation, every mention of her, going back as far as you've been using the app.",
    prdSpecs: [
      { label: "Visual Memory Map", value: "Connects people, milestones, and places" },
      { label: "Recency Focus", value: "Current relationships and active projects stay centered" },
      { label: "Search Anything", value: "Look up any person to see your full history together" },
    ],
    interactiveDemo: { type: "physics" },
  },
];

export default function TechArchitecture() {
  const [activeTabId, setActiveTabId] = useState<string>("entity-resolution");
  const activeFeature = PRD_FEATURES.find((f) => f.id === activeTabId) || PRD_FEATURES[0];

  return (
    <section id="architecture" className="py-24 md:py-36 relative bg-[#060709] border-t border-white/[0.06]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[400px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-white/10 text-xs font-mono uppercase tracking-widest text-purple-400 mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Behind the Technology</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white leading-tight tracking-tight mb-6">
            Engineered for clarity,{" "}
            <span className="font-serif italic text-purple-300 block sm:inline">
              built for absolute privacy.
            </span>
          </h2>
          <p className="text-base text-white/60 leading-relaxed font-normal">
            Every feature is designed so you can talk naturally while the app does the heavy lifting in the background.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          {PRD_FEATURES.map((feature) => {
            const Icon = feature.icon;
            const isActive = feature.id === activeTabId;
            return (
              <button
                key={feature.id}
                onClick={() => setActiveTabId(feature.id)}
                id={`tab-feature-${feature.id}`}
                className={`p-4 rounded-xl text-left transition-all border ${
                  isActive
                    ? "bg-white/[0.08] border-white/30 shadow-lg scale-[1.02]"
                    : "bg-white/[0.02] border-white/10 hover:bg-white/[0.04] text-white/70"
                }`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <Icon className={`w-4 h-4 ${isActive ? "text-purple-400" : "text-white/40"}`} />
                  <span className="text-[10px] font-mono text-purple-300 uppercase tracking-widest">
                    {feature.badge}
                  </span>
                </div>
                <div className={`text-sm font-medium ${isActive ? "text-white" : "text-white/80"}`}>
                  {feature.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feature Detail Inspector Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="panel-quiet p-8 sm:p-12 rounded-3xl border border-white/15 bg-[#0b0d13] shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400">
                <activeFeature.icon className="w-4 h-4" />
                <span>{activeFeature.badge}</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-light text-white mb-2">
                  {activeFeature.title}
                </h3>
                <p className="text-sm font-mono text-white/50">{activeFeature.subtitle}</p>
              </div>

              <p className="text-sm text-white/80 leading-relaxed font-sans whitespace-pre-line">
                {activeFeature.description}
              </p>

              {/* Specs List */}
              <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                {activeFeature.prdSpecs.map((spec, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1">
                    <span className="font-mono text-white/50">{spec.label}</span>
                    <span className="font-mono text-purple-200 text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Interactive Visual Simulation */}
            <div className="lg:col-span-6">
              <div className="p-6 rounded-2xl bg-[#090b10] border border-white/10 shadow-inner space-y-4">
                {activeFeature.interactiveDemo.type === "entity" && (
                  <div className="space-y-3">
                    <div className="text-xs font-mono text-white/40 uppercase tracking-widest flex items-center justify-between">
                      <span>Automatic People Connection</span>
                      <span className="text-emerald-400">Auto-Linked</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-white/70">
                      Raw Mentions: "Priya", "P", "my friend from lunch"
                    </div>
                    <div className="flex items-center justify-center py-1">
                      <ArrowUpRight className="w-4 h-4 text-purple-400 rotate-90" />
                    </div>
                    <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/40 text-xs font-mono text-purple-200 space-y-1">
                      <div className="flex items-center justify-between font-bold">
                        <span>Connected Person Profile</span>
                        <span className="text-[10px] bg-purple-500/20 px-2 py-0.5 rounded text-purple-300">FRIEND</span>
                      </div>
                      <div>Priya (Close Friend)</div>
                      <div className="text-white/50 text-[11px]">All mentions linked • 14 conversations across 2 years</div>
                    </div>
                  </div>
                )}

                {activeFeature.interactiveDemo.type === "security" && (
                  <div className="space-y-3">
                    <div className="text-xs font-mono text-white/40 uppercase tracking-widest flex items-center justify-between">
                      <span>Private Architecture</span>
                      <span className="text-emerald-400">Encrypted</span>
                    </div>
                    <div className="space-y-2">
                      <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs font-mono text-emerald-200 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>On-Device Audio Transcription: Spoken audio stays on your phone</span>
                      </div>
                      <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs font-mono text-purple-200 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-purple-400" />
                        <span>Encrypted Storage: Protected by your private device keys</span>
                      </div>
                      <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs font-mono text-blue-200 flex items-center gap-2">
                        <EyeOff className="w-4 h-4 text-blue-400" />
                        <span>Privacy Guarantee: Zero user memories used for AI model training</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeFeature.interactiveDemo.type === "style" && (
                  <div className="space-y-3">
                    <div className="text-xs font-mono text-white/40 uppercase tracking-widest flex items-center justify-between">
                      <span>End-of-Day Diary Compilation</span>
                      <span className="text-purple-400">Your Voice</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-white/60">
                      Raw Voice Notes (3): Spoken at 9 AM, 1:30 PM, 6:45 PM
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-950/30 to-black border border-purple-500/30 text-xs text-white/90 font-serif italic leading-relaxed">
                      "Today started a bit rough — woke up late and missed the gym again. Had lunch with Priya and she told me she's finally quitting her job, which made me really happy for her. My meeting with my manager went well in the afternoon, and I got good feedback on the project."
                    </div>
                    <div className="text-[10px] font-mono text-emerald-400">
                      ✓ Cleaned up and compiled without losing your actual words
                    </div>
                  </div>
                )}

                {activeFeature.interactiveDemo.type === "physics" && (
                  <div className="space-y-3">
                    <div className="text-xs font-mono text-white/40 uppercase tracking-widest flex items-center justify-between">
                      <span>Visual Life Map</span>
                      <span className="text-amber-400">The Memory Brain</span>
                    </div>
                    <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-white">Priya (Close Friend)</span>
                        <span className="text-purple-400">14 Linked Memories • Active</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="w-[95%] h-full bg-purple-500 rounded-full" />
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono pt-2">
                        <span className="text-white/70">Team Project Milestone</span>
                        <span className="text-purple-400/80">6 Linked Memories • Recent</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="w-[65%] h-full bg-purple-400/60 rounded-full" />
                      </div>
                    </div>
                    <div className="text-[11px] font-mono text-amber-300/90 pt-1">
                      Search "Priya" → every lunch, conversation, and mention in order.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
