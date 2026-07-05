// navigation.js - Ember & Veil

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  // Darken navbar on scroll
  const updateNavbar = () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", updateNavbar);
  updateNavbar();

  // Mobile menu toggle (requires .menu-toggle button in HTML)
  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      menuButton.classList.toggle("open");
    });
  }

  // Highlight active page
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === current) {
      link.classList.add("active");
    }
  });
});
