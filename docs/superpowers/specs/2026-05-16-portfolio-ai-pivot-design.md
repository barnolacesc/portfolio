# Portfolio AI Pivot — Design Spec

**Date:** 2026-05-16
**Status:** Approved structure, ready for implementation planning
**Author:** Francesc Barnola (via brainstorming session)
**Target codebase:** `portfolio-astro/` (the deployed Astro site)

---

## Context

The current portfolio (Astro + amber/dark editorial layout, deployed via GitHub Pages from `portfolio-astro/`) reads as a competent DevOps engineer with a homelab. The owner is now deep into AI / agent tooling — running self-hosted models, building a personal AI agent (Jarvis / OpenClaw), and developing an agent-first macOS IDE (Dockyard). None of that is meaningfully surfaced today: OpenClaw is one word inside the Homelab namespace table, AI tooling is absent from Skills, and Fundcraft's most distinctive work (Code-Medic, AI-tooling stewardship) is unmentioned.

The portfolio is **a brag-place**, not a CV mirror. CV technical bullets stay in the CV. This spec reshapes the site so it brags about what the owner actually does and is currently obsessed with, with AI as a co-headline alongside DevOps/Cloud.

## Goals

- Co-headline DevOps + AI in the top-line identity.
- Make **Jarvis** the AI flagship — it currently has no presence and deserves a section.
- Surface **App Factory** as a distinct showcase — agent-driven end-to-end app deployment.
- Surface **Dockyard** as a distinct showcase — agent-first IDE in progress.
- Tell two AI-flavoured Fundcraft narratives (Code-Medic, AI-tooling steward); drop the rest into the CV.
- Add an evergreen "Now" section signalling current focus areas.
- Add an AI/LLM row to Skills.
- Preserve the existing aesthetic — amber accent on dark, Syne + DM Mono, sidebar editorial layout. No visual rebrand.

## Non-goals

- No theme/typography rebrand. Aesthetic stays.
- No replacement of the static `index.html` / `index-matrix.html` legacy files. Only the Astro site is in scope.
- No CV-style bullet duplication. Section copy stays narrative.
- No CTAs / download links / public links for Dockyard yet (project not stable enough).
- No public list of every Fundcraft win (CV holds those).
- No backend, no CMS, no markdown content collection. Edits stay in component files.

## Decisions captured during brainstorming

| Decision | Value |
|---|---|
| Top-line positioning | DevOps + AI co-headline |
| Sidebar tagline | "DevOps Engineer, Cloud Architect & AI enthusiast" |
| AWS SAA badge | Stays in sidebar, prominent |
| Public name for the agent | **Jarvis** (with *openclaw* as subtitle) |
| Fundcraft mentions | Only Code-Medic + AI-tooling steward — no AWS Org / Aurora / SOC2 stories on the site |
| AI Lab scope | OpenClaw deep-dive only — not a broader gallery |
| Now section | Evergreen (no date) — content owner-supplied later |
| Dockyard | Acknowledged as a fork being evolved; no CTAs yet |
| About copy change | s/living room/basement/ |
| Section emphasis order | Homelab + Jarvis/App Factory/Dockyard first, then AWS cert (sidebar-permanent), then rest |

## Final structure

```
SIDEBAR
  Francesc Barnola_
  DevOps Engineer, Cloud Architect & AI enthusiast
  ☁ AWS Solutions Architect · Associate

01 / About               (rewritten; AI co-headlined; basement, not living room)
02 / Homelab             (existing content; eyebrow may read "the cluster I live in")
03 / Jarvis              (NEW — the agent; subtitle "openclaw")
04 / App Factory         (NEW — Jarvis's standout skill)
05 / Dockyard            (NEW — agent-first IDE, fork-in-progress)
06 / Now                 (NEW — evergreen "currently exploring")
07 / Skills              (existing; new AI/LLM row at top)
08 / Work                (NEW — Code-Medic + AI-tooling steward only)
09 / Projects            (unchanged — existing 5 OSS repos)
10 / Learning            (unchanged structurally)
11 / Contact             (unchanged; captcha modal stays)
```

---

## §1 — Sidebar

**File:** `portfolio-astro/src/components/Sidebar.astro`

Changes:
- Role line: `DevOps Engineer<br/>& Cloud Architect` → `DevOps Engineer,<br/>Cloud Architect &<br/>AI enthusiast`
- Nav items array — replace with the 11-section list above (same `{ href, label }` shape).
- Mobile nav meta uses the same updated items.
- AWS badge unchanged. Status dot unchanged.

