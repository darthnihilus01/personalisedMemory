"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, BookOpen, ArrowRight } from "lucide-react";

interface NavbarProps {
  onOpenManifesto: () => void;
  onScrollToWaitlist: () => void;
}

export default function Navbar({ onOpenManifesto, onScrollToWaitlist }: NavbarProps) {
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
          ? "py-3 bg-[#060709]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/40"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Mark */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          id="nav-logo"
        >
          <div className="relative w-8 h-8 rounded-full bg-white/[0.05] border border-white/15 flex items-center justify-center transition-all duration-300 group-hover:border-purple-500/50 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.35)]">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="absolute inset-0 rounded-full border border-purple-500/30 animate-ping opacity-25" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wider uppercase text-white/90 group-hover:text-white transition-colors">
              Memory Engine
            </span>
            <span className="text-[10px] tracking-widest text-white/40 font-mono uppercase">
              World Model v1.0
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          <a
            href="#story"
            className="hover:text-white transition-colors duration-200"
            id="nav-story"
          >
            The Story
          </a>
          <a
            href="#world-model"
            className="hover:text-white transition-colors duration-200"
            id="nav-world-model"
          >
            World Model
          </a>
          <a
            href="#architecture"
            className="hover:text-white transition-colors duration-200"
            id="nav-architecture"
          >
            Architecture
          </a>
          <a
            href="#philosophy"
            className="hover:text-white transition-colors duration-200"
            id="nav-philosophy"
          >
            Philosophy
          </a>
          <a
            href="#reasoning"
            className="hover:text-white transition-colors duration-200"
            id="nav-questions"
          >
            Context vs Search
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenManifesto}
            id="nav-btn-manifesto"
            className="hidden sm:flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/70 hover:text-white px-3.5 py-2 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-200"
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>Manifesto</span>
          </button>

          <button
            onClick={onScrollToWaitlist}
            id="nav-btn-waitlist"
            className="group relative inline-flex items-center gap-2 text-xs font-medium text-white bg-white/10 hover:bg-white/15 px-4 py-2 rounded-full border border-white/20 shadow-lg hover:shadow-purple-500/20 backdrop-blur-md transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-indigo-600/30 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10">Join Waitlist</span>
            <ArrowRight className="w-3.5 h-3.5 relative z-10 text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </header>
  );
}
