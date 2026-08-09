"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Syncopate } from "next/font/google";
import CaptureDemo from "@/components/CaptureDemo";
import FinalCTA from "@/components/FinalCTA";
import MCPDemo from "@/components/MCPDemo";
import WaitlistSection from "@/components/WaitlistSection";

const syncopate = Syncopate({
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const [demoCompleted, setDemoCompleted] = useState(false);
  const [graphCompleted, setGraphCompleted] = useState(false);
  const [mcpCompleted, setMcpCompleted] = useState(false);

  return (
    <div className="relative bg-[#020308] text-white overflow-x-hidden font-sans selection:bg-cyan-500/30 min-h-screen">

      {/* ═══════════════════════════════════════════════
           GLOBAL BACKGROUND LAYER — shared by ALL sections
           ═══════════════════════════════════════════════ */}





      {/* Ambient glow – hero region */}
      <div
        className="absolute top-0 left-0 right-0 h-[100vh] pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 35%, rgba(45, 212, 191, 0.14) 0%, transparent 70%)",
        }}
      />

      {/* Ambient glow – mid-page */}
      <div
        className="absolute top-[90vh] left-0 right-0 h-[80vh] pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 25% 50%, rgba(30, 58, 95, 0.35) 0%, transparent 65%)",
        }}
      />

      {/* Ambient glow – lower page */}
      <div
        className="absolute top-[170vh] left-0 right-0 h-[100vh] pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 80% 40%, rgba(20, 80, 90, 0.3) 0%, transparent 60%)",
        }}
      />

      {/* ── Noise texture ── */}
      <div className="fixed inset-0 opacity-[0.1] pointer-events-none mix-blend-overlay z-[1] bg-noise" />

      {/* Giant "Waitlist" watermark is now handled locally in sections */}

      {/* ═══════════════════════════════════════════════
           CONTENT LAYER — all sections flow on top
           ═══════════════════════════════════════════════ */}
      <div className="relative z-10">

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
          {/* ── Flowing neon wave SVG — restricted to hero section with smooth fade ── */}
          <div 
            className="absolute top-0 left-0 right-0 h-[140vh] pointer-events-none z-0"
            style={{
              maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)"
            }}
          >
            {/* We fix the inner SVG to 100vh so xMidYMid slice calculates from the exact hero viewport size, preventing it from shifting downwards! */}
            <div className="w-full h-[100vh] relative">
              <svg
                className="w-full h-full"
                style={{ overflow: 'visible' }}
                viewBox="0 0 1440 900"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="wg1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0} />
                    <stop offset="30%" stopColor="#38bdf8" stopOpacity={0.85} />
                    <stop offset="60%" stopColor="#5eead4" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#5eead4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="wg2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0} />
                    <stop offset="35%" stopColor="#22d3ee" stopOpacity={0.7} />
                    <stop offset="70%" stopColor="#7dd3fc" stopOpacity={0.75} />
                    <stop offset="100%" stopColor="#7dd3fc" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="wg3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0} />
                    <stop offset="40%" stopColor="#22d3ee" stopOpacity={0.55} />
                    <stop offset="65%" stopColor="#67e8f9" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#67e8f9" stopOpacity={0} />
                  </linearGradient>
                </defs>

                {/* Wave 1 — primary thin */}
                <g className="wave-group">
                  <path
                    d="M-100,640 C160,585 300,700 500,650 C700,600 800,500 970,450 C1140,400 1320,320 1620,170"
                    fill="none" stroke="url(#wg1)" strokeWidth={3.5}
                    opacity={0.55}
                  />
                </g>

                {/* Wave 2 — secondary thin */}
                <g className="wave-group-slow">
                  <path
                    d="M-100,700 C190,650 330,760 540,705 C750,650 840,555 1010,500 C1180,445 1360,365 1650,240"
                    fill="none" stroke="url(#wg2)" strokeWidth={2.5}
                    opacity={0.55}
                  />
                </g>

                {/* Wave 3 — thin accent */}
                <g className="wave-group" style={{ animationDelay: "-6s" }}>
                  <path
                    d="M-100,590 C170,540 290,650 470,600 C650,550 760,460 930,410 C1100,360 1280,290 1600,130"
                    fill="none" stroke="url(#wg1)" strokeWidth={1.5}
                    opacity={0.4}
                  />
                </g>

                {/* Wave 4 — upper fill thin */}
                <g className="wave-group-slow" style={{ animationDelay: "-10s" }}>
                  <path
                    d="M-80,560 C200,510 340,620 520,570 C700,520 820,430 980,380 C1140,330 1300,260 1580,110"
                    fill="none" stroke="url(#wg3)" strokeWidth={2}
                    opacity={0.3}
                  />
                </g>

                {/* Wave 5 — bottom subtle */}
                <g className="wave-group" style={{ animationDelay: "-14s" }}>
                  <path
                    d="M-120,740 C150,690 310,780 530,730 C750,680 870,590 1040,540 C1210,490 1380,410 1660,280"
                    fill="none" stroke="url(#wg2)" strokeWidth={1.2}
                    opacity={0.25}
                  />
                </g>
              </svg>
            </div>
          </div>

          <div className="w-full max-w-5xl mx-auto text-center flex flex-col items-center pb-42 pt-36 relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="font-display text-[44px] md:text-[52px] lg:text-[64px] text-gradient-headline leading-[1.05] mb-6 max-w-[976px] tracking-tight"
            >
              turn your life into a continuously evolving memory system.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="text-[15px] md:text-[17px] tracking-wide text-zinc-400 font-normal mb-20"
            >
              humans lose context, <span className="text-cyan-300/90 font-medium drop-shadow-[0_0_12px_rgba(45,212,191,0.35)]">lattice doesn&apos;t.</span>
            </motion.p>
          </div>

          {/* ── Hero Watermark ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="absolute bottom-[-2vw] left-1/2 -translate-x-1/2 w-[100vw] text-center pointer-events-none z-0"
          >
            <span className={`watermark-text ${syncopate.className}`}>
              Lattice
            </span>
          </motion.div>
        </section>

        {/* ── Stage 1: Capture & Synthesis Demo ── */}
        <CaptureDemo onComplete={() => setDemoCompleted(true)} />

        {/* ── Stage 2: Knowledge Graph ── */}
        {demoCompleted && <FinalCTA isUnlocked={demoCompleted} onComplete={() => setGraphCompleted(true)} />}

        {/* ── Stage 3: MCP Demo ── */}
        {graphCompleted && <MCPDemo isUnlocked={graphCompleted} onComplete={() => setMcpCompleted(true)} />}

        {/* ── Stage 4: Waitlist ── */}
        {mcpCompleted && <WaitlistSection />}
      </div>
    </div>
  );
}
