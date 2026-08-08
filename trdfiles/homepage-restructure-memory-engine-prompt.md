# Agent Prompt — Homepage Restructure

Paste directly to your coding agent in the `personalisedMemory` repo.

---

## Context

Rebuild the homepage around the **Personal Memory Engine** concept we have defined.

This is **not an AI journal** and should not be presented as one.

The product is a personal memory system that turns fragmented observations from a person's life into a continuously evolving understanding of their world: people, relationships, events, projects, decisions, goals, and how those things change over time.

The core promise is:

> **Never lose the thread of your life.**

Voice is the first and lowest-friction capture interface, but voice is **not the product category**. The product is the memory engine behind it.

Replace the current multi-section abstract narrative (`ScrollStory.tsx`, `PhilosophySection.tsx`, the current `FutureQuestions.tsx` copy, `TechArchitecture.tsx`, `ManifestoModal.tsx`) with the five-section structure below, in this exact order.

Keep the existing dark theme, glassmorphism, and animation system unless a change is necessary to make the new product positioning coherent. This is primarily a structural and copy rebuild, not a wholesale visual redesign.

Keep `WaitlistSection.tsx` as the final conversion CTA after the new Privacy section.

The homepage must make the product understandable without requiring the visitor to know what a "memory graph", "world model", "RAG", or "entity resolution" system is.

### Core product model

The homepage should communicate this progression:

```text
Fragments
   ↓
Observations
   ↓
Events
   ↓
People + Relationships + Projects + Goals
   ↓
Context over time
   ↓
A living model of your life
```

Do not present this as a technical pipeline. Use it as the conceptual foundation for the copy and interactions.

Every section must explain itself through a real, specific example — never through an abstract claim on its own.

No section should require the reader to already understand the product to make sense of it.

### Ban list

Do not use any of this language anywhere on the page:

"unlock," "seamless," "seamlessly," "revolutionize," "elevate," "empower," "harness," "cutting-edge," "effortless," "game-changer," "next-level," "transform your life," "supercharge," "AI-powered," "second brain," "knowledge management," "productivity platform."

Also avoid any sentence that could be copy-pasted onto a random SaaS landing page without changes.

If a sentence does not describe this specific product doing something specific for a person's memory or context, cut it.

Prefer short, plain, concrete sentences over long ones with adjectives stacked on.

---

## Section 1 — Hero

The hero should immediately communicate the emotional benefit rather than explaining the technology.

### Tagline

Use:

> **"Never lose the thread of your life."**

### Supporting line

Use:

> **"A personal memory engine that connects the people, moments, decisions, and stories that make up your life — so you never have to reconstruct the context again."**

### CTA

Primary CTA:

> **"Join the waitlist"**

Minimal hero:

- headline
- one supporting line
- subtle microphone / memory visual
- waitlist CTA
- no stat badges
- no feature grid
- no stacked taglines

### Hero visual

The visual should communicate:

```text
small fragments
      ↓
connections forming
      ↓
a coherent living memory
```

Do not make this look like a technical graph.

It should feel organic, personal, and quietly intelligent.

---

## Section 2 — What It Does

Show the product rather than explaining it abstractly.

Lead with one real voice-note example, presented as being spoken/transcribed live:

> **"Just got out of a meeting with Marcus. We decided to push the Atlas launch by two weeks. Honestly, I'm relieved."**

Directly underneath, show what the memory engine extracts from that observation:

```text
Marcus
Atlas
Launch
Decision
Relief
```

Then connect it to existing context:

> **"It doesn't just save what you said. It connects it to what you already remember."**

Show a subtle visual connection to:

```text
Marcus
  ↕
Atlas
  ↕
Previous meetings
  ↕
Previous decisions
```

Do not present this as a technical entity-extraction demo.

The visitor should understand:

> "I speak naturally. The system figures out what matters and connects it to the rest of my life."

---

## Section 3 — Events & Context

Build this as a two-panel interactive layout.

This replaces the old "Incidents" / compiled-journal concept.

The purpose of this section is to show that several small observations can become one coherent event and that the system preserves context across time.

### Left panel — observations from one period

Show 4 observations:

1. **"Hosted a get-together with my friends."**
2. **"Lunch with Priya — she's finally quitting her job."**
3. **"Rough call with my manager about the deadline."**
4. **"Finally finished Atlas. Huge relief."**

These should feel like real things a person would say, not fabricated product copy.

### On click — right panel shows the resulting event/context

Use observation 2 as the example.

Raw:

> ~~"Had lunch with Sarah"~~ "— sorry, I mean Priya — she told me she's finally quitting her job."

Cleaned observation:

> **"Had lunch with Priya — she told me she's finally quitting her job."**

Then show how the engine connects this observation to the persistent context for Priya:

```text
PRIYA

First mentioned:
March

Recent conversations:
April
May
June

Current context:
Considering leaving her job

Related event:
Career transition
```

