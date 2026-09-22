# Phase 1B: stable content identity and progress migration

## Status

Implemented as the second Phase 1B slice on 2026-09-22.

## Stable identity contract

Every Java and Spring Boot mission now has an immutable stable ID in `app/content/v1/mission-index.json`.

- Display order and legacy numeric route IDs may change.
- Stable IDs do not change after publication.
- Structured mission IDs must exactly match their index entry.
- Capstone trials use the `.T` suffix.
- Content versions may change while the stable mission ID remains the same.

The current application keeps numeric route IDs for compatibility. New progress data is dual-written with stable IDs so routes can migrate later without resetting learners.

## Content-version behaviour

- A mission revision increments `review.contentVersion` and the matching mission-index version.
- Completion remains attached to the stable mission ID.
- Section position is stored with the content version used when it was recorded.
- When a learner returns after the mission content version changes, LevelCraft starts that mission at Briefing rather than silently skipping revised material.
- Historic numeric completion remains readable and is projected to stable IDs until it is next saved.

## Section-progress contract

Schema-driven missions record:

- the last opened section;
- the set of visited sections;
- the mission content version;
- the update timestamp.

Supported sections are Briefing, Training, Hunter Notes, Quest, Rank Trial and Debrief. A visited section is navigation state, not proof of mastery. Mission completion and evidence remain separate.

## Database migration

`journey_progress` now contains:

- `completed_mission_ids_json` for stable completion identity;
- `section_progress_json` for version-aware mission position.

The existing `completed_json` numeric data remains authoritative during the compatibility period. Both representations are written together until all routes and clients use stable IDs.

## Removal gate

Numeric completion can be retired only after:

1. every published mission has a stable index entry;
2. all clients read and write stable IDs;
3. existing rows have been backfilled and verified;
4. direct mission URLs use stable IDs or a permanent redirect map;
5. migration telemetry shows no unknown legacy IDs.
