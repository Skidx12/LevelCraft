# LevelCraft Learning System — In-Depth Product and Implementation Plan

## 1. Document purpose

This document is the execution blueprint for transforming LevelCraft into a progressive, beginner-to-professional learning platform for Java 17 and Spring Boot.

It converts the product vision into:

- a teach-first learning methodology;
- a dependency-aware curriculum;
- a continuous real-world application storyline;
- level-appropriate missions, quests, side quests and rank trials;
- a reusable content-authoring standard;
- measurable quality gates;
- a phased delivery roadmap.

The educational clarity and depth of AlgorithmXlr8 is a quality benchmark. LevelCraft content must remain original. External material may be used for research and fact-checking, but must not be copied verbatim or structurally reproduced without permission.

---

## 2. Product vision

### 2.1 Product promise

LevelCraft takes a learner from little or no practical experience to the ability to build, test, diagnose and explain production-shaped software.

The learner should feel like a hunter progressing through ranks, but should progress like an engineer:

1. Learn the concept.
2. Observe a working example.
3. Reproduce it with guidance.
4. Modify and deliberately break it.
5. Repair it and explain the behaviour.
6. Apply it independently in a realistic mission.
7. Combine it with prior skills in a rank trial.

### 2.2 Primary audience

- complete beginners who know little or no Java;
- learners who know syntax but cannot build applications independently;
- working developers preparing for interviews or enterprise projects;
- experienced learners using LevelCraft to close gaps or prove mastery.

### 2.3 Initial product scope

- Java is capped at Java 17.
- Primary tracks are Java and Spring/Spring Boot.
- Student Registration and Management is the first continuous domain.
- Later capstone choices include e-commerce, library management, financial account management and stock trading.
- Embedded compilation is not required for the first content release.
- The platform must clearly explain where work is performed, what files are needed, how to run it and how to verify the result.

---

## 3. Non-negotiable learning principles

### 3.1 Teach before testing

A learner must never be assessed on a concept that has not been introduced, demonstrated and practised.

### 3.2 Preserve prerequisite order

Every mission declares its prerequisites. A dependency graph—not only XP—controls the recommended learning order.

Examples:

- interfaces precede repository abstractions;
- collections precede in-memory repositories;
- exceptions precede global Spring exception handling;
- SQL and persistence fundamentals precede Spring Data JPA;
- threads and shared mutable state precede executors and `CompletableFuture`;
- plain Java construction precedes Spring IoC and dependency injection.

### 3.3 One concept, then integration

New concepts are first shown in the smallest useful example. They are then integrated into the continuing Student Management application.

### 3.4 Alternatives must be taught together

Recommendations only become meaningful when learners understand the alternatives.

Examples:

- constructor, setter and field injection;
- arrays, lists, sets and maps;
- loops and streams;
- checked and unchecked exceptions;
- `synchronized`, locks, atomics and concurrent collections;
- unit, slice and integration tests;
- entities, DTOs and records;
- synchronous calls, asynchronous calls and messaging.

### 3.5 Progress requires evidence

XP celebrates progress but does not prove mastery. Rank progression requires observable evidence such as correct output, tests, a completed checklist, an uploaded repository or an explanation of engineering decisions.

### 3.6 Gamification supports learning

Animations, titles, stickers, quotes and effects celebrate meaningful events. They must not interrupt study, obscure instructions or reward empty clicking.

### 3.7 Original and maintainable content

All LevelCraft explanations, examples, stories, quests and diagrams should be original. Technical claims should be checked against Java, Spring and other primary documentation where practical.

---

## 4. Current-state assessment

| Area | Current baseline | Required change |
| --- | --- | --- |
| Curriculum | Ten large missions per track | Split into smaller prerequisite-driven missions and milestone arcs |
| Briefing | Improved but still content-variable | Make it a complete learning chapter with mental models and prerequisites |
| Training | Starter workspaces supported | Standardize complete runnable examples, file maps, commands and checkpoints |
| Pause and Explain | Available as a learning interaction | Place only after the learner has observed and practised the relevant concept |
| Hunter Notes | Benefits, costs and use cases supported | Add decision tables, mistakes, debugging symptoms and interview recall |
| Quest | Acceptance criteria and starter code supported | Add evidence requirements, difficulty variants and explicit validation methods |
| Skill levels | Beginner, Intermediate, Advanced and Professional restored | Use levels to vary guidance, hints and assessment—not omit essential knowledge |
| Missions | Open for content review | Retain review mode until every mission passes the content definition of done |
| Rewards | Starter stickers and quote available | Connect rewards only to meaningful milestones and keep frequency controlled |
| Routing | Real mission routes available | Continue route-based pages and avoid placing the entire platform in one client view |
| Content storage | Dedicated `app/content` layer exists | Introduce versioned schemas and validation before moving to a CMS or database |
| Code execution | Not embedded | Provide local IDE instructions and evidence-based validation; defer sandbox execution |

