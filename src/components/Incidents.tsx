"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles, Wand2, BookOpen, CalendarDays } from "lucide-react";

interface Incident {
  id: string;
  number: string;
  title: string;
  raw: string;
  correction?: { wrong: string; right: string };
  cleaned: string;
}

const INCIDENTS: Incident[] = [
  {
    id: "get-together",
    number: "01",
    title: "Hosted a get-together with my friends",
    raw: "uh hey journal, hosted a get-together with my friends, it was really fun, we hadn't all been in the same room in months",
    cleaned:
      "Hosted a get-together with my friends — it was really fun, we hadn't all been in the same room in months.",
  },
  {
    id: "lunch-priya",
    number: "02",
    title: "Lunch with Priya — she's finally quitting her job",
    raw: "Had lunch with Sarah — sorry, I mean Priya — she told me she's finally quitting her job.",
    correction: { wrong: "Sarah", right: "Priya" },
    cleaned: "Had lunch with Priya — she told me she's finally quitting her job.",
  },
  {
    id: "rough-call",
    number: "03",
    title: "Rough call with my manager about the deadline",
    raw: "rough call with my manager about the, um, deadline. it was kind of tense, but we talked it through",
    cleaned:
      "Rough call with my manager about the deadline — tense, but we talked it through.",
  },
  {
    id: "winding-down",
    number: "04",
    title: "End of day, winding down",
    raw: "okay, end of day. just winding down now, it was a full day",
    cleaned: "End of day — winding down. It was a full day.",
  },
];

const COMPILED_ENTRY =
  "Today I hosted a get-together with my friends — it was really fun, we hadn't all been in the same room in months. Had lunch with Priya, and she told me she's finally quitting her job. Later, I had a rough call with my manager about the deadline. Overall a full day — good to wind down by the end of it.";

