(function () {
  "use strict";

  var app = document.getElementById("authorGuideApp");

  if (!app) {
    return;
  }

  var fullGuideUrl = "./workshops/livelabs/index.html?lab=core-workflow";
  var guidedSteps = [
    {
      id: "request",
      label: "Layer 1",
      title: "Request and scope the workshop",
      summary: "Start with the request, ownership, and basic delivery shape before you open GitHub or write markdown.",
      bullets: [
        "Submit the workshop in WMS with the right owner, portfolio context, and delivery plan.",
        "Use the lifecycle background pages only when you need status or approval context.",
        "Leave this layer with a valid WMS request and a clear workshop shape."
      ],
      primary: {
        label: "Open WMS request lab",
        href: "./workshops/core-workshop-flow/index.html?lab=1-labs-wms"
      },
      secondary: [
        {
          label: "WMS lifecycle background",
          href: "./workshops/start-here/index.html?lab=wms-workflows"
        },
        {
          label: "GitHub foundations background",
          href: "./workshops/start-here/index.html?lab=github-introduction"
        }
      ],
      detailsTitle: "Open the rabbit hole for this layer",
      details: [
        "Use the WMS lifecycle page when you need the approval states, QA handoffs, or publish-state language.",
        "Use GitHub foundations when the author still needs the repo, fork, clone, or preview model explained.",
        "If the workshop is a sprint, Marketplace image flow, or remote desktop flow, branch to Specialized Workflows after the request is defined."
      ]
    },
    {
      id: "build",
      label: "Layer 2",
      title: "Build the workshop and preview it",
      summary: "Once the request is real, move into GitHub setup, sync flow, and the markdown structure that actually ships.",
      bullets: [
        "Set up GitHub Desktop, Visual Studio Code, and the author tooling first.",
        "Fork, clone, sync, and preview safely before you start editing content.",
        "Build the markdown, manifests, shared content, and assets in the standard LiveLabs structure."
      ],
      primary: {
        label: "Open core workflow",
        href: "./workshops/core-workshop-flow/index.html?lab=core-workflow"
      },
      secondary: [
        {
          label: "GitHub and tools",
          href: "./workshops/core-workshop-flow/index.html?lab=2-labs-github"
        },
        {
          label: "Sync and preview",
          href: "./workshops/core-workshop-flow/index.html?lab=3-labs-sync-github"
        },
        {
          label: "Markdown and content",
          href: "./workshops/core-workshop-flow/index.html?lab=4-labs-markdown-develop-content"
        }
      ],
      detailsTitle: "What stays deeper until you need it",
      details: [
        "The markdown lab contains the stricter LiveLabs rules, image rules, manifest structure, and reuse patterns.",
        "Reuse and Enhancements is separate on purpose so optional features do not crowd the main build flow.",
        "Use Tools and Productivity if screenshots, image weight, or cleanup become the blocker instead of markdown structure."
      ]
    },
    {
      id: "publish",
      label: "Layer 3",
      title: "Review, QA, and publish",
      summary: "Treat QA and publishing as the last layer. Open it only when the preview is stable and the content is ready for review.",
      bullets: [
        "Run self-QA, share the preview, and clear the validation issues first.",
        "Check pull request automation before you escalate a blocked review.",
        "Submit the final publish request only when both the PR and the workshop state are ready."
      ],
      primary: {
        label: "Open validation and publish",
        href: "./workshops/validation-qa-publish/index.html?lab=validation-qa-publish"
      },
      secondary: [
        {
          label: "QA checks",
          href: "./workshops/validation-qa-publish/index.html?lab=5-labs-qa-checks"
        },
        {
          label: "PR automated checks",
          href: "./workshops/validation-qa-publish/index.html?lab=prcheck"
        },
        {
          label: "Publish the workshop",
          href: "./workshops/validation-qa-publish/index.html?lab=6-labs-publish"
        }
      ],
      detailsTitle: "When this layer needs more context",
      details: [
        "The SLA page explains the expected turnaround windows for review, stakeholder QA, and publishing.",
        "Use Need Help or FAQ only after you can describe the exact blocker, preview URL, and WMS state.",
        "If the automation or publish path behaves differently for your workshop type, branch to Specialized Workflows."
      ]
    }
  ];

  var supportCards = [
    {
      title: "Tools and Productivity",
      summary: "Use this when screenshots, image size, or markdown cleanup become the thing slowing review down.",
      image: "./image_gen_assets/selected/05-tools-productivity-quick-reference.png",
      actions: [
        {
          label: "Open tools section",
          href: "./workshops/tools/index.html?lab=tools",
          style: "secondary"
        },
        {
          label: "Open screenshot lab",
          href: "./workshops/tools/index.html?lab=13-labs-capture-screens-best-practices",
          style: "tertiary"
        }
      ]
    },
    {
      title: "Specialized Workflows",
      summary: "Branch here only when the standard workshop path is not the right fit: sprints, Marketplace images, remote desktop, or secure desktop.",
      image: "./image_gen_assets/selected/06-specialized-workflows-quick-reference.png",
      actions: [
        {
          label: "Open specialized workflows",
          href: "./workshops/specialized-workflows-reference/index.html?lab=specialized-workflows-reference",
          style: "secondary"
        },
        {
          label: "Open sprints workflow",
          href: "./workshops/specialized-workflows-reference/index.html?lab=10-create-sprints-workflow",
          style: "tertiary"
        }
      ]
    },
    {
      title: "Help and FAQ",
      summary: "Use this last, when you need the support routes, office-hours pointers, or the recurring author questions collected in one place.",
      image: "./image_gen_assets/selected/07-help-faq-support-quick-reference.png",
      actions: [
        {
          label: "Open help and FAQ",
          href: "./workshops/help-faq-support/index.html?lab=help-faq-support",
          style: "secondary"
        },
        {
          label: "Open need-help page",
          href: "./workshops/help-faq-support/index.html?lab=need-help",
          style: "tertiary"
        }
      ]
    }
  ];

  var quickJumps = [
    {
      label: "WMS request",
      href: "./workshops/core-workshop-flow/index.html?lab=1-labs-wms"
    },
    {
      label: "GitHub setup",
      href: "./workshops/core-workshop-flow/index.html?lab=2-labs-github"
    },
    {
      label: "Markdown rules",
      href: "./workshops/core-workshop-flow/index.html?lab=4-labs-markdown-develop-content"
    },
    {
      label: "PR checks",
      href: "./workshops/validation-qa-publish/index.html?lab=prcheck"
    },
    {
      label: "Screenshots",
      href: "./workshops/tools/index.html?lab=13-labs-capture-screens-best-practices"
    },
    {
      label: "Sprints",
      href: "./workshops/specialized-workflows-reference/index.html?lab=10-create-sprints-workflow"
    },
    {
      label: "Need help",
      href: "./workshops/help-faq-support/index.html?lab=need-help"
    }
  ];

  var toolkitCards = [
    {
      title: "WMS lifecycle and approvals",
      summary: "Open this when you need the state model, approval path, or publishing handoffs before touching the build flow.",
      tags: ["planning", "qa"],
      imageLabel: "Background reference",
      primary: {
        label: "Open WMS lifecycle",
        href: "./workshops/start-here/index.html?lab=wms-workflows"
      },
      secondary: {
        label: "Open request lab",
        href: "./workshops/core-workshop-flow/index.html?lab=1-labs-wms"
      },
      details: [
        "Statuses from new request through publish-ready.",
        "Where stakeholder QA and admin review fit into the flow.",
        "The right background page when the blocker is workflow language, not tooling."
      ]
    },
    {
      title: "GitHub foundations",
      summary: "Use this when the author still needs the repo, fork, clone, and preview model explained before the hands-on steps start.",
      tags: ["planning", "build"],
      imageLabel: "Background reference",
      primary: {
        label: "Open GitHub foundations",
        href: "./workshops/start-here/index.html?lab=github-introduction"
      },
      secondary: {
        label: "Open GitHub setup lab",
        href: "./workshops/core-workshop-flow/index.html?lab=2-labs-github"
      },
      details: [
        "The Oracle LiveLabs GitHub structure and safe authoring flow.",
        "When to use the background page instead of the task-focused setup lab.",
        "Useful before onboarding a new author or contributor."
      ]
    },
    {
      title: "Core Workflow",
      summary: "The main author path from request to GitHub setup, sync, preview, and markdown development.",
      tags: ["build"],
      image: "./image_gen_assets/selected/02-core-workflow-quick-reference.png",
      primary: {
        label: "Open core workflow",
        href: "./workshops/core-workshop-flow/index.html?lab=core-workflow"
      },
      secondary: {
        label: "Open markdown lab",
        href: "./workshops/core-workshop-flow/index.html?lab=4-labs-markdown-develop-content"
      },
      details: [
        "Request submission, tool setup, GitHub sync, preview, and markdown structure.",
        "The shortest safe route when you are actively building a workshop.",
        "Best starting point if you do not need the background pages first."
      ]
    },
    {
      title: "Validation and Publish",
      summary: "Everything that happens after the preview is stable: self-QA, automation, PR review, publishing, and timing.",
      tags: ["qa"],
      image: "./image_gen_assets/selected/03-validation-publish-quick-reference.png",
      primary: {
        label: "Open validation and publish",
        href: "./workshops/validation-qa-publish/index.html?lab=validation-qa-publish"
      },
      secondary: {
        label: "Open PR checks",
        href: "./workshops/validation-qa-publish/index.html?lab=prcheck"
      },
      details: [
        "QA gates, preview sharing, review timing, and publish steps.",
        "Use this only after the content and preview are ready.",
        "Best fit when the blocker is review or publish readiness."
      ]
    },
    {
      title: "Reuse and Enhancements",
      summary: "Optional workshop features that should stay outside the main author path until the base workshop already works.",
      tags: ["enhancement"],
      image: "./image_gen_assets/selected/04-reuse-enhancements-quick-reference.png",
      primary: {
        label: "Open reuse section",
        href: "./workshops/workshop-components-reuse/index.html?lab=workshop-components-reuse"
      },
      secondary: {
        label: "Open quiz lab",
        href: "./workshops/workshop-components-reuse/index.html?lab=quiz"
      },
      details: [
        "FreeSQL embeds, quizzes, and reusable enhancement patterns.",
        "Useful after the workshop structure already passes the base checks.",
        "Keeps optional UX improvements out of the first-time author path."
      ]
    },
    {
      title: "Tools and Productivity",
      summary: "Use these labs when screenshots, image quality, file size, or content cleanup are slowing the workflow down.",
      tags: ["tools"],
      image: "./image_gen_assets/selected/05-tools-productivity-quick-reference.png",
      primary: {
        label: "Open tools section",
        href: "./workshops/tools/index.html?lab=tools"
      },
      secondary: {
        label: "Open OptiShot",
        href: "./workshops/tools/index.html?lab=optishot"
      },
      details: [
        "Screen capture guidance, OptiShot, and Fixomat cleanup.",
        "Best fit when the content is readable but the assets are not review-ready.",
        "Useful late in the build flow and before QA."
      ]
    },
    {
      title: "Specialized Workflows",
      summary: "Branch here when the workshop is really a sprint flow, remote desktop setup, Marketplace image flow, or secure desktop case.",
      tags: ["advanced"],
      image: "./image_gen_assets/selected/06-specialized-workflows-quick-reference.png",
      primary: {
        label: "Open specialized workflows",
        href: "./workshops/specialized-workflows-reference/index.html?lab=specialized-workflows-reference"
      },
      secondary: {
        label: "Open secure desktop",
        href: "./workshops/specialized-workflows-reference/index.html?lab=secure-desktop"
      },
      details: [
        "Sprints, graphical remote desktop, Marketplace image creation, and secure desktop.",
        "Use only when the normal workshop author path does not fit the delivery type.",
        "This is the main branch point out of the standard guided path."
      ]
    },
    {
      title: "Help and FAQ",
      summary: "Use this when you are blocked, need the support routes, or want the recurring author questions in one place.",
      tags: ["help"],
      image: "./image_gen_assets/selected/07-help-faq-support-quick-reference.png",
      primary: {
        label: "Open help and FAQ",
        href: "./workshops/help-faq-support/index.html?lab=help-faq-support"
      },
      secondary: {
        label: "Open FAQ",
        href: "./workshops/help-faq-support/index.html?lab=livelabs-faq"
      },
      details: [
        "Support routes, FAQ answers, and the right information to bring when asking for help.",
        "Use after you know the current WMS state, preview URL, and specific blocker.",
        "The right end-point when the workflow is blocked rather than unclear."
      ]
    }
  ];

  var filterOptions = [
    { id: "all", label: "All" },
    { id: "planning", label: "Planning" },
    { id: "build", label: "Build" },
    { id: "qa", label: "QA" },
    { id: "enhancement", label: "Enhancements" },
    { id: "tools", label: "Tools" },
    { id: "advanced", label: "Advanced" },
    { id: "help", label: "Help" }
  ];

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function detailsMarkup(title, items) {
    return [
      '<details class="details-shell">',
      "  <summary>", escapeHtml(title), "</summary>",
      '  <div class="details-body">',
      "    <ul>",
      items.map(function (item) {
        return "<li>" + escapeHtml(item) + "</li>";
      }).join(""),
      "    </ul>",
      "  </div>",
      "</details>"
    ].join("");
  }

  function actionLink(action, styleClass) {
    return '<a class="resource-link ' + styleClass + '" href="' + escapeHtml(action.href) + '">' + escapeHtml(action.label) + "</a>";
  }

  function renderGuidedSteps() {
    return guidedSteps.map(function (step, index) {
      return [
        '<article class="step-card" id="guided-', escapeHtml(step.id), '">',
        '  <div class="step-head">',
        '    <span class="step-number">', String(index + 1), "</span>",
        "    <div>",
        '      <span class="step-eyebrow">', escapeHtml(step.label), "</span>",
        "      <h3>", escapeHtml(step.title), "</h3>",
        "    </div>",
        "  </div>",
        "  <p>", escapeHtml(step.summary), "</p>",
        '  <ul class="step-list">',
        step.bullets.map(function (item) {
          return "<li>" + escapeHtml(item) + "</li>";
        }).join(""),
        "  </ul>",
        '  <div class="step-actions">',
        actionLink(step.primary, "primary"),
        step.secondary.map(function (action) {
          return actionLink(action, "secondary");
        }).join(""),
        "  </div>",
        detailsMarkup(step.detailsTitle, step.details),
        "</article>"
      ].join("");
    }).join("");
  }

  function renderSupportCards() {
    return supportCards.map(function (card) {
      return [
        '<article class="support-card">',
        '  <div class="support-media">',
        '    <img src="', escapeHtml(card.image), '" alt="', escapeHtml(card.title), ' quick reference preview" loading="lazy" decoding="async">',
        "  </div>",
        '  <div class="support-body">',
        "    <h3>", escapeHtml(card.title), "</h3>",
        "    <p>", escapeHtml(card.summary), "</p>",
        '    <div class="support-actions">',
        card.actions.map(function (action) {
          return actionLink(action, action.style);
        }).join(""),
        "    </div>",
        "  </div>",
        "</article>"
      ].join("");
    }).join("");
  }

  function renderQuickJumps() {
    return quickJumps.map(function (jump) {
      return '<a class="nav-chip is-secondary" href="' + escapeHtml(jump.href) + '">' + escapeHtml(jump.label) + "</a>";
    }).join("");
  }

  function renderFilterChips() {
    return filterOptions.map(function (filter) {
      var activeClass = filter.id === "all" ? " is-active" : "";
      return '<button class="filter-chip' + activeClass + '" type="button" data-toolkit-tag="' + escapeHtml(filter.id) + '">' + escapeHtml(filter.label) + "</button>";
    }).join("");
  }

  app.innerHTML = [
    '<div class="author-guide-shell">',
    '  <div class="author-guide-live" aria-live="polite" data-live-region></div>',
    '  <nav class="author-guide-topbar" data-topbar hidden>',
    '    <a class="brand-lockup" href="#home">',
    '      <span class="brand-wordmark">Oracle</span>',
    '      <span class="brand-subcopy">',
    '        <strong>LiveLabs Author Guide</strong>',
    '        <span>Choose the path first, then go deeper only when needed.</span>',
    "      </span>",
    "    </a>",
    '    <div class="topbar-actions">',
    '      <a class="nav-chip" href="#home" data-view-link="home">Home</a>',
      '      <a class="nav-chip" href="#guided" data-view-link="guided">Guided Path</a>',
      '      <a class="nav-chip" href="#toolkit" data-view-link="toolkit">Reference Toolkit</a>',
      '      <a class="nav-chip is-secondary" href="' + escapeHtml(fullGuideUrl) + '">Open Full Guide</a>',
    "    </div>",
    "  </nav>",
    '  <main>',
    '    <section class="view-panel home-view" data-view="home">',
    '      <div class="home-card">',
    '        <h1 class="home-title">Oracle LiveLabs Author Guide</h1>',
    '        <p class="home-description">Start with the path that matches how you work. Guided Path walks a new author from request to publish. Reference Toolkit lets an experienced author jump straight to the exact section, lab, or support page.</p>',
    '        <div class="home-actions">',
    '          <a class="action-button primary" href="#guided">Start Guided Path</a>',
    '          <a class="action-button secondary" href="#toolkit">Open Reference Toolkit</a>',
    "        </div>",
    '        <p class="home-note">Build the workshop first. Open the deeper detail only when you need it.</p>',
    "      </div>",
    "    </section>",
    '    <section class="view-panel" data-view="guided">',
    '      <div class="content-hero">',
    '        <div class="hero-copy">',
    '          <span class="hero-kicker">Guided Path</span>',
    '          <h2 class="hero-title">Follow the standard author path from request to publish.</h2>',
    '          <p class="hero-description">This path is the main view for a first-time or occasional author. It keeps the sequence simple: request and scope the workshop, build the workshop in GitHub and markdown, then run QA and publishing only at the end.</p>',
    '          <ul class="hero-points">',
    '            <li>Start in WMS before you create tooling or content churn.</li>',
    '            <li>Use GitHub setup, sync, and markdown structure as one build layer.</li>',
    '            <li>Keep QA, automation, and publishing in the last layer.</li>',
    "          </ul>",
    "        </div>",
    '        <aside class="hero-side">',
    '          <section class="hero-side-card">',
    '            <h3>What you should leave with</h3>',
    '            <div class="inline-meta">',
    '              <span class="meta-pill">Valid WMS request</span>',
    '              <span class="meta-pill">Preview-ready repo</span>',
    '              <span class="meta-pill">QA-ready workshop</span>',
    "            </div>",
    "          </section>",
    '          <section class="hero-side-card">',
    '            <h3>When this path is not enough</h3>',
    '            <p>Branch later into tools, specialized workflows, or support only when the normal request-build-publish route stops fitting the workshop.</p>',
    '            <div class="support-actions">',
    '              <a class="resource-link tertiary" href="./workshops/specialized-workflows-reference/index.html?lab=specialized-workflows-reference">Open Specialized Workflows</a>',
    "            </div>",
    "          </section>",
    "        </aside>",
    "      </div>",
    '      <div class="steps-grid">',
    renderGuidedSteps(),
    "      </div>",
    '      <section aria-labelledby="guided-support-heading">',
    '        <div class="hero-copy" style="margin-top:24px;">',
    '          <span class="hero-kicker">Branch Only When Needed</span>',
    '          <h2 class="hero-title" id="guided-support-heading">Keep the side paths available without letting them run the first experience.</h2>',
    '          <p class="section-caption">These sections stay useful, but they should appear after the main guided path instead of competing with it on first view.</p>',
    "        </div>",
    '        <div class="support-grid">',
    renderSupportCards(),
    "        </div>",
    "      </section>",
    "    </section>",
    '    <section class="view-panel" data-view="toolkit">',
    '      <div class="content-hero">',
    '        <div class="hero-copy">',
    '          <span class="hero-kicker">Reference Toolkit</span>',
    '          <h2 class="hero-title">Jump straight to the exact thing you need.</h2>',
    '          <p class="hero-description">Use this view when you already know the blocker or task. Search, filter, and open the relevant section or lab directly without walking the full guided sequence again.</p>',
    '          <div class="topbar-actions" style="justify-content:flex-start;">',
    renderQuickJumps(),
    "          </div>",
    "        </div>",
    '        <aside class="hero-side">',
    '          <section class="hero-side-card">',
    '            <h3>Fastest way to use this view</h3>',
    '            <ul class="support-list">',
    '              <li>Search for the blocker or task you already know.</li>',
    '              <li>Filter by planning, build, QA, tools, advanced, or help.</li>',
    '              <li>Open the section landing page or the exact lab directly.</li>',
    "            </ul>",
    "          </section>",
    '          <section class="hero-side-card">',
    '            <h3>Need the whole table of contents?</h3>',
    '            <p>The classic LiveLabs guide still exists underneath this experience when you want the complete contents panel again.</p>',
    '            <div class="support-actions">',
    '              <a class="resource-link tertiary" href="' + escapeHtml(fullGuideUrl) + '">Open Full Guide</a>',
    "            </div>",
    "          </section>",
    "        </aside>",
    "      </div>",
    '      <section class="toolkit-toolbar" aria-labelledby="toolkit-heading">',
    '        <div class="hero-copy" style="gap:8px;">',
    '          <h2 class="hero-title" id="toolkit-heading">Search and filter the reference stack.</h2>',
    '          <p class="section-caption">Open the right section fast, then dive deeper only inside that branch.</p>',
    "        </div>",
    '        <div class="toolkit-search-row">',
    '          <label class="search-box" for="toolkitSearch">',
    '            <span class="visually-hidden">Search the reference toolkit</span>',
    '            <input id="toolkitSearch" type="search" placeholder="Search by task, blocker, or section" data-toolkit-search>',
    "          </label>",
    '          <div class="search-actions">',
    '            <button class="search-clear" type="button" data-toolkit-clear hidden>Clear</button>',
    '            <span class="results-copy" data-toolkit-count>Showing ' + String(toolkitCards.length) + ' resources</span>',
    "          </div>",
    "        </div>",
    '        <div class="filter-row">',
    renderFilterChips(),
    "        </div>",
    "      </section>",
    '      <div class="resource-grid" data-toolkit-grid></div>',
    '      <div class="empty-state" data-toolkit-empty hidden>No matching resource was found. Clear the search or switch back to <a href="#guided">Guided Path</a> if you want the standard sequence instead.</div>',
    "    </section>",
    "  </main>",
    "</div>"
  ].join("");

  var liveRegion = app.querySelector("[data-live-region]");
  var topbar = app.querySelector("[data-topbar]");
  var searchInput = app.querySelector("[data-toolkit-search]");
  var clearButton = app.querySelector("[data-toolkit-clear]");
  var countLabel = app.querySelector("[data-toolkit-count]");
  var toolkitGrid = app.querySelector("[data-toolkit-grid]");
  var emptyState = app.querySelector("[data-toolkit-empty]");
  var viewPanels = Array.prototype.slice.call(app.querySelectorAll("[data-view]"));
  var viewLinks = Array.prototype.slice.call(app.querySelectorAll("[data-view-link]"));
  var filterButtons = Array.prototype.slice.call(app.querySelectorAll("[data-toolkit-tag]"));
  var activeFilter = "all";

  function announce(message) {
    liveRegion.textContent = "";
    window.setTimeout(function () {
      liveRegion.textContent = message;
    }, 20);
  }

  function getViewFromHash(hash) {
    var cleanHash = (hash || "").replace("#", "").toLowerCase();

    if (cleanHash === "guided" || cleanHash.indexOf("guided-") === 0) {
      return "guided";
    }

    if (cleanHash === "toolkit") {
      return "toolkit";
    }

    return "home";
  }

  function renderToolkitCards() {
    var query = searchInput.value.trim().toLowerCase();
    var visibleCards = toolkitCards.filter(function (card) {
      var tagMatch = activeFilter === "all" || card.tags.indexOf(activeFilter) !== -1;
      var textMatch;

      if (!tagMatch) {
        return false;
      }

      if (!query) {
        return true;
      }

      textMatch = [
        card.title,
        card.summary
      ].concat(card.tags).concat(card.details).join(" ").toLowerCase();

      return textMatch.indexOf(query) !== -1;
    });

    toolkitGrid.innerHTML = visibleCards.map(function (card) {
      return [
        '<article class="resource-card">',
        '  <div class="resource-media">',
        card.image
          ? '    <img src="' + escapeHtml(card.image) + '" alt="' + escapeHtml(card.title) + ' quick reference preview" loading="lazy" decoding="async">'
          : '    <div class="resource-media-text">' + escapeHtml(card.imageLabel || "Reference") + "</div>",
        "  </div>",
        '  <div class="resource-body">',
        '    <div class="resource-title-row">',
        '      <div class="resource-badges">',
        card.tags.map(function (tag) {
          return '<span class="resource-badge">' + escapeHtml(tag) + "</span>";
        }).join(""),
        "      </div>",
        "      <h3>" + escapeHtml(card.title) + "</h3>",
        "    </div>",
        '    <p class="resource-summary">' + escapeHtml(card.summary) + "</p>",
        '    <div class="resource-actions">',
        actionLink(card.primary, "primary"),
        actionLink(card.secondary, "secondary"),
        "    </div>",
        detailsMarkup("See what is inside", card.details),
        "  </div>",
        "</article>"
      ].join("");
    }).join("");

    countLabel.textContent = "Showing " + String(visibleCards.length) + " resource" + (visibleCards.length === 1 ? "" : "s");
    clearButton.hidden = searchInput.value.trim() === "";
    emptyState.hidden = visibleCards.length !== 0;
  }

  function setActiveFilter(filterId) {
    activeFilter = filterId;
    filterButtons.forEach(function (button) {
      button.classList.toggle("is-active", button.getAttribute("data-toolkit-tag") === filterId);
    });
    renderToolkitCards();
  }

  function setView(viewName, options) {
    var config = options || {};

    viewPanels.forEach(function (panel) {
      panel.classList.toggle("is-active", panel.getAttribute("data-view") === viewName);
    });

    topbar.hidden = viewName === "home";

    viewLinks.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("data-view-link") === viewName);
    });

    if (viewName === "toolkit") {
      renderToolkitCards();
    }

    if (config.scroll !== false) {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });
    }

    if (config.announce !== false) {
      if (viewName === "guided") {
        announce("Guided Path opened.");
      } else if (viewName === "toolkit") {
        announce("Reference Toolkit opened.");
      } else {
        announce("Returned to the main entry page.");
      }
    }
  }

  window.addEventListener("hashchange", function () {
    setView(getViewFromHash(window.location.hash));
  });

  searchInput.addEventListener("input", renderToolkitCards);

  clearButton.addEventListener("click", function () {
    searchInput.value = "";
    renderToolkitCards();
    searchInput.focus();
  });

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setActiveFilter(button.getAttribute("data-toolkit-tag"));
    });
  });

  setActiveFilter("all");
  setView(getViewFromHash(window.location.hash), { announce: false, scroll: false });
}());
