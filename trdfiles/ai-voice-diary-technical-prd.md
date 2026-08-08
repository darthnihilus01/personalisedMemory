# Technical PRD — AI Voice Diary with Memory Brain
### End-to-end build spec: capture → correction → compilation → memory graph → recall

---

## 0. Product Philosophy

**Minimal yet sophisticated.** The user-facing surface should feel like almost nothing — a mic button and a page. All the sophistication (entity resolution, correction, graph construction, retrieval) happens invisibly behind that. This principle should drive every design decision below: if a feature requires the user to configure, tag, or organize anything manually, it has failed the philosophy and needs to move behind the scenes.

**Design north star for the "Memory Brain":** Obsidian's graph view — nodes and edges, force-directed layout, click a node to zoom into what it's connected to — but populated automatically from voice, not manually from linked notes.

---

## 1. System Overview

```
┌─────────────┐      ┌──────────────────┐      ┌────────────────────┐
│  Mobile App │─────▶│   API Gateway /   │─────▶│  Ingestion Service  │
│ (capture UI,│◀─────│   Auth Service    │◀─────│ (ASR + correction)  │
│ graph view, │      └──────────────────┘      └──────────┬──────────┘
│ chat)       │                                            │
└─────────────┘                                            ▼
                                                  ┌────────────────────┐
                                                  │  Entity Extraction  │
                                                  │  & Linking Service  │
                                                  └──────────┬──────────┘
                                                             ▼
                              ┌──────────────────────────────────────────────┐
                              │                Data Layer                     │
                              │  Postgres (core)  │ Graph store │ Vector DB   │
                              └──────────────────────────────────────────────┘
                                                             ▲
                              ┌──────────────────────────────┘
                              │
                     ┌────────────────────┐      ┌────────────────────┐
                     │ Compilation Service │      │  Retrieval/RAG      │
                     │ (nightly, per user) │      │  Service (chat,     │
                     └────────────────────┘      │  person/group search)│
                                                  └────────────────────┘
```

**Core services:**
1. **Ingestion Service** — receives raw audio, runs ASR, runs live self-correction
2. **Entity Extraction & Linking Service** — pulls people/places/events out of corrected text, resolves them to persistent entities
3. **Compilation Service** — merges a day's fragments into one styled diary entry (batch, end-of-day)
4. **Retrieval/RAG Service** — powers person search, group search, and "talk to your diary"
5. **Emotion Service** — infers/stores mood signal per fragment and per day
6. **Graph Service** — maintains the node/edge graph and serves it to the client's graph-view renderer

---

## 2. Data Model

### 2.1 Core relational schema (Postgres)

```sql
-- Users
users (
  id UUID PRIMARY KEY,
  created_at TIMESTAMPTZ,
  writing_style_profile JSONB,   -- learned tone/vocabulary fingerprint
  encryption_key_id TEXT          -- reference to per-user key in KMS
)

-- Raw voice fragments (the atomic unit of capture)
fragments (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  captured_at TIMESTAMPTZ,
  audio_uri TEXT,                 -- encrypted blob storage reference
  raw_transcript TEXT,            -- literal ASR output
  corrected_text TEXT,            -- after self-correction pass
  day_id UUID REFERENCES days(id),
  mood_score FLOAT,               -- -1.0 to 1.0, inferred
  mood_label TEXT,                -- e.g. "content", "stressed"
  processing_status TEXT          -- queued/corrected/tagged/compiled
)

-- One row per calendar day per user
days (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  date DATE,
  compiled_entry TEXT,            -- final diary page
  compiled_at TIMESTAMPTZ,
  overall_mood_score FLOAT,
  closing_note_fragment_id UUID
)

-- Canonical entities (people, places, groups/events) — deduplicated
entities (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type TEXT,                      -- 'person' | 'place' | 'event' | 'group'
  canonical_name TEXT,
  aliases TEXT[],                 -- ["A", "Amit", "amit from work"]
  first_mentioned_at TIMESTAMPTZ,
  last_mentioned_at TIMESTAMPTZ,
  mention_count INT,
  metadata JSONB                  -- e.g. relationship type, notes
)

-- Many-to-many: which fragments mention which entities
fragment_entities (
  fragment_id UUID REFERENCES fragments(id),
  entity_id UUID REFERENCES entities(id),
  confidence FLOAT,
  PRIMARY KEY (fragment_id, entity_id)
)

-- Entity-to-entity relationships (for the graph)
entity_edges (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  source_entity_id UUID REFERENCES entities(id),
  target_entity_id UUID REFERENCES entities(id),
  relationship_type TEXT,         -- 'co_occurred' | 'member_of_group' | 'related_event'
  weight INT,                     -- co-occurrence count, drives edge thickness in graph
  last_updated TIMESTAMPTZ
)
```

