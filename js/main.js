/**
 * main.js — entry point
 */

function init() {
  Theme.init();

  Render.renderTeam("team-grid", window.TEAM);
  Render.renderProjects("repo-list", window.PROJECTS);

  // Scroll-triggered fade-in for .animate-in elements
  Render.observeAnimations(document);

  // Contact form
  const form     = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");

  if (form) {
    Validate.attachLiveValidation(form);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const isValid = Validate.validateForm(form);

      if (!isValid) {
        statusEl.textContent = "Please fix the errors above.";
        statusEl.className   = "form-status error";
        return;
      }

      statusEl.textContent = "Message sent! We'll get back to you soon.";
      statusEl.className   = "form-status success";
      form.reset();

      setTimeout(() => {
        statusEl.textContent = "";
        statusEl.className   = "form-status";
      }, 5000);
    });
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks  = document.querySelectorAll(".nav-links a");

  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.removeAttribute("style");
            });
            const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (active) {
              active.style.color = "var(--accent)";
            }
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => obs.observe(s));
  }
}

document.addEventListener("DOMContentLoaded", init);
