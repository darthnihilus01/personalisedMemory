"use client";

import { useState, useEffect } from "react";
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
    title: "Atlas Project Shift",
    category: "Project",
    icon: Compass,
    x: 48,
    y: 35,
    connections: ["marcus", "memo_vision", "series_a"],
    snippet: "Decided to pivot from linear tasks to context graphs after Marcus highlighted user drift.",
    timestamp: "2 hours ago • Audio Memo",
    color: "#a855f7", // purple
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
    color: "#ec4899", // pink
  },
  {
    id: "memo_vision",
    title: "Late Night Memo #42",
    category: "Voice Note",
    icon: Mic,
    x: 72,
    y: 28,
    connections: ["atlas", "philosophy_time"],
    snippet: "'Humans don't lose memories. They lose context.' Recorded while walking home.",
    timestamp: "Yesterday at 11:42 PM",
    color: "#3b82f6", // blue
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
    color: "#f59e0b", // amber
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
    color: "#10b981", // emerald
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
    color: "#f43f5e", // rose
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
    color: "#6366f1", // indigo
  },
];

export default function LivingWorldModelCanvas() {
  const [activeNodeId, setActiveNodeId] = useState<string>("atlas");
  const [isHovered, setIsHovered] = useState(false);

  const activeNode = NODES.find((n) => n.id === activeNodeId) || NODES[0];

  return (
    <div className="relative w-full h-[480px] sm:h-[580px] rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-2xl grid-bg group">
      {/* Background glow centers */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar overlay */}
      <div className="absolute top-4 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs text-white/70 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>LIVING WORLD MODEL • REAL-TIME GRAPH</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono text-white/40">
          <span>7 Active Clusters</span>
          <span>1,420 Linked Context Nodes</span>
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
              <g key={`${node.id}-${targetId}`}>
                <line
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${targetNode.x}%`}
                  y2={`${targetNode.y}%`}
                  stroke={isHighlighted ? "#c084fc" : "rgba(255,255,255,0.1)"}
                  strokeWidth={isHighlighted ? "1.75" : "1"}
                  strokeDasharray={isHighlighted ? "none" : "3 3"}
                  className="transition-all duration-500"
                />
                {isHighlighted && (
                  <circle
                    r="2.5"
                    fill="#e9d5ff"
                    className="animate-pulse"
                  >
                    <animateMotion
                      path={`M ${node.x * 4} ${node.y * 4} L ${targetNode.x * 4} ${targetNode.y * 4}`}
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
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
              className="absolute -translate-x-1/2 -translate-y-1/2 group/node focus:outline-none"
            >
              <div className="relative flex items-center justify-center">
                {/* Active Outer Pulsing Ring */}
                {isActive && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute -inset-3 rounded-full blur-sm"
                    style={{ backgroundColor: `${node.color}40` }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}

                {/* Node Pill / Icon */}
                <div
                  className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
                    isActive
                      ? "bg-white/15 text-white border-white/40 shadow-lg shadow-purple-500/20 scale-110"
                      : isConnected
                      ? "bg-white/10 text-white/90 border-white/20 scale-105"
                      : "bg-black/60 text-white/50 border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: node.color }}
                  />
                  <Icon className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span className="text-xs font-medium whitespace-nowrap">
                    {node.title}
                  </span>
                </div>
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
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="p-4 rounded-2xl bg-[#090b10]/90 backdrop-blur-xl border border-white/15 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold text-white/90"
                  style={{ backgroundColor: `${activeNode.color}30`, borderColor: activeNode.color }}
                >
                  {activeNode.category}
                </span>
                <span className="text-[11px] font-mono text-white/40">
                  {activeNode.timestamp}
                </span>
              </div>
              <span className="text-[10px] font-mono text-purple-300/80">
                {activeNode.connections.length} Connected Threads
              </span>
            </div>

            <h4 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
              {activeNode.title}
            </h4>
            <p className="text-xs text-white/70 leading-relaxed font-sans">
              "{activeNode.snippet}"
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interactive Helper Text */}
      <div className="absolute bottom-4 right-6 hidden sm:flex items-center gap-2 text-[11px] font-mono text-white/40 pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: "8s" }} />
        <span>Hover or tap nodes to explore living context</span>
      </div>
    </div>
  );
}