No structural / style changes beyond the text swap. No new CSS.

## §2 — About

**File:** `portfolio-astro/src/components/About.astro`

Bio copy rewritten to three paragraphs (preserves voice, AI co-headlined):

> *I'm a DevOps engineer designing and operating the cloud infrastructure that lets engineering teams ship faster and sleep better. AWS Certified Solutions Architect, day job at Fundcraft running a regulated fintech platform.*
>
> *Right alongside the infra work, I'm deep in the AI side of engineering — running models locally, building agents, and rolling out coding assistants in production. I think the highest-leverage shift in our industry right now is thoughtful AI integration, and I want to be inside that loop, not watching it from the outside.*
>
> *Outside of work I run a full Kubernetes homelab on bare metal — Proxmox, K3s, TrueNAS — with a complete observability stack, self-hosted CI/CD, and a growing catalogue of personal projects (including **Jarvis**, my self-hosted assistant). I believe the best way to understand a technology is to operate it in production, even if that production is your basement.*

Stats card unchanged (`30+ self-hosted services`, `SAA`).
Right-hand sidecar cards (Currently at Fundcraft, Location) unchanged.

## §3 — Homelab

**File:** `portfolio-astro/src/components/Homelab.astro`

Content kept as-is. Two micro-edits:

- Section eyebrow may read `02 / The cluster I live in` (optional flavour — fall back to `02 / Homelab` if preferred).
- WIP/footer note adds a one-line cross-link to Jarvis: *"→ The `moltbot` / `openclaw` namespace runs Jarvis — see §3."*

No layout changes.

## §4 — Jarvis (NEW)

**File:** `portfolio-astro/src/components/Jarvis.astro`

Section header:
- Title: **Jarvis**
- Subtitle (smaller line beneath): *openclaw*
- Eyebrow: `03 / The agent`

### Pitch paragraph

> Jarvis is my self-hosted AI agent. It lives in my K3s homelab as a `StatefulSet`, multi-model by design, and reaches into everything I run — calendar, mail, smart home, media stack, music, notes, dynamic DNS, web search, you name it. It has its own personality, a curated long-term memory, and a proactive heartbeat that pokes me when something needs attention.

### Pull-quote (memory philosophy)

> *"Explicit and inspectable. File over app. Agent-writable, human-auditable. Load the index, not the content."* — Jarvis's memory philosophy

### Featured interface block (top, prominent)

```
┌─ INTERFACE ─────────────────────────────────────────┐
│ Telegram is the front door.                         │
│                                                     │
│   text  →  any model                                │
│   voice →  transcribed in-pod, replied with voice   │
│            depending on the model in play           │
│                                                     │
│ Other entry points: heartbeat polls, scheduled      │
│ crons, Discord, WhatsApp.                           │
└─────────────────────────────────────────────────────┘
```

Visual style: same `<pre>`-flavoured monospace box as the homelab `topo-node` blocks, amber border or accent on `INTERFACE`.

### Four info blocks (2×2 grid)

**HOW IT LIVES**
- K3s `StatefulSet` (`openclaw` namespace)
- ArgoCD GitOps from `barnolacesc/home-cluster`
- Sealed Secrets, 2× PVCs (`/home/node/.openclaw`, `/home/node/clawd`)
- CronJobs: solar-surplus check (every 5 min), no-ip renewal (monthly)
- Traefik ingress

**HOW IT THINKS** (multi-model)
- Primary — Gemini 3.1 Flash Lite
- Fallback — DeepSeek Chat
- On-demand — Gemma 4 31B / Gemma 4 26B MoE
- Local — Ollama (`gemma4:e4b`, `qwen3.5:2b`)
- Also configured — Claude Sonnet / Opus, GPT-4o

**HOW IT REMEMBERS**
- Two-repo brain. Plain markdown. No embeddings, no hidden state. Agent-writable, human-auditable.
- `jarvis` — workspace + runtime context (SOUL, USER, TOOLS, daily session logs)
- `jarvis-cortex` — long-term library (facts, infra, people, projects, incidents, raw logs)
- Protocol-governed: explicit signals promote to durable pages; daily logs buffer everything else; weekly consolidation pass reviews promotion candidates; `mistakes.md` is append-only.

