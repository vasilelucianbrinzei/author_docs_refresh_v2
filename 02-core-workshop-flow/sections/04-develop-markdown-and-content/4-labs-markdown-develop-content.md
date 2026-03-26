# Develop Markdown and Content

## Introduction

This lab focuses on the authoring rules that most LiveLabs workshops need every time: build the right folder structure, write valid lab Markdown, keep manifests clean, reuse shared assets when it helps, and catch rendering problems early. It intentionally leaves out lower-value extras so the core author path stays focused.

Estimated Time: 30 minutes

### Objectives

* Create the correct workshop and lab structure
* Update `manifest.json` and shared variables correctly
* Apply required Markdown, image, link, and security standards
* Reuse common LiveLabs content when it saves time
* Validate content before it reaches QA and publishing

### What Do You Need?

* A cloned LiveLabs repository
* The `oracle-livelabs/common` repository or direct access to its templates
* A text editor such as Visual Studio Code
* A preview method such as Live Server or GitHub Pages

## Task 1: Create The Workshop Structure

1. Start from the sample workshop in `oracle-livelabs/common/sample-livelabs-templates/sample-workshop`.
2. In your target repository, create the workshop root where the new content will live.
3. Copy the sample lab folders you need into that workshop root. Rename the copied lab folder and its Markdown file together, and keep the names lowercase and descriptive.
4. Keep each lab's `images` folder. Delete the copied `files` folder unless the lab truly needs downloadable assets.
5. Copy the `introduction` folder if your workshop needs a dedicated intro page.
6. Copy the `workshops` folder and keep the required `index.html` and `manifest.json` files for each workshop variant you support.
7. Update each `manifest.json` with the real `workshoptitle`, `help`, and tutorial order. Remove optional fields such as `include` or `variables` if you are not using them.
8. Preview the relevant `workshops/.../index.html` file as soon as the manifest points to real labs so structure problems surface early.

Example manifest skeleton:

```json
{
  "workshoptitle": "My Workshop Title",
  "help": "my-stakeholders@oracle.com",
  "tutorials": [
    {
      "title": "Introduction",
      "filename": "./../../01-start-here/start-here.md"
    }
  ]
}
```

## Task 2: Reuse Shared LiveLabs Content

1. Use common labs from `oracle-livelabs/common` when the content is standard and does not need a workshop-specific rewrite.
2. Reference approved common labs by URL in the manifest instead of copying them into your repository when reuse is the better choice.
3. Use shared images through absolute `oracle-livelabs.github.io/common/...` paths when reuse is better than duplicating assets locally.
4. Prefer reuse for stable material such as common onboarding instructions, support pages, and standard console screenshots.

Example common lab entry:

```json
{
  "title": "Need Help?",
  "filename": "https://oracle-livelabs.github.io/common/labs/need-help/need-help.md"
}
```

Example shared image syntax:

```md
![Console home page](https://oracle-livelabs.github.io/common/images/console/home-page.png " ")
```

## Task 3: Apply Required Authoring Standards

1. Every lab should include one H1 title, an `Introduction` section, `Objectives`, `Estimated Time`, `What Do You Need?`, task sections, and `Acknowledgements`.
2. Use `## Task ...` headers and numbered steps so the workshop reads like guided instructions, not loose notes.
3. Indent notes, code blocks, and images under the numbered step they belong to.
4. Keep folder names, Markdown filenames, and referenced asset names lowercase and aligned.
5. Use Markdown links instead of inline HTML or short URL services.
6. Remove or blur sensitive information in both text and screenshots. Do not publish internal URLs, passwords, OCIDs, usernames, or similar data.
7. Give every image useful alt text and keep screenshot crops readable and consistent.

Examples:

```md
![Provisioned database details](images/provisioned-database.png " ")
[Review the common repository](https://github.com/oracle-livelabs/common)
```

## Task 4: Use Manifest Features Intentionally

1. Use conditional formatting only when one lab truly supports multiple workshop variants and the content is still mostly shared.
2. When you use conditional content, the `type` value in the manifest must match the `<if type="...">` blocks in the Markdown.
3. Use variable files when a value repeats across multiple labs or workshop variants. If you are not using variables, remove the `variables` field from the manifest.
4. Use `Estimated Time: x` when you want the framework to calculate the time automatically.

Example conditional setup:

```json
{
  "title": "Provision Resources",
  "filename": "./../../provision/provision.md",
  "type": "livelabs"
}
```

```md
<if type="livelabs">
Use the LiveLabs environment instructions here.
</if>
```

Example variables setup:

```json
"variables": [
  "../../variables/variables.json"
]
```

```md
See [](var:doc_link) for more detail.
```

## Task 5: Validate While You Write

1. Preview the workshop with **Live Server** or GitHub Pages while you author.
2. Add `?qa=true` to the preview URL to open the built-in LintChecker.
3. Use the LintChecker to catch missing sections, bad indentation, broken links, broken images, missing alt text, and invalid `<copy>` usage before those issues pile up.
4. Click `(show)` next to an issue when available so you can jump directly to the problem area.
5. Re-run your preview after each correction so formatting errors do not stack up before QA.

## Task 6: Avoid Common Rendering Failures

1. Match file and folder case exactly. GitHub Pages is case-sensitive even when your local machine is not.
2. If a case-only rename does not register on Windows or macOS, rename the file to a temporary name first or use `git mv` to force the change.
3. Use fenced code blocks for commands and examples, and add a language identifier such as `text`, `bash`, `json`, `sql`, or `plsql` when it improves readability.
4. Add `<copy>` tags only when you want users to copy the content directly.
5. Use `sql` or `plsql` inside `<copy>` tags for SQL snippets so the copied text includes the trailing newline needed for execution.
6. If something works locally but fails on GitHub Pages, check filename case, manifest filenames, and image paths before you assume the renderer is broken.

Example copyable code block:

```sql
<copy>
SELECT * FROM employees;
</copy>
```

## Acknowledgements

* **Last Updated By/Date:** Workshop Author Docs Refresh, March 2026