---

## 5. Target learning architecture

### 5.1 Content hierarchy

```text
Track
  -> Campaign Arc
      -> Mission
          -> Briefing Chapter
          -> Guided Training
          -> Practice Drill
          -> Hunter Notes
          -> Main Quest
          -> Debrief
          -> Optional Side Quest
      -> Arc Boss
      -> Rank Trial
  -> Capstone Campaign
```

### 5.2 Canonical mission loop

Every standard mission follows this order:

1. **Mission briefing** — context, purpose, prerequisites and learning objectives.
2. **Concept chapter** — theory, mental model, terminology and comparisons.
3. **Guided demonstration** — complete code with file names, comments and expected output.
4. **Guided training** — learner reproduces and changes the code in small checkpoints.
5. **Break and repair drill** — learner observes a predictable failure and fixes it.
6. **Pause and Explain** — learner explains only concepts already taught in the mission.
7. **Hunter Notes** — decision rules, use cases, trade-offs, mistakes and interview recall.
8. **Main quest** — an application task in the continuing domain.
9. **Evidence and validation** — output, tests, checklist, explanation or upload requirements.
10. **Debrief** — recap, capability gained, application evolution and next dependency.
11. **Optional side quest** — focused reinforcement, debugging or alternative design.

### 5.3 Mission duration rules

- Concept lesson: 10–20 minutes.
- Guided demonstration: 10–20 minutes.
- Guided practice: 15–30 minutes.
- Main quest: 20–60 minutes depending on rank.
- Side quest: 10–30 minutes.
- Rank trial: 60–180 minutes.
- Capstone: multi-session, with checkpoints rather than one very large page.

Any mission estimated above 90 minutes should normally be split unless it is explicitly a trial or capstone.

---

## 6. Required content specification

### 6.1 Briefing chapter

Every Briefing must contain:

- mission story and practical scenario;
- capability the learner will gain;
- prerequisite concepts with links to their missions;
- learning objectives written as observable outcomes;
- plain-language explanation of the problem;
- mental model or analogy;
- key vocabulary;
- concept explanation from basic to detailed;
- one minimal example;
- one real application example;
- diagram where relationships are otherwise difficult to understand;
- comparison with closely related alternatives;
- common misconceptions;
- readiness check that tests only prerequisite knowledge.

### 6.2 Guided demonstration

Every demonstration must include:

- tool requirements and supported versions;
- project and package structure;
- exact file names;
- complete starting code;
- relevant imports;
- comments describing intent rather than restating syntax;
- run command or IDE action;
- expected output;
- explanation of the execution flow;
- a checkpoint confirming that the learner's environment works.

No snippet should reference classes that have not been supplied or previously created.

### 6.3 Guided training

Each step uses the following structure:

1. **Goal** — what changes in this step.
2. **Why** — why the change matters.
3. **Where** — exact file and location.
4. **Do** — the learner action.
5. **Observe** — expected result.
6. **If it fails** — common cause and recovery guidance.
7. **Checkpoint** — a small verification before proceeding.

Training should alternate between explanation and action. It must not present a long unbroken instruction list.

### 6.4 Pause and Explain

Questions should progress through four levels:

- **Recall:** What does this term mean?
- **Trace:** What happens when this code runs?
- **Compare:** Why choose this approach over the alternative?
- **Predict:** What will break if this part changes?

Beginner missions should offer model answers after an attempt. Advanced missions should require a written design defence.

### 6.5 Hunter Notes

Hunter Notes are the durable engineering reference for the mission. They include:

- core rules;
- when to use the concept;
- when not to use it;
- advantages;
- disadvantages and costs;
- alternatives;
- decision table;
- common implementation mistakes;
- debugging symptoms;
- performance or security considerations;
- interview questions and concise answers;
- links to primary documentation.

### 6.6 Main quest

Every quest must specify:

- business scenario;
- current state of the application;
- required files or repository starting point;
- functional requirements;
- technical constraints;
- acceptance criteria;
- non-goals;
- permitted concepts;
- evidence to submit;
- validation method;
- progressive hints;
- reference solution availability after completion.

### 6.7 Debrief

The Debrief records:

- what the learner can now do;
- how the domain application changed;
- what trade-off was learned;
- which previous concepts were reused;
- what concept becomes available next;
- one reflection question.

---

## 7. Learner-level adaptation

LevelCraft should maintain one authoritative concept chapter per mission. Learner levels modify scaffolding and assessment instead of creating four conflicting versions of the truth.

