# Author Workflow Platform Roadmap

## Goal
Build a local-first and web-ready authoring platform that covers the full Oracle LiveLabs workshop lifecycle end to end:

1. Request intake and WMS-style workflow.
2. AI-assisted first draft generation from the approved request.
3. Visual workshop editing through a drag-and-drop CRUD builder.
4. GitHub project creation and repo handoff when the workshop is ready.
5. Integrated QA automation, regression generation, QA reporting, and publish readiness.
6. Runtime bug submission from inside workshop pages with context automatically prefilled from user progress.

## Product Direction
The next product should not be another static guide. It should be an operational studio with two connected surfaces:

1. A workflow app that manages request, drafting, review, QA, and publish status.
2. A workshop builder that lets the author edit the generated workshop visually and safely.

The local version should be the first delivery target. The web version should reuse the same data contracts, services, and UI patterns so the local build becomes the deployment baseline rather than a throwaway prototype.

## Working Principles
1. Keep the system local-first until the flow is proven.
2. Treat WMS, draft generation, QA, GitHub, and publish as separate modules with explicit contracts.
3. Store workshop structure as data, not only raw markdown, so the visual builder can do reliable CRUD operations.
4. Preserve a deterministic export path to real workshop files at every stage.
5. Make QA a first-class subsystem, not an end-of-process checklist.
6. Instrument the workshop runtime from the beginning so bug reporting and learner progress capture are native, not retrofitted.

## Target Capability Map
1. Request Studio: demo WMS flow, request forms, review states, approval tracking, ownership.
2. Draft Engine: convert approved request data into a structured workshop draft.
3. Workshop Builder: drag-and-drop layout editing, block CRUD, content regeneration, snippet editing, media placement, quiz insertion, safe component library.
4. GitHub Orchestrator: create local project folder, initialize repo metadata, generate branch strategy, prepare push payload.
5. QA Control Center: run specialized quality skills, generate tailored test suites, execute validations, summarize findings.
6. Publish Desk: produce final QA report, publish checklist, and delivery bundle.
7. Runtime Telemetry and Bug Capture: collect current section, current step, progress path, reproduction trail, and author-visible error reports.

## Recommended System Shape
### Frontend
Use one app shell with routed modules:

1. `/requests`
2. `/drafts`
3. `/builder`
4. `/qa`
5. `/publish`
6. `/reports`

The builder should support both structured form editing and direct canvas manipulation. The canvas should operate on a normalized workshop document model instead of raw markdown strings.

### Backend
Use a service layer with these modules:

1. `workflow-service`
2. `draft-service`
3. `builder-service`
4. `github-service`
5. `qa-service`
6. `bug-report-service`
7. `export-service`

### Storage
Use a small local database first. SQLite is enough for the local app. Move to Postgres only when multi-user web deployment is real.

Core tables:

1. `request`
2. `request_review`
3. `workshop_project`
4. `workshop_document`
5. `workshop_block`
6. `generation_run`
7. `qa_profile`
8. `qa_run`
9. `qa_finding`
10. `publish_run`
11. `bug_report`
12. `user_progress_event`

### File Output
Always maintain a generated file tree that can be opened and previewed outside the app:

1. Markdown source
2. Manifest
3. Media folder
4. Generated snippets
5. QA artifacts
6. Publish report

## Canonical Data Model
### Request
Request data should include:

1. Request title
2. Workshop objective
3. Audience
4. Product scope
5. Required labs
6. Required tools
7. Required assets
8. Complexity level
9. Review status
10. Request notes

### Workshop Document
The workshop document should not start as markdown. It should start as structured JSON with export rules.

Required entities:

1. Workshop
2. Section
3. Lab
4. Step
5. Block
6. Resource link
7. Media item
8. Code snippet
9. Quiz item
10. SQL action
11. Checklist item

Each block should have:

1. Stable ID
2. Type
3. Parent ID
4. Order
5. Content payload
6. Validation rules
7. Export template
8. Provenance metadata

## Delivery Phases
### Phase 0: Scope Freeze and Schema Definition
Objective: stop building ad hoc UI behavior and define the platform contracts first.

Deliverables:

1. Product scope document for the local-first author workflow platform.
2. Normalized data model for request, draft, workshop document, QA run, publish run, and bug report.
3. Block/component schema for the visual builder.
4. Export contract from structured document to workshop files.

Exit criteria:

1. The request schema is stable enough to drive first-draft generation.
2. The workshop document schema is stable enough for CRUD in the builder.
3. The QA run schema is stable enough to store skill outputs and findings.

