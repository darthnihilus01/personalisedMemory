"use client";

import { motion } from "framer-motion";
import { ShieldCheck, MicOff, Lock, Trash2, Eye } from "lucide-react";

const STATEMENTS = [
  {
    icon: MicOff,
    text: "You choose what enters your memory.",
  },
  {
    icon: Lock,
    text: "Your memories are encrypted.",
  },
  {
    icon: Trash2,
    text: "You can delete what you don't want remembered.",
  },
  {
    icon: Eye,
    text: "The system should show where important memories and conclusions came from.",
  },
];

export default function PrivacySection() {
  return (
    <section id="privacy" className="py-24 md:py-32 relative bg-[#09090b] border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-widest text-amber-300/80">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy</span>
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-light text-white text-center leading-tight tracking-tight mb-12"
        >
          Your life{" "}
          <span className="font-serif italic text-amber-200/90">is yours.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="panel-quiet p-8 sm:p-10 rounded-2xl border border-white/10"
        >
          <ul className="space-y-4">
            {STATEMENTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <li key={idx} className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-teal-400 shrink-0">
                    <Icon className="w-4 h-4" />
                  </span>
                  <p className="text-base text-white/85 leading-relaxed font-normal">
                    {item.text}
                  </p>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
