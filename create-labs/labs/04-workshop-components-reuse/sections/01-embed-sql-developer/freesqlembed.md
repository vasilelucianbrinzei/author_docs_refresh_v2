# Embed SQL Developer Using freesql.com

## Introduction

Use this lab when you want learners to run SQL inline inside a workshop task instead of leaving the page for a separate button-driven flow. This is the SQL-related component that remains relevant in the author guide after removing the broader FreeSQL and Live SQL publishing workflows from the active navigation.

Estimated Time: 10 minutes

### Objectives

* Understand when embedded SQL is the right pattern
* Add an embedded FreeSQL editor to a lab task
* Validate that the embedded editor behaves correctly at runtime

### What Do You Need?

* SQL or PL/SQL content prepared in FreeSQL
* A workshop lab where the embedded editor improves the learner flow

## Task 1: Generate The Embed Snippet

1. Create or prepare the SQL or PL/SQL snippet you want learners to run in FreeSQL.
2. Use the FreeSQL embed or share flow to generate the editor snippet for that content.
3. Copy the generated embed code.
4. Keep each embed focused on a single task or concept so the workshop remains readable.

## Task 2: Add The Embed To Your Lab

1. Open the target lab Markdown file.
2. Paste the embed snippet into the task where learners should run the SQL.
3. Keep the embed close to the related instructions so the task reads as one guided flow.
4. Do not modify the standard iframe attributes unless the embed pattern itself has changed and has been validated for the current LiveLabs renderer.

## Task 3: Validate Runtime Behavior

1. Render the lab and navigate to the task that contains the embedded editor.
2. Confirm the editor appears correctly inside the page layout.
3. Confirm the embedded editor uses the available content width and loads correctly when the learner reaches that section.
4. Run a quick functional check so you know the embedded SQL interaction still matches the instructions around it.

## FAQ

### Do I need to customize the iframe attributes for each snippet?

No. Treat the generated embed as the default pattern unless you have a validated reason to change it.

### Why can the rendered height look different from the source snippet?

The LiveLabs UI can apply responsive styling so the final height may not match the raw embed code exactly.

## Acknowledgements

* **Last Updated By/Date:** Workshop Author Docs Refresh, March 2026
