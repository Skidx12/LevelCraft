# ADR-001: Adopt a modular monolith before expanding LevelCraft

- Status: Accepted
- Date: 2026-09-22
- Owners: LevelCraft product and platform engineering

## Context

LevelCraft currently ships as one React/Next/Vinext application. That deployment shape is appropriate for the current team and traffic, but business responsibilities have accumulated inside a large client component and a mixed progress endpoint. Continuing directly into larger curriculum, reward, validation and authoring phases would make those responsibilities harder to separate and would increase route payloads.

LevelCraft must also remain portable: GitHub is the long-term source of truth, ChatGPT Sites is one deployment target, and future Docker or independent hosting must not require rewriting the learning system.

## Decision

LevelCraft will use a modular monolith as its primary architecture.

The application remains one deployable unit, while Content, Curriculum, Missions, Progress, Evaluation, Rewards, Social, Capstones, Identity, Administration and Analytics own explicit responsibilities. Each module exposes a small public interface and keeps domain rules separate from route handlers, React components, database adapters and hosting-specific authentication.

The transition is incremental:

1. Stop standalone mission routes from eagerly importing the complete dashboard bundle.
2. Move authoritative progress rules out of HTTP handlers.
3. Complete schema-driven mission loading and retire the legacy mission bridge.
4. Split capability APIs and persistence adapters.
5. Add independent services only when a capability needs a distinct security or scaling boundary.

## Consequences

### Positive

- Content and product phases can continue without deepening the current coupling.
- One deployment remains inexpensive to operate and easy to run locally.
- Modules can be tested and owned independently.
- Provider-specific auth and persistence can be replaced at the edge.
- Future isolated code execution can become a separate service without splitting the whole platform.

### Costs

- Boundaries require review discipline even though everything shares one repository.
- Some legacy mission code remains temporarily available through a lazy migration bridge.
- Module contracts and progress migrations must be maintained as schemas evolve.

## Guardrails

- No module imports another module's private files.
- Route handlers contain transport and authorization concerns, not scoring rules.
- UI components do not calculate authoritative XP or unlocks.
- Stable content IDs are independent from display ordering.
- Cross-module writes go through application services.
- Circular dependencies are not accepted.
- Microservices are introduced only with measured operational justification.
