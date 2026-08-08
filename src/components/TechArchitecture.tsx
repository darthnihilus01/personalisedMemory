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
    badge: "PRD Spec 3.3 • Entity Graph",
    title: "Zero-Tag Entity Resolution",
    subtitle: "Automatic deduplication across years of conversation",
    icon: GitMerge,
    description:
      "Manual tagging always fails. The engine automatically runs Named Entity Recognition (NER) and fuzzy context disambiguation—resolving 'Marcus', 'M', and 'co-founder' to the same canonical graph entity without asking you to organize a single folder.",
    prdSpecs: [
      { label: "Entity Matcher", value: "Fuzzy alias mapping + contextual co-occurrence" },
      { label: "Disambiguation", value: "Lightweight single-prompt resolution" },
      { label: "User Overhead", value: "0 manual tags, zero folders" },
    ],
    interactiveDemo: { type: "entity" },
  },
  {
    id: "security-physics",
    badge: "PRD Spec 7.0 • Privacy Physics",
    title: "Private-by-Physics Architecture",
    subtitle: "Local on-device ASR & per-user KMS vector isolation",
    icon: ShieldCheck,
    description:
      "Privacy is built as architectural physics, not policy promises. Raw speech audio is transcribed using on-device Whisper models before leaving your device. Vector stores are partitioned into isolated per-user namespaces with hardware KMS encryption keys.",
    prdSpecs: [
      { label: "On-Device ASR", value: "Local Whisper speech-to-text" },
      { label: "Key Management", value: "Per-user hardware KMS keys" },
      { label: "Model Training", value: "0% user content used for training" },
    ],
    interactiveDemo: { type: "security" },
  },
  {
    id: "writing-fingerprint",
    badge: "PRD Spec 3.6 • Style Compiler",
    title: "Writing Style Fingerprint",
    subtitle: "Compilation that sounds like you, not generic AI prose",
    icon: PenTool,
    description:
      "A background compilation service aggregates fragmented daily audio notes and compiles them into a cohesive diary entry. The engine learns your personal vocabulary fingerprint, sentence cadence, and phrasing over time.",
    prdSpecs: [
      { label: "Compilation Job", value: "Automated end-of-day batch" },
      { label: "Tone Adaptation", value: "Learned vocabulary & sentence length profile" },
      { label: "Constraint", value: "100% Hallucination-free preservation" },
    ],
    interactiveDemo: { type: "style" },
  },
  {
    id: "graph-physics",
    badge: "PRD Spec 4.0 • Memory Brain",
    title: "Force-Directed Graph Physics",
    subtitle: "Obsidian-style layout with recency edge-fading",
    icon: Layers,
    description:
      "Inspired by force-directed physics layouts, nodes represent entities while weighted edges reflect mention frequency and emotional co-occurrence. Older, unrenewed connections gracefully fade over time, ensuring your graph reflects your current life.",
    prdSpecs: [
      { label: "Graph Engine", value: "Force-directed physics with draggable nodes" },
      { label: "Edge Weight", value: "Frequency + Recency temporal decay" },
      { label: "Zoom Planes", value: "Whole-life → Time-windowed → Local entity" },
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
            <span>Technical Architecture Specs</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white leading-tight tracking-tight mb-6">
            Invisible sophistication.{" "}
            <span className="font-serif italic text-gradient-purple block sm:inline">
              Zero manual overhead.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed font-normal">
            If a memory system requires manual tagging, folder management, or keyword indexing, it has failed.
            Here is how the engine operates behind the scenes.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {PRD_FEATURES.map((feature) => {
            const Icon = feature.icon;
            const isActive = feature.id === activeTabId;
            return (
              <button
                key={feature.id}
                onClick={() => setActiveTabId(feature.id)}
                id={`tech-tab-${feature.id}`}
                className={`p-5 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between ${
                  isActive
                    ? "bg-white/[0.08] border-purple-500/50 shadow-lg shadow-purple-950/30 scale-[1.02]"
                    : "glass-panel border-white/[0.08] hover:border-white/20 hover:bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                      isActive
                        ? "bg-purple-500 text-white border-purple-400"
                        : "bg-white/[0.05] text-white/60 border-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-purple-400 block mb-1">
                    {feature.badge}
                  </span>
                  <h3 className="text-sm font-semibold text-white">
                    {feature.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Feature Interactive Breakdown Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/15 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left specs detail */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300">
                <span>{activeFeature.badge}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-light text-white leading-snug">
                {activeFeature.subtitle}
              </h3>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-sans">
                {activeFeature.description}
              </p>

              {/* PRD Specs List */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                {activeFeature.prdSpecs.map((spec, i) => (
                  <div key={i} className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white/40">{spec.label}</span>
                    <span className="text-purple-300 font-medium">{spec.value}</span>
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
                      <span>Alias Normalization Pipeline</span>
                      <span className="text-emerald-400">Auto-Resolved</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-white/70">
                      Raw Transcript Mentions: "M", "Marcus from work", "Amit", "co-founder"
                    </div>
                    <div className="flex items-center justify-center py-1">
                      <ArrowUpRight className="w-4 h-4 text-purple-400 rotate-90" />
                    </div>
                    <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/40 text-xs font-mono text-purple-200 space-y-1">
                      <div className="flex items-center justify-between font-bold">
                        <span>Canonical Entity ID: #ENT-8492</span>
                        <span className="text-[10px] bg-purple-500/20 px-2 py-0.5 rounded text-purple-300">PERSON</span>
                      </div>
                      <div>Canonical Name: Marcus (Co-founder)</div>
                      <div className="text-white/50 text-[11px]">Aliases: ["M", "Marcus", "co-founder"] • 48 linked fragments</div>
                    </div>
                  </div>
                )}

                {activeFeature.interactiveDemo.type === "security" && (
                  <div className="space-y-3">
                    <div className="text-xs font-mono text-white/40 uppercase tracking-widest flex items-center justify-between">
                      <span>Defense-In-Depth Security Pipeline</span>
                      <span className="text-emerald-400">Encrypted</span>
                    </div>
                    <div className="space-y-2">
                      <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs font-mono text-emerald-200 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>On-Device Whisper ASR: 0 bytes of raw voice leave device</span>
                      </div>
                      <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs font-mono text-purple-200 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-purple-400" />
                        <span>Hardware KMS Key: AES-256 Per-User Vector Namespace</span>
                      </div>
                      <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs font-mono text-blue-200 flex items-center gap-2">
                        <EyeOff className="w-4 h-4 text-blue-400" />
                        <span>Architectural Guarantee: Zero Model Fine-Tuning on User Content</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeFeature.interactiveDemo.type === "style" && (
                  <div className="space-y-3">
                    <div className="text-xs font-mono text-white/40 uppercase tracking-widest flex items-center justify-between">
                      <span>End-of-Day Style Compilation</span>
                      <span className="text-purple-400">Learned Tone Profile</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-white/60">
                      Raw Audio Fragments (3): Spoken at 8 AM, 2 PM, 11 PM
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-950/30 to-black border border-purple-500/30 text-xs text-white/90 font-serif italic leading-relaxed">
                      "November 14th — A quiet breakthrough on the architecture. Marcus and I realized that filing systems are dead. We spent the walk through Nezu discussing how memory should feel organic, like Obsidian graph physics."
                    </div>
                    <div className="text-[10px] font-mono text-emerald-400">
                      ✓ Style Match: 98.4% vocabulary fingerprint alignment
                    </div>
                  </div>
                )}

                {activeFeature.interactiveDemo.type === "physics" && (
                  <div className="space-y-3">
                    <div className="text-xs font-mono text-white/40 uppercase tracking-widest flex items-center justify-between">
                      <span>Obsidian-Style Force Physics</span>
                      <span className="text-amber-400">Recency Edge Fading</span>
                    </div>
                    <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-white">Marcus (Co-founder)</span>
                        <span className="text-purple-400">Weight: 98 • Active Edge</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="w-[95%] h-full bg-purple-500 rounded-full" />
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono pt-2">
                        <span className="text-white/50">Old Client Project (2023)</span>
                        <span className="text-white/30">Weight: 12 • Faded Edge</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="w-[15%] h-full bg-white/20 rounded-full" />
                      </div>
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