**HOW IT TALKS**
- Tuned away from default-LLM sycophancy. No *"great question!"*, no *"absolutely magnificent insight!"*, no paternalism.
- Cynical, sarcastic, pragmatic, down to earth.
- Has opinions and is allowed to disagree.
- *"Competence is its only validation."* — straight out of its `SOUL.md`.
- Configured personality is a deliberate engineering decision, not a chatbot default.

### Capability grid (table; Jarvis-side capabilities only — app-factory promoted to §4)

| Capability | One-liner |
|---|---|
| Calendar + Mail | Own Google account (`francesc.ai.assistant@gmail.com`), read/write, never sends without explicit OK |
| Home Assistant | Read/write — actually flips switches and reads sensors |
| My second brain | Operates *my* Obsidian vault directly — stores, retrieves, keeps things organised |
| Media stack | Radarr · Sonarr · Prowlarr · Jellyseerr · qBittorrent |
| Spotify | Now-playing, search, play, skip, volume, playlist edits |
| Notion | Full read/write API |
| n8n | Workflow CRUD + executions |
| Custom API gateway | A forward-facing API I built into my own services — also exposed to Jarvis as a tool surface |
| Web search | Self-hosted SearXNG — queries never leave the cluster |
| Proactive heartbeat | Rotates inbox / calendar / mentions / weather |
| Solar-aware compute | Cron-driven check — knows when there's surplus to burn |

### Closing micro-block

> Built so I'd stop pasting things into chat. Now it pastes things at *me*.

### Notes for implementation

- Visual treatment matches the existing `Homelab.astro` (topo-grid + ns-table style).
- The `INTERFACE` box gets visual prominence (amber border + slightly larger padding).
- The pull-quote uses the same blockquote-style amber left-border treatment seen in the Learning section's "Master's thesis" callout.
- Capability table uses the same row-grid pattern as Homelab's `ns-table`.

## §5 — App Factory (NEW)

**File:** `portfolio-astro/src/components/AppFactory.astro`

Section header:
- Title: **App Factory**
- Eyebrow: `04 / Agent-built infrastructure`
- Tagline under header: *"Give it a one-line app idea. Get back a deployed, SSL'd, ingress-routed service."*

### Pitch paragraph

> A skill I built on top of Jarvis. You hand it an app definition — *"build me a tic-tac-toe"*, *"I want a todo list"*, *"make a calculator"* — and the agent does the entire chain end-to-end: generates the app, writes the Dockerfile, builds and pushes the image to Docker Hub or GHCR, generates the Kubernetes manifests, hands them to ArgoCD, registers the domain with Cloudflare, wires the nginx ingress, gets the cert from cert-manager, and tells me the URL when it's live.

### Pipeline visualization (horizontal mono flow)

```
APP SPEC  →  CODE + DOCKERFILE  →  IMAGE PUSH  →  ARGOCD SYNC  →  LIVE
"todo list"      generated         DockerHub/GHCR   manifests      https://…
                                         │
                                         ▼
                            Cloudflare DNS · nginx ingress
                            cert-manager · public OR home-only
```

Implementation: 5-column flex/grid of mono pill boxes, with an arrow row beneath them dropping down to the Cloudflare/ingress/TLS detail.

### Deployment knobs block

```
┌─ DEPLOYMENT KNOBS ────────────────────────────────────────────┐
│ Visibility    public · home-only via VPN                      │
│ Namespace     public / private — based on your instruction    │
│ Domain        registered & routed via Cloudflare API          │
│ TLS           cert-manager + Let's Encrypt, automatic         │
│ Ingress       nginx + reverse proxy rules generated per app   │
└───────────────────────────────────────────────────────────────┘
```

### Honest-scope footnote

> Currently scoped to stateless apps — static HTML / single-page tools. Database-backed apps are next on the list.

### Closing

> The same pattern I run for real apps at work, except the trigger is a Telegram message instead of a Jira ticket.

## §6 — Dockyard (NEW)

**File:** `portfolio-astro/src/components/Dockyard.astro`

Section header:
- Title: **Dockyard**
- Eyebrow: `05 / Agent-first IDE (in progress)`

### Pitch paragraph

> Dockyard started as a fork of an open-source agent IDE I liked but wanted to take in a different direction. I'm evolving it into my own — an agent-first workspace where every workstream is a git worktree, every worktree has its own agent, and the agent, dev server, and embedded browser all live together in one native window. The thesis: if agentic work is going to be the new normal, the IDE should be designed for the agent, not retrofitted around it.

