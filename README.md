# Oracle LiveLabs Author Guide

This project keeps one canonical author-guide source and two first-class presentation routes:

1. `index.html`
   The redesigned app with Guided Path, Toolkit, Full Guide, unified search, and the sample workshop demo.
2. `workshops/author-guide/index.html`
   The full-page markdown guide fallback built from the same flat manifest and source tree.

The canonical source now lives under `content/author-guide`. Both the redesigned Full Guide and the markdown fallback read from the same flat guide order so the content no longer drifts into custom section summaries or grouped parent-category wrappers.

The active page order mirrors the synced `create-labs` source manifest under `workshops/author-guide/manifest.json`. Older section-based material remains archived or inactive and is no longer part of the active Full Guide navigation.

When the local `create-labs` mirror lags the live upstream guide, `v2` may carry a small explicit delta to keep the active guide current. The current example is the LiveLabs AI Developer Hub page, which stays active in `v2` even though it is missing from the local source mirror.

Variant wrappers live under `workshops/variants/`:

1. `workshops/variants/compute/index.html`
2. `workshops/variants/marketplace/index.html`

Compatibility shims still exist at `workshops/livelabs/`, `workshops/compute/`, and `workshops/marketplace/` so older bookmarks keep working while the active structure becomes clearer in the IDE.