The system should feel like it understands that this is **the same Priya across time**, not four unrelated pieces of text.

### Event / context reveal

After all 4 observations are shown, or through a persistent **"See the bigger picture"** control, reveal the larger context:

```text
TODAY

Friends
    ↓
Priya's career change
    ↓
Work deadline
    ↓
Atlas launch
    ↓
Relief
```

Then a concise synthesis:

> **"Four separate moments. One connected picture of your day."**

This reveal is the visual centerpiece of the section.

The important transformation is:

```text
fragmented observations
        ↓
connected events
        ↓
understood context
```

Do **not** turn this into a generated diary page.

The point is that the engine understands the relationship between moments.

---

## Section 4 — The Memory Engine

This replaces "The Brain."

Use the existing graph / force-directed visualization if it fits, but reposition it as a representation of the **memory engine**, not as the product itself.

### Copy

Use:

> **"Every person, place, event, project, and goal you mention can become part of a connected memory — without you tagging or organizing anything."**

Then:

> **"The longer you use it, the more context it can connect."**

### Example

Show a concrete question:

> **"How has my relationship with Priya changed?"**

Then visually surface:

```text
March
First mentioned

↓

April
Started meeting regularly

↓

June
Priya talked about leaving her job

↓

August
Priya became part of a new project
```

Then show the answer as a synthesis:

> **"Priya started as someone you occasionally mentioned. Over the past six months, you've interacted more often and she has become connected to both your work and personal life."**

The point is not that the system can "search Priya."

The point is that it can reason over **how the relationship evolved**.

### Important

Do not use internal technical terminology such as:

- entity resolution
- graph physics
- embeddings
- vector search
- RAG
- knowledge graph
- graph database

Describe what the user experiences, not how the system is implemented.

---

## Section 5 — Why This Gets Better Over Time

This replaces the old generic philosophy section.

The central idea is **compounding memory**.

Large statement:

> **"It gets more useful the longer you live with it."**

Show a restrained timeline:

```text
Day 1
   ↓
Week 4
   ↓
Month 6
   ↓
Year 2
```

At Day 1:

```text
Marcus
Atlas
Priya
```

At Month 6:

```text
Marcus
 ├── Atlas
 ├── previous decisions
 └── career conversations

Priya
 ├── work
 ├── relationship history
 └── career transition

Atlas
 ├── launch
 ├── delays
 ├── collaborators
 └── decisions
```

At Year 2:

The system can answer questions that require longitudinal context:

> **"What changed most about me this year?"**

> **"Which goals have I quietly abandoned?"**

> **"What decisions shaped my career?"**

> **"What relationships became more important?"**

The visual should communicate that the product is not simply accumulating more notes.

It is accumulating **understanding and context**.

Do not claim magical omniscience.

Do not imply that every inference is correct.

The system should be presented as becoming more useful because it has more grounded context to work with.

---

## Section 6 — Privacy

Direct, plain statements.

This product contains extremely personal information, so trust must be treated as part of the product.

Use:

> **"Your life is yours."**

Then explain plainly:

> **"You choose what enters your memory."**

> **"Your memories are encrypted."**

> **"You can delete what you don't want remembered."**

> **"The system should show where important memories and conclusions came from."**

Do not make unsupported claims about device-only processing, model training, or encryption architecture unless those capabilities are actually implemented.

Do not use abstract manifesto language.

Keep this section short and concrete.

---

## Then — Waitlist

Keep `WaitlistSection.tsx` immediately after Privacy, unchanged in function.

The final CTA should reinforce the emotional promise.

Suggested headline:

> **"Never lose the thread again."**

Supporting line:

> **"Join the waitlist for the Personal Memory Engine."**

CTA:

> **"Join the waitlist"**

---

# Product language rules

Throughout the page, consistently use:

### Prefer

- memory
- context
- moments
- observations
- events
- people
- relationships
- projects
- goals
- decisions
- stories
- connected
- evolving
- understand
- remember
- over time
- your life

### Avoid

- journal
- diary
- entry
- second brain
- knowledge base
- productivity
- AI assistant
- chatbot
- knowledge management
- database
- graph database
- RAG
- embeddings
- "AI-powered"

The user should leave thinking:

> **"This remembers my life and understands how things connect."**

Not:

> **"This is an AI journal with a graph."**

---

# Final check before shipping

Read the full page top to bottom and remove any sentence that:

- Uses a word from the ban list above.
- Calls the product a journal or diary.
- Describes a feature without showing a concrete example.
- Could describe literally any other AI product.
- Makes the memory graph sound like the product itself.
- Implies the system knows something without evidence.
- Uses technical language the visitor does not need.
- Explains the technology more than it explains the user's experience.
- Sounds like generic startup marketing.

The final page should communicate one idea above everything else:

> **Your life is full of disconnected moments. Memory connects them, preserves the context, and helps you understand how your life evolves.**

The product category is:

> **Personal Memory Engine.**

The core promise is:

> **Never lose the thread of your life.**
