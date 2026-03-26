# Publish Your Workshop

## Introduction

This lab covers the final production handoff: open a pull request from your fork, make sure reviewers can approve it cleanly, and submit the WMS publishing request that moves the workshop live.

Estimated Time: 15 minutes

### Objectives

* Create a clean pull request to the production repository
* Include the WMS ID where reviewers need it
* Complete the WMS publishing request with the correct URLs
* Understand what happens after review feedback or approval

### What Do You Need?

* A synced fork and local branch
* Self QA already completed
* Final workshop URLs ready for production

## Task 1: Open A Pull Request To Production

1. Sync your branch with `upstream/main` before you open the pull request. Also confirm your GitHub fork on the web is not behind.
2. In GitHub Desktop, choose **Branch > Create Pull Request**.
3. Write a clear pull request title that names the work first and includes the WMS ID where reviewers expect it. For example, `Publish OCI Data Lake workshop (WMS 12345)`.
4. Complete the repository checklist and use it as a final gate for review readiness.
5. Verify the pull request has no merge conflicts and that the branch is up to date. If either check fails, fix that before you ask reviewers to spend time on the PR.
6. If reviewers ask for changes, commit them to the same branch and update the same pull request until it is approved.
7. After the PR is approved and merged, the production repository becomes the source of truth for the published workshop.

## Task 2: Submit The Publishing Request In WMS

1. Open the workshop in WMS and go to the **Publishing** tab.
2. Create or update the LiveLabs publishing entry with the required publishing details, especially **Publish Type**, **Workshop Time**, and the final production workshop URL.
3. Add Brown Button details only when the workshop supports that delivery model. The URL should point to the production workshop variant, for example:

    ```text
    https://oracle-livelabs.github.io/<repo-name>/<path>/workshops/tenancy/
    ```

4. Add Sprint details only when the workshop also has a sprint version. Sprint URLs should follow the sprint publishing pattern, for example:

    ```text
    https://oracle-livelabs.github.io/sprints/<sprint-category>/<sprint-name>/
    ```

5. Add a video link only if the workshop has approved landing-page video content.
6. Save the publishing entry and confirm the WMS metadata matches the production content and URLs.

## Task 3: Know What Happens Next

1. Once the pull request is merged, the publishing request is approved, and the workshop is in `Completed`, the workshop is normally pushed to production within 1 business day.
2. If the publish reviewers request changes, update the workshop, keep the same PR or publishing thread where possible, and respond through the existing workflow instead of creating duplicate requests.
3. If your workshop needs specialized environment work such as sandbox enablement, custom images, or secure desktop handling, use the **Specialized Workflows and Reference** section alongside this publish lab.
4. After publish, verify the production workshop and keep WMS ready for future Quarterly QA updates.

## Acknowledgements

* **Last Updated By/Date:** Workshop Author Docs Refresh, March 2026
