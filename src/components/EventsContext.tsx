"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles, Wand2, ArrowDown, Compass } from "lucide-react";

interface Observation {
  id: string;
  number: string;
  title: string;
  raw: string;
  correction?: { wrong: string; right: string };
  cleaned: string;
  context?: {
    name: string;
    rows: { label: string; value: string }[];
  };
}

const OBSERVATIONS: Observation[] = [
  {
    id: "get-together",
    number: "01",
    title: "Hosted a get-together with my friends.",
    raw: "uh, hosted a get-together with my friends, it was really fun, we hadn't all been in the same room in months",
    cleaned:
      "Hosted a get-together with my friends — it was really fun, we hadn't all been in the same room in months.",
  },
  {
    id: "lunch-priya",
    number: "02",
    title: "Lunch with Priya — she's finally quitting her job.",
    raw: "Had lunch with Sarah — sorry, I mean Priya — she told me she's finally quitting her job.",
    correction: { wrong: "Sarah", right: "Priya" },
    cleaned: "Had lunch with Priya — she told me she's finally quitting her job.",
    context: {
      name: "Priya",
      rows: [
        { label: "First mentioned", value: "March" },
        { label: "Recent conversations", value: "April, May, June" },
        { label: "Current context", value: "Considering leaving her job" },
        { label: "Related event", value: "Career transition" },
      ],
    },
  },
  {
    id: "rough-call",
    number: "03",
    title: "Rough call with my manager about the deadline.",
    raw: "rough call with my manager about the, um, deadline. it was kind of tense, but we talked it through",
    cleaned:
      "Rough call with my manager about the deadline — tense, but we talked it through.",
  },
  {
    id: "atlas",
    number: "04",
    title: "Finally finished Atlas. Huge relief.",
    raw: "finally finished Atlas, huge relief, it's been, like, weeks of delays",
    cleaned: "Finally finished Atlas. Huge relief.",
  },
];

const TODAY_FLOW = [
  "Friends",
  "Priya's career change",
  "Work deadline",
  "Atlas launch",
  "Relief",
];

