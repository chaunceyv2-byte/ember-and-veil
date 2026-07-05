// interactive-cards.js - subtle mouse-follow effect for Ember & Veil feature cards

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".feature-card");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer:fine)").matches;

  if (prefersReducedMotion || !finePointer) return;

  cards.forEach(card => {
    card.addEventListener("mousemove", event => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const px = x / rect.width;
      const py = y / rect.height;

      const tiltX = (px - 0.5) * 7;
      const tiltY = (0.5 - py) * 7;

      card.style.setProperty("--card-x", `${px * 100}%`);
      card.style.setProperty("--card-y", `${py * 100}%`);
      card.style.setProperty("--tilt-x", `${tiltX}deg`);
      card.style.setProperty("--tilt-y", `${tiltY}deg`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--card-x", "50%");
      card.style.setProperty("--card-y", "50%");
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });
});
