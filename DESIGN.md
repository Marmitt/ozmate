# OZMate Design Tokens — Notion × Duolingo, adapted

Adapted from the [Notion × Duolingo remix](https://raw.githubusercontent.com/rohitg00/awesome-claude-design/main/design-md/remix/notion-x-duolingo.md). Original DNA: Notion's warm document surface + Duolingo's saturated green and tactile feedback. OZMate keeps that backbone but swaps the secondary Duolingo signal colors (streak-orange, XP-blue) for warm ochre/terracotta earth tones, and warms the Notion neutrals from grey-beige toward sand — a subtle nod to Australia without literal iconography (no flags, no wildlife, no map shapes).

Brand feel: a knowledgeable mate helping you get sorted, not a government portal. Warm, tactile, plain-spoken. Avoid anything that reads corporate, clinical, or bureaucratic.

## 1. Visual Theme & Atmosphere

Notion still sets the writing surface for guides — warm sand, brown-black text, generous reading column, restrained chrome. Duolingo's leaf green still drives the checklist mechanic — CTAs, progress, tick-offs — because ticking off "First 30 Days" items should feel satisfying the same way a Duolingo lesson does. In place of Duolingo's gamified streak/XP colors, OZMate uses ochre and terracotta: earth tones for tags, callouts, and secondary emphasis across guides and the group directory.

Mood: warm, grounded, encouraging — never gamified, never institutional.

## 2. Color Palette & Roles

```
/* document base: bright warm sand ("Lime Pop" palette, v2) */
--bg:              #fffefc
--bg-alt:          #fdf9ee
--surface:         #f6efd9
--text:            #362e24
--text-muted:      #766b59
--text-dim:        #a89a84
--border:          #ece2c5
--border-strong:   #d7c498

/* fixed dark text for content on top of --accent, see Contrast rules below */
--on-accent:       #362e24

/* progress + CTA: bright lime-green, kept from Duolingo (checklist tick-off mechanic) */
--accent:          #8ed928
--accent-hover:    #7bc720
--accent-deep:     #245f28
--accent-soft:     #eef9d9
--accent-text:     #245f28

/* earth-tone secondary accents — replaces Duolingo's streak/XP signal colors */
--ochre:           #c68a2e
--ochre-soft:      #f5e6c8
--terracotta:      #bd5b34
--terracotta-soft: #f3ddd0

/* error / destructive state — warmed red, kept distinct from terracotta so real errors stay legible */
--danger:          #c2452f

/* dark mode — warm, not pitch */
--bg-dark:         #241f18
--surface-dark:    #332b1f
--text-dark:       #f0e6d6
--border-dark:     #40382a
```

Arbitration:
- Leaf green (`--accent`) owns CTAs, checklist progress, and tick-off states, untouched. It's the one Duolingo borrow the product depends on. Brightened from the original `#58cc02` to `#8ed928` (v2, "Lime Pop") for a more energetic, less muted feel. See `--accent` history below.
- Ochre and terracotta replace streak-orange and XP-blue. OZMate isn't gamified (no streaks, no XP, no lessons) — these tones instead cover tags/category chips, guide callouts ("heads up", "worth knowing"), and directory badges. Two tones, not one, so callouts and chips can be visually distinct without introducing a third unrelated hue.
- `--danger` stays a warmed red rather than folding into terracotta — error states need to read unambiguously as "wrong," and terracotta is too close to ochre/warm-neutral to carry that alone.
- Document neutrals shift from Notion's cool grey-beige to sand, so the earth-tone motif is present even in structural chrome (borders, surfaces), not just accent moments. `--border`/`--border-strong` were relightened in v2 alongside `--surface` so structural chrome doesn't read heavier than the brighter document base around it.

### Contrast rules for `--accent` (read this before touching accent colors)

`--accent` is a bright, light-toned fill in both color schemes, and it has no dark-mode override, unlike most other tokens. That asymmetry matters for anything drawn on top of it:

- **Button/CTA text on `--accent` fill:** use `--on-accent`, never `--text` and never a literal `white`. `--text` flips polarity in dark mode (dark charcoal to light cream) to suit the *page* background, but `--accent` doesn't flip with it, so light cream text on a light lime fill is close to invisible (verified ~1.4:1). `--on-accent` is intentionally fixed with no dark override, so it stays legible against the fill in both modes. Verified 7.70:1 in both schemes.
- **Text on `--accent-soft` fill (badges), or green text sitting directly on the page (links, "source" citations):** use `--accent-text`, not `--accent-deep`. `--accent-text` *does* have a dark-mode override (`#7ed957`); `--accent-deep` does not, so reusing it for text produced badges/links well under 3:1 in dark mode. `--accent-deep` should stay reserved for decorative, non-text uses (tactile button shadow, chip borders) where dark-mode contrast doesn't apply.
- Any new component putting text on `--accent` or `--accent-soft` should follow this pattern. Don't reintroduce `--accent-deep` or literal `white` for that purpose.

## 3. Typography Rules

- **Display / h1:** Inter Display, weight 700, 40px+.
- **h2–h4:** Inter, weight 600 / 700.
- **Body:** Inter, weight 400, 16/26. Document-feel, not chat-feel.
- **UI labels + buttons + numerals:** Inter, weight 600. Never thin weights on CTAs.

Scale: 12 / 14 / 16 / 18 / 20 / 24 / 32 / 40 / 56.

No serif. Sans wins for a plain-spoken, practical-guide tone.

## 4. Component Stylings

**Button (primary CTA)**
- Radius 16, padding 14/24, weight 700.
- Fill `--accent`, text `--on-accent` (fixed dark, see Contrast rules in §2; not `white`/`--text`), weight 700.
- Tactile bottom shadow: `0 4px 0 0 var(--accent-deep)`. Pressed state shifts to `0 0 0 0` and translateY(2px).

**Button (secondary)**
- Same geometry. Transparent fill, 2px `--border-strong`, `--text` color, weight 700.
- Bottom shadow: `0 4px 0 0 var(--border-strong)`. Same pressed behavior.

**Card / guide tile**
- `--bg-alt` fill, 1px `--border`, radius 12.
- Hover: `--surface` fill, 1px `--border-strong`. No tactile shadow on cards — only on buttons.

**Input**
- 1px `--border`, radius 8, padding 10/14.
- Focus: 2px `--accent` ring, 2px offset.

**Progress bar** (checklist completion)
- Track: `--surface`, height 12, radius 999.
- Fill: `--accent`, radius 999. Inner highlight `rgba(255,255,255,0.32)` top 4px.

**Tag / category chip**
- Pill, radius 999, padding 6/12, weight 700.
- Fill `--ochre-soft`, text `--ochre` at a darkened shade for contrast (`#8f6620`), border 1px `--ochre`.

**Callout / tip block** (guide content — "heads up", sourcing notes)
- Left border 3px `--terracotta`, fill `--terracotta-soft`, radius 8, padding 12/16.
- Not used for errors — use `--danger` for those instead.

**Verified badge** (group directory)
- Pill, radius 999, padding 4/10, weight 700, small caps or icon + text.
- Fill `--accent-soft`, text `--accent-text` (not `--accent-deep`; see Contrast rules in §2). Ties "verified" to the same trust-green as progress, since it's the same kind of trust signal.

**Theme toggle** (persistent, all pages)
- 3-way segmented pill: Auto, Light, Dark. Radius 999, padding 4/10, weight 700, matches the tag/chip family sizing.
- Fill `--bg-alt`, border 1px `--border`. Active option: `--accent-soft` fill, `--accent-text` text. Inactive options: `--text-muted`, hover `--surface`.
- Fixed `bottom-4 right-4`, above page content, on every page via the root layout.
- Backed by `data-theme="light"|"dark"` on `<html>`, set via `localStorage` (`ozmate.theme.v1`) and a `beforeInteractive` inline script so there is no flash of the wrong theme on load. Auto means no explicit override, so the page follows the OS `prefers-color-scheme`.

**Document surface**
- Reading column — 720px, 16px body, 1.6 line-height, callouts in `--terracotta-soft` per above.

## 5. Layout Principles

Two zones per page.

**Reading / guide content**
- 720px max, centered, 16px body.

**Checklist / directory (interactive lists)**
- 480px centered card stack on desktop, full-width on mobile, generous 32px+ padding inside cards.

App shell: 1180px max, 240px nav rail (collapses to bottom tab bar on mobile per OZMate's mobile-first requirement), 8px base scale (8 / 16 / 24 / 32 / 48 / 64 / 96).

## 6. Depth & Elevation

Two depth modes.

- Document surfaces: flat, border-only.
- Interactive controls (buttons, checklist items): tactile bottom-shadow depth.

Cards stay flat. Modals: `0 20px 48px rgba(54,46,36,0.18)`. No glass, no blur.

## 7. Do's and Don'ts

**Do**
- Reserve tactile bottom-shadow for buttons and checklist items only.
- Use leaf green for CTAs and progress, never decoration.
- Use ochre for tags/chips, terracotta for callouts — keep the two distinct roles, don't swap them interchangeably.
- Keep `--danger` for actual error/destructive states only — don't dilute it into general "attention" use, that's what terracotta is for.
- Body in Inter 16px, document-style line-height 1.6.

**Don't**
- Apply tactile shadow to cards — kills the document feel.
- Introduce streak counters, XP, or any gamification mechanic — OZMate is a survival guide, not a language app. If it starts to feel like a game, back off.
- Use literal Australian iconography (flags, wildlife, map outlines) to "reinforce" the earth-tone palette — the tones should evoke place on their own, not be paired with literal symbols.
- Reach for cool blue/grey institutional palettes anywhere, even for informational/neutral UI — that's the "government portal" feel to avoid.
- Use serif body.

## 8. Responsive Behavior

- Reading column padding-only below 768px.
- Checklist/directory card stack: full-width with 16px gutter on mobile.
- Nav rail collapses to bottom tab bar at 768px.
- Tactile button shadow scales to `0 3px 0 0` at < 480px.
- Tag/callout blocks stay full-width on mobile, no shrinking below 14px text.

## 9. Agent Prompt Guide

Bias: warm sand document base, Inter throughout, leaf green for CTAs/progress/checklist ticks only, ochre for tags and chips, terracotta for callouts and tips, warmed red confined to real error states, tactile bottom-shadow on buttons and checklist items (`0 4px 0 0` style), 720px reading column for guides, 480px card stack for checklist/directory, rounded radius 12–16 on interactive elements.

Reject: serif body, tactile shadows on cards, any mascot or literal Australian iconography, streak/XP gamification patterns, cool blue/grey institutional color use, button radius < 12, thin font weights on CTAs, glass / blur / drop shadows on cards, terracotta used as a stand-in for error states.

## Creative Tensions (documented for team)

- **Friendly vs serious.** Duolingo can read as childish if pushed too far; Notion can read as cold if held too rigid. Resolution: Notion owns documents, Duolingo's green owns interactions — never mix on the same surface.
- **Tactile button on a document card.** Tempting and wrong. The tactile move is for things you press / tick off / commit. Cards are for reading.
- **Earth tones vs literal "Australiana."** Ochre/terracotta are meant to evoke place subtly. The moment someone reaches for a flag, an outline of the continent, or a kangaroo silhouette "to make it more Aussie," that's a regression — the palette should carry the feeling without the imagery.
- **Warm mate vs government portal.** Visa/legal-adjacent content is exactly where the instinct to go clinical/institutional (cool greys, blues, dense tables) is strongest — resist it. Keep the warm document surface even on the driest content; let plain language do the "serious" work, not cold color.

## Adaptation notes (from source remix)

Kept from Notion × Duolingo as-is: leaf green accent family, tactile bottom-shadow buttons, button radius 16, weight 700 CTAs, progress bar pattern, Inter typography, 720px reading column, card radius 12, warm-not-pitch dark mode.

Changed for OZMate: document neutrals warmed from grey-beige to sand; streak-orange and XP-blue retired (no gamification mechanic in-product) and replaced with `--ochre` / `--terracotta` earth tones covering tags, callouts, and directory badges; danger red warmed but kept semantically distinct from terracotta; layout zone labels reframed from "lesson/practice" to "guide/checklist" to match OZMate's actual content types.

## Palette history

- **v1** (initial adaptation): `--accent: #58cc02`, `--bg-alt: #faf5ec`, `--surface: #f0e6d6`. Direct Duolingo leaf-green borrow on a tan-leaning sand base.
- **v2** ("Lime Pop", current): brightened `--accent` to `#8ed928` and lifted `--bg-alt`/`--surface`/`--border`/`--border-strong` toward a lighter, less-tan cream. Feedback was that v1 read too dark and heavy, especially the green and the background. Also introduced `--on-accent` and shifted badge/link text from `--accent-deep` to `--accent-text`, fixing a dark-mode contrast failure that predated this change (see Contrast rules in §2) and would have gotten worse with the brighter accent.
- All v2 pairings were re-verified against WCAG AA (4.5:1 normal text, 3:1 large text/UI) using the standard relative-luminance contrast formula in §2.
