# LevelCraft 2.0 — System Awakening

## Product promise

LevelCraft trains and verifies engineers. The main campaign teaches capability, side quests strengthen judgment, boss battles combine skills, and rank trials require evidence.

## Scope

- Java is capped at Java 17.
- Primary journeys: Java and Spring/Spring Boot.
- Every mission follows Briefing → Guided Training → Hunter Notes → Independent Quest → Rank Trial.
- The engineering loop is Learn → Build → Break → Fix → Prove → Ascend.
- Progress is measured across understanding, implementation, debugging, testing and operation.

## Java campaign

The Java journey covers runtime fundamentals, control flow, OOP, records, interfaces, lambdas, functional interfaces, collections, generics, Stream API, exceptions, testing, architecture and a production capstone.

Multithreading is a major campaign inside the journey:

1. Thread lifecycle and interruption
2. Java Memory Model, atomicity, visibility and ordering
3. synchronized, locks, atomics, concurrent collections and coordination primitives
4. ExecutorService, Future, CompletableFuture, capacity and shutdown
5. Deadlock, livelock, starvation, thread-dump diagnosis and deterministic testing

Virtual threads and structured concurrency are excluded because the platform targets Java 17.

## Spring and Spring Boot campaign

The journey covers Spring's purpose, IoC, ApplicationContext, beans, scanning, lifecycle, Spring Boot configuration, REST contracts, validation, error handling, JPA, transactions, security, testing, resilience and production operation.

Constructor, setter and field injection are all taught and implemented. Constructor injection remains the default for required dependencies, but the learner must understand the valid use and trade-offs of each style.

## Side quests

Each journey has six focused side quests, unlocked only after major milestones. Side quests remain optional and never block main progression.

Quest categories are limited to foundation, debugging, decision, refactoring and incident simulations. Java gives extra weight to race conditions and deadlocks; Spring gives extra weight to injection choices, transaction traps and outages.

## Rewards

Rewards are deterministic and intentionally limited:

- Original LevelCraft stickers
- Engineering quotes
- Profile titles
- Small completion and reward-reveal animations

No paid loot boxes, random duplicate drops, daily-grind requirements or power advantages are included.

## Capstone domains

Learners choose one capstone domain while meeting the same engineering quality bar:

- E-commerce
- Library management
- Financial account management
- Stock trading
- Student registration

Java capstones emphasise domain design, Java 17, concurrency, testing and architecture. Spring Boot capstones add REST contracts, PostgreSQL/JPA, security, resilience, observability and deployment evidence.

## Legend standard

Legend status requires an operable capstone, tested behaviour, debugging evidence, architectural decisions, security/reliability reasoning and a controlled incident or failure drill. XP alone cannot establish mastery.
