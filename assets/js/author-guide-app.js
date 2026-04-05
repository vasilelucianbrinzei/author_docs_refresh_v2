// Behavior layer for the redesigned guide.
// Handles mode switching, sticky navigation, search ranking, toolkit detail views, and image expansion.
(function () {
  var content = window.authorGuideContent || {};
  var stepMeta = content.stepMeta || [];
  var explorerItems = content.explorerItems || [];
  var guideSections = content.guideSections || [];
  var guideSectionMap = guideSections.reduce(function (accumulator, section) {
    accumulator[section.id] = section;
    return accumulator;
  }, {});
  var stopWords = {
    a: true,
    an: true,
    and: true,
    are: true,
    as: true,
    at: true,
    can: true,
    do: true,
    for: true,
    from: true,
    how: true,
    i: true,
    if: true,
    in: true,
    is: true,
    it: true,
    my: true,
    of: true,
    on: true,
    or: true,
    should: true,
    that: true,
    the: true,
    this: true,
    to: true,
    what: true,
    when: true,
    where: true,
    with: true
  };
  var synonymGroups = [
    ["wms", "workshop management system", "workshop request", "stakeholder", "council", "owner group"],
    ["qa", "self qa", "quarterly qa", "checklist", "quality assurance", "certify"],
    ["github", "git hub", "fork", "clone", "merge", "branch", "origin", "upstream", "pull request", "pr", "pages", "preview", "github io"],
    ["publish", "publishing", "production", "completed", "publish requested", "publish approved"],
    ["validator", "markdown validation", "pr checks", "lintchecker", "checks", "validation"],
    ["images", "image", "screenshot", "screenshots", "optishot", "media"],
    ["markdown", "manifest", "copy tags", "task header", "acknowledgements"],
    ["sql", "plsql", "free sql", "freesql", "sql developer"],
    ["help", "support", "faq", "message the team", "slack", "mailbox"],
    ["sla", "timeline", "timelines", "review window", "publishing window"],
    ["secure desktop", "secure desktops", "restricted laptop", "restricted corporate laptop", "novnc", "chrome", "popups"],
    ["ai", "ai developer hub", "agentic", "automation first", "skill bundle", "how to guide"]
  ];

  var state = {
    mode: "hub",
    currentStep: 0,
    fastTrack: "guided",
    activeTag: "all",
    toolkitQuery: "",
    searchQuery: "",
    guideSection: guideSections.length ? guideSections[0].id : "",
    guideFocusLab: ""
  };
  var previousView = {
    mode: "hub",
    currentStep: 0,
    guideSection: state.guideSection,
    guideFocusLab: ""
  };
  var searchIndex = [];
  var searchEntryMap = {};
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var suppressObserver = false;

  var appRoot = document.getElementById("app");
  var modeNav = document.getElementById("modeNav");
  var breadcrumbTrail = document.getElementById("breadcrumbTrail");
  var hub = document.getElementById("hub");
  var beginnerMode = document.getElementById("beginnerMode");
  var explorerMode = document.getElementById("explorerMode");
  var guideMode = document.getElementById("guideMode");
  var searchMode = document.getElementById("searchMode");
  var rabbitFlow = document.getElementById("rabbitFlow");
  var stepSections = Array.from(document.querySelectorAll(".rabbit-step"));
  var progressButtons = Array.from(document.querySelectorAll(".progress-button"));
  var progressShell = document.getElementById("progressShell");
  var progressCaption = document.getElementById("progressCaption");
  var fastTrackToggle = document.getElementById("fastTrackToggle");
  var fastTrackStatus = document.getElementById("fastTrackStatus");
  var liveRegion = document.getElementById("liveRegion");
  var bubbleGrid = document.getElementById("bubbleGrid");
  var emptyState = document.getElementById("emptyState");
  var resultCount = document.getElementById("resultCount");
  var bubbleSearch = document.getElementById("bubbleSearch");
  var clearSearch = document.getElementById("clearSearch");
  var tagPills = Array.from(document.querySelectorAll(".tag-pill"));
  var guideLayout = document.querySelector(".guide-layout");
  var guideSidebar = document.querySelector(".guide-sidebar");
  var guideSidebarCard = document.querySelector(".guide-sidebar-card");
  var guideSectionNav = document.getElementById("guideSectionNav");
  var guideQuickNav = document.getElementById("guideQuickNav");
  var guideSectionMount = document.getElementById("guideSectionMount");
  var homeRouteMap = document.getElementById("homeRouteMap");
  var searchResultsMount = document.getElementById("searchResults");
  var searchEmptyState = document.getElementById("searchEmptyState");
  var searchSummary = document.getElementById("searchSummary");
  var searchQueryChip = document.getElementById("searchQueryChip");
  var searchCountChip = document.getElementById("searchCountChip");
  var searchBackButton = document.getElementById("searchBackButton");
  var navSearchForm = document.getElementById("navSearchForm");
  var navSearchInput = document.getElementById("navSearchInput");
  var navSearchClear = document.getElementById("navSearchClear");
  var bubbleModalElement = document.getElementById("bubbleModal");
  var bubbleModal = bootstrap.Modal.getOrCreateInstance(bubbleModalElement);
  var imageLightbox = document.getElementById("imageLightbox");
  var imageLightboxImage = document.getElementById("imageLightboxImage");
  var imageLightboxCaption = document.getElementById("imageLightboxCaption");
  var imageLightboxClose = document.getElementById("imageLightboxClose");
  var backToTopButton = document.getElementById("backToTopButton");
  var lastExpandedFigure = null;
  var layoutSyncFrame = 0;

  bubbleModalElement.addEventListener("hidden.bs.modal", function () {
    closeImageLightbox({ announce: false, restoreFocus: false });
    document.body.classList.remove("modal-open");
    document.body.style.removeProperty("padding-right");
    document.querySelectorAll(".modal-backdrop").forEach(function (backdrop) {
      backdrop.remove();
    });
  });

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function compactText(value, maxLength) {
    var text = String(value || "").trim();
    var bounded = Math.max(24, maxLength || 120);

    if (!text || text.length <= bounded) {
      return text;
    }

    return text.slice(0, bounded).replace(/\s+\S*$/, "").trim() + "...";
  }

  function rootCssPx(name, fallback) {
    var styles;
    var value;

    if (!appRoot) {
      return fallback;
    }

    styles = window.getComputedStyle(appRoot);
    value = parseFloat(styles.getPropertyValue(name));
    return Number.isFinite(value) ? value : fallback;
  }

  function firstDirectContainer(parent) {
    var match = null;

    if (!parent) {
      return null;
    }

    Array.prototype.some.call(parent.children, function (child) {
      if (child.classList && child.classList.contains("container")) {
        match = child;
        return true;
      }
      return false;
    });

    return match;
  }

  function normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  synonymGroups = synonymGroups.map(function (group) {
    return group.map(function (term) {
      return normalizeText(term);
    });
  });

  function tokenize(value) {
    return normalizeText(value)
      .split(" ")
      .filter(function (token) {
        return token && !stopWords[token];
      });
  }

  function tokenSet(text) {
    return new Set(Array.from(new Set(tokenize(text))));
  }

  function expandSearchText(value) {
    var normalized = normalizeText(value);
    var expanded = normalized ? [normalized] : [];

    synonymGroups.forEach(function (group) {
      if (group.some(function (term) { return normalized.indexOf(term) !== -1; })) {
        expanded = expanded.concat(group);
      }
    });

    return expanded.join(" ");
  }

  function flattenList(items) {
    return (items || []).join(" ");
  }

  function flattenFields(items) {
    return (items || []).map(function (item) {
      return [item.label, item.value, item.guidance || item.note || ""].join(" ");
    }).join(" ");
  }

  function flattenResources(items) {
    return (items || []).map(function (item) {
      return [item.label, item.note || "", item.href || ""].join(" ");
    }).join(" ");
  }

  function flattenMilestones(items) {
    return (items || []).map(function (item) {
      return [item.label, item.detail].join(" ");
    }).join(" ");
  }

  function smoothBehavior() {
    return prefersReducedMotion ? "auto" : "smooth";
  }

  function setLiveMessage(message) {
    liveRegion.textContent = "";
    window.setTimeout(function () {
      liveRegion.textContent = message;
    }, 20);
  }

  function setHash(hash) {
    if (window.location.hash !== hash) {
      history.replaceState(null, "", hash);
    }
  }

  function updateHashFromState() {
    if (state.mode === "beginner") {
      setHash(state.currentStep === 0 ? "#guided" : "#step-" + (state.currentStep + 1));
      return;
    }

    if (state.mode === "explorer") {
      setHash("#toolkit");
      return;
    }

    if (state.mode === "guide") {
      setHash("#guide-" + state.guideSection);
      return;
    }

    if (state.mode === "search") {
      setHash(state.searchQuery ? "#search:" + encodeURIComponent(state.searchQuery) : "#search");
      return;
    }

    setHash("#home");
  }

  function stickyOffset(target) {
    var offset = 16;
    var navHeight = modeNav && !modeNav.classList.contains("d-none") ? modeNav.getBoundingClientRect().height : 0;
    var progressHeight = 0;

    if (
      state.mode === "beginner" &&
      progressShell &&
      window.innerWidth <= 1199 &&
      !beginnerMode.classList.contains("d-none") &&
      target &&
      target !== beginnerMode
    ) {
      progressHeight = progressShell.getBoundingClientRect().height;
    }

    return Math.ceil(navHeight + progressHeight + offset);
  }

  function scrollToTarget(target) {
    var top;

    if (!target) {
      return;
    }

    top = window.pageYOffset + target.getBoundingClientRect().top - stickyOffset(target);
    window.scrollTo({
      top: Math.max(0, top),
      behavior: smoothBehavior()
    });
  }

  function resetProgressDock() {
    if (!progressShell) {
      return;
    }

    progressShell.style.position = "";
    progressShell.style.top = "";
    progressShell.style.left = "";
    progressShell.style.width = "";
  }

  function syncProgressDockPosition() {
    var navHeight;
    var topOffset;
    var railWidth;
    var hero;
    var sectionRect;
    var heroRect;
    var heroTop;
    var heroContainer;
    var containerRect;
    var absoluteLeft;
    var fixedLeft;

    if (!progressShell || window.innerWidth <= 1199 || state.mode !== "beginner" || !beginnerMode || beginnerMode.classList.contains("d-none")) {
      resetProgressDock();
      return;
    }

    hero = beginnerMode.querySelector(".mode-hero");
    heroContainer = firstDirectContainer(beginnerMode);

    if (!hero || !heroContainer) {
      resetProgressDock();
      return;
    }

    navHeight = modeNav && !modeNav.classList.contains("d-none") ? modeNav.getBoundingClientRect().height : 0;
    topOffset = Math.ceil(navHeight + 10);
    railWidth = rootCssPx("--progress-rail-width", 150);
    sectionRect = beginnerMode.getBoundingClientRect();
    heroRect = hero.getBoundingClientRect();
    heroTop = Math.max(0, Math.round(heroRect.top - sectionRect.top));
    containerRect = heroContainer.getBoundingClientRect();
    absoluteLeft = Math.round(containerRect.left - sectionRect.left);
    fixedLeft = Math.round(containerRect.left);

    progressShell.style.width = railWidth + "px";

    if (heroRect.top > topOffset) {
      progressShell.style.position = "absolute";
      progressShell.style.top = heroTop + "px";
      progressShell.style.left = absoluteLeft + "px";
      return;
    }

    progressShell.style.position = "fixed";
    progressShell.style.top = topOffset + "px";
    progressShell.style.left = fixedLeft + "px";
  }

  function resetGuideSidebar() {
    if (!guideSidebar) {
      return;
    }

    guideSidebar.style.position = "";
    guideSidebar.style.top = "";
    guideSidebar.style.left = "";
    guideSidebar.style.width = "";
  }

  function syncGuideSidebar() {
    resetGuideSidebar();
  }

  function syncBackToTopButton() {
    var showButton;

    if (!backToTopButton) {
      return;
    }

    showButton = (
      (state.mode === "beginner" || state.mode === "explorer" || state.mode === "guide") &&
      window.pageYOffset > 320
    );

    backToTopButton.classList.toggle("is-visible", showButton);
    backToTopButton.setAttribute("aria-hidden", showButton ? "false" : "true");
    backToTopButton.tabIndex = showButton ? 0 : -1;
  }

  function scheduleLayoutSync() {
    if (layoutSyncFrame) {
      return;
    }

    layoutSyncFrame = window.requestAnimationFrame(function () {
      layoutSyncFrame = 0;
      syncProgressDockPosition();
      syncGuideSidebar();
      syncBackToTopButton();
    });
  }

  function titleCaseTag(tag) {
    if (tag === "qa") {
      return "QA";
    }

    return tag
      .split("-")
      .map(function (part) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join(" ");
  }

  function currentGuideTarget() {
    if (state.mode === "guide" && state.guideSection) {
      return state.guideSection;
    }
    if (state.mode === "beginner" && stepMeta[state.currentStep]) {
      return stepMeta[state.currentStep].guideTarget;
    }
    return guideSections.length ? guideSections[0].id : "start-here";
  }

  function currentGuideSection() {
    return guideSectionMap[state.guideSection] || guideSections[0];
  }

  function currentGuideLab() {
    var section = currentGuideSection();

    if (!section || !state.guideFocusLab) {
      return null;
    }

    return (section.labs || []).find(function (lab) {
      return lab.id === state.guideFocusLab;
    }) || null;
  }

  function pickHomeToolkitMapItems() {
    var preferredIds = ["wms-request", "github-setup", "markdown-structure", "qa-checklist"];
    var preferredItems = preferredIds.map(function (id) {
      return explorerItems.find(function (item) {
        return item.id === id;
      });
    }).filter(Boolean);

    return preferredItems.length === preferredIds.length ? preferredItems : explorerItems.slice(0, 4);
  }

  function rememberViewForSearch() {
    if (state.mode === "search") {
      return;
    }

    previousView = {
      mode: state.mode,
      currentStep: state.currentStep,
      guideSection: state.guideSection,
      guideFocusLab: state.guideFocusLab
    };
  }

  function previousViewLabel() {
    if (previousView.mode === "beginner") {
      return "Back to Guided Path";
    }

    if (previousView.mode === "explorer") {
      return "Back to Toolkit";
    }

    if (previousView.mode === "guide") {
      return "Back to Full Guide";
    }

    return "Back to Home";
  }

  function updateNavSearch() {
    if (!navSearchInput) {
      return;
    }

    navSearchInput.value = state.searchQuery;
  }

  function updateNav() {
    modeNav.classList.remove("d-none");

    document.querySelectorAll(".nav-control").forEach(function (button) {
      var targetMode = button.getAttribute("data-mode-target");
      var isActive = targetMode === state.mode;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function updateBreadcrumb() {
    var parts = ["Home"];
    var section;
    var lab;

    if (!breadcrumbTrail) {
      return;
    }

    if (state.mode === "beginner" && stepMeta[state.currentStep]) {
      parts.push("Guided Path");
      parts.push("Step " + (state.currentStep + 1));
      parts.push(stepMeta[state.currentStep].title);
    } else if (state.mode === "explorer") {
      parts.push("Toolkit");
      if (state.activeTag !== "all") {
        parts.push(titleCaseTag(state.activeTag));
      }
    } else if (state.mode === "guide") {
      section = currentGuideSection();
      lab = currentGuideLab();

      if (section) {
        parts.push("Full Guide");
        parts.push(section.label);
        parts.push(section.title);
      }

      if (lab) {
        parts.push(lab.label || "Lab");
        parts.push(lab.title);
      }
    } else if (state.mode === "search") {
      parts.push("Search");
      parts.push(state.searchQuery ? '"' + state.searchQuery + '"' : "Results");
    }

    breadcrumbTrail.innerHTML = parts.map(function (part, index) {
      var isCurrent = index === parts.length - 1;
      return [
        isCurrent ? "<strong>" : '<span class="breadcrumb-label">',
        escapeHtml(part),
        isCurrent ? "</strong>" : "</span>",
        isCurrent ? "" : '<span class="breadcrumb-separator">/</span>'
      ].join("");
    }).join("");
  }

  function updateProgressCaption() {
    if (!progressCaption) {
      return;
    }

    if (state.mode !== "beginner") {
      progressCaption.textContent = "Step 1 of 3 is active.";
      return;
    }

    progressCaption.textContent = "Step " + (state.currentStep + 1) + " of 3: " +
      stepMeta[state.currentStep].title + " (" + (state.fastTrack === "minimal" ? "Fast Track" : "Guided") + ").";
  }

  function updateBeginnerUI() {
    rabbitFlow.classList.toggle("track-minimal", state.fastTrack === "minimal");
    fastTrackToggle.checked = state.fastTrack === "minimal";
    fastTrackStatus.textContent = state.fastTrack === "minimal"
      ? "Fast Track hides the longer notes and common mistakes."
      : "Guided mode keeps notes, common mistakes, and extra context visible.";

    progressButtons.forEach(function (button, index) {
      var isActive = index === state.currentStep;
      var isComplete = index < state.currentStep;
      var mark = button.querySelector(".progress-mark");

      button.classList.toggle("is-active", isActive);
      button.classList.toggle("is-complete", isComplete);
      button.classList.remove("is-locked");
      button.setAttribute("aria-current", isActive ? "step" : "false");
      mark.innerHTML = isComplete ? "&#10003;" : String(index + 1);
    });

    stepSections.forEach(function (section, index) {
      section.classList.toggle("is-active", index === state.currentStep);
      section.classList.toggle("is-complete", index < state.currentStep);
      section.classList.remove("is-locked");
    });

    updateProgressCaption();
    updateBreadcrumb();
  }

  function renderExplorer() {
    var query = state.toolkitQuery.trim().toLowerCase();
    var visibleItems = explorerItems.filter(function (item) {
      var haystack = [
        item.title,
        item.short,
        item.description,
        flattenList(item.steps),
        flattenList(item.checkpoints),
        flattenList(item.watchFor),
        item.snippet || "",
        flattenFields(item.exampleFields),
        flattenResources(item.resourceLinks),
        flattenMilestones(item.milestones)
      ].concat(item.tags).join(" ").toLowerCase();
      var matchesQuery = !query || haystack.indexOf(query) !== -1;
      var matchesTag = state.activeTag === "all" || item.tags.indexOf(state.activeTag) !== -1;
      return matchesQuery && matchesTag;
    });

    bubbleGrid.innerHTML = visibleItems.map(function (item) {
      return [
        '<div class="col bubble-item" data-bubble-id="', item.id, '">',
        '  <button type="button" class="bubble-button" data-open-bubble="', item.id, '" data-accent="red" aria-label="Open ', escapeHtml(item.title), ' details">',
        '    <span class="bubble-badge">', escapeHtml(titleCaseTag(item.tags[0])), "</span>",
        '    <span class="bubble-title">', escapeHtml(item.title), "</span>",
        '    <span class="bubble-text">', escapeHtml(item.short), "</span>",
        "  </button>",
        "</div>"
      ].join("");
    }).join("");

    resultCount.textContent = "Showing " + visibleItems.length + " toolkit card" + (visibleItems.length === 1 ? "" : "s");
    emptyState.classList.toggle("d-none", visibleItems.length !== 0);
  }

  function renderHomeRouteMap() {
    var toolkitItems = pickHomeToolkitMapItems();

    if (!homeRouteMap) {
      return;
    }

    homeRouteMap.innerHTML = [
      '<div class="route-map-board">',
      '  <section class="route-map-entry">',
      '    <div>',
      '      <div class="panel-kicker">Start here</div>',
      '      <h3>Pick a route and move.</h3>',
      '      <p>Choose sequence, one answer, the full map, or the applied workshop demo.</p>',
      "    </div>",
      '    <div class="route-map-entry-actions">',
      '      <button type="button" class="btn btn-primary rounded-pill px-4" data-mode-target="beginner">Open Guided Path</button>',
      '      <button type="button" class="btn btn-outline-primary rounded-pill px-4" data-mode-target="explorer">Open Toolkit</button>',
      '      <button type="button" class="btn btn-outline-secondary rounded-pill px-4" data-guide-target="start-here">Open Full Guide</button>',
      "    </div>",
      "  </section>",
      '  <div class="route-map-grid">',
      '    <article class="route-map-branch" data-accent="red">',
      '      <div class="route-map-branch-head">',
      '        <div>',
      '          <small>Ordered route</small>',
      '          <h4>Guided Path</h4>',
      "        </div>",
      '        <button type="button" class="btn btn-outline-primary rounded-pill px-3" data-mode-target="beginner">Open</button>',
      "      </div>",
      '      <p>Use when you want the shortest start-to-publish path.</p>',
      '      <ol class="route-map-list is-ordered">',
      stepMeta.map(function (step) {
        return "<li><strong>" + escapeHtml(step.title) + "</strong><span>" + escapeHtml(compactText(step.summary, 74)) + "</span></li>";
      }).join(""),
      "      </ol>",
      '      <div class="route-map-branch-foot">Leads to the same sections in Full Guide.</div>',
      "    </article>",
      '    <article class="route-map-branch" data-accent="ocean">',
      '      <div class="route-map-branch-head">',
      '        <div>',
      '          <small>Answer-first route</small>',
      '          <h4>Toolkit</h4>',
      "        </div>",
      '        <button type="button" class="btn btn-outline-primary rounded-pill px-3" data-mode-target="explorer">Open</button>',
      "      </div>",
      '      <p>Use when you already know the blocker.</p>',
      '      <ul class="route-map-list">',
      toolkitItems.map(function (item) {
        return "<li><strong>" + escapeHtml(item.title) + "</strong><span>" + escapeHtml(compactText(item.short || item.description || "", 72)) + "</span></li>";
      }).join(""),
      "      </ul>",
      '      <div class="route-map-branch-foot">Leads to focused cards, snippets, and source links.</div>',
      "    </article>",
      '    <article class="route-map-branch" data-accent="pine">',
      '      <div class="route-map-branch-head">',
      '        <div>',
      '          <small>Section map</small>',
      '          <h4>Full Guide</h4>',
      "        </div>",
      '        <button type="button" class="btn btn-outline-primary rounded-pill px-3" data-guide-target="start-here">Open</button>',
      "      </div>",
      '      <p>Use when you want the whole section map in one place.</p>',
      '      <ul class="route-map-list">',
      guideSections.map(function (section) {
        var count = (section.labs || []).length;
        return "<li><strong>" + escapeHtml(section.label + " - " + section.title) + "</strong><span>" + escapeHtml(count + " item" + (count === 1 ? "" : "s")) + "</span></li>";
      }).join(""),
      "      </ul>",
      '      <div class="route-map-branch-foot">Leads to detailed section cards and source links.</div>',
      "    </article>",
      '    <article class="route-map-branch" data-accent="sienna">',
      '      <div class="route-map-branch-head">',
      '        <div>',
      '          <small>Applied reference</small>',
      '          <h4>Sample Workshop Demo</h4>',
      "        </div>",
      '        <a class="btn btn-outline-primary rounded-pill px-3" href="./sample-workshops/clinical-first-responder-rag/index.html">Open</a>',
      "      </div>",
      '      <p>Use when you want to inspect the design on a workshop surface.</p>',
      '      <ul class="route-map-list">',
      [
        "Provision the platform foundation",
        "Model grounded clinical knowledge",
        "Build prompts, guardrails, and patient chat",
        "Validate escalation and doctor handoff"
      ].map(function (item) {
        return "<li><strong>" + escapeHtml(item) + "</strong><span>Shows the pattern on a real workshop-style page.</span></li>";
      }).join(""),
      "      </ul>",
      '      <div class="route-map-branch-foot">Leads to an applied workshop example.</div>',
      "    </article>",
      "  </div>",
      '  <div class="route-map-ribbon">',
      '    <div>',
      '      <strong>Search crosses every route.</strong>',
      '      <span>One search surface crosses Guided Path, Toolkit, and Full Guide.</span>',
      "    </div>",
      '    <button type="button" class="btn btn-outline-secondary rounded-pill px-4" data-mode-target="search">Open Search</button>',
      "  </div>",
      "</div>"
    ].join("");
  }

  function setActiveTag(tag) {
    state.activeTag = tag;
    tagPills.forEach(function (pill) {
      pill.classList.toggle("is-active", pill.getAttribute("data-tag") === tag);
    });
    renderExplorer();
  }

  function fillList(id, items) {
    document.getElementById(id).innerHTML = (items || []).map(function (entry) {
      return "<li>" + escapeHtml(entry) + "</li>";
    }).join("");
  }

  function decorateExpandableMedia(root) {
    if (!root) {
      return;
    }

    root.querySelectorAll(".step-figure, .guide-figure, .modal-media-figure, .evidence-figure").forEach(function (figure) {
      var image = figure.querySelector("img");
      var caption = figure.querySelector("figcaption");
      var captionText;
      var pill;

      if (!image) {
        return;
      }

      captionText = caption ? caption.textContent.trim() : "";
      figure.setAttribute("data-expandable", "true");
      figure.setAttribute("tabindex", "0");
      figure.setAttribute("role", "button");
      figure.setAttribute("aria-label", captionText ? "Expand image: " + captionText : "Expand image");

      pill = figure.querySelector(".figure-expand-pill");
      if (!pill) {
        pill = document.createElement("span");
        pill.className = "figure-expand-pill";
        pill.setAttribute("aria-hidden", "true");
        pill.textContent = "Click to expand";
        figure.insertBefore(pill, figure.firstChild);
      }
    });
  }

  function openImageLightbox(figure) {
    var image;
    var caption;
    var captionText;

    if (!figure || !imageLightbox) {
      return;
    }

    image = figure.querySelector("img");
    caption = figure.querySelector("figcaption");

    if (!image) {
      return;
    }

    captionText = caption ? caption.textContent.trim() : (image.getAttribute("alt") || "");
    lastExpandedFigure = figure;
    imageLightboxImage.setAttribute("src", image.currentSrc || image.getAttribute("src") || "");
    imageLightboxImage.setAttribute("alt", image.getAttribute("alt") || "");
    imageLightboxCaption.textContent = captionText;
    imageLightbox.removeAttribute("hidden");
    imageLightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("image-lightbox-open");
    imageLightboxClose.focus();
    setLiveMessage("Expanded image opened.");
  }

  function closeImageLightbox(options) {
    var config = Object.assign({
      announce: true,
      restoreFocus: true
    }, options || {});

    if (!imageLightbox || imageLightbox.hasAttribute("hidden")) {
      return;
    }

    imageLightbox.setAttribute("hidden", "");
    imageLightbox.setAttribute("aria-hidden", "true");
    imageLightboxImage.setAttribute("src", "");
    imageLightboxImage.setAttribute("alt", "");
    imageLightboxCaption.textContent = "";
    document.body.classList.remove("image-lightbox-open");

    if (config.restoreFocus && lastExpandedFigure && typeof lastExpandedFigure.focus === "function") {
      lastExpandedFigure.focus();
    }

    lastExpandedFigure = null;

    if (config.announce) {
      setLiveMessage("Expanded image closed.");
    }
  }

  function buildSupportBlockHtml(title, intro, innerHtml, kicker) {
    if (!innerHtml) {
      return "";
    }

    return [
      '<section class="detail-support-block">',
      '  <div class="detail-block-header">',
      kicker ? '    <div class="panel-kicker">' + escapeHtml(kicker) + "</div>" : "",
      title ? '    <h3>' + escapeHtml(title) + "</h3>" : "",
      intro ? '    <p>' + escapeHtml(intro) + "</p>" : "",
      "  </div>",
      innerHtml,
      "</section>"
    ].join("");
  }

  function buildFieldCardsHtml(title, intro, fields, kicker) {
    if (!fields || !fields.length) {
      return "";
    }

    return buildSupportBlockHtml(title, intro, [
      '<div class="detail-field-grid">',
      fields.map(function (field) {
        return [
          '<article class="detail-field-card">',
          '  <span class="detail-field-label">', escapeHtml(field.label), "</span>",
          '  <p class="detail-field-value">', escapeHtml(field.value), "</p>",
          field.guidance || field.note ? '  <p class="detail-field-note">' + escapeHtml(field.guidance || field.note) + "</p>" : "",
          "</article>"
        ].join("");
      }).join(""),
      "</div>"
    ].join(""), kicker || "Worked example");
  }

  function buildMilestoneCardsHtml(title, intro, items, kicker) {
    if (!items || !items.length) {
      return "";
    }

    return buildSupportBlockHtml(title, intro, [
      '<div class="detail-milestone-grid">',
      items.map(function (item) {
        return [
          '<article class="detail-milestone-card">',
          '  <strong>', escapeHtml(item.label), "</strong>",
          '  <p>', escapeHtml(item.detail), "</p>",
          "</article>"
        ].join("");
      }).join(""),
      "</div>"
    ].join(""), kicker || "Status flow");
  }

  function buildResourceLinksHtml(title, intro, items, kicker) {
    if (!items || !items.length) {
      return "";
    }

    return buildSupportBlockHtml(title, intro, [
      '<div class="detail-resource-grid">',
      items.map(function (item) {
        return [
          '<a class="detail-resource-link" href="', escapeHtml(item.href), '" target="_blank" rel="noreferrer">',
          '  <strong>', escapeHtml(item.label), "</strong>",
          item.note ? '  <span>' + escapeHtml(item.note) + "</span>" : "",
          "</a>"
        ].join("");
      }).join(""),
      "</div>"
    ].join(""), kicker || "Resources");
  }

  function setSupportMount(id, html) {
    var mount = document.getElementById(id);

    if (!mount) {
      return;
    }

    mount.innerHTML = html || "";
    mount.classList.toggle("d-none", !html);
  }

  function hydrateVideoCards(root) {
    if (window.RedwoodVideoPlayer && typeof window.RedwoodVideoPlayer.hydrate === "function") {
      window.RedwoodVideoPlayer.hydrate(root || document);
    }
  }

  function renderVideoCardMount(config) {
    if (!window.RedwoodVideoPlayer || typeof window.RedwoodVideoPlayer.createMountMarkup !== "function") {
      return "";
    }

    return window.RedwoodVideoPlayer.createMountMarkup(Object.assign({
      src: "./assets/media/guide/author-guide-template.mp4",
      captions: "./assets/media/guide/author-guide-template.vtt",
      autoplay: true,
      loop: true
    }, config || {}));
  }

  function openBubble(id) {
    var item = explorerItems.find(function (candidate) {
      return candidate.id === id;
    });
    var mediaCard;
    var sourceLink;
    var guideButton;
    var snippetCard;

    if (!item) {
      return;
    }

    document.getElementById("bubbleModalKicker").textContent = item.tags.map(titleCaseTag).join(" / ");
    document.getElementById("bubbleModalLabel").textContent = item.title;
    document.getElementById("bubbleModalDescription").textContent = item.description;
    document.getElementById("bubbleModalTags").innerHTML = item.tags.map(function (tag) {
      return '<span class="detail-tag">' + escapeHtml(titleCaseTag(tag)) + "</span>";
    }).join("");
    fillList("bubbleModalSteps", item.steps);
    fillList("bubbleModalCheckpoints", item.checkpoints);
    fillList("bubbleModalWatchFor", item.watchFor);

    mediaCard = document.getElementById("bubbleModalMediaCard");
    if (item.image) {
      document.getElementById("bubbleModalImage").setAttribute("src", item.image.src);
      document.getElementById("bubbleModalImage").setAttribute("alt", item.image.alt || item.title);
      document.getElementById("bubbleModalImageCaption").textContent = item.image.caption || "";
      mediaCard.classList.remove("d-none");
      decorateExpandableMedia(mediaCard);
    } else {
      mediaCard.classList.add("d-none");
    }

    setSupportMount(
      "bubbleModalMilestonesMount",
      buildMilestoneCardsHtml(item.milestonesTitle || "Status flow", item.milestonesIntro || "", item.milestones, "Status flow")
    );
    setSupportMount(
      "bubbleModalExampleMount",
      buildFieldCardsHtml(item.exampleTitle || "Worked example", item.exampleIntro || "", item.exampleFields, "Worked example")
    );
    setSupportMount(
      "bubbleModalResourcesMount",
      buildResourceLinksHtml(item.resourcesTitle || "Useful links", item.resourcesIntro || "", item.resourceLinks, "Resources")
    );
    setSupportMount(
      "bubbleModalVideoMount",
      renderVideoPlaceholderCard(
        "Recorded walkthrough for " + item.title,
        "Watch the quick topic pass first, then use the panel details, snippets, and source links underneath.",
        [
          "Topic walkthrough",
          "Captions + transcript",
          "Autoplay ready"
        ]
      )
    );

    snippetCard = document.getElementById("bubbleModalSnippetCard");
    if (item.snippet) {
      document.getElementById("bubbleModalSnippetMeta").textContent = item.snippetMeta || "Reference snippet";
      document.getElementById("bubbleModalSnippetTitle").textContent = item.snippetTitle || "Snippet";
      document.getElementById("bubbleModalSnippet").textContent = item.snippet;
      snippetCard.classList.remove("d-none");
    } else {
      document.getElementById("bubbleModalSnippet").textContent = "";
      snippetCard.classList.add("d-none");
    }

    sourceLink = document.getElementById("bubbleModalSourceLink");
    if (item.sourceHref) {
      sourceLink.setAttribute("href", item.sourceHref);
      sourceLink.textContent = item.sourceLabel || "Open Canonical Source";
      sourceLink.classList.remove("d-none");
    } else {
      sourceLink.classList.add("d-none");
    }

    guideButton = document.getElementById("bubbleModalGuideButton");
    if (item.guideTarget) {
      guideButton.setAttribute("data-guide-target", item.guideTarget);
      guideButton.classList.remove("d-none");
    } else {
      guideButton.classList.add("d-none");
    }

    hydrateVideoCards(bubbleModalElement);
    bubbleModal.show();
    setLiveMessage(item.title + " opened.");
  }

  function renderGuideNav() {
    if (!guideSectionNav) {
      return;
    }

    guideSectionNav.innerHTML = guideSections.map(function (section) {
      var labCount = (section.labs || []).length;

      return [
        '<button type="button" class="guide-nav-link',
        section.id === state.guideSection ? " is-active" : "",
        '" data-guide-section="', section.id, '" data-accent="', section.accent, '">',
        '  <small>', escapeHtml(section.label), "</small>",
        '  <strong>', escapeHtml(section.title), "</strong>",
        '  <span class="guide-nav-meta">', labCount, " item", labCount === 1 ? "" : "s", "</span>",
        "</button>"
      ].join("");
    }).join("");
  }

  function renderGuideQuickNav() {
    if (!guideQuickNav) {
      return;
    }

    guideQuickNav.innerHTML = guideSections.map(function (section) {
      return [
        '<button type="button" class="guide-quick-link',
        section.id === state.guideSection ? " is-active" : "",
        '" data-guide-section="', section.id, '">',
        '  <span>', escapeHtml(section.label), "</span>",
        '  <strong>', escapeHtml(section.title), "</strong>",
        "</button>"
      ].join("");
    }).join("");
  }

  function buildGuideBreadcrumb(section, lab) {
    return [
      '<div class="guide-inline-breadcrumb" aria-label="Current guide section">',
      "  <span>Full Guide</span>",
      "  <span>/</span>",
      "  <span>", escapeHtml(section.label), "</span>",
      "  <span>/</span>",
      "  <strong>", escapeHtml(section.title), "</strong>",
      lab ? "  <span>/</span>" : "",
      lab ? "  <strong>" + escapeHtml(lab.title) + "</strong>" : "",
      "</div>"
    ].join("");
  }

  function renderGuidePanel(title, items, options) {
    var config = Object.assign({
      ordered: false
    }, options || {});
    var listTag = config.ordered ? "ol" : "ul";
    var listClass = config.ordered ? "guide-list is-ordered" : "guide-list";

    if (!items || !items.length) {
      return "";
    }

    return [
      '<div class="guide-lab-panel">',
      '  <h4>', escapeHtml(title), "</h4>",
      "  <", listTag, ' class="', listClass, '">',
      items.map(function (item) {
        return "<li>" + escapeHtml(item) + "</li>";
      }).join(""),
      "  </", listTag, ">",
      "</div>"
    ].join("");
  }

  function renderGuideSnippetCard(id, snippet, title, meta) {
    if (!snippet) {
      return "";
    }

    return [
      '<div class="card snippet-card mt-4">',
      '  <div class="card-body">',
      '    <div class="snippet-header">',
      "      <div>",
      '        <div class="snippet-meta">', escapeHtml(meta || "Copy-ready detail"), "</div>",
      '        <h4 class="mb-0">', escapeHtml(title || "Snippet"), "</h4>",
      "      </div>",
      '      <button class="copy-snippet" type="button" data-copy-target="', id, '">Copy</button>',
      "    </div>",
      '    <pre><code id="', id, '">', escapeHtml(snippet), "</code></pre>",
      "  </div>",
      "</div>"
    ].join("");
  }

  function renderVideoPlaceholderCard(title, summary, featureLabels) {
    return renderVideoCardMount({
      title: title,
      summary: summary,
      features: featureLabels || [
        "Controls ready",
        "Captions + transcript",
        "Autoplay ready"
      ]
    });
  }

  function guideSectionVideoFeatures(section) {
    var features = (section.highlights || []).slice(0, 3);

    if (features.length) {
      return features;
    }

    return (section.labs || []).slice(0, 3).map(function (lab) {
      return lab.label || lab.title;
    });
  }

  function renderGuideLab(section, lab) {
    var snippetId = "guide-snippet-" + section.id + "-" + lab.id;
    var targetedClass = state.guideFocusLab === lab.id ? " is-targeted" : "";
    var stepsBlock = renderGuidePanel("What You Do", lab.steps || [], { ordered: true });
    var mediaBlock = lab.image ? [
      '<figure class="guide-figure">',
      '  <img src="', escapeHtml(lab.image.src), '" alt="', escapeHtml(lab.image.alt || lab.title), '">',
      '  <figcaption>', escapeHtml(lab.image.caption || ""), "</figcaption>",
      "</figure>"
    ].join("") : "";
    var flowBlock = mediaBlock ? '<div class="guide-lab-flow">' + stepsBlock + mediaBlock + "</div>" : stepsBlock;
    var supportBlocks = [
      buildFieldCardsHtml(lab.exampleTitle || "Worked example", lab.exampleIntro || "", lab.exampleFields, "Worked example"),
      buildMilestoneCardsHtml(lab.milestonesTitle || "Status flow", lab.milestonesIntro || "", lab.milestones, "Status flow"),
      renderGuidePanel(lab.checkpointsTitle || "Before You Move On", lab.checkpoints || []),
      buildResourceLinksHtml(lab.resourcesTitle || "Useful links", lab.resourcesIntro || "", lab.resourceLinks, "Resources"),
      renderGuidePanel("Watch For", lab.watchFor || [])
    ].filter(Boolean).join("");

    return [
      '<article class="guide-lab-card', targetedClass, '" id="guide-lab-', section.id, "-", lab.id, '">',
      '  <div class="guide-lab-top">',
      '    <div class="guide-lab-label">', escapeHtml(lab.label || "Lab"), "</div>",
      '    <h3 class="guide-lab-title">', escapeHtml(lab.title), "</h3>",
      '    <p class="guide-lab-summary">', escapeHtml(lab.summary), "</p>",
      "  </div>",
      flowBlock,
      supportBlocks ? '<div class="guide-lab-panels">' + supportBlocks + "</div>" : "",
      renderGuideSnippetCard(snippetId, lab.snippet, lab.snippetTitle || "Snippet", lab.snippetMeta || "Copy-ready detail"),
      '  <div class="guide-lab-actions">',
      lab.sourceHref ? '<a class="btn btn-outline-secondary rounded-pill px-4" href="' + escapeHtml(lab.sourceHref) + '" target="_blank" rel="noreferrer">' + escapeHtml(lab.sourceLabel || "Open Canonical Lab") + "</a>" : "",
      "  </div>",
      "</article>"
    ].join("");
  }

  function renderGuideSection() {
    var section = currentGuideSection();
    var lab = currentGuideLab();

    if (!section || !guideSectionMount) {
      return;
    }

    guideSectionMount.innerHTML = [
      '<article class="guide-section-card" data-accent="', section.accent, '">',
      '  <div class="guide-section-hero">',
      '    <div class="guide-section-copy">',
      buildGuideBreadcrumb(section, lab),
      '      <div class="panel-kicker">', escapeHtml(section.label), "</div>",
      '      <h2 class="guide-section-title">', escapeHtml(section.title), "</h2>",
      '      <p class="guide-section-summary">', escapeHtml(section.summary), "</p>",
      '      <p class="guide-section-purpose">', escapeHtml(section.purpose), "</p>",
      renderVideoPlaceholderCard(
        section.title + " walkthrough",
        section.summary || section.purpose || "Use the recorded walkthrough first, then move through the section cards underneath.",
        guideSectionVideoFeatures(section)
      ),
      '      <div class="guide-highlight-row">',
      section.highlights.map(function (item) {
        return '<span class="guide-highlight-chip">' + escapeHtml(item) + "</span>";
      }).join(""),
      "      </div>",
      '      <div class="guide-section-actions">',
      '        <button type="button" class="btn btn-outline-primary rounded-pill px-4" data-mode-target="explorer">Open Reference Toolkit</button>',
      section.sectionHref ? '<a class="btn btn-outline-secondary rounded-pill px-4" href="' + escapeHtml(section.sectionHref) + '" target="_blank" rel="noreferrer">' + escapeHtml(section.sectionLabel || "Open Canonical Section") + "</a>" : "",
      "      </div>",
      "    </div>",
      "  </div>",
      '  <div class="guide-lab-grid">',
      section.labs.map(function (lab) {
        return renderGuideLab(section, lab);
      }).join(""),
      "  </div>",
      "</article>"
    ].join("");

    renderGuideNav();
    renderGuideQuickNav();
    hydrateVideoCards(guideSectionMount);
    decorateExpandableMedia(guideSectionMount);
    scheduleLayoutSync();
    updateBreadcrumb();
  }

  function createSearchEntry(config) {
    var titleText = config.title || "";
    var summaryText = config.summary || "";
    var pathText = config.path || "";
    var bodyText = [
      config.body || "",
      flattenList(config.steps),
      flattenList(config.checkpoints),
      flattenList(config.watchFor),
      config.snippet || "",
      flattenFields(config.exampleFields),
      flattenResources(config.resourceLinks),
      flattenMilestones(config.milestones),
      flattenList(config.tags),
      flattenList(config.keywords)
    ].join(" ");
    var titleNorm = expandSearchText(titleText);
    var summaryNorm = expandSearchText(summaryText);
    var pathNorm = expandSearchText(pathText);
    var bodyNorm = expandSearchText(bodyText);

    return {
      id: config.id,
      typeLabel: config.typeLabel,
      title: titleText,
      summary: summaryText,
      path: pathText,
      sourceHref: config.sourceHref || "",
      sourceLabel: config.sourceLabel || "",
      open: config.open,
      titleNorm: titleNorm,
      summaryNorm: summaryNorm,
      pathNorm: pathNorm,
      bodyNorm: bodyNorm,
      combinedNorm: [titleNorm, summaryNorm, pathNorm, bodyNorm].join(" "),
      titleTokens: tokenSet(titleNorm),
      summaryTokens: tokenSet(summaryNorm),
      pathTokens: tokenSet(pathNorm),
      combinedTokens: tokenSet([titleNorm, summaryNorm, pathNorm, bodyNorm].join(" "))
    };
  }

  function buildSearchIndex() {
    searchIndex = [];
    searchEntryMap = {};

    stepMeta.forEach(function (meta, index) {
      var entry = createSearchEntry({
        id: "guided-" + meta.id,
        typeLabel: "Guided Path",
        title: meta.title,
        summary: meta.summary || "",
        path: "Guided Path / Step " + (index + 1),
        body: stepSections[index] ? stepSections[index].textContent : "",
        keywords: meta.keywords || [],
        open: {
          kind: "guided",
          step: index
        }
      });

      searchIndex.push(entry);
      searchEntryMap[entry.id] = entry;
    });

    explorerItems.forEach(function (item) {
      var entry = createSearchEntry({
        id: "toolkit-" + item.id,
        typeLabel: "Toolkit",
        title: item.title,
        summary: item.description || item.short || "",
        path: "Toolkit / " + item.title,
        steps: item.steps,
        checkpoints: item.checkpoints,
        watchFor: item.watchFor,
        snippet: item.snippet,
        exampleFields: item.exampleFields,
        resourceLinks: item.resourceLinks,
        milestones: item.milestones,
        tags: item.tags,
        sourceHref: item.sourceHref,
        sourceLabel: item.sourceLabel,
        open: {
          kind: "toolkit",
          itemId: item.id
        }
      });

      searchIndex.push(entry);
      searchEntryMap[entry.id] = entry;
    });

    guideSections.forEach(function (section) {
      var sectionEntry = createSearchEntry({
        id: "guide-section-" + section.id,
        typeLabel: "Full Guide",
        title: section.title,
        summary: section.summary || section.purpose || "",
        path: "Full Guide / " + section.label + " / " + section.title,
        body: [section.purpose || "", flattenList(section.highlights)].join(" "),
        sourceHref: section.sectionHref,
        sourceLabel: section.sectionLabel,
        open: {
          kind: "guide-section",
          sectionId: section.id
        }
      });

      searchIndex.push(sectionEntry);
      searchEntryMap[sectionEntry.id] = sectionEntry;

      (section.labs || []).forEach(function (lab) {
        var labEntry = createSearchEntry({
          id: "guide-lab-" + section.id + "-" + lab.id,
          typeLabel: "Full Guide",
          title: lab.title,
          summary: lab.summary || "",
          path: "Full Guide / " + section.label + " / " + (lab.label || "Lab") + " / " + lab.title,
          steps: lab.steps,
          checkpoints: lab.checkpoints,
          watchFor: lab.watchFor,
          snippet: lab.snippet,
          exampleFields: lab.exampleFields,
          resourceLinks: lab.resourceLinks,
          milestones: lab.milestones,
          sourceHref: lab.sourceHref,
          sourceLabel: lab.sourceLabel,
          open: {
            kind: "guide-lab",
            sectionId: section.id,
            labId: lab.id
          }
        });

        searchIndex.push(labEntry);
        searchEntryMap[labEntry.id] = labEntry;
      });
    });
  }

  function scoreSearchEntry(entry, query) {
    var normalizedQuery = normalizeText(query);
    var queryTokens = Array.from(new Set(tokenize(expandSearchText(query))));
    var matchedTokens = 0;
    var score = 0;

    if (!normalizedQuery && !queryTokens.length) {
      return 0;
    }

    if (normalizedQuery && entry.titleNorm.indexOf(normalizedQuery) !== -1) {
      score += 80;
    }

    if (normalizedQuery && normalizedQuery.indexOf(" ") !== -1 && entry.summaryNorm.indexOf(normalizedQuery) !== -1) {
      score += 38;
    }

    if (normalizedQuery && entry.pathNorm.indexOf(normalizedQuery) !== -1) {
      score += 24;
    }

    if (normalizedQuery && entry.bodyNorm.indexOf(normalizedQuery) !== -1) {
      score += 18;
    }

    queryTokens.forEach(function (token) {
      if (entry.titleTokens.has(token)) {
        matchedTokens += 1;
        score += 14;
        return;
      }

      if (entry.pathTokens.has(token)) {
        matchedTokens += 1;
        score += 10;
        return;
      }

      if (entry.summaryTokens.has(token)) {
        matchedTokens += 1;
        score += 8;
        return;
      }

      if (entry.combinedTokens.has(token)) {
        matchedTokens += 1;
        score += 4;
      }
    });

    if (queryTokens.length && matchedTokens === queryTokens.length) {
      score += 22;
    } else if (queryTokens.length > 1 && matchedTokens >= 2) {
      score += 8;
    }

    return score;
  }

  function renderSearchResultCard(result) {
    return [
      '<article class="search-result-card">',
      '  <div class="search-result-top">',
      '    <span class="search-result-kicker">', escapeHtml(result.typeLabel), "</span>",
      "  </div>",
      '  <div class="search-result-path">', escapeHtml(result.path), "</div>",
      '  <h3 class="search-result-title">', escapeHtml(result.title), "</h3>",
      '  <p class="search-result-summary">', escapeHtml(result.summary), "</p>",
      '  <div class="search-result-actions">',
      '    <button type="button" class="btn btn-primary rounded-pill px-4" data-search-open="', result.id, '">Open Result</button>',
      result.sourceHref ? '<a class="btn btn-outline-secondary rounded-pill px-4" href="' + escapeHtml(result.sourceHref) + '" target="_blank" rel="noreferrer">' + escapeHtml(result.sourceLabel || "Open Canonical Source") + "</a>" : "",
      "  </div>",
      "</article>"
    ].join("");
  }

  function renderSearchResults() {
    var query = state.searchQuery.trim();
    var results;

    if (!searchResultsMount || !searchEmptyState) {
      return;
    }

    if (searchBackButton) {
      searchBackButton.textContent = previousViewLabel();
    }

    if (searchQueryChip) {
      searchQueryChip.textContent = query ? 'Query: "' + query + '"' : "No query yet";
    }

    if (!query) {
      searchSummary.textContent = "Enter keywords or a short question in the menu search. Results link back into the exact guided step, toolkit card, or full-guide section that best matches the query.";
      searchCountChip.textContent = "0 results";
      searchResultsMount.innerHTML = "";
      searchEmptyState.innerHTML = "Use the search field in the menu to search by keywords such as <strong>WMS</strong>, <strong>Self QA</strong>, <strong>GitHub Pages</strong>, <strong>validator</strong>, or a short question such as <strong>how do I publish</strong>.";
      searchEmptyState.classList.remove("d-none");
      updateBreadcrumb();
      return;
    }

    results = searchIndex
      .map(function (entry) {
        return {
          entry: entry,
          score: scoreSearchEntry(entry, query)
        };
      })
      .filter(function (item) {
        return item.score >= 14;
      })
      .sort(function (left, right) {
        return right.score - left.score;
      })
      .slice(0, 14)
      .map(function (item) {
        return item.entry;
      });

    searchResultsMount.innerHTML = results.map(renderSearchResultCard).join("");
    searchCountChip.textContent = results.length + " result" + (results.length === 1 ? "" : "s");

    if (results.length) {
      searchSummary.textContent = "Results are ranked by title match, keyword overlap, path relevance, and deeper body matches across the guided path, toolkit, and full guide.";
      searchEmptyState.classList.add("d-none");
    } else {
      searchSummary.textContent = "The guide did not find a strong match for that query yet.";
      searchEmptyState.innerHTML = 'No strong matches for <strong>"' + escapeHtml(query) + '</strong>. Try shorter keywords such as <strong>publish</strong>, <strong>validator</strong>, <strong>Quarterly QA</strong>, <strong>GitHub Pages</strong>, or <strong>manifest</strong>.';
      searchEmptyState.classList.remove("d-none");
    }

    updateBreadcrumb();
  }

  function runGlobalSearch(rawQuery) {
    state.searchQuery = String(rawQuery || "").trim();
    rememberViewForSearch();
    switchMode("search");
  }

  function returnFromSearch() {
    if (previousView.mode === "beginner") {
      state.currentStep = previousView.currentStep || 0;
      switchMode("beginner");
      goToStep(state.currentStep, { scroll: true, hash: true, announce: false });
      return;
    }

    if (previousView.mode === "explorer") {
      switchMode("explorer");
      return;
    }

    if (previousView.mode === "guide") {
      switchMode("guide", {
        guideSection: previousView.guideSection || (guideSections[0] && guideSections[0].id),
        guideFocusLab: previousView.guideFocusLab || ""
      });
      return;
    }

    switchMode("hub");
  }

  function openSearchResult(entryId) {
    var entry = searchEntryMap[entryId];

    if (!entry) {
      return;
    }

    if (entry.open.kind === "guided") {
      goToStep(entry.open.step);
      return;
    }

    if (entry.open.kind === "toolkit") {
      state.toolkitQuery = "";
      bubbleSearch.value = "";
      setActiveTag("all");
      switchMode("explorer", { openBubble: entry.open.itemId });
      return;
    }

    if (entry.open.kind === "guide-section") {
      switchMode("guide", { guideSection: entry.open.sectionId, guideFocusLab: "" });
      return;
    }

    if (entry.open.kind === "guide-lab") {
      switchMode("guide", { guideSection: entry.open.sectionId, guideFocusLab: entry.open.labId });
    }
  }

  function switchMode(mode, options) {
    var config = Object.assign({
      scroll: true,
      hash: true,
      announce: true,
      openBubble: null,
      guideSection: state.guideSection,
      guideFocusLab: null,
      resetStep: false,
      forceTop: false
    }, options || {});
    var guideTarget;

    closeImageLightbox({ announce: false, restoreFocus: false });

    if (config.guideSection && guideSectionMap[config.guideSection]) {
      state.guideSection = config.guideSection;
    }

    if (mode !== "guide") {
      state.guideFocusLab = "";
    }

    if (config.guideFocusLab !== null) {
      state.guideFocusLab = config.guideFocusLab || "";
    }

    if (mode === "beginner" && config.resetStep) {
      state.currentStep = 0;
    }

    state.mode = mode;
    hub.classList.toggle("d-none", mode !== "hub");
    beginnerMode.classList.toggle("d-none", mode !== "beginner");
    explorerMode.classList.toggle("d-none", mode !== "explorer");
    guideMode.classList.toggle("d-none", mode !== "guide");
    searchMode.classList.toggle("d-none", mode !== "search");

    if (mode !== "explorer") {
      bubbleModal.hide();
    }

    updateNav();
    updateNavSearch();

    if (mode === "beginner") {
      updateBeginnerUI();
      if (config.scroll !== false) {
        if (config.forceTop) {
          window.scrollTo({ top: 0, behavior: smoothBehavior() });
        } else {
          goToStep(state.currentStep, { scroll: true, hash: false, announce: false });
        }
      }
    } else if (mode === "explorer") {
      renderExplorer();
      updateBreadcrumb();
      if (config.scroll !== false) {
        if (config.forceTop) {
          window.scrollTo({ top: 0, behavior: smoothBehavior() });
        } else {
          scrollToTarget(explorerMode);
        }
      }
    } else if (mode === "guide") {
      renderGuideSection();
      if (config.scroll !== false) {
        if (config.forceTop) {
          window.scrollTo({ top: 0, behavior: smoothBehavior() });
        } else {
          guideTarget = state.guideFocusLab ? document.getElementById("guide-lab-" + state.guideSection + "-" + state.guideFocusLab) : null;
          scrollToTarget(guideTarget || guideMode);
        }
      }
    } else if (mode === "search") {
      renderSearchResults();
      if (config.scroll !== false) {
        if (config.forceTop) {
          window.scrollTo({ top: 0, behavior: smoothBehavior() });
        } else {
          scrollToTarget(searchMode);
        }
      }
    } else {
      updateBreadcrumb();
      if (config.scroll !== false) {
        window.scrollTo({ top: 0, behavior: smoothBehavior() });
      }
    }

    if (config.hash !== false) {
      updateHashFromState();
    }

    if (config.openBubble) {
      window.setTimeout(function () {
        openBubble(config.openBubble);
      }, prefersReducedMotion ? 0 : 220);
    }

    scheduleLayoutSync();

    if (config.announce !== false) {
      if (mode === "hub") {
        setLiveMessage("Returned to the guide home.");
      } else if (mode === "beginner") {
        setLiveMessage("Guided path opened.");
      } else if (mode === "explorer") {
        setLiveMessage("Reference toolkit opened.");
      } else if (mode === "guide") {
        setLiveMessage("Full Guide opened at " + (currentGuideSection() ? currentGuideSection().title : "Start Guide") + ".");
      } else if (mode === "search") {
        setLiveMessage("Search results opened.");
      }
    }
  }

  function goToStep(index, options) {
    var config = Object.assign({
      scroll: true,
      hash: true,
      announce: true
    }, options || {});
    var boundedIndex = Math.max(0, Math.min(index, stepSections.length - 1));

    state.currentStep = boundedIndex;

    if (state.mode !== "beginner") {
      switchMode("beginner", { scroll: false, hash: false, announce: false });
    }

    updateBeginnerUI();

    if (config.scroll !== false) {
      suppressObserver = true;
      scrollToTarget(stepSections[boundedIndex]);
      window.setTimeout(function () {
        suppressObserver = false;
      }, prefersReducedMotion ? 50 : 420);
    }

    if (config.hash !== false) {
      updateHashFromState();
    }

    if (config.announce !== false) {
      setLiveMessage("Step " + (boundedIndex + 1) + ". " + stepMeta[boundedIndex].title + ".");
    }
  }

  function nextStep() {
    if (state.currentStep < stepSections.length - 1) {
      goToStep(state.currentStep + 1);
    }
  }

  function prevStep() {
    if (state.currentStep > 0) {
      goToStep(state.currentStep - 1);
    }
  }

  function copyWithFallback(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      var helper = document.createElement("textarea");
      helper.value = text;
      helper.setAttribute("readonly", "");
      helper.style.position = "absolute";
      helper.style.left = "-9999px";
      document.body.appendChild(helper);
      helper.select();
      try {
        document.execCommand("copy");
        resolve();
      } catch (error) {
        reject(error);
      } finally {
        document.body.removeChild(helper);
      }
    });
  }

  function copyTarget(targetId, button) {
    var target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    copyWithFallback(target.textContent).then(function () {
      var original = button.textContent;
      button.textContent = "Copied";
      button.classList.add("is-copied");
      setLiveMessage("Snippet copied to clipboard.");
      window.setTimeout(function () {
        button.textContent = original;
        button.classList.remove("is-copied");
      }, 1400);
    }).catch(function () {
      setLiveMessage("Copy failed. Select the text manually.");
    });
  }

  function handleShortcutBubble(id) {
    state.toolkitQuery = "";
    bubbleSearch.value = "";
    setActiveTag("all");
    switchMode("explorer", { openBubble: id });
  }

  function applyHash(hash) {
    var cleaned = (hash || "").replace("#", "").trim();
    var index;
    var query;

    if (!cleaned || cleaned === "home" || cleaned === "hub") {
      switchMode("hub", { scroll: false, hash: false, announce: false });
      return;
    }

    if (cleaned === "guided") {
      switchMode("beginner", { scroll: false, hash: false, announce: false });
      updateBeginnerUI();
      return;
    }

    if (cleaned === "toolkit" || cleaned === "explorer") {
      switchMode("explorer", { scroll: false, hash: false, announce: false });
      return;
    }

    if (cleaned === "guide" || cleaned === "full-guide") {
      switchMode("guide", {
        scroll: false,
        hash: false,
        announce: false,
        guideSection: guideSections.length ? guideSections[0].id : "",
        guideFocusLab: ""
      });
      return;
    }

    if (cleaned.indexOf("guide-") === 0 && guideSectionMap[cleaned.replace("guide-", "")]) {
      switchMode("guide", {
        scroll: false,
        hash: false,
        announce: false,
        guideSection: cleaned.replace("guide-", ""),
        guideFocusLab: ""
      });
      return;
    }

    if (cleaned === "search" || cleaned.indexOf("search:") === 0) {
      query = cleaned.indexOf("search:") === 0 ? decodeURIComponent(cleaned.slice(7)) : "";
      state.searchQuery = query;
      updateNavSearch();
      switchMode("search", { scroll: false, hash: false, announce: false });
      return;
    }

    if (cleaned.indexOf("step-") === 0) {
      index = Number(cleaned.replace("step-", "")) - 1;
      if (!Number.isNaN(index)) {
        state.currentStep = Math.max(0, Math.min(index, stepSections.length - 1));
        switchMode("beginner", { scroll: false, hash: false, announce: false });
        updateBeginnerUI();
        return;
      }
    }

    switchMode("hub", { scroll: false, hash: false, announce: false });
  }

  var observer = new IntersectionObserver(function (entries) {
    var visibleEntry;
    var index;

    if (state.mode !== "beginner" || suppressObserver) {
      return;
    }

    visibleEntry = entries
      .filter(function (entry) {
        return entry.isIntersecting;
      })
      .sort(function (left, right) {
        return right.intersectionRatio - left.intersectionRatio;
      })[0];

    if (!visibleEntry || visibleEntry.intersectionRatio < 0.58) {
      return;
    }

    index = Number(visibleEntry.target.getAttribute("data-step-index") || "0");
    if (index !== state.currentStep) {
      state.currentStep = index;
      updateBeginnerUI();
      updateHashFromState();
    }
  }, {
    threshold: [0.58]
  });

  stepSections.forEach(function (section) {
    observer.observe(section);
  });

  document.addEventListener("click", function (event) {
    var modeButton = event.target.closest("[data-mode-target]");
    var progressButton = event.target.closest("[data-step-target]");
    var actionButton = event.target.closest("[data-action]");
    var guideButton = event.target.closest("[data-guide-target]");
    var guideSectionButton = event.target.closest("[data-guide-section]");
    var shortcutBubble = event.target.closest("[data-open-bubble-direct]");
    var bubbleButton = event.target.closest("[data-open-bubble]");
    var copyButton = event.target.closest("[data-copy-target]");
    var tagButton = event.target.closest("[data-tag]");
    var searchOpenButton = event.target.closest("[data-search-open]");
    var isPrimaryNav = modeButton && !!modeButton.closest(".nav-group-all");

    if (modeButton) {
      if (modeButton.getAttribute("data-mode-target") === "guide" && modeButton.getAttribute("data-guide-target")) {
        switchMode("guide", { guideSection: modeButton.getAttribute("data-guide-target"), guideFocusLab: "", forceTop: isPrimaryNav });
      } else if (modeButton.getAttribute("data-mode-target") === "beginner") {
        switchMode("beginner", { resetStep: true, forceTop: isPrimaryNav || !!modeButton.closest(".hero-actions") });
      } else {
        switchMode(modeButton.getAttribute("data-mode-target"), { forceTop: isPrimaryNav });
      }
      return;
    }

    if (event.target === imageLightboxClose || event.target.closest("[data-lightbox-close]")) {
      closeImageLightbox();
      return;
    }

    if (event.target.closest("figure[data-expandable=\"true\"]")) {
      openImageLightbox(event.target.closest("figure[data-expandable=\"true\"]"));
      return;
    }

    if (progressButton) {
      goToStep(Number(progressButton.getAttribute("data-step-target")));
      return;
    }

    if (actionButton) {
      if (actionButton.getAttribute("data-action") === "next") {
        nextStep();
      } else if (actionButton.getAttribute("data-action") === "prev") {
        prevStep();
      } else if (actionButton.getAttribute("data-action") === "surface") {
        switchMode("hub");
      }
      return;
    }

    if (guideButton) {
      switchMode("guide", { guideSection: guideButton.getAttribute("data-guide-target") || currentGuideTarget(), guideFocusLab: "" });
      return;
    }

    if (guideSectionButton) {
      switchMode("guide", { guideSection: guideSectionButton.getAttribute("data-guide-section"), guideFocusLab: "" });
      return;
    }

    if (shortcutBubble) {
      handleShortcutBubble(shortcutBubble.getAttribute("data-open-bubble-direct"));
      return;
    }

    if (bubbleButton) {
      openBubble(bubbleButton.getAttribute("data-open-bubble"));
      return;
    }

    if (copyButton) {
      copyTarget(copyButton.getAttribute("data-copy-target"), copyButton);
      return;
    }

    if (tagButton) {
      setActiveTag(tagButton.getAttribute("data-tag"));
      return;
    }

    if (searchOpenButton) {
      openSearchResult(searchOpenButton.getAttribute("data-search-open"));
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && imageLightbox && !imageLightbox.hasAttribute("hidden")) {
      event.preventDefault();
      event.stopPropagation();
      closeImageLightbox();
      return;
    }

    if ((event.key === "Enter" || event.key === " ") && event.target && event.target.closest && event.target.closest("figure[data-expandable=\"true\"]")) {
      event.preventDefault();
      openImageLightbox(event.target.closest("figure[data-expandable=\"true\"]"));
    }
  }, true);

  fastTrackToggle.addEventListener("change", function (event) {
    state.fastTrack = event.target.checked ? "minimal" : "guided";
    updateBeginnerUI();
    setLiveMessage(state.fastTrack === "minimal" ? "Fast Track enabled." : "Guided mode enabled.");
  });

  bubbleSearch.addEventListener("input", function (event) {
    state.toolkitQuery = event.target.value;
    renderExplorer();
  });

  clearSearch.addEventListener("click", function () {
    state.toolkitQuery = "";
    bubbleSearch.value = "";
    renderExplorer();
    bubbleSearch.focus();
  });

  navSearchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    runGlobalSearch(navSearchInput.value);
  });

  navSearchClear.addEventListener("click", function () {
    state.searchQuery = "";
    navSearchInput.value = "";
    if (state.mode === "search") {
      renderSearchResults();
      updateHashFromState();
    }
  });

  searchBackButton.addEventListener("click", function () {
    returnFromSearch();
  });

  window.addEventListener("hashchange", function () {
    applyHash(window.location.hash);
  });

  if (backToTopButton) {
    backToTopButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: smoothBehavior() });
      setLiveMessage("Returned to the top of the page.");
    });
  }

  window.addEventListener("scroll", scheduleLayoutSync, { passive: true });
  window.addEventListener("resize", function () {
    scheduleLayoutSync();
  });

  hydrateVideoCards(document);
  decorateExpandableMedia(document);
  renderHomeRouteMap();
  renderGuideNav();
  updateNav();
  updateNavSearch();
  updateBeginnerUI();
  renderExplorer();
  buildSearchIndex();
  applyHash(window.location.hash);
  scheduleLayoutSync();
}());
