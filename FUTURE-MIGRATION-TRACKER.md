# LevelCraft — Future Ownership and Migration Tracker

## Document purpose

This document tracks the future migration of LevelCraft from its current ChatGPT Sites-managed runtime to an independently owned, deployable and operable platform.

The migration is intentionally **deferred**. LevelCraft must first reach a stable product baseline: correct learning content, a coherent beginner-to-expert progression, actionable training and quest instructions, and a workable approach to code or project-submission validation.

This is a living tracker—not an instruction to begin infrastructure migration immediately.

## Current status

| Item | Status |
| --- | --- |
| Phase 0: Source ownership in GitHub | Complete |
| Current hosted application | Remains on ChatGPT Sites |
| Independent deployment | Not started |
| Migration readiness | Blocked by product-readiness gate |
| Target launch date | Not set |

### Phase 0 baseline

- Canonical repository: <https://github.com/Skidx12/LevelCraft>
- Production-baseline commit: `2fe7a092818e8ef13d5965008ae6b2934d28c8f0`
- Pre-import backup branch: `sites-v6-backup`
- Existing ChatGPT-hosted application remains the active environment until an independent replacement is verified.

## Product-readiness gate — complete before Phase 1

Migration work should begin only after the following items are sufficiently stable.

### Learning experience

- [ ] Java 17 curriculum structure is reviewed end to end.
- [ ] Spring and Spring Boot curriculum structure is reviewed end to end.
- [ ] Beginner prerequisites are introduced before dependent concepts.
- [ ] Multithreading has the required depth, practice and diagnostic exercises.
- [ ] Records, interfaces, lambdas, Stream API and interview-focused Java topics are complete.
- [ ] Related alternatives and trade-offs are taught together; for example, constructor, setter and field injection.
- [ ] Mission pages clearly explain what the learner is building and why.
- [ ] Training steps contain prerequisites, context, commented examples and expected results.
- [ ] Quests identify where work must be performed and how evidence is submitted.
- [ ] Side quests reinforce learning without overwhelming the main path.
- [ ] Capstones support multiple domains with equivalent engineering standards.

### Validation model

- [ ] Small exercises have a defined validation approach.
- [ ] Multi-file assignments have a defined upload/submission approach.
- [ ] Acceptance criteria are objective and visible before submission.
- [ ] Hint, retry and failure-feedback behaviour is defined.
- [ ] Manual, automated and self-attested checks are clearly distinguished.
- [ ] Any future code-execution sandbox is treated as an isolated service, not run inside the main web application.

### Product stability

- [ ] Navigation and mission-page usability issues are resolved.
- [ ] Progression, XP, side-quest and reward rules are stable.
- [ ] Authentication and learner progress work reliably in the current environment.
- [ ] Content has been tested with representative beginner learners.
- [ ] Critical product defects are closed or explicitly accepted.

**Gate approval:** Product owner records the decision and date here before Phase 1 begins.

- Approval: `Pending`
- Approved by: `TBD`
- Approval date: `TBD`
- Baseline release/tag: `TBD`

---

## Phase 1 — Portability foundation

**Objective:** Make the repository understandable, reproducible and independent of ChatGPT development tooling while preserving current behaviour.

### Engineering work

- [ ] Inventory every ChatGPT/Sites-specific dependency and runtime assumption.
- [ ] Document the current architecture, data flows and deployment lifecycle.
- [ ] Separate application configuration from source code.
- [ ] Add `.env.example` with descriptions and safe placeholders only.
- [ ] Remove or isolate Sites-only bootstrap scripts and documentation.
- [ ] Define standard local-development commands independent of Sites.
- [ ] Resolve blocking lint errors and establish a clean quality baseline.
- [ ] Add unit, component and smoke-test foundations.
- [ ] Add GitHub Actions for install, lint, type-check, test and build.
- [ ] Add dependency and secret scanning.
- [ ] Pin supported Node.js and package-manager versions.
- [ ] Create portable Dockerfile and Docker Compose development configuration.
- [ ] Document local setup for macOS, Windows and Linux.
- [ ] Produce a software bill of materials and third-party licence inventory.

### Owner actions

- [ ] Decide whether the repository stays public during development.
- [ ] Enable GitHub two-factor authentication.
- [ ] Configure branch protection and required checks.
- [ ] Decide whether development will remain under the personal account or move to a GitHub organization.
- [ ] Approve the target open-source licence before public contribution is invited.

### Exit criteria

- A new developer can clone the repository and run it using only the documented prerequisites.
- A production build succeeds without ChatGPT Sites tooling.
- Pull requests receive repeatable automated quality checks.
- No credentials or environment-specific identifiers are committed.