### Stack / Features (two-column mono block)

**STACK**
- Native macOS app (Swift)
- Ghostty GPU-rendered terminal
- Tmux on a dedicated socket
- Monaco editor (WKWebView)
- `gh` CLI integration

**FEATURES**
- Worktree-per-task by default
- Claude Code or Codex per pane
- Session resume across restarts
- Port-detecting embedded browser
- Setup/run/teardown via `.dockyard.json`
- Keyboard-first, ⌘+everything

### Closing micro-block

> Not ready for a download button yet. When it is, this section grows one.

### Notes for implementation

- No CTAs, no GitHub link, no Homebrew install snippet yet — per owner's request.
- Visual treatment can mirror App Factory's blocks for consistency.

## §7 — Now (NEW)

**File:** `portfolio-astro/src/components/Now.astro`

Section header:
- Title: **Currently exploring**
- Eyebrow: `06 / Now`

Format: 4–6 short arrow-prefixed lines, no dates. Content provided by owner; section ships with a placeholder structure:

```
→ <model / topic 1 — owner-supplied>
→ <model / topic 2 — owner-supplied>
→ <model / topic 3 — owner-supplied>
→ <model / topic 4 — owner-supplied>
```

Implementation note: ships with sensible placeholder lines (e.g. "Running gpt-oss-class models locally and pushing what's possible on consumer hardware", "Pushing Jarvis deeper into agentic work", "Building Dockyard out of fork-stage into something I own") that the owner can hand-edit before deploy. Owner will confirm final copy.

## §8 — Skills

**File:** `portfolio-astro/src/components/Skills.astro`

Change: prepend one new row at the top of the `skills` array:

```js
{
  cat: 'AI / LLM Engineering',
  items: ['Anthropic API', 'Claude Code', 'Cursor', 'Gemini CLI', 'Bedrock', 'Vertex AI', 'Kendra', 'Ollama', 'n8n', 'RAG', 'Agent orchestration'],
}
```

Existing rows unchanged. Final order: AI/LLM → Orchestration → IaC → Cloud → Observability → CI/CD → Languages → Security → Storage & Network.

## §9 — Work (NEW)

**File:** `portfolio-astro/src/components/Work.astro`

Section header:
- Title: **At Fundcraft**
- Eyebrow: `08 / Work`

Two narrative wins as side-by-side cards or stacked blocks (no CV-style bullets):

### Code-Medic

> I built **Code-Medic**, a service that turns Sentry incidents into AI-drafted pull requests. It reads the stack trace, pulls the right files, and opens a PR for an engineer to review instead of leaving them to do the archaeology.

### AI tooling steward for engineering

> I run the AI tooling for our ~28-engineer org: API access, subscription management, model rollouts, and provider migrations (Cursor → Claude Code most recently). I'm constantly evaluating what's next, because the best assistant six months ago is rarely the best one today.

No tag pills, no bullets. Just the two narratives. Length-balanced cards in a 2-column grid (collapsing to single column at mobile breakpoint).

## §10 — Projects

**File:** `portfolio-astro/src/components/Projects.astro`

Content unchanged. Slot moves from current position to slot 09. The 5 existing projects remain as-is.

