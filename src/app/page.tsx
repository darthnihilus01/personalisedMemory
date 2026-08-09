"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CaptureDemo from "@/components/CaptureDemo";
import FinalCTA from "@/components/FinalCTA";
import WaitlistSection from "@/components/WaitlistSection";

export default function Home() {
  const [demoCompleted, setDemoCompleted] = useState(false);
  const [graphCompleted, setGraphCompleted] = useState(false);

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


        </section>

        {/* ── Stage 1: Capture & Synthesis Demo ── */}
        <CaptureDemo onComplete={() => setDemoCompleted(true)} />

        {/* ── Stage 2: Knowledge Graph ── */}
        <FinalCTA isUnlocked={demoCompleted} onComplete={() => setGraphCompleted(true)} />

        {/* ── Stage 3: Waitlist ── */}
        {graphCompleted && <WaitlistSection />}
      </div>
    </div>
  );
}
