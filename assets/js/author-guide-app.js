(function () {
  var content = window.authorGuideContent || {};
  var stepMeta = content.stepMeta || [];
  var explorerItems = content.explorerItems || [];
  var guideSections = content.guideSections || [];
  var guideSectionMap = guideSections.reduce(function (accumulator, section) {
    accumulator[section.id] = section;
    return accumulator;
  }, {});

  var state = {
    mode: "hub",
    currentStep: 0,
    fastTrack: "guided",
    activeTag: "all",
    query: "",
    guideSection: guideSections.length ? guideSections[0].id : ""
  };

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var maxUnlockedStep = 0;
  var suppressObserver = false;

  var modeNav = document.getElementById("modeNav");
  var hub = document.getElementById("hub");
  var beginnerMode = document.getElementById("beginnerMode");
  var explorerMode = document.getElementById("explorerMode");
  var guideMode = document.getElementById("guideMode");
  var rabbitFlow = document.getElementById("rabbitFlow");
  var stepSections = Array.from(document.querySelectorAll(".rabbit-step"));
  var progressButtons = Array.from(document.querySelectorAll(".progress-button"));
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
  var guideSectionNav = document.getElementById("guideSectionNav");
  var guideSectionMount = document.getElementById("guideSectionMount");
  var bubbleModalElement = document.getElementById("bubbleModal");
  var bubbleModal = bootstrap.Modal.getOrCreateInstance(bubbleModalElement);
  var imageLightbox = document.getElementById("imageLightbox");
  var imageLightboxImage = document.getElementById("imageLightboxImage");
  var imageLightboxCaption = document.getElementById("imageLightboxCaption");
  var imageLightboxClose = document.getElementById("imageLightboxClose");
  var lastExpandedFigure = null;

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
    setHash("#home");
  }

  function scrollToTarget(target) {
    if (!target) {
      return;
    }
    target.scrollIntoView({
      behavior: smoothBehavior(),
      block: "start"
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
    return;
  }

  function updateProgressCaption() {
    if (state.mode !== "beginner") {
      progressCaption.textContent = "Layer 1 of 3 is active.";
      return;
    }

    progressCaption.textContent = "Layer " + (state.currentStep + 1) + " of 3: " +
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
      var isLocked = index > maxUnlockedStep;
      var mark = button.querySelector(".progress-mark");

      button.classList.toggle("is-active", isActive);
      button.classList.toggle("is-complete", isComplete);
      button.classList.toggle("is-locked", isLocked);
      button.setAttribute("aria-current", isActive ? "step" : "false");
      mark.innerHTML = isComplete ? "&#10003;" : String(index + 1);
    });

    stepSections.forEach(function (section, index) {
      section.classList.toggle("is-active", index === state.currentStep);
      section.classList.toggle("is-complete", index < state.currentStep);
      section.classList.toggle("is-locked", index > maxUnlockedStep);
    });

    updateProgressCaption();
    updateBreadcrumb();
  }

  function renderExplorer() {
    var query = state.query.trim().toLowerCase();
    var visibleItems = explorerItems.filter(function (item) {
      var haystack = [item.title, item.short, item.description].concat(item.tags).join(" ").toLowerCase();
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

  function setActiveTag(tag) {
    state.activeTag = tag;
    tagPills.forEach(function (pill) {
      pill.classList.toggle("is-active", pill.getAttribute("data-tag") === tag);
    });
    renderExplorer();
  }

  function fillList(id, items) {
    document.getElementById(id).innerHTML = items.map(function (entry) {
      return "<li>" + escapeHtml(entry) + "</li>";
    }).join("");
  }

  function decorateExpandableMedia(root) {
    if (!root) {
      return;
    }

    root.querySelectorAll(".guide-figure, .modal-media-figure, .evidence-figure").forEach(function (figure) {
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

  function openBubble(id) {
    var item = explorerItems.find(function (candidate) {
      return candidate.id === id;
    });
    var mediaCard;
    var sourceLink;
    var guideButton;

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
    document.getElementById("bubbleModalSnippetMeta").textContent = item.snippetMeta;
    document.getElementById("bubbleModalSnippetTitle").textContent = item.snippetTitle;
    document.getElementById("bubbleModalSnippet").textContent = item.snippet;

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

    bubbleModal.show();
    setLiveMessage(item.title + " opened.");
  }

  function renderGuideNav() {
    if (!guideSectionNav) {
      return;
    }

    guideSectionNav.innerHTML = guideSections.map(function (section) {
      return [
        '<button type="button" class="guide-nav-link',
        section.id === state.guideSection ? " is-active" : "",
        '" data-guide-section="', section.id, '" data-accent="', section.accent, '">',
        '  <small>', escapeHtml(section.label), "</small>",
        '  <strong>', escapeHtml(section.title), "</strong>",
        "</button>"
      ].join("");
    }).join("");
  }

  function buildGuideBreadcrumb(section) {
    return [
      '<div class="guide-inline-breadcrumb" aria-label="Current guide section">',
      '  <span>Full Guide</span>',
      '  <span>/</span>',
      '  <span>', escapeHtml(section.label), '</span>',
      '  <span>/</span>',
      '  <strong>', escapeHtml(section.title), "</strong>",
      "</div>"
    ].join("");
  }

  function renderGuidePanel(title, items, options) {
    var config = Object.assign({
      ordered: false
    }, options || {});
    var listTag = config.ordered ? "ol" : "ul";
    var listClass = config.ordered ? "guide-list is-ordered" : "guide-list";

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

  function renderGuideLab(section, lab) {
    var snippetId = "guide-snippet-" + section.id + "-" + lab.id;

    return [
      '<article class="guide-lab-card">',
      '  <div class="guide-lab-top">',
      '    <div class="guide-lab-label">', escapeHtml(lab.label || "Lab"), "</div>",
      '    <h3 class="guide-lab-title">', escapeHtml(lab.title), "</h3>",
      '    <p class="guide-lab-summary">', escapeHtml(lab.summary), "</p>",
      "  </div>",
      lab.image ? [
        '<figure class="guide-figure">',
        '  <img src="', escapeHtml(lab.image.src), '" alt="', escapeHtml(lab.image.alt || lab.title), '">',
        '  <figcaption>', escapeHtml(lab.image.caption || ""), "</figcaption>",
        "</figure>"
      ].join("") : "",
      '  <div class="guide-lab-panels">',
      renderGuidePanel("Do This", lab.steps || [], { ordered: true }),
      renderGuidePanel("What To Check", lab.checkpoints || []),
      renderGuidePanel("Watch For", lab.watchFor || []),
      "  </div>",
      lab.snippet ? [
        '<div class="card snippet-card mt-4">',
        '  <div class="card-body">',
        '    <div class="snippet-header">',
        "      <div>",
        '        <div class="snippet-meta">Copy-ready detail</div>',
        '        <h4 class="mb-0">', escapeHtml(lab.snippetTitle || "Snippet"), "</h4>",
        "      </div>",
        '      <button class="copy-snippet" type="button" data-copy-target="', snippetId, '">Copy</button>',
        "    </div>",
        '    <pre><code id="', snippetId, '">', escapeHtml(lab.snippet), "</code></pre>",
        "  </div>",
        "</div>"
      ].join("") : "",
      '  <div class="guide-lab-actions">',
      lab.sourceHref ? '<a class="btn btn-outline-secondary rounded-pill px-4" href="' + escapeHtml(lab.sourceHref) + '" target="_blank" rel="noreferrer">' + escapeHtml(lab.sourceLabel || "Open Canonical Lab") + "</a>" : "",
      "  </div>",
      "</article>"
    ].join("");
  }

  function renderGuideSection() {
    var section = guideSectionMap[state.guideSection] || guideSections[0];

    if (!section || !guideSectionMount) {
      return;
    }

    guideSectionMount.innerHTML = [
      '<article class="guide-section-card" data-accent="', section.accent, '">',
      '  <div class="guide-section-hero">',
      '    <div class="guide-section-copy">',
      buildGuideBreadcrumb(section),
      '      <div class="panel-kicker">', escapeHtml(section.label), "</div>",
      '      <h2 class="guide-section-title">', escapeHtml(section.title), "</h2>",
      '      <p class="guide-section-summary">', escapeHtml(section.summary), "</p>",
      '      <p class="guide-section-purpose">', escapeHtml(section.purpose), "</p>",
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
    decorateExpandableMedia(guideSectionMount);
    updateBreadcrumb();
  }

  function switchMode(mode, options) {
    var config = Object.assign({
      scroll: true,
      hash: true,
      announce: true,
      openBubble: null,
      guideSection: state.guideSection
    }, options || {});

    closeImageLightbox({ announce: false, restoreFocus: false });

    if (config.guideSection && guideSectionMap[config.guideSection]) {
      state.guideSection = config.guideSection;
    }

    state.mode = mode;
    hub.classList.toggle("d-none", mode !== "hub");
    beginnerMode.classList.toggle("d-none", mode !== "beginner");
    explorerMode.classList.toggle("d-none", mode !== "explorer");
    guideMode.classList.toggle("d-none", mode !== "guide");

    if (mode !== "explorer") {
      bubbleModal.hide();
    }

    updateNav();

    if (mode === "beginner") {
      maxUnlockedStep = Math.max(maxUnlockedStep, state.currentStep);
      updateBeginnerUI();
      if (config.scroll !== false) {
        goToStep(state.currentStep, { scroll: true, hash: false, announce: false });
      }
    } else if (mode === "explorer") {
      renderExplorer();
      updateBreadcrumb();
      if (config.scroll !== false) {
        scrollToTarget(explorerMode);
      }
    } else if (mode === "guide") {
      renderGuideSection();
      if (config.scroll !== false) {
        scrollToTarget(guideMode);
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

    if (config.announce !== false) {
      if (mode === "hub") {
        setLiveMessage("Returned to the guide home.");
      } else if (mode === "beginner") {
        setLiveMessage("Guided path opened.");
      } else if (mode === "explorer") {
        setLiveMessage("Reference toolkit opened.");
      } else if (mode === "guide") {
        setLiveMessage("Full Guide opened at " + (guideSectionMap[state.guideSection] ? guideSectionMap[state.guideSection].title : "Start Here") + ".");
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
    maxUnlockedStep = Math.max(maxUnlockedStep, boundedIndex);

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
    state.query = "";
    bubbleSearch.value = "";
    setActiveTag("all");
    switchMode("explorer", { openBubble: id });
  }

  function applyHash(hash) {
    var cleaned = (hash || "").replace("#", "").trim();
    var index;

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
      switchMode("guide", { scroll: false, hash: false, announce: false, guideSection: guideSections.length ? guideSections[0].id : "" });
      return;
    }

    if (cleaned.indexOf("guide-") === 0 && guideSectionMap[cleaned.replace("guide-", "")]) {
      switchMode("guide", {
        scroll: false,
        hash: false,
        announce: false,
        guideSection: cleaned.replace("guide-", "")
      });
      return;
    }

    if (cleaned.indexOf("step-") === 0) {
      index = Number(cleaned.replace("step-", "")) - 1;
      if (!Number.isNaN(index)) {
        maxUnlockedStep = Math.max(0, Math.min(index, stepSections.length - 1));
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
      maxUnlockedStep = Math.max(maxUnlockedStep, index);
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

    if (modeButton) {
      if (modeButton.getAttribute("data-mode-target") === "guide" && modeButton.getAttribute("data-guide-target")) {
        switchMode("guide", { guideSection: modeButton.getAttribute("data-guide-target") });
      } else {
        switchMode(modeButton.getAttribute("data-mode-target"));
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
      switchMode("guide", { guideSection: guideButton.getAttribute("data-guide-target") || currentGuideTarget() });
      return;
    }

    if (guideSectionButton) {
      switchMode("guide", { guideSection: guideSectionButton.getAttribute("data-guide-section") });
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
    state.query = event.target.value;
    renderExplorer();
  });

  clearSearch.addEventListener("click", function () {
    state.query = "";
    bubbleSearch.value = "";
    renderExplorer();
    bubbleSearch.focus();
  });

  window.addEventListener("hashchange", function () {
    applyHash(window.location.hash);
  });

  decorateExpandableMedia(document);
  renderGuideNav();
  updateNav();
  updateBeginnerUI();
  renderExplorer();
  applyHash(window.location.hash);
}());
