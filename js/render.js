/**
 * render.js  (v2)
 * ---------------------------------------------------------
 * Pure rendering functions. Each takes data, returns/injects
 * markup. No state lives here — state lives in data.js.
 * ---------------------------------------------------------
 */

const GH_ICON = `<svg class="gh-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>`;

const Render = (() => {
  const STATUS_LABEL = {
    live:     "● live",
    building: "◐ building",
    queued:   "○ queued"
  };

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  /* ── Team card ─────────────────────────────────────────── */
  function teamCard(member) {
    const color = member.color || "amber";

    // Photo or initials fallback
    const avatarInner = member.photo
      ? `<img
           src="${member.photo}"
           alt="Photo of ${escapeHtml(member.name)}"
           class="avatar-img"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
         /><span class="avatar-initials" style="display:none">${member.initials}</span>`
      : `<span class="avatar-initials">${member.initials}</span>`;

    // Status dot helper
    const DOT = { live: "🟢", building: "🟡", queued: "⚪" };

    // Project chips
    const projectChips = (member.projects || []).map(p =>
      `<a class="member-project-chip" href="${p.link}" target="_blank" rel="noopener noreferrer"
          title="${escapeHtml(p.name)}">
         <span class="chip-dot">${DOT[p.status] || "⚪"}</span>
         <span class="chip-name">${escapeHtml(p.name)}/</span>
       </a>`
    ).join("");

    return `
      <article class="contributor-card animate-in" data-color="${color}" data-id="${member.id}" tabindex="0" aria-label="${escapeHtml(member.name)}, ${escapeHtml(member.role)}">
        <div class="card-photo-wrap">
          <div class="avatar-large" aria-hidden="true">
            ${avatarInner}
          </div>
        </div>
        <div class="card-body">
          <h3 class="contributor-name">${escapeHtml(member.name)}</h3>
          <p class="contributor-role">${escapeHtml(member.role)}</p>
          <ul class="skill-pills" aria-label="Skills">
            ${member.skills.map((s) => `<li class="pill">${escapeHtml(s)}</li>`).join("")}
          </ul>
          ${projectChips ? `<div class="member-projects" aria-label="Projects">${projectChips}</div>` : ""}
          <a class="remote-link" href="${member.github}" target="_blank" rel="noopener noreferrer"
             aria-label="View ${escapeHtml(member.name)}'s GitHub profile">
            ${GH_ICON}
            <span>GitHub Profile</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true" style="margin-left:auto;opacity:0.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
          </a>
        </div>
      </article>`;
  }


  /* ── Project row ───────────────────────────────────────── */
  function projectRow(project, index) {
    const num = String(index + 1).padStart(2, "0");
    const ghLink = project.github
      ? `<a class="repo-gh-link" href="${project.github}" target="_blank" rel="noopener noreferrer" aria-label="View ${escapeHtml(project.name)} on GitHub">
           ${GH_ICON} GitHub
         </a>`
      : "";
    return `
      <li class="repo-row" data-status="${project.status}">
        <span class="repo-num" aria-hidden="true">${num}</span>
        <div class="repo-main">
          <a class="repo-name" href="${project.link}" aria-label="${escapeHtml(project.name)} project page">${escapeHtml(project.name)}/</a>
          <p class="repo-desc">${escapeHtml(project.desc)}</p>
        </div>
        <span class="repo-type">${escapeHtml(project.type)}</span>
        <span class="repo-status" aria-label="Status: ${project.status}">${STATUS_LABEL[project.status] || project.status}</span>
        ${ghLink}
      </li>`;
  }

  /* ── Render helpers ────────────────────────────────────── */
  function renderTeam(containerId, team) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = team.map(teamCard).join("");
    observeAnimations(el);
  }

  function renderProjects(containerId, projects) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = projects.map(projectRow).join("");
  }

  /* ── Syntax highlighter ────────────────────────────────── */
  function highlightLine(text) {
    let escaped = escapeHtml(text);
    escaped = escaped.replace(
      /(&#39;|')([^']*)\1/g,
      '<span class="tok-string">$1$2$1</span>'
    );
    escaped = escaped.replace(
      /(\/\/.*)$/g,
      '<span class="tok-comment">$1</span>'
    );
    escaped = escaped.replace(
      /\b(const|let|new|true|false|return)\b/g,
      '<span class="tok-keyword">$1</span>'
    );
    escaped = escaped.replace(
      /\b([a-zA-Z_]\w*)(?=:)/g,
      '<span class="tok-property">$1</span>'
    );
    return escaped;
  }

  /* ── Hero typewriter ───────────────────────────────────── */
  function typeHero(containerId, lines, speed = 14) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    el.innerHTML = "";

    if (prefersReducedMotion) {
      el.innerHTML = lines
        .map(
          (l, i) =>
            `<span class="code-line"><span class="line-num">${i + 1}</span>${highlightLine(l)}</span>`
        )
        .join("\n");
      return;
    }

    let lineIndex = 0;

    function typeNextLine() {
      if (lineIndex >= lines.length) {
        const cursor = document.createElement("span");
        cursor.className = "blink-cursor";
        cursor.textContent = "▌";
        el.appendChild(cursor);
        return;
      }
      const lineWrap = document.createElement("span");
      lineWrap.className = "code-line";

      const numEl = document.createElement("span");
      numEl.className = "line-num";
      numEl.textContent = lineIndex + 1;
      lineWrap.appendChild(numEl);

      const textEl = document.createElement("span");
      lineWrap.appendChild(textEl);
      el.appendChild(lineWrap);
      el.appendChild(document.createTextNode("\n"));

      const raw = lines[lineIndex];
      let charIndex = 0;
      const interval = setInterval(() => {
        textEl.textContent = raw.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex >= raw.length) {
          clearInterval(interval);
          textEl.innerHTML = highlightLine(raw);
          lineIndex++;
          setTimeout(typeNextLine, 90);
        }
      }, speed);
    }

    typeNextLine();
  }

  /* ── Scroll-triggered animations ──────────────────────── */
  function observeAnimations(root) {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".animate-in").forEach(el => el.classList.add("visible"));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("visible"), i * 80);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    (root || document).querySelectorAll(".animate-in").forEach(el => obs.observe(el));
  }

  return { renderTeam, renderProjects, typeHero, observeAnimations };
})();

window.Render = Render;