| Level | Guidance | Starting point | Hints | Expected evidence |
| --- | --- | --- | --- | --- |
| Beginner | Maximum explanation and terminology | Complete starter project | Layered, explicit hints | Correct behaviour plus basic explanation |
| Intermediate | Concise recap and implementation guidance | Interfaces and partial skeleton | Conceptual hints | Implementation, tests and comparison |
| Advanced | Emphasis on trade-offs and failure cases | Requirements and constraints | Limited hints | Design choice, edge cases and diagnostics |
| Professional | Production, operability and architecture focus | Ambiguous real-world brief | No default hints | Decision record, tests, risks and operational evidence |

### 7.1 Level selection

- A learner selects an initial level during onboarding.
- A short diagnostic may recommend a different starting point.
- The learner may change explanation depth without losing progress.
- Rank and learner level are different:
  - **learner level** controls instructional depth;
  - **rank** represents demonstrated progress inside a track.

### 7.2 Adaptive behaviour without AI dependency

Initial adaptation should be deterministic:

- show or collapse foundation explanations;
- control the number of hints;
- vary starter-code completeness;
- add advanced constraints;
- change evidence requirements;
- recommend remediation missions after failed checks.

The core learning experience must not depend on an external generative AI API.

---

## 8. Ranks, gates and progression rules

| Rank | Capability expectation | Typical assessment |
| --- | --- | --- |
| E | Follow examples and explain fundamentals | Guided implementation and short explanation |
| D | Build small features using known patterns | Partially guided quest with tests |
| C | Combine several concepts reliably | Independent feature and debugging task |
| B | Handle persistence, concurrency, testing and failures | Multi-file mission with evidence |
| A | Make and defend architectural choices | Scenario, trade-off analysis and incident drill |
| S | Deliver production-shaped software | Capstone, review and operational evidence |

### 8.1 Unlock rules

A mission becomes recommended when:

- all required prerequisite missions are complete;
- the preceding gate check is passed;
- required evidence is recorded.

XP does not bypass prerequisites.

### 8.2 Review mode

Until content approval is complete, the product owner can open every mission using a visible Content Review Mode. Learner accounts continue to follow progression rules.

### 8.3 Rank trials

Rank trials:

- reuse only concepts previously taught;
- combine concepts from the entire rank;
- contain at least one defect or edge case;
- require tests or objective verification;
- include an engineering explanation;
- provide a remediation path rather than simply failing the learner.

---

## 9. Continuous domain campaign: Student Registration and Management

The application evolves instead of restarting for every topic.

### 9.1 Domain foundation

Core concepts:

- Student;
- Course;
- Registration;
- Contact information;
- Registration status;
- eligibility rules;
- seat capacity;
- audit event;
- notification preference.

Repositories are initially plain Java abstractions backed by collections. Databases and Spring Data are introduced only after the learner understands the repository responsibility.

### 9.2 Progressive application evolution

| Milestone | Learner builds | Concepts applied |
| --- | --- | --- |
| Console intake | Read and display student information | Variables, types, input and control flow |
| Valid student model | Protect required state | Classes, constructors and encapsulation |
| Registration rules | Decide whether registration is allowed | Methods, conditions and exceptions |
| Storage boundary | Store and retrieve students | Interfaces, collections and generics |
| Search and reporting | Filter and summarize students | Lambdas, records and streams |
| Reliable operations | Report validation and domain failures | Exceptions and logging concepts |
| Concurrent enrolment | Prevent capacity oversubscription | Threads, synchronization and executors |
| Tested application core | Prove rules and failure behaviour | JUnit, test doubles and refactoring |
| Spring-managed core | Move object construction to Spring | IoC, beans and injection styles |
| REST registration API | Accept external requests | Controllers, DTOs and validation |
| Persistent system | Save state in PostgreSQL | JPA, SQL awareness and transactions |
| Secured system | Protect learner and administrator actions | Authentication and authorization |
| Production-shaped service | Observe and operate the service | Actuator, metrics, configuration and deployment |

### 9.3 Domain continuity rules

- Every mission states the application version it starts from.
- A tagged starter repository or downloadable archive is provided per arc.
- Database concepts do not appear before persistence missions.
- Spring annotations do not appear in plain Java foundation missions.
- Later missions deliberately reuse earlier decisions.
- Refactoring is explicit; learners are told when and why earlier code changes.

---

## 10. Proposed Java 17 campaign

The current ten broad Java missions should be decomposed into the following arcs. Final IDs are assigned after dependency review.

### Arc J0 — Hunter orientation

- How Java source becomes a running program.
- JDK, compiler, bytecode and JVM.
- IntelliJ/project setup and running code.
- Reading errors and using the debugger.
- Trial: repair and run a broken starter program.

### Arc J1 — Program foundations, Rank E

- Variables, primitive types and references.
- Operators and expressions.
- Conditions and branching.
- Loops and safe iteration.
- Methods, parameters and return values.
- Strings and basic input validation.
- Boss: console-based student intake.

### Arc J2 — Object modelling, Rank D

- Classes and objects.
- Constructors and valid state.
- Encapsulation and access modifiers.
- Static versus instance members.
- Inheritance and composition.
- Interfaces and polymorphism.
- Enums and records.
- Boss: domain model and registration policy.

