// contact.js
// Ember & Veil contact form handler

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#contact-status");

  if (!form || !status) return;

  form.addEventListener("submit", async event => {
    event.preventDefault();

    const button = form.querySelector("button[type='submit']");
    const originalText = button ? button.textContent : "Send Message";

    if (button) {
      button.disabled = true;
      button.textContent = "Sending...";
    }

    status.textContent = "";
    status.className = "form-status";

    const payload = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      service: form.elements.service.value,
      message: form.elements.message.value,
      website: form.elements.website.value
    };

    try {
      const response = await fetch("https://contact-form.mizesinky.workers.dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Message failed.");
      }

      status.textContent = "Your message has been sent. We will reply soon.";
      status.classList.add("success");
      form.reset();
    } catch (error) {
      status.textContent = "Your message could not be sent. Please try again.";
      status.classList.add("error");
      console.error("Contact form error:", error);
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = originalText;
      }
    }
  });
});
