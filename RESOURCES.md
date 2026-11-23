# Advanced Frontend Development Resources

## Knowledge

### CSS & layout
- [Article: "Understanding Layout Algorithms" by Josh W. Comeau](https://www.joshwcomeau.com/css/understanding-layout-algorithms/)
  Argues that CSS properties are inputs to layout algorithms (Flow, Flexbox, Grid, Positioned…). Use for: the core CSS mental model and the "magic space under images" case.
- [Article: "An Interactive Guide to Flexbox" by Josh W. Comeau](https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/)
  How flex-basis, grow and shrink actually work. Use for: flex items that won't shrink or grow as expected.
- [MDN: Introduction to formatting contexts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_display/Introduction_to_formatting_contexts)
  The spec-level vocabulary (block/inline/flex/grid formatting contexts). Use for: precise definitions.
- [MDN: Mastering margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing)
  When vertical margins merge. Use for: unexpected spacing between blocks.
- [web.dev: Learn CSS](https://web.dev/learn/css) and [Learn Responsive Design](https://web.dev/learn/design)
  Free, Chrome-team courses. Use for: structured coverage of layout, responsive design, container queries.

### Tailwind CSS
- [Tailwind CSS docs](https://tailwindcss.com/docs)
  Official docs (v4). Use for: utilities, `@theme` variables, custom utilities and variants.
- [Tailwind docs: Preflight](https://tailwindcss.com/docs/preflight)
  The base reset Tailwind injects. Use for: explaining why a CSS behaviour differs in Tailwind projects.

### Images & performance
- [web.dev: Learn Images (Mat Marquis)](https://web.dev/learn/images/)
  The most thorough course on responsive images (`srcset`, `sizes`, `<picture>`, formats). Use for: P1 image handling.
- [Next.js docs: Image component](https://nextjs.org/docs/app/api-reference/components/image)
  Use for: `next/image` props (`sizes`, `priority`, `fill`).
- [web.dev: Core Web Vitals](https://web.dev/articles/vitals)
  LCP, INP, CLS definitions and thresholds. Use for: performance benchmarks of every piece.

### Testing
- [Article: "The Testing Trophy and Testing Classifications" by Kent C. Dodds](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)
  Static → unit → integration → E2E, and why integration tests get the most weight. Use for: deciding what to test.
- [Next.js docs: Testing (Vitest, Playwright)](https://nextjs.org/docs/app/guides/testing)
  Official setup guides. Use for: wiring tests into the P2 template.
- [Testing Library docs](https://testing-library.com/docs/)
  Query priorities and the user-centric testing philosophy. Use for: component tests.

### React / Next.js
- [react.dev](https://react.dev/learn)
  Official docs. Use for: anything React; prefer over blog posts.
- [Next.js docs](https://nextjs.org/docs)
  Official docs. Check the version selector.

### DevTools
- [Chrome DevTools: Inspect and debug flexbox](https://developer.chrome.com/docs/devtools/css/flexbox) / [grid](https://developer.chrome.com/docs/devtools/css/grid)
  Use for: diagnosing layout in the browser.

## Wisdom (Communities)

- [Frontend Mentor (community + Discord)](https://www.frontendmentor.io/community)
  Large, feedback-focused community built around real design challenges. Use for: code and portfolio review of P1–P4.
- [r/Frontend](https://www.reddit.com/r/Frontend/)
  General frontend discussion. Use for: industry pulse and tooling opinions.
- [freeCodeCamp forum](https://forum.freecodecamp.org/)
  Friendly to beginners and juniors, with many "is my portfolio job-ready?" threads. Use for: honest portfolio feedback.

## Gaps
- Animation (Motion, scroll-driven animations, View Transitions): sources not yet vetted. Needed before P4.
- Design systems / tokens: sources not yet vetted. Needed before P2.
- Junior frontend interview preparation: no vetted source yet.
