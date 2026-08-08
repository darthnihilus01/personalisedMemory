"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollStory from "@/components/ScrollStory";
import MemoryEngineDiagram from "@/components/MemoryEngineDiagram";
import TechArchitecture from "@/components/TechArchitecture";
import PhilosophySection from "@/components/PhilosophySection";
import FutureQuestions from "@/components/FutureQuestions";
import WaitlistSection from "@/components/WaitlistSection";
import ManifestoModal from "@/components/ManifestoModal";
import ProductWorkspace from "@/components/ProductWorkspace";
import Footer from "@/components/Footer";

export default function Home() {
  const [manifestoOpen, setManifestoOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"landing" | "workspace">("landing");

  const scrollToWaitlist = () => {
    if (viewMode !== "landing") {
      setViewMode("landing");
      setTimeout(() => {
        const element = document.getElementById("waitlist");
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById("waitlist");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#09090b] text-white selection:bg-amber-500/20 selection:text-amber-100 overflow-x-hidden">
      {/* Navbar with View Switcher */}
      <Navbar
        onOpenManifesto={() => setManifestoOpen(true)}
        onScrollToWaitlist={scrollToWaitlist}
        viewMode={viewMode}
        onToggleViewMode={(mode) => setViewMode(mode)}
      />

      {/* Main Content */}
      <main className="flex-grow pt-16">
        {viewMode === "landing" ? (
          <>
            {/* Hero Section */}
            <HeroSection
              onScrollToWaitlist={scrollToWaitlist}
              onOpenWorkspace={() => setViewMode("workspace")}
            />

            {/* Scroll Story Narrative */}
            <ScrollStory />

            {/* Living World Model Architecture Pipeline */}
            <MemoryEngineDiagram />

            {/* Technical Architecture & PRD Physics */}
            <TechArchitecture />

            {/* Product Philosophy */}
            <PhilosophySection />

            {/* Contextual Reasoning Engine vs Flat Search */}
            <FutureQuestions />

            {/* Founding Waitlist Access */}
            <WaitlistSection />
          </>
        ) : (
          <div className="pt-8 pb-16">
            <ProductWorkspace />
          </div>
        )}
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