### 2.2 Vector store (per-user namespace)
Each fragment and each compiled day gets an embedding, stored with metadata (entity IDs, date, mood) for hybrid semantic + filtered search. Use a namespace-per-user pattern so no query can ever cross user boundaries even at the infra level (defense in depth, not just app-level access control).

### 2.3 Graph store
Two viable approaches — pick based on team size and existing infra:
- **Option A (recommended for MVP):** model the graph *inside* Postgres using the `entities` + `entity_edges` tables above; serve graph queries via recursive CTEs. Simpler ops, no new database to run.
- **Option B (if graph queries become a bottleneck):** migrate to a dedicated graph database (e.g., Neo4j) once per-user graphs regularly exceed a few thousand nodes/edges and traversal queries slow down. Don't start here — it's premature complexity for MVP scale.

---

## 3. AI Pipeline — Step by Step

### 3.1 Capture & ASR
- **On-device ASR** (e.g., a local Whisper-family model) is strongly preferred over cloud streaming ASR for two reasons: (1) latency — correction needs to feel instant, (2) privacy — raw voice audio is the most sensitive data in this product, and never sending it off-device is both a real safeguard and a marketing point.
- Stream partial transcripts to the correction step so the user sees near-real-time text.

### 3.2 Live self-correction pass
- Runs on the corrected-so-far text, triggered on pause detection or explicit "done" action.
- Prompted LLM task: *"Given this raw transcript of someone talking about their day, resolve self-corrections (e.g. 'B — sorry, C' → 'C'), remove filler/false starts, and output clean first-person text. Do not add any information not present in the transcript."*
- Critical constraint: this step must be **hallucination-free** — it can only remove/resolve, never invent. Validate with automated tests that compare entity sets before/after (no new entities should appear).
- Output: `corrected_text` stored alongside `raw_transcript` (keep both — raw is useful for debugging correction quality and for user trust/audit if they ever ask "what did I actually say").

### 3.3 Entity extraction & linking
- Run NER (named entity recognition) over `corrected_text` for PERSON, LOCATION, EVENT/GROUP-like nouns.
- **Entity resolution problem (the hardest part of this system):** "Marcus" mentioned today needs to resolve to the *same* `entities` row as "Marcus" mentioned three months ago, and *not* collide with a different Marcus. Approach:
  1. Fuzzy-match new mentions against the user's existing entity list (name + alias similarity).
  2. If ambiguous (e.g., two known Marcuses), use context signals — co-occurring entities, recent conversation topics — to disambiguate; the model should default to asking a single lightweight confirmation ("Which Marcus — Marcus from work or Marcus your brother?") only when confidence is low, not every time.
  3. New entities are created only when no reasonable match exists.
- Write rows to `fragment_entities` and update `entity_edges` (increment co-occurrence weight for every pair of entities mentioned in the same fragment).

### 3.4 Group/event detection
"Groups" (e.g., "the product launch," "book club") are entities of type `event`/`group` formed one of two ways:
- **Explicit mention:** the user names it ("the launch," "book club") — treat as a named entity like a person.
- **Implicit clustering:** repeated co-occurrence of the same 3+ people across multiple fragments/days, without an explicit name, can be surfaced as a suggested group ("You've mentioned Marcus, Priya, and Dev together 4 times this month — want to name this?") — optional, since philosophy says avoid manual work, so this should default to just being an unnamed but still-queryable cluster in the graph rather than force naming.

### 3.5 Emotion inference
- **Text-based (baseline, ship first):** sentiment/emotion classification on `corrected_text` per fragment, plus an optional single-tap self-report ("how are you feeling?" 1–5 or emoji) that always overrides the inferred signal when present.
- **Voice-prosody-based (v2 enhancement):** pitch, pace, and energy features from the raw audio can improve emotion accuracy beyond text alone — treat as an enhancement layer, not a dependency, since text-based sentiment alone is enough to ship a genuinely useful mood timeline.
- Store both per-fragment `mood_score` and a rolled-up `days.overall_mood_score`.

### 3.6 End-of-day compilation
- Batch job, runs per user at a configurable local time (default: a few hours after last activity, or on next app open).
- Input: all of that day's `corrected_text` fragments, in order, plus the writing-style profile.
- Prompted LLM task: *"Merge these fragments into one first-person diary entry for the day. Preserve the user's own vocabulary and tone. Do not add reflection or content the user didn't say."*
- **Writing style profile:** built over time from the user's own corrected text — vocabulary, sentence length, typical phrasing — used to bias the compilation prompt so entries increasingly read as "written by them," not generic AI prose. This should be revisited/refreshed periodically (e.g., monthly) as more data accumulates.

