'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Sparkles, Wrench, Loader2, ChevronDown } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface MCPDemoProps {
  isUnlocked?: boolean;
  onComplete?: () => void;
}

type Phase = 'idle' | 'user_typing' | 'sending' | 'tool_call' | 'tool_response' | 'claude_typing' | 'completed';

const USER_PROMPT = "Hey Claude, check @lattice — every time I've mentioned my river trail run, who was I with and what time of day was it usually?";
const CLAUDE_RESPONSE = "Four mentions this year — mostly solo evening runs to decompress, like January and July when you just needed to clear your head. The two exceptions were mornings, both with someone: Adi in April, working through his job situation on the run, and your sister in October, your first run together in months.\n\nPattern's pretty clear — alone in the evening to unwind, but when someone joins, it's a morning thing, and it's never really about the run.";

const TYPING_SPEED = 30; // ms per char

export default function MCPDemo({ isUnlocked = true, onComplete }: MCPDemoProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [userTypedText, setUserTypedText] = useState('');
  const [claudeTypedText, setClaudeTypedText] = useState('');
  const [codeExpanded, setCodeExpanded] = useState(false);
  
  const hasStarted = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const startSequence = useCallback(() => {
    if (hasStarted.current || !isUnlocked) return;
    hasStarted.current = true;
    setTimeout(() => setPhase('user_typing'), 800);
  }, [isUnlocked]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startSequence();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startSequence]);

  // Phase Machine
  useEffect(() => {
    if (phase === 'user_typing') {
      if (userTypedText.length < USER_PROMPT.length) {
        const timer = setTimeout(() => {
          setUserTypedText(USER_PROMPT.slice(0, userTypedText.length + 1));
        }, TYPING_SPEED);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setPhase('sending'), 500);
        return () => clearTimeout(timer);
      }
    }
    
    if (phase === 'sending') {
      const timer = setTimeout(() => setPhase('tool_call'), 600);
      return () => clearTimeout(timer);
    }
    
    if (phase === 'tool_call') {
      const timer = setTimeout(() => setPhase('tool_response'), 1200);
      return () => clearTimeout(timer);
    }
    
    if (phase === 'tool_response') {
      setCodeExpanded(true);
      const timer = setTimeout(() => {
        setCodeExpanded(false);
        setPhase('claude_typing');
      }, 2000);
      return () => clearTimeout(timer);
    }
    
    if (phase === 'claude_typing') {
      if (claudeTypedText.length < CLAUDE_RESPONSE.length) {
        const timer = setTimeout(() => {
          setClaudeTypedText(CLAUDE_RESPONSE.slice(0, claudeTypedText.length + 1));
        }, TYPING_SPEED / 2); // Claude types slightly faster
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setPhase('completed');
          if (onComplete) onComplete();
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [phase, userTypedText, claudeTypedText, onComplete]);

  // Skip Logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && phase !== 'completed' && phase !== 'idle') {
        setPhase('completed');
        setCodeExpanded(false);
        setUserTypedText(USER_PROMPT);
        setClaudeTypedText(CLAUDE_RESPONSE);
        if (onComplete) onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, onComplete]);

  const showChat = phase !== 'idle';
  const showToolCall = ['tool_call', 'tool_response', 'claude_typing', 'completed'].includes(phase);
  const showClaude = ['claude_typing', 'completed'].includes(phase);
  const isFullyCompiled = phase === 'completed';

  return (
    <div ref={sectionRef} className="w-full py-24 md:py-32 px-6 relative z-20 min-h-screen flex flex-col items-center">
      
      {/* ── SECTION HEADER ── */}
      <motion.section
        className="text-center max-w-[1200px] mx-auto flex flex-col gap-3 items-center mb-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease }}
      >
        <h2 className="font-display w-full text-[32px] sm:text-[48px] md:text-[56px] font-medium leading-[1.1] tracking-tight md:whitespace-nowrap">
          <span className="text-white">Bring your memory</span> <br />
          <span className="text-gradient-cyan">to any AI.</span>
        </h2>
        <p className="text-[#a1a1aa] text-[14px] md:text-[15px] max-w-lg leading-[1.6]">
          Lattice exposes a Model Context Protocol (MCP) server. Connect it to Claude, ChatGPT, or any tool, and let them reason over your life&apos;s context.
        </p>
      </motion.section>

      {/* ── CHAT UI CONTAINER ── */}
      <motion.div
        className="w-full max-w-[760px] mx-auto bg-[#0d0e14]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative z-30"
        initial={{ opacity: 0, y: 30 }}
        animate={isUnlocked ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease }}
      >
        {/* Chat Header */}
        <div className="px-5 py-4 border-b border-white/[0.05] bg-[#18181b] flex items-center justify-center relative">
          <div className="text-[13px] font-medium text-zinc-300 font-sans tracking-wide flex items-center gap-2">
            Claude 3.5 Sonnet <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
          </div>
        </div>

        {/* Chat Body */}
        <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-6 min-h-[400px] bg-[#18181b]">
          
          <AnimatePresence>
            {showChat && (
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 border border-white/[0.05]">
                  <User className="w-4 h-4 text-zinc-300" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-[15px] md:text-[16px] text-zinc-200 leading-[1.6]">
                    {userTypedText}
                    {phase === 'user_typing' && <span className="inline-block w-[1.5px] h-[1em] bg-zinc-400 animate-pulse ml-0.5 align-middle" />}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showToolCall && (
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-8 h-8 rounded-full bg-[#18181b] flex items-center justify-center flex-shrink-0" />
                <div className="flex-1 pt-1">
                  <div 
                    className="inline-flex items-center gap-2.5 bg-zinc-800/50 hover:bg-zinc-800/80 transition-colors border border-white/[0.05] rounded-xl px-3 py-2 cursor-pointer shadow-sm select-none"
                    onClick={() => {
                      if (['tool_response', 'claude_typing', 'completed'].includes(phase)) {
                        setCodeExpanded(!codeExpanded);
                      }
                    }}
                  >
                    {phase === 'tool_call' ? (
                      <Loader2 className="w-3.5 h-3.5 text-zinc-400 animate-spin" />
                    ) : (
                      <Wrench className="w-3.5 h-3.5 text-zinc-400" />
                    )}
                    <span className="text-[13px] font-medium text-zinc-300 tracking-tight">
                      Using <span className="text-zinc-100">lattice</span>
                    </span>
                    <ChevronDown className={`w-3 h-3 text-zinc-500 ml-1 transition-transform ${codeExpanded ? 'rotate-180' : ''}`} />
                  </div>

                  <AnimatePresence>
                    {codeExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="w-full max-w-[440px] bg-[#111113] border border-white/[0.05] rounded-xl p-4 font-mono text-[11px] overflow-x-auto"
                      >
                        <div className="text-zinc-400 mb-2 border-b border-white/[0.05] pb-2">
                          Request
                        </div>
                        <div className="text-zinc-300">
                          <span className="text-purple-400">query_lattice</span>({'{'}
                        </div>
                        <div className="pl-4 text-zinc-400">
                          topic: <span className="text-green-400">"river trail run"</span>,<br/>
                          fields: [<span className="text-green-400">"date"</span>, <span className="text-green-400">"time"</span>, <span className="text-green-400">"companions"</span>, <span className="text-green-400">"context"</span>]
                        </div>
                        <div className="text-zinc-300">{'}'})</div>

                        <div className="text-zinc-400 mt-4 mb-2 border-b border-white/[0.05] pb-2">
                          Response
                        </div>
                        <div className="text-zinc-500">
                          <span className="text-cyan-500/80">Returned 4 memory clusters:</span><br/>
                          - Jan: Solo (Evening) "needed to clear head"<br/>
                          - Apr: With Adi (Morning) "working through job situation"<br/>
                          - Jul: Solo (Evening) "decompress"<br/>
                          - Oct: With sister (Morning) "first run in months"
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showClaude && (
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-[15px] md:text-[16px] text-zinc-200 leading-[1.7] whitespace-pre-wrap">
                    {claudeTypedText}
                    {phase === 'claude_typing' && <span className="inline-block w-[1.5px] h-[1em] bg-zinc-400 animate-pulse ml-0.5 align-middle" />}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>

      {/* ── SKIP HINT ── */}
      <AnimatePresence>
        {!isFullyCompiled && phase !== 'idle' && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 text-[10px] text-zinc-500 bg-black/40 px-3 py-1.5 rounded-full border border-white/[0.05] backdrop-blur-md flex items-center gap-1.5 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            Press <span className="font-mono text-zinc-400 bg-white/[0.05] px-1 py-0.5 rounded">Enter</span> to skip
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
