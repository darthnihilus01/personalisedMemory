"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Sparkles, Link2 } from "lucide-react";

const EXAMPLE_TEXT =
  "Just got out of a meeting with Marcus. We decided to push the Atlas launch by two weeks. Honestly, I'm relieved.";

const EXTRACTED = ["Marcus", "Atlas", "Launch", "Decision", "Relief"];

const CONNECTION_CHAIN = [
  "Marcus",
  "Atlas",
  "Previous meetings",
  "Previous decisions",
];

export default function WhatItDoes() {
  const [typed, setTyped] = useState(0);
  const [extracted, setExtracted] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTyped((prev) => {
        if (prev >= EXAMPLE_TEXT.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 26);
    return () => clearInterval(interval);
  }, []);

  const typingDone = typed >= EXAMPLE_TEXT.length;

  useEffect(() => {
    if (!typingDone) return;
    const interval = setInterval(() => {
      setExtracted((prev) => {
        if (prev >= EXTRACTED.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 350);
    return () => clearInterval(interval);
  }, [typingDone]);

  return (
    <section id="what-it-does" className="py-24 md:py-32 relative bg-[#09090b] border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex items-center justify-center"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-widest text-amber-300/80">
            <Sparkles className="w-3.5 h-3.5" />
            <span>What it does</span>
          </span>
        </motion.div>

        {/* Voice note, transcribed live */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="panel-quiet p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl"
        >
          <div className="flex items-center gap-3 pb-5 border-b border-white/[0.08] mb-5">
            <span className="relative flex w-9 h-9 rounded-full bg-red-500/10 border border-red-500/30 items-center justify-center text-red-400">
              <span className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse" />
              <Mic className="w-4 h-4 relative" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-mono text-white/80">You said</span>
              <span className="text-[11px] font-mono text-white/40">
                {typingDone ? "Captured" : "Listening…"}
              </span>
            </div>
          </div>

          <p className="text-base sm:text-lg text-white/90 leading-relaxed font-sans min-h-[5.5rem]">
            {EXAMPLE_TEXT.slice(0, typed)}
            {typed < EXAMPLE_TEXT.length && (
              <span className="inline-block w-[2px] h-[1.1em] bg-amber-300/80 align-middle ml-0.5 animate-pulse" />
            )}
          </p>

          {/* What the engine keeps */}
          <AnimatePresence>
            {typingDone && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="pt-5 mt-5 border-t border-white/[0.08]">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-3">
                    Kept from that moment
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {EXTRACTED.map((item, idx) => (
                      <AnimatePresence key={item}>
                        {idx < extracted && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.25 }}
                            className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/15 text-xs font-mono text-white/85"
                          >
                            {item}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    ))}
                  </div>

                  {/* Connection visual */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-7 pt-5 border-t border-white/[0.08]"
                  >
                    <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal mb-4">
                      It doesn&apos;t just save what you said. It connects it
                      to what you already remember.
                    </p>
                    <div className="flex flex-col items-start gap-1.5">
                      {CONNECTION_CHAIN.map((item, idx) => (
                        <div key={item} className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                            <span className="text-xs font-mono text-amber-100/90">{item}</span>
                            {idx === CONNECTION_CHAIN.length - 1 && (
                              <Link2 className="w-3.5 h-3.5 text-emerald-400/80" />
                            )}
                          </div>
                          {idx < CONNECTION_CHAIN.length - 1 && (
                            <span className="ml-[3px] h-4 w-px bg-white/15" />
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