### 3.7 Retrieval / RAG for search & chat
- **Person search:** resolve query → `entity_id` → join `fragment_entities` + `days` → return all fragments/entries mentioning that entity, chronologically, each with enough surrounding context to be readable standalone.
- **Group search:** same pattern, but entity type = group/event; additionally fan out to member entities so a group search also surfaces "who else was involved."
- **Conversational query ("talk to your diary"):** hybrid retrieval — vector similarity search over the query, filtered/boosted by any entities detected in the query itself (e.g., a date range or person name mentioned) — top-k relevant fragments/entries are passed as context to the LLM, which answers **only from that retrieved content**, with the same anti-hallucination constraint as the correction step. Always show which entries were used to answer (source transparency — critical for trust in a memory product).

---

## 4. The "Memory Brain" — Graph View

This is the signature, differentiating UI surface — build it deliberately.

**Nodes:**
- Person entities (sized by mention count)
- Group/event entities (visually distinct shape/color)
- Optionally: day/entry nodes, if the user wants to see entries themselves in the graph, not just people

**Edges:**
- Co-occurrence between two people (weight = how often mentioned together → thicker edge)
- Membership edges (person → group)
- Weighted by recency as well as frequency, so the graph visually reflects *current* life, not just historical volume (a heavy edge from two years ago with a person who's since disappeared from entries should visibly fade)

**Interaction model (mirroring Obsidian):**
- Force-directed layout, real-time physics, draggable nodes
- Click a node → side panel opens with all linked memories (same result as running a person/group search)
- Hover → preview of most recent mention
- Filter controls: time range, entity type, minimum edge weight (to declutter a graph that will get large over years of use)
- Zoom levels: whole-life graph → time-windowed graph (e.g., "this year") → single-entity local graph (just that person and their direct connections)

**Rendering tech:** a force-directed graph library (e.g., `d3-force` or `react-force-graph`) on the client, fed by a graph query endpoint that returns nodes + edges for the current filter state — do not attempt to render a user's entire multi-year graph unfiltered on first load; page/filter by default (e.g., last 90 days) and let the user expand.

**Performance note:** cap the default rendered graph to a few hundred nodes; beyond that, force-directed layouts get visually unreadable and slow regardless of backend performance — this is a UX constraint as much as a technical one.

---

## 5. Search Architecture Summary

| Search type | Trigger | Resolution path | Output |
|---|---|---|---|
| Person search | User taps/searches a name | Fuzzy match → entity_id → fragment_entities join | Chronological list of all mentions, each with context |
| Group search | User searches an event/group name | Entity resolution (type=group) → fan out to member entities | Timeline of the event/group + who was involved |
| Semantic/topic search | Free-text query, no clear entity | Vector similarity over embeddings | Ranked relevant fragments/entries |
| Conversational query | Natural-language question to the diary | Hybrid: entity extraction on query + vector retrieval → LLM synthesis over retrieved content only | Direct answer + cited source entries |

---

## 6. API Surface (representative, not exhaustive)

```
POST   /v1/fragments                 — upload audio, triggers ASR + correction pipeline
GET    /v1/fragments/:id
GET    /v1/days/:date                — compiled entry for a given day
POST   /v1/days/:date/compile        — manual trigger (normally automatic)

GET    /v1/entities                  — list all entities (people/places/groups)
GET    /v1/entities/:id/memories     — all fragments/entries linked to an entity (person or group search)
GET    /v1/entities/:id/graph        — local graph (node + its edges) for that entity

GET    /v1/graph?range=90d&min_weight=2   — full filtered graph for the Memory Brain view

POST   /v1/chat                      — conversational query against the user's own diary
GET    /v1/mood/timeline?range=1y    — emotion time series for visualization
```

All endpoints scoped strictly by authenticated `user_id`; no cross-user query paths should exist even internally.

---

## 7. Privacy & Security Architecture

Given the sensitivity of this data, this section is not optional polish — treat it as a first-class requirement from day one, not a v2 add-on.

- **Encryption at rest:** per-user encryption keys (via a KMS), audio blobs and text content both encrypted; keys never leave the KMS boundary unencrypted.
- **On-device processing where feasible:** ASR and even the correction pass are strong candidates for on-device/local model execution, minimizing raw audio ever touching a server. This is both a privacy win and a latency win.
- **No training on user data, by default and stated clearly.** This is a trust-critical claim in this category — make it a real architectural constraint (data pipelines that feed any model fine-tuning must explicitly exclude user content), not just a policy statement.
- **Deletion:** hard-delete (not soft-delete) on user request, cascading through fragments, entities, edges, embeddings, and audio blobs — test this path explicitly, since partial deletion (e.g., forgetting to purge vector store entries) is a common real-world failure.
- **Sensitive-entity handling:** deceased or estranged people remain in the graph by default (the memory is real and valuable) but the user should be able to mute/archive an entity — this hides it from proactive surfacing (like graph highlights or "on this day") without deleting the underlying memories, since those two needs (don't want to be reminded vs. don't want it gone) are different.

---

## 8. Tech Stack Recommendation

| Layer | Recommendation | Why |
|---|---|---|
| Mobile client | React Native (or Flutter) | Cross-platform, faster iteration for a small early team; native audio capture module either way |
| Graph rendering | `react-force-graph` / `d3-force` | Mature, matches the Obsidian-style interaction model |
| Backend services | Node.js or Python (FastAPI) microservices | Either is fine; Python has an edge if the team is doing custom ML work beyond API calls |
| Core DB | Postgres | Handles relational data + can host the graph model early (via `entity_edges`) without a separate graph DB |
| Vector store | `pgvector` (inside Postgres) for MVP; migrate to a dedicated vector DB (Qdrant/Weaviate/Pinecone) if query volume/latency demands it | Avoid running a second database until scale actually requires it |
| ASR | On-device Whisper-family model (or platform-native ASR as fallback) | Latency + privacy |
| LLM (correction, compilation, RAG synthesis) | API-based frontier model (Claude or GPT family) via provider API | Building this from scratch is not the differentiator — the pipeline design and data model are |
| Audio storage | Encrypted object storage (e.g., S3-compatible) with per-user key | Standard, scalable |
| Infra | Managed cloud (AWS/GCP), containerized services, queue (e.g., SQS/Redis) between ingestion → extraction → compilation stages | Keeps the pipeline resilient to spikes (e.g., many fragments at once) |

---

## 9. Build Phases

**Phase 0 — Infra foundation**
Auth, encrypted storage, core Postgres schema, CI/CD, KMS setup.

**Phase 1 — Capture & compile (MVP)**
Voice capture → ASR → self-correction → fragment storage → end-of-day compilation. No entity graph yet. Goal: validate that correction and compilation quality alone are good enough that people want to keep using it.

**Phase 2 — Entity layer**
NER + entity resolution + `fragment_entities`/`entity_edges` population. Ship basic person search (list view, not graph yet).

**Phase 3 — Memory Brain graph view**
Graph query endpoint + force-directed rendering client-side. This is the flagship differentiating screen — budget real design time here, not just engineering time.

**Phase 4 — Emotion system**
Text-based mood inference, mood timeline visualization, linkage between mood and entities/days in the graph (e.g., color nodes by associated sentiment).

**Phase 5 — Conversational recall**
RAG pipeline for "talk to your diary," with source-citation UI so answers are always traceable back to real entries.

**Phase 6 — Social layer**
Friends, consent-gated shared-memory cross-referencing — deliberately last, since it introduces a whole additional privacy/consent surface that shouldn't be rushed.

---

## 10. Key Technical Risks

| Risk | Why it matters | Mitigation |
|---|---|---|
| Entity resolution errors (merging two different people, or splitting one person into two entities) | Directly breaks the core "search by person" promise — the product's core value | Conservative auto-merge thresholds; lightweight disambiguation prompts only when confidence is low; let users manually merge/split entities as a fallback |
| Correction/compilation hallucination | A diary that adds things you didn't say is worse than no diary — this is a trust-destroying failure mode | Constrain prompts explicitly against invention; automated entity-set diffing between raw and corrected/compiled text as a regression test in CI |
| Graph unreadability at scale | Years of daily use could produce thousands of entities/edges | Default time-windowed views, edge-weight filtering, node caps, "local graph" zoom as the primary interaction rather than whole-life view |
| Per-user AI cost | Multiple LLM calls per day per user (correction, extraction, compilation, RAG) adds up fast at scale | Batch where possible (e.g., single compilation call per day, not per fragment); consider smaller/cheaper models for extraction and correction, reserving frontier models for compilation and conversational synthesis |
| Latency of live correction | If correction feels slow, it breaks the "just talk" mental model | On-device or edge-hosted small models for the correction pass, not a round-trip to a large frontier model on every fragment |

---

## 11. Success Metrics (Technical Layer)

- **Correction accuracy:** % of fragments requiring no manual user edit
- **Entity resolution precision/recall:** manually audited sample, tracking false-merge and false-split rates
- **Compilation latency:** time from last fragment to compiled entry availability
- **Graph query latency:** p95 response time for `/v1/graph` at realistic multi-year data volumes
- **RAG answer groundedness:** % of conversational answers where every claim traces to a cited source entry (this should be near 100%; anything less is a hallucination problem to fix immediately)

---

## 12. Summary

The hard engineering problems here are not the AI calls themselves (correction, extraction, compilation, RAG are all well-understood LLM patterns) — they're **entity resolution at the identity level** and **making a growing personal knowledge graph stay fast, readable, and trustworthy over years of daily use**. Budget engineering time accordingly: the flashy graph view is worth investing in, but the unglamorous entity-resolution and anti-hallucination guardrails underneath it are what will actually make or break whether this product is trusted enough to become someone's real memory.
