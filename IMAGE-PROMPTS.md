# Image Prompts for Author Guide

## Purpose

Use this file as the working prompt pack for generating summary visuals from the current `v2` guide structure.

This prompt pack is based on the active guide in this repo, not the older template.

## Source Of Truth

Use the current guide structure in `v2` as the content source:

1. `Section 1: Start Here`
2. `WMS lifecycle, QA, and publishing flow`
3. `GitHub foundations`
4. `Section 2: Core Workflow`
5. `Lab 1: Submit new workshop in WMS`
6. `Lab 2: Set up GitHub and install tools`
7. `Lab 3: Stay in sync with GitHub`
8. `Lab 4: Develop Markdown and content`
9. `Section 3: Validation and Publish`
10. `Lab 5: QA checks and steps`
11. `Review, QA, and publishing timelines`
12. `Lab 6: Pull Request automated checks`
13. `Lab 7: Publish your workshop`
14. `Section 4: Reuse and Enhancements`
15. `Section 5: Tools and Productivity`
16. `Section 6: Specialized Workflows`
17. `Section 7: Help and FAQ`

## General Rules For The Image Tool

Apply these rules to every prompt:

* Use the current `v2` guide only.
* Show the main author journey clearly.
* Keep optional sections visually separate from the main path.
* Prefer a white or very light background.
* Use restrained red, charcoal, gray, and subtle accent colors.
* Keep typography clear and highly readable.
* Avoid purple-heavy palettes, noisy gradients, and decorative clutter.
* Do not invent fake product screens or fake UI screenshots.
* Do not overload the image with long paragraphs.
* Prefer structured cards, flow arrows, milestones, icons, and labels.
* Make the image readable inside a documentation page.

## Prompt 1: Hero Flow Graphic

Use this to generate a wide intro image for the top of the guide.

```text
Create a clean enterprise documentation flow graphic for Oracle LiveLabs authors.

Goal:
Show the end-to-end author journey at a glance, with one main path and a few optional branches.

Audience:
Internal workshop authors who need a fast orientation before reading the guide.

Content to show:
1. Start Here
2. WMS lifecycle, QA, and publishing flow
3. GitHub foundations
4. Core Workflow
5. Lab 1: Submit new workshop in WMS
6. Lab 2: Set up GitHub and install tools
7. Lab 3: Stay in sync with GitHub
8. Lab 4: Develop Markdown and content
9. Validation and Publish
10. Lab 5: QA checks and steps
11. Review, QA, and publishing timelines
12. Lab 6: Pull Request automated checks
13. Lab 7: Publish your workshop
14. Optional side branches:
Reuse and Enhancements
Tools and Productivity
Specialized Workflows
15. Help and FAQ

Visual direction:
Horizontal swimlane flow, minimal text, clear arrows, clean iconography, white background, charcoal text, restrained red accents, accessible contrast, no fake UI screenshots, no clutter.

Output:
16:9 hero image, highly readable at medium width inside a docs page.
Generate 3 variations with different layouts while keeping the same content.
```

## Prompt 2: Roadmap Variation

Use this for a more narrative version of the same flow.

```text
Create a roadmap-style infographic for an Oracle LiveLabs author guide.

Goal:
Show the guide as a journey from orientation to production publish.

Structure:
Stage 1: Start Here
- what is a workshop, lab, sprint
- WMS lifecycle, QA, and publishing flow
- GitHub foundations

Stage 2: Core Workflow
- Lab 1
- Lab 2
- Lab 3
- Lab 4

Stage 3: Validation and Publish
- Lab 5
- Review, QA, and publishing timelines
- Lab 6
- Lab 7

Stage 4: Optional extensions
- Reuse and Enhancements
- Tools and Productivity
- Specialized Workflows

Stage 5: Help and FAQ

Style:
Editorial roadmap, polished documentation illustration, modern but not flashy, strong hierarchy, large labels, concise captions, clean arrows and milestone markers.

Output:
Wide landscape image for the intro section.
Generate 3 variations.
```

## Prompt 3: User Story Flow

Use this when you want the image to feel more like a guided author journey.

