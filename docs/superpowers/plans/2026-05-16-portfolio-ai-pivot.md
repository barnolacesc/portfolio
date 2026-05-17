# Portfolio AI Pivot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reshape the deployed Astro portfolio (`portfolio-astro/`) to co-headline DevOps + AI, surface the Jarvis agent / App Factory skill / Dockyard IDE as first-class sections, and add a "Now" plus "Work" section. Preserves existing aesthetic.

**Architecture:** Static Astro 5 site rendered from `.astro` components. Each section is one component file. Sidebar + Layout wire navigation, scroll-reveal animations, and active-section highlighting via IntersectionObserver. CSS via global vars (`--bg`, `--amber`) + component-scoped styles. No CMS, no client framework, no tests.

**Tech Stack:** Astro 5, Tailwind 4 (via `@tailwindcss/vite`, but not heavily used — most styling is hand-written CSS with custom properties), Syne + DM Mono + Fraunces fonts (Google Fonts).

**Spec:** `docs/superpowers/specs/2026-05-16-portfolio-ai-pivot-design.md` (commit `5af86b0`)

**Sequencing strategy:** Tasks 1–7 create new components and make additive edits — they don't visually break anything because new components aren't imported yet and existing-section edits don't change section ordering. Task 8 is the atomic cutover: it imports new sections in `index.astro`, renumbers every eyebrow, and updates the sidebar nav + tagline in one commit. Up to that final commit, the site keeps working with its current 6-section layout.

---

## Progress tracker

| Task | Status | Commit |
|---|---|---|
| 1 — Jarvis.astro | ✅ done | `689bda3` |
| 2 — AppFactory.astro | ✅ done | `6c0d780` |
| 3 — Dockyard.astro | ✅ done | `ca0fc92` |
| 4 — Now.astro | ✅ done | `c014912` |
| 5 — Work.astro | ✅ done | `f3f8ac9` |
| 6 — About bio rewrite | ✅ done | `0a3cf27` |
| 7 — Skills AI/LLM row | ✅ done | `f0ca702` |
| 8 — Atomic cutover | ✅ done | `c7f7704` |
| 9 — Final review pass | ✅ done | review-only |

**Implementation complete.** All 11 sections wired, production build clean, no orphaned imports.

**Owner follow-ups (out of scope of this plan):**

1. Review the placeholder bullet text in `Now.astro` and edit to taste — current copy is a sensible default but not authored by the owner directly.
2. Optionally refresh the "current mindset" italic line at the bottom of `Learning.astro` with an AI-coloured replacement (currently *"Not sure which to tackle next — but I'll be tackling one of them."*).
3. Optionally update the page title + meta description in `Layout.astro` to co-headline AI (Task 9 Step 3 in this plan documents the proposed edit but was intentionally skipped pending approval).
4. Run a manual mobile-viewport check and full visual walk-through of the deployed site once it lands.

**Gemini model verified working on this account:** `gemini-3.1-pro-preview` (`gemini-3-pro` returns 404).

**Verification pattern:** This is a static UI build with no test framework. Every task ends with three verification steps:

1. **Build verification** — `cd portfolio-astro && npm run build` returns exit code 0 with no warnings.
2. **Dev-server visual verification** — `cd portfolio-astro && npm run dev` runs without console errors, and the relevant section/change renders correctly at `http://localhost:4321/`.
3. **Commit** — small focused commit per task.

If the dev server isn't already running, start it with `cd portfolio-astro && npm run dev` (Astro picks `:4321` by default).

---

## File Structure

**New component files (5):**

- `portfolio-astro/src/components/Jarvis.astro` — The agent. Sections: pitch + pull-quote + INTERFACE callout + 2×2 info grid (Lives/Thinks/Remembers/Talks) + capability table + closing.
- `portfolio-astro/src/components/AppFactory.astro` — App Factory skill. Sections: pitch + horizontal pipeline visual + deployment knobs block + scope footnote + closing.
- `portfolio-astro/src/components/Dockyard.astro` — Agent-first IDE. Sections: pitch + STACK/FEATURES side-by-side + closing.
- `portfolio-astro/src/components/Now.astro` — Evergreen "currently exploring". Bullet list with placeholder content.
- `portfolio-astro/src/components/Work.astro` — Two Fundcraft narrative wins (Code-Medic + AI-tooling steward).

**Modified files (6):**

- `portfolio-astro/src/components/Sidebar.astro` — Tagline change + nav items array swap. Single file, two-place edit.
- `portfolio-astro/src/components/About.astro` — Bio rewrite (3 paragraphs, "basement" not "living room", AI co-headlined).
- `portfolio-astro/src/components/Skills.astro` — Prepend "AI / LLM Engineering" row to `skills` array + eyebrow renumber.
- `portfolio-astro/src/components/Homelab.astro` — Eyebrow renumber to `02 / Homelab` + add Jarvis cross-link footer.
- `portfolio-astro/src/components/Projects.astro` — Eyebrow renumber to `09 / Projects`.
- `portfolio-astro/src/components/Learning.astro` — Eyebrow renumber to `10 / Currently pursuing`.
- `portfolio-astro/src/components/Contact.astro` — Eyebrow renumber to `11 / Contact`.
- `portfolio-astro/src/pages/index.astro` — Import + reorder all 11 components.

**Unchanged:** `Layout.astro`, `CaptchaModal.astro`, `Nav.astro`, `Hero.astro` (already unused), `global.css`.

---

## Task 1: Create `Jarvis.astro` component

**Files:**
- Create: `portfolio-astro/src/components/Jarvis.astro`

This is the biggest of the new components and the AI flagship. It uses scoped styles patterned after `Homelab.astro` (which is the closest existing analogue).

- [ ] **Step 1: Create the file with full content**

Create `portfolio-astro/src/components/Jarvis.astro`:

