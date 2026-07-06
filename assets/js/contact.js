// contact.js

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
      name: form.name.value,
      email: form.email.value,
      service: form.service.value,
      message: form.message.value,
      website: form.website.value
    };

    try {
      const response = await fetch("https://contact-form.mizesinky.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || !result.ok) throw new Error(result.error || "Send failed.");

      status.textContent = "Your message has been sent. We will reply soon.";
      status.classList.add("success");
      form.reset();
    } catch {
      status.textContent = "Your message could not be sent. Please try again.";
      status.classList.add("error");
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = originalText;
      }
    }
  });
});
