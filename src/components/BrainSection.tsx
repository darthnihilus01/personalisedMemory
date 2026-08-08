"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Orbit, Search } from "lucide-react";
import LivingWorldModelCanvas from "./LivingWorldModelCanvas";

export default function BrainSection() {
  const [query, setQuery] = useState("");

  const trimmed = query.trim();
  const hasQuery = trimmed.length > 0;

  return (
    <section id="brain" className="py-24 md:py-32 relative bg-[#09090b] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-widest text-amber-300/80 mb-4">
            <Orbit className="w-3.5 h-3.5" />
            <span>The brain</span>
          </div>
          <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-normal max-w-2xl mx-auto">
            Every person, place, and event you mention gets connected
            automatically — you never tag or organize anything. Search a name
            and see everything you&apos;ve ever said involving them, in order.
          </p>
        </div>

        {/* Search mock */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto mb-8"
        >
          <div className="flex items-center gap-3 p-2 rounded-full bg-[#121215] border border-white/15 focus-within:border-purple-400/40 transition-all">
            <Search className="w-4 h-4 text-white/40 ml-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a name — try Priya"
              id="brain-search-input"
              className="w-full bg-transparent py-2 text-sm text-white placeholder-white/40 focus:outline-none font-sans"
            />
          </div>

          <AnimatePresence>
            {hasQuery && (
              <motion.p
                key="search-result"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-center text-sm text-emerald-300/90 font-mono leading-relaxed"
              >
                {trimmed.toLowerCase() === "priya" ? (
                  <>
                    Search &apos;Priya&apos; → every lunch, every mention, every
                    conversation involving her — as far back as you&apos;ve been
                    using it.
                  </>
                ) : (
                  <>
                    Search &apos;{trimmed}&apos; → everything you&apos;ve ever said
                    involving {trimmed}, in order.
                  </>
                )}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Graph visual */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-8"
        >
          <LivingWorldModelCanvas />
        </motion.div>
      </div>
    </section>
  );
}
