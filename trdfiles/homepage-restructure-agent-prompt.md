# Agent Prompt — Homepage Restructure

Paste directly to your coding agent in the `personalisedMemory` repo.

---

## Context

Rebuild the homepage into a minimal, linear flow. Replace the current multi-section abstract narrative (`ScrollStory.tsx`, `PhilosophySection.tsx`, the current `FutureQuestions.tsx` copy, `TechArchitecture.tsx`, `ManifestoModal.tsx`) with the five-section structure below, in this exact order. Keep the existing dark theme, glassmorphism, and animation system — this is a structural and copy rebuild, not a visual one. Keep `WaitlistSection.tsx` as the final conversion CTA after the new Privacy section.

Every section must explain itself through a real, specific example — never through an abstract claim on its own. No section should require the reader to already understand the product to make sense of it.

**Ban list — do not use any of this language anywhere on the page:** "unlock," "seamless," "seamlessly," "revolutionize," "elevate," "empower," "harness," "cutting-edge," "effortless," "game-changer," "next-level," "transform your life," "supercharge," or any sentence that could be copy-pasted onto a random SaaS landing page without changes. If a sentence doesn't reference this specific product doing this specific thing, cut it. Prefer short, plain, concrete sentences over long ones with adjectives stacked on.

---

## Section 1 — Hero

Tagline (use exactly):
> "Talk. It remembers."

Supporting line (use exactly):
> "A personal memory journal that captures your life as you live it and structurally maps it — so you can reflect on your decisions and see how you've evolved."

Minimal: tagline, the one supporting line above, mic-button visual, CTA to scroll or try. No stat badges, no extra taglines stacked underneath.

---

## Section 2 — What It Does (Purpose)

Show, don't claim. Lead with one real voice-note example, presented as if being spoken/transcribed live:

> "Hey journal — today I hosted a get-together with my friends. It was really fun, we hadn't all been in the same room in months."

Directly underneath, one short, plain line stating what happens to it — no feature list, no jargon:
> "You talk. It gets cleaned up, saved, and added to your memory journal — automatically."

That's the entire section. No third example, no extra explanation paragraph.

---

## Section 3 — Incidents (interactive, left list → detail → compiled day)

Build this as a two-panel interactive layout.

**Left panel — a list of 4 voice-note incidents from one day, in plain first-person memory journal voice (not mundane, not vague):**
1. "Hosted a get-together with my friends"
2. "Lunch with Priya — she's finally quitting her job"
3. "Rough call with my manager about the deadline"
4. "End of day, winding down"

**On click — right panel shows that incident's detail:** the raw spoken version (including a natural mid-sentence correction) transforming into the cleaned version. Use incident 2 as the example with a correction baked in:
- Raw (shown with the corrected word struck through): ~~"Had lunch with Sarah"~~ "— sorry, I mean Priya — she told me she's finally quitting her job."
- Cleaned: "Had lunch with Priya — she told me she's finally quitting her job."

**After all 4 incidents are shown (or via a persistent "See the full day" control) — reveal the compiled result:** the actual memory journal page for that day, assembled from all 4 incidents, written as one coherent first-person entry:

> "Today I hosted a get-together with my friends — it was really fun, we hadn't all been in the same room in months. Had lunch with Priya, and she told me she's finally quitting her job. Later, I had a rough call with my manager about the deadline. Overall a full day — good to wind down by the end of it."

This reveal is the point of the section: several small, messy, real moments become one clean page, automatically. Make this transition (list → detail → compiled page) the visual centerpiece of the section.

---

## Section 4 — The Brain

Plain-language explanation, one example, one visual (the existing graph/force-directed visualization can be reused here).

Copy:
> "Every person, place, and event you mention gets connected automatically — you never tag or organize anything. Search a name and see everything you've ever said involving them, in order."

Example directly under it:
> "Search 'Priya' → every lunch, every mention, every conversation involving her — as far back as you've been using it."

No mention of internal technical terms (entity resolution, graph physics, etc.) — describe the effect, not the mechanism.

---

## Section 5 — Privacy

Direct, plain statements — no "privacy as physics" framing, no abstract manifesto language. State exactly what happens to the user's data:

> "Your voice never leaves your device unless you choose to sync. Everything is encrypted. Nothing you say is ever used to train any model. You can delete anything, anytime — permanently."

Optionally one line on sensitive content:
> "Don't want to be reminded of someone right now? Mute them. Your memories stay — they just stop showing up until you're ready."

Keep this section short — a handful of direct sentences, not a manifesto.

---

## Then — Waitlist

Keep `WaitlistSection.tsx` immediately after Privacy, unchanged in function.

---

## Final check before shipping

Read the full page top to bottom and remove any sentence that:
- Uses a word from the ban list above
- Makes a claim without a concrete example attached in the same section
- Could be describing literally any other AI product