```astro
---
const capabilities = [
  { cap: 'Calendar + Mail', note: 'Own Google account, read/write, never sends without explicit OK' },
  { cap: 'Home Assistant', note: 'Read/write — actually flips switches and reads sensors' },
  { cap: 'My second brain', note: 'Operates my Obsidian vault directly — stores, retrieves, keeps things organised' },
  { cap: 'Media stack', note: 'Radarr · Sonarr · Prowlarr · Jellyseerr · qBittorrent' },
  { cap: 'Spotify', note: 'Now-playing, search, play, skip, volume, playlist edits' },
  { cap: 'Notion', note: 'Full read/write API' },
  { cap: 'n8n', note: 'Workflow CRUD + executions' },
  { cap: 'Custom API gateway', note: 'A forward-facing API I built into my own services — also exposed to Jarvis as a tool surface' },
  { cap: 'Web search', note: 'Self-hosted SearXNG — queries never leave the cluster' },
  { cap: 'Proactive heartbeat', note: 'Rotates inbox / calendar / mentions / weather' },
  { cap: 'Solar-aware compute', note: "Cron-driven check — knows when there's surplus to burn" },
];
---

<section id="jarvis" class="section-wrap">

  <div class="reveal">
    <div class="section-eyebrow">
      <span class="section-num">03 / The agent</span>
    </div>
    <h2 class="section-title">Jarvis<br/><span class="jarvis-subtitle">openclaw</span></h2>
  </div>

  <p class="reveal" data-delay="0.05s" style="font-size: 1.05rem; color: var(--fg); margin-bottom: 24px; max-width: 680px; line-height: 1.8;">
    Jarvis is my self-hosted AI agent. It lives in my K3s homelab as a <code class="inline-code">StatefulSet</code>, multi-model by design, and reaches into everything I run — calendar, mail, smart home, media stack, music, notes, dynamic DNS, web search, you name it. It has its own personality, a curated long-term memory, and a proactive heartbeat that pokes me when something needs attention.
  </p>

  <!-- Memory philosophy pull-quote -->
  <div class="reveal pullquote" data-delay="0.1s">
    <div class="font-mono pullquote-label">Memory philosophy</div>
    <p class="pullquote-text">
      "Explicit and inspectable. File over app. Agent-writable, human-auditable. Load the index, not the content."
    </p>
  </div>

  <!-- Featured INTERFACE block -->
  <div class="reveal interface-block" data-delay="0.15s">
    <div class="font-mono interface-label">Interface</div>
    <div class="interface-headline">Telegram is the front door.</div>
    <div class="interface-grid">
      <div>
        <div class="interface-row-label font-mono">text</div>
        <div class="interface-row-value">→ any model</div>
      </div>
      <div>
        <div class="interface-row-label font-mono">voice</div>
        <div class="interface-row-value">→ transcribed in-pod, replied with voice depending on the model in play</div>
      </div>
    </div>
    <div class="interface-foot font-mono">Other entry points: heartbeat polls · scheduled crons · Discord · WhatsApp</div>
  </div>

  <!-- 2x2 info grid -->
  <div class="reveal info-2x2" data-delay="0.2s">

    <div class="info-block">
      <div class="font-mono info-label">How it lives</div>
      <ul class="info-list">
        <li>K3s <code class="inline-code">StatefulSet</code> · <code class="inline-code">openclaw</code> namespace</li>
        <li>ArgoCD GitOps from <code class="inline-code">barnolacesc/home-cluster</code></li>
        <li>Sealed Secrets · 2 PVCs · Traefik ingress</li>
        <li>CronJobs: solar-surplus (5 min) · no-ip (monthly)</li>
      </ul>
    </div>

    <div class="info-block">
      <div class="font-mono info-label">How it thinks</div>
      <ul class="info-list">
        <li><span class="info-key">Primary</span> Gemini 3.1 Flash Lite</li>
        <li><span class="info-key">Fallback</span> DeepSeek Chat</li>
        <li><span class="info-key">On-demand</span> Gemma 4 31B · 26B MoE</li>
        <li><span class="info-key">Local</span> Ollama (gemma4:e4b · qwen3.5:2b)</li>
        <li><span class="info-key">Also</span> Claude · GPT-4o</li>
      </ul>
    </div>

    <div class="info-block">
      <div class="font-mono info-label">How it remembers</div>
      <p class="info-prose">
        Two-repo brain. Plain markdown. No embeddings, no hidden state. Agent-writable, human-auditable.
      </p>
      <ul class="info-list">
        <li><code class="inline-code">jarvis</code> — workspace + runtime context</li>
        <li><code class="inline-code">jarvis-cortex</code> — long-term library (facts · infra · people · projects · incidents · logs)</li>
      </ul>
      <p class="info-prose-small">
        Protocol-governed: explicit signals promote to durable pages, daily logs buffer everything else, weekly consolidation pass reviews candidates, <code class="inline-code">mistakes.md</code> is append-only.
      </p>
    </div>

    <div class="info-block">
      <div class="font-mono info-label">How it talks</div>
      <p class="info-prose">
        Tuned away from default-LLM sycophancy. No <em>"great question!"</em>, no <em>"absolutely magnificent insight!"</em>, no paternalism. Cynical, sarcastic, pragmatic, down to earth. Has opinions and is allowed to disagree.
      </p>
      <p class="info-prose-small" style="color: var(--amber);">
        "Competence is its only validation." — straight out of its <code class="inline-code">SOUL.md</code>.
      </p>
      <p class="info-prose-small">
        Personality is an engineering decision, not a chatbot default.
      </p>
    </div>

  </div>

  <!-- Capability table -->
  <div class="reveal" data-delay="0.25s" style="margin-top: 40px;">
    <div class="font-mono" style="font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--fg-2); margin-bottom: 16px;">
      What it does · {capabilities.length} surfaces wired
    </div>

    <div class="cap-table">
      {capabilities.map(({ cap, note }) => (
        <div class="cap-row">
          <div class="cap-name font-mono">{cap}</div>
          <div class="cap-note">{note}</div>
        </div>
      ))}
    </div>
  </div>

  <!-- Closing -->
  <p class="reveal" data-delay="0.3s" style="margin-top: 32px; font-style: italic; color: var(--fg-2); font-size: 0.95rem;">
    Built so I'd stop pasting things into chat. Now it pastes things at <span style="color: var(--amber);">me</span>.
  </p>

</section>

<style>
  .jarvis-subtitle {
    font-family: 'DM Mono', monospace;
    font-style: normal;
    font-weight: 400;
    font-size: 0.42em;
    letter-spacing: 0.1em;
    text-transform: lowercase;
    color: var(--fg-2);
    margin-top: 8px;
    display: inline-block;
  }

  .inline-code {
    font-family: 'DM Mono', monospace;
    font-size: 0.88em;
    color: var(--amber);
    background: var(--amber-l);
    padding: 1px 6px;
    border-radius: 2px;
  }

  .pullquote {
    margin: 24px 0 32px;
    padding: 18px 24px;
    border-left: 2px solid var(--amber);
    background: rgba(232, 162, 48, 0.04);
    max-width: 680px;
  }
  .pullquote-label {
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--amber);
    margin-bottom: 6px;
  }
  .pullquote-text {
    font-size: 1rem;
    color: var(--fg);
    font-style: italic;
    line-height: 1.7;
  }

  .interface-block {
    border: 1px solid var(--amber);
    background: rgba(232, 162, 48, 0.05);
    padding: 24px 28px;
    margin-bottom: 32px;
  }
  .interface-label {
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--amber);
    margin-bottom: 10px;
  }
  .interface-headline {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 1.3rem;
    letter-spacing: -0.01em;
    color: var(--fg);
    margin-bottom: 18px;
  }
  .interface-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }
  .interface-row-label {
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--amber);
    margin-bottom: 4px;
  }
  .interface-row-value {
    font-size: 0.92rem;
    color: var(--fg);
    line-height: 1.6;
  }
  .interface-foot {
    font-size: 0.74rem;
    letter-spacing: 0.04em;
    color: var(--fg-2);
    border-top: 1px solid var(--border);
    padding-top: 12px;
    margin-top: 4px;
  }

  .info-2x2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--border);
    margin-bottom: 1px;
  }
  .info-block {
    background: var(--bg-2);
    padding: 22px 24px;
  }
  .info-label {
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--amber);
    margin-bottom: 14px;
  }
  .info-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .info-list li {
    font-size: 0.9rem;
    color: var(--fg-2);
    line-height: 1.55;
  }
  .info-key {
    display: inline-block;
    min-width: 84px;
    font-family: 'DM Mono', monospace;
    font-size: 0.78rem;
    color: var(--fg-3);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-right: 6px;
  }
  .info-prose {
    font-size: 0.92rem;
    color: var(--fg-2);
    line-height: 1.7;
    margin-bottom: 12px;
  }
  .info-prose-small {
    font-size: 0.85rem;
    color: var(--fg-2);
    line-height: 1.65;
    margin-top: 10px;
  }

  .cap-table {
    display: flex;
    flex-direction: column;
    gap: 1px;
    background: var(--border);
  }
  .cap-row {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1px;
    background: var(--border);
  }
  .cap-name {
    background: var(--bg-2);
    padding: 12px 16px;
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    color: var(--amber);
    text-transform: uppercase;
    display: flex;
    align-items: center;
  }
  .cap-note {
    background: var(--bg);
    padding: 12px 16px;
    font-size: 0.92rem;
    color: var(--fg);
    line-height: 1.55;
    display: flex;
    align-items: center;
  }

  @media (max-width: 860px) {
    .interface-grid {
      grid-template-columns: 1fr;
    }
    .info-2x2 {
      grid-template-columns: 1fr;
    }
    .cap-row {
      grid-template-columns: 1fr;
    }
    .cap-name {
      border-bottom: 1px solid var(--border);
    }
  }
</style>
```

