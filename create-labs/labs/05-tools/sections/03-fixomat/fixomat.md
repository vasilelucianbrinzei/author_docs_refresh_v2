# Use Fixomat for Workshop Cleanup

## Introduction

Use Fixomat late in the author workflow, after the workshop content mostly exists and before QA or publish. It can fix a range of common Markdown issues and optimize images, but you still need to review the output and verify the workshop afterward.

Estimated Time: 10 minutes

### Objectives

* Install and launch Fixomat
* Run it on the correct workshop folder
* Choose the right mode for Markdown, images, or both
* Interpret `FIXED` and `MANUAL` results and follow up correctly

### What Do You Need?

* Fixomat installed on Windows or macOS
* Your workshop root folder
* A workshop preview so you can verify changes after the run

## Task 1: Install Fixomat

Skip this task if Fixomat is already installed.

### Windows

**One-line installation** — Open Terminal and run:

```
<copy>
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/oracle-livelabs/common/main/sample-livelabs-templates/create-labs/labs/fixomat/install-macos.sh)"
</copy>
```

### Windows (x64)

**One-line installation**

1. Open PowerShell and run:

    ```
    <copy>
    Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/oracle-livelabs/common/main/sample-livelabs-templates/create-labs/labs/fixomat/install-windows.ps1'))
    </copy>
    ```

## Task 2: Launch Fixomat

1. Launch **LiveLabs Fixomat 2000** from your operating system.

    **Windows:**
    Search for `LiveLabs Fixomat 2000` in the Start Menu, or run the executable from `%LOCALAPPDATA%\Programs\LiveLabs Fixomat 2000`.

    **macOS:**
    Open **Applications** and launch `LiveLabs Fixomat 2000.app`.

2. Confirm the main Fixomat window opens with mode selection, folder picker, and output console.

## Task 3: Run Fixomat on a Workshop

1. Click **Select folder** and choose your workshop root directory.

2. Choose one mode:

    * `Fix Markdown only` for Markdown cleanup
    * `Optimize images only` for image resizing/compression
    * `Fix Markdown + Optimize images` to run both

3. Click **Run**.

4. Wait for completion and review the summary.

    > Note: Markdown output may include `MANUAL` findings that still require human review.

5. Optionally click **Save Log** to export the full run output to `fixomat.log`.

## Task 4: Interpret Output and Follow Up

1. Review Markdown results:

    * `FIXED` lines indicate changes applied automatically
    * `MANUAL` lines indicate issues that require editing

2. Review image results in summary fields:

    | Field | Description |
    | --- | --- |
    | Resized | Number of images resized to max dimension |
    | Optimized | Number of PNG images optimized without resizing |
    | Skipped | Number of images that needed no changes |
    | Failed | Number of image files that could not be processed |
    | Before | Total image size before processing |
    | After | Total image size after processing |
    | Saved | Total space saved |

3. Re-run Fixomat after manual edits if required.

## FAQ

### macOS: The app is blocked by security settings

If macOS warns that the app cannot be verified, open **System Settings > Privacy & Security** and allow the app to run.

### Windows: SmartScreen warning appears

If Microsoft Defender SmartScreen appears, click **More info**, then **Run anyway**.

## Acknowledgements

* **Last Updated By/Date:** LiveLabs Team, March 2026
