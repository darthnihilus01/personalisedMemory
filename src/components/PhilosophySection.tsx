"use client";

import { motion } from "framer-motion";
import { Quote, Sparkles, Compass } from "lucide-react";

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="py-24 md:py-36 relative bg-[#09090b] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-widest text-amber-300/80 mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Product Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white leading-tight tracking-tight">
            Built on core human principles.
          </h2>
        </div>

        {/* Philosophy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="panel-quiet p-8 sm:p-10 rounded-2xl border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-amber-300 mb-6">
                <Quote className="w-4 h-4" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-light text-white leading-tight mb-4 font-sans">
                We don't build timelines.{" "}
                <span className="font-serif italic text-amber-200/90 block">
                  We build understanding.
                </span>
              </h3>
              <p className="text-sm text-white/60 leading-relaxed font-normal">
                Chronological lists treat a breakthrough conversation at 2 AM the same as a grocery reminder.
                Context recognizes what reshaped your life trajectory.
              </p>
            </div>
            <div className="pt-6 border-t border-white/[0.08] mt-6 flex items-center justify-between text-xs font-mono text-white/40">
              <span>Principle 01</span>
              <span>Non-linear Memory</span>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="panel-quiet p-8 sm:p-10 rounded-2xl border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-amber-300 mb-6">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-light text-white leading-tight mb-4 font-sans">
                We don't search your memories.{" "}
                <span className="font-serif italic text-amber-200/90 block">
                  We reason over them.
                </span>
              </h3>
              <p className="text-sm text-white/60 leading-relaxed font-normal">
                Keyword matching finds strings. Reasoning over an evolving world model connects your underlying goals, emotional states, and long-term values.
              </p>
            </div>
            <div className="pt-6 border-t border-white/[0.08] mt-6 flex items-center justify-between text-xs font-mono text-white/40">
              <span>Principle 02</span>
              <span>Deep Reasoning</span>
            </div>
          </motion.div>
        </div>

        {/* Banner Quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 p-8 sm:p-10 rounded-2xl bg-[#141418] border border-white/10 text-center"
        >
          <p className="text-xl sm:text-2xl font-light text-white/90 leading-relaxed font-sans max-w-3xl mx-auto">
            "Instead of remembering conversations,{" "}
            <span className="font-serif italic text-amber-200/90">
              it remembers your world.
            </span>"
          </p>
        </motion.div>
      </div>
    </section>
  );
}
