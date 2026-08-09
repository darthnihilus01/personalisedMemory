"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Layout } from "lucide-react";

interface NavbarProps {
  onScrollToWaitlist: () => void;
  viewMode: "landing" | "workspace";
  onToggleViewMode: (mode: "landing" | "workspace") => void;
}

export default function Navbar({
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
          ? "py-3 bg-[#020308]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/60"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Mark matching reference image */}
        <button
          onClick={() => onToggleViewMode("landing")}
          className="flex items-center gap-3 group text-left"
          id="nav-logo"
        >
          <div className="relative w-8 h-8 rounded-full bg-white/[0.05] border border-white/15 flex items-center justify-center transition-all group-hover:border-cyan-500/50">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-wider uppercase text-white group-hover:text-cyan-300 transition-colors">
              Memory Engine
            </span>
            <span className="text-[10px] tracking-widest text-slate-400 font-mono uppercase">
              World Model v1.0
            </span>
          </div>
        </button>

        {/* Navigation Links matching reference image */}
        {viewMode === "landing" ? (
          <nav className="hidden lg:flex items-center gap-8 text-xs font-medium text-slate-300/80">
            <a href="#what-it-does" className="hover:text-white transition-colors" id="nav-what-it-does">
              What it does
            </a>
            <a href="#events" className="hover:text-white transition-colors" id="nav-events">
              Events &amp; context
            </a>
            <a href="#memory-engine" className="hover:text-white transition-colors" id="nav-memory-engine">
              Memory engine
            </a>
            <a href="#over-time" className="hover:text-white transition-colors" id="nav-over-time">
              Over time
            </a>
            <a href="#privacy" className="hover:text-white transition-colors" id="nav-privacy">
              Privacy
            </a>
          </nav>
        ) : (
          <div className="flex items-center p-1 rounded-xl bg-[#12111a] border border-white/10">
            <button
              onClick={() => onToggleViewMode("landing")}
              className="px-3.5 py-1 rounded-lg text-xs font-mono text-slate-300 hover:text-white"
            >
              Overview &amp; Story
            </button>
            <button
              onClick={() => onToggleViewMode("workspace")}
              className="px-3.5 py-1 rounded-lg text-xs font-mono bg-cyan-500/20 text-cyan-200 border border-cyan-500/40"
            >
              Interactive Product
            </button>
          </div>
        )}

        {/* Action Buttons matching reference image */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleViewMode(viewMode === "landing" ? "workspace" : "landing")}
            className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-cyan-300 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all"
          >
            <Layout className="w-3.5 h-3.5" />
            <span>{viewMode === "landing" ? "Product Mode" : "Overview Mode"}</span>
          </button>

          <button
            onClick={onScrollToWaitlist}
            id="nav-btn-waitlist"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-white/10 hover:bg-white/15 px-4 py-1.5 rounded-full border border-white/20 shadow-md backdrop-blur-md transition-all"
          >
            <span>Join the waitlist</span>
            <ArrowRight className="w-3.5 h-3.5 text-white/70" />
          </button>
        </div>
      </div>
    </header>
  );
}
