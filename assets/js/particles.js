// particles.js - Ember & Veil cinematic ember system

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("embers");
  if (!container) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const maxParticles = window.innerWidth < 768 ? 28 : 70;
  const particles = [];

  const random = (min, max) => Math.random() * (max - min) + min;

  function createParticle() {
    const el = document.createElement("span");
    el.className = "ember-particle";

    const size = random(2, 7);
    const startX = random(0, window.innerWidth);
    const startY = window.innerHeight + random(20, 180);

    const particle = {
      el,
      x: startX,
      y: startY,
      size,
      speed: random(0.35, 1.35),
      drift: random(-0.35, 0.35),
      sway: random(0.004, 0.015),
      swayAmount: random(18, 70),
      life: random(0.45, 1),
      glow: random(0.45, 1),
      offset: random(0, Math.PI * 2)
    };

    el.style.width = `${size}px`;
    el.style.height = `${size}px`;

    container.appendChild(el);
    particles.push(particle);
  }

  function resetParticle(p) {
    p.x = random(0, window.innerWidth);
    p.y = window.innerHeight + random(20, 160);
    p.size = random(2, 7);
    p.speed = random(0.35, 1.35);
    p.drift = random(-0.35, 0.35);
    p.sway = random(0.004, 0.015);
    p.swayAmount = random(18, 70);
    p.life = random(0.45, 1);
    p.glow = random(0.45, 1);
    p.offset = random(0, Math.PI * 2);

    p.el.style.width = `${p.size}px`;
    p.el.style.height = `${p.size}px`;
  }

  for (let i = 0; i < maxParticles; i++) {
    createParticle();
    particles[i].y = random(0, window.innerHeight);
  }

  let last = performance.now();

  function animate(now) {
    const delta = Math.min((now - last) / 16.67, 2);
    last = now;

    particles.forEach((p, index) => {
      p.y -= p.speed * delta;
      p.x += (p.drift + Math.sin(now * p.sway + p.offset) * 0.22) * delta;

      const opacity = Math.max(0, Math.min(1, p.y / window.innerHeight)) * p.life;
      const scale = 0.7 + p.glow * 0.55;
      const flicker = 0.75 + Math.sin(now * 0.006 + index) * 0.25;

      p.el.style.transform = `translate3d(${p.x + Math.sin(now * p.sway + p.offset) * p.swayAmount}px, ${p.y}px, 0) scale(${scale})`;
      p.el.style.opacity = opacity * flicker;

      if (p.y < -60 || p.x < -120 || p.x > window.innerWidth + 120) {
        resetParticle(p);
      }
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  window.addEventListener("resize", () => {
    particles.forEach(resetParticle);
  });
});
