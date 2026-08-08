"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatItDoes from "@/components/WhatItDoes";
import Incidents from "@/components/Incidents";
import BrainSection from "@/components/BrainSection";
import PrivacySection from "@/components/PrivacySection";
import WaitlistSection from "@/components/WaitlistSection";
import ProductWorkspace from "@/components/ProductWorkspace";
import Footer from "@/components/Footer";

export default function Home() {
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
      {/* Navbar */}
      <Navbar
        onScrollToWaitlist={scrollToWaitlist}
        viewMode={viewMode}
        onToggleViewMode={(mode) => setViewMode(mode)}
      />

      {/* Main Content */}
      <main className="flex-grow pt-16">
        {viewMode === "landing" ? (
          <>
            {/* Hero */}
            <HeroSection
              onScrollToWaitlist={scrollToWaitlist}
              onOpenWorkspace={() => setViewMode("workspace")}
            />

            {/* What It Does */}
            <WhatItDoes />

            {/* Incidents: list → detail → compiled day */}
            <Incidents />

            {/* The Brain */}
            <BrainSection />

            {/* Privacy */}
            <PrivacySection />

            {/* Waitlist */}
            <WaitlistSection />
          </>
        ) : (
          <div className="pt-8 pb-16">
            <ProductWorkspace />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
