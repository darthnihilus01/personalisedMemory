"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Trash2, VolumeX } from "lucide-react";

const STATEMENTS = [
  {
    icon: ShieldCheck,
    text: "Your voice never leaves your device unless you choose to sync.",
  },
  {
    icon: Lock,
    text: "Everything is encrypted.",
  },
  {
    icon: Lock,
    text: "Nothing you say is ever used to train any model.",
  },
  {
    icon: Trash2,
    text: "You can delete anything, anytime — permanently.",
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
                <li
                  key={idx}
                  className="flex items-start gap-4"
                >
                  <span className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                    <Icon className="w-4 h-4" />
                  </span>
                  <p className="text-base text-white/85 leading-relaxed font-normal">
                    {item.text}
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-start gap-4">
            <span className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-amber-300 shrink-0">
              <VolumeX className="w-4 h-4" />
            </span>
            <p className="text-base text-white/85 leading-relaxed font-normal">
              Don&apos;t want to be reminded of someone right now? Mute them. Your
              memories stay — they just stop showing up until you&apos;re ready.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
