# LiveLabs FAQ

## Introduction

This FAQ collects the questions authors and internal stakeholders ask most often while creating, updating, and maintaining LiveLabs workshops. It is intentionally focused on repeatable author workflow questions, not live support triage.

Estimated Time: 10 minutes

### Objectives

* Find quick answers to common authoring and publishing questions
* Understand common workflow expectations without reopening every lab
* Know when to use FAQ versus workflow guidance or support channels

## Task 1: Review Common WMS And Repository Questions

1. **Do I need VPN to use WMS?**

    Yes. WMS is an internal system and requires the normal Oracle access path.

2. **Who can submit a workshop?**

    Oracle employees can submit workshops. If a partner wants to contribute, an Oracle sponsor or owner still needs to route the work correctly through the LiveLabs process.

3. **How do I know which GitHub repository to use?**

    Use the product or council-aligned repository in `oracle-livelabs`. If you are unsure, confirm it before you start authoring.

4. **Should I wait for approval before building the workshop?**

    Yes. You can sketch or prepare material earlier, but the guide recommends waiting for council approval before investing heavily in development.

5. **Where do I find the Self QA checklist?**

    Move the workshop to `Self QA` in WMS. The checklist becomes part of the workflow at that stage.

## Task 2: Review Common QA, Publish, And Maintenance Questions

1. **Which link should I share while the workshop is still in development?**

    Share your GitHub Pages preview URL for internal review and QA.

2. **Which link should I share after the workshop is published?**

    Share the production LiveLabs link, not the GitHub Pages preview URL.

3. **How long does it take for merged changes to show up?**

    GitHub Pages and production updates are not always immediate. Use the SLA page and allow normal sync time before escalating.

4. **What should I do for a major update to a workshop already in production?**

    Move the workshop back into the normal author workflow, create the new version cleanly, and repeat QA and publish steps rather than patching production in an ad hoc way.

5. **What should I do for a minor update?**

    Make the change in GitHub, open a pull request, and keep WMS metadata or URLs aligned if the change affects production details.

6. **What happens if Quarterly QA is missed?**

    The workshop can be disabled in production until the required maintenance cycle is completed.

## Task 3: Know When FAQ Is Not Enough

1. If you need step-by-step execution guidance, return to the relevant workflow lab instead of treating the FAQ like the main instructions.

2. If you are blocked and need a channel or escalation path, use **Need Help?**

3. If the real question is about response times, handoff timing, or when to follow up, use **LiveLabs SLAs**.

4. If the question is about event-style, sandbox, secure desktop, or other non-standard author paths, use the **Specialized Workflows and Reference** section.

## Acknowledgements

* **Last Updated By/Date:** Workshop Author Docs Refresh, March 2026