function DetailView({ incident }: { incident: Incident }) {
  const [phase, setPhase] = useState<"raw" | "cleaned">("raw");

  useEffect(() => {
    const t = setTimeout(() => setPhase("cleaned"), 1100);
    return () => clearTimeout(t);
  }, [incident.id]);

  const rawText = incident.raw;

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-black/40 border border-white/10">
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-2">
          What you said
        </span>
        <p className="text-sm text-white/85 leading-relaxed font-sans">
          {incident.correction ? (
            <>
              {rawText.split(incident.correction.wrong)[0]}
              <span className="line-through decoration-red-400/70 text-white/50">
                {incident.correction.wrong}
              </span>
              {rawText.split(incident.correction.wrong)[1]}
            </>
          ) : (
            rawText
          )}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {phase === "raw" ? (
          <motion.div
            key="cleaning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-amber-200/90 text-xs font-mono"
          >
            <Wand2 className="w-3.5 h-3.5 animate-pulse" />
            <span>Cleaning up — removing filler, false starts, and corrections…</span>
          </motion.div>
        ) : (
          <motion.div
            key="cleaned"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/25"
          >
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-2">
              Saved to your journal
            </span>
            <p className="text-sm text-white leading-relaxed font-sans">
              {incident.cleaned}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CompiledView() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <AnimatePresence mode="wait">
        {!ready ? (
          <motion.div
            key="compiling"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3 text-center"
          >
            <span className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
            <span className="text-xs font-mono text-amber-200/90">
              Compiling 4 moments into today&apos;s memory page…
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="page"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full p-6 sm:p-8 rounded-2xl bg-[#141418] border border-amber-400/20 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-5">
              <div className="flex items-center gap-2.5">
                <CalendarDays className="w-4 h-4 text-amber-300" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">Wednesday, June 10</span>
                  <span className="text-[10px] font-mono text-white/40">
                    Memory journal • compiled from 4 moments
                  </span>
                </div>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/30">
                <CheckCircle2 className="w-3 h-3" />
                Automatic
              </span>
            </div>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-serif italic">
              &ldquo;{COMPILED_ENTRY}&rdquo;
            </p>

            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center gap-2 text-[11px] font-mono text-white/40">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Four messy moments became one clean page.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Incidents() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [viewedIds, setViewedIds] = useState<string[]>([]);
  const [showCompiled, setShowCompiled] = useState(false);
  const autoRevealed = useRef(false);

  const activeIncident = INCIDENTS.find((i) => i.id === activeId) || null;

  useEffect(() => {
    if (viewedIds.length === INCIDENTS.length && !autoRevealed.current) {
      autoRevealed.current = true;
      const t = setTimeout(() => setShowCompiled(true), 1200);
      return () => clearTimeout(t);
    }
  }, [viewedIds]);

  const selectIncident = (incident: Incident) => {
    setActiveId(incident.id);
    setShowCompiled(false);
    setViewedIds((prev) =>
      prev.includes(incident.id) ? prev : [...prev, incident.id]
    );
  };

  const seeFullDay = () => {
    setViewedIds(INCIDENTS.map((i) => i.id));
    setShowCompiled(true);
    autoRevealed.current = true;
  };

  return (
    <section id="incidents" className="py-24 md:py-32 relative bg-[#09090b] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-widest text-amber-300/80 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>How it works</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white leading-tight tracking-tight">
            Four moments.{" "}
            <span className="font-serif italic text-amber-200/90">
              One clean page.
            </span>
          </h2>
          <p className="text-base text-white/60 leading-relaxed font-normal mt-4">
            Pick a moment from the day.
          </p>
        </div>

        {/* Progress */}
        <div className="max-w-6xl mx-auto mb-6 flex items-center justify-between text-xs font-mono text-white/40">
          <span>
            {viewedIds.length} of {INCIDENTS.length} moments viewed
          </span>
          {showCompiled && (
            <span className="text-emerald-400">
              ✓ Day compiled
            </span>
          )}
        </div>

        {/* Two-panel interactive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          {/* Left: list */}
          <div className="lg:col-span-5 space-y-3">
            {INCIDENTS.map((incident) => {
              const isActive = activeId === incident.id;
              const isViewed = viewedIds.includes(incident.id);
              return (
                <button
                  key={incident.id}
                  onClick={() => selectIncident(incident)}
                  id={`incident-${incident.id}`}
                  className={`w-full text-left p-5 rounded-xl border transition-all ${
                    isActive
                      ? "bg-white/[0.07] border-white/25"
                      : "bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono text-amber-300/80">
                      {incident.number}
                    </span>
                    {isViewed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <span className="w-4 h-4" />
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-white/90 font-medium leading-snug">
                    &ldquo;{incident.title}&rdquo;
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right: detail / compiled */}
          <div className="lg:col-span-7">
            <div className="panel-quiet p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl min-h-[340px] sm:min-h-[360px]">
              <AnimatePresence mode="wait">
                {showCompiled ? (
                  <motion.div
                    key="compiled"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full"
                  >
                    <CompiledView />
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => setShowCompiled(false)}
                        className="text-xs font-mono text-white/50 hover:text-white transition-colors"
                      >
                        ← Back to the moments
                      </button>
                    </div>
                  </motion.div>
                ) : activeIncident ? (
                  <motion.div
                    key={activeIncident.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="h-full flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
                      <span className="text-xs font-mono text-white/40">
                        Moment {activeIncident.number} of {INCIDENTS.length}
                      </span>
                      <span className="text-sm font-medium text-white">
                        {activeIncident.title}
                      </span>
                    </div>
                    <DetailView incident={activeIncident} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center gap-3"
                  >
                    <span className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/40">
                      <BookOpen className="w-4 h-4" />
                    </span>
                    <p className="text-sm text-white/50 font-sans max-w-xs">
                      Pick a moment from the day to see what it sounded like —
                      and what it became.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Persistent control */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={seeFullDay}
            id="see-full-day-btn"
            className="inline-flex items-center gap-2.5 btn-white-glow font-medium px-7 py-3 rounded-full text-sm"
          >
            <CalendarDays className="w-4 h-4 text-black/70" />
            <span>See the full day</span>
          </button>
        </div>
      </div>
    </section>
  );
}