### Phase 1: WMS Flow Demo Module
Objective: recreate the WMS flow locally for demonstration and orchestration purposes.

Scope:

1. Request intake form.
2. Review queue.
3. Status transitions.
4. Owner assignment.
5. Request detail screen.
6. Approval history.

Statuses to support first:

1. Submitted
2. More Info Needed
3. Approved
4. In Development
5. Self QA
6. Self QA Complete
7. Completed
8. Publish Ready
9. Published

Deliverables:

1. Local WMS demo UI.
2. Seed request dataset.
3. Request status engine with allowed transitions.
4. Audit trail for every transition.

Exit criteria:

1. A request can move from submission to approval cleanly.
2. Approval creates a linked workshop project record.
3. The approved request becomes the input for first-draft generation.

### Phase 2: AI First-Draft Generator
Objective: generate the first workshop draft directly from the approved request record.

Core rule:
The generator should produce structured workshop data first, then export markdown. It should not generate only a flat markdown blob.

Inputs:

1. Approved request record.
2. Chosen workshop template.
3. Product metadata.
4. Lab count and sequence preferences.
5. Asset requirements.

Outputs:

1. Workshop outline.
2. Draft sections and labs.
3. Suggested snippets.
4. Suggested media placeholders.
5. Suggested quizzes and checks.
6. Exportable workshop folder draft.

Deliverables:

1. Prompt contract for workshop generation.
2. Validation rules for generator output.
3. Regeneration controls by section, lab, or block.
4. Diff view between versions.

Exit criteria:

1. The generator creates a usable first draft from one approved request.
2. The draft can be edited block by block in the visual builder.
3. The export path to workshop files remains deterministic.

### Phase 3: Visual Builder and CRUD Canvas
Objective: let authors modify the generated workshop through a block-based GUI instead of raw file editing first.

Required builder features:

1. Drag and drop ordering for sections, labs, and blocks.
2. CRUD for text, media, snippet, quiz, checklist, note, link, and SQL blocks.
3. Block duplication.
4. Safe delete with undo.
5. Side-by-side preview.
6. Structured property editor.
7. Section and lab templates.
8. Re-generate only selected blocks.

Builder safety rules:

1. Export rules must validate before file generation.
2. Invalid component combinations must be blocked or flagged.
3. IDs must remain stable after reorder operations.
4. All mutations must be audit-logged.

Exit criteria:

1. A user can assemble a workshop without touching markdown directly.
2. The system can export a valid workshop folder after multiple drag-and-drop edits.
3. Partial regeneration does not destroy manual edits outside the targeted block.

### Phase 4: Local GitHub Project Creation and Repo Orchestration
Objective: when the workshop is marked ready, create the local GitHub project structure and prepare it for push.

Scope:

1. Create local project folder under the main workshop project.
2. Initialize workshop file tree from the structured document.
3. Generate repo metadata, manifest, and baseline QA config.
4. Prepare Git operations and push instructions.

Important constraint:
Do not push automatically in the first version. Generate, validate, preview, and require explicit publish confirmation.

Deliverables:

1. Local repo/project generator.
2. Branch and path naming rules.
3. Commit message conventions.
4. Push readiness checklist.

Exit criteria:

1. A workshop marked ready creates a clean local project folder.
2. The folder opens and previews correctly.
3. The folder is ready for GitHub push after QA approval.

### Phase 5: Specialized QA Skill
Objective: define the QA skill before building the integrated QA center.

This skill should specialize in LiveLabs workshop quality, not generic code linting.

Skill responsibilities:

1. Validate manifest and file structure.
2. Validate workshop navigation logic.
3. Validate snippet copy behavior and code block presence.
4. Validate media placement and media component behavior.
5. Validate quiz and FreeSQL safety rules.
6. Validate authoring prose quality and task clarity.
7. Detect regressions against workshop template rules.
8. Produce structured findings, severity, and recommended fixes.

Skill output contract:

1. Summary
2. Findings
3. Severity
4. File and component references
5. Suggested fixes
6. Regression scope
7. Pass or fail decision

Exit criteria:

1. The skill can run on a generated workshop draft.
2. The output is machine-readable and UI-readable.
3. The findings can feed the QA module without manual rewriting.

### Phase 6: Integrated QA Module and Tailored Regression Framework
Objective: turn QA into an orchestrated subsystem.

The QA module should combine:

1. Specialized QA skill results.
2. Static checks.
3. Export validation.
4. UI interaction checks.
5. Generated regression suites tailored to the workshop structure.

Tailored regression suite requirements:

