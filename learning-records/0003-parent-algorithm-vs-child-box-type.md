# Distinguishes parent's algorithm from child's box type in Flow

The user now separates two things: the parent's `display`, which picks the algorithm, and the child's own outer display (block vs inline), which matters *inside* Flow. They correctly predicted that a block `div` nested in an inline `span` respects `width: 200px`. One leftover imprecision: they called inline "the inline algorithm". It was corrected: inline is a box type within Flow (`display: inline` = `inline flow`).

**Evidence**: 2026-11-23. Confused at first (asked why `width` on a span in a block `<p>` is ignored), then answered the div-in-span check correctly after the explanation.

**Implications**: ready for intrinsic sizing (Lesson 0002). Also introduced: the HTML parser closes `<p>` on a block start tag, which causes Next.js hydration errors. Revisit this when P1 components are built. Keep interleaving one "which algorithm / which box type" question into upcoming quizzes for spacing.
