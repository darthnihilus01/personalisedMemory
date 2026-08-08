"use client";

import { useState, useEffect } from "react";
import { BookOpen, ArrowRight, Sparkles, Layout } from "lucide-react";

interface NavbarProps {
  onOpenManifesto: () => void;
  onScrollToWaitlist: () => void;
  viewMode: "landing" | "workspace";
  onToggleViewMode: (mode: "landing" | "workspace") => void;
}

export default function Navbar({
  onOpenManifesto,
  onScrollToWaitlist,
  viewMode,
  onToggleViewMode,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-[#09090b]/90 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/50"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Mark */}
        <button
          onClick={() => onToggleViewMode("landing")}
          className="flex items-center gap-3 group text-left"
          id="nav-logo"
        >
          <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center transition-all group-hover:border-white/30">
            <span className="w-2 h-2 rounded-full bg-amber-400/90" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-wider uppercase text-white/90 group-hover:text-white transition-colors">
              Memory Engine
            </span>
            <span className="text-[10px] tracking-widest text-white/40 font-mono uppercase">
              Personal World Model
            </span>
          </div>
        </button>

        {/* View Mode Switcher (Landing vs Interactive Workspace) */}
        <div className="flex items-center p-1 rounded-xl bg-[#121215] border border-white/[0.08]">
          <button
            onClick={() => onToggleViewMode("landing")}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
              viewMode === "landing"
                ? "bg-white/10 text-white font-medium shadow-sm"
                : "text-white/50 hover:text-white"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onToggleViewMode("workspace")}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              viewMode === "workspace"
                ? "bg-white/10 text-white font-medium shadow-sm"
                : "text-white/50 hover:text-white"
            }`}
          >
            <Layout className="w-3 h-3 text-amber-400/90" />
            <span>Product View</span>
          </button>
        </div>

        {/* Navigation Links (Visible in landing mode) */}
        {viewMode === "landing" && (
          <nav className="hidden lg:flex items-center gap-7 text-xs font-mono text-white/60">
            <a href="#story" className="hover:text-white transition-colors" id="nav-story">
              Story
            </a>
            <a href="#world-model" className="hover:text-white transition-colors" id="nav-world-model">
              World Model
            </a>
            <a href="#architecture" className="hover:text-white transition-colors" id="nav-architecture">
              Architecture
            </a>
            <a href="#philosophy" className="hover:text-white transition-colors" id="nav-philosophy">
              Philosophy
            </a>
          </nav>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenManifesto}
            id="nav-btn-manifesto"
            className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-white/70 hover:text-white px-3.5 py-1.5 rounded-full border border-white/10 hover:border-white/20 transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400/80" />
            <span>Manifesto</span>
          </button>

          <button
            onClick={onScrollToWaitlist}
            id="nav-btn-waitlist"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-black bg-white hover:bg-zinc-200 px-4 py-1.5 rounded-full transition-all"
          >
            <span>Waitlist</span>
            <ArrowRight className="w-3 h-3 text-black/70" />
          </button>
        </div>
      </div>
    </header>
  );
}
