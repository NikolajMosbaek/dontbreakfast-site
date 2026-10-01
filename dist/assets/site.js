/*
 * Two small touches on the product page. The timer on the front phone keeps
 * running, and the phones lean toward a mouse or trackpad pointer when
 * motion is welcome. Pages without the elements are left alone.
 */
(() => {
  const timer = document.querySelector("[data-fast]");
  if (timer) {
    const total = Number(timer.dataset.fast);
    const ring = timer.querySelector("[data-ring]");
    const remaining = timer.querySelector("[data-remaining]");
    const elapsedLabel = timer.querySelector("[data-elapsed]");
    const circumference = 2 * Math.PI * 141;
    const started = Date.now() - Number(timer.dataset.start) * 1000;
    const pad = (n) => String(n).padStart(2, "0");
    const tick = () => {
      const elapsed = Math.floor((Date.now() - started) / 1000) % total;
      const left = total - elapsed;
      if (remaining) {
        remaining.textContent = `${Math.floor(left / 3600)}:${pad(Math.floor(left / 60) % 60)}:${pad(left % 60)}`;
      }
      if (elapsedLabel) {
        elapsedLabel.textContent = `${Math.floor(elapsed / 3600)}:${pad(Math.floor(elapsed / 60) % 60)}`;
      }
      ring?.setAttribute("stroke-dasharray", `${((elapsed / total) * circumference).toFixed(1)} ${circumference.toFixed(1)}`);
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
