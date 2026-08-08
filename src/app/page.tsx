"use client";

import { useState } from "react";
import CaptureDemo from "@/components/CaptureDemo";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmail("");
    }, 1000);
  };

  return (
    <div className="bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center">
        {/* Blue Glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] h-[80vh] pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle at 50% 100%, rgba(59, 130, 246, 0.45) 0%, rgba(29, 78, 216, 0.15) 35%, rgba(0,0,0,0) 70%)",
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
            A Personal Memory Engine that turns conversations, events, people, decisions, and moments into a continuously evolving model of your world.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-[540px] mx-auto mb-8 relative">
            <div className="flex items-center p-1.5 rounded-[16px] bg-[#1a1a1a]/40 border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-colors focus-within:bg-[#222]/50 focus-within:border-white/20 backdrop-blur-xl">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Database is waiting for your email input..."
                required
                className="flex-1 bg-transparent px-4 py-2.5 text-[14px] text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-white text-black text-[14px] font-medium rounded-[10px] hover:bg-gray-100 transition-all shadow-sm disabled:opacity-70 disabled:hover:bg-white flex items-center justify-center min-w-[120px]"
              >
                {loading ? (
                  <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                ) : (
                  "Get Notified"
                )}
              </button>
            </div>
          </form>
        </main>
      </div>

      {/* CaptureDemo appears below once you scroll past the hero */}
      <CaptureDemo />
    </div>
  );
}
