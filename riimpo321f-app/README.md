# Site 7: Northlink Subdivision
### An interactive gamified learning module for RIIMPO321F — Conduct civil construction wheeled front end loader operations

A single-file HTML5 learning application. No build step, no dependencies, no server-side code. Drop it on GitHub Pages and it runs.

---

## Deploying to GitHub Pages

1. Create a new repository (public, or private on a plan that supports Pages).
2. Upload `index.html` and `.nojekyll` to the repository root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
5. Save. Your module will be live at `https://<username>.github.io/<repo>/` within a minute or two.

The `.nojekyll` file stops GitHub's Jekyll processor from interfering. It's empty by design — keep it.

### Alternative hosting

Because the whole module is one self-contained file, it also works from:

- Netlify Drop, Cloudflare Pages, Vercel — drag and drop
- A network share or USB stick — double-click `index.html`
- An LMS file resource (Moodle, Canvas, aXcelerate) — upload as a single HTML file and link to it

It does **not** need to be a SCORM package to work, but see *SCORM and tracking* below.

---

## What's in the module

Six "shifts" on a fictional civil construction site — a 42-lot residential subdivision. The learner is a new loader operator working toward sign-off.

| Shift | Title | Focus | Badge |
|---|---|---|---|
| 1 | The Pre-Shift Briefing | Planning, work information, hazards, services, PPE | 🗺️ The Planner |
| 2 | Cab Familiarisation | Machine components, controls, instruments, alerts | 🕹️ Cab Rat |
| 3 | The Walk-Around | Pre-start inspection, defect triage, isolation, functional tests | 🔍 Eagle Eye |
| 4 | The Production Shift | Start-up, loading, truck loading, trimming, backfill | ⚙️ Smooth Operator |
| 5 | The Wobble | Stability, centre of gravity, danger zones, emergencies | ⚖️ Steady Hand |
| 6 | Knock-Off | Shutdown, operator maintenance, records, housekeeping | 📋 Paperwork Pro |

Plus two achievement badges: **💎 Flawless Pass** (clear any shift with every call correct first-try) and **🎖️ Sign-Off** (all six shifts cleared).

**55 screens · 48 graded activities · 956 XP available · 4 operator ranks**

---

## The gamification design

Structural gamification (the wrapper) and content gamification (the activities themselves) are both used, and they do different jobs.

**Structural — motivation and persistence**

- **XP with a first-attempt premium.** Full points for a clean call; roughly 40–45% for a correct answer after a miss. Failure costs points, never progress. There is no lockout and no "you failed, start again."
- **Sequential unlocking.** Each shift unlocks the next. Progression is visible and the path is unambiguous.
- **Badges tied to competency areas**, not to activity volume. Each badge names the element it represents.
- **Ranks** (Trainee → Operator → Senior Op → Leading Hand) give a long-arc goal above the shift-by-shift one.
- **Debrief after every shift** — score ring, first-try count, and a call-by-call review so the learner can see exactly where judgement slipped.

**Content — the learning actually happens here**

Eight distinct interaction types, chosen so the mechanic matches the cognitive task:

| Type | Used for | Why this mechanic |
|---|---|---|
| Decision call (MCQ) | Judgement under site pressure | Distractors are plausible operator reasoning, not obvious wrong answers |
| Select-all | Recognition across a set | Forces discrimination, not elimination |
| Sequence | Procedures | Order *is* the knowledge; a list of steps you can reorder tests it directly |
| Sort into bins | Categorisation and triage | Makes the decision rule explicit rather than memorised |
| Match pairs | Control-to-function knowledge | Fast, low-stakes retrieval practice |
| Diagram hotspot | Spatial component and hazard knowledge | You cannot fake knowing where something is |
| Branching scenario | Consequence of a chain of decisions | The second decision depends on the first — this is where transfer happens |
| Timed hazard hunt | Take 5 / point-of-work risk assessment | Time pressure is part of the real task; false calls are penalised |

