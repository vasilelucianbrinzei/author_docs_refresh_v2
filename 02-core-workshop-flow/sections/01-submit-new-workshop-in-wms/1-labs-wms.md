# Submit a Workshop Request in WMS

## Introduction

Oracle Workshop Management System (WMS) is the system of record for a LiveLabs workshop from request through publish and maintenance. This lab focuses on the author actions that matter most: create a strong request, assign the right owners, understand the lifecycle, and keep the workshop record accurate while development moves forward.

Estimated Time: 20 minutes

### Objectives

* Submit a complete LiveLabs workshop request in WMS
* Capture the right ownership, metadata, and tags
* Understand the status lifecycle that follows approval
* Know how to use WMS during development, QA, and publish

### What Do You Need?

* Access to the Oracle Workshop Management System (WMS)

## Task 1: Submit A Workshop Request

1. Connect to VPN and open WMS.
2. Click **Submit a New Workshop Request**.
3. Complete the workshop basics carefully. At minimum, make sure these fields are strong enough for council review:
    - **Workshop Title:** close to the intended public workshop title.
    - **Workshop Abstract:** what the learner will accomplish, who the workshop is for, and why it matters.
    - **Workshop Outline:** the expected lab flow or major milestones.
    - **Workshop Prerequisites:** required accounts, access, software, or setup.
4. Select the correct **Stakeholder**, **Workshop Council**, and **Workshop Owner Group** so the request routes to the right reviewers and owners.
5. Open the **Tags** tab and add the required tags for **Level**, **Role**, **Focus Area**, and **Product**. Other tag groups are optional, but those core tags should not be skipped.
6. Save the request and wait for council approval before you invest heavily in content development.

> **Note:** If you do not receive council feedback within 3 business days, follow up through **Message the Team**. You can also find council members in **People & Role Reports**.

## Task 2: Understand The WMS Lifecycle

1. After you save the request, the workshop enters `Submitted` and waits for council review.
2. If the council needs clarification, the workshop moves to `More Info Needed`. Reply through **Message the Team** so the discussion stays attached to the workshop record.
3. Once approved, move into `In Development` and begin the GitHub and Markdown work covered in the next labs.
4. When the workshop is ready for formal validation, move it to `Self QA`, complete the checklist, and then move it to `Self QA Complete`.
5. Stakeholders review the finished workshop from `Self QA Complete`. If accepted, they move it to `Completed`.
6. After the pull request and publishing actions are complete, the workshop is pushed to production.
7. Published workshops later return to `Quarterly QA` and `Quarterly QA Complete` so the workshop stays current. If that cycle is missed, the workshop can be disabled until maintenance is completed.

## Task 3: Use WMS Throughout Development

1. Keep the workshop title, descriptions, outline, prerequisites, tags, and ownership current as the content evolves.
2. Update the workshop status when the real development stage changes. Do not leave the record stale.
3. Maintain the **Development GitHub/GitLab URL** while authoring, and add the **Production GitHub/GitLab URL** after the production pull request is merged.
4. Use **Message the Team** whenever you need clarification from the council, stakeholders, or LiveLabs team.
5. Complete later-stage metadata, such as publishing details, when the workshop is actually ready for QA or publish. Do not try to treat the initial request like the final production record.
6. Treat WMS as the authoritative workflow record, not as a one-time intake form.

## Task 4: Know What Comes Next

1. After approval, go to **Lab 2: Set up GitHub and install tools** to prepare your authoring environment.
2. Continue with **Lab 3: Stay in sync with GitHub environment** and **Lab 5a: Develop Markdown and content** to build the workshop itself.
3. Return to WMS during QA and publishing to complete the required status and publishing actions.

## Acknowledgements

* **Last Updated By/Date:** Workshop Author Docs Refresh, March 2026
