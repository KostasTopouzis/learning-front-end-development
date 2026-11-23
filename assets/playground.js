/* ==========================================================================
   playground.js: live, isolated CSS playground with presets and measurements.

   Markup:
   <div class="playground" data-playground data-measure="size:.child; gap:.a,.b">
     <template data-html>  …demo markup…  </template>
     <template data-preset="Flow">  …css…  </template>
     <template data-preset="Flexbox">  …css…  </template>
   </div>
   <script src="../assets/playground.js"></script>

   - The first preset loads on start. The CSS stays editable in the textarea.
   - The preview renders in a Shadow DOM, so lesson styles don't leak in.
   - data-measure (optional, ";"-separated):
       size:SELECTOR       → rendered width × height of the first match
       gap:SEL_A,SEL_B     → vertical distance from A's bottom edge to B's top edge
   ========================================================================== */
(function () {
  const css = `
  .playground { margin: 1.8rem 0; border: 1px solid var(--rule); border-radius: 8px; overflow: hidden; background: var(--surface); }
  .pg-bar { display: flex; flex-wrap: wrap; gap: .4rem; align-items: center; padding: .6rem .8rem; border-bottom: 1px solid var(--rule); }
  .pg-bar .pg-label { font-family: var(--sans); font-size: .7rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); margin-right: .3rem; }
  .pg-body { display: grid; grid-template-columns: 1fr; }
  @media (min-width: 760px) { .pg-body { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); } }
  .pg-css { font-family: var(--mono); font-size: .8rem; line-height: 1.5; border: 0; padding: .8rem 1rem; min-height: 14rem;
    background: var(--code-bg); color: var(--ink); resize: vertical; tab-size: 2; width: 100%; }
  .pg-css:focus { outline: 2px solid var(--accent); outline-offset: -2px; }
  .pg-preview { padding: 1rem; background: #fff; color: #111; overflow: auto; min-height: 14rem; }
  .pg-readout { font-family: var(--mono); font-size: .78rem; padding: .5rem 1rem; border-top: 1px solid var(--rule); color: var(--muted); min-height: 2rem; }
  .pg-readout b { color: var(--accent); font-weight: 600; }
  @media print { .pg-bar { display: none; } }`;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const BASE = `:host { all: initial; display: block; font: 15px/1.5 system-ui, sans-serif; color: #111; }
  *, *::before, *::after { box-sizing: border-box; }`;

  document.querySelectorAll("[data-playground]").forEach((pg) => {
    const html = pg.querySelector("template[data-html]")?.innerHTML ?? "";
    const presets = [...pg.querySelectorAll("template[data-preset]")].map((t) => ({
      name: t.dataset.preset, css: dedent(t.content.textContent),  // textContent: no &gt; escaping
    }));
    const measures = (pg.dataset.measure || "").split(";").map((s) => s.trim()).filter(Boolean);

    pg.innerHTML = `
      <div class="pg-bar"><span class="pg-label">Try</span></div>
      <div class="pg-body">
        <textarea class="pg-css" spellcheck="false" aria-label="Editable CSS"></textarea>
        <div class="pg-preview"></div>
      </div>
      <div class="pg-readout" aria-live="polite"></div>`;

    const bar = pg.querySelector(".pg-bar");
    const ta = pg.querySelector(".pg-css");
    const host = pg.querySelector(".pg-preview");
    const readout = pg.querySelector(".pg-readout");
    const root = host.attachShadow({ mode: "open" });
    root.innerHTML = `<style>${BASE}</style><style data-user></style><div class="pg-root">${html}</div>`;
    const userStyle = root.querySelector("style[data-user]");

    const buttons = presets.map((p, i) => {
      const b = document.createElement("button");
      b.className = "btn"; b.type = "button"; b.textContent = p.name;
      b.addEventListener("click", () => load(i));
      bar.appendChild(b);
      return b;
    });
    if (!presets.length) bar.remove();

    function load(i) {
      ta.value = presets[i].css;
      buttons.forEach((b, j) => b.setAttribute("aria-pressed", String(i === j)));
      render();
    }

    function render() {
      userStyle.textContent = ta.value;
      requestAnimationFrame(measure);
    }

    function measure() {
      if (!measures.length) { readout.remove(); return; }
      readout.innerHTML = measures.map((m) => {
        const [kind, arg] = m.split(":").map((s) => s.trim());
        if (kind === "size") {
          const el = root.querySelector(arg);
          if (!el) return `${arg}: —`;
          const r = el.getBoundingClientRect();
          return `${arg} → <b>${Math.round(r.width)} × ${Math.round(r.height)}px</b>`;
        }
        if (kind === "gap") {
          const [a, b] = arg.split(",").map((s) => root.querySelector(s.trim()));
          if (!a || !b) return `gap: —`;
          const g = b.getBoundingClientRect().top - a.getBoundingClientRect().bottom;
          return `space between ${arg.replace(",", " and ")} → <b>${Math.round(g)}px</b>`;
        }
        return "";
      }).join(" &nbsp;·&nbsp; ");
    }

    ta.addEventListener("input", render);
    ta.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const { selectionStart: s, selectionEnd: en } = ta;
        ta.setRangeText("  ", s, en, "end");
        render();
      }
    });
    new ResizeObserver(() => requestAnimationFrame(measure)).observe(host);
    if (presets.length) load(0); else render();
  });

  function dedent(s) {
    const lines = s.replace(/^\n+|\s+$/g, "").split("\n");
    const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
    return lines.map((l) => l.slice(indent)).join("\n") + "\n";
  }
})();