### Arc J3 — Data and functional Java, Rank C

- Arrays and their limitations.
- Lists, sets and maps.
- Generics and type safety.
- Equality, hashing and collection behaviour.
- Functional interfaces.
- Lambda expressions.
- Stream creation, filtering and mapping.
- Sorting, grouping, reduction and collectors.
- Loops versus streams and misuse cases.
- Boss: student search and reporting engine.

### Arc J4 — Reliability and testing, Rank C/B

- Exceptions and stack traces.
- Checked versus unchecked exceptions.
- Domain validation and exception design.
- Resource handling and try-with-resources.
- Logging fundamentals.
- Unit-test structure and assertions.
- Test doubles and deterministic tests.
- Refactoring safely.
- Boss: reliable registration service with tests.

### Arc J5 — Multithreading war campaign, Rank B/A

This is a major campaign, not a single mission.

1. Processes, threads and concurrency vocabulary.
2. Creating threads and understanding lifecycle.
3. Shared mutable state and race conditions.
4. Atomicity, visibility and ordering.
5. Java Memory Model and happens-before relationships.
6. `synchronized` blocks and intrinsic locks.
7. Explicit locks and coordination conditions.
8. Atomics and concurrent collections.
9. `wait`, `notify`, latches, barriers and semaphores.
10. ExecutorService, queues, sizing and shutdown.
11. `Callable`, `Future` and cancellation.
12. `CompletableFuture` composition and exception handling.
13. Deadlock, livelock, starvation and thread dumps.
14. Testing concurrent behaviour without unreliable sleeps.
15. Capacity, backpressure and failure handling.

Campaign missions use concurrent student registration, limited course seats, asynchronous notifications and reporting jobs.

Rank trial: diagnose and repair oversold course capacity, leaked executors and a deadlock while preserving throughput.

Virtual threads and structured concurrency remain outside the Java 17 implementation scope. They may be included only as clearly labelled awareness material.

### Arc J6 — Architecture and production core, Rank A/S

- Layered architecture and dependency direction.
- Domain, application and infrastructure responsibilities.
- Repository pattern without framework magic.
- File persistence and SQL awareness.
- Transaction boundaries as a concept.
- Configuration, packaging and operational errors.
- Final Java capstone with a selectable domain.

---

## 11. Proposed Spring and Spring Boot campaign

### Prerequisite gate

Learners must understand Java classes, constructors, interfaces, collections, exceptions and basic testing before beginning the main Spring path. Missing prerequisites link to targeted Java remediation missions.

### Arc S0 — Why Spring exists, Rank E

- Problems caused by manual construction and tightly coupled code.
- IoC and dependency injection mental models.
- Plain Java manual wiring.
- Beans and ApplicationContext.
- Component scanning.
- Constructor injection.
- Setter injection.
- Field injection.
- Required versus optional dependencies.
- Multiple implementations, `@Primary` and qualifiers.
- Bean scopes and lifecycle.
- Boss: convert manually wired Student Management services into intentionally managed components.

### Arc S1 — Spring Boot fundamentals, Rank D

- What Spring Boot adds to Spring.
- Project structure and application startup.
- Starters and dependency management.
- Auto-configuration and conditional behaviour.
- `application.properties` and YAML.
- Profiles and configuration properties.
- Environment variables and secrets boundaries.
- Logging and startup diagnostics.
- Boss: create configurable Student Management service foundations.

### Arc S2 — Web API development, Rank C

- HTTP and REST fundamentals.
- Controllers and request mappings.
- Request/response DTOs.
- Records as DTO candidates.
- JSON serialization.
- Bean Validation.
- Status codes and response design.
- Global exception handling.
- API versioning and compatibility awareness.
- Boss: registration and student search API.

### Arc S3 — Persistence and transactions, Rank B

- Relational database and SQL foundations.
- Entities and identity.
- Relationships and loading behaviour.
- Spring Data repository abstraction.
- Derived queries and explicit queries.
- DTO/entity separation.
- Transaction boundaries.
- Rollback behaviour.
- N+1 queries, pagination and indexing awareness.
- Database migrations.
- Boss: PostgreSQL-backed registration workflow.

### Arc S4 — Security and quality, Rank B

- Authentication versus authorization.
- Spring Security filter-chain mental model.
- Password storage.
- Session and token approaches.
- Role- and permission-based access.
- CSRF, CORS and secure defaults.
- Unit, MVC slice and integration testing.
- Testcontainers or equivalent database integration testing.
- Boss: protect student and administrator operations and prove the rules with tests.

### Arc S5 — Integration and resilience, Rank A

- HTTP clients and timeouts.
- Retries and when they are unsafe.
- Idempotency.
- Circuit breakers and bulkheads.
- Asynchronous processing.
- Messaging awareness.
- Consistency and failure boundaries.
- Boss: reliable downstream notification and payment-style integration scenario.