Optional consideration (deferred — not in this spec's scope): if Dockyard ever leaves §6 and becomes "just another project", it could move here. For now Dockyard stays in §6.

## §11 — Learning

**File:** `portfolio-astro/src/components/Learning.astro`

Content unchanged structurally. Slot 10.

Optional copy refresh (not required for this spec): the "Current mindset" italic block at the bottom currently reads *"Not sure which to tackle next — but I'll be tackling one of them."* — owner may want to re-thread it with an AI-coloured line. Left as-is unless owner provides a replacement.

## §12 — Contact

**File:** `portfolio-astro/src/components/Contact.astro`

Unchanged. Slot 11. Captcha modal flow intact.

## §12.5 — Eyebrow renumbering (existing sections)

Every section currently in the codebase carries a `section-num` eyebrow that hard-codes its slot (e.g. `01 / About`, `03 / Skills`). With the new ordering, every existing section's eyebrow must be updated to match its new slot. Required edits:

| Component | Old eyebrow | New eyebrow |
|---|---|---|
| `About.astro` | `01 / About` | `01 / About` (unchanged) |
| `Homelab.astro` | `04 / Homelab` | `02 / Homelab` (or `02 / The cluster I live in` per §3 optional) |
| `Skills.astro` | `03 / Skills` | `07 / Skills` |
| `Projects.astro` | `05 / Projects` | `09 / Projects` |
| `Learning.astro` | `02 / Currently pursuing` | `10 / Currently pursuing` |
| `Contact.astro` | (verify in source) | `11 / Contact` |

New sections (Jarvis, App Factory, Dockyard, Now, Work) ship with the correct eyebrow in their initial component file — see each section's spec above.

## §13 — Layout / index page wiring

**Files:**
- `portfolio-astro/src/pages/index.astro` — update component imports + order
- `portfolio-astro/src/layouts/Layout.astro` — no change expected

The `index.astro` body becomes:

```astro
<Layout>
  <About />
  <Homelab />
  <Jarvis />
  <AppFactory />
  <Dockyard />
  <Now />
  <Skills />
  <Work />
  <Projects />
  <Learning />
  <Contact />
</Layout>
```

## Component file inventory (delta)

**New files:**
- `portfolio-astro/src/components/Jarvis.astro`
- `portfolio-astro/src/components/AppFactory.astro`
- `portfolio-astro/src/components/Dockyard.astro`
- `portfolio-astro/src/components/Now.astro`
- `portfolio-astro/src/components/Work.astro`

**Edited files:**
- `portfolio-astro/src/components/Sidebar.astro` — role line + nav items
- `portfolio-astro/src/components/About.astro` — bio copy
- `portfolio-astro/src/components/Skills.astro` — prepend AI/LLM row
- `portfolio-astro/src/components/Homelab.astro` — optional eyebrow change + Jarvis cross-link
- `portfolio-astro/src/pages/index.astro` — import + order

**Unchanged:**
- `Projects.astro`, `Learning.astro`, `Contact.astro`, `CaptchaModal.astro`, `Nav.astro`, `Hero.astro` (already unused by `index.astro`), `Layout.astro`

## Visual / styling guidance

Reuse existing patterns — no new global styles needed:

- Section eyebrow + title: same `section-eyebrow`/`section-title` pattern used in all current sections.
- Info boxes: mirror `Homelab.astro`'s `topo-node` / `net-row` styling.
- Capability tables: mirror `Homelab.astro`'s `ns-table` / `ns-row` styling.
- Pull-quotes: mirror `Learning.astro`'s `Master's thesis` amber-left-border callout.
- Reveal animations: keep using the `.reveal` + `data-delay` pattern already present in every section.

Only the `INTERFACE` block in §3 Jarvis warrants a slightly amplified visual treatment (heavier amber border) to make Telegram-as-frontdoor land with the emphasis the owner asked for.

## Content the owner still needs to provide

These are placeholders until the owner hands them over — they don't block the layout work but block final deploy:

1. **Now section content** — 4–6 arrow-prefixed lines reflecting current focus.
2. **(Optional) Learning section "Current mindset" refresh** — one short italic line.
3. **(Optional) Dockyard fork attribution** — name of the upstream OSS project, if the owner wants it credited explicitly.

The owner has explicitly opted out of Dockyard CTAs (GitHub link, Homebrew install, download button) until the project is stable enough to share.

## Out of scope / future work

- Legacy `index.html` / `index-matrix.html` rewrite — left untouched.
- Markdown content pipeline / CMS — not introduced.
- A `/lab` or `/now` route — current single-page structure preserved.
- Per-project case-study pages — not in this iteration.
- Dockyard public CTAs — deferred until project stable.

---

## Reviewer notes

The structure resolves three explicit owner requests captured during the brainstorm:

1. **AI gets co-headline treatment** without rebranding away from DevOps — sidebar tagline + dedicated Jarvis/App Factory/Dockyard sections + Skills row.
2. **Homelab + AI brag block leads** — sections 02–06 are the proof-of-work narrative; everything after is supporting credibility.
3. **CV is for bullets; the site is for stories** — Fundcraft content is reduced to two narrative wins, AWS Org / Aurora / SOC2 deliberately omitted.

The section count (11) is high but the navigation cost is small — the sidebar already lists everything, and the editorial layout is built for vertical scrolling. The alternative (folding sections into each other) was considered but rejected because the owner explicitly wanted App Factory and Dockyard as separate showcases.