---

## Phase 2 — Replace platform-managed identity and persistence

**Objective:** Replace ChatGPT-managed authentication, identity headers and hosted data bindings with owner-controlled interfaces and services.

### Architecture work

- [ ] Define provider-neutral interfaces for identity, learner progress, rewards, submissions and content.
- [ ] Replace `oai-authenticated-user-*` identity headers with standard application sessions.
- [ ] Select an authentication implementation supporting account deletion and data export.
- [ ] Design roles for learner, content author, reviewer and administrator.
- [ ] Finalize the database model and migration strategy.
- [ ] Replace platform-bound data access with a portable persistence layer.
- [ ] Add schema migrations, seed data and rollback procedures.
- [ ] Add authorization checks for every user-owned write operation.
- [ ] Add rate limiting, input validation and audit logging.
- [ ] Define backup, restore and retention policies.
- [ ] Test migration of representative learner data from the current environment.

### Provider decision record

Do not select a service merely because it has a free tier. Record portability, export facilities, operational effort, regional availability, limits and expected cost.

| Capability | Preferred characteristics | Selected provider | Decision status |
| --- | --- | --- | --- |
| Authentication | OIDC/OAuth compatible; exportable users; MFA-ready | TBD | Pending |
| Relational database | Standard SQL; backups; documented export | TBD | Pending |
| Object storage | S3-compatible API; lifecycle rules | TBD | Pending |
| Transactional email | Verified domain; delivery logs; suppression handling | TBD | Pending |

### Owner actions

- [ ] Create the selected service accounts under an owner-controlled email address.
- [ ] Enable MFA and store recovery codes securely.
- [ ] Create development, staging and production projects separately.
- [ ] Generate API credentials only when their integrations are implemented.
- [ ] Store secrets in deployment/GitHub secret stores, never in source control.

### Exit criteria

- Users can register, sign in, sign out, reset credentials and delete their account without ChatGPT identity services.
- Learner progress survives deployment and can be exported and restored.
- The application can switch providers through documented adapters or standard data exports.

---

## Phase 3 — Independent staging deployment

**Objective:** Deploy a complete owner-controlled staging environment without affecting the current live site.

### Deployment work

- [ ] Select the initial hosting provider using an architecture decision record.
- [ ] Provision staging compute, database, storage and authentication.
- [ ] Configure environment variables and secrets.
- [ ] Deploy automatically from the protected GitHub branch.
- [ ] Run database migrations as a controlled deployment step.
- [ ] Configure HTTPS, security headers, rate limits and allowed origins.
- [ ] Add application error reporting, uptime monitoring and structured logs.
- [ ] Add deployment rollback and database-restore runbooks.
- [ ] Run accessibility, responsive-design, performance and browser checks.
- [ ] Perform dependency, secret and basic application-security scans.
- [ ] Conduct load tests based on a documented traffic assumption.

### Exit criteria

- Staging can be rebuilt from the repository and documented configuration.
- No production functionality depends on ChatGPT Sites.
- Monitoring detects a failed deployment and important runtime errors.
- Backup restoration has been tested, not merely configured.

---

## Phase 4 — Production launch readiness

**Objective:** Establish the ownership, governance and operational controls required for real learners.

### Product and legal readiness

- [ ] Confirm product name and check relevant domain/trademark conflicts.
- [ ] Purchase and configure the production domain.
- [ ] Create owner-controlled support and administrative email addresses.
- [ ] Publish Terms of Use, Privacy Policy and acceptable-use rules.
- [ ] Document account deletion, personal-data export and retention behaviour.
- [ ] Verify ownership/licensing of curriculum, icons, fonts, animations, quotes and rewards.
- [ ] Use original or properly licensed game/anime-inspired reward artwork.
- [ ] Define learner-support and abuse-reporting processes.

### Operational readiness

- [ ] Establish production access controls and MFA.
- [ ] Separate production credentials from development and staging.
- [ ] Configure alerts, budget thresholds and usage limits.
- [ ] Establish incident severity, response and communication procedures.
- [ ] Define recovery objectives and disaster-recovery responsibilities.
- [ ] Validate database backups and deployment rollback in production-like conditions.
- [ ] Complete launch security and performance reviews.
- [ ] Obtain a final release sign-off.

### Exit criteria

- Production risks, service limits and monthly cost expectations are documented.
- Legal pages and user-data controls are accessible.
- The platform has a tested recovery path and named operational owner.
- The production release candidate passes the agreed quality gates.

---

## Phase 5 — Controlled cutover and ChatGPT-hosted retirement

**Objective:** Move learners safely to the independent platform and retire the old runtime only after verification.

### Cutover work