- [ ] **Step 2: Build verification**

Run: `cd portfolio-astro && npm run build`
Expected: exits 0, no warnings about Jarvis.astro. Build output mentions `dist/` regenerated. (The component isn't yet imported by `index.astro`, so it won't appear in the build output pages — that's fine, build only checks syntax.)

- [ ] **Step 3: Commit**

```bash
git add portfolio-astro/src/components/Jarvis.astro
git -c commit.gpgsign=false commit -m "feat(portfolio): add Jarvis section component

Self-hosted AI agent showcase. Includes pitch, memory philosophy
pull-quote, Telegram interface callout, 2x2 info grid (Lives/Thinks/
Remembers/Talks), and capability table. Not yet wired into index.astro."
```

---

## Task 2: Create `AppFactory.astro` component

**Files:**
- Create: `portfolio-astro/src/components/AppFactory.astro`

- [ ] **Step 1: Create the file**

Create `portfolio-astro/src/components/AppFactory.astro`:

```astro
---
const pipeline = [
  { stage: 'App spec',         detail: '"todo list"' },
  { stage: 'Code + Dockerfile', detail: 'generated' },
  { stage: 'Image push',       detail: 'Docker Hub · GHCR' },
  { stage: 'ArgoCD sync',      detail: 'manifests applied' },
  { stage: 'Live',             detail: 'https://…' },
];

const knobs = [
  { knob: 'Visibility', value: 'public · home-only via VPN' },
  { knob: 'Namespace',  value: 'public / private — based on your instruction' },
  { knob: 'Domain',     value: 'registered & routed via Cloudflare API' },
  { knob: 'TLS',        value: "cert-manager + Let's Encrypt, automatic" },
  { knob: 'Ingress',    value: 'nginx + reverse proxy rules generated per app' },
];
---

<section id="app-factory" class="section-wrap">

  <div class="reveal">
    <div class="section-eyebrow">
      <span class="section-num">04 / Agent-built infrastructure</span>
    </div>
    <h2 class="section-title">App Factory.</h2>
  </div>

  <p class="reveal tagline" data-delay="0.05s">
    Give it a one-line app idea. Get back a deployed, SSL'd, ingress-routed service.
  </p>

  <p class="reveal" data-delay="0.1s" style="font-size: 1.05rem; color: var(--fg); margin-bottom: 40px; max-width: 720px; line-height: 1.8;">
    A skill I built on top of Jarvis. You hand it an app definition — <em>"build me a tic-tac-toe"</em>, <em>"I want a todo list"</em>, <em>"make a calculator"</em> — and the agent does the entire chain end-to-end: generates the app, writes the Dockerfile, builds and pushes the image to Docker Hub or GHCR, generates the Kubernetes manifests, hands them to ArgoCD, registers the domain with Cloudflare, wires the nginx ingress, gets the cert from cert-manager, and tells me the URL when it's live.
  </p>

  <!-- Pipeline flow -->
  <div class="reveal" data-delay="0.15s" style="margin-bottom: 32px;">
    <div class="font-mono" style="font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--fg-2); margin-bottom: 16px;">Pipeline</div>

    <div class="pipeline-grid">
      {pipeline.map(({ stage, detail }, i) => (
        <>
          <div class="pipe-node">
            <div class="pipe-stage font-mono">{stage}</div>
            <div class="pipe-detail">{detail}</div>
          </div>
          {i < pipeline.length - 1 && <div class="pipe-arrow">→</div>}
        </>
      ))}
    </div>

    <div class="pipe-foot font-mono">
      ↳ Cloudflare DNS · nginx ingress · cert-manager · public OR home-only
    </div>
  </div>

  <!-- Deployment knobs -->
  <div class="reveal knobs-block" data-delay="0.2s">
    <div class="font-mono knobs-label">Deployment knobs</div>
    <div class="knobs-table">
      {knobs.map(({ knob, value }) => (
        <div class="knob-row">
          <div class="knob-name font-mono">{knob}</div>
          <div class="knob-value">{value}</div>
        </div>
      ))}
    </div>
  </div>

  <!-- Scope footnote -->
  <p class="reveal scope-note" data-delay="0.25s">
    <span class="font-mono" style="color: var(--amber);">⚠ Honest scope:</span>
    Currently scoped to stateless apps — static HTML / single-page tools. Database-backed apps are next on the list.
  </p>

  <!-- Closing -->
  <p class="reveal" data-delay="0.3s" style="margin-top: 24px; font-style: italic; color: var(--fg-2); font-size: 0.95rem; max-width: 640px;">
    The same pattern I run for real apps at work, except the trigger is a Telegram message instead of a Jira ticket.
  </p>

</section>

<style>
  .tagline {
    font-family: 'Fraunces', serif;
    font-style: italic;
    font-weight: 600;
    font-size: 1.4rem;
    color: var(--amber);
    line-height: 1.4;
    margin-bottom: 28px;
    max-width: 720px;
  }

  .pipeline-grid {
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
    gap: 0;
    border: 1px solid var(--border-2);
    background: var(--bg-2);
  }
  .pipe-node {
    flex: 1 1 0;
    min-width: 140px;
    padding: 16px 18px;
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .pipe-node:last-of-type {
    border-right: none;
  }
  .pipe-stage {
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--amber);
  }
  .pipe-detail {
    font-size: 0.86rem;
    color: var(--fg);
    line-height: 1.4;
  }
  .pipe-arrow {
    display: none; /* arrows visually live as borders between nodes */
  }
  .pipe-foot {
    padding: 12px 18px;
    border: 1px solid var(--border-2);
    border-top: none;
    background: var(--bg);
    color: var(--fg-2);
    font-size: 0.78rem;
    letter-spacing: 0.02em;
  }

  .knobs-block {
    margin: 32px 0;
  }
  .knobs-label {
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--fg-2);
    margin-bottom: 16px;
  }
  .knobs-table {
    display: flex;
    flex-direction: column;
    gap: 1px;
    background: var(--border);
  }
  .knob-row {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 1px;
    background: var(--border);
  }
  .knob-name {
    background: var(--bg-2);
    padding: 12px 16px;
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    color: var(--amber);
    text-transform: uppercase;
    display: flex;
    align-items: center;
  }
  .knob-value {
    background: var(--bg);
    padding: 12px 16px;
    font-size: 0.92rem;
    color: var(--fg);
    line-height: 1.55;
    display: flex;
    align-items: center;
  }

  .scope-note {
    margin-top: 24px;
    padding: 14px 20px;
    border-left: 2px solid var(--amber);
    background: rgba(232, 162, 48, 0.04);
    color: var(--fg-2);
    font-size: 0.92rem;
    line-height: 1.7;
    max-width: 720px;
  }

  @media (max-width: 860px) {
    .pipeline-grid {
      flex-direction: column;
    }
    .pipe-node {
      border-right: none;
      border-bottom: 1px solid var(--border);
    }
    .pipe-node:last-of-type {
      border-bottom: none;
    }
    .knob-row {
      grid-template-columns: 1fr;
    }
    .knob-name {
      border-bottom: 1px solid var(--border);
    }
  }
</style>
```

- [ ] **Step 2: Build verification**

Run: `cd portfolio-astro && npm run build`
Expected: exits 0, no warnings about AppFactory.astro.

- [ ] **Step 3: Commit**

```bash
git add portfolio-astro/src/components/AppFactory.astro
git -c commit.gpgsign=false commit -m "feat(portfolio): add App Factory section component

End-to-end agent-driven app deployment showcase. Pipeline flow,
deployment knobs table, honest scope footnote. Not yet wired."
```

---

## Task 3: Create `Dockyard.astro` component

**Files:**
- Create: `portfolio-astro/src/components/Dockyard.astro`

- [ ] **Step 1: Create the file**

Create `portfolio-astro/src/components/Dockyard.astro`:

```astro
---
const stack = [
  'Native macOS app (Swift)',
  'Ghostty GPU-rendered terminal',
  'Tmux on a dedicated socket',
  'Monaco editor (WKWebView)',
  '`gh` CLI integration',
];

const features = [
  'Worktree-per-task by default',
  'Claude Code or Codex per pane',
  'Session resume across restarts',
  'Port-detecting embedded browser',
  'Setup/run/teardown via `.dockyard.json`',
  'Keyboard-first, ⌘+everything',
];
---

<section id="dockyard" class="section-wrap">

  <div class="reveal">
    <div class="section-eyebrow">
      <span class="section-num">05 / Agent-first IDE (in progress)</span>
    </div>
    <h2 class="section-title">Dockyard.</h2>
  </div>

  <p class="reveal" data-delay="0.05s" style="font-size: 1.05rem; color: var(--fg); margin-bottom: 24px; max-width: 720px; line-height: 1.8;">
    Dockyard started as a fork of an open-source agent IDE I liked but wanted to take in a different direction. I'm evolving it into my own — an agent-first workspace where every workstream is a git worktree, every worktree has its own agent, and the agent, dev server, and embedded browser all live together in one native window.
  </p>

  <!-- Thesis pull-quote -->
  <div class="reveal pullquote" data-delay="0.1s">
    <div class="font-mono pullquote-label">Thesis</div>
    <p class="pullquote-text">
      If agentic work is going to be the new normal, the IDE should be designed for the agent — not retrofitted around it.
    </p>
  </div>

  <!-- Stack / Features 2-up -->
  <div class="reveal stack-grid" data-delay="0.15s">
    <div class="stack-block">
      <div class="font-mono stack-label">Stack</div>
      <ul class="stack-list">
        {stack.map(item => (
          <li set:html={item.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')} />
        ))}
      </ul>
    </div>
    <div class="stack-block">
      <div class="font-mono stack-label">Features</div>
      <ul class="stack-list">
        {features.map(item => (
          <li set:html={item.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')} />
        ))}
      </ul>
    </div>
  </div>

  <!-- Closing -->
  <p class="reveal" data-delay="0.2s" style="margin-top: 24px; font-style: italic; color: var(--fg-2); font-size: 0.95rem; max-width: 640px;">
    Not ready for a download button yet. When it is, this section grows one.
  </p>

</section>

<style>
  .inline-code {
    font-family: 'DM Mono', monospace;
    font-size: 0.88em;
    color: var(--amber);
    background: var(--amber-l);
    padding: 1px 6px;
    border-radius: 2px;
  }

  .pullquote {
    margin: 20px 0 32px;
    padding: 18px 24px;
    border-left: 2px solid var(--amber);
    background: rgba(232, 162, 48, 0.04);
    max-width: 720px;
  }
  .pullquote-label {
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--amber);
    margin-bottom: 6px;
  }
  .pullquote-text {
    font-size: 1rem;
    color: var(--fg);
    font-style: italic;
    line-height: 1.7;
  }

  .stack-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--border);
    margin-bottom: 1px;
  }
  .stack-block {
    background: var(--bg-2);
    padding: 22px 24px;
  }
  .stack-label {
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--amber);
    margin-bottom: 14px;
  }
  .stack-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .stack-list li {
    font-size: 0.92rem;
    color: var(--fg);
    line-height: 1.55;
  }

  @media (max-width: 860px) {
    .stack-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 2: Build verification**

Run: `cd portfolio-astro && npm run build`
Expected: exits 0, no warnings about Dockyard.astro.

- [ ] **Step 3: Commit**

```bash
git add portfolio-astro/src/components/Dockyard.astro
git -c commit.gpgsign=false commit -m "feat(portfolio): add Dockyard section component

Agent-first macOS IDE showcase. Acknowledged as fork-in-progress.
No CTAs yet — closing line explicit about that. Not yet wired."
```

---

## Task 4: Create `Now.astro` component

**Files:**
- Create: `portfolio-astro/src/components/Now.astro`

This ships with placeholder bullets. The owner will hand-edit the actual content before deploy. Bullets are sensible defaults that already match the rabbit-hole story; if owner approves them they can stay.

- [ ] **Step 1: Create the file**

Create `portfolio-astro/src/components/Now.astro`:

```astro
---
const exploring = [
  'Pushing self-hosted models on consumer hardware — what runs fast, what runs cheap, what runs at all',
  'Pushing Jarvis deeper into agentic work — long-horizon tasks, better tool orchestration, fewer prompts',
  'Building Dockyard out of fork-stage into something that\'s mine',
  'Watching the gap between local and frontier models close in real time',
];
---

<section id="now" class="section-wrap">

  <div class="reveal">
    <div class="section-eyebrow">
      <span class="section-num">06 / Now</span>
    </div>
    <h2 class="section-title">Currently<br/>exploring.</h2>
  </div>

  <p class="reveal" data-delay="0.05s" style="font-size: 1.05rem; color: var(--fg); margin-bottom: 32px; max-width: 600px; line-height: 1.8;">
    The rabbit holes I'm actively in. This list changes whenever the rabbit hole does.
  </p>

  <div class="reveal" data-delay="0.1s">
    <ul class="now-list">
      {exploring.map(item => (
        <li class="now-item">
          <span class="now-arrow">→</span>
          <span class="now-text">{item}</span>
        </li>
      ))}
    </ul>
  </div>

</section>

<style>
  .now-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1px;
    background: var(--border);
    max-width: 760px;
  }
  .now-item {
    background: var(--bg-2);
    padding: 16px 20px;
    display: grid;
    grid-template-columns: 24px 1fr;
    gap: 12px;
    align-items: start;
  }
  .now-arrow {
    color: var(--amber);
    font-family: 'DM Mono', monospace;
    font-size: 1rem;
    line-height: 1.6;
  }
  .now-text {
    color: var(--fg);
    font-size: 0.98rem;
    line-height: 1.6;
  }
