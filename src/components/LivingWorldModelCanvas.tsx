"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Users, Sparkles, Heart, Activity, type LucideIcon } from "lucide-react";

interface NodeData {
  id: string;
  title: string;
  category: "Voice Note" | "Relationship" | "Project" | "Life Event" | "Insight" | "Goal";
  icon: LucideIcon;
  x: number; // percentage
  y: number; // percentage
  connections: string[];
  snippet: string;
  timestamp: string;
  color: string;
}

const NODES: NodeData[] = [
  {
    id: "priya_lunch",
    title: "Lunch with Priya",
    category: "Voice Note",
    icon: Mic,
    x: 48,
    y: 35,
    connections: ["priya", "career_pivot", "diary_oct14"],
    snippet: "Priya told me she's finally quitting her job to start her business. Really happy for her.",
    timestamp: "Today at 1:30 PM • 45s memo",
    color: "#c084fc", // purple accent
  },
  {
    id: "priya",
    title: "Priya (Close Friend)",
    category: "Relationship",
    icon: Users,
    x: 25,
    y: 45,
    connections: ["priya_lunch", "career_pivot"],
    snippet: "14 conversations linked across 2 years. Regular catch-ups and support through career changes.",
    timestamp: "Connected automatically",
    color: "#ec4899", // pink
  },
  {
    id: "diary_oct14",
    title: "Memories — Oct 14",
    category: "Life Event",
    icon: Sparkles,
    x: 72,
    y: 28,
    connections: ["priya_lunch", "mom_call"],
    snippet: "Morning started slow, but lunch with Priya and the afternoon project review went great.",
    timestamp: "Connected automatically",
    color: "#3b82f6", // blue
  },
  {
    id: "mom_call",
    title: "Sunday Call with Mom",
    category: "Relationship",
    icon: Heart,
    x: 82,
    y: 65,
    connections: ["diary_oct14", "mom"],
    snippet: "Mom sounded really relaxed talking about her knee recovery and library volunteering.",
    timestamp: "Last Sunday • 2 min reflection",
    color: "#f43f5e", // rose
  },
  {
    id: "career_pivot",
    title: "Career & Ambitions",
    category: "Goal",
    icon: Activity,
    x: 18,
    y: 72,
    connections: ["priya", "priya_lunch"],
    snippet: "Tracking long-term work milestones and feedback from team reviews.",
    timestamp: "Updated Today",
    color: "#f59e0b", // amber
  },
  {
    id: "mom",
    title: "Mom (Family Core)",
    category: "Relationship",
    icon: Heart,
    x: 55,
    y: 78,
    connections: ["mom_call"],
    snippet: "28 conversations recorded. Weekly check-ins and family updates.",
    timestamp: "Family Core",
    color: "#34d399", // mint
  },
];

export default function LivingWorldModelCanvas() {
  const [activeNodeId, setActiveNodeId] = useState<string>("priya_lunch");
  const activeNode = NODES.find((n) => n.id === activeNodeId) || NODES[0];

  return (
    <div className="relative w-full h-[460px] sm:h-[540px] rounded-2xl bg-[#0e0d16] border border-white/10 overflow-hidden shadow-2xl grid-bg-quiet group">
      {/* Header bar overlay matching reference image */}
      <div className="absolute top-4 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-[#161522] px-3.5 py-1.5 rounded-full border border-white/10 text-xs text-white/70 font-mono">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="tracking-wide">MEMORY ENGINE • CONNECTED MEMORY</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono text-slate-400">
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
              <line
                key={`${node.id}-${targetId}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${targetNode.x}%`}
                y2={`${targetNode.y}%`}
                stroke={isHighlighted ? "#c084fc" : "rgba(255,255,255,0.08)"}
                strokeWidth={isHighlighted ? "1.5" : "1"}
                strokeDasharray={isHighlighted ? "none" : "3 3"}
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
                    ? "bg-white/15 text-white border-cyan-400/50 scale-105 shadow-lg shadow-cyan-500/20"
                    : isConnected
                    ? "bg-white/10 text-white/90 border-white/20"
                    : "bg-[#141320] text-slate-300 border-white/10 hover:border-cyan-400/30 hover:text-white"
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
            className="p-4 rounded-xl bg-[#141320] border border-cyan-500/20 shadow-2xl space-y-2"
          >
            <div className="flex items-center justify-between">
              <span
                className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-medium text-cyan-200"
                style={{ backgroundColor: `${activeNode.color}25` }}
              >
                {activeNode.category}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {activeNode.timestamp}
              </span>
            </div>

            <h4 className="text-sm font-medium text-white">
              {activeNode.title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              &ldquo;{activeNode.snippet}&rdquo;
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Helper text */}
      <div className="absolute bottom-4 right-6 hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-slate-400 pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>Click or hover nodes to inspect narrative context</span>
      </div>
    </div>
  );
}
