"use client";

export default function Footer() {
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
          <span className="text-white/40">Private, local-first memory journal</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a href="#what-it-does" className="hover:text-white transition-colors">
            What it does
          </a>
          <a href="#incidents" className="hover:text-white transition-colors">
            One day
          </a>
          <a href="#brain" className="hover:text-white transition-colors">
            The brain
          </a>
          <a href="#privacy" className="hover:text-white transition-colors">
            Privacy
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
