# QA Checks and Steps

## Introduction

This lab covers the author-side QA work that happens after the workshop is functionally ready. The goal is to make the workshop reviewable, complete the Self QA checklist correctly, and understand the ongoing quarterly maintenance cycle.

Estimated Time: 15 minutes

### Objectives

* Share a working preview for review
* Complete Self QA in WMS
* Understand how Quarterly QA works after publish

### What Do You Need?

* A working preview URL from your fork
* Access to WMS

## Task 1: Share A Reviewable Workshop

1. Enable GitHub Pages for your fork if you have not already done so.
2. Open the full preview URL for the correct `workshops/.../index.html` file and verify the workshop renders correctly.
3. A typical preview shape looks like this:

    ```text
    https://<github-username>.github.io/<repo-name>/<path>/workshops/<variant>/index.html
    ```

4. Review the rendered workshop before you share it. Check the landing page, tutorial order, links, images, copy buttons, and any conditional content.
5. Share that preview URL with SMEs, stakeholders, or reviewers before you declare the workshop ready for Self QA.
6. Resolve obvious feedback before you move into formal QA.

## Task 2: Complete Self QA In WMS

1. Review the WMS record and confirm the workshop title, short description, long description, outline, prerequisites, tags, and ownership are current.
2. Confirm the **Development GitHub/GitLab URL** points to your preview location. Add the **Production GitHub/GitLab URL** after the production pull request is merged.
3. Move the workshop to `Self QA` when the content is ready for formal review.
4. Open the **Self QA Checklist** and test the workshop end to end. Check every required item, attach the requested evidence or screenshots, add the preview link in the workshop URL field, and add the pull request link if one already exists.
5. Save the checklist before you change the status to `Self QA Complete`.
6. Certify the submission and set the workshop status to `Self QA Complete`.
7. Use the checklist history and updated last-QA fields as confirmation that the cycle was saved correctly.
8. If stakeholder verification is blocked for more than 2 business days, follow up through **Message the Team** in WMS.

## Task 3: Perform Quarterly QA

1. Published workshops return to `Quarterly QA` every 90 days so production content stays current.
2. Once WMS moves a workshop into `Quarterly QA`, the workshop team has a short follow-up window to complete the review before the production entry is at risk of being disabled.
3. Reuse the same Self QA Checklist for Quarterly QA: re-test the workshop, refresh screenshots or instructions if needed, and add a pull request link if you had to make changes.
4. Save the checklist changes, certify the review, and then move the workshop to `Quarterly QA Complete`.
5. If Quarterly QA is missed, the workshop can be disabled in production until the maintenance cycle is completed. This is a disable, not a delete.

## Acknowledgements

* **Last Updated By/Date:** Workshop Author Docs Refresh, March 2026
