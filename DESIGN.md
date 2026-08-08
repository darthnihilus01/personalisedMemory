# Design — Personal Memory Engine Landing Page

The official design reference for the Memory Engine marketing site. This documents the current, shipped state of the design system (as of the v6 structure with the V1 hero retained).

---

## 1. Design Principles

1. **Dark, immersive, editorial.** A near-black purple-tinted background (`#0b0a12`) with quiet white text — the product is about memory, so the page feels like a private archive at night.
2. **One focal statement per screen.** The hero is a single philosophical headline; every section has exactly one idea.
3. **Glass over glow.** Surfaces use subtle frosted-glass panels (`glass-pill`, `panel-quiet`) instead of heavy borders. Glow is reserved for hero accents, the active canvas node, and hover states.
4. **Monospace as a system voice.** `Geist Mono` is used for labels, status lines, timestamps, and micro-copy — it reads as "instrumentation" vs. the editorial serif "voice".
5. **Privacy is visible.** Lock icons, local-first phrasing, and encryption language appear across sections, not just the privacy block.

---

## 2. Color Tokens

Defined in `src/app/globals.css` under `:root`.

| Token | Value | Usage |
| --- | --- | --- |
| `--bg-primary` | `#0b0a12` | Page background |
| `--bg-surface` | `#12111a` | Panels, cards (`panel-quiet`) |
| `--bg-hover` | `#1a1826` | Hover surfaces |
| `--bg-active` | `#242136` | Active/toggled surfaces |
| `--border-subtle` | `rgba(255,255,255,0.08)` | Default hairlines |
| `--border-medium` | `rgba(168,85,247,0.25)` | Purple-tinted borders |
| `--border-purple` | `rgba(192,132,252,0.4)` | Strong purple borders |
| `--accent-purple` | `#c084fc` | Primary accent |
| `--accent-purple-light` | `#e9d5ff` | Gradient start |
| `--accent-purple-glow` | `rgba(168,85,247,0.25)` | Ambient glow |
| `--accent-emerald` | `#34d399` | Live/status accents |
| `--text-primary` | `#f8fafc` | Headlines |
| `--text-secondary` | `#cbd5e1` | Body copy |
| `--text-muted` | `#94a3b8` | Captions, meta |

**Gradient (hero accent):** `linear-gradient(135deg, #e9d5ff 0%, #c084fc 50%, #818cf8 100%)` — `.text-gradient-purple`.

**Page background glow (hero only):** `.radial-glow-hero` — purple radial at 50% 35%.

---

## 3. Typography

### Global fonts (rest of the page)
Loaded in `src/app/layout.tsx` and mapped in `globals.css` `@theme`:

| Role | Font | Tailwind class |
| --- | --- | --- |
| Primary (body, UI) | **Inter** | `font-sans` |
| Hero emphasis / editorial serif | **Instrument Serif** (400, italic) | `font-serif` |
| System labels, mono | **Geist Mono** | `font-mono` |

### V1 hero fonts (hero only)
The hero retains the V1 font pairing via dedicated classes:

| Role | Font | Class |
| --- | --- | --- |
| Hero headline + body text | **Geist** | `.font-v1-sans` |
| Hero accent ("It's made of context.") | **Newsreader** (400 + 600 italic) | `.font-v1-serif` |

