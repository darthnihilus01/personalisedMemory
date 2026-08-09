'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, User, MapPin, Building2, ChevronRight, Sparkles, Calendar, Link2, Clock, Hash, TrendingUp, ArrowRight, ChevronDown, ChevronUp, ExternalLink, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ObsidianGraph from './ObsidianGraph';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

// ── ISOLATED KNOWLEDGE BASE ──
interface Citation {
  date: string;
  time: string;
  snippet: string;
  linkedEntities: string[];
}

interface EntityConnection {
  name: string;
  type: 'person' | 'place' | 'org';
  relation: string;
  count: number;
  lastSeen: string;
  color: string;
}

interface EntityData {
  name: string;
  type: 'person' | 'place' | 'org';
  subtitle: string;
  mentions: number;
  firstSeen: string;
  lastSeen: string;
  color: string;
  connections: EntityConnection[];
  citations: Citation[];
}

const KNOWLEDGE_BASE: Record<string, EntityData> = {
  priya: {
    name: 'Priya',
    type: 'person',
    subtitle: 'Best Friend',
    mentions: 23,
    firstSeen: 'Mar 14, 2024',
    lastSeen: 'Aug 9, 2026',
    color: '#ec4899',
    connections: [
      { name: 'California Burrito', type: 'place', relation: 'Favorite spot together', count: 8, lastSeen: 'Aug 9, 2026', color: '#f59e0b' },
    ],
    citations: [
      { date: 'Aug 9, 2026', time: '7:20 PM', snippet: '"Caught up with Priya at California Burrito today. Didn\'t realize how much I\'d missed her until we were sitting there again — felt like no time had passed."', linkedEntities: ['California Burrito'] },
      { date: 'Jun 12, 2025', time: '9:15 PM', snippet: '"Priya called out of nowhere. She\'s moving back to the city next year. Can\'t believe it\'s been almost two years since we last hung out in person."', linkedEntities: [] },
      { date: 'Feb 14, 2025', time: '11:30 AM', snippet: '"Sent Priya a long voice note for her birthday. Rambled about college memories. She sent one back that made me laugh for ten minutes straight."', linkedEntities: [] },
      { date: 'Dec 25, 2024', time: '3:00 PM', snippet: '"Family dinner, then called Priya. We talked about the old apartment and how we used to order California Burrito at 2AM during finals."', linkedEntities: ['California Burrito'] },
      { date: 'Oct 3, 2024', time: '6:45 PM', snippet: '"Thinking about Priya today. Saw someone at a cafe who looked exactly like her. Need to plan a trip to visit."', linkedEntities: [] },
      { date: 'Aug 22, 2024', time: '1:20 PM', snippet: '"Quick lunch at California Burrito. Wished Priya was here — it\'s really our place. Texted her a photo of the carne asada."', linkedEntities: ['California Burrito'] },
      { date: 'Jun 8, 2024', time: '8:00 PM', snippet: '"Priya and I grabbed dinner at California Burrito before she left. Bittersweet. She promised she\'d be back but we both know long distance is hard."', linkedEntities: ['California Burrito'] },
      { date: 'Mar 14, 2024', time: '4:30 PM', snippet: '"Met Priya\'s new coworkers at a rooftop thing downtown. She seems happy at the new job. We snuck out early to get burritos, obviously."', linkedEntities: ['California Burrito'] },
    ],
  },
  marcus: {
    name: 'Marcus',
    type: 'person',
    subtitle: 'Investor Contact',
    mentions: 14,
    firstSeen: 'Jan 18, 2026',
    lastSeen: 'Aug 9, 2026',
    color: '#2dd4bf',
    connections: [
      { name: 'Solstice Capital', type: 'org', relation: 'Works at', count: 12, lastSeen: 'Aug 9, 2026', color: '#38bdf8' },
    ],
    citations: [
      { date: 'Aug 9, 2026', time: '3:45 PM', snippet: '"Call with Marcus from Solstice Capital about the investment. Was nervous going in, but it went really well — feels like a weight lifted."', linkedEntities: ['Solstice Capital'] },
      { date: 'Aug 2, 2026', time: '10:00 AM', snippet: '"Prepping for the Marcus call next week. Revised the pitch deck again. Series A numbers looking solid. Need to nail the narrative."', linkedEntities: ['Solstice Capital'] },
      { date: 'Jul 15, 2026', time: '2:30 PM', snippet: '"Quick email from Marcus — they want to schedule a follow-up. This is the third touchpoint. Feeling cautiously optimistic."', linkedEntities: ['Solstice Capital'] },
      { date: 'May 28, 2026', time: '4:15 PM', snippet: '"Had a casual check-in with Marcus. He asked about our growth metrics. Sent him the dashboard link after."', linkedEntities: ['Solstice Capital'] },
      { date: 'Jan 18, 2026', time: '11:00 AM', snippet: '"First meeting with Marcus at Solstice Capital. Intense but good energy. He asked the right questions. Could be a great partner."', linkedEntities: ['Solstice Capital'] },
    ],
  },
  'california burrito': {
    name: 'California Burrito',
    type: 'place',
    subtitle: 'Favorite Restaurant',
    mentions: 11,
    firstSeen: 'Mar 14, 2024',
    lastSeen: 'Aug 9, 2026',
    color: '#f59e0b',
    connections: [
      { name: 'Priya', type: 'person', relation: 'Always goes together', count: 8, lastSeen: 'Aug 9, 2026', color: '#ec4899' },
    ],
    citations: [
      { date: 'Aug 9, 2026', time: '7:20 PM', snippet: '"Stopped by California Burrito with Priya. Our usual spot. The carne asada hasn\'t changed — neither has our friendship."', linkedEntities: ['Priya'] },
      { date: 'Aug 22, 2024', time: '1:20 PM', snippet: '"Quick lunch at California Burrito. Wished Priya was here — it\'s really our place. Texted her a photo of the carne asada."', linkedEntities: ['Priya'] },
      { date: 'Jun 8, 2024', time: '8:00 PM', snippet: '"Priya and I grabbed dinner at California Burrito before she left. Bittersweet. She promised she\'d be back."', linkedEntities: ['Priya'] },
      { date: 'Mar 14, 2024', time: '4:30 PM', snippet: '"We snuck out of the rooftop party early to get burritos, obviously. The al pastor was insane."', linkedEntities: ['Priya'] },
    ],
  },
  'solstice capital': {
    name: 'Solstice Capital',
    type: 'org',
    subtitle: 'Investment Firm',
    mentions: 9,
    firstSeen: 'Jan 18, 2026',
    lastSeen: 'Aug 9, 2026',
    color: '#38bdf8',
    connections: [
      { name: 'Marcus', type: 'person', relation: 'Primary contact', count: 9, lastSeen: 'Aug 9, 2026', color: '#2dd4bf' },
    ],
    citations: [
      { date: 'Aug 9, 2026', time: '3:45 PM', snippet: '"Call with Marcus from Solstice Capital about the investment. Was nervous going in, but it went really well."', linkedEntities: ['Marcus'] },
      { date: 'Aug 2, 2026', time: '10:00 AM', snippet: '"Prepping for the Marcus call next week. Revised the pitch deck again. Series A numbers looking solid."', linkedEntities: ['Marcus'] },
      { date: 'Jul 15, 2026', time: '2:30 PM', snippet: '"Quick email from Marcus at Solstice — they want to schedule a follow-up. Third touchpoint."', linkedEntities: ['Marcus'] },
      { date: 'May 28, 2026', time: '4:15 PM', snippet: '"Casual check-in with Marcus. He asked about our growth metrics."', linkedEntities: ['Marcus'] },
      { date: 'Jan 18, 2026', time: '11:00 AM', snippet: '"First meeting with Marcus at Solstice Capital. Intense but good energy."', linkedEntities: ['Marcus'] },
    ],
  },
};