### Arc S6 — Production operation, Rank A/S

- Actuator and health checks.
- Metrics, logs and traces.
- External configuration.
- Container and deployment concepts.
- Performance and connection pools.
- Rate limiting and abuse controls.
- Graceful shutdown.
- Incident diagnosis.
- Final Spring Boot capstone with a selectable domain.

---

## 12. Missions, quests and side quests

### 12.1 Main mission categories

- concept construction;
- feature implementation;
- debugging and repair;
- refactoring;
- design comparison;
- test creation;
- incident response;
- architecture decision.

### 12.2 Side-quest rules

Side quests are optional and unlock after meaningful milestones.

Each side quest must:

- reinforce one or two known skills;
- take less time than the main mission;
- state whether it is practice, debugging, decision-making or exploration;
- avoid introducing a prerequisite needed by the main path;
- provide useful feedback or a reference solution;
- award modest XP and occasionally a cosmetic reward.

### 12.3 Recommended side-quest frequency

- no more than two visible recommendations after a normal mission;
- two to four side quests per campaign arc;
- one rare or creative side quest after a rank trial;
- unfinished side quests never block main progression.

### 12.4 Example side quests

- Repair an incorrect `equals`/`hashCode` implementation.
- Replace a stream pipeline with a loop and compare readability.
- Find the race condition causing course overbooking.
- Diagnose why constructor injection finds two candidates.
- Repair a transaction that partially saves registration data.
- Explain why retrying a non-idempotent request duplicates an operation.

---

## 13. Reward and animation design

### 13.1 Reward categories

- original LevelCraft stickers;
- engineering quotes;
- profile titles;
- rank crests;
- mission-completion stamps;
- domain badges;
- cosmetic dashboard themes;
- capstone certificates or shareable completion cards in a later release.

### 13.2 Reward economy

- Starter grant: two stickers and one quote.
- Minor milestone: XP and progress animation.
- Arc completion: title, sticker or crest.
- Rank trial: rank animation and permanent rank badge.
- Capstone: domain badge and Legend evidence summary.

Avoid random duplicate rewards, paid loot boxes, daily streak pressure and rewards that imply skill without evidence.

### 13.3 Animation rules

- Reward reveals display once when first unlocked.
- Replays are available in the Reward Vault.
- Ambient effects remain subtle and optional.
- Respect `prefers-reduced-motion`.
- Avoid copyrighted anime/game characters, logos, music and direct visual imitation.
- Provide a global effects intensity control: Off, Reduced and Full.

---

## 14. Validation strategy without an embedded compiler

### 14.1 Validation tiers

| Tier | Method | Appropriate use |
| --- | --- | --- |
| V0 | Learner acknowledgement | Reading and reflection only |
| V1 | Expected-output checklist | Small local exercises |
| V2 | Quiz or prediction check | Concept understanding |
| V3 | Local test suite | Java/Spring implementation missions |
| V4 | Repository/file upload | Multi-file quests and rank trials |
| V5 | Automated isolated runner | Future capability, not required now |

### 14.2 Immediate implementation

For every coding mission, LevelCraft supplies:

- IDE and Java version requirements;
- downloadable/tagged starter project;
- exact run command;
- expected output;
- acceptance checklist;
- supplied tests where appropriate;
- evidence instructions;
- troubleshooting guidance.

### 14.3 Future upload validation

When implemented, upload validation should:

- run outside the main web application;
- use isolated containers with CPU, memory, network and time limits;
- scan archives and restrict file types;
- never expose platform secrets;
- provide deterministic test results;
- retain submissions according to a published policy.

This is deferred until content and assessment specifications are stable.

---

## 15. Content architecture and authoring model

### 15.1 Content must remain separate from interface behaviour

The UI consumes a versioned content catalog. Mission text, prerequisites, code blocks, hints and acceptance criteria must not be scattered through React components.

### 15.2 Proposed mission schema

Each mission record should support:

```ts
type MissionContent = {
  schemaVersion: number;
  id: string;
  track: "java" | "spring-boot";
  arcId: string;
  rank: "E" | "D" | "C" | "B" | "A" | "S";
  title: string;
  summary: string;
  prerequisites: string[];
  outcomes: string[];
  estimatedMinutes: number;
  concepts: ConceptSection[];
  demonstrations: CodeDemonstration[];
  trainingSteps: TrainingStep[];
  explainChecks: ExplainCheck[];
  hunterNotes: HunterNotes;
  quest: QuestSpecification;
  debrief: Debrief;
  sideQuestIds: string[];
  references: ReferenceLink[];
  review: ReviewMetadata;
};
```

### 15.3 Content storage stages

1. **Current:** typed TypeScript modules in `app/content`.
2. **Near term:** JSON, YAML or MDX content validated against a schema during build.
3. **Later:** authoring CMS or database with draft, review and publish workflow.