**Feedback design.** Every response — right or wrong — returns a *why*, written in operator voice. Wrong answers explain the specific failure mode rather than saying "incorrect." Scenarios end in named outcomes (*Outcome: controlled*, *Outcome: fatality risk*) with the reasoning attached, and bad endings offer a replay.

---

## Instructional design notes

**Context.** All content has been recontextualised from mining/quarrying to civil construction: design levels and survey control, BYDA and service location, trench backfill and zone of influence, sediment and stormwater controls, public interface, ITP hold points, traffic management. The civil-specific framing is called out in amber callouts throughout, and a site glossary is available from the shift board.

**Deliberate omissions.** Numbers that vary by jurisdiction, voltage, machine or SWMS are *not* asserted as facts. Overhead line clearance distances, trench standoffs beyond the general dump rule, and tyre pressures are all handled as "get it from the authority that sets it." One activity is built specifically around not estimating an overhead clearance.

**Accessibility.** Semantic buttons throughout (keyboard-reachable and screen-reader announceable), visible focus behaviour, `prefers-reduced-motion` honoured, responsive from 320 px up, and no colour-only status signalling — every state carries an icon or text label as well as colour. Full WCAG 2.1 AA conformance has not been formally audited; a review pass is recommended before publishing to a public sector or university audience.

---

## Assessment status — read this before deploying

This module is **formative**. It is designed for practice and knowledge-building, and it deliberately does not claim to produce assessment evidence.

- No score gate, no pass mark, no attempt limit.
- Progress is stored in the learner's own browser (`localStorage`) and is not transmitted anywhere.
- The printable progress summary is labelled as a formative record.
- Competency for RIIMPO321F is determined by the RTO through the unit's theory assessment and supervised practical assessment under the unit's assessment conditions, including the repeated occurrences of performance the unit requires.

That framing is stated on the start screen, in the progress summary, and at program completion. **Do not remove it** without deciding deliberately what you're replacing it with.

### Unit mapping

The in-app **Unit alignment** panel shows an indicative shift-to-element map, and individual activities carry indicative PC references. These are **design aids, not a mapping document.** Before this module is used in a scope application or an audit context:

1. Verify element and performance criteria numbering against the current release of RIIMPO321F on training.gov.au.
2. Map each activity to specific PCs, knowledge evidence and performance evidence in the RTO's formal mapping tool.
3. Confirm the module's role is documented as *learning resource*, not *assessment tool*.

The activity IDs (`s1q1`, `s4q5`, and so on) are stable and are designed to be referenced directly from a mapping spreadsheet.

---

## SCORM and tracking

Out of the box the module reports nothing to an LMS — by design, given its formative status.

If tracking is later required, the cleanest options are:

- **Wrap as SCORM 1.2/2004** using a wrapper library, and call `LMSSetValue` from the existing `record()` function in the engine — it is the single point where every result passes through.
- **xAPI statements** from the same function, sending `answered`/`completed` statements to an LRS.
- **Keep it untracked** and use the printable summary as a self-report artefact.

All three are viable. Adding tracking changes the compliance conversation, so decide the assessment status first and the technology second.

---

## Editing the content

Everything a subject matter expert needs to change lives in one place: the `window.COURSE_DATA` array in the first `<script>` block. Each shift is an object; each activity is an object inside its `items` array. Nothing in the engine needs touching to add, remove or reword an activity.

To add an activity, copy an existing one of the same `type`, give it a new unique `id`, and drop it into the right shift's `items` array. XP totals, progress bars, badge logic and the debrief all recalculate automatically.

The two SVG diagrams live in `window.SVG_DATA`. Hotspot regions are `<g class="hs" data-hs="...">` elements; the `data-hs` value is what activities reference by `id`.

---

## Credits

Instructional design approach follows Karl Kapp's framework for the gamification of learning and instruction — the distinction between structural and content gamification, feedback as the engine of learning, and failure as iteration rather than punishment.

Source content adapted and recontextualised from the RIIMPO304E *Conduct wheel loader operations* presentation, per the Happy Bear Consulting RIIMPO321F Civil Loader Package Alignment Proposal (Stage 3: Learning Material Uplift).

Prepared for MyneSight Pty Ltd.