function DetailView({ observation }: { observation: Observation }) {
  const [phase, setPhase] = useState<"raw" | "cleaned">("raw");

  useEffect(() => {
    const t = setTimeout(() => setPhase("cleaned"), 1000);
    return () => clearTimeout(t);
  }, [observation.id]);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-black/40 border border-white/10">
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-2">
          What you said
        </span>
        <p className="text-sm text-white/85 leading-relaxed font-sans">
          {observation.correction ? (
            <>
              {observation.raw.split(observation.correction.wrong)[0]}
              <span className="line-through decoration-red-400/70 text-white/50">
                {observation.correction.wrong}
              </span>
              {observation.raw.split(observation.correction.wrong)[1]}
            </>
          ) : (
            observation.raw
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
            <span>Finding what matters in this observation…</span>
          </motion.div>
        ) : (
          <motion.div
            key="cleaned"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 rounded-xl bg-teal-950/20 border border-teal-500/25"
          >
            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider block mb-2">
              What it keeps
            </span>
            <p className="text-sm text-white leading-relaxed font-sans">
              {observation.cleaned}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {observation.context && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="p-4 rounded-xl bg-[#141418] border border-white/10"
        >
          <span className="text-xs font-mono text-amber-300/90 uppercase tracking-widest block mb-3">
            {observation.context.name} — the same person, across time
          </span>
          <div className="grid grid-cols-1 gap-2.5">
            {observation.context.rows.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-4 text-xs"
              >
                <span className="font-mono text-white/40 shrink-0">{row.label}</span>
                <span className="text-right font-mono text-white/85">{row.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function BiggerPicture() {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRevealed((prev) => {
        if (prev >= TODAY_FLOW.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 550);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full py-2">
      <span className="text-xs font-mono text-white/40 uppercase tracking-widest mb-6">
        Today
      </span>

      <div className="flex flex-col items-center gap-1">
        {TODAY_FLOW.map((item, idx) => (
          <div key={item} className="flex flex-col items-center">
            {idx < revealed && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="px-4 py-2 rounded-lg bg-white/[0.05] border border-white/15 text-sm font-mono text-white/90"
              >
                {item}
              </motion.div>
            )}
            {idx < revealed && idx < TODAY_FLOW.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <ArrowDown className="w-3.5 h-3.5 text-amber-400/80 my-1.5" />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed >= TODAY_FLOW.length ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 text-center text-base sm:text-lg text-white/90 leading-relaxed font-normal"
      >
        Four separate moments.{" "}
        <span className="font-serif italic text-amber-200/90">
          One connected picture of your day.
        </span>
      </motion.p>
    </div>
  );
}

export default function EventsContext() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [viewedIds, setViewedIds] = useState<string[]>([]);
  const [showPicture, setShowPicture] = useState(false);
  const autoRevealed = useRef(false);

  const activeObservation =
    OBSERVATIONS.find((o) => o.id === activeId) || null;

  useEffect(() => {
    if (viewedIds.length === OBSERVATIONS.length && !autoRevealed.current) {
      autoRevealed.current = true;
      const t = setTimeout(() => setShowPicture(true), 1300);
      return () => clearTimeout(t);
    }
  }, [viewedIds]);

  const selectObservation = (observation: Observation) => {
    setActiveId(observation.id);
    setShowPicture(false);
    setViewedIds((prev) =>
      prev.includes(observation.id) ? prev : [...prev, observation.id]
    );
  };

  const seeBiggerPicture = () => {
    setViewedIds(OBSERVATIONS.map((o) => o.id));
    setShowPicture(true);
    autoRevealed.current = true;
  };

  return (
    <section id="events" className="py-24 md:py-32 relative bg-[#09090b] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-widest text-amber-300/80 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Events &amp; context</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white leading-tight tracking-tight">
            Small observations.{" "}
            <span className="font-serif italic text-amber-200/90">
              Connected understanding.
            </span>
          </h2>
          <p className="text-base text-white/60 leading-relaxed font-normal mt-4">
            Pick a moment from one day.
          </p>
        </div>

        {/* Progress */}
        <div className="max-w-6xl mx-auto mb-6 flex items-center justify-between text-xs font-mono text-white/40">
          <span>
            {viewedIds.length} of {OBSERVATIONS.length} observations viewed
          </span>
          {showPicture && <span className="text-teal-400">✓ Connected</span>}
        </div>

        {/* Two-panel interactive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          {/* Left: observations */}
          <div className="lg:col-span-5 space-y-3">
            {OBSERVATIONS.map((observation) => {
              const isActive = activeId === observation.id;
              const isViewed = viewedIds.includes(observation.id);
              return (
                <button
                  key={observation.id}
                  onClick={() => selectObservation(observation)}
                  id={`observation-${observation.id}`}
                  className={`w-full text-left p-5 rounded-xl border transition-all ${
                    isActive
                      ? "bg-white/[0.07] border-white/25"
                      : "bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono text-amber-300/80">
                      {observation.number}
                    </span>
                    {isViewed ? (
                      <CheckCircle2 className="w-4 h-4 text-teal-400" />
                    ) : (
                      <span className="w-4 h-4" />
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-white/90 font-medium leading-snug">
                    &ldquo;{observation.title}&rdquo;
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right: detail / bigger picture */}
          <div className="lg:col-span-7">
            <div className="panel-quiet p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl min-h-[360px] sm:min-h-[400px]">
              <AnimatePresence mode="wait">
                {showPicture ? (
                  <motion.div
                    key="picture"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full"
                  >
                    <BiggerPicture />
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => setShowPicture(false)}
                        className="text-xs font-mono text-white/50 hover:text-white transition-colors"
                      >
                        ← Back to the moments
                      </button>
                    </div>
                  </motion.div>
                ) : activeObservation ? (
                  <motion.div
                    key={activeObservation.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="h-full flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
                      <span className="text-xs font-mono text-white/40">
                        Observation {activeObservation.number} of{" "}
                        {OBSERVATIONS.length}
                      </span>
                      <span className="text-sm font-medium text-white">
                        {activeObservation.title}
                      </span>
                    </div>
                    <DetailView observation={activeObservation} />
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
                      <Compass className="w-4 h-4" />
                    </span>
                    <p className="text-sm text-white/50 font-sans max-w-xs">
                      Pick a moment to see what it became — and what it
                      connects to.
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
            onClick={seeBiggerPicture}
            id="see-bigger-picture-btn"
            className="inline-flex items-center gap-2.5 btn-white-glow font-medium px-7 py-3 rounded-full text-sm"
          >
            <Compass className="w-4 h-4 text-black/70" />
            <span>See the bigger picture</span>
          </button>
        </div>
      </div>
    </section>
  );
}
