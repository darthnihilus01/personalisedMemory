"use client";

export default function Footer() {
  return (
    <footer className="py-12 bg-[#060608] border-t border-white/[0.06] text-white/50 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span className="text-white/80 font-semibold">Memory Engine v1.0</span>
          </div>
          <span className="text-white/20">•</span>
          <span className="text-white/40">Private, local-first memory</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 flex-wrap justify-center">
          <a href="#what-it-does" className="hover:text-white transition-colors">
            What it does
          </a>
          <a href="#events" className="hover:text-white transition-colors">
            Events &amp; context
          </a>
          <a href="#memory-engine" className="hover:text-white transition-colors">
            Memory engine
          </a>
          <a href="#over-time" className="hover:text-white transition-colors">
            Over time
          </a>
          <a href="#privacy" className="hover:text-white transition-colors">
            Privacy
          </a>
          <a href="#waitlist" className="hover:text-white transition-colors">
            Waitlist
          </a>
        </div>

        {/* Copyright */}
        <div className="text-white/30 text-[11px]">
          © {new Date().getFullYear()} Personal Memory Engine Inc. &nbsp;|&nbsp; Lattice
        </div>
      </div>
    </footer>
  );
}
