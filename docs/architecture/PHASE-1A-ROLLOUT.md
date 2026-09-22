# Phase 1A rollout: modular-monolith foundation

## Status

Complete as the first architecture slice on 2026-09-22.

This phase intentionally changes boundaries without changing the learner journey, progress format or existing mission URLs.

## Delivered

- Recorded the modular-monolith decision and dependency guardrails in ADR-001.
- Added public Curriculum, Missions, Content and Progress boundaries under `modules/`.
- Moved authoritative XP, side-quest and capstone validation into the Progress domain policy.
- Replaced duplicated API scoring tables with values derived from the authoritative content catalog.
- Removed the standalone mission route's direct import of `LevelCraftClient.tsx`.
- Kept legacy missions available through a lazy compatibility bridge.
- Moved schema-mission selection to the server so only the requested structured mission is serialized to the browser.
- Centralized mission-route progress requests in the Progress client API.

## Measured build result

The production build separated the dashboard into its own client chunk. During this rollout:

- `LevelCraftClient` remained an independently loaded client chunk of about 176 KB uncompressed.
- the standalone `MissionRouteClient` chunk decreased from about 55 KB to about 22 KB uncompressed after server-selected structured mission loading;
- schema-v1 missions no longer require an eager import of the dashboard, guild, side-quest and reward-vault implementation;
- legacy missions remain functional while their content is migrated.

Chunk names are content-hashed and will change between builds. Sizes are a diagnostic baseline, not a permanent budget.

## Verification

- `pnpm validate:content`
- `pnpm exec tsc --noEmit`
- `pnpm lint`
- `pnpm build`

All checks passed. The previous unused-variable warning in the guild map was also removed.

## Remaining Phase 1B work

- move all legacy missions into validated structured records;
- load every mission by stable content ID rather than display position;
- introduce section-level route and progress contracts;
- publish content version and progress-migration rules;
- remove the lazy legacy bridge once no mission depends on it.
