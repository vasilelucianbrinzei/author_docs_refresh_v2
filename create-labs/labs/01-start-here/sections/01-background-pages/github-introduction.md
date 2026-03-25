# Understand the Oracle LiveLabs GitHub Model

## Introduction

This page gives workshop authors the GitHub context needed for LiveLabs work. It is not a general GitHub tutorial. The focus here is which repositories matter, how authors work safely in forks, and where GitHub fits in the LiveLabs workflow.

Estimated Time: 10 minutes

### Objectives

* Understand how `oracle-livelabs` repositories are organized
* Know the difference between a production repository, your fork, and your local clone
* Know which repositories most authors need before they start editing

## Task 1: Know Which Repositories Matter

1. LiveLabs workshop content lives in the `oracle-livelabs` GitHub organization, which contains multiple repositories owned by product or council areas.
2. Your workshop belongs in one specific repository based on the product or team that owns the content.
3. The `oracle-livelabs/common` repository matters even if your workshop lives elsewhere because it contains sample templates, common labs, shared images, and reusable assets.
4. If you are not sure which repository to use, confirm it with your council group or the LiveLabs team before you start authoring.

## Task 2: Understand The Safe Authoring Flow

1. Fork the production repository you need so you can work in your own GitHub copy without changing `oracle-livelabs` directly.
2. Clone your fork to your local machine so you can edit Markdown, manifests, and images in your editor.
3. Sync from `upstream/main` regularly so your local work stays aligned with the production repository.
4. Push your changes to your fork, preview the workshop through GitHub Pages, and then open a pull request back to the production repository.

## Task 3: Continue To The Setup Labs

1. Go to **Lab 2: Set up GitHub and install tools** if you still need account, desktop client, or editor setup.
2. Go to **Lab 3: Stay in sync with GitHub environment** if you are ready to fork, clone, sync, and preview your workshop.

## Acknowledgements

* **Last Updated By/Date:** Workshop Author Docs Refresh, March 2026
