"use client";

import { BookOpen } from "lucide-react";

interface FooterProps {
  onOpenManifesto: () => void;
}

export default function Footer({ onOpenManifesto }: FooterProps) {
  return (
    <footer className="py-12 bg-[#060608] border-t border-white/[0.06] text-white/50 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-white/80 font-semibold">Memory Engine v1.0</span>
          </div>
          <span className="text-white/20">•</span>
          <span className="text-white/40">Zero-Knowledge Private Architecture</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <button
            onClick={onOpenManifesto}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400/80" />
            <span>Read Manifesto</span>
          </button>
          <a href="#story" className="hover:text-white transition-colors">
            Story
          </a>
          <a href="#world-model" className="hover:text-white transition-colors">
            World Model
          </a>
          <a href="#architecture" className="hover:text-white transition-colors">
            Architecture
          </a>
          <a href="#reasoning" className="hover:text-white transition-colors">
            Reasoning
          </a>
        </div>

        {/* Copyright */}
        <div className="text-white/30 text-[11px]">
          © {new Date().getFullYear()} Personal Memory Engine Inc.
        </div>
      </div>
    </footer>
  );
}
