// js/form.js
export function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const statusEl = form.querySelector("[data-form-status]");
  const submitBtn = form.querySelector("[data-submit]");

  const setStatus = (text) => {
    if (!statusEl) return;
    statusEl.textContent = text;
  };

  const setError = (name, message) => {
    const input = form.elements[name];
    const err = form.querySelector(`[data-error-for="${name}"]`);

    if (input) {
      input.classList.toggle("is-invalid", Boolean(message));
      input.setAttribute("aria-invalid", message ? "true" : "false");
    }
    if (err) err.textContent = message || "";
  };

  const validate = () => {
    let ok = true;
    setStatus("");

    // clear old errors
    ["name", "email", "subject", "message"].forEach((n) => setError(n, ""));

    const name = form.elements.name?.value.trim();
    const email = form.elements.email?.value.trim();
    const subject = form.elements.subject?.value.trim();
    const message = form.elements.message?.value.trim();

    if (!name) { setError("name", "Please enter your name."); ok = false; }

    // базовая проверка email (не супер-строгая, но норм)
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
    if (!email) { setError("email", "Please enter your email."); ok = false; }
    else if (!emailOk) { setError("email", "Please enter a valid email."); ok = false; }

    if (!subject) { setError("subject", "Please enter a subject."); ok = false; }
    if (!message) { setError("message", "Please enter a message."); ok = false; }

    return ok;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validate()) {
      setStatus("Fix the highlighted fields and try again.");
      return;
    }

    // fake send
    submitBtn?.setAttribute("disabled", "disabled");
    setStatus("Sending…");

    window.setTimeout(() => {
      setStatus("✅ Message sent.");
      form.reset();
      submitBtn?.removeAttribute("disabled");

      // открыть модалку “успех”
      document.dispatchEvent(new CustomEvent("modal:open", { detail: { type: "notice" } }));
    }, 800);
    });
}