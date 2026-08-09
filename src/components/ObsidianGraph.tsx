'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  label: string;
  cluster: number;
  isMatch?: boolean;
  matchIndex?: number;
  labelOffset?: { x: number; y: number };
}

interface Edge {
  source: number;
  target: number;
  isMatchLink?: boolean;
  linkMatchCount?: number;
}

interface ObsidianGraphProps {
  isShifted?: boolean;
  revealedCount?: number; // 0, 1, 2, or 3 results revealed
}

function generateGraphData(width: number, height: number, targetCx: number) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const nodeCount = 420;

  const clusterColors = [
    '#ffffff', // White (Core)
    '#2dd4bf', // Teal cluster (Marcus)
    '#ec4899', // Pink/Magenta cluster
    '#eab308', // Yellow cluster
    '#14b8a6', // Dark Teal cluster (Backend Scalability)
    '#38bdf8', // Sky Blue cluster (Project Atlas)
    '#71717a', // Muted grey satellites
  ];

  const labels = [
    'Marcus Thorne', 'Project Atlas', 'Backend Scalability', 'System Inference',
    'Relief (Emotion)', 'Q4 Technical Specs', 'Team Morale', 'Memory Graph',
    'Database Architecture', 'Coffee Chat', 'Weekly Sync', 'Aura Engine',
    'React Query Hooks', 'Turbopack Config', 'Vector Embedding', 'Context Synthesis',
  ];

  const cy = height / 2;

  // Well-spaced positions for 3 matched nodes
  const matchPositions = [
    { x: targetCx - 160, y: cy + 110, color: '#2dd4bf', label: 'Marcus Thorne', offset: { x: -110, y: 22 } },
    { x: targetCx - 130, y: cy - 120, color: '#38bdf8', label: 'Project Atlas', offset: { x: -100, y: -24 } },
    { x: targetCx + 150, y: cy - 30, color: '#14b8a6', label: 'Backend Scalability', offset: { x: 18, y: -16 } },
  ];

  for (let i = 0; i < nodeCount; i++) {
    const isMatch = i === 0 || i === 1 || i === 2;

    if (isMatch) {
      const matchData = matchPositions[i];
      nodes.push({
        id: `node-${i}`,
        x: matchData.x,
        y: matchData.y,
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.06,
        radius: 6,
        color: matchData.color,
        label: matchData.label,
        cluster: i + 1,
        isMatch: true,
        matchIndex: i + 1,
        labelOffset: matchData.offset,
      });
      continue;
    }

    let clusterIndex = 0;
    if (i < 35) clusterIndex = 0;
    else if (i < 120) clusterIndex = 1;
    else if (i < 200) clusterIndex = 2;
    else if (i < 260) clusterIndex = 3;
    else if (i < 310) clusterIndex = 4;
    else if (i < 360) clusterIndex = 5;
    else clusterIndex = 6;

    const angle = (clusterIndex / 6) * Math.PI * 2;
    const clusterDist = clusterIndex === 0 ? 0 : 85 + Math.random() * 140;
    const clusterX = targetCx + Math.cos(angle) * clusterDist;
    const clusterY = cy + Math.sin(angle) * clusterDist;

    const r = (Math.random() * Math.random()) * 200;
    const a = Math.random() * Math.PI * 2;

    const x = clusterX + Math.cos(a) * r;
    const y = clusterY + Math.sin(a) * r;

    const radius = i < 18 ? 4.5 + Math.random() * 2.5 : 1.2 + Math.random() * 1.8;

    nodes.push({
      id: `node-${i}`,
      x,
      y,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      radius,
      color: clusterColors[clusterIndex],
      label: labels[i % labels.length],
      cluster: clusterIndex,
      isMatch: false,
    });
  }

  // Highlight links from central entity (Marcus) outward to linked entities (No triangle!)
  edges.push({ source: 0, target: 1, isMatchLink: true, linkMatchCount: 2 });
  edges.push({ source: 0, target: 2, isMatchLink: true, linkMatchCount: 3 });

  for (let i = 0; i < nodeCount; i++) {
    const maxEdges = i < 20 ? 12 : 3;
    let created = 0;
    for (let j = i + 1; j < nodeCount; j++) {
      if (created >= maxEdges) break;
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 70 && Math.random() > 0.25) {
        edges.push({ source: i, target: j });
        created++;
      }
    }
  }

  return { nodes, edges };
}