The application accesses content only through `app/content/catalog.ts` or a provider interface so storage can change without rewriting page behaviour.

### 15.4 Content lifecycle

```text
Draft -> Technical Review -> Beginner Review -> Editorial Review -> Approved -> Published -> Retired
```

Every published mission records:

- content version;
- author;
- technical reviewer;
- learner-level reviewer;
- last reviewed date;
- Java/Spring version applicability;
- primary references;
- change notes.

### 15.5 Copyright and citation policy

- Use external platforms for research and benchmarking, not wholesale copying.
- Paraphrase concepts in LevelCraft's own instructional voice.
- Write original examples and domain scenarios.
- Link to primary documentation for further reading.
- Track licenses for borrowed assets and code.
- Use original or licensed rewards and artwork.

---

## 16. Platform information architecture

LevelCraft remains a routed web application. Interactive elements may use client-side components, but the complete learning experience must not be one oversized client page.

Recommended routes:

```text
/
/onboarding
/dashboard
/curriculum
/track/java
/track/spring-boot
/mission/:track/:missionId/briefing
/mission/:track/:missionId/training
/mission/:track/:missionId/notes
/mission/:track/:missionId/quest
/mission/:track/:missionId/debrief
/side-quest/:sideQuestId
/rank-trial/:trialId
/rewards
/capstone
/review/content
```

### 16.1 Route requirements

- direct links survive refresh;
- browser back/forward navigation behaves correctly;
- mission progress is saved at section level;
- long content pages have a local table of contents;
- learner position is restored after returning;
- loading one mission does not load every curriculum payload;
- page metadata and titles identify the current mission;
- mobile and keyboard navigation are supported.

---

## 17. Delivery roadmap

The work should proceed in controlled releases. Infrastructure migration remains deferred until the product-readiness gate is met.

### Phase 0 — Curriculum and dependency audit

**Objective:** Establish the authoritative inventory before rewriting content.

Deliverables:

- inventory of every Java and Spring concept;
- prerequisite dependency graph;
- identification of oversized, duplicate and missing missions;
- mapping from current mission IDs to proposed arcs;
- Java 17 compatibility review;
- Student Management feature progression map;
- content review scorecard.

Exit criteria:

- every concept has an intended teaching position;
- no mission requires an untaught prerequisite;
- every current mission has a keep, split, merge, rewrite or retire decision.

### Phase 1 — Content platform foundation

**Objective:** Make high-quality content repeatable and enforceable.

Deliverables:

- versioned mission schema;
- schema/build validation;
- reusable Briefing, Training, Notes, Quest and Debrief renderers;
- prerequisite and outcome fields;
- authoring template;
- content status and review metadata;
- Content Review Mode;
- route split for mission sections where necessary.

Exit criteria:

- a sample mission renders entirely from the content schema;
- invalid or incomplete content fails validation;
- React components contain presentation logic, not embedded curriculum prose.

### Phase 2 — Golden-path pilot missions

**Objective:** Establish the quality benchmark before rewriting the full curriculum.

Pilot set:

1. Java classes, constructors and encapsulation.
2. Java interfaces and repository abstraction.
3. Java collections and in-memory storage.
4. Spring IoC and all three injection styles.
5. Spring REST DTO and validation.

Deliverables:

- full chapters;
- complete starter projects;
- guided training;
- main quests;
- side quests;
- rank-appropriate variants;
- technical and beginner review.

Exit criteria:

- a beginner can complete each pilot without unexplained external knowledge;
- every code sample runs on the declared version;
- reviewers approve the content template and depth standard.

### Phase 3 — Java Foundation campaign

**Objective:** Complete orientation through functional Java.

Scope:

- J0 through J3;
- E, D and C rank trials;
- Student Management domain evolution;
- foundation and debugging side quests.

Exit criteria:

- learners can build an in-memory, searchable Student Management core;
- records, interfaces, lambdas, collections and streams are fully covered;
- each arc has a boss and remediation path.

### Phase 4 — Java Reliability and Multithreading campaign

**Objective:** Deliver the deepest differentiated Java learning area.

Scope:

- exceptions, logging, testing and refactoring;
- complete multithreading war campaign;
- concurrency visual explanations;
- race-condition, deadlock and executor labs;
- B and A rank trials;
- concurrent registration domain scenarios.

Exit criteria:

- learners can explain and demonstrate atomicity, visibility and ordering;
- supplied exercises deterministically expose intended concurrency problems;
- trials test diagnosis and repair, not only API recall.

### Phase 5 — Spring Core and Boot campaign

**Objective:** Move learners from plain Java wiring into Spring intentionally.

Scope:

- S0 and S1;
- manual wiring before container management;
- constructor, setter and field injection comparison;
- component scanning, scopes and lifecycle;
- Boot startup, auto-configuration and configuration;
- E and D Spring rank trials.

