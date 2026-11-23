/* ==========================================================================
   quiz.js: reusable multiple-choice quiz with instant feedback.

   Markup:
   <section class="quiz" data-quiz>
     <div class="q" data-answer="2">           <!-- 1-based index of correct option -->
       <p class="prompt">Question text</p>
       <button class="opt">Option one</button>
       <button class="opt">Option two</button>
       <div class="explain">Shown after answering.</div>
     </div>
     …
   </section>
   <script src="../assets/quiz.js"></script>

   The first click counts toward the score (retrieval practice). After that the
   learner can still click around to explore the other options.
   ========================================================================== */
(function () {
  const css = `
  .quiz { margin: 2rem 0; }
  .quiz .q { border: 1px solid var(--rule); border-radius: 8px; padding: 1rem 1.1rem 1.1rem; margin: 0 0 1.1rem; }
  .quiz .q-num { font-family: var(--sans); font-size: .7rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }
  .quiz .prompt { margin: .2rem 0 .8rem; }
  .quiz .prompt pre { margin: .6rem 0 0; font-size: .95em; }
  .quiz .opt { display: block; width: 100%; text-align: left; font: inherit; font-size: .95rem; color: var(--ink);
    background: var(--bg); border: 1px solid var(--rule); border-radius: 6px; padding: .55rem .8rem; margin: .4rem 0; cursor: pointer; }
  .quiz .opt:hover { border-color: var(--muted); }
  .quiz .opt.correct { background: var(--good-soft); border-color: var(--good); }
  .quiz .opt.wrong { background: var(--bad-soft); border-color: var(--bad); }
  .quiz .explain { display: none; margin-top: .8rem; font-size: .92rem; padding: .7rem .9rem; border-radius: 6px; background: var(--surface); }
  .quiz .explain > :last-child { margin-bottom: 0; }
  .quiz .q.answered .explain { display: block; }
  .quiz .verdict { font-family: var(--sans); font-weight: 700; font-size: .8rem; }
  .quiz .score { font-family: var(--sans); font-size: .9rem; padding: .8rem 1rem; border-radius: 8px; background: var(--surface); }
  .quiz .score[hidden] { display: none; }
  .quiz .reset { margin-top: .6rem; }
  @media print { .quiz .explain { display: block; } }`;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  document.querySelectorAll("[data-quiz]").forEach((quiz) => {
    const qs = [...quiz.querySelectorAll(".q")];
    let firstTry = 0, answered = 0;

    const score = document.createElement("div");
    score.className = "score";
    score.hidden = true;
    score.setAttribute("aria-live", "polite");
    quiz.appendChild(score);

    qs.forEach((q, i) => {
      const label = document.createElement("div");
      label.className = "q-num";
      label.textContent = `Question ${i + 1} of ${qs.length}`;
      q.prepend(label);

      const correct = Number(q.dataset.answer);
      const opts = [...q.querySelectorAll(".opt")];
      const verdict = document.createElement("div");
      verdict.className = "verdict";
      verdict.setAttribute("aria-live", "polite");
      q.querySelector(".explain")?.prepend(verdict);

      opts.forEach((opt, j) => {
        opt.type = "button";
        opt.addEventListener("click", () => {
          const isRight = j + 1 === correct;
          if (!q.classList.contains("answered")) {
            q.classList.add("answered");
            answered++;
            if (isRight) firstTry++;
            verdict.textContent = isRight ? "✓ Correct." : "✗ Not quite.";
            verdict.style.color = isRight ? "var(--good)" : "var(--bad)";
            opts[correct - 1].classList.add("correct");
            if (answered === qs.length) {
              score.hidden = false;
              const pct = Math.round((firstTry / qs.length) * 100);
              score.innerHTML = `<strong>${firstTry} / ${qs.length}</strong> on the first try (${pct}%). ` +
                (pct >= 80 ? "Strong. Come back in a few days and take it again cold, because spacing is what makes it stick."
                           : "Good data. Re-read the sections behind the misses, then retake the quiz tomorrow.") +
                `<br><button class="btn reset" type="button">Retake quiz</button>`;
              score.querySelector(".reset").addEventListener("click", reset);
            }
          }
          if (!isRight) opt.classList.add("wrong");
        });
      });
    });

    function reset() {
      firstTry = 0; answered = 0; score.hidden = true;
      qs.forEach((q) => {
        q.classList.remove("answered");
        q.querySelectorAll(".opt").forEach((o) => o.classList.remove("correct", "wrong"));
      });
      quiz.scrollIntoView({ behavior: "smooth" });
    }
  });
})();