const SEARCH_SUGGESTIONS = ['Priya', 'Marcus', 'California Burrito', 'Solstice Capital'];
const TYPING_SPEED = 120;

interface FinalCTAProps {
  isUnlocked?: boolean;
  onComplete?: () => void;
}

function getEntityIcon(type: 'person' | 'place' | 'org') {
  switch (type) {
    case 'person': return <User className="w-3.5 h-3.5" />;
    case 'place': return <MapPin className="w-3.5 h-3.5" />;
    case 'org': return <Building2 className="w-3.5 h-3.5" />;
  }
}

export default function FinalCTA({ isUnlocked = true, onComplete }: FinalCTAProps) {
  const [demoPhase, setDemoPhase] = useState<
    'centered_graph' | 'shifting_graph' | 'demo_typing' | 'demo_results' | 'interactive'
  >('centered_graph');

  const [demoTypedText, setDemoTypedText] = useState('');
  const hasStarted = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeEntity, setActiveEntity] = useState<EntityData | null>(null);
  const [showDropNodes, setShowDropNodes] = useState(false);
  const [showCitations, setShowCitations] = useState(false);
  const [citationsExpanded, setCitationsExpanded] = useState(false);
  const [expandedCitationIdx, setExpandedCitationIdx] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'connections' | 'timeline'>('connections');

  const startSequence = useCallback(() => {
    if (hasStarted.current || !isUnlocked) return;
    hasStarted.current = true;
    setTimeout(() => setDemoPhase('shifting_graph'), 1500);
  }, [isUnlocked]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { startSequence(); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startSequence]);

  useEffect(() => {
    if (demoPhase === 'shifting_graph') {
      const timer = setTimeout(() => setDemoPhase('demo_typing'), 600);
      return () => clearTimeout(timer);
    }
  }, [demoPhase]);

  useEffect(() => {
    if (demoPhase !== 'demo_typing') return;
    const target = 'Priya';
    if (demoTypedText.length < target.length) {
      const timer = setTimeout(() => setDemoTypedText(target.slice(0, demoTypedText.length + 1)), TYPING_SPEED);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDemoPhase('demo_results');
        setActiveEntity(KNOWLEDGE_BASE['priya']);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [demoPhase, demoTypedText]);

  useEffect(() => {
    if (demoPhase !== 'demo_results') return;
    const t1 = setTimeout(() => setShowDropNodes(true), 300);
    const t2 = setTimeout(() => setShowCitations(true), 800);
    const t3 = setTimeout(() => {
      setDemoPhase('interactive');
      setSearchQuery('Priya');
      if (onComplete) setTimeout(onComplete, 400);
    }, 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [demoPhase, onComplete]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    const key = query.toLowerCase().trim();
    const entity = KNOWLEDGE_BASE[key];
    if (entity) {
      setActiveEntity(entity);
      setShowDropNodes(false);
      setShowCitations(false);
      setCitationsExpanded(false);
      setExpandedCitationIdx(null);
      setActiveTab('connections');
      setTimeout(() => setShowDropNodes(true), 150);
      setTimeout(() => setShowCitations(true), 400);
    } else {
      setActiveEntity(null);
      setShowDropNodes(false);
      setShowCitations(false);
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => { e.preventDefault(); handleSearch(searchQuery); };
  const handleSuggestionClick = (s: string) => { setSearchQuery(s); handleSearch(s); };

  const isShifted = demoPhase !== 'centered_graph';
  const showSearchBar = demoPhase !== 'centered_graph' && demoPhase !== 'shifting_graph';
  const isInteractive = demoPhase === 'interactive';
  const revealedCount = activeEntity ? activeEntity.connections.length : 0;

  const CITATIONS_PREVIEW = 3;
  const visibleCitations = activeEntity
    ? (citationsExpanded ? activeEntity.citations : activeEntity.citations.slice(0, CITATIONS_PREVIEW))
    : [];

  if (!isUnlocked) return null;

  return (
    <motion.div
      ref={sectionRef}
      className="w-full relative z-20 text-white pt-24 pb-24 px-6 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 60, damping: 20 }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">

        <motion.h2
          className="font-display w-full max-w-[1200px] text-[28px] sm:text-[40px] md:text-[48px] font-medium text-white leading-[1.1] tracking-tight mb-3 md:whitespace-nowrap text-center"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Not another place to store your life.
        </motion.h2>

        <motion.h3
          className="font-display w-full max-w-[1200px] text-[28px] sm:text-[40px] md:text-[48px] font-medium leading-[1.1] tracking-tight text-zinc-400 mb-4 md:whitespace-nowrap text-center"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          A memory that grows with it.
        </motion.h3>

        <motion.p
          className="text-zinc-500 text-[14px] md:text-[15px] max-w-lg leading-[1.6] text-center mb-12"
          initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Lattice weaves your thoughts into a living knowledge graph. Search anything — we remember the connections.
        </motion.p>

        {/* ── STAGE ── */}
        <div className="w-full relative min-h-[600px] flex flex-col items-center justify-center">

          {/* ── SEARCH BAR ── */}
          <AnimatePresence>
            {showSearchBar && (
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 z-40 w-full max-w-[500px] px-4"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: 'spring', stiffness: 100, damping: 18 }}
              >
                {isInteractive ? (
                  <form onSubmit={handleSearchSubmit} className="w-full">
                    <div className="w-full bg-[#0a0b10] border border-white/[0.08] rounded-xl shadow-sm overflow-hidden">
                      <div className="flex items-center p-2.5 pl-4 pr-3">
                        <Search className="w-4 h-4 text-zinc-400 mr-3 flex-shrink-0" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(searchQuery); }}
                          placeholder="Search your memory…"
                          className="flex-1 bg-transparent text-sm text-zinc-200 font-medium outline-none placeholder:text-zinc-600"
                        />
                        <span className="text-[10px] font-mono text-zinc-500 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.05] ml-2">⌘K</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 pb-3 pt-1 border-t border-white/[0.03]">
                        <span className="text-[10px] text-zinc-500">Try:</span>
                        {SEARCH_SUGGESTIONS.map((s) => (
                          <button key={s} type="button" onClick={() => handleSuggestionClick(s)}
                            className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${searchQuery.toLowerCase() === s.toLowerCase() ? 'border-zinc-500 text-zinc-200 bg-white/[0.05]' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
                          >{s}</button>
                        ))}
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="w-full bg-[#0a0b10] border border-white/[0.08] rounded-xl p-2.5 pl-4 pr-3 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <Search className="w-4 h-4 text-zinc-400" />
                      <div className="text-sm text-zinc-200 font-medium flex items-center">
                        <span>{demoTypedText}</span>
                        {demoPhase === 'demo_typing' && <span className="inline-block w-[1.5px] h-[1em] bg-zinc-400 animate-pulse ml-0.5" />}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.05]">⌘K</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── RESULTS PANEL ── */}
          <AnimatePresence mode="wait">
            {activeEntity && (
              <motion.div
                key={activeEntity.name}
                className="absolute right-0 sm:right-4 top-14 z-40 w-full max-w-[420px] px-3 sm:px-0"
                initial={{ opacity: 0, x: 20, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 100, damping: 18 }}
              >
                <div className="w-full bg-[#0a0b10]/95 backdrop-blur-md border border-white/[0.08] rounded-xl shadow-lg flex flex-col relative overflow-hidden max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">

                  {/* HEADER */}
                  <div className="p-4 pb-3 border-b border-white/[0.04] sticky top-0 bg-[#0a0b10]/95 backdrop-blur-md z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-zinc-300">
                          {getEntityIcon(activeEntity.type)}
                        </div>
                        <div>
                          <h4 className="text-[15px] font-medium text-zinc-100">{activeEntity.name}</h4>
                          <span className="text-[11px] text-zinc-500">{activeEntity.subtitle}</span>
                        </div>
                      </div>
                      <Bookmark className="w-3.5 h-3.5 text-zinc-600 hover:text-zinc-300 cursor-pointer transition-colors" />
                    </div>

                    <div className="flex items-center gap-4 text-[10px] text-zinc-500 mb-3">
                      <span className="flex items-center gap-1"><Hash className="w-3 h-3" /> {activeEntity.mentions} mentions</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {activeEntity.firstSeen}</span>
                    </div>

                    <div className="flex gap-1 bg-white/[0.02] rounded p-0.5 border border-white/[0.03]">
                      <button
                        onClick={() => setActiveTab('connections')}
                        className={`flex-1 text-[11px] font-medium py-1 rounded transition-colors ${activeTab === 'connections' ? 'bg-white/[0.06] text-zinc-200' : 'text-zinc-500 hover:text-zinc-300'}`}
                      >
                        Connections ({activeEntity.connections.length})
                      </button>
                      <button
                        onClick={() => setActiveTab('timeline')}
                        className={`flex-1 text-[11px] font-medium py-1 rounded transition-colors ${activeTab === 'timeline' ? 'bg-white/[0.06] text-zinc-200' : 'text-zinc-500 hover:text-zinc-300'}`}
                      >
                        Timeline ({activeEntity.citations.length})
                      </button>
                    </div>
                  </div>

                  {/* CONNECTIONS TAB */}
                  <AnimatePresence mode="wait">
                    {activeTab === 'connections' && showDropNodes && (
                      <motion.div key="connections" className="p-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="flex flex-col gap-1.5">
                          {activeEntity.connections.map((conn) => (
                            <div
                              key={conn.name}
                              className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.03] hover:border-white/[0.08] transition-colors cursor-pointer group"
                              onClick={() => { const key = conn.name.toLowerCase(); if (KNOWLEDGE_BASE[key]) handleSuggestionClick(conn.name); }}
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="w-6 h-6 rounded bg-white/[0.03] flex items-center justify-center text-zinc-400">
                                  {getEntityIcon(conn.type)}
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[12px] font-medium text-zinc-300 group-hover:text-white transition-colors">{conn.name}</span>
                                  <span className="text-[10px] text-zinc-500">{conn.relation}</span>
                                </div>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* TIMELINE TAB */}
                    {activeTab === 'timeline' && showCitations && (
                      <motion.div key="timeline" className="p-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="flex flex-col gap-0 relative">
                          <div className="absolute left-[13px] top-3 bottom-3 w-[1px] bg-zinc-800/50" />
                          {visibleCitations.map((cite, i) => (
                            <div key={`${cite.date}-${i}`} className="relative pl-7 pb-3">
                              <div className="absolute left-[10px] top-[8px] w-[7px] h-[7px] rounded-full bg-zinc-700" />
                              <div
                                className={`rounded-lg border transition-colors cursor-pointer ${expandedCitationIdx === i ? 'bg-white/[0.04] border-white/[0.08]' : 'bg-transparent border-transparent hover:bg-white/[0.02]'}`}
                                onClick={() => setExpandedCitationIdx(expandedCitationIdx === i ? null : i)}
                              >
                                <div className="flex items-center justify-between px-2.5 py-1.5">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-medium text-zinc-300">{cite.date}</span>
                                    <span className="text-[10px] text-zinc-500">{cite.time}</span>
                                  </div>
                                  {expandedCitationIdx === i ? <ChevronUp className="w-3 h-3 text-zinc-600" /> : <ChevronDown className="w-3 h-3 text-zinc-600" />}
                                </div>
                                <div className="px-2.5 pb-2">
                                  <p className={`text-[11px] text-zinc-400 leading-relaxed ${expandedCitationIdx !== i ? 'line-clamp-1' : ''}`}>
                                    {cite.snippet}
                                  </p>
                                </div>
                                <AnimatePresence>
                                  {expandedCitationIdx === i && (
                                    <motion.div className="px-2.5 pb-2.5 flex flex-col gap-2" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                      {cite.linkedEntities.length > 0 && (
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                          <Link2 className="w-3 h-3 text-zinc-600" />
                                          {cite.linkedEntities.map((le) => (
                                            <button key={le} onClick={(e) => { e.stopPropagation(); const key = le.toLowerCase(); if (KNOWLEDGE_BASE[key]) handleSuggestionClick(le); }} className="text-[10px] text-zinc-400 bg-white/[0.03] px-1.5 py-0.5 rounded border border-white/[0.05] hover:bg-white/[0.06] transition-colors">
                                              {le}
                                            </button>
                                          ))}
                                        </div>
                                      )}
                                      <div className="flex items-center gap-2 mt-1">
                                        <button onClick={(e) => e.stopPropagation()} className="text-[10px] font-medium text-zinc-300 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.05] px-2.5 py-1 rounded transition-colors flex items-center gap-1">
                                          <ArrowRight className="w-3 h-3" /> Go to Day
                                        </button>
                                        <button onClick={(e) => e.stopPropagation()} className="text-[10px] font-medium text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1">
                                          <ExternalLink className="w-3 h-3" /> Full Entry
                                        </button>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          ))}
                          {activeEntity.citations.length > CITATIONS_PREVIEW && (
                            <button className="ml-7 text-[10px] font-medium text-zinc-500 hover:text-zinc-300 flex items-center gap-1 mt-1 transition-colors" onClick={() => setCitationsExpanded(!citationsExpanded)}>
                              {citationsExpanded ? <><ChevronUp className="w-3 h-3" /> Show less</> : <><ChevronDown className="w-3 h-3" /> Show all {activeEntity.citations.length}</>}
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* OBSIDIAN GRAPH */}
          <div className="w-full">
            <ObsidianGraph isShifted={isShifted} revealedCount={revealedCount} activeEntity={activeEntity?.name} />
          </div>
        </div>

        {/* ── FULL DAY COMPILED ENTRY (ALWAYS VISIBLE AT BOTTOM) ── */}
        <div className="w-full max-w-[800px] mt-16 pb-12">
          <div className="w-full bg-[#0a0b10] border border-white/[0.06] rounded-2xl p-6 md:p-8 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-4 mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-zinc-400" />
                <h4 className="text-[13px] font-medium text-zinc-200 tracking-tight">Full Day Summary</h4>
              </div>
              <div className="flex items-center gap-2 text-zinc-500 text-[12px]">
                <Calendar className="w-3.5 h-3.5" /><span>Aug 9, 2026</span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Link2 className="w-3.5 h-3.5 text-zinc-600" />
              {['Marcus', 'Solstice Capital', 'Priya', 'California Burrito'].map((e) => (
                <span key={e} className="text-[11px] text-zinc-400 font-medium bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.05]">{e}</span>
              ))}
            </div>

            <p className="text-[14px] md:text-[15px] text-zinc-300 leading-[1.7]">
              &ldquo;Today started with a call with <strong className="font-medium text-zinc-100">Marcus</strong> from <strong className="font-medium text-zinc-100">Solstice Capital</strong> about the investment. I was honestly nervous going in, but it went really well — felt like a weight lifted. Later on, I caught up with <strong className="font-medium text-zinc-100">Priya</strong> after two years. We stopped by my favorite spot, <strong className="font-medium text-zinc-100">California Burrito</strong>, like always, and it hit me sitting there just how much I&apos;d missed her — no time had passed at all. Good day overall — relief on one end, and a reminder of how some friendships just don&apos;t change.&rdquo;
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
