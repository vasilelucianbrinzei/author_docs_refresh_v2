window.authorGuideContent = (function () {
  var canonicalRoot = "./workshops/livelabs/index.html?lab=";

  function labLink(labId) {
    return canonicalRoot + labId;
  }

  return {
    stepMeta: [
      { id: "step-1", title: "Submit Workshop Request", guideTarget: "start-here" },
      { id: "step-2", title: "Create Workshop + Add to GitHub", guideTarget: "core-workflow" },
      { id: "step-3", title: "Review & Publish", guideTarget: "validation-publish" }
    ],

    explorerItems: [
      {
        id: "wms-request",
        title: "WMS Request",
        short: "VPN, request form, tags, and the approval statuses that gate authoring.",
        accent: "red",
        tags: ["workflow", "beginner"],
        description: "Use this card when you need the real WMS actions from the source guide: what to fill in, what status comes next, and what reviewers expect before GitHub work starts.",
        steps: [
          "Connect to Corporate VPN, open Oracle Workshop Management System, and click Submit a New Workshop Request.",
          "Fill Workshop Basic Information completely, including Stakeholder, Workshop Council, Workshop Owner Group, Workshop Abstract, Workshop Outline, and Workshop Prerequisites.",
          "Open the Tags tab and set the required Level, Role, Focus Area, and Product tags before you create the record.",
          "Track the request through Submitted, More Info Needed, Approved, In Development, Self QA, and Self QA Complete so your WMS record stays aligned with the real build status."
        ],
        checkpoints: [
          "The title says what the learner will build or achieve, not only the product name.",
          "Owner, council, and contact fields are populated before review starts.",
          "The request already calls out unusual build elements such as embedded HTML, special media, Marketplace images, or remote desktop."
        ],
        watchFor: [
          "Starting repository work before the council record is aligned.",
          "Leaving abstract, outline, or prerequisites too vague and forcing council follow-up.",
          "Forgetting that later Self QA and publishing steps depend on the same WMS record."
        ],
        snippetMeta: "Request checklist",
        snippetTitle: "Fill these fields before you click Create",
        snippet: [
          "Workshop Title:",
          "Workshop Abstract:",
          "Workshop Outline:",
          "Workshop Prerequisites:",
          "Stakeholder:",
          "Workshop Council:",
          "Workshop Owner Group:",
          "Required tags:",
          "- Level",
          "- Role",
          "- Focus Area",
          "- Product"
        ].join("\n"),
        image: {
          src: "./02-core-workshop-flow/sections/01-submit-new-workshop-in-wms/images/submit_workshop.png",
          alt: "Submit new workshop request page in WMS",
          caption: "The reviewer-facing request page is where the workshop scope and ownership are established."
        },
        sourceHref: labLink("1-labs-wms"),
        sourceLabel: "Open Canonical Lab",
        guideTarget: "start-here"
      },
      {
        id: "github-setup",
        title: "GitHub Setup",
        short: "Oracle email account, GitHub Desktop, VS Code, Live Server, and authoring-ready settings.",
        accent: "ocean",
        tags: ["workflow", "beginner"],
        description: "Use this card when the blocker is workstation setup. It focuses on the exact tools and UI steps the workshop uses for first-time authoring.",
        steps: [
          "Create or confirm one GitHub account tied to your Oracle email, then finish GitHub Settings with your real name, profile photo, and username before you request repo access.",
          "Enable two-factor authentication in GitHub Security and make sure you are not using a secondary personal account for LiveLabs work.",
          "Install GitHub Desktop, open File > Options > Sign in, and confirm the client is authenticated against the same account you will fork and clone with.",
          "Install Visual Studio Code, then install Live Server from the Extensions view so local preview exists before you start rewriting markdown.",
          "Set Markdown indentation to tabs with size 4, then add the helper extensions you will actually use: markdownlint, Code Spell Checker, Delete Trailing Spaces, and Path Intellisense."
        ],
        checkpoints: [
          "GitHub profile, username, and 2FA are complete on the Oracle-linked account.",
          "GitHub Desktop is signed in and ready to clone or open repositories.",
          "VS Code has Live Server and Markdown indentation set to 4 before you start nesting steps, images, or code blocks."
        ],
        watchFor: [
          "Creating or using a second GitHub account instead of the Oracle-linked one.",
          "Skipping GitHub Desktop sign-in and discovering the problem at fork, clone, or push time.",
          "Leaving editor setup until after you already created broken nested lists or code blocks."
        ],
        snippetMeta: "Minimum toolchain",
        snippetTitle: "Install and configure these before authoring",
        snippet: [
          "GitHub account",
          "- Use your @oracle.com email",
          "- Set Name, username, and profile photo",
          "- Enable two-factor authentication",
          "",
          "Desktop tools",
          "- GitHub Desktop",
          "- Visual Studio Code",
          "- Live Server",
          "",
          "VS Code setup",
          "- Markdown indentation -> tabs, size 4",
          "- markdownlint",
          "- Code Spell Checker",
          "- Delete Trailing Spaces",
          "- Path Intellisense"
        ].join("\n"),
        image: {
          src: "./02-core-workshop-flow/sections/02-setup-github-and-install-tools/images/git-hub-desktop-login-screen.png",
          alt: "GitHub Desktop sign-in screen",
          caption: "GitHub Desktop is the main fork, clone, commit, and PR surface used throughout the guide."
        },
        sourceHref: labLink("2-labs-github"),
        sourceLabel: "Open Canonical Lab",
        guideTarget: "core-workflow"
      },
      {
        id: "sync-preview",
        title: "Sync & Preview",
        short: "Fork, clone, merge upstream, sample structure, GitHub Pages, and preview URL patterns.",
        accent: "ocean",
        tags: ["workflow", "advanced"],
        description: "Use this when the question is really about repository hygiene: where to fork, how to stay synced, what the folder structure should look like, and how preview URLs are derived.",
        steps: [
          "After approval, fork the target oracle-livelabs repository and the common repository from the GitHub web UI so you have both the product repo and the shared sample assets.",
          "Clone your fork in GitHub Desktop, pick a real local path, and when prompted choose To contribute to the parent project so upstream/oracle-livelabs remains connected.",
          "Before you edit each day, switch to the repo you are using, click Fetch origin, then Branch > Merge into Current Branch and merge upstream/main into main.",
          "After a successful merge, click Push origin so your local clone and your fork both stay aligned with production before you start new work.",
          "Copy the sample-workshop structure from common, keep folder and file names lowercase, and commit only after manifest.json points to real labs and the repo structure is clean.",
          "Enable GitHub Pages on your fork under Settings > Pages, save the main branch, wait for publication, and verify the preview URL before a long authoring session."
        ],
        checkpoints: [
          "Your local clone tracks your fork and still knows upstream/main.",
          "Both the target repo and common are available locally when you need sample templates or shared assets.",
          "GitHub Pages publishes the exact workshop variant path you plan to share."
        ],
        watchFor: [
          "Skipping the daily upstream merge and opening a PR from stale content.",
          "Working directly in the production repository or forgetting to fork common as well.",
          "Waiting until late review to discover path, case, or Pages publication problems."
        ],
        snippetMeta: "Repo sync",
        snippetTitle: "Daily sync commands and preview pattern",
        snippet: [
          "git config --global core.longpaths true",
          "git config --global core.ignorecase false",
          "",
          "git remote -v",
          "git fetch upstream",
          "git merge upstream/main -m \"Sync with main\"",
          "git push origin main",
          "",
          "Preview URL",
          "https://<user>.github.io/<repo>/<path>/workshops/<variant>/index.html"
        ].join("\n"),
        image: {
          src: "./02-core-workshop-flow/sections/03-stay-in-sync-with-github/images/sample-workshop-structure.png",
          alt: "Sample workshop structure in Visual Studio Code",
          caption: "The sample structure is the cleanest baseline for new authoring work."
        },
        sourceHref: labLink("3-labs-sync-github"),
        sourceLabel: "Open Canonical Lab",
        guideTarget: "core-workflow"
      },
      {
        id: "markdown-structure",
        title: "Markdown Structure",
        short: "Sample lab folders, required sections, common labs, variables, and LintChecker.",
        accent: "pine",
        tags: ["markdown"],
        description: "Use this card when you need the core authoring rules that make a workshop render, validate, and survive review without structural rework.",
        steps: [
          "Create the workshop folder inside the cloned product repo, then copy sample lab folders plus the workshops folder from common/sample-livelabs-templates/sample-workshop.",
          "Rename the copied lab folder and its markdown file together, delete the copied files folder when you do not need it, and add images only inside that lab's images folder.",
          "Copy the introduction folder when the workshop needs a dedicated landing lab, then add a README only when that variant actually needs one.",
          "Edit manifest.json in workshops/tenancy, workshops/sandbox, and/or workshops/desktop so workshoptitle, help, tutorial order, and any variant settings match the real workshop.",
          "Remove include or variables entries when they do not apply, and use absolute URLs for common labs or common images instead of duplicating shared content.",
          "Keep every lab inside the validator contract: one H1, Introduction, Objectives, Estimated Time, Task headers, Acknowledgements, lowercase filenames, and ?qa=true preview as you work."
        ],
        checkpoints: [
          "Copied sample folders were renamed cleanly and no stale sample files remain in manifest.json.",
          "Each lab has its own images folder and any unused files folder was removed.",
          "Preview with ?qa=true shows the workshop order, structure, and help email exactly the way review will see them."
        ],
        watchFor: [
          "Copying an old workshop instead of the canonical sample-workshop template.",
          "Leaving unused include or variables entries that stop the workshop from rendering.",
          "Using relative links for shared common labs or carrying mixed-case filenames into GitHub Pages."
        ],
        snippetMeta: "Standard lab contract",
        snippetTitle: "Workshop skeleton and manifest baseline",
        snippet: [
          "sample-workshop/",
          "  introduction/",
          "  my-lab/",
          "    images/",
          "    my-lab.md",
          "  workshops/",
          "    tenancy/",
          "      index.html",
          "      manifest.json",
          "",
          "manifest.json essentials",
          "\"workshoptitle\": \"My Workshop Title\",",
          "\"help\": \"my-team@oracle.com\",",
          "\"tutorials\": [ ... ]",
          "\"variables\": [\"../../variables/variables.json\"]  // only if needed",
          "",
          "Preview",
          "index.html?qa=true"
        ].join("\n"),
        image: {
          src: "./02-core-workshop-flow/sections/04-develop-markdown-and-content/images/lintchecker.png",
          alt: "LintChecker enabled in preview with qa=true",
          caption: "Add ?qa=true while previewing so structural issues surface before PR review."
        },
        sourceHref: labLink("4-labs-markdown-develop-content"),
        sourceLabel: "Open Canonical Lab",
        guideTarget: "core-workflow"
      },
      {
        id: "links-images-copy",
        title: "Links, Images & Copy",
        short: "Case-correct paths, absolute images, alt text, copy tags, and SQL-friendly code blocks.",
        accent: "sienna",
        tags: ["markdown", "media"],
        description: "Use this card when a workshop renders locally but breaks in preview, or when code blocks and screenshots are not following the LiveLabs runtime rules.",
        steps: [
          "Keep image files in an images folder, keep names lowercase, and make the Markdown path match the exact case used on disk.",
          "Use Markdown links instead of inline HTML and use the approved absolute image path pattern when you are referencing shared images from oracle-livelabs/common.",
          "Wrap copyable commands in <copy> tags so the LiveLabs copy button appears in preview.",
          "Use sql or plsql code blocks inside <copy> tags when you want trailing newlines to execute the last statement cleanly."
        ],
        checkpoints: [
          "Every image has descriptive alt text.",
          "The preview shows the same assets on GitHub Pages that you see locally.",
          "Copy buttons appear where learners need commands, SQL, or scripts."
        ],
        watchFor: [
          "Case-only renames on Windows or macOS that fail on GitHub Pages.",
          "Raw <a href> tags in Markdown where standard links should be used.",
          "Code blocks without copy tags or images outside the images folder."
        ],
        snippetMeta: "Copy-ready patterns",
        snippetTitle: "Image, link, and copy examples",
        snippet: [
          "![Console home page](https://oracle-livelabs.github.io/common/images/console/home-page.png \" \")",
          "",
          "```sql",
          "<copy>",
          "SELECT * FROM employees;",
          "SELECT * FROM departments;",
          "</copy>",
          "```"
        ].join("\n"),
        image: {
          src: "./02-core-workshop-flow/sections/04-develop-markdown-and-content/images/case-sensitive.png",
          alt: "Case-sensitive image example",
          caption: "GitHub Pages is case-sensitive even when a local machine is not."
        },
        sourceHref: labLink("4-labs-markdown-develop-content"),
        sourceLabel: "Open Canonical Lab",
        guideTarget: "core-workflow"
      },
      {
        id: "reuse-variables",
        title: "Reuse & Variables",
        short: "Common labs, manifest variables, and conditional content without duplicating pages.",
        accent: "pine",
        tags: ["advanced", "workflow"],
        description: "Use this when a workshop needs shared content or variant-aware sections, and you need a real pattern instead of a vague reminder that reuse exists.",
        steps: [
          "Reference stable common labs through absolute manifest URLs instead of copying them into the workshop.",
          "Declare variables files near the top of manifest.json only when the workshop actually has reusable values across variants.",
          "Use conditional formatting blocks when the workshop serves multiple delivery types such as livelabs and freetier from one markdown file.",
          "Preview every branch of the conditional content, not only the first one that renders."
        ],
        checkpoints: [
          "The manifest only carries variables when reuse is real.",
          "Conditional branches are obvious to the next author reading the file.",
          "The tutorial order still makes sense when one branch is hidden."
        ],
        watchFor: [
          "Copying shared content that should stay central and canonical.",
          "Hiding too much logic in conditionals and making the lab unreadable.",
          "Testing only one delivery type."
        ],
        snippetMeta: "Variant pattern",
        snippetTitle: "Manifest variables plus conditional content",
        snippet: [
          "\"variables\": [",
          "  \"../../variables/variables.json\",",
          "  \"../../variables/variables-in-another-file.json\"",
          "]",
          "",
          "<if type=\"livelabs\">",
          "Use the LiveLabs environment instructions here.",
          "</if>"
        ].join("\n"),
        image: {
          src: "./02-core-workshop-flow/sections/04-develop-markdown-and-content/images/conditional-vsc1.png",
          alt: "Conditional formatting example in Visual Studio Code",
          caption: "Conditional content should stay obvious enough that another author can follow it."
        },
        sourceHref: labLink("4-labs-markdown-develop-content"),
        sourceLabel: "Open Canonical Lab",
        guideTarget: "reuse-enhancements"
      },
      {
        id: "quiz-embed",
        title: "Quizzes & FreeSQL",
        short: "Interactive quizzes, scored badges, and inline SQL experiences that stay close to the task.",
        accent: "sienna",
        tags: ["interactivity", "advanced"],
        description: "Use this card when a learner should answer something or run SQL inside the workshop page instead of leaving the flow for another tool.",
        steps: [
          "For quizzes, add a fenced quiz block in the task where the learner should stop and check understanding.",
          "Use `*` for correct answers, `-` for incorrect answers, and `>` for the explanation that appears after the learner answers.",
          "Add `quiz score` and a top-level `quiz-config` block when the workshop needs pass or fail scoring or a downloadable badge.",
          "For FreeSQL, generate the embed snippet from FreeSQL, paste it directly into the task, and validate the rendered editor in preview before review."
        ],
        checkpoints: [
          "The quiz or embed sits directly next to the instructions it supports.",
          "Scoring or badges are enabled only when the workshop truly benefits from them.",
          "Preview confirms the interaction still renders and behaves correctly."
        ],
        watchFor: [
          "Adding interactivity because it looks impressive rather than because it helps the learner finish the task.",
          "Leaving badge assets or quiz-config paths outside the images folder.",
          "Skipping preview and discovering broken rendering only during review."
        ],
        snippetMeta: "Interactive starter",
        snippetTitle: "Quiz block with scoring and badge config",
        snippet: [
          "```quiz score",
          "Q: What is the maximum image width allowed in LiveLabs workshops?",
          "* 1280 pixels",
          "- 1600 pixels",
          "- 1920 pixels",
          "> PR checks block images over 1280px in either dimension.",
          "```",
          "",
          "```quiz-config",
          "passing: 80",
          "badge: images/badge.png",
          "```"
        ].join("\n"),
        image: {
          src: "./04-workshop-components-reuse/sections/02-add-quizzes/images/quizconfig.png",
          alt: "Quiz configuration example",
          caption: "Use one quiz-config block near the top when badges or passing scores matter."
        },
        sourceHref: labLink("workshop-components-reuse"),
        sourceLabel: "Open Canonical Section",
        guideTarget: "reuse-enhancements"
      },
      {
        id: "screenshots",
        title: "Screenshot Standards",
        short: "Crop to the action, redact correctly, keep files <= 1280px, and remove unused images.",
        accent: "ocean",
        tags: ["media"],
        description: "Use this card when screenshots are the real problem: capture quality, redaction, image size, or extra files that will fail review later.",
        steps: [
          "Capture only the part of the UI that supports the step instead of full-screen monitor shots.",
          "Resize screenshots to 1280 pixels or less in width or height and prefer PNG for UI or text-heavy images.",
          "Redact sensitive values by deleting the underlying pixels, filling with an opaque shape, and flattening the image before save.",
          "Run the Check Unused Images tool before PR time so each lab images folder contains only the screenshots the markdown actually references."
        ],
        checkpoints: [
          "The learner can tell exactly which UI control to click next.",
          "The screenshot does not expose usernames, IP addresses, intranet URLs, passwords, or OCIDs.",
          "Every image is in an images folder and referenced by markdown with alt text."
        ],
        watchFor: [
          "Oversized screenshots that pass local review but fail PR validation.",
          "Pseudo-redaction tricks such as translucent shapes or unflattened layers.",
          "Leaving five or ten stale screenshots in a lab folder after rewriting the steps."
        ],
        snippetMeta: "Capture checklist",
        snippetTitle: "Use this quality bar before you commit screenshots",
        snippet: [
          "- Crop to the action, not the whole desktop",
          "- Max 1280px in either dimension",
          "- PNG for UI, JPEG only for photos or gradients",
          "- Redact and flatten",
          "- Keep only referenced files in the images folder"
        ].join("\n"),
        image: {
          src: "./05-tools/sections/01-capture-screens-best-practices/images/screen-captures-general-guidelines.png",
          alt: "General screenshot guidelines reference",
          caption: "The screenshot standards page is the authoritative checklist for capture quality and privacy."
        },
        sourceHref: labLink("13-labs-capture-screens-best-practices"),
        sourceLabel: "Open Canonical Lab",
        guideTarget: "tools-productivity"
      },
      {
        id: "optishot",
        title: "OptiShot",
        short: "Install, pick the folder, keep max size at 1280, and read the summary before you rerun checks.",
        accent: "ocean",
        tags: ["media", "qa"],
        description: "Use this card when the PR is blocked on image size or when you want a fast cleanup pass across a screenshot-heavy workshop.",
        steps: [
          "Install OptiShot for your platform and launch it so the folder picker opens immediately.",
          "Select the workshop or images folder you want to process and let OptiShot recurse through subfolders while skipping .git.",
          "Use the default 1280px maximum unless you have a smaller target in mind, and use dry-run first when you want to inspect what would change.",
          "Read the summary at the end so you know what was resized, skipped, or optimized before you re-open the PR checks."
        ],
        checkpoints: [
          "The folder you selected is the one that actually contains the images under review.",
          "The max dimension stays at the LiveLabs limit of 1280 pixels.",
          "You rerun preview or PR checks after the tool finishes."
        ],
        watchFor: [
          "Running it against the wrong directory and thinking your screenshots were fixed.",
          "Changing max size away from 1280 and reintroducing review failures.",
          "Treating OptiShot as a replacement for basic capture quality."
        ],
        snippetMeta: "Command-line option",
        snippetTitle: "Dry-run the image pass before you overwrite files",
        snippet: [
          "OptiShot.exe C:\\path\\to\\images --dry-run",
          "./OptiShot.app/Contents/MacOS/OptiShot /path/to/images --dry-run",
          "",
          "Useful flag:",
          "-m 1280"
        ].join("\n"),
        image: {
          src: "./05-tools/sections/02-optishot/images/summary.png",
          alt: "OptiShot summary output",
          caption: "The summary tells you which images were resized, skipped, or optimized."
        },
        sourceHref: labLink("optishot"),
        sourceLabel: "Open Canonical Lab",
        guideTarget: "tools-productivity"
      },
      {
        id: "fixomat",
        title: "Fixomat",
        short: "Select the workshop root, choose the mode, and review FIXED versus MANUAL output carefully.",
        accent: "pine",
        tags: ["advanced", "qa"],
        description: "Use this card late in the workflow when the workshop already exists and you want help cleaning markdown or images before review.",
        steps: [
          "Launch LiveLabs Fixomat 2000 and select the workshop root directory, not an arbitrary nested lab folder.",
          "Choose Fix Markdown only, Optimize images only, or the combined mode depending on what the review actually found.",
          "Run the scan and read both the summary and the console output instead of assuming every issue was auto-fixed.",
          "Follow up on MANUAL findings, then rerun Fixomat or preview again before you open or update the PR."
        ],
        checkpoints: [
          "The mode you chose matches the actual problem.",
          "You reviewed the log and know which changes were applied automatically.",
          "You still validate the workshop after the tool finishes."
        ],
        watchFor: [
          "Running Fixomat too early and losing time on cleanup before the content is stable.",
          "Ignoring MANUAL findings and assuming the app handled them.",
          "Skipping preview after a bulk markdown or image pass."
        ],
        snippetMeta: "Output reading",
        snippetTitle: "Interpret the result before you move on",
        snippet: [
          "FIXED  -> change was applied automatically",
          "MANUAL -> human review or edit still required",
          "",
          "Recommended order:",
          "1. Run Fixomat",
          "2. Review MANUAL items",
          "3. Preview again",
          "4. Re-open PR checks"
        ].join("\n"),
        sourceHref: labLink("fixomat"),
        sourceLabel: "Open Canonical Lab",
        guideTarget: "tools-productivity"
      },
      {
        id: "qa-checklist",
        title: "QA Checklist",
        short: "Share the preview, set status correctly, save the checklist, and certify Self QA in WMS.",
        accent: "red",
        tags: ["qa", "workflow"],
        description: "Use this card when the workshop is ready for review and you need the exact order for Self QA or Quarterly QA without guessing.",
        steps: [
          "Open the personal GitHub Pages workshop URL and share that preview for review before you touch the QA status in WMS.",
          "Set Workshop Status to In Development while build work is still active, or Self QA when the workshop is stable enough to test end to end.",
          "On Workshop Details, update title, short description, long description, outline, prerequisites, and tags so WMS matches the real workshop that reviewers will open.",
          "Update Development GitHub/GitLab URL to your personal github.io preview, and after merge replace your username with oracle-livelabs in Production GitHub/GitLab URL.",
          "Open Self QA Checklist, check every box, upload the requested evidence, add both the PR link and the personal github.io workshop link, then click Save.",
          "Only after the checklist save succeeds should you set Self QA Complete or Quarterly QA Complete, certify the submission, and wait for stakeholder verification."
        ],
        checkpoints: [
          "Development URL points to your fork preview and Production URL points to oracle-livelabs only after merge.",
          "Every checklist field, evidence image, PR link, and github.io link was saved before the status changed.",
          "Stakeholders can review a consistent WMS record, preview URL, and PR."
        ],
        watchFor: [
          "Changing status before checklist save and triggering the blocking warning.",
          "Leaving outdated descriptions or tags in WMS while the GitHub content has already changed.",
          "Skipping Quarterly QA because the workshop is already published."
        ],
        snippetMeta: "Self QA handoff",
        snippetTitle: "Bring these into Self QA before you certify",
        snippet: [
          "Preview URL (personal github.io):",
          "Pull Request link:",
          "Development GitHub/GitLab URL:",
          "Production GitHub/GitLab URL:",
          "Updated title/description/outline/prerequisites:",
          "Tags saved:",
          "Checklist evidence uploaded:",
          "Status ready to change:"
        ].join("\n"),
        image: {
          src: "./03-validation-qa-publish/sections/01-qa-checks/images/self-qa-checklist-1.png",
          alt: "Self QA checklist in WMS",
          caption: "The checklist must be fully saved before Self QA Complete can succeed."
        },
        sourceHref: labLink("5-labs-qa-checks"),
        sourceLabel: "Open Canonical Lab",
        guideTarget: "validation-publish"
      },
      {
        id: "pr-checks",
        title: "PR Checks",
        short: "Know the 1280px image limit, markdown validator rules, and how to run the scripts locally.",
        accent: "ocean",
        tags: ["qa", "advanced"],
        description: "Use this card when GitHub Actions is blocking the pull request and you need the exact failure class instead of guessing from the red X.",
        steps: [
          "Open the Checks area on the PR and name the exact failing workflow before you edit anything: LiveLabs Image Validation or LiveLabs Markdown Validation.",
          "Resize any PNG, JPG, or JPEG that exceeds 1280px in width or height, then rerun the PR checks instead of assuming the next push will be clean.",
          "Use the markdown error log to fix the exact file and rule: missing required sections, bad task header format, missing alt text, inline HTML, unbalanced copy tags, or uppercase filenames.",
          "Run the validator locally on the workshop root when you want faster repair loops than waiting for GitHub Actions after each commit.",
          "On Windows, use the PowerShell script if Bash is not your normal workflow, and temporarily bypass execution policy only for the current session when needed."
        ],
        checkpoints: [
          "Each failure was fixed by class instead of mixing image cleanup with markdown repair.",
          "Local validator output matches the files and errors shown in the PR.",
          "Image dimensions, alt text, task headers, and acknowledgements are clean before the next push."
        ],
        watchFor: [
          "Treating any red X as the same problem and editing the wrong files.",
          "Assuming a locally rendered page means the markdown validator will pass.",
          "Leaving the PowerShell validator half-configured because execution policy blocked the script."
        ],
        snippetMeta: "Local validator",
        snippetTitle: "Run the validator locally before the next push",
        snippet: [
          "Bash",
          "curl -O https://raw.githubusercontent.com/oracle-livelabs/common/main/md-validator/.github/scripts/validate-livelabs-markdown.sh",
          "chmod +x validate-livelabs-markdown.sh",
          "./validate-livelabs-markdown.sh /path/to/workshop",
          "",
          "PowerShell",
          "Invoke-WebRequest -Uri \"https://raw.githubusercontent.com/oracle-livelabs/common/main/md-validator/.github/scripts/validate-livelabs-markdown.ps1\" -OutFile \"validate-livelabs-markdown.ps1\"",
          "Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process",
          ".\\validate-livelabs-markdown.ps1 C:\\path\\to\\your\\workshop"
        ].join("\n"),
        image: {
          src: "./03-validation-qa-publish/sections/02-pull-request-automated-checks/images/prerror.png",
          alt: "Failed pull request checks on GitHub",
          caption: "Start with the failing workflow name so you fix the real blocker."
        },
        sourceHref: labLink("prcheck"),
        sourceLabel: "Open Canonical Lab",
        guideTarget: "validation-publish"
      },
      {
        id: "publish-request",
        title: "Publish Request",
        short: "Create the PR with the WMS ID, fill the Publishing tab correctly, and supply the final URLs.",
        accent: "red",
        tags: ["qa", "workflow"],
        description: "Use this card when the workshop and checklist are ready and you need the final production handoff sequence for the PR and WMS publishing request.",
        steps: [
          "Create the pull request from GitHub Desktop after QA fixes are pushed, and include the WMS ID in the PR title because review will not start without it.",
          "On the GitHub PR page, fill the general requirements and checklist text from Self QA so reviewers can see the workshop is ready for merge.",
          "Confirm the branch has no merge conflicts and is up to date with main before you ask for approval or publishing.",
          "Open WMS > Publishing, click Publish to LiveLabs, set Publish Type and Workshop Time, and provide the oracle-livelabs production URL that replaces your personal preview URL.",
          "Enable Brown Button or LiveLabs Sprint only when the workshop really supports those delivery modes, then fill the corresponding URL pattern correctly.",
          "Save the publishing entry, track Publish Requested and Publish Approved, then verify the production workshop after merge and rollout."
        ],
        checkpoints: [
          "PR title includes the WMS ID and the branch is not behind main.",
          "Publishing details use oracle-livelabs production URLs instead of personal preview URLs.",
          "Brown Button, Sprint, and video fields are filled only when they apply and use the right pattern."
        ],
        watchFor: [
          "Opening the PR while the fork is behind main or still contains conflicts.",
          "Using the personal github.io preview link in a production publishing field.",
          "Skipping the Publishing tab because the PR was already created."
        ],
        snippetMeta: "Review handoff",
        snippetTitle: "PR and publishing URL patterns",
        snippet: [
          "PR title",
          "Publish My Workshop Name (WMS 12345)",
          "",
          "Preview URL",
          "https://<github-username>.github.io/<repo-name>/<path>/workshops/<variant>/index.html?qa=true",
          "",
          "Production URL",
          "https://oracle-livelabs.github.io/<repo-name>/<path>/workshops/<variant>/",
          "",
          "Brown Button URL",
          "https://oracle-livelabs.github.io/<repo-name>/<path>/workshops/tenancy/",
          "",
          "Sprint URL",
          "https://oracle-livelabs.github.io/sprints/<category-folder>/<sprint-folder>/"
        ].join("\n"),
        image: {
          src: "./03-validation-qa-publish/sections/03-publish-workshop/images/publishing-tab.png",
          alt: "Publishing tab in WMS",
          caption: "The Publishing tab is where the final production metadata is created and approved."
        },
        sourceHref: labLink("6-labs-publish"),
        sourceLabel: "Open Canonical Lab",
        guideTarget: "validation-publish"
      },
      {
        id: "help-sla",
        title: "Help & SLA",
        short: "Use the right support channel, bring context, and wait the normal SLA before escalating.",
        accent: "pine",
        tags: ["workflow", "qa"],
        description: "Use this card when the blocker is process, ownership, or timing rather than Markdown syntax or workshop structure.",
        steps: [
          "Check the FAQ or the relevant workflow lab first so you are not escalating a question the guide already answers.",
          "Use WMS Message the Team for workshop-specific approval, stakeholder, or publishing questions tied to one workshop record.",
          "Use the shared help mailbox or the #workshop-authors-help Slack channel for platform, tooling, or shared process blockers.",
          "If the normal SLA window has passed, follow up with the WMS ID, repo or PR, preview URL, and the exact blocker instead of sending a generic ping."
        ],
        checkpoints: [
          "You can name the owner or channel that actually fits the blocker.",
          "Your support request includes the WMS ID, preview URL, repo or PR, and the exact failing step.",
          "You have allowed the expected SLA window to pass before escalating."
        ],
        watchFor: [
          "Direct messaging people to bypass the queue for normal review work.",
          "Asking for help with no preview URL, WMS ID, or error context.",
          "Treating every timing question like an emergency without stating the real deadline."
        ],
        snippetMeta: "Support context",
        snippetTitle: "Bring this context when you ask for help",
        snippet: [
          "WMS ID:",
          "Preview URL:",
          "Repository / branch or PR:",
          "Current workflow status:",
          "Exact blocker:",
          "What you already tried:",
          "Any deadline or event date:"
        ].join("\n"),
        sourceHref: labLink("help-faq-support"),
        sourceLabel: "Open Canonical Section",
        guideTarget: "help-faq"
      }
    ],

    guideSections: [
      {
        id: "start-here",
        label: "Section 1",
        title: "Start Here",
        accent: "red",
        summary: "Start here first. This replaces the old behavior that jumped straight into Core Workflow and gives you the real orientation path before hands-on authoring.",
        purpose: "Use this section when you need the route, the WMS status model, or the GitHub organization model before you start building.",
        highlights: [
          "Open the custom home page first, not the markdown nav.",
          "Use the background labs only when they answer a real blocker.",
          "Archived Live SQL and legacy retired pages stay out of this refreshed route."
        ],
        sectionHref: labLink("start-here"),
        sectionLabel: "Open Canonical Section",
        labs: [
          {
            id: "start-here-home",
            label: "Section landing page",
            title: "Open the custom guide home first",
            summary: "Use the refreshed home page as the new front door so you can choose the shortest route instead of landing in the middle of the old markdown navigation.",
            steps: [
              "Open `./index.html` and stay on the custom home screen first.",
              "Choose Guided Path if you want the standard WMS -> GitHub -> QA and publish order.",
              "Choose Toolkit if you already know the blocker and only need one focused answer.",
              "Choose Full Guide if you want the entire active author map without the old markdown navigation chrome."
            ],
            checkpoints: [
              "You can say why you are choosing Guided Path, Toolkit, or Full Guide before you continue.",
              "You are not using the markdown section list as the primary navigation surface."
            ],
            watchFor: [
              "Dropping straight into Core Workflow when the real need is orientation.",
              "Using retired or archived pages as if they were still part of the active workflow."
            ],
            snippetTitle: "Choose the route intentionally",
            snippet: [
              "Guided Path  -> standard author sequence",
              "Toolkit      -> one blocker, one answer",
              "Full Guide   -> section-by-section reference",
              "",
              "Start Here exists so you do not guess which path comes next."
            ].join("\n"),
            sourceHref: labLink("start-here"),
            sourceLabel: "Open Canonical Section"
          },
          {
            id: "wms-workflows",
            label: "Lab 1",
            title: "Understand the WMS lifecycle before you build",
            summary: "Know the statuses and review windows first so you understand what the council, stakeholders, and publishing team are expecting at each handoff.",
            steps: [
              "Read the Submitted -> More Info Needed or Approved flow so you know when GitHub work should actually begin.",
              "Move the workshop to In Development when active authoring starts, then to Self QA only when the preview is stable enough to test end to end.",
              "Use Self QA Complete to trigger stakeholder verification, then wait for Completed before you expect publishing approval.",
              "Remember that Quarterly QA reopens the checklist flow later for already-published workshops."
            ],
            checkpoints: [
              "You know which status comes next after the current one.",
              "You know which handoff belongs to council, stakeholders, and LiveLabs publishers."
            ],
            watchFor: [
              "Treating status changes like paperwork instead of gates that drive the rest of the process.",
              "Skipping stakeholder follow-up after Self QA Complete."
            ],
            snippetTitle: "The status ladder to remember",
            snippet: [
              "Submitted",
              "More Info Needed / Approved",
              "In Development",
              "Self QA",
              "Self QA Complete",
              "Completed",
              "Quarterly QA / Quarterly QA Complete"
            ].join("\n"),
            image: {
              src: "./02-core-workshop-flow/sections/00-understand-wms-lifecycle/images/livelabs-publishing-flow.png",
              alt: "LiveLabs publishing workflow diagram",
              caption: "The workflow diagram is the quickest way to understand who owns each next step."
            },
            sourceHref: labLink("wms-workflows"),
            sourceLabel: "Open Canonical Lab"
          },
          {
            id: "github-introduction",
            label: "Lab 2",
            title: "Understand the Oracle LiveLabs GitHub model",
            summary: "Get the organization, repo, fork, and common-repo model clear before you create folders or manifests in the wrong place.",
            steps: [
              "Open the oracle-livelabs organization and identify the product or council repo that should own your workshop.",
              "Treat oracle-livelabs as production, your fork as the writable remote, and your local clone as the place where you edit and preview.",
              "Use the common repository when you need sample workshops, common labs, or shared assets instead of copying from arbitrary old workshops."
            ],
            checkpoints: [
              "You know which production repo your workshop belongs to.",
              "You know why you need a fork instead of committing straight to production."
            ],
            watchFor: [
              "Confusing the common repo with the workshop repo you should actually author in.",
              "Copying an old workshop when the sample template or common lab would be a cleaner starting point."
            ],
            snippetTitle: "Keep the repository roles straight",
            snippet: [
              "oracle-livelabs/<repo>  -> production source of truth",
              "<your-user>/<repo>      -> your fork",
              "local clone             -> edit, preview, validate"
            ].join("\n"),
            image: {
              src: "./02-core-workshop-flow/sections/01a-understand-github-foundations/images/oracle-livelabs-github-repos.png",
              alt: "Oracle LiveLabs GitHub repositories page",
              caption: "Choose the right repo before you scaffold folders or start commits."
            },
            sourceHref: labLink("github-introduction"),
            sourceLabel: "Open Canonical Lab"
          }
        ]
      },
      {
        id: "core-workflow",
        label: "Section 2",
        title: "Core Workflow",
        accent: "ocean",
        summary: "This is the hands-on author route: request the workshop, prepare the workstation, stay in sync with GitHub, and build markdown in a previewable structure.",
        purpose: "Use this section for the daily authoring loop, not just the first-time setup.",
        highlights: [
          "Wait for approval before heavy build work whenever possible.",
          "Confirm preview early while the workshop is still cheap to fix.",
          "Keep the sample structure and manifest clean from day one."
        ],
        sectionHref: labLink("core-workflow"),
        sectionLabel: "Open Canonical Section",
        labs: [
          {
            id: "guide-wms-request",
            label: "Lab 3",
            title: "Submit new workshop in WMS",
            summary: "Create the workshop record with enough detail that council reviewers understand the learner outcome, the owner, and any unusual build requirements.",
            steps: [
              "Log in to VPN, open WMS, and click Submit a New Workshop Request.",
              "Fill Basic Information thoroughly, including Stakeholder, Workshop Council, Workshop Owner Group, Abstract, Outline, and Prerequisites.",
              "Set the required Level, Role, Focus Area, and Product tags before you click Create.",
              "Use the Social tab before publish time to add blog, social copy, or promotion details that the publishing flow expects later."
            ],
            checkpoints: [
              "The request explains who the workshop is for and what the learner will finish with.",
              "Special notes already mention embedded HTML, media, Marketplace images, or remote desktop if those apply."
            ],
            watchFor: [
              "Treating WMS like an afterthought and then backfilling the record after GitHub work is already deep.",
              "Leaving tags or prerequisites incomplete and forcing a council round trip."
            ],
            snippetTitle: "Field checklist before submit",
            snippet: [
              "Workshop Title",
              "Abstract",
              "Outline",
              "Prerequisites",
              "Stakeholder",
              "Workshop Council",
              "Workshop Owner Group",
              "Required tags"
            ].join("\n"),
            image: {
              src: "./02-core-workshop-flow/sections/01-submit-new-workshop-in-wms/images/tags.png",
              alt: "WMS tags selection screen",
              caption: "Level, Role, Focus Area, and Product tags are not optional for the active workflow."
            },
            sourceHref: labLink("1-labs-wms"),
            sourceLabel: "Open Canonical Lab"
          },
          {
            id: "guide-github-setup",
            label: "Lab 4",
            title: "Set up GitHub and install tools",
            summary: "Get the account, desktop client, editor, and extensions ready before you attempt any real workshop authoring work.",
            steps: [
              "Create or confirm the GitHub account that uses your Oracle email, then open GitHub Settings and set your real name, profile image, and username.",
              "Enable two-factor authentication in GitHub Security before you request access to Oracle LiveLabs repositories.",
              "Install GitHub Desktop, open File > Options > Sign in, and confirm it is using the same GitHub account you will fork and clone with.",
              "Install Visual Studio Code, open the Extensions view, and install Live Server so you can preview the workshop locally before you start pushing changes.",
              "Set Markdown indentation to tabs with size 4, then add the optional helpers from the canonical guide that match your workflow: markdownlint, Code Spell Checker, Delete Trailing Spaces, and Path Intellisense."
            ],
            checkpoints: [
              "GitHub profile, username, and 2FA are complete on the Oracle-linked account.",
              "GitHub Desktop is authenticated and ready to fork, clone, commit, and push.",
              "VS Code has Live Server plus 4-space tab indentation before markdown authoring starts."
            ],
            watchFor: [
              "Using the wrong GitHub account or trying to split LiveLabs work across multiple accounts.",
              "Skipping GitHub Desktop sign-in and only discovering the problem when clone or push fails.",
              "Leaving editor configuration until after nested steps and code blocks already exist."
            ],
            snippetTitle: "Minimum workstation setup",
            snippet: [
              "GitHub account",
              "- Oracle email",
              "- Name, username, profile photo",
              "- Two-factor authentication",
              "",
              "Install",
              "- GitHub Desktop",
              "- Visual Studio Code",
              "- Live Server",
              "",
              "VS Code setup",
              "- Markdown indentation -> tabs, size 4",
              "- markdownlint",
              "- Code Spell Checker",
              "- Delete Trailing Spaces",
              "- Path Intellisense"
            ].join("\n"),
            image: {
              src: "./02-core-workshop-flow/sections/02-setup-github-and-install-tools/images/extensions-tab.png",
              alt: "VS Code extensions tab",
              caption: "Install Live Server before you start building labs so preview is always available."
            },
            sourceHref: labLink("2-labs-github"),
            sourceLabel: "Open Canonical Lab"
          },
          {
            id: "guide-sync-preview",
            label: "Lab 5",
            title: "Stay in sync with GitHub",
            summary: "Fork, clone, merge, preview, and keep the workshop structure clean enough that GitHub Pages mirrors what you see locally.",
            steps: [
              "After the workshop is approved, fork the target oracle-livelabs repository and also fork common so you have both the product repo and the shared sample templates.",
              "Clone your fork with GitHub Desktop, choose a real local path, and when prompted select To contribute to the parent project so upstream/oracle-livelabs stays connected.",
              "Before editing each day, open the correct repo in GitHub Desktop, click Fetch origin, then Branch > Merge into Current Branch and merge upstream/main into main.",
              "After the merge succeeds, click Push origin so your local main branch and your remote fork both stay aligned with production.",
              "Copy the sample-workshop structure from common, keep folder and file names lowercase, and do not start deep authoring until manifest.json points to real labs.",
              "Enable GitHub Pages on your fork under Settings > Pages, save the main branch, wait for publication, and confirm the preview URL works before a long authoring session."
            ],
            checkpoints: [
              "The local clone, your fork, and upstream/main are all connected the way GitHub Desktop expects.",
              "Both the target repo and common are available locally when you need templates or shared assets.",
              "GitHub Pages resolves the exact workshop variant path you plan to share."
            ],
            watchFor: [
              "Doing a large day of edits without syncing upstream/main first.",
              "Working in the production repository or forgetting to fork common as well.",
              "Waiting until late review to discover path, case, or GitHub Pages publication problems."
            ],
            snippetTitle: "Config and preview pattern",
            snippet: [
              "git config --global core.longpaths true",
              "git config --global core.ignorecase false",
              "",
              "git remote -v",
              "git fetch upstream",
              "git merge upstream/main -m \"Sync with main\"",
              "git push origin main",
              "",
              "https://<user>.github.io/<repo>/<path>/workshops/<variant>/index.html"
            ].join("\n"),
            image: {
              src: "./02-core-workshop-flow/sections/03-stay-in-sync-with-github/images/branch-main.png",
              alt: "GitHub Pages branch selection screen",
              caption: "GitHub Pages preview is a required checkpoint, not a late optional check."
            },
            sourceHref: labLink("3-labs-sync-github"),
            sourceLabel: "Open Canonical Lab"
          },
          {
            id: "guide-markdown",
            label: "Lab 6",
            title: "Develop Markdown and content",
            summary: "Build labs from the sample structure, keep manifests honest, and use the validator-oriented markdown rules while the workshop is still local or on your fork.",
            steps: [
              "Create the workshop folder inside the cloned product repo, then copy sample lab folders plus the workshops folder from common/sample-livelabs-templates/sample-workshop.",
              "Rename the copied lab folder and its markdown file together, then delete the copied files folder when that lab does not need it.",
              "Add screenshots only inside each lab's images folder and keep every file and folder lowercase so GitHub Pages does not break later on case sensitivity.",
              "Copy the introduction folder when the workshop needs a real landing lab, then edit manifest.json so workshoptitle, help, tutorial order, and variant structure match the actual workshop.",
              "Remove include or variables entries when they do not apply, and use absolute URLs for common labs or common images instead of duplicating shared content.",
              "Keep every lab inside the validator contract: one H1, Introduction, Objectives, Estimated Time, Task headers, Acknowledgements, copy tags where needed, and ?qa=true preview as you work."
            ],
            checkpoints: [
              "Copied sample folders were renamed cleanly and no stale sample files remain in manifest.json.",
              "Every lab follows the required section contract before review and every image has alt text inside an images folder.",
              "Preview with ?qa=true shows the workshop order, structure, and help email exactly the way reviewers will see them."
            ],
            watchFor: [
              "Copying an old workshop instead of the canonical sample-workshop template.",
              "Leaving stale include or variables blocks that stop the workshop from rendering.",
              "Ignoring security rules for images, usernames, passwords, IPs, or internal URLs."
            ],
            snippetTitle: "Manifest and validator basics",
            snippet: [
              "sample-workshop/",
              "  introduction/",
              "  my-lab/",
              "    images/",
              "    my-lab.md",
              "  workshops/",
              "    tenancy/",
              "      index.html",
              "      manifest.json",
              "",
              "\"workshoptitle\": \"My Workshop Title\",",
              "\"help\": \"my-team@oracle.com\",",
              "\"tutorials\": [ ... ],",
              "\"variables\": [\"../../variables/variables.json\"],  // only if needed",
              "",
              "Preview with:",
              "index.html?qa=true"
            ].join("\n"),
            image: {
              src: "./02-core-workshop-flow/sections/04-develop-markdown-and-content/images/manifest.png",
              alt: "Manifest file open in Visual Studio Code",
              caption: "Manifest correctness matters as much as markdown correctness because it drives the rendered guide."
            },
            sourceHref: labLink("4-labs-markdown-develop-content"),
            sourceLabel: "Open Canonical Lab"
          }
        ]
      },
      {
        id: "validation-publish",
        label: "Section 3",
        title: "Validation and Publish",
        accent: "red",
        summary: "This section turns a working draft into a releasable workshop through Self QA, PR checks, publish requests, and realistic turnaround expectations.",
        purpose: "Use this section when the workshop already renders and you are preparing review or production handoff.",
        highlights: [
          "Save the checklist before you touch the status field.",
          "Fix PR checks by class: image size versus markdown validation.",
          "Publishing fields must point to oracle-livelabs production, not your fork."
        ],
        sectionHref: labLink("validation-qa-publish"),
        sectionLabel: "Open Canonical Section",
        labs: [
          {
            id: "guide-qa-checks",
            label: "Lab 7",
            title: "QA checks and steps",
            summary: "Use the GitHub Pages preview, update the WMS record, complete Self QA or Quarterly QA, and send stakeholders the cleanest possible handoff.",
            steps: [
              "Open the personal GitHub Pages workshop URL and share that preview for review before you touch the QA status in WMS.",
              "Set Workshop Status to In Development while build work is still active, or Self QA when the workshop is stable enough to test end to end.",
              "On Workshop Details, update title, short description, long description, outline, prerequisites, and tags so WMS matches the real workshop reviewers will open.",
              "Update Development GitHub/GitLab URL to your personal github.io preview, and after merge replace your username with oracle-livelabs in Production GitHub/GitLab URL.",
              "Open Self QA Checklist, check every box, upload the requested evidence, add both the PR link and the personal github.io workshop link, then click Save.",
              "Only after the checklist save succeeds should you move to Self QA Complete or Quarterly QA Complete, certify the submission, and wait for stakeholder verification."
            ],
            checkpoints: [
              "Development URL points to your fork preview and Production URL points to oracle-livelabs only after merge.",
              "Checklist save succeeded before the status change and all evidence, PR, and github.io fields were stored.",
              "Stakeholders have the right preview URL, PR link, tags, and WMS metadata."
            ],
            watchFor: [
              "Changing status before checklist save and triggering the warning dialog.",
              "Leaving outdated descriptions or tags in WMS while the GitHub content has already changed.",
              "Treating Quarterly QA as optional because the workshop is already published."
            ],
            snippetTitle: "Self QA order",
            snippet: [
              "Preview URL (personal github.io)",
              "Pull Request link",
              "Development GitHub/GitLab URL",
              "Production GitHub/GitLab URL",
              "Updated title/description/outline/prerequisites",
              "Tags saved",
              "Checklist evidence uploaded",
              "",
              "Then",
              "1. Save checklist",
              "2. Change status",
              "3. Certify"
            ].join("\n"),
            image: {
              src: "./03-validation-qa-publish/sections/01-qa-checks/images/complete-checklist-warning.png",
              alt: "Warning shown when checklist is incomplete",
              caption: "The warning dialog is the sign that the checklist was not fully saved before the status change."
            },
            sourceHref: labLink("5-labs-qa-checks"),
            sourceLabel: "Open Canonical Lab"
          },
          {
            id: "guide-sla",
            label: "Lab 8",
            title: "Review, QA, and publishing timelines",
            summary: "Use the SLA page for realistic expectations on PR review, council review, stakeholder QA, publishing, and follow-up timing.",
            steps: [
              "Use the SLA table to plan around 1 business day for PR review, 2 to 3 business days for workshop submission review, 2 business days for stakeholder QA verification, and 1 business day for publishing after approval.",
              "Wait for the normal response window before escalating routine review work.",
              "If the request is tied to an event or hard deadline, say that explicitly instead of assuming the urgency is obvious."
            ],
            checkpoints: [
              "You know whether the current wait time is still inside the expected window.",
              "Escalations carry the WMS ID, PR, preview URL, and real deadline."
            ],
            watchFor: [
              "Using Slack direct messages to bypass the normal queue for routine work.",
              "Escalating without context or before the expected SLA has passed."
            ],
            snippetTitle: "Core SLA checkpoints",
            snippet: [
              "GitHub PR review            -> 1 business day",
              "Workshop submission review -> 2-3 business days",
              "Stakeholder QA             -> 2 business days",
              "Workshop publishing        -> 1 business day"
            ].join("\n"),
            sourceHref: labLink("sla"),
            sourceLabel: "Open Canonical Lab"
          },
          {
            id: "guide-prchecks",
            label: "Lab 9",
            title: "Pull Request automated checks",
            summary: "Break CI failures into the exact class of problem so you can repair the PR quickly: image size, markdown structure, copy tags, filenames, or alt text.",
            steps: [
              "Open the Checks area on the PR and name the exact failing workflow before you edit anything: LiveLabs Image Validation or LiveLabs Markdown Validation.",
              "Resize any PNG, JPG, or JPEG that exceeds 1280px in width or height, then rerun the PR checks instead of assuming the next push will be clean.",
              "Use the markdown error log to fix the exact file and rule: missing required sections, bad task header format, missing alt text, inline HTML, unbalanced copy tags, or uppercase filenames.",
              "Run the validator locally on the workshop root when you want faster repair loops than waiting for GitHub Actions after each commit.",
              "On Windows, use the PowerShell script if Bash is not your normal workflow, and temporarily bypass execution policy only for the current session when needed."
            ],
            checkpoints: [
              "Each failure was fixed by class instead of mixing image cleanup with markdown repair.",
              "Local validator output matches the files changed in the PR.",
              "Image dimensions, task headers, acknowledgements, alt text, and copy tags are clean before the next push."
            ],
            watchFor: [
              "Treating any red X as the same problem and editing the wrong files.",
              "Thinking a locally rendered page means the validator will pass.",
              "Leaving the PowerShell validator half-configured because execution policy blocked the script."
            ],
            snippetTitle: "Local markdown validator",
            snippet: [
              "Bash",
              "curl -O https://raw.githubusercontent.com/oracle-livelabs/common/main/md-validator/.github/scripts/validate-livelabs-markdown.sh",
              "chmod +x validate-livelabs-markdown.sh",
              "./validate-livelabs-markdown.sh /path/to/workshop",
              "",
              "PowerShell",
              "Invoke-WebRequest -Uri \"https://raw.githubusercontent.com/oracle-livelabs/common/main/md-validator/.github/scripts/validate-livelabs-markdown.ps1\" -OutFile \"validate-livelabs-markdown.ps1\"",
              "Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process",
              ".\\validate-livelabs-markdown.ps1 C:\\path\\to\\your\\workshop"
            ].join("\n"),
            image: {
              src: "./03-validation-qa-publish/sections/02-pull-request-automated-checks/images/imagedimwrong.png",
              alt: "Example image dimension validation failure",
              caption: "The image-size failure tells you exactly which file still exceeds the 1280px limit."
            },
            sourceHref: labLink("prcheck"),
            sourceLabel: "Open Canonical Lab"
          },
          {
            id: "guide-publish",
            label: "Lab 10",
            title: "Publish your workshop",
            summary: "Create the PR with the WMS ID, keep the branch current, then complete the Publishing tab with the correct production metadata and URLs.",
            steps: [
              "Create the pull request from GitHub Desktop after QA fixes are pushed, and include the WMS ID in the PR title because review will not start without it.",
              "On the GitHub PR page, fill the general requirements and checklist text from Self QA so reviewers can see the workshop is ready for merge.",
              "Confirm the branch has no merge conflicts and is up to date with main before you ask for approval or publishing.",
              "Open WMS > Publishing, click Publish to LiveLabs, set Publish Type and Workshop Time, and provide the oracle-livelabs production URL that replaces your personal preview URL.",
              "Enable Brown Button or LiveLabs Sprint only when the workshop really supports those delivery modes, then fill the corresponding URL pattern correctly.",
              "Save the publishing entry, track Publish Requested and Publish Approved, then verify the production workshop after merge and rollout."
            ],
            checkpoints: [
              "The PR title includes the WMS ID and the branch is current.",
              "Publishing fields match the final production URL and workshop type.",
              "Brown Button, Sprint, and video fields are filled only when they apply and use the correct URL pattern."
            ],
            watchFor: [
              "Submitting the PR while the fork is behind production or still has conflicts.",
              "Using the personal preview URL in the production field.",
              "Skipping the Publishing tab because the PR already exists."
            ],
            snippetTitle: "Publishing URL pattern",
            snippet: [
              "Preview",
              "https://<github-username>.github.io/<repo>/<path>/workshops/<variant>/index.html",
              "",
              "Production",
              "https://oracle-livelabs.github.io/<repo>/<path>/workshops/<variant>/",
              "",
              "Brown Button",
              "https://oracle-livelabs.github.io/<repo>/<path>/workshops/tenancy/",
              "",
              "Sprint",
              "https://oracle-livelabs.github.io/sprints/<category-folder>/<sprint-folder>/"
            ].join("\n"),
            image: {
              src: "./03-validation-qa-publish/sections/03-publish-workshop/images/general-req.png",
              alt: "Pull request general requirements checklist",
              caption: "The PR form and checklist are part of the publishing handoff, not optional extra notes."
            },
            sourceHref: labLink("6-labs-publish"),
            sourceLabel: "Open Canonical Lab"
          }
        ]
      },
      {
        id: "reuse-enhancements",
        label: "Section 4",
        title: "Reuse and Enhancements",
        accent: "pine",
        summary: "Add optional interactivity only after the core workflow is stable. This section keeps the enhancements grounded in learner value rather than novelty.",
        purpose: "Use this section when the workshop needs inline SQL or knowledge checks, not when the core markdown or review flow is still shaky.",
        highlights: [
          "Finish the core author path first.",
          "Keep optional components close to the task they support.",
          "Preview every enhancement before you rely on it."
        ],
        sectionHref: labLink("workshop-components-reuse"),
        sectionLabel: "Open Canonical Section",
        labs: [
          {
            id: "guide-freesql",
            label: "Lab 11",
            title: "Embed SQL Developer using FreeSQL",
            summary: "Use the generated FreeSQL embed only when running SQL inline truly improves the task flow for the learner.",
            steps: [
              "Prepare the SQL or PL/SQL you want learners to run and generate the embed snippet from FreeSQL.",
              "Paste the generated embed directly into the task where the learner needs it and keep the related instructions immediately beside it.",
              "Render the lab and validate that the editor loads correctly, uses the available width, and still matches the surrounding steps."
            ],
            checkpoints: [
              "The embed is scoped to one task or concept instead of taking over the page.",
              "Preview confirms the runtime still loads the editor where the learner expects it."
            ],
            watchFor: [
              "Adding an embed when a normal code block or copy tag would be clearer.",
              "Modifying iframe attributes without first validating the current renderer behavior."
            ],
            snippetTitle: "FreeSQL placement rule",
            snippet: [
              "1. Generate the embed snippet in FreeSQL",
              "2. Paste it into the task that needs SQL execution",
              "3. Keep the instructions directly above or below it",
              "4. Preview the rendered lab before review"
            ].join("\n"),
            sourceHref: labLink("freesqlembed"),
            sourceLabel: "Open Canonical Lab"
          },
          {
            id: "guide-quizzes",
            label: "Lab 12",
            title: "Add LiveLabs quizzes",
            summary: "Use quizzes to reinforce the step that just happened, not as detached trivia at the edge of the page.",
            steps: [
              "Add a quiz block where the learner should stop and verify understanding of the task that just finished.",
              "Use `Q:` for each question, `*` for correct answers, `-` for wrong answers, and `>` for the explanation shown after submit.",
              "Use `quiz score` plus `quiz-config` when you want scoring or a badge and keep the badge asset in the images folder.",
              "Preview the page and verify that single-answer, multi-answer, and scored quiz states render the way you expect."
            ],
            checkpoints: [
              "The question is tied to the content immediately above it.",
              "Preview proves the quiz marks answers correctly and the badge path is valid."
            ],
            watchFor: [
              "Adding quizzes that slow the flow instead of helping the learner confirm understanding.",
              "Forgetting explanations on questions that need teaching value."
            ],
            snippetTitle: "Single-answer quiz block",
            snippet: [
              "```quiz",
              "Q: What is the maximum image width allowed in LiveLabs workshops?",
              "* 1280 pixels",
              "- 1920 pixels",
              "- 1600 pixels",
              "> PR checks block images over 1280px in either dimension.",
              "```"
            ].join("\n"),
            image: {
              src: "./04-workshop-components-reuse/sections/02-add-quizzes/images/quizscore.png",
              alt: "Scored quiz example",
              caption: "Use scored quizzes only when the workshop truly benefits from pass or fail feedback."
            },
            sourceHref: labLink("quiz"),
            sourceLabel: "Open Canonical Lab"
          }
        ]
      },
      {
        id: "tools-productivity",
        label: "Section 5",
        title: "Tools and Productivity",
        accent: "sienna",
        summary: "This section covers screenshot quality, image optimization, and late-stage cleanup so review time is spent on substance rather than avoidable polish issues.",
        purpose: "Use these tools while building or polishing the workshop, then return to validation and publish once the fixes are in place.",
        highlights: [
          "Capture quality first, then optimize.",
          "Fix image size before the PR does it for you.",
          "Use automation late and still review the result."
        ],
        sectionHref: labLink("tools"),
        sectionLabel: "Open Canonical Section",
        labs: [
          {
            id: "guide-screens",
            label: "Lab 13",
            title: "Capture effective screens",
            summary: "Capture what the learner needs to see, redact safely, and keep each lab images folder clean enough that review is about the steps, not the screenshots.",
            steps: [
              "Capture only the relevant window or control, not the entire screen.",
              "Resize screenshots to 1280px or less, prefer PNG for UI, and keep alt text on every image reference.",
              "Redact by deleting the sensitive content underneath, filling the space with an opaque shape, and flattening the image before you save.",
              "Use the Check Unused Images tool to find extra or missing screenshots in each lab images folder."
            ],
            checkpoints: [
              "The screenshot makes the next click obvious.",
              "No sensitive data survives in pixels or metadata."
            ],
            watchFor: [
              "Oversized screenshots with tiny actionable UI.",
              "Leaving stale screenshots in the folder after rewriting the task."
            ],
            snippetTitle: "Screenshot quality bar",
            snippet: [
              "- Crop to the action",
              "- Max 1280px",
              "- PNG for UI",
              "- Redact and flatten",
              "- Remove unused screenshots"
            ].join("\n"),
            image: {
              src: "./05-tools/sections/01-capture-screens-best-practices/images/results-displayed.png",
              alt: "Check unused images tool results",
              caption: "The unused-images check is a fast way to keep the repo and review surface clean."
            },
            sourceHref: labLink("13-labs-capture-screens-best-practices"),
            sourceLabel: "Open Canonical Lab"
          },
          {
            id: "guide-optishot",
            label: "Lab 14",
            title: "Optimize screenshots with OptiShot",
            summary: "Use OptiShot for recursive image resize and compression when the workshop already has screenshots and the size limit is the blocker.",
            steps: [
              "Install OptiShot for your platform and launch it.",
              "Select the root folder that contains the screenshots you want to process and keep the max dimension at 1280px.",
              "Use dry-run first when you want to inspect the target files, then run the real pass and read the summary."
            ],
            checkpoints: [
              "The correct folder was selected.",
              "The summary matches the files you expected to change."
            ],
            watchFor: [
              "Running it on the wrong directory.",
              "Assuming resize fixes a screenshot that was badly captured in the first place."
            ],
            snippetTitle: "OptiShot dry-run",
            snippet: [
              "OptiShot.exe C:\\path\\to\\images --dry-run",
              "./OptiShot.app/Contents/MacOS/OptiShot /path/to/images --dry-run"
            ].join("\n"),
            image: {
              src: "./05-tools/sections/02-optishot/images/root.png",
              alt: "OptiShot folder selection dialog",
              caption: "Pick the real workshop or images root so the resize pass hits the files the PR is checking."
            },
            sourceHref: labLink("optishot"),
            sourceLabel: "Open Canonical Lab"
          },
          {
            id: "guide-fixomat",
            label: "Lab 15",
            title: "Clean up content with Fixomat",
            summary: "Use Fixomat late in the workflow for markdown cleanup or image optimization, then review MANUAL findings before you trust the result.",
            steps: [
              "Launch Fixomat, select the workshop root, and choose the mode that matches the problem: markdown only, images only, or both.",
              "Run the scan and read the log carefully instead of treating the app like a one-click finalizer.",
              "Follow up on MANUAL findings, preview again, and rerun the tool if needed."
            ],
            checkpoints: [
              "The chosen mode matches the actual cleanup work.",
              "You reviewed MANUAL findings before calling the pass done."
            ],
            watchFor: [
              "Running cleanup automation before the content is stable.",
              "Skipping preview after a bulk markdown or image change."
            ],
            snippetTitle: "Read the output correctly",
            snippet: [
              "FIXED  -> Fixomat applied the change",
              "MANUAL -> you still need to inspect or edit the file"
            ].join("\n"),
            sourceHref: labLink("fixomat"),
            sourceLabel: "Open Canonical Lab"
          }
        ]
      },
      {
        id: "specialized-workflows",
        label: "Section 6",
        title: "Specialized Workflows",
        accent: "ocean",
        summary: "Use specialized workflows only when the workshop delivery model requires them: sprints, remote desktop, Marketplace image work, or secure desktops.",
        purpose: "These labs are intentionally separate from the core path so optional delivery models do not complicate the normal author flow.",
        highlights: [
          "Finish the core path first unless the delivery model changes the structure from day one.",
          "Open only the specialized labs that match your workshop.",
          "Return to validation and publish once the specialized setup is stable."
        ],
        sectionHref: labLink("specialized-workflows-reference"),
        sectionLabel: "Open Canonical Section",
        labs: [
          {
            id: "guide-sprints",
            label: "Lab 16",
            title: "Develop LiveLabs Sprints",
            summary: "Use the sprints repo and sprint publishing flow when the deliverable is a short, focused sprint instead of a full workshop.",
            steps: [
              "Check WMS first to make sure a sprint with the same content does not already exist.",
              "Fork and clone oracle-livelabs/sprints, copy the sample sprint structure into the correct domain folder, and rename the sprint folder plus markdown file together.",
              "Update manifest.json, preview the sprint, create the PR, then request sprint publishing in WMS and add the WMS ID plus LiveLabs ID back to the PR."
            ],
            checkpoints: [
              "The sprint lives in the correct domain folder and uses the sprint help email.",
              "The sprint publish request includes the GitHub Pages URL pattern in WMS."
            ],
            watchFor: [
              "Treating a sprint like a normal workshop and using the wrong repo or manifest structure.",
              "Skipping the WMS sprint bucket or forgetting to update the PR with WMS and LiveLabs IDs."
            ],
            snippetTitle: "Sprint publishing URL pattern",
            snippet: [
              "https://oracle-livelabs.github.io/sprints/<domain-folder>/<sprint-folder>/"
            ].join("\n"),
            image: {
              src: "./06-specialized-workflows-reference/sections/01-create-sprints-workflow/images/request-sprint-publishing.png",
              alt: "Sprint publishing request in WMS",
              caption: "Sprint publishing uses a dedicated WMS flow and a dedicated production URL pattern."
            },
            sourceHref: labLink("10-create-sprints-workflow"),
            sourceLabel: "Open Canonical Lab"
          },
          {
            id: "guide-remote-desktop",
            label: "Lab 17",
            title: "Set up graphical remote desktop",
            summary: "Use the noVNC remote desktop workflow when learners need a browser-accessible desktop or preloaded web applications.",
            steps: [
              "SSH to the host, switch to root, and run the first-boot and noVNC setup scripts exactly as documented.",
              "Test both desktop URLs, then walk the Oracle Linux and Chrome first-run steps so the learner does not see unexpected onboarding screens during the workshop.",
              "Update desktop guide and app URLs, service dependencies, and any auto-start behavior before you capture or publish the custom image."
            ],
            checkpoints: [
              "The remote desktop launches cleanly and preloads the right guide or app URLs.",
              "Browser startup screens are already cleared or handled in the image."
            ],
            watchFor: [
              "Publishing a desktop image before validating the actual browser experience.",
              "Forgetting dependent services and getting 404s because apps are not ready when the browser opens."
            ],
            snippetTitle: "Desktop URL variables to validate",
            snippet: [
              "desktop_guide_url",
              "desktop_app1_url",
              "desktop_app2_url"
            ].join("\n"),
            image: {
              src: "./06-specialized-workflows-reference/sections/02-setup-graphical-remote-desktop/images/novnc-urls.png",
              alt: "noVNC output with desktop URLs",
              caption: "Validate the actual desktop launch URLs before you move into image capture."
            },
            sourceHref: labLink("6-labs-setup-graphical-remote-desktop"),
            sourceLabel: "Open Canonical Lab"
          },
          {
            id: "guide-marketplace-image",
            label: "Lab 18",
            title: "Create custom image for Marketplace",
            summary: "Clean the host, capture the image, test it through the sample ORM stack, and verify the remote desktop before you try to publish a listing.",
            steps: [
              "SSH to the instance outside the remote desktop session and run the cleanup steps used to prepare the host for image capture.",
              "Create the custom image from the OCI console and update the compatible shapes as documented.",
              "Copy the image OCID into the sample ORM stack, set the desktop URLs, deploy the test stack, and validate the resulting remote desktop."
            ],
            checkpoints: [
              "The image OCID and desktop URLs are updated in the test stack before validation.",
              "The remote desktop launched from the stack behaves the way the workshop needs."
            ],
            watchFor: [
              "Capturing the image without running the cleanup steps first.",
              "Skipping the ORM-stack test and discovering image problems only after Marketplace review."
            ],
            snippetTitle: "Variables to update in the ORM test stack",
            snippet: [
              "instance_image_id",
              "desktop_guide_url",
              "desktop_app1_url",
              "desktop_app2_url"
            ].join("\n"),
            image: {
              src: "./06-specialized-workflows-reference/sections/03-create-custom-image-for-marketplace/images/update-image-ocid.png",
              alt: "Updating custom image OCID in the ORM stack variables file",
              caption: "The test stack is where you prove the image works before you ask Marketplace to review it."
            },
            sourceHref: labLink("7-labs-create-custom-image-for-marketplace"),
            sourceLabel: "Open Canonical Lab"
          },
          {
            id: "guide-marketplace-publish",
            label: "Lab 19",
            title: "Publish your image to Oracle Marketplace",
            summary: "Get publisher access, create terms and artifacts, submit the listing or revision, and plan for Marketplace review time before it is usable in LiveLabs.",
            steps: [
              "Confirm publisher access and create Terms of Use in the OCI Marketplace flow.",
              "Create the compute image artifact from the custom image and its compatible shapes.",
              "Create or clone the OCI application listing, attach the new artifact, submit it for review, and wait for approval before you publish it privately."
            ],
            checkpoints: [
              "The correct artifact is attached to the listing revision.",
              "You account for Marketplace review and publish time instead of expecting same-day availability."
            ],
            watchFor: [
              "Trying to use an image in LiveLabs before the Marketplace listing is approved.",
              "Forgetting that Marketplace review can take longer than the normal LiveLabs publishing flow."
            ],
            snippetTitle: "Marketplace timing to plan around",
            snippet: [
              "Listing revision review -> up to a week",
              "Publishing after approval -> 1 to 3 business days"
            ].join("\n"),
            image: {
              src: "./06-specialized-workflows-reference/sections/04-publish-custom-image-to-marketplace/images/publish-listing-1.png",
              alt: "Publish listing action in Oracle Marketplace",
              caption: "Marketplace publishing has its own review timeline, separate from LiveLabs PR review."
            },
            sourceHref: labLink("8-labs-publish-custom-image-to-marketplace"),
            sourceLabel: "Open Canonical Lab"
          },
          {
            id: "guide-marketplace-update",
            label: "Lab 20",
            title: "Update the image on your sandbox environment",
            summary: "Register the Marketplace listing in LiveLabs self-service, add the image metadata, and then swap the image inside the workshop publishing entry.",
            steps: [
              "Register the Marketplace listing through WMS Custom Images with the exact listing name and support contacts.",
              "Add the image metadata, including OCID, database version if relevant, and whether noVNC is enabled.",
              "Open the workshop publishing entry, go to Sandbox Environment, edit the image row, and select the new registered image."
            ],
            checkpoints: [
              "The listing is registered in self-service before you try to attach it to the workshop.",
              "Support contacts are set so the right people can view and edit the image."
            ],
            watchFor: [
              "Using the wrong listing name or leaving out support contacts.",
              "Trying to attach an image that was never registered in LiveLabs self-service."
            ],
            snippetTitle: "Image registration essentials",
            snippet: [
              "Listing name",
              "Support contact emails",
              "Image OCID",
              "Database version if relevant",
              "NoVNC enabled?"
            ].join("\n"),
            image: {
              src: "./06-specialized-workflows-reference/sections/05-add-custom-image-to-workshop/images/update-image-4.png",
              alt: "Editing the sandbox image row in WMS",
              caption: "The Sandbox Environment tab is where the LiveLabs workshop picks up the registered Marketplace image."
            },
            sourceHref: labLink("12-add-custom-image-to-workshop"),
            sourceLabel: "Open Canonical Lab"
          },
          {
            id: "guide-secure-desktop-when",
            label: "Lab 21",
            title: "Secure Desktop environments in LiveLabs",
            summary: "Use OCI Secure Desktops when participants are on restricted corporate laptops and cannot access the standard environment directly.",
            steps: [
              "Decide whether the audience is likely to be blocked by corporate laptop policies before the event starts.",
              "Test standard access first with one or two representative participants, then try Secure Desktop if normal access fails.",
              "Use the secure desktop only when it is solving a real access restriction, not as the default path for every event."
            ],
            checkpoints: [
              "You have evidence that standard access is blocked before you request the secure desktop route.",
              "The participant can reach the workshop inside the secure desktop browser session."
            ],
            watchFor: [
              "Enabling secure desktop without testing the normal path first.",
              "Waiting until the event starts to discover corporate access restrictions."
            ],
            snippetTitle: "When secure desktop is the right answer",
            snippet: [
              "Corporate-managed laptops",
              "Restricted access to required websites or protocols",
              "Need a browser-accessible HTTPS remote desktop"
            ].join("\n"),
            sourceHref: labLink("secure-desktop"),
            sourceLabel: "Open Canonical Lab"
          },
          {
            id: "guide-secure-desktop-request",
            label: "Lab 22",
            title: "Request and access Secure Desktop environments",
            summary: "Request the secure desktop through the documented Slack flow and make sure participants use the supported browser and access steps.",
            steps: [
              "Post the secure desktop request in the LiveLabs Authors Slack channel and include the details the request page asks for.",
              "Tell participants to use Google Chrome and to log out of any OCI tenants in the browser before launch.",
              "Point participants to the secure desktop access guide and validate the end-to-end connection before the event."
            ],
            checkpoints: [
              "The request includes enough detail for the LiveLabs team to provision the environment.",
              "Participants have the supported browser and access prerequisites."
            ],
            watchFor: [
              "Assuming participants can just open the secure desktop without the browser prerequisites.",
              "Sending a vague request with no workshop or event context."
            ],
            snippetTitle: "Bring these details to the request",
            snippet: [
              "Workshop name",
              "Event or audience context",
              "Expected participant count",
              "Why standard access is blocked",
              "Requested date"
            ].join("\n"),
            sourceHref: labLink("secure-desktop-how-to-request"),
            sourceLabel: "Open Canonical Lab"
          }
        ]
      },
      {
        id: "help-faq",
        label: "Section 7",
        title: "Help and FAQ",
        accent: "pine",
        summary: "Use this section when the blocker is process, ownership, or timing and you need the right support route or a fast answer to a repeat workflow question.",
        purpose: "This section is intentionally short: first find the right channel, then bring enough context that support can actually unblock you.",
        highlights: [
          "FAQ first for repeat questions.",
          "Use the right owner or channel for the blocker.",
          "Bring WMS ID, preview URL, and repo or PR context."
        ],
        sectionHref: labLink("help-faq-support"),
        sectionLabel: "Open Canonical Section",
        labs: [
          {
            id: "guide-need-help",
            label: "Need Help?",
            title: "Use the right support channel",
            summary: "Use WMS, email, Slack, or office hours intentionally instead of sending the same vague help request everywhere.",
            steps: [
              "Check whether the answer is already in the workflow labs or FAQ before you escalate.",
              "Use WMS Message the Team for workshop-specific status, stakeholder, or publishing questions tied to one record.",
              "Use the shared mailbox or #workshop-authors-help Slack channel for tooling, documentation, or shared platform blockers.",
              "Bring the WMS ID, preview URL, repo or PR, exact blocker, and what you already tried."
            ],
            checkpoints: [
              "The support request goes to the channel that owns the blocker.",
              "The request includes enough context to reproduce or route the issue."
            ],
            watchFor: [
              "Asking for help with no context.",
              "Broadcasting the same vague issue to multiple channels at once."
            ],
            snippetTitle: "Support request template",
            snippet: [
              "WMS ID:",
              "Preview URL:",
              "Repo / branch or PR:",
              "Current status:",
              "Exact blocker:",
              "What I already tried:"
            ].join("\n"),
            sourceHref: labLink("need-help"),
            sourceLabel: "Open Canonical Lab"
          },
          {
            id: "guide-faq",
            label: "LiveLabs FAQ",
            title: "Use the FAQ for repeat workflow questions",
            summary: "The FAQ is for repeated author questions such as VPN, preview versus production links, major versus minor updates, and missed Quarterly QA.",
            steps: [
              "Use FAQ first for common WMS and repo questions such as VPN, who can submit a workshop, and where the Self QA checklist appears.",
              "Use it again for maintenance questions such as which link to share during development, which link to share after publish, and how to handle minor or major updates.",
              "Return to the relevant workflow lab when you need execution detail instead of a short answer."
            ],
            checkpoints: [
              "You know when a short FAQ answer is enough and when you need the full workflow lab.",
              "You are not treating the FAQ like the main instructions page."
            ],
            watchFor: [
              "Using FAQ answers as a shortcut around the actual author flow.",
              "Escalating a question that the FAQ already answers."
            ],
            snippetTitle: "Typical FAQ decision points",
            snippet: [
              "Need VPN for WMS?",
              "Which link to share in development?",
              "Which link to share after publish?",
              "What if Quarterly QA is missed?"
            ].join("\n"),
            sourceHref: labLink("livelabs-faq"),
            sourceLabel: "Open Canonical Lab"
          }
        ]
      }
    ]
  };
}());