</style>
```

- [ ] **Step 2: Build verification**

Run: `cd portfolio-astro && npm run build`
Expected: exits 0, no warnings about Now.astro.

- [ ] **Step 3: Commit**

```bash
git add portfolio-astro/src/components/Now.astro
git -c commit.gpgsign=false commit -m "feat(portfolio): add Now section component

Evergreen 'currently exploring' bullet list. Ships with placeholder
content that the owner can hand-edit. Not yet wired."
```

---

## Task 5: Create `Work.astro` component

**Files:**
- Create: `portfolio-astro/src/components/Work.astro`

- [ ] **Step 1: Create the file**

Create `portfolio-astro/src/components/Work.astro`:

```astro
---
---

<section id="work" class="section-wrap">

  <div class="reveal">
    <div class="section-eyebrow">
      <span class="section-num">08 / Work</span>
    </div>
    <h2 class="section-title">At Fundcraft.</h2>
  </div>

  <p class="reveal" data-delay="0.05s" style="font-size: 1.05rem; color: var(--fg); margin-bottom: 40px; max-width: 640px; line-height: 1.8;">
    Two things I'm proud of, told as stories rather than bullets. The technical inventory lives on the CV.
  </p>

  <div class="reveal work-grid" data-delay="0.1s">

    <article class="work-card">
      <div class="work-eyebrow font-mono">Code-Medic</div>
      <p class="work-text">
        I built <strong>Code-Medic</strong>, a service that turns Sentry incidents into AI-drafted pull requests. It reads the stack trace, pulls the right files, and opens a PR for an engineer to review — instead of leaving them to do the archaeology.
      </p>
    </article>

    <article class="work-card">
      <div class="work-eyebrow font-mono">AI tooling steward</div>
      <p class="work-text">
        I run the AI tooling for our ~28-engineer org: API access, subscription management, model rollouts, and provider migrations (Cursor → Claude Code most recently). I'm constantly evaluating what's next, because the best assistant six months ago is rarely the best one today.
      </p>
    </article>

  </div>

