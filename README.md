# Github Pages

https://vasilelucianbrinzei.github.io/author_docs_refresh_v2/

The published root page is now the path-first landing experience:

* `index.html` is the main entry point with the two-path UI.
* `?lab=` links on the root still route into `workshops/livelabs/index.html`.
* `workshops/livelabs/index.html` sends no-lab visits back to the root landing page.

# Guide Folder Structure

This folder is organized to mirror the guide flow instead of a flat lab-number layout.

## Parent Folders

* `01-start-here` through `07-help-faq-support` are the main guide categories.
* Each category folder keeps the category landing page at the top level.
* Category-level assets that support the landing page can stay beside that landing page.
* `07-help-faq-support` is intentionally last because it is a support destination, not part of the normal build sequence.

## Child Folders

* Each category uses a `sections/` subfolder for its detailed child pages.
* Section folders are numbered in reading order inside their parent category.
* Keep each section's Markdown file, images, and local assets together inside that section folder.

## Others

* `workshops/` stays at the top level because it contains the publishable workshop variants, `index.html`, and `manifest.json` files.
* Treat `workshops/` as publishing configuration, not as guide content.

## Archive

* `archive-retired-reference` stores retired or intentionally excluded material and is intentionally outside the numbered guide flow.
* Do not point active manifests to archive content unless that material is brought back into scope.