1. Generate tests from actual workshop structure.
2. Validate section navigation.
3. Validate code snippet copy.
4. Validate embedded video components.
5. Validate quizzes and SQL widgets safely.
6. Validate demo-specific interactive elements.

Deliverables:

1. QA dashboard.
2. QA profiles by workshop type.
3. Regression suite generator.
4. Run history and comparison.
5. Final QA report generator.

Exit criteria:

1. A workshop can be validated end to end inside the app.
2. Regressions are tied back to exact labs or blocks.
3. The final QA report is ready before publish review.

### Phase 7: Publish Desk and Final Report
Objective: formalize the final handoff from QA complete to publish ready.

Deliverables:

1. Publish checklist screen.
2. Final QA summary.
3. Asset completeness summary.
4. Git readiness summary.
5. Export bundle.

Exit criteria:

1. Publish decision is based on structured evidence.
2. The publish bundle is reproducible.
3. The system keeps a publish history by workshop.

### Phase 8: Runtime Bug Submission from Workshops
Objective: embed a bug submission path inside workshop experiences with contextual prefilling.

Required runtime instrumentation:

1. `data-workshop-id`
2. `data-section-id`
3. `data-lab-id`
4. `data-step-id`
5. `data-block-id`
6. `data-component-type`
7. `data-route-context`

Progress events to capture:

1. Section opened
2. Lab opened
3. Step entered
4. Step completed
5. Code copied
6. Quiz answered
7. SQL action attempted
8. Media played
9. Error encountered

Bug report modal fields:

1. Workshop name
2. Current section
3. Current lab
4. Current step
5. Auto-generated path to current point
6. Auto-generated steps to reproduce so far
7. Expected result
8. Actual result
9. Severity
10. Browser and viewport
11. Screenshot attachment
12. Optional console log snippet

Important rule:
The system should prefill everything it can, then ask the user only for what the system cannot infer.

Exit criteria:

1. Bug reports can be launched from any tracked workshop surface.
2. The form is prefilled from progress and current context.
3. The bug lands in the workflow app with reproducible context attached.

## Technical Recommendations
### Suggested Monorepo Shape
1. `apps/author-studio`
2. `apps/workshop-runtime`
3. `services/workflow-service`
4. `services/draft-service`
5. `services/github-service`
6. `services/qa-service`
7. `packages/workshop-schema`
8. `packages/export-engine`
9. `packages/runtime-tracker`
10. `packages/ui-components`
11. `packages/skill-contracts`

### Suggested Immediate Technology Choices
1. Frontend: React with a block-editor architecture.
2. Local backend: Node or Python service with SQLite first.
3. Git integration: native Git CLI orchestration with guarded commands.
4. Export engine: structured JSON to markdown/file tree compiler.
5. Test harness: Playwright for UI regression, plus content/schema validators.

## Risks to Control Early
1. Generating markdown directly instead of structured workshop data.
2. Letting regeneration overwrite manual author edits.
3. Treating QA as an afterthought instead of a core workflow.
4. Hiding workflow state transitions in UI only instead of explicit backend rules.
5. Under-instrumenting the runtime and losing bug context later.
6. Building GitHub push too early before local generation and QA are stable.

## Immediate Next Sprint Recommendation
Sprint 1 should not try to build everything. It should lock the foundation.

Sprint 1 deliverables:

1. Finalize the request schema.
2. Finalize the workshop document schema.
3. Build the local WMS demo with status transitions.
4. Define the first-draft generator contract.
5. Define the QA skill input and output contract.

Sprint 2 deliverables:

1. Generate the first structured workshop draft from an approved request.
2. Build the first visual builder screen with block CRUD.
3. Export a local workshop folder from the builder.
4. Run the first QA skill pass against exported output.

Sprint 3 deliverables:

1. Add GitHub project generation.
2. Add QA run history and final report.
3. Add runtime instrumentation and bug report modal in workshop pages.

## Recommended Execution Order
1. WMS demo schema and request flow.
2. Structured workshop document model.
3. First-draft generator.
4. Visual builder CRUD.
5. QA skill.
6. QA module and tailored regression generation.
7. GitHub project creation.
8. Publish desk.
9. Runtime bug submission and telemetry.

## Definition of Success
The platform is successful when one approved request can move through this path without manual file juggling:

1. Request approved.
2. Structured workshop draft generated.
3. Workshop edited visually.
4. Local workshop project created.
5. QA skill and regression checks run.
6. Final QA report produced.
7. Publish-ready bundle created.
8. Runtime bug reports can later flow back into the same system with full context.
