// glass-navigation.js - Ember & Veil final navigation behavior

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links a");

  function updateNavbar() {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 24);
  }

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuButton.classList.toggle("open", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    });

    links.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }

  const current = window.location.pathname.split("/").pop() || "index.html";
  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === current) link.classList.add("active");
  });
});
