document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("contact-status");
  if (!form || !statusEl) return;

  const endpoint = "https://contact-form.mizesinky.workers.dev";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = "Sending...";
    statusEl.textContent = "";
    statusEl.className = "form-status";

    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "Request failed.");
      statusEl.textContent = "Your message has been sent. We will reply soon.";
      statusEl.classList.add("success");
      form.reset();
    } catch (error) {
      console.error(error);
      statusEl.textContent = "Your message could not be sent. Please try again.";
      statusEl.classList.add("error");
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
});
