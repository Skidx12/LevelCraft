# Phase 1 — Content Platform Foundation Rollout

## Status

**Complete — first production slice**

Phase 1 introduces the versioned content foundation without forcing a risky migration of every legacy mission at once.

## Delivered

- Schema version 1 in `app/content/mission-schema.ts`.
- Build-time Zod validation in `scripts/validate-content.mjs`.
- Content validation runs before every production build.
- Unique stable mission IDs and unique legacy route mappings are enforced.
- Review statuses and reviewer metadata are part of the content contract.
- Authoring workflow in `app/content/v1/AUTHORING-TEMPLATE.md`.
- Schema-v1 catalog in `app/content/v1/catalog.ts`.
- Reusable schema-driven Briefing, Training, Hunter Notes, Quest, Trial and Debrief renderers.
- Legacy renderer fallback for all missions not yet migrated.
- Existing numeric completion progress remains compatible through `legacy.numericId`.
- Content Review Mode visibly identifies schema version, stable mission ID and review status.

## Golden schema missions

| Stable ID | Existing route mapping | Purpose |
| --- | --- | --- |
| J0.1 | Java mission numeric ID 0 | Proves the Java source → bytecode → JVM learning flow |
| S0.1 | Spring Boot mission numeric ID 0 | Proves manual wiring before Spring-container abstraction |

Both records include:

- observable outcomes;
- prerequisites and terminology;
- misconceptions;
- complete multi-file demonstrations;
- run instructions and expected output;
- Goal/Why/Where/Action/Observe/Failure/Checkpoint training steps;
- controlled break-and-repair drills;
- Recall/Trace/Compare/Predict questions;
- use cases, non-use cases and trade-offs;
- diagnostic mistakes;
- interview recall;
- primary references;
- quest requirements, constraints and non-goals;
- starter files;
- explicit evidence and validation modes;
- rank trials and debriefs;
- content version and review metadata.

## Compatibility strategy

The route remains `/mission/:track/:number`, and completion storage remains numeric during migration. Schema content declares its legacy route explicitly:

```ts
legacy: {
  track: "Java",
  numericId: 0
}
```

This means the learner keeps existing progress while the visible content adopts stable curriculum IDs such as `J0.1` and `S0.1`.

## Validation behaviour

The production build fails when schema-v1 content has:

- an unsupported schema version;
- an invalid stable ID or arc;
- an ID/track mismatch;
- duplicate stable IDs;
- duplicate legacy routes;
- missing required sections;
- empty outcomes, steps, references or acceptance criteria;
- an invalid trial answer;
- unsupported status, rank or validation mode;
- invalid dates or reference URLs.

## Deferred intentionally

- Bulk migration of the remaining 18 legacy missions belongs to later curriculum phases.
- Automated code execution remains deferred.
- Quest validation honestly reports `guided-evidence` rather than claiming compilation.
- Section-specific URLs may be added later if analytics or sharing proves that need; each mission already has a dedicated page and does not return the platform to a single-page mission modal.
- Reviewer names remain empty while golden missions are in `technical_review`.

## Phase 1 exit criteria

| Criterion | Result |
| --- | --- |
| Sample missions render entirely from a versioned schema | Pass |
| Invalid structured content fails the build | Pass |
| Curriculum prose is stored outside rendering components | Pass |
| Existing mission routes remain usable | Pass |
| Existing numeric progress remains compatible | Pass |
| Legacy content remains available during migration | Pass |
| Content review state is visible | Pass |

## Next phase

Phase 2 — Golden-Path Pilot Missions:

1. Java classes, constructors and encapsulation.
2. Java interfaces and repository abstraction.
3. Java collections and in-memory storage.
4. Spring IoC and all three injection styles.
5. Spring REST DTO and validation.

Those missions will use the Phase 1 schema and review scorecard rather than adding prose to UI components.