Exit criteria:

- learners can explain what Spring creates and why;
- learners can implement and compare all injection styles;
- no repository, annotation or configuration term is used without introduction.

### Phase 6 — Spring Web, Persistence and Quality campaign

**Objective:** Build a complete database-backed Student Registration API.

Scope:

- S2 through S4;
- REST, DTOs, records and validation;
- error handling;
- PostgreSQL, JPA and transactions;
- Spring Security;
- test portfolio;
- C and B rank trials.

Exit criteria:

- the learner can build and test a secured CRUD-plus-business-rules application;
- database and transaction behaviour are explained rather than hidden behind annotations;
- acceptance tests cover success, validation, authorization and rollback paths.

### Phase 7 — Production and Legend campaign

**Objective:** Prepare learners for enterprise project realities.

Scope:

- S5 and S6;
- integrations, resilience and idempotency;
- observability and operations;
- incident side quests;
- selectable capstone domains;
- A and S rank trials;
- capstone evidence portfolio.

Exit criteria:

- the learner can defend architecture and trade-offs;
- the capstone is testable, observable and deployable;
- Legend status requires objective evidence beyond XP.

### Phase 8 — Validation and authoring expansion

**Objective:** Improve scale only after curriculum quality is proven.

Potential scope:

- file/repository submission;
- automated test execution service;
- content-management interface;
- additional language tracks;
- mentor/reviewer workflow;
- cohort analytics.

This phase begins only after stable content schemas and successful learner pilots.

---

## 18. Suggested sprint sequence

| Sprint | Primary outcome |
| --- | --- |
| 1 | Curriculum inventory, dependency graph and content scorecard |
| 2 | Mission schema, validators and authoring template |
| 3 | First Java golden mission and reusable renderers |
| 4 | Spring injection golden mission and review-mode tooling |
| 5–6 | Java Foundation Gate content |
| 7–8 | Object Modelling and Functional Java content |
| 9–11 | Reliability and Multithreading campaign |
| 12–13 | Spring Core and Boot fundamentals |
| 14–16 | Web API, persistence, security and testing |
| 17–18 | Production topics, capstones and Legend trial |
| 19 | Beginner pilot, accessibility and content corrections |
| 20 | Product-readiness review and migration-gate decision |

Sprint scope should be adjusted by actual authoring and review capacity. Content quality is the limiting factor; mission counts must not become vanity output.

---

## 19. Roles and responsibilities

| Role | Responsibility |
| --- | --- |
| Product owner | Vision, prioritization, domain direction and release approval |
| Curriculum architect | Dependency graph, arc design and learning outcomes |
| Technical author | Original explanations, examples and quests |
| Technical reviewer | Correctness, version compatibility and engineering depth |
| Beginner reviewer | Detects assumed knowledge and unclear instructions |
| Editor | Consistency, clarity, terminology and tone |
| Frontend engineer | Route, renderer, accessibility and progress experience |
| Platform engineer | Content schemas, validation, persistence and future submission services |
| QA reviewer | Functional, content, responsive and accessibility verification |

One person may hold multiple roles during the early stage, but each review responsibility must still be completed explicitly.

---

## 20. Quality assurance strategy

### 20.1 Technical validation

- Java examples compile and run on Java 17.
- Spring examples declare the tested Spring Boot version.
- commands work on the supported setup.
- expected output matches actual output.
- tests are deterministic.
- concurrency exercises avoid timing-only assertions where possible.
- security examples do not teach unsafe shortcuts as production patterns.

### 20.2 Learning validation

- prerequisites are sufficient;
- new vocabulary is defined before use;
- concepts progress from simple to integrated;
- questions assess taught content;
- instructions name files and locations;
- hints become progressively more explicit;
- reference solutions explain decisions;
- side quests reinforce rather than distract.

### 20.3 Experience validation

- desktop and mobile layouts are readable;
- code blocks scroll independently when needed;
- long lessons provide navigation and progress;
- keyboard-only navigation works;
- colour is not the only status indicator;
- reduced-motion users receive a complete experience;
- direct mission URLs and refresh work correctly.

### 20.4 Pilot validation

Test with at least:

- two complete Java beginners;
- two learners familiar with Java but new to Spring;
- one experienced Java/Spring engineer;
- one reviewer focused on accessibility and usability.

Observe completion without live coaching. Any repeated question indicates a content or interaction defect.

---

## 21. Metrics and success criteria

### 21.1 Learning metrics

- briefing-to-training continuation rate;
- guided-training completion rate;
- first-attempt and eventual quest success;
- hint usage by learner level;
- remediation mission frequency;
- rank-trial pass rate;
- ability to solve a transfer problem not identical to the example;
- learner confidence before and after an arc.

### 21.2 Content-quality metrics

