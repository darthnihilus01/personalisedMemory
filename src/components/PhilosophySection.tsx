"use client";

import { motion } from "framer-motion";
import { Sparkles, Quote, Compass } from "lucide-react";

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="py-28 md:py-44 relative bg-[#060709] border-t border-white/[0.06] overflow-hidden">
      {/* Background Subtle Lines & Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-purple-900/10 via-indigo-900/10 to-amber-900/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-20 sm:mb-28">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-white/10 text-xs font-mono uppercase tracking-widest text-purple-400 mb-6">
            <Compass className="w-3.5 h-3.5" />
            <span>Product Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white leading-tight tracking-tight">
            Built on core human principles.
          </h2>
        </div>

        {/* Philosophy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-panel p-10 sm:p-12 rounded-3xl border border-white/10 glass-panel-hover flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/15 flex items-center justify-center text-purple-400 mb-8 group-hover:scale-110 group-hover:border-purple-400/50 transition-all duration-300">
                <Quote className="w-4 h-4" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-light text-white leading-tight mb-6 font-sans">
                We don't build timelines.{" "}
                <span className="font-serif italic text-gradient-purple block">
                  We build understanding.
                </span>
              </h3>
              <p className="text-base text-white/60 leading-relaxed font-normal">
                Chronological lists treat a breakthrough conversation at 2 AM the same as a grocery reminder.
                Context recognizes what reshaped your life trajectory.
              </p>
            </div>
            <div className="pt-8 border-t border-white/10 mt-8 flex items-center justify-between text-xs font-mono text-white/40">
              <span>Principle 01</span>
              <span>Non-linear Memory</span>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="glass-panel p-10 sm:p-12 rounded-3xl border border-white/10 glass-panel-hover flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/15 flex items-center justify-center text-amber-400 mb-8 group-hover:scale-110 group-hover:border-amber-400/50 transition-all duration-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-light text-white leading-tight mb-6 font-sans">
                We don't search your memories.{" "}
                <span className="font-serif italic text-gradient-amber block">
                  We reason over them.
                </span>
              </h3>
              <p className="text-base text-white/60 leading-relaxed font-normal">
                Keyword matching finds strings. Reasoning over an evolving world model connects your underlying goals, emotional states, and long-term values.
              </p>
            </div>
            <div className="pt-8 border-t border-white/10 mt-8 flex items-center justify-between text-xs font-mono text-white/40">
              <span>Principle 02</span>
              <span>Deep Reasoning</span>
            </div>
          </motion.div>
        </div>

        {/* Banner Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-950/30 via-indigo-950/20 to-black border border-purple-500/20 text-center"
        >
          <p className="text-2xl sm:text-3xl font-light text-white/90 leading-snug font-sans max-w-4xl mx-auto">
            "Instead of remembering conversations,{" "}
            <span className="font-serif italic text-gradient-purple">
              it remembers your world.
            </span>"
          </p>
        </motion.div>
      </div>
    </section>
  );
}