</section>

<style>
  .work-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--border);
  }
  .work-card {
    background: var(--bg-2);
    padding: 28px 32px;
  }
  .work-eyebrow {
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--amber);
    margin-bottom: 14px;
  }
  .work-text {
    font-size: 1rem;
    color: var(--fg);
    line-height: 1.8;
  }
  .work-text strong {
    color: var(--fg);
    font-weight: 700;
  }

  @media (max-width: 860px) {
    .work-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 2: Build verification**

Run: `cd portfolio-astro && npm run build`
Expected: exits 0, no warnings about Work.astro.

- [ ] **Step 3: Commit**

```bash
git add portfolio-astro/src/components/Work.astro
git -c commit.gpgsign=false commit -m "feat(portfolio): add Work section component

Two Fundcraft narrative wins: Code-Medic and AI tooling steward.
No bullets, two prose cards. Not yet wired."
```

---

## Task 6: Rewrite About bio copy

**Files:**
- Modify: `portfolio-astro/src/components/About.astro`

Only the three bio paragraphs change. Stats card, photo, sidecar cards, eyebrow all stay.

- [ ] **Step 1: Open the file and locate the three bio paragraphs**

The bio lives at `portfolio-astro/src/components/About.astro:17-34` (the three `<p>` tags inside the first `.reveal` div with `data-delay="0.1s"`).

- [ ] **Step 2: Replace the three paragraphs**

Find the block:

```astro
<p style="font-size: 1.05rem; color: var(--fg); line-height: 1.85; margin-bottom: 24px;">
  I'm a DevOps and Cloud engineer designing and operating infrastructure
  that lets engineering teams ship faster and sleep better at night.
  My work sits at the intersection of infrastructure automation,
  cloud architecture, and security engineering.
</p>
<p style="font-size: 1.05rem; color: var(--fg-2); line-height: 1.85; margin-bottom: 24px;">
  I hold the <span style="color: var(--amber);">AWS Certified Solutions Architect – Associate</span> certification
  and work day-to-day at <a href="https://www.fundcraft.lu/" target="_blank" style="color: var(--fg); border-bottom: 1px solid var(--border-2); transition: border-color 0.2s;" onmouseover="this.style.borderColor='var(--amber)'" onmouseout="this.style.borderColor='var(--border-2)'">Fundcraft</a>,
  where I build and maintain the cloud infrastructure for a regulated fintech platform.
</p>
<p style="font-size: 1.05rem; color: var(--fg-2); line-height: 1.85;">
  Outside of work I run a full Kubernetes homelab on bare metal — Proxmox, K3s, TrueNAS —
  with a complete observability stack, self-hosted CI/CD, and a growing catalogue of
  personal projects. I believe the best way to understand a technology is to
  operate it in production, even if that production is your living room.
</p>
```

Replace it with:

```astro
<p style="font-size: 1.05rem; color: var(--fg); line-height: 1.85; margin-bottom: 24px;">
  I'm a DevOps engineer designing and operating the cloud infrastructure
  that lets engineering teams ship faster and sleep better.
  <span style="color: var(--amber);">AWS Certified Solutions Architect</span>, day job at
  <a href="https://www.fundcraft.lu/" target="_blank" style="color: var(--fg); border-bottom: 1px solid var(--border-2); transition: border-color 0.2s;" onmouseover="this.style.borderColor='var(--amber)'" onmouseout="this.style.borderColor='var(--border-2)'">Fundcraft</a>
  running a regulated fintech platform.
</p>
<p style="font-size: 1.05rem; color: var(--fg-2); line-height: 1.85; margin-bottom: 24px;">
  Right alongside the infra work, I'm deep in the AI side of engineering —
  running models locally, building agents, and rolling out coding assistants in production.
  I think the highest-leverage shift in our industry right now is thoughtful AI integration,
  and I want to be inside that loop, not watching it from the outside.
</p>
<p style="font-size: 1.05rem; color: var(--fg-2); line-height: 1.85;">
  Outside of work I run a full Kubernetes homelab on bare metal — Proxmox, K3s, TrueNAS —
  with a complete observability stack, self-hosted CI/CD, and a growing catalogue of
  personal projects (including <strong style="color: var(--fg); font-weight: 600;">Jarvis</strong>, my self-hosted assistant).
  I believe the best way to understand a technology is to operate it in production,
  even if that production is your basement.
</p>
```

- [ ] **Step 3: Build verification**

Run: `cd portfolio-astro && npm run build`
Expected: exits 0.

- [ ] **Step 4: Dev-server visual verification**

Run: `cd portfolio-astro && npm run dev` (skip if already running).
Open `http://localhost:4321/`. Scroll to About section. Verify:
- Three paragraphs read with new AI co-headline content
- "AWS Certified Solutions Architect" is amber
- "Fundcraft" is a link with hover effect
- "Jarvis" appears bold/highlighted in paragraph 3
- "basement" (not "living room") appears in paragraph 3

- [ ] **Step 5: Commit**

```bash
git add portfolio-astro/src/components/About.astro
git -c commit.gpgsign=false commit -m "feat(portfolio): rewrite About bio to co-headline AI

Three paragraphs: DevOps + AWS, AI-side framing, homelab with
Jarvis namedrop. 'Basement' replaces 'living room'."
```

---

## Task 7: Add AI/LLM row to Skills

**Files:**
- Modify: `portfolio-astro/src/components/Skills.astro`

Eyebrow renumber happens in the cutover task (Task 8). This task only adds the new row to the data array.

- [ ] **Step 1: Open the file and locate the `skills` array**

`portfolio-astro/src/components/Skills.astro:2-35`. The array starts at line 2 (after the `---`).

- [ ] **Step 2: Prepend a new entry at the top of the array**

Find:

```astro
const skills = [
  {
    cat: 'Orchestration',
    items: ['Kubernetes', 'K3s', 'Docker', 'Helm', 'Traefik', 'cert-manager', 'Sealed Secrets'],
  },
```

Replace with:

```astro
const skills = [
  {
    cat: 'AI / LLM Engineering',
    items: ['Anthropic API', 'Claude Code', 'Cursor', 'Gemini CLI', 'Bedrock', 'Vertex AI', 'Kendra', 'Ollama', 'n8n', 'RAG', 'Agent orchestration'],
  },
  {
    cat: 'Orchestration',
    items: ['Kubernetes', 'K3s', 'Docker', 'Helm', 'Traefik', 'cert-manager', 'Sealed Secrets'],
  },
```

- [ ] **Step 3: Build verification**

Run: `cd portfolio-astro && npm run build`
Expected: exits 0.

- [ ] **Step 4: Dev-server visual verification**

Open `http://localhost:4321/`. Scroll to Skills section. Verify:
- "AI / LLM Engineering" row appears first
- 11 items render in the row (Anthropic API · Claude Code · Cursor · ...)
- Existing rows (Orchestration, IaC, Cloud, etc.) still display correctly underneath
- The row uses the same visual styling as the other skill rows

- [ ] **Step 5: Commit**

```bash
git add portfolio-astro/src/components/Skills.astro
git -c commit.gpgsign=false commit -m "feat(portfolio): prepend AI/LLM Engineering row to Skills"
```

---

## Task 8: Atomic cutover — wire everything together

**Files:**
- Modify: `portfolio-astro/src/components/Sidebar.astro`
- Modify: `portfolio-astro/src/components/Homelab.astro`
- Modify: `portfolio-astro/src/components/Skills.astro` (eyebrow only)
- Modify: `portfolio-astro/src/components/Projects.astro` (eyebrow only)
- Modify: `portfolio-astro/src/components/Learning.astro` (eyebrow only)
- Modify: `portfolio-astro/src/components/Contact.astro` (eyebrow only)
- Modify: `portfolio-astro/src/pages/index.astro` (import + reorder)

This is the cutover task. After this task lands, the new 11-section site is live. Every step is small but they're sequenced so the build never breaks mid-task.

- [ ] **Step 1: Update Sidebar tagline and nav items**

Open `portfolio-astro/src/components/Sidebar.astro`.

**1a.** Find the `navItems` array at the top (lines 2-9):

```astro
const navItems = [
  { href: '#about',    label: 'About' },
  { href: '#learning', label: 'Learning' },
  { href: '#skills',   label: 'Skills' },
  { href: '#homelab',  label: 'Homelab' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact',  label: 'Contact' },
];
```

Replace with:

```astro
const navItems = [
  { href: '#about',        label: 'About' },
  { href: '#homelab',      label: 'Homelab' },
  { href: '#jarvis',       label: 'Jarvis' },
  { href: '#app-factory',  label: 'App Factory' },
  { href: '#dockyard',     label: 'Dockyard' },
  { href: '#now',          label: 'Now' },
  { href: '#skills',       label: 'Skills' },
  { href: '#work',         label: 'Work' },
  { href: '#projects',     label: 'Projects' },
  { href: '#learning',     label: 'Learning' },
  { href: '#contact',      label: 'Contact' },
];
```

**1b.** Find the role text in the sidebar (line 29-31):

```astro
<div class="role-text">
  DevOps Engineer<br/>& Cloud Architect
</div>
```

Replace with:

```astro
<div class="role-text">
  DevOps Engineer,<br/>Cloud Architect &<br/>AI enthusiast
</div>
```

- [ ] **Step 2: Update Homelab eyebrow + add Jarvis cross-link**

Open `portfolio-astro/src/components/Homelab.astro`.

**2a.** Find the eyebrow (around line 19):

```astro
<span class="section-num">04 / Homelab</span>
```

Replace with:

```astro
<span class="section-num">02 / Homelab</span>
```

**2b.** Find the WIP note at the bottom (around line 117-121):

```astro
<!-- WIP note -->
<div class="reveal" data-delay="0.3s" style="margin-top: 24px;">
  <span class="font-mono" style="font-size: 0.75rem; letter-spacing: 0.06em; color: var(--fg-2);">
    ⌛ repo coming soon — still deciding what's safe to make public
  </span>
</div>
```

Replace with:

```astro
<!-- WIP note + Jarvis cross-link -->
<div class="reveal" data-delay="0.3s" style="margin-top: 24px; display: flex; gap: 24px; flex-wrap: wrap; align-items: center;">
  <span class="font-mono" style="font-size: 0.75rem; letter-spacing: 0.06em; color: var(--fg-2);">
    ⌛ repo coming soon — still deciding what's safe to make public
  </span>
  <a href="#jarvis" class="font-mono" style="font-size: 0.75rem; letter-spacing: 0.06em; color: var(--amber); text-decoration: none;">
    → The <code style="color: var(--amber);">openclaw</code> namespace runs Jarvis
  </a>
</div>
```

- [ ] **Step 3: Update Skills eyebrow**

Open `portfolio-astro/src/components/Skills.astro`. Find:

```astro
<span class="section-num">03 / Skills</span>
```

Replace with:

```astro
<span class="section-num">07 / Skills</span>
```

- [ ] **Step 4: Update Projects eyebrow**

Open `portfolio-astro/src/components/Projects.astro`. Find:

```astro
<span class="section-num">05 / Projects</span>
```

Replace with:

```astro
<span class="section-num">09 / Projects</span>
```

- [ ] **Step 5: Update Learning eyebrow**

Open `portfolio-astro/src/components/Learning.astro`. Find:

```astro
<span class="section-num">02 / Currently pursuing</span>
```

Replace with:

```astro
<span class="section-num">10 / Currently pursuing</span>
```

- [ ] **Step 6: Update Contact eyebrow**

Open `portfolio-astro/src/components/Contact.astro`. Find:

```astro
<span class="section-num">06 / Contact</span>
```

Replace with:

```astro
<span class="section-num">11 / Contact</span>
```

- [ ] **Step 7: Reorder `index.astro` to import and render all 11 sections**

Open `portfolio-astro/src/pages/index.astro`. Replace its entire content with:

```astro
---
import Layout from '../layouts/Layout.astro';
import About from '../components/About.astro';
import Homelab from '../components/Homelab.astro';
import Jarvis from '../components/Jarvis.astro';
import AppFactory from '../components/AppFactory.astro';
import Dockyard from '../components/Dockyard.astro';
import Now from '../components/Now.astro';
import Skills from '../components/Skills.astro';
import Work from '../components/Work.astro';
import Projects from '../components/Projects.astro';
import Learning from '../components/Learning.astro';
import Contact from '../components/Contact.astro';
---

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

- [ ] **Step 8: Build verification**

Run: `cd portfolio-astro && npm run build`
Expected: exits 0, generates `dist/index.html` with all 11 sections present. If a component path is wrong, the build will fail loudly — fix and re-run.

Sanity grep:

```bash
grep -c 'id="' portfolio-astro/dist/index.html
```

Expected: at least 11 (one per section, possibly more if internal elements use IDs).

- [ ] **Step 9: Dev-server visual verification**

Open `http://localhost:4321/` (restart dev server if it's been running through file changes — `Cmd+C` and `npm run dev` again from `portfolio-astro/`).

Walk the page top to bottom and verify:

1. **Sidebar** — tagline reads "DevOps Engineer, Cloud Architect & AI enthusiast" (3 lines). Nav has 11 items in order: About / Homelab / Jarvis / App Factory / Dockyard / Now / Skills / Work / Projects / Learning / Contact.
2. **About (`01 / About`)** — three paragraphs render with AI co-headline content, Jarvis namedrop visible.
3. **Homelab (`02 / Homelab`)** — eyebrow shows `02`. Footer has WIP note + new amber cross-link "→ The openclaw namespace runs Jarvis" linking to `#jarvis`.
4. **Jarvis (`03 / The agent`)** — title "Jarvis" with smaller mono "openclaw" subtitle below. Memory pull-quote, INTERFACE block (amber-bordered, prominent), 2×2 info grid (Lives/Thinks/Remembers/Talks), capability table (11 rows), italic closing.
5. **App Factory (`04 / Agent-built infrastructure`)** — title "App Factory.", tagline in serif italic amber, pitch paragraph, pipeline flow (5 nodes), deployment knobs table (5 rows), scope footnote, closing.
6. **Dockyard (`05 / Agent-first IDE (in progress)`)** — title "Dockyard.", fork acknowledgement paragraph, thesis pull-quote, Stack/Features 2-column block, italic closing about no download button yet.
7. **Now (`06 / Now`)** — title "Currently exploring.", 4 placeholder bullets with amber arrows.
8. **Skills (`07 / Skills`)** — eyebrow shows `07`. First row is "AI / LLM Engineering" with 11 items.
9. **Work (`08 / Work`)** — title "At Fundcraft.", two prose cards (Code-Medic + AI tooling steward).
10. **Projects (`09 / Projects`)** — eyebrow shows `09`. Existing 5 projects unchanged.
11. **Learning (`10 / Currently pursuing`)** — eyebrow shows `10`. Existing MSc + radar certs content unchanged.
12. **Contact (`11 / Contact`)** — eyebrow shows `11`. Existing email + tiles + CV download unchanged.
13. **Nav highlighting** — scroll through the page. The active sidebar link should change as each section enters viewport (handled by Layout.astro's IntersectionObserver — no manual wiring needed, just verify it works).
14. **Anchor scrolling** — click each sidebar nav item. Page should smooth-scroll to that section.
15. **Browser console** — open DevTools. No JS errors, no 404s on assets.

- [ ] **Step 10: Mobile viewport check**

In DevTools, switch to a mobile viewport (~390px wide). Verify:
- Sidebar collapses to mobile header with hamburger menu
- Mobile menu opens and lists all 11 nav items
- 2×2 grids in Jarvis and Dockyard collapse to single column
- Pipeline flow in App Factory collapses vertically
- Capability table rows in Jarvis collapse to stacked label-above-value
- No horizontal scroll

- [ ] **Step 11: Commit**

```bash
git add portfolio-astro/src/
git -c commit.gpgsign=false commit -m "feat(portfolio): wire new sections + renumber eyebrows + new sidebar

Atomic cutover to the 11-section layout. Sidebar tagline changes to
'DevOps Engineer, Cloud Architect & AI enthusiast'. Nav lists 11
sections. index.astro imports and renders in the new order. Eyebrows
renumbered: Homelab 02, Skills 07, Projects 09, Learning 10, Contact 11.
Homelab footer gets Jarvis cross-link."
```

---

## Task 9: Final pass — full-site review

**Files:** None (review-only)

This task exists to catch anything the per-task verifications missed. No code changes expected.

- [ ] **Step 1: Production-build smoke test**

```bash
cd portfolio-astro && npm run build && npm run preview
```

Open the preview URL Astro prints (usually `http://localhost:4322/`). Walk all 11 sections again. The preview server serves the production build, so this catches any dev-only oversights.

- [ ] **Step 2: Verify no orphaned imports or dead files**

Run:

```bash
grep -r "import Hero" portfolio-astro/src/
grep -r "import Nav " portfolio-astro/src/
```

Expected: no results (Hero.astro and Nav.astro were already unused; this confirms we haven't accidentally introduced an import of them).

Run:

```bash
ls portfolio-astro/src/components/
```

Expected components present: `About.astro`, `AppFactory.astro`, `CaptchaModal.astro`, `Contact.astro`, `Dockyard.astro`, `Hero.astro` (unused, can stay), `Homelab.astro`, `Jarvis.astro`, `Learning.astro`, `Nav.astro` (unused, can stay), `Now.astro`, `Projects.astro`, `Sidebar.astro`, `Skills.astro`, `Work.astro`.

- [ ] **Step 3: Check page title still resolves**

The Layout.astro `title` default is `Francesc Barnola — DevOps & Cloud Engineer`. Consider whether to update it to reflect the new positioning ("DevOps & AI"). This is a one-line tweak the owner may want — flag it but do not change without explicit approval.

If the owner approves, edit `portfolio-astro/src/layouts/Layout.astro` line 12:

```astro
title = 'Francesc Barnola — DevOps, Cloud & AI Engineer',
description = 'DevOps engineer specialising in cloud infrastructure, AI tooling, and security automation. AWS Certified Solutions Architect Associate.',
```

If owner wants this changed, commit:

```bash
git add portfolio-astro/src/layouts/Layout.astro
git -c commit.gpgsign=false commit -m "chore(portfolio): update page title and meta to co-headline AI"
```

Otherwise skip this step.

- [ ] **Step 4: Hand back to owner for content edits**

Two content items still need the owner's hand:

1. **`Now.astro` bullet text** — currently shipped with placeholder bullets. Owner reviews and edits to taste. If owner has nothing to change, the placeholders stand.
2. **(Optional) `Learning.astro` "current mindset" italic line** — currently reads *"Not sure which to tackle next — but I'll be tackling one of them."* — owner may want an AI-coloured replacement. Not in scope of this plan.

Report completion to the owner and surface these two items.

---

## Self-review notes

This plan was reviewed against the spec at `docs/superpowers/specs/2026-05-16-portfolio-ai-pivot-design.md` (commit `5af86b0`).

**Spec coverage check:**

- [x] §1 Sidebar — Task 8 Step 1
- [x] §2 About — Task 6
- [x] §3 Homelab — Task 8 Step 2 (eyebrow + Jarvis cross-link)
- [x] §4 Jarvis — Task 1
- [x] §5 App Factory — Task 2
- [x] §6 Dockyard — Task 3
- [x] §7 Now — Task 4
- [x] §8 Skills — Task 7 (new row) + Task 8 Step 3 (eyebrow)
- [x] §9 Work — Task 5
- [x] §10 Projects — Task 8 Step 4 (eyebrow only; no other change)
- [x] §11 Learning — Task 8 Step 5 (eyebrow only; no other change)
- [x] §12 Contact — Task 8 Step 6 (eyebrow only; no other change)
- [x] §12.5 Eyebrow renumbering — Task 8 Steps 3–6
- [x] §13 Layout / index page wiring — Task 8 Step 7

**Placeholder check:** Now.astro ships with placeholder bullet text by design — this is the spec's explicit owner-supplied-later content. No other placeholders.

**Type/naming consistency:**
- Section IDs are stable across files: `about`, `homelab`, `jarvis`, `app-factory`, `dockyard`, `now`, `skills`, `work`, `projects`, `learning`, `contact`.
- Sidebar `navItems` array hrefs match these IDs exactly.
- CSS class names used in new components (`info-2x2`, `cap-table`, `pipeline-grid`, `stack-grid`, `now-list`, `work-grid`) are scoped to their component files — no global naming collisions possible.
- All new components reuse existing global classes/vars (`section-wrap`, `section-eyebrow`, `section-num`, `section-title`, `reveal`, `font-mono`, `--bg`, `--amber`, etc.) consistently with existing components.

**Scope notes:**
- The Astro project (`portfolio-astro/`) is the only codebase touched. Legacy `index.html` / `index-matrix.html` / `js/`, `css/` at repo root are untouched per spec out-of-scope.
- No new dependencies introduced. No `package.json` changes.
- No global CSS changes — every new style is component-scoped.

---

## Plan complete

Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using `executing-plans`, batch execution with checkpoints.

Which approach?
