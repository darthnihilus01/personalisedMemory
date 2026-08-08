"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen } from "lucide-react";

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ManifestoModal({ isOpen, onClose }: ManifestoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 16 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-3xl panel-quiet p-8 sm:p-12 rounded-2xl border border-white/15 shadow-2xl z-10 max-h-[85vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              id="manifesto-btn-close"
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-10 pb-6 border-b border-white/[0.08]">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-300/80 mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Founding Manifesto</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-light text-white font-sans tracking-tight">
                Context is Identity.
              </h2>
            </div>

            {/* Manifesto Body */}
            <div className="space-y-8 text-white/80 font-sans leading-relaxed text-base">
              <section className="space-y-3">
                <h3 className="text-xl font-medium text-white font-sans">
                  1. Humans don't lose memories. They lose context.
                </h3>
                <p className="text-white/70">
                  Every human experience is rich, interconnected, and continuous. Yet digital tools force us to chop our lives into static documents and forgotten audio memos. When you try to remember a pivotal decision from three years ago, standard software hands you a list of keyword matches.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-medium text-white font-sans">
                  2. Beyond the Filing Cabinet.
                </h3>
                <p className="text-white/70">
                  Note-taking apps assume you want to be a librarian. AI chatbots assume every interaction is a disposable session. Neither understands the evolving arc of your projects, your relationships, or your core values.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-medium text-white font-sans">
                  3. The Living World Model.
                </h3>
                <p className="text-white/70 font-serif italic text-lg text-amber-200/90">
                  "Instead of remembering conversations, we build an evolving model of your world."
                </p>
                <p className="text-white/70">
                  The Personal Memory Engine runs continuously in the background. Voice notes, meeting transcripts, and personal reflections update an interconnected graph of your life—reasoning across time to answer complex questions about who you were, who you are, and where you are going.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-medium text-white font-sans">
                  4. Privacy as Absolute Physics.
                </h3>
                <p className="text-white/70">
                  Your life's world model belongs to you alone. We treat privacy not as a policy preference, but as architectural physics: local-first processing, client-side encryption, and zero-knowledge data ownership.
                </p>
              </section>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-6 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs font-mono text-white/40">
                Published by The Personal Memory Engine Team
              </span>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-white text-black font-medium text-xs hover:bg-zinc-200 transition-all"
              >
                Close Manifesto
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
