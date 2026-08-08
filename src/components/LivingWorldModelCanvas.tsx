"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Users, Compass, Sparkles, Heart, Activity, Cpu } from "lucide-react";

interface NodeData {
  id: string;
  title: string;
  category: "Voice Note" | "Relationship" | "Project" | "Life Event" | "Insight" | "Goal";
  icon: any;
  x: number; // percentage
  y: number; // percentage
  connections: string[];
  snippet: string;
  timestamp: string;
  color: string;
}

const NODES: NodeData[] = [
  {
    id: "atlas",
    title: "Atlas Architecture Shift",
    category: "Project",
    icon: Compass,
    x: 48,
    y: 35,
    connections: ["marcus", "memo_vision", "series_a"],
    snippet: "Decided to pivot from linear task lists into a quiet context model after Marcus highlighted user drift.",
    timestamp: "2 hours ago • Audio Memo",
    color: "#d4a373", // warm stone
  },
  {
    id: "marcus",
    title: "Marcus (Co-founder)",
    category: "Relationship",
    icon: Users,
    x: 25,
    y: 45,
    connections: ["atlas", "tokyo_talk"],
    snippet: "Relationship deepened over 3 years. Shared focus on privacy-first offline models.",
    timestamp: "Continuous World Model update",
    color: "#f4f4f5", // zinc white
  },
  {
    id: "memo_vision",
    title: "Late Night Memo #42",
    category: "Voice Note",
    icon: Mic,
    x: 72,
    y: 28,
    connections: ["atlas", "philosophy_time"],
    snippet: "'Humans don't lose memories. They lose context.' Recorded walking home.",
    timestamp: "Yesterday at 11:42 PM",
    color: "#a1a1aa", // muted zinc
  },
  {
    id: "tokyo_talk",
    title: "Tokyo Architecture Retreat",
    category: "Life Event",
    icon: Sparkles,
    x: 18,
    y: 72,
    connections: ["marcus", "philosophy_time"],
    snippet: "Walks through Nezu Museum grounds. Shifted view on organic, non-linear software.",
    timestamp: "Nov 2025 • 8 Linked Memories",
    color: "#d4a373",
  },
  {
    id: "philosophy_time",
    title: "Context vs Search",
    category: "Insight",
    icon: Cpu,
    x: 55,
    y: 78,
    connections: ["memo_vision", "tokyo_talk", "sarah"],
    snippet: "Synthesis: Search retrieves words. Reasoning over living context retrieves true intent.",
    timestamp: "Evolving Synthesis",
    color: "#e4e4e7",
  },
  {
    id: "sarah",
    title: "Sarah (Sister)",
    category: "Relationship",
    icon: Heart,
    x: 82,
    y: 65,
    connections: ["philosophy_time", "memo_vision"],
    snippet: "Discussed family oral histories and how memory fades without continuous narrative context.",
    timestamp: "3 days ago • Call Transcript",
    color: "#f4f4f5",
  },
  {
    id: "series_a",
    title: "Founding Story Arc",
    category: "Goal",
    icon: Activity,
    x: 78,
    y: 82,
    connections: ["atlas"],
    snippet: "Synthesized product promise: 'Never lose context again.'",
    timestamp: "Updated Today",
    color: "#a1a1aa",
  },
];

export default function LivingWorldModelCanvas() {
  const [activeNodeId, setActiveNodeId] = useState<string>("atlas");
  const activeNode = NODES.find((n) => n.id === activeNodeId) || NODES[0];

  return (
    <div className="relative w-full h-[460px] sm:h-[540px] rounded-2xl bg-[#0d0d10] border border-white/10 overflow-hidden shadow-xl grid-bg-quiet group">
      {/* Quiet Header bar overlay */}
      <div className="absolute top-4 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-[#141418] px-3 py-1 rounded-full border border-white/10 text-xs text-white/60 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/90" />
          <span>LIVING WORLD MODEL • ORGANIC GRAPH</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono text-white/40">
          <span>Recency Edge Decay Active</span>
          <span>7 Connected Clusters</span>
        </div>
      </div>

      {/* SVG Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {NODES.map((node) =>
          node.connections.map((targetId) => {
            const targetNode = NODES.find((n) => n.id === targetId);
            if (!targetNode) return null;
            const isHighlighted =
              activeNodeId === node.id || activeNodeId === targetId;

            return (
              <line
                key={`${node.id}-${targetId}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${targetNode.x}%`}
                y2={`${targetNode.y}%`}
                stroke={isHighlighted ? "#d4a373" : "rgba(255,255,255,0.08)"}
                strokeWidth={isHighlighted ? "1.5" : "1"}
                strokeDasharray={isHighlighted ? "none" : "2 2"}
                className="transition-all duration-300"
              />
            );
          })
        )}
      </svg>

      {/* Interactive Nodes */}
      <div className="absolute inset-0 z-20">
        {NODES.map((node) => {
          const Icon = node.icon;
          const isActive = activeNodeId === node.id;
          const isConnected = activeNode.connections.includes(node.id) || node.connections.includes(activeNodeId);

          return (
            <button
              key={node.id}
              onClick={() => setActiveNodeId(node.id)}
              onMouseEnter={() => setActiveNodeId(node.id)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              id={`node-${node.id}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
            >
              <div
                className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 ${
                  isActive
                    ? "bg-white/15 text-white border-white/40 scale-105"
                    : isConnected
                    ? "bg-white/10 text-white/90 border-white/20"
                    : "bg-[#121216] text-white/50 border-white/10 hover:border-white/25 hover:text-white"
                }`}
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: node.color }}
                />
                <Icon className="w-3.5 h-3.5 shrink-0 opacity-70" />
                <span className="text-xs font-mono whitespace-nowrap">
                  {node.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Context Inspection Card (Bottom Left Overlay) */}
      <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-30 pointer-events-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-4 rounded-xl bg-[#141418] border border-white/15 shadow-xl space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-medium bg-white/10 text-white/80">
                {activeNode.category}
              </span>
              <span className="text-[11px] font-mono text-white/40">
                {activeNode.timestamp}
              </span>
            </div>

            <h4 className="text-sm font-medium text-white">
              {activeNode.title}
            </h4>
            <p className="text-xs text-white/70 leading-relaxed font-sans">
              "{activeNode.snippet}"
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Helper text */}
      <div className="absolute bottom-4 right-6 hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-white/40 pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-amber-400/80" />
        <span>Click or hover nodes to inspect narrative context</span>
      </div>
    </div>
  );
}
