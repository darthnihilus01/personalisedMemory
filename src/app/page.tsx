"use client";

import { useState } from "react";
import CaptureDemo from "@/components/CaptureDemo";
import FinalCTA from "@/components/FinalCTA";
import WaitlistSection from "@/components/WaitlistSection";

export default function Home() {
  const [demoCompleted, setDemoCompleted] = useState(false);
  const [graphCompleted, setGraphCompleted] = useState(false);

  return (
    <div className="bg-[#020308] text-white overflow-x-hidden font-sans selection:bg-cyan-500/30">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center">
        {/* Blue Glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] h-[80vh] pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle at 50% 100%, rgba(45, 212, 191, 0.45) 0%, rgba(20, 184, 166, 0.15) 35%, rgba(0,0,0,0) 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />

        <main className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center pb-20 pt-32">
          <h1 className="text-[40px] md:text-[44px] lg:text-[56px] font-medium text-white leading-[1.1] mb-6 drop-shadow-sm max-w-[976px] tracking-normal">
            Turn your life into a continuously evolving memory system.
          </h1>

          <p className="text-[#a1a1aa] text-[15px] md:text-[17px] max-w-[620px] mx-auto mb-10 leading-[1.6] font-normal">
            Humans lose context, we don&apos;t.
          </p>
        </main>
      </div>

      {/* Stage 1: Capture & Synthesis Demo */}
      <CaptureDemo onComplete={() => setDemoCompleted(true)} />

      {/* Stage 2: Obsidian Knowledge Graph View (Unlocked after Demo 1) */}
      <FinalCTA isUnlocked={demoCompleted} onComplete={() => setGraphCompleted(true)} />

      {/* Stage 3: Waitlist (Unlocked after Graph) */}
      {graphCompleted && <WaitlistSection />}
    </div>
  );
}
