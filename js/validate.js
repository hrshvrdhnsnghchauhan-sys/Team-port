/**
 * validate.js
 * ---------------------------------------------------------
 * Client-side validation for the contact form.
 * No external libraries — plain DOM + regex.
 * ---------------------------------------------------------
 */

const Validate = (() => {
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showError(field, message) {
    const errorEl = document.querySelector(`[data-error-for="${field}"]`);
    const inputEl = document.getElementById(field);
    if (errorEl) errorEl.textContent = message || "";
    if (inputEl) inputEl.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function validateField(field, value) {
    switch (field) {
      case "name":
        if (!value.trim()) return "Name required";
        if (value.trim().length < 2) return "Name too short";
        return "";
      case "email":
        if (!value.trim()) return "Email required";
        if (!EMAIL_RE.test(value.trim())) return "Invalid email format";
        return "";
      case "message":
        if (!value.trim()) return "Message required";
        if (value.trim().length < 10) return "Message too short (min 10 chars)";
        return "";
      default:
        return "";
    }
  }

  function validateForm(formEl) {
    const fields = ["name", "email", "message"];
    let isValid = true;

    fields.forEach((field) => {
      const input = formEl.querySelector(`#${field}`);
      const error = validateField(field, input.value);
      showError(field, error);
      if (error) isValid = false;
    });

    return isValid;
  }

  function attachLiveValidation(formEl) {
    ["name", "email", "message"].forEach((field) => {
      const input = formEl.querySelector(`#${field}`);
      if (!input) return;
      input.addEventListener("blur", () => {
        showError(field, validateField(field, input.value));
      });
    });
  }

  return { validateForm, attachLiveValidation };
})();

window.Validate = Validate;