export default function ObsidianGraph({ isShifted = false, revealedCount = 0 }: ObsidianGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<{ label: string; color: string; x: number; y: number } | null>(null);
  const [matchedPositions, setMatchedPositions] = useState<
    { id: string; label: string; color: string; x: number; y: number; offset: { x: number; y: number } }[]
  >([]);
  const graphDataRef = useRef<{ nodes: Node[]; edges: Edge[] } | null>(null);
  const currentOffsetX = useRef(0);
  const pulsePhaseRef = useRef(0);

  // Smooth dimming alpha state for non-matched nodes (1.0 down to 0.35 smoothly)
  const dimAlphaRef = useRef(1);

  // Smooth line draw progress state for each match edge (0.0 to 1.0)
  const edgeProgressRef = useRef<{ [key: string]: number }>({
    '0-1': 0,
    '0-2': 0,
    '1-2': 0,
  });

  const initCanvas = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    if (!graphDataRef.current) {
      graphDataRef.current = generateGraphData(width, height, width / 2);
    }
  }, []);

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, [initCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      pulsePhaseRef.current += 0.025;
      const pulseScale = 1 + Math.sin(pulsePhaseRef.current) * 0.15;

      const targetOffset = isShifted ? -width * 0.18 : 0;
      currentOffsetX.current += (targetOffset - currentOffsetX.current) * 0.04;

      // Smooth dimming transition for non-matched nodes
      const targetDimAlpha = revealedCount > 0 ? 0.35 : 1;
      dimAlphaRef.current += (targetDimAlpha - dimAlphaRef.current) * 0.05;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const data = graphDataRef.current;
      if (!data) {
        ctx.restore();
        animId = requestAnimationFrame(render);
        return;
      }

      const { nodes, edges } = data;
      const offsetX = currentOffsetX.current;

      // Update node positions
      nodes.forEach((n) => {
        if (!n) return;
        n.x += n.vx;
        n.y += n.vy;

        if (n.y < 30 || n.y > height - 30) n.vy *= -1;
      });

      // Update smooth line growth progress
      const targetProg01 = revealedCount >= 2 ? 1 : 0;
      const targetProg02 = revealedCount >= 3 ? 1 : 0;
      const targetProg12 = revealedCount >= 3 ? 1 : 0;

      edgeProgressRef.current['0-1'] += (targetProg01 - edgeProgressRef.current['0-1']) * 0.06;
      edgeProgressRef.current['0-2'] += (targetProg02 - edgeProgressRef.current['0-2']) * 0.06;
      edgeProgressRef.current['1-2'] += (targetProg12 - edgeProgressRef.current['1-2']) * 0.06;

      // Track positions of currently revealed match nodes
      const activeMatches = [nodes[0], nodes[1], nodes[2]]
        .filter((n): n is Node => Boolean(n) && (n.matchIndex || 0) <= revealedCount)
        .map((n) => ({
          id: n.id,
          label: n.label,
          color: n.color,
          x: n.x + offsetX,
          y: n.y,
          offset: n.labelOffset || { x: 20, y: -20 },
        }));
      setMatchedPositions(activeMatches);

      // Draw background normal edges
      edges.forEach((e) => {
        if (e.isMatchLink) return;
        const source = nodes[e.source];
        const target = nodes[e.target];
        if (!source || !target) return;

        ctx.lineWidth = 0.4;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * dimAlphaRef.current})`;
        ctx.beginPath();
        ctx.moveTo(source.x + offsetX, source.y);
        ctx.lineTo(target.x + offsetX, target.y);
        ctx.stroke();
      });

      // Render ultra-subtle 1.2px filament connecting lines (Star branch layout: 0 -> 1 and 0 -> 2)
      const matchEdgeKeys = [
        { key: '0-1', source: nodes[0], target: nodes[1], color: '#38bdf8' },
        { key: '0-2', source: nodes[0], target: nodes[2], color: '#14b8a6' },
      ];

      matchEdgeKeys.forEach(({ key, source, target, color }) => {
        if (!source || !target) return;
        const prog = edgeProgressRef.current[key];
        if (prog < 0.01) return;

        const x1 = source.x + offsetX;
        const y1 = source.y;
        const x2 = target.x + offsetX;
        const y2 = target.y;

        const currX = x1 + (x2 - x1) * prog;
        const currY = y1 + (y2 - y1) * prog;

        // Ultra-clean 1.2px filament line stroke
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = `rgba(147, 197, 253, ${0.75 * prog})`;
        ctx.shadowColor = color;
        ctx.shadowBlur = 8 * prog;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(currX, currY);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Subtle particle travelling along the line
        if (prog > 0.5) {
          const t = (pulsePhaseRef.current * 0.6) % 1;
          const px = x1 + (x2 - x1) * t;
          const py = y1 + (y2 - y1) * t;

          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = color;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Draw nodes
      nodes.forEach((n) => {
        if (!n) return;
        const nx = n.x + offsetX;
        const isMatchedNode = n.isMatch && (n.matchIndex || 0) <= revealedCount;

        ctx.globalAlpha = isMatchedNode ? 1 : dimAlphaRef.current;

        if (isMatchedNode) {
          // Soft ambient bloom aura (subtle, no target rings)
          ctx.beginPath();
          ctx.arc(nx, n.y, (n.radius + 6) * pulseScale, 0, Math.PI * 2);
          ctx.fillStyle = `${n.color}25`;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(nx, n.y, isMatchedNode ? n.radius + 0.5 : n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        if (n.radius > 3.5 || isMatchedNode) {
          ctx.shadowColor = n.color;
          ctx.shadowBlur = isMatchedNode ? 14 : 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isShifted, revealedCount]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !graphDataRef.current) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const offsetX = currentOffsetX.current;

    let found = false;
    for (const node of graphDataRef.current.nodes) {
      if (!node) continue;
      const nx = node.x + offsetX;
      const dx = nx - mx;
      const dy = node.y - my;
      if (Math.sqrt(dx * dx + dy * dy) < node.radius + 8) {
        setHoveredNode({ label: node.label, color: node.color, x: nx, y: node.y });
        found = true;
        break;
      }
    }
    if (!found) setHoveredNode(null);
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-[600px] sm:h-[680px] relative select-none"
      style={{
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 60%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 60%, transparent 100%)',
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredNode(null)}
        className="w-full h-full cursor-crosshair bg-transparent"
      />

      {/* Hyper-Subtle Aesthetic Floating Label Tags */}
      {matchedPositions.map((pos) => (
        <div
          key={pos.id}
          className="absolute pointer-events-none z-30 flex items-center gap-2 bg-[#08090e]/80 backdrop-blur-md border border-white/10 text-zinc-200 text-[11px] font-mono tracking-tight px-2.5 py-1 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.8)] transition-all duration-700 animate-in fade-in zoom-in-95"
          style={{
            left: `${pos.x + (pos.offset?.x ?? 20)}px`,
            top: `${pos.y + (pos.offset?.y ?? -20)}px`,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pos.color }} />
          <span className="whitespace-nowrap">{pos.label}</span>
        </div>
      ))}

      {/* Hover Tooltip */}
      {hoveredNode && revealedCount === 0 && (
        <div
          className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-full mb-3 bg-[#0d0e14]/95 text-white text-[11px] font-medium px-3 py-1 rounded-full border border-white/20 shadow-xl flex items-center gap-1.5 backdrop-blur-md"
          style={{ left: hoveredNode.x, top: hoveredNode.y }}
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: hoveredNode.color }} />
          <span>{hoveredNode.label}</span>
        </div>
      )}
    </div>
  );
}
