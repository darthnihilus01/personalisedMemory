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
  isMainEntity?: boolean;
  entityName?: string;
  labelOffset?: { x: number; y: number };
  currentAlpha?: number;
}

interface Edge {
  source: number;
  target: number;
  isMainLink?: boolean;
  currentAlpha?: number;
}

interface ObsidianGraphProps {
  isShifted?: boolean;
  revealedCount?: number;
  activeEntity?: string;
}

function generateGraphData(width: number, height: number, targetCx: number) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const nodeCount = 380;

  const cy = width < 768 ? height / 2 + 140 : height / 2;
  const scale = width < 768 ? Math.max(0.5, width / 768) : 1;

  // The 4 main isolated entities
  // Group 1: Priya & California Burrito (Top Leftish)
  // Group 2: Marcus & Solstice Capital (Bottom Rightish)
  const mainEntities = [
    { name: 'Priya', color: '#ec4899', x: targetCx - 140 * scale, y: cy - 90 * scale, offset: { x: -15, y: -20 }, cluster: 0 },
    { name: 'California Burrito', color: '#f59e0b', x: targetCx - 70 * scale, y: cy - 140 * scale, offset: { x: -45, y: -15 }, cluster: 0 },
    { name: 'Sarah', color: '#a855f7', x: targetCx - 180 * scale, y: cy - 150 * scale, offset: { x: -15, y: -15 }, cluster: 0 },
    { name: 'Marcus', color: '#2dd4bf', x: targetCx + 80 * scale, y: cy + 100 * scale, offset: { x: -20, y: 25 }, cluster: 2 },
    { name: 'Solstice Capital', color: '#38bdf8', x: targetCx + 160 * scale, y: cy + 50 * scale, offset: { x: -35, y: 25 }, cluster: 2 },
    { name: 'Alicia', color: '#10b981', x: targetCx + 220 * scale, y: cy + 120 * scale, offset: { x: -15, y: 20 }, cluster: 2 },
  ];

  for (let i = 0; i < nodeCount; i++) {
    if (i < mainEntities.length) {
      const data = mainEntities[i];
      nodes.push({
        id: `node-${i}`,
        x: data.x,
        y: data.y,
        vx: (Math.random() - 0.5) * 0.04,
        vy: (Math.random() - 0.5) * 0.04,
        radius: 6.5,
        color: data.color,
        label: data.name,
        cluster: data.cluster,
        isMainEntity: true,
        entityName: data.name,
        labelOffset: data.offset,
      });
      continue;
    }

    // Generate random ambient nodes clustered around the two groups
    const isGroup1 = Math.random() > 0.5;
    const centerX = isGroup1 ? targetCx - 100 * scale : targetCx + 120 * scale;
    const centerY = isGroup1 ? cy - 110 * scale : cy + 70 * scale;
    
    const r = (Math.random() * Math.random()) * 220 * scale;
    const a = Math.random() * Math.PI * 2;

    nodes.push({
      id: `node-${i}`,
      x: centerX + Math.cos(a) * r,
      y: centerY + Math.sin(a) * r,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      radius: Math.random() > 0.95 ? 3 : 1.5,
      color: '#71717a', // muted grey
      label: '',
      cluster: isGroup1 ? 0 : 2,
    });
  }

  // Links for main entities
  // 0 (Priya) <-> 1 (Burrito)
  edges.push({ source: 0, target: 1, isMainLink: true });
  // 0 (Priya) <-> 2 (Sarah)
  edges.push({ source: 0, target: 2, isMainLink: true });
  // 3 (Marcus) <-> 4 (Solstice)
  edges.push({ source: 3, target: 4, isMainLink: true });
  // 4 (Solstice) <-> 5 (Alicia)
  edges.push({ source: 4, target: 5, isMainLink: true });
  // 3 (Marcus) <-> 5 (Alicia)
  edges.push({ source: 3, target: 5, isMainLink: true });
  
  // Cross-scenario interlinks
  // 0 (Priya) <-> 3 (Marcus)
  edges.push({ source: 0, target: 3, isMainLink: true });
  // 1 (Burrito) <-> 3 (Marcus)
  edges.push({ source: 1, target: 3, isMainLink: true });
  // 1 (Burrito) <-> 5 (Alicia)
  edges.push({ source: 1, target: 5, isMainLink: true });

  // Ambient links (only within groups)
  for (let i = mainEntities.length; i < nodeCount; i++) {
    const maxEdges = 2;
    let created = 0;
    for (let j = mainEntities.length; j < nodeCount; j++) {
      if (i === j) continue;
      if (created >= maxEdges) break;
      
      // Only link if they are in the same general area
      if (nodes[i].cluster === nodes[j].cluster) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 50 && Math.random() > 0.7) {
          edges.push({ source: i, target: j });
          created++;
        }
      }
    }
  }

  // Connect ambient nodes loosely to their group's main entities
  for (let i = mainEntities.length; i < nodeCount; i++) {
    if (Math.random() > 0.92) {
      if (nodes[i].cluster === 0) {
        edges.push({ source: i, target: Math.random() > 0.5 ? 0 : (Math.random() > 0.5 ? 1 : 2) });
      } else {
        edges.push({ source: i, target: Math.random() > 0.5 ? 3 : (Math.random() > 0.5 ? 4 : 5) });
      }
    }
  }

  return { nodes, edges };
}