- [ ] Freeze schema/content changes during the agreed migration window.
- [ ] Export and validate transferable production data.
- [ ] Perform a rehearsed migration into the independent production environment.
- [ ] Verify account, progress, XP, rewards and submission totals.
- [ ] Reduce DNS time-to-live before domain cutover, if applicable.
- [ ] Route production traffic to the independent environment.
- [ ] Monitor authentication, errors, latency and data writes closely.
- [ ] Keep the former site available in read-only or fallback mode during the observation window when feasible.
- [ ] Record reconciliation results and final sign-off.
- [ ] Retire old integrations only after the rollback window closes.

### Exit criteria

- The independent environment is the system of record.
- Data reconciliation is approved.
- Rollback is no longer required or the agreed rollback window has expired.
- ChatGPT Sites credentials, bindings and obsolete callbacks are removed.
- The final architecture and operations handbook reflect reality.

---

## Optional capabilities — separate decisions after core launch

These capabilities must not block the first independent release.

| Capability | Additional dependency | Primary concern |
| --- | --- | --- |
| Automated Java code execution | Isolated sandbox/judge workers and queues | Running untrusted code safely |
| Multi-file project validation | Object storage, malware scanning and validation workers | File security and processing cost |
| AI mentor or feedback | One or more AI-provider APIs | Cost, privacy and inaccurate feedback |
| Transactional notifications | Email provider | Deliverability and consent |
| Paid plans | Payment processor | Tax, refunds, security and compliance |
| Social login | Provider OAuth applications | Account linking and provider dependency |

Each optional capability requires its own architecture decision, threat model, usage quota, monitoring and fallback behaviour.

## Account, subscription and secret register

Create accounts only when the relevant phase begins. Use an owner-controlled email address, MFA and a password manager.

| Service/capability | Needed from phase | Account created | Paid plan approved | Secrets configured | Owner |
| --- | ---: | --- | --- | --- | --- |
| GitHub | 0 | Yes | Not required | As needed | Skiddy |
| Hosting/runtime | 3 | No | No | No | TBD |
| Database | 2 | No | No | No | TBD |
| Authentication | 2 | No | No | No | TBD |
| Object storage | 2 or optional | No | No | No | TBD |
| Transactional email | 2/4 | No | No | No | TBD |
| Monitoring/alerting | 3 | No | No | No | TBD |
| Domain/DNS | 4 | No | No | No | TBD |
| AI provider | Optional | No | No | No | TBD |
| Code-execution service | Optional | No | No | No | TBD |
| Payment processor | Optional | No | No | No | TBD |

## Cross-phase rules

- The repository is the canonical source of truth.
- Infrastructure must be reproducible from code or documented commands.
- Business logic must not depend directly on a single vendor SDK when a practical standard interface exists.
- Multiple APIs should reflect clear capability boundaries; unnecessary microservices are not an enterprise architecture goal.
- Development, staging and production data and credentials must remain separate.
- Every secret must have an owner, purpose, storage location and rotation procedure.
- Every external service must have an export/exit strategy.
- Every production change must be testable, observable and reversible.
- Costs and service limits must be reviewed before enabling a capability publicly.
- The existing hosted site must not be retired until the replacement passes cutover acceptance.

## Decision log

| Date | Decision | Reason | Owner | Status |
| --- | --- | --- | --- | --- |
| 2026-09-22 | Defer Phase 1+ until the content, learning structure and validation model are stable | Product quality currently has higher priority than infrastructure migration | Skiddy | Approved |
| TBD | Repository visibility during development | TBD | Skiddy | Pending |
| TBD | Initial hosting/runtime provider | TBD | Skiddy | Pending |
| TBD | Authentication provider/implementation | TBD | Skiddy | Pending |
| TBD | Database technology/provider | TBD | Skiddy | Pending |
| TBD | Domain and public launch date | TBD | Skiddy | Pending |

## Progress summary

| Phase | Name | State | Start | Completion | Notes |
| ---: | --- | --- | --- | --- | --- |
| 0 | GitHub ownership baseline | Complete | 2026-09-21 | 2026-09-21 | Source and history preserved |
| 1 | Portability foundation | Deferred | — | — | Begin only after product-readiness approval |
| 2 | Identity and persistence independence | Not started | — | — | — |
| 3 | Independent staging deployment | Not started | — | — | — |
| 4 | Production launch readiness | Not started | — | — | — |
| 5 | Controlled cutover and retirement | Not started | — | — | — |

## Review cadence

Review this tracker:

- after a major LevelCraft product milestone;
- before introducing a new external service;
- when content and validation are declared stable;
- at the start and end of every migration phase; and
- whenever hosting, ownership or launch assumptions change.

