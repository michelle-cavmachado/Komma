# Metric Tile component — design

## Context

`Komma Design System.html` is a downloaded Artifact bundle: the actual page
content lives inside a single JSON blob (`__bundler/template`), so every edit
touches one giant line. Adding new components there compounds the problem.
Going forward, each component gets its own small, hand-authored HTML file
under `components-html/`, and the Design System hub links out to them instead
of embedding everything inline.

Metric Tile is the first component to move through this process. Today the
platform has three visibly different "metric tile" patterns, gathered from
three live screens:

1. **Grouped counts** (e.g. Clients overview: Clients / Requires Attention /
   Pending Card / Sync Error) — one bordered strip, segments divided by a
   thin internal rule, no per-segment border, no icons, no status.
2. **Standalone KPI cards** (e.g. Liquidity: Available Now / Lowest Point /
   Weeks to Cash Gap) — individually bordered cards with a gap between them,
   an info icon next to the label, a colored status dot in the top-right
   corner, and — inconsistently — the value text itself recolored to green
   for a qualitative answer ("No").
3. **Standalone benchmark cards** (e.g. Financial: Net Profit Margin / Return
   on Equity / Rate of Return / Asset Turnover Rate) — individually bordered
   cards with info + edit icons, a value, and a percentile range bar (P25 /
   Median / P75) with a colored marker showing where the current value sits.

`Komma Design System.html` itself also has a fourth, pre-existing "Metric
tiles" demo card in its Components section (`.metric`/`.m-lbl`/`.m-val`/
`.m-d`), built with placeholder data, not a live screen. It adds a fourth
footer shape not seen in the three live screens: a delta/trend line under the
value (e.g. "+12.4% vs LY", colored green/red for positive/negative). This
card is folded into the standardization below rather than treated separately.

## Goals

- One `MetricTile` component definition that covers all four patterns above,
  so new pages reuse it instead of re-inventing a card.
- Resolve the real inconsistencies found while comparing the patterns (see
  Decisions below), not just visually merge them as-is.
- Ship it as a standalone, framework-free HTML reference file that opens
  directly in a browser and links to the shared token file — no build step.

## Non-goals

- Migrating `komma-controlling.html` or any other live page to the new
  component — none of the current files in this repo render a metric tile
  today, so there is nothing to migrate yet.
- Preserving the old divergent variants for historical reference inside the
  new file. The audit lives in this spec and in conversation history; the
  component file only holds the standardized result.
- Rebuilding `Komma Design System.html`'s bundler format. The only touch to
  that file is adding a link to the new component page.

## Decisions

**Container has two valid variants, not one forced shape.**
"Grouped" (segmented strip, no per-tile border) and "standalone" (individual
bordered card) solve different problems — a scannable ribbon of related
counts vs. an individually addressable KPI with its own actions/tooltip —
and both stay as supported variants of the same component. Header and value
markup/styling are identical between them; only the outer container differs.

**The value text is always neutral; status lives only in an indicator.**
Today "Weeks to Cash Gap" recolors its value green for a qualitative answer,
while the benchmark cards never recolor their value even when it's bad (0.0%,
"Missing") — the signal there lives entirely in the marker on the range bar.
Standardized rule: the big number is always rendered in the neutral text
color. Semantic status (good/warning/critical) is communicated only through
a separate indicator — a status dot for simple health signals, or the
benchmark marker for percentile placement — never by recoloring the value
itself.

## Component shape

Single `MetricTile` with:

- **Container**: `grouped` (segment inside a shared bordered strip, divided
  by `--komma-divider`, no own radius) | `standalone` (own border using
  `--komma-border`, own radius using `--komma-radius-md`).
- **Header row**: label (caps, `--komma-text-secondary`) on the left; an
  optional icon cluster (info tooltip, edit action) and/or a status dot on
  the right. Same header markup regardless of container variant.
- **Value**: large, bold, always `--komma-text-primary`. Size follows the
  existing `--komma-metric-md/lg/xl` scale depending on density.
- **Footer** (slot): `caption` (small secondary-text line), `benchmark`
  (range bar with P25/Median/P75 labels and a colored position marker using
  the existing `--komma-status-*`/`--komma-benchmark-*` tokens), or `delta`
  (a trend line below the value — e.g. "+12.4% vs LY" — with an up/down
  arrow, colored `--komma-status-success` for positive and
  `--komma-status-critical` for negative; no live screen uses this yet, but
  it replaces the old placeholder demo's pattern so it isn't lost).

This was validated against a wireframe covering the three live-screen
patterns rebuilt with the shared header/value and the neutral-value rule;
approved as-is. The delta footer was added after that review, following the
existing-demo discovery below, and follows the same header/value rules by
construction — it did not need a separate visual pass.

## File layout

- New folder `components-html/`, sibling to `components/` (React reference
  files) and the existing top-level `.html` files.
- `components-html/metric-tile.html`: plain HTML, `<link rel="stylesheet"
  href="../komma-tokens.css">`, no inline token duplication, no build step.
  Contains only the final standardized component and its variants (grouped,
  standalone + dot, standalone + benchmark, standalone + delta, size
  variants) — not the old divergent examples.
- `Komma Design System.html`'s Components section has its existing "Metric
  tiles" demo card (placeholder data, superseded by this work) replaced with
  a link to `components-html/metric-tile.html`, so the hub has one source of
  truth instead of two. This is the only edit to the bundled file.