```text
Create a user-story-flow diagram for Oracle LiveLabs workshop authors.

Narrative:
"I want to understand what I am building, understand the WMS and GitHub process, build safely, validate correctly, publish cleanly, and know where to go for optional tooling or help."

Main flow:
Start Here -> WMS lifecycle, QA, and publishing flow -> GitHub foundations -> Lab 1 -> Lab 2 -> Lab 3 -> Lab 4 -> Lab 5 -> Review, QA, and publishing timelines -> Lab 6 -> Lab 7

Secondary paths:
Reuse and Enhancements
Tools and Productivity
Specialized Workflows
Help and FAQ

Visual style:
Journey map or story map, clear primary path, optional branches visually lighter than the main path, clean enterprise documentation aesthetic, no decorative filler.

Output:
Readable summary graphic for new authors.
Generate 2 to 3 variations.
```

## Prompt 4: One-Page Portrait Infographic

Use this for a printable or embeddable summary page.

```text
Create a one-page portrait infographic that summarizes the Oracle LiveLabs author guide.

Purpose:
A single-page quick-reference sheet that a new author can scan in under one minute.

Sections:
1. What is a workshop, lab, sprint
2. Main author path
3. Validation and publish path
4. Optional sections
5. Where to get help

Required details:
- Workshop = full guided learning experience
- Lab = one guided unit inside a workshop
- Sprint = shorter focused experience
- Main path = Lab 1 to Lab 4
- Validation path = Lab 5, timelines, Lab 6, Lab 7
- Optional = reuse, tools, specialized workflows
- Help = FAQ and support

Style:
One-page poster, portrait layout, strong typography, clear blocks, small icons, minimal prose, tables or cards where useful, enterprise documentation look, white background, restrained red and gray palette.

Output:
Portrait one-pager, easy to embed in docs or export as PDF.
Generate 2 variations.
```

## Prompt 5: Dense One-Pager Reference Sheet

Use this when you want a higher-information version.

```text
Create a denser but still highly readable one-page reference sheet for Oracle LiveLabs authors.

Tone:
Practical, fast to scan, high signal, not marketing.

Layout:
Top: definitions for workshop, lab, sprint
Middle: main end-to-end workflow
Lower middle: validation and publishing checkpoints with timelines
Bottom: optional sections and help paths

Do not:
- invent products or UI
- use fake screenshots
- overload with small text
- make it look like a slide deck

Do:
- use section headers
- use numbered stages
- use a small legend for required vs optional
- make the publish and QA sequence obvious

Output:
A4 or US-letter portrait infographic.
Generate 2 variations.
```

## Prompt 6: Section Summary Image Template

Use this template for section-level visuals later.

```text
Create a summary graphic for the section "[SECTION NAME]" in the Oracle LiveLabs author guide.

Goal:
Show what this section covers, when to use it, and what the reader gets from it.

Include:
- 3 to 5 key topics in the section
- when this section is used in the larger guide
- whether it is required or optional

Style:
Simple section card infographic, clean documentation aesthetic, minimal text, no fake screenshots, strong heading hierarchy.

Output:
Compact banner or card image for a docs section page.
Generate 2 to 3 variations.
```

## Suggested Section-Level Inputs

Use these section names first:

* `Section 1: Start Here`
* `Section 2: Core Workflow`
* `Section 3: Validation and Publish`
* `Section 4: Reuse and Enhancements`
* `Section 5: Tools and Productivity`
* `Section 6: Specialized Workflows`
* `Section 7: Help and FAQ`

## Recommended Generation Order

1. Generate the hero flow image with 3 variations.
2. Generate the roadmap variation with 3 variations.
3. Generate the portrait one-pager with 2 variations.
4. Pick the strongest hero and strongest one-pager.
5. Add them to the intro section and review readability in the page.
6. After that, generate one summary image per section.

## Review Checklist

Use this checklist when selecting the final image:

* Does the image show the full author path clearly?
* Is required versus optional content visually obvious?
* Is the QA and publish stage easy to understand?
* Does GitHub feel like context plus workflow, not a disconnected topic?
* Is the image readable without zooming?
* Does it fit the documentation tone instead of looking like marketing?
* Would a new author understand the bigger picture in under one minute?
