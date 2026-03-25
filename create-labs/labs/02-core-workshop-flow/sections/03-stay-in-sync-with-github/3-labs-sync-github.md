# Stay in Sync with GitHub Environment

## Introduction

This lab covers the GitHub workflow authors use after WMS approval: choose the right repository, fork it, clone it locally, stay synchronized with production, understand the LiveLabs folder structure, and publish a preview from your fork.

Estimated Time: 25 minutes

### Objectives

* Fork the correct LiveLabs repositories
* Clone your fork locally and keep it synced with `upstream/main`
* Understand the required workshop folder structure
* Commit, push, and preview your workshop safely before opening a pull request

## Task 1: Fork The Repositories You Need

1. Identify the `oracle-livelabs` repository that matches your product or council area.
2. Fork that repository to your own GitHub account so you can work without changing the production repository directly.
3. Also fork `oracle-livelabs/common` because it contains the sample workshop, common labs, and shared assets used across LiveLabs.
4. If you are unsure which repository should host your workshop, confirm it before you start authoring.

## Task 2: Clone Your Fork

1. Open **GitHub Desktop** and choose **File > Clone Repository**.
2. Select the forked repository from your GitHub account and choose a local path on your machine.
3. When GitHub Desktop asks how you plan to use the fork, choose **To contribute to the parent project**.
4. Repeat the process for the `common` repository if you plan to reuse templates or shared content locally.

## Task 3: Sync From `upstream/main` Before You Edit

1. Open GitHub Desktop and switch to the repository you plan to edit.
2. Click **Fetch origin** to update your local view of the fork.
3. Merge `upstream/main` into your local `main` branch before you start editing.
4. Push the result back to `origin` so your local clone and your fork stay aligned.
5. Repeat this sync step regularly, especially before large edits and before you open a pull request.

> **Note:** Most avoidable merge conflicts come from skipping this sync step for too long.

## Task 4: Understand The LiveLabs Workshop Structure

1. Use the sample workshop in `oracle-livelabs/common` as the starting point for folder structure.
2. Create a workshop root folder inside your cloned product repository.
3. Give each lab its own folder with a Markdown file and an `images` directory.
4. Keep the `workshops` folder for `index.html`, `manifest.json`, and optional `README.md` files for each workshop variant.
5. Update `manifest.json` to control tutorial order, title, help email, and any optional settings such as shared variable files.

## Task 5: Commit And Push Your Changes

1. Make your content and asset changes locally in VS Code or your preferred editor.
2. Review the changed files in GitHub Desktop.
3. Enter a clear commit summary that explains what changed.
4. Commit to your local branch and then push to `origin` so the fork stays current with your work.

## Task 6: Publish A Preview With GitHub Pages

1. Open your fork on github.com and go to **Settings > Pages**.
2. Enable GitHub Pages from the `main` branch if it is not already enabled.
3. Wait for the published site URL to appear.
4. Use that GitHub Pages URL to preview and share your workshop with reviewers.

## Task 7: Open The Workshop Preview Correctly

1. Start with the published root URL for your fork, for example `https://<your-user>.github.io/<repo>/`.
2. Append the workshop path so the URL points to the correct `workshops/.../index.html` file.
3. Use that full preview URL for SME review, self-QA, and pull request context before publishing to production.

## Acknowledgements

* **Last Updated By/Date:** Workshop Author Docs Refresh, March 2026
