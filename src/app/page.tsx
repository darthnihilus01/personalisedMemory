"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollStory from "@/components/ScrollStory";
import MemoryEngineDiagram from "@/components/MemoryEngineDiagram";
import PhilosophySection from "@/components/PhilosophySection";
import FutureQuestions from "@/components/FutureQuestions";
import WaitlistSection from "@/components/WaitlistSection";
import ManifestoModal from "@/components/ManifestoModal";
import Footer from "@/components/Footer";

export default function Home() {
  const [manifestoOpen, setManifestoOpen] = useState(false);

  const scrollToWaitlist = () => {
    const element = document.getElementById("waitlist");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#060709] text-white selection:bg-purple-900/50 selection:text-purple-100 overflow-x-hidden">
      {/* Top Fixed Header */}
      <Navbar
        onOpenManifesto={() => setManifestoOpen(true)}
        onScrollToWaitlist={scrollToWaitlist}
      />

      {/* Main Landing Sections */}
      <main className="flex-grow">
        {/* Section 1: Hero with Dynamic Canvas */}
        <HeroSection onScrollToWaitlist={scrollToWaitlist} />

        {/* Section 2: Scroll Story Narrative */}
        <ScrollStory />

        {/* Section 3: The Living World Model Pipeline */}
        <MemoryEngineDiagram />

        {/* Section 4: Product Philosophy */}
        <PhilosophySection />

        {/* Section 5: Reasoning vs Search Paradigm */}
        <FutureQuestions />

        {/* Section 6: Founding Waitlist */}
        <WaitlistSection />
      </main>

      {/* Footer */}
      <Footer onOpenManifesto={() => setManifestoOpen(true)} />

      {/* Manifesto Overlay Modal */}
      <ManifestoModal
        isOpen={manifestoOpen}
        onClose={() => setManifestoOpen(false)}
      />
    </div>
  );
}