- missions passing technical review;
- missions passing beginner review;
- unexplained-term defects per mission;
- broken-code or expected-output defects;
- average number of revisions before approval;
- content age and overdue review count.

### 21.3 Product guardrails

- reward interactions should not exceed a small fraction of study time;
- side-quest starts should not materially reduce main-path continuation;
- long-page abandonment should trigger content-splitting review;
- rank trial failures should lead to remediation, not platform abandonment.

Initial targets should be set after pilot baselines rather than invented before real learner data exists.

---

## 22. Major risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Missions remain too broad | Beginners become lost | Enforce duration and single-new-concept rules |
| Content copies external sources | Copyright and identity risk | Original authoring, reference log and editorial review |
| Gamification dominates learning | Shallow engagement | Tie rewards to evidence and limit animation frequency |
| Four levels create content duplication | Inconsistent explanations | One canonical chapter with level-specific scaffolding |
| Quests assume missing code | Learners cannot begin | Mandatory starter workspace and file-map validation |
| Concurrency labs are unreliable | False failures and confusion | Deterministic coordination and bounded tests |
| Curriculum changes break progress | Learners lose continuity | Stable IDs, schema versioning and progress migration rules |
| CMS introduced too early | Complexity slows content improvement | Keep typed files until schemas and workflow stabilize |
| AI/API dependency becomes mandatory | Cost and availability risk | Deterministic core experience; AI only as optional enhancement |
| Reward assets imitate anime IP | Legal risk | Original LevelCraft world, symbols and licensed assets |

---

## 23. Definition of Done for one mission

A mission is publishable only when all items below are true.

### Learning

- [ ] Outcomes are observable and appropriately scoped.
- [ ] Prerequisites are explicit and already available.
- [ ] All new terms are defined before use.
- [ ] Theory progresses from mental model to implementation.
- [ ] Alternatives, use cases and trade-offs are explained.
- [ ] Pause and Explain assesses only taught concepts.

### Code and practice

- [ ] Starter files and package structure are complete.
- [ ] Code compiles and runs on the declared version.
- [ ] Instructions specify what, why, where and expected result.
- [ ] Expected output has been verified.
- [ ] Common errors and recovery steps are included.
- [ ] Quest acceptance criteria are objective.
- [ ] Validation and evidence requirements are explicit.

### Product experience

- [ ] Direct route, refresh and navigation work.
- [ ] Desktop and mobile layouts are readable.
- [ ] Keyboard and reduced-motion behaviour are verified.
- [ ] Reward events do not interrupt required learning.
- [ ] Progress is saved correctly.

### Governance

- [ ] Technical review completed.
- [ ] Beginner review completed.
- [ ] Editorial review completed.
- [ ] References and licenses recorded.
- [ ] Content version and review date recorded.

---

## 24. Immediate prioritized backlog

### P0 — Must happen first

1. Build the complete Java and Spring dependency map.
2. Split the current ten-per-track curriculum into smaller mission candidates.
3. Finalize the versioned mission-content schema.
4. Create the authoring and review checklist.
5. Rewrite one Java and one Spring mission as golden standards.
6. Validate those missions with a beginner before mass authoring.

### P1 — Build the core journey

1. Complete Java Foundation through Functional Java.
2. Complete the Multithreading war campaign.
3. Complete Spring Core through Persistence.
4. Add rank trials and remediation paths.
5. Add starter-project versioning and download strategy.
6. Add section-level progress tracking.

### P2 — Complete professional readiness

1. Security, resilience and observability campaigns.
2. Selectable capstone domains.
3. Incident and architecture side quests.
4. Content analytics and review dashboard.
5. Upload and automated validation design.

### P3 — Expansion after proof

1. Additional language tracks.
2. CMS authoring interface.
3. Mentor or peer review.
4. Optional AI-based explanations and feedback with provider abstraction.

---

## 25. Product-readiness gate

The current ChatGPT-hosted platform should not move into independent infrastructure migration solely because the code is portable. The learning product is ready for migration when:

- the dependency map is approved;
- pilot missions pass beginner testing;
- Java foundations, multithreading and Spring foundations meet the content definition of done;
- assessment and evidence rules are stable;
- progress and route behaviour are reliable;
- reward and side-quest systems support rather than distract;
- the product owner approves a tagged content baseline.

At that point, this plan's product outputs become the stable baseline for Phase 1 of `FUTURE-MIGRATION-TRACKER.md`.

---

## 26. Final product test

LevelCraft succeeds when a beginner can answer all of the following without guessing:

- What am I learning?
- Why does it exist?
- What did applications do before this abstraction?
- Where will I use it?
- What are the alternatives and trade-offs?
- Which file should I change?
- What code do I start from?
- How do I run it?
- What should happen?
- How do I know that I completed it correctly?
- How does this help the next mission?

If any mission cannot answer those questions, it is not ready—regardless of how polished its visuals or rewards appear.

