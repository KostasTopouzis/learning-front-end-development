# Teaching Notes

## Preferences
- Ask questions in plain chat text. The user closed the multiple-choice dialog on the first try.
- Budget: 3–4 h/week. Lessons should take about 20–30 minutes and leave the rest of the week for building the portfolio piece.
- Likes quizzes, but every lesson must point at a concrete step on the current portfolio piece (P1–P4 in MISSION.md).
- Wants templates/starter models. P2 is designed to produce that template, and smaller snippets go in `reference/`.

- Uses Tailwind heavily and wants to go deeper with it. Every lesson: teach the CSS concept, then show the Tailwind equivalent (a column or an "In Tailwind" callout). Point out where Tailwind defaults (e.g. Preflight) hide CSS behaviour.

## Working notes
- Self-described level: "almost intermediate." CSS flex/grid is usable but feels like "something is missing from the whole picture." Lesson 0001 targets this directly (layout algorithms).
- Pain points to cover early: image handling, responsiveness, testing.
- Interested in all of: performance, testing, architecture/state, a11y, animation, design systems. Fold these into the portfolio pieces; don't run separate tracks.
- Teach the production tools as they are needed: ESLint/Prettier/Lighthouse in P1, then Storybook/Vitest/Playwright/CI in P2.
- Glossary (`reference/glossary.html`) is not created yet. Add terms only once the user has shown they understand them.

- 2026-11-23: User mixed up the parent's display (which picks the algorithm) with the child's outer display (block vs inline within Flow). They also tested `display: block` on a `<p>` and saw no change. Lesson 0001 now has an "extra rule for Flow" paragraph. Resolved the same day; see LR 0003. Still interleave one such question into Lesson 0002.

## Planned sequence (P1)
1. 0001 CSS layout algorithms (mental model)
2. Intrinsic vs extrinsic sizing, min/max-content, `min-width: auto` gotchas
3. Responsive images: `srcset`/`sizes`, `next/image`, LCP and CLS
4. Fluid type and spacing with `clamp()`, and container queries
5. Gradients and visual effects (layered backgrounds, `mask`, blend modes), with Tailwind arbitrary values and when to use custom CSS instead
5b. Tailwind v4 theming: `@theme` variables, custom utilities. This leads into the P2 design tokens.
6. P1 starter: Next.js + ESLint/Prettier + Lighthouse CI