### Scale
- Hero headline: `text-4xl → sm:text-6xl → md:text-7xl`, `font-light`, `tracking-tight`, `leading-[1.15]` (loosened from 1.08 so italic serif ascenders/descenders don't clip).
- Section titles: `text-3xl sm:text-5xl font-light`
- Body: `text-lg sm:text-xl text-white/60`
- Labels: `text-xs font-mono uppercase tracking-widest`

---

## 4. Core CSS Utilities (`globals.css`)

| Class | Purpose |
| --- | --- |
| `.radial-glow-hero` | Purple ambient radial for the hero section |
| `.text-gradient-purple` | 3-stop purple→indigo gradient text (background-clip) |
| `.btn-white-glow` | White pill button with layered white/purple glow shadow |
| `.glass-pill` | Frosted pill surface (blur 12px, white/4 bg) |
| `.glass-pill-purple` | Purple-tinted frosted pill (mic visual, active states) |
| `.panel-quiet` | Card surface: `--bg-surface` + `--border-subtle`, radius 16px |
| `.panel-quiet-hover` | Hover: `--bg-hover`, purple border, soft glow |
| `.bg-noise` | 3% fractal-noise SVG overlay on `<body>` |
| `.grid-bg-quiet` | 36px white/2% grid lines (canvas backdrop) |
| `.animate-pulse-slow` / `.animate-pulse-slower` | 3s / 4.5s pulse rings (mic visual, canvas) |

---

## 5. Page Structure

`src/app/page.tsx` — single page, client component, two view modes:

```
Navbar (fixed, transparent → blur on scroll)
└─ main
   ├─ LANDING MODE
   │  ├─ HeroSection            (#hero, V1)
   │  ├─ WhatItDoes             (#what-it-does)
   │  ├─ EventsContext          (#events)
   │  ├─ MemoryEngineSection    (#memory-engine)
   │  ├─ CompoundingMemory      (#over-time)
   │  ├─ PrivacySection         (#privacy)
   │  └─ WaitlistSection        (#waitlist)
   └─ WORKSPACE MODE
      └─ ProductWorkspace       (interactive product demo)
Footer
```

- View mode is toggled from the Navbar (`Product Mode` / `Overview Mode`, plus a segmented control while in workspace).
- Nav links: What it does · Events & context · Memory engine · Over time · Privacy.
- All CTAs route to `#waitlist` (switching to landing mode first if in workspace).

---

## 6. Component Notes

### Navbar (`Navbar.tsx`)
- Fixed top; transparent until `scrollY > 20`, then `bg-[#0b0a12]/85` + blur + hairline border.
- Brand: pulsing purple dot in a frosted circle + "MEMORY ENGINE / WORLD MODEL v1.0".
- CTA: frosted "Join the waitlist" pill.

### Hero (`HeroSection.tsx`) — **V1 version, retained**
- Heritage: this is the original V1 hero, deliberately kept as the opening statement.
- Top padding `pt-44 md:pt-60` — generous negative space so the quote is the focal point.
- Copy is centered (`text-center`, `max-w-4xl mx-auto`).
- Headline: `Your life isn't made of conversations. It's made of context.` — Geist light, with the accent **Newsreader 600 italic in the purple gradient** (`font-v1-serif italic font-semibold text-gradient-purple`).
- Subtitle: "AI remembers chats. We remember your world…" (white/60).
- Single CTA: white glow pill "Join the Waitlist".
- Below: `LivingWorldModelCanvas` (interactive world-graph).
- Explicitly **removed** per product decision: the "Introducing The World's First Personal Memory Engine" pill and the "Private & Encrypted • Founding Access Only" status line.

### Living World Model Canvas (`LivingWorldModelCanvas.tsx`)
- Frosted panel + quiet grid backdrop.
- Status line: pulsing emerald dot + "MEMORY ENGINE · CONNECTED MEMORY" chip; right side "7 Active Clusters · 1,420 Linked Context Nodes".
- 6 interactive nodes (Priya, lunch memo, Oct 14 diary, mom call, career, mom) with SVG connection lines; active/connected lines highlight purple.
- Inspector card (bottom-left) shows category chip, timestamp, snippet.
- Hover/click a node to switch context.

### Section pattern (WhatItDoes, EventsContext, MemoryEngineSection, CompoundingMemory, Privacy)
- `py-24 md:py-36`, `border-t border-white/[0.06]` section dividers.
- Eyebrow: `text-xs font-mono uppercase tracking-widest text-amber-300/80` (or purple).
- Title: `text-3xl sm:text-5xl font-light` with a `font-serif italic` gradient/amber accent span.
- Cards: `panel-quiet` / `glass-pill`, hairline dividers.

### Waitlist (`WaitlistSection.tsx`)
- `#waitlist`, centered; "Founding Access" chip; amber accents.
- Form → success state shows a confirmation with the submitted email.

### Workspace (`ProductWorkspace.tsx`)
- Full product demo view: voice capture (pulsing mic), live transcript with self-correction strikethrough, daily compilation, mood tracking, connected entities sidebar.

### Footer (`Footer.tsx`)
- Quiet mono footer: status line (emerald dot, "Memory Engine v1.0"), section links, copyright.

---

## 7. Motion

- **Framer Motion** for all entrance animations: fade + translate (`opacity 0, y 16–20`), staggered delays (0.1–0.4s).
- Mic visual uses pure CSS pulse rings (`.animate-pulse-slow`, `.animate-pulse-slower`).
- View transitions between landing/workspace rely on conditional render (no shared layout animation).

---

## 8. Decision Log

| Date | Decision |
| --- | --- |
| v6 | Page restructured into the 6-section narrative (What It Does → Privacy) + workspace mode |
| Post-v6 | Global fonts set to Inter / Instrument Serif / Geist Mono |
| Post-v6 | Hero reverted to the **V1 version**: original quote, Geist + Newsreader fonts, more top padding (`pt-44 md:pt-60`), centered, gradient accent bolded (600) |
| Post-v6 | Removed hero pill ("Introducing The World's First Personal Memory Engine") and status line ("Private & Encrypted · Founding Access Only") |
| Post-v6 | Headline line-height relaxed `1.08 → 1.15` to stop italic serif glyph clipping |
| Post-v6 | Waitlist section rebuilt to match Stitch project "Waitlist Coming Soon Landing Page" (screen `7358ff`): near-black `#020202` bg, centered amber glow sphere behind headline, mono amber accent lines, darkened glass pill form, microcopy + hairline bottom strip. Form logic, copy, and `id="waitlist"` preserved |

---

## 9. Do / Don't

- DO keep the hero as the single focal point — it stays the V1 version.
- DO use `panel-quiet`/`glass-pill` over solid borders.
- DON'T add more glow or gradient text beyond the hero accent and active states.
- DON'T reintroduce the removed hero elements (pill, status line).
- DON'T restyle the hero fonts — Geist + Newsreader are intentional there.
