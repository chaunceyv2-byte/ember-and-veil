// app.js - Ember & Veil

document.addEventListener("DOMContentLoaded", () => {
  // Reveal sections on scroll
  document.querySelectorAll("section").forEach(section => {
    section.classList.add("reveal");
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Newsletter form demo
  const form = document.querySelector("#newsletter form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = form.querySelector("input[type='email']");
      if (!email.value.trim()) {
        alert("Please enter your email address.");
        return;
      }

      alert("Thank you for joining the Ember & Veil circle!");
      form.reset();
    });
  }

  // Update footer year
  const footerText = document.querySelector("footer p");
  if (footerText) {
    footerText.innerHTML =
      "&copy; " + new Date().getFullYear() +
      " Ember &amp; Veil. All rights reserved.";
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });
});
