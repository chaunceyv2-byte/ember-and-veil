// cinematic.js - Ember & Veil hero parallax and atmospheric motion

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-refined");
  const panel = document.querySelector(".hero-panel");
  const smoke = document.querySelector(".hero-smoke");
  const dust = document.querySelector(".hero-gold-dust");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!hero || prefersReducedMotion) return;

  function update() {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight || 1;
    const progress = Math.min(scrollY / heroHeight, 1);

    hero.style.setProperty("--hero-zoom", `${1 + progress * 0.045}`);
    hero.style.setProperty("--hero-shift", `${progress * 42}px`);

    if (panel) {
      panel.style.transform = `translate3d(0, ${progress * -28}px, 0)`;
      panel.style.opacity = `${1 - progress * 0.38}`;
    }

    if (smoke) {
      smoke.style.transform = `translate3d(${progress * 36}px, ${progress * -20}px, 0)`;
    }

    if (dust) {
      dust.style.transform = `translate3d(${progress * -26}px, ${progress * -12}px, 0)`;
    }
  }

  update();
  window.addEventListener("scroll", update, { passive: true });

  // Subtle cursor-responsive depth on desktop
  if (window.matchMedia("(pointer:fine)").matches) {
    hero.addEventListener("mousemove", (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      hero.style.setProperty("--mouse-x", `${x * 18}px`);
      hero.style.setProperty("--mouse-y", `${y * 18}px`);
    });

    hero.addEventListener("mouseleave", () => {
      hero.style.setProperty("--mouse-x", "0px");
      hero.style.setProperty("--mouse-y", "0px");
    });
  }
});