export default function ObsidianGraph({ isShifted = false, revealedCount = 0, activeEntity }: ObsidianGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const graphDataRef = useRef<{ nodes: Node[]; edges: Edge[] } | null>(null);
  const currentOffsetX = useRef(0);
  const pulsePhaseRef = useRef(0);

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
      const data = graphDataRef.current;
      if (!data) return;

      const shiftAmount = width < 768 ? 0 : -200;
      const targetOffsetX = isShifted ? shiftAmount : 0;
      currentOffsetX.current += (targetOffsetX - currentOffsetX.current) * 0.08;

      pulsePhaseRef.current += 0.03;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.translate(currentOffsetX.current, 0);

      // Update nodes
      data.nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        // Soft boundaries
        const padding = 100;
        if (n.x < padding) n.vx += 0.01;
        if (n.x > width - padding) n.vx -= 0.01;
        if (n.y < padding) n.vy += 0.01;
        if (n.y > height - padding) n.vy -= 0.01;

        // Friction and speed limits
        n.vx *= 0.98;
        n.vy *= 0.98;
        
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > 0.5) {
          n.vx = (n.vx / speed) * 0.5;
          n.vy = (n.vy / speed) * 0.5;
        }
      });

      // Draw edges
      ctx.lineWidth = 1;
      data.edges.forEach((e) => {
        const s = data.nodes[e.source];
        const t = data.nodes[e.target];

        let isActiveLink = false;
        if (e.isMainLink && activeEntity) {
          if (s.entityName === activeEntity || t.entityName === activeEntity) {
            isActiveLink = true;
          }
        }

        let targetAlpha = 0;
        if (isActiveLink && revealedCount > 0) {
          targetAlpha = 0.8;
        } else {
          targetAlpha = 0.15;
        }

        e.currentAlpha = e.currentAlpha ?? targetAlpha;
        e.currentAlpha += (targetAlpha - e.currentAlpha) * 0.08;

        if (isActiveLink && revealedCount > 0) {
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(t.x, t.y);
          const gradient = ctx.createLinearGradient(s.x, s.y, t.x, t.y);
          gradient.addColorStop(0, s.color);
          gradient.addColorStop(1, t.color);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2.5;
          ctx.globalAlpha = e.currentAlpha;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(t.x, t.y);
          ctx.strokeStyle = '#71717a';
          ctx.lineWidth = 0.8;
          ctx.globalAlpha = e.currentAlpha;
          ctx.stroke();
        }
      });

      // Draw nodes
      data.nodes.forEach((n) => {
        let isHighlighted = false;
        let isConnected = false;
        
        if (n.isMainEntity && activeEntity) {
          if (n.entityName === activeEntity) {
            isHighlighted = true;
          } else if (revealedCount > 0) {
            // Check if it's connected to the active entity
            data.edges.forEach(e => {
              if (e.isMainLink) {
                const s = data.nodes[e.source];
                const t = data.nodes[e.target];
                if ((s.entityName === activeEntity && t.entityName === n.entityName) ||
                    (t.entityName === activeEntity && s.entityName === n.entityName)) {
                  isConnected = true;
                }
              }
            });
          }
        }

        let targetAlpha = 0;
        if (isHighlighted || isConnected) {
          targetAlpha = 1;
        } else if (n.isMainEntity) {
          targetAlpha = activeEntity ? 0.2 : 0.8;
        } else {
          targetAlpha = activeEntity ? 0.1 : 0.3;
        }

        n.currentAlpha = n.currentAlpha ?? targetAlpha;
        n.currentAlpha += (targetAlpha - n.currentAlpha) * 0.08;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);

        if (isHighlighted || isConnected) {
          const pulse = Math.sin(pulsePhaseRef.current) * 0.3 + 0.7;
          
          ctx.shadowColor = n.color;
          ctx.shadowBlur = 15 * pulse * n.currentAlpha;
          ctx.fillStyle = n.color;
          ctx.globalAlpha = n.currentAlpha;
          ctx.fill();

          ctx.shadowBlur = 0;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          if (n.label) {
            ctx.fillStyle = '#ffffff';
            ctx.font = '500 13px Inter, sans-serif';
            ctx.globalAlpha = n.currentAlpha * 0.9;
            const offX = n.labelOffset?.x || 0;
            const offY = n.labelOffset?.y || -15;
            ctx.fillText(n.label, n.x + offX, n.y + offY);
          }
        } else if (n.isMainEntity) {
          ctx.fillStyle = n.color;
          ctx.globalAlpha = n.currentAlpha;
          ctx.fill();

          if (n.label && !activeEntity) {
            ctx.fillStyle = '#a1a1aa';
            ctx.font = '400 11px Inter, sans-serif';
            ctx.globalAlpha = n.currentAlpha * 0.5;
            const offX = n.labelOffset?.x || 0;
            const offY = n.labelOffset?.y || -12;
            ctx.fillText(n.label, n.x + offX, n.y + offY);
          }
        } else {
          ctx.fillStyle = n.color;
          ctx.globalAlpha = n.currentAlpha;
          ctx.fill();
        }
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isShifted, revealedCount, activeEntity]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none opacity-80 mix-blend-screen">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
