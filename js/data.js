/**
 * data.js
 * ---------------------------------------------------------
 * Single source of truth for the Team Agency Portfolio.
 * Edit the values below — nothing else needs to change to
 * update names, skills, GitHub links, or project status.
 * ---------------------------------------------------------
 */

const TEAM = [
  {
    id: "harshvardhan",
    name: "Harshvardhan Singh Chauhan",
    role: "SPA Architecture & Routing",
    skills: ["JavaScript", "Pub/Sub State", "Routing", "Git"],
    github: "https://github.com/hrshvrdhnsnghchauhan-sys",
    photo: "images/harshvardhan.jpg",
    initials: "HS",
    color: "amber",
    projects: [
      { name: "team-agency-portfolio", status: "live", link: "https://github.com/hrshvrdhnsnghchauhan-sys/Team-port" },
      { name: "live-news-feed",        status: "live", link: "https://github.com/hrshvrdhnsnghchauhan-sys/News-API" }
    ]
  },
  {
    id: "suraj",
    name: "Suraj Madheshiya",
    role: "API Integration & Data Layer",
    skills: ["JavaScript", "REST APIs", "Async/Await", "JSON"],
    github: "https://github.com/surajmadheshiya1946-creator",
    photo: "images/suraj.jpg",
    initials: "SM",
    color: "teal",
    projects: [
      { name: "interactive-quiz-app", status: "live", link: "https://github.com/surajmadheshiya1946-creator/Interactive-Quiz-App" },
      { name: "expense-tracker",      status: "live", link: "https://github.com/surajmadheshiya1946-creator/Expense-tracker" }
    ]
  },
  {
    id: "kumkum",
    name: "Kumkum Jangir",
    role: "UI/UX & Component Logic",
    skills: ["HTML5/CSS3", "Responsive UI", "DOM Rendering", "Validation"],
    github: "https://github.com/jangirkjangir186-ship-it",
    photo: "images/kumkum.jpg",
    initials: "KJ",
    color: "rose",
    projects: [
      { name: "github-developer-explorer", status: "live", link: "https://github.com/jangirkjangir186-ship-it/github-explorer" },
      { name: "kanban-task-board",         status: "live", link: "https://github.com/jangirkjangir186-ship-it/Kanban-taskboard" }
    ]
  }
];

/**
 * status: "live" | "building" | "queued"
 * link: hash route matching your SPA router (edit to match yours)
 */
const PROJECTS = [
  {
    id: "portfolio",
    name: "team-agency-portfolio",
    type: "DOM & Layout",
    desc: "Landing page introducing the team, theme toggle, contact form.",
    link: "#/team",
    github: "https://github.com/hrshvrdhnsnghchauhan-sys",
    status: "live"
  },
  {
    id: "quiz",
    name: "interactive-quiz-app",
    type: "State & Logic",
    desc: "Multiple-choice quiz with running score and instant feedback.",
    link: "https://surajmadheshiya1946-creator.github.io/Interactive-Quiz-App/",
    github: "https://github.com/surajmadheshiya1946-creator/Interactive-Quiz-App",
    status: "live"
  },
  {
    id: "expense",
    name: "expense-tracker",
    type: "CRUD & localStorage",
    desc: "Income/expense CRUD with reduce/filter totals, persisted locally.",
    link: "https://surajmadheshiya1946-creator.github.io/Expense-tracker/",
    github: "https://github.com/surajmadheshiya1946-creator/Expense-tracker",
    status: "live"
  },
  {
    id: "news",
    name: "live-news-feed",
    type: "Async API",
    desc: "NewsAPI aggregator via Cloudflare Worker proxy, search & filters.",
    link: "https://hrshvrdhnsnghchauhan-sys.github.io/News-API/",
    github: "https://github.com/hrshvrdhnsnghchauhan-sys/News-API",
    status: "live"
  },
  {
    id: "github-explorer",
    name: "github-developer-explorer",
    type: "Multi-Endpoint API",
    desc: "GitHub REST API profile, stats, and language breakdown.",
    link: "https://jangirkjangir186-ship-it.github.io/github-explorer/",
    github: "https://github.com/jangirkjangir186-ship-it/github-explorer",
    status: "live"
  },
  {
    id: "kanban",
    name: "kanban-task-board",
    type: "Drag & Drop",
    desc: "Trello-style board with HTML5 Drag and Drop, persisted state.",
    link: "https://jangirkjangir186-ship-it.github.io/Kanban-taskboard/",
    github: "https://github.com/jangirkjangir186-ship-it/Kanban-taskboard",
    status: "live"
  }
];

// Expose globally (swap for `export` if you convert to ES modules in your SPA)
window.TEAM = TEAM;
window.PROJECTS = PROJECTS;
