/*
 * Two small touches on the product page. The timer on the front phone keeps
 * running on its day strip, and the phones lean toward a mouse or trackpad pointer when
 * motion is welcome. Pages without the elements are left alone.
 */
(() => {
  const timer = document.querySelector("[data-fast]");
  if (timer) {
    const day = 86400;
    const fastStart = 20 * 3600;
    const total = Number(timer.dataset.fast);
    const remaining = timer.querySelector("[data-remaining]");
    const elapsedLabel = timer.querySelector("[data-elapsed]");
    const started = Date.now() - Number(timer.dataset.start) * 1000;
    const pad = (n) => String(n).padStart(2, "0");
    const percent = (seconds) => `${((seconds / day) * 100).toFixed(2)}%`;
    const place = (selector, from, to) => {
      const element = timer.querySelector(selector);
      if (!element) return;
      element.style.display = to > from ? "" : "none";
      element.style.left = percent(from);
      element.style.width = percent(to - from);
    };
    const dot = (name, at, shown) => {
      const element = timer.querySelector(`[data-now="${name}"]`);
      if (!element) return;
      element.style.display = shown ? "" : "none";
      element.style.left = percent(at);
    };
    // Seconds since yesterday's midnight: the fast starts at 20:00 yesterday,
    // so the goal falls at 12:00 today, as on the Timer.
    const tick = () => {
      const elapsed = Math.floor((Date.now() - started) / 1000) % total;
      const left = total - elapsed;
      const now = fastStart + elapsed;
      const goal = fastStart + total;
      if (remaining) {
        remaining.textContent = `${Math.floor(left / 3600)}:${pad(Math.floor(left / 60) % 60)}:${pad(left % 60)}`;
      }
      if (elapsedLabel) {
        elapsedLabel.textContent = `${Math.floor(elapsed / 3600)}:${pad(Math.floor(elapsed / 60) % 60)}`;
      }
      place('[data-bar="yesterday"]', fastStart, Math.min(now, day));
      place('[data-left="yesterday"]', Math.min(now, day), Math.min(goal, day));
      place('[data-bar="today"]', 0, Math.max(now - day, 0));
      place('[data-left="today"]', Math.max(now - day, 0), goal - day);
      dot("yesterday", now, now < day);
      dot("today", now - day, now >= day);
    };
    tick();
    setInterval(tick, 1000);
  }

  const lean = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
  if (!lean.matches) return;
  for (const stage of document.querySelectorAll("[data-tilt]")) {
    let frame = 0;
    stage.addEventListener("pointermove", (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = stage.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width - 0.5;
        const y = (event.clientY - box.top) / box.height - 0.5;
        stage.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
        stage.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
        stage.style.setProperty("--px", `${((x + 0.5) * 100).toFixed(1)}%`);
        stage.style.setProperty("--py", `${((y + 0.5) * 100).toFixed(1)}%`);
      });
    });
    stage.addEventListener("pointerleave", () => {
      cancelAnimationFrame(frame);
      for (const name of ["--rx", "--ry", "--px", "--py"]) stage.style.removeProperty(name);
    });
  }
})();
