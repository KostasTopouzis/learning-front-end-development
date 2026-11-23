Any element can be switched between inline and block. What you're seeing is that `display: block` on a `<p>` doesn't change anything. There are two reasons this can happen, and the second one connects straight to the lesson.

1. `<p>` is already block.
Every browser ships a default stylesheet that sets `p { display: block; }`, along with `margin: 1em 0`. So your rule is applied, but it sets the value the element already had. To confirm, open DevTools → Elements → Computed, select the `<p>`, and look at display. It says `block` with or without your rule.

To actually see an inline element become block, try a `<span>`:

```html
<p>Some text <span style="display: block">I'm on my own line now</span> more text</p>
```

The span drops onto its own line and stretches to full width. Inline → block works fine.

2. **If the `<p>` is inside a flex or grid parent, the parent is in charge.**
For example, this is the case in the Flexbox preset of playground 2. A child's `display` value has two jobs:

- **Outer**: how the element sits among its siblings.
- **Inner**: how it lays out its own children.

When the parent is `flex` or `grid`, the parent's algorithm decides the outer part. The spec converts flex and grid items to block-level boxes anyway, a step it calls "blockification". So `display: block` vs `inline` on a flex item makes no visible difference to where it sits.

What still matters on a flex item is the inner part. For example, `display: grid` on a flex item changes how its *children* are laid out.

Try it in playground 2's Flexbox preset:

```html
.a { display: inline; }   /* no visible change: still a flex item */
```

Now switch to the Flow preset and add the same line. `.a` becomes inline and its padding and margins behave like text.

That's the lesson's main point again: an element's position is decided by its parent's algorithm, not by its own `display`.

Quick check: before you open DevTools, predict the computed `display` of an `<img>` in a Tailwind project, and of a `<span>` that's a direct child of a `flex` container. Tell me your predictions.

---

**Q**: If a p element is a block element, then in question 5 of the lesson, how come the correct answer is no. 2? Shouldn't the width become 200px instead of being ignored?

The width is on the `<span>`, not on the `<p>`. And the `<p>` being block doesn't make the span block.

The two elements play different roles:

```html
<p>                                       ← parent: block
  Some text
  <span style="width: 200px">hi</span>    ← child: inline (span's default)
</p>
```

1. **The `<p>` decides which algorithm its children use**. It's `display: block`, so its children are laid out with **Flow**.
2. **Flow handles two kinds of children differently**, depending on the child's *own* outer display:
   - **Block children** (`<div>`, `<p>`, …) stack vertically and respect `width` and `height`.
   - **Inline children** (`<span>`, `<a>`, `<strong>`, …) flow along the line like words. Flow sizes them by their content, so `width` and `height` don't apply. <sup>MDN: inline-level content</sup>

So the parent being block only tells you **which algorithm** is used. Inside Flow, the child's own type still matters, and a span is inline. That's why the width is ignored.

This also adds a detail to my previous answer:

┌────────────────────┬───────────────────────────────────────────────────────────────┐
│ Parent's algorithm │   Does the child's own outer display (`block`/`inline`) matter?   │
├────────────────────┼───────────────────────────────────────────────────────────────┤
│ **Flow**               │ **Yes.** Block and inline children are laid out very differently. │
├────────────────────┼───────────────────────────────────────────────────────────────┤
│ **Flexbox / Grid**     │ **No.** Every child is blockified into a flex or grid item.       │
└────────────────────┴───────────────────────────────────────────────────────────────┘

You can see this directly in DevTools. Put that snippet in a page, then try:

- `span { display: inline-block; }`: the span stays in the line of text, but now respects `width: 200px`.
- `span { display: block; }`: it gets 200px, but drops onto its own line.
- `p { display: flex; }`: the span becomes a flex item and gets 200px, even though it's still `inline`.

---

**Q**: a `<div>` sits inside a `<span>`, and the span sits inside a `<p>`. Which algorithm lays out the div? Does `width: 200px` on the div take effect?

**A**: A span is inline, so the inline algorithm lays out the div. The div's width is 200px and since it is a block element, it renders in 200px.

Your conclusion is right: the div renders at 200px. One correction to the reasoning, and one surprise you'll run into in Next.js.

**Correction: there's no "inline algorithm."**

Inline isn't an algorithm of its own. It's one of the two kinds of boxes that **Flow** handles. `display: inline` actually means "inline on the outside, **flow** on the inside" (written `display: inline flow`). <sup>MDN: display</sup> So the span's children are laid out with **Flow**. The div is a block child inside Flow, so it respects `width: 200px`. The second half of your reasoning is exactly right.

**Surprise: in real HTML this structure never exists.**

Try it in a plain `.html` file and inspect the DOM:

```html
<p><span><div>hi</div></span></p>
```

The HTML parser sees a `<div>` start tag while a `<p>` is open, and it closes the `<p>` first. <sup>HTML spec: parsing "in body"</sup> The resulting DOM is roughly:

```html
<p><span></span></p>
<div>hi</div>
<p></p>
```

This matters for you because of **hydration errors in Next.js**:

- On the server, the HTML string gets parsed this way, so the div ends up outside the `<p>`.
- In the browser, React expects the div inside the `<p>`.
- The two trees don't match, and you get an error like "`<div>` cannot be a descendant of `<p>`".

So the rule is: a `<p>` may only contain inline content (phrasing content). If you need a box inside text, use a `<span>` with `block` or `inline-block`.
