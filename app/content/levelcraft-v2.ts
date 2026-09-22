import type { LearningTrack } from "./curriculum";

// Side quests, capstones and deep dives belong to the learning-content layer.

export type SideQuest = {
  id: string;
  unlockAfter: number;
  type: "Foundation" | "Debugging" | "Decision" | "Refactoring" | "Incident";
  threat: "Normal" | "Elite" | "Nightmare";
  title: string;
  brief: string;
  skills: string[];
  requirements: string[];
  hint: string;
  xp: number;
  reward: { kind: "Sticker" | "Quote" | "Title"; name: string; detail: string };
};

export type CapstoneOption = {
  id: string;
  title: string;
  domain: string;
  brief: string;
  coreFeatures: string[];
  hardMode: string;
};

export type FocusModule = {
  title: string;
  purpose: string;
  concepts: string[];
  challenge: string;
};

export const focusModules: Partial<Record<LearningTrack, Record<number, FocusModule[]>>> = {
  Java: {
    2: [
      { title:"Records in Java 17", purpose:"Model transparent immutable data without repetitive constructors, accessors, equals, hashCode and toString.", concepts:["Record components and canonical constructors","Validation in compact constructors","Records are shallowly immutable","When a normal class is the better model"], challenge:"Replace a mutable registration DTO with a validated record, then explain why an Account entity should remain a class." },
    ],
    3: [
      { title:"Interfaces as contracts", purpose:"Separate business policy from replaceable implementations.", concepts:["Abstract, default and static interface methods","Functional interfaces","Contract design and substitution","When not to create an interface"], challenge:"Design one PaymentGateway contract that supports card and wallet adapters without leaking vendor types." },
      { title:"Lambdas and method references", purpose:"Pass behavior as data while keeping intent readable.", concepts:["Lambda parameters and captured variables","Effectively final variables","Predicate, Function, Consumer and Supplier","Method references versus explicit lambdas"], challenge:"Create reusable validation rules with Predicate and explain which form is clearest to a new maintainer." },
    ],
    4: [
      { title:"Stream API from source to terminal operation", purpose:"Transform collections declaratively without hiding stateful behavior.", concepts:["Lazy intermediate operations","filter, map, flatMap and sorted","collect, reduce and groupingBy","Optional and empty results","Why parallelStream is not a free speed boost"], challenge:"Build a transaction summary grouped by account and currency, then compare the stream version with a loop." },
    ],
    6: [
      { title:"Thread model and lifecycle", purpose:"Understand what Java schedules before adding concurrency.", concepts:["NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING and TERMINATED","start versus run","Interruption and cooperative cancellation","Daemon threads and shutdown"], challenge:"Trace two worker threads and predict every legal state transition." },
      { title:"Race conditions and the Java Memory Model", purpose:"Recognise why code can look correct but fail under timing and visibility changes.", concepts:["Atomicity, visibility and ordering","Happens-before relationships","volatile guarantees and limitations","Safe publication and immutable state"], challenge:"Reproduce a lost update, then repair it without using sleep as coordination." },
      { title:"Synchronization toolkit", purpose:"Choose the smallest correct mechanism for shared state.", concepts:["synchronized blocks and intrinsic locks","ReentrantLock and tryLock","AtomicInteger and compare-and-set","ConcurrentHashMap and blocking queues","CountDownLatch and Semaphore"], challenge:"Protect an inventory reservation workflow and explain why an atomic counter alone cannot protect a multi-step invariant." },
      { title:"Executors and task design", purpose:"Control capacity, queues, failures and shutdown on Java 17.", concepts:["ExecutorService and pool sizing","Callable, Future and timeouts","CompletableFuture composition","Bounded queues and rejection","Graceful shutdown"], challenge:"Query three suppliers concurrently with timeouts and return the cheapest successful quote." },
      { title:"Concurrency failures and diagnostics", purpose:"Find failures that ordinary happy-path tests miss.", concepts:["Deadlock, livelock and starvation","Thread dumps and lock ownership","Blocking I/O versus CPU-bound work","Deterministic concurrency tests","Java 17 boundary: no virtual threads"], challenge:"Diagnose a two-lock deadlock from a thread dump and redesign lock ordering." },
    ],
  },
  "Spring Boot": {
    0: [
      { title:"Constructor, setter and field injection", purpose:"Understand every injection style before choosing the default.", concepts:["Constructor injection for required dependencies and immutability","Setter injection for genuinely optional/reconfigurable dependencies","Field injection and its hidden dependencies/testing cost","@Qualifier and @Primary when multiple beans match"], challenge:"Refactor the same notification service through all three styles and defend the production choice." },
      { title:"Bean discovery and lifecycle", purpose:"Understand how configuration becomes managed objects.", concepts:["Component scanning","@Component, @Service, @Repository and @Controller","@Configuration and @Bean","Bean scopes and lifecycle hooks"], challenge:"Predict which objects become beans and which DTOs/value objects should remain plain Java." },
    ],
    4: [
      { title:"Transaction boundaries", purpose:"Keep data changes atomic without stretching database locks across remote calls.", concepts:["Proxy-based @Transactional behavior","Rollback rules","Propagation and isolation","N+1 queries and fetch strategy"], challenge:"Repair an order workflow whose remote payment call occurs inside a long database transaction." },
    ],
    7: [
      { title:"Resilient service collaboration", purpose:"Contain downstream failure instead of creating a cascading outage.", concepts:["Timeouts before retries","Exponential backoff and jitter","Circuit breakers","Bulkheads","Idempotency keys"], challenge:"Choose a policy for a payment lookup and explain which failures must never be retried." },
    ],
  },
};

export const sideQuests: Record<LearningTrack, SideQuest[]> = {
  Java: [
    { id:"java-input-gauntlet", unlockAfter:1, type:"Foundation", threat:"Normal", title:"The Input Gauntlet", brief:"Harden a command-line banking menu against malformed input, impossible values and endless retry loops.", skills:["Control flow","Validation","Defensive input"], requirements:["Reject malformed values without crashing","Bound every retry loop","Keep validation messages specific","Demonstrate three edge cases"], hint:"Separate parsing failure from business-rule failure.", xp:120, reward:{kind:"Sticker",name:"Guard Clause Goblin",detail:"An original LevelCraft sticker for defeating nested validation."} },
    { id:"java-contract-refactor", unlockAfter:3, type:"Refactoring", threat:"Elite", title:"The Coupling Curse", brief:"Rescue a checkout service that constructs payment, email and clock dependencies internally.", skills:["Interfaces","Constructor injection","Lambdas"], requirements:["Extract only meaningful contracts","Inject required collaborators","Use a test fake","Explain why field injection would hide the problem"], hint:"Start from the collaborators that cross infrastructure boundaries.", xp:220, reward:{kind:"Quote",name:"Visible Dependencies",detail:"“A dependency named is a dependency that can be controlled.”"} },
    { id:"java-stream-ledger", unlockAfter:5, type:"Decision", threat:"Elite", title:"Ledger of a Thousand Rows", brief:"Choose loops, streams and records deliberately while producing an immutable financial summary.", skills:["Records","Collections","Streams"], requirements:["Group by account and currency","Handle empty data","Avoid stateful stream operations","Compare the loop and stream designs"], hint:"Correctness and explainability outrank cleverness.", xp:240, reward:{kind:"Sticker",name:"Stream Surfer",detail:"Awarded for reaching the terminal operation without drowning in side effects."} },
    { id:"java-race-hunter", unlockAfter:6, type:"Debugging", threat:"Nightmare", title:"Race Condition Hunt", brief:"Investigate missing inventory updates that appear only under concurrent load.", skills:["Java Memory Model","Synchronization","Concurrent collections"], requirements:["Reproduce the race repeatedly","Identify the non-atomic workflow","Implement two valid fixes","Compare their contention and clarity"], hint:"Read-modify-write is more than one operation even when each individual read is safe.", xp:380, reward:{kind:"Title",name:"Race Hunter",detail:"Displayed on the Hunter Profile after defeating nondeterministic state."} },
    { id:"java-deadlock-dungeon", unlockAfter:6, type:"Incident", threat:"Nightmare", title:"Deadlock Dungeon", brief:"A transfer service has frozen in production. Read the evidence, identify the lock cycle and restore safe ordering.", skills:["Thread dumps","Locks","Incident reasoning"], requirements:["Identify both lock owners","Draw the wait cycle","Apply deterministic lock ordering","Propose monitoring and a regression test"], hint:"Sort resource identifiers before acquiring more than one lock.", xp:420, reward:{kind:"Sticker",name:"Deadlock Breaker",detail:"Two shattered locks—proof that adding sleep is not debugging."} },
    { id:"java-architecture-tribunal", unlockAfter:8, type:"Decision", threat:"Nightmare", title:"Architecture Tribunal", brief:"Defend the boundaries of a financial account service under persistence, audit and reliability constraints.", skills:["Architecture","Transactions","Testing"], requirements:["Define domain and application responsibilities","Place the transaction boundary","Identify consistency risks","Defend one rejected alternative"], hint:"A diagram without dependency direction is decoration, not architecture.", xp:450, reward:{kind:"Quote",name:"Production Oath",detail:"“Working code is the entry fee. Operable code is the profession.”"} },
  ],
  "Spring Boot": [
    { id:"spring-injection-arena", unlockAfter:0, type:"Decision", threat:"Normal", title:"Injection Arena", brief:"Implement one service with constructor, setter and field injection, then choose the correct style for each dependency.", skills:["DI styles","Testability","Immutability"], requirements:["Implement all three styles","Test without loading Spring","Identify required versus optional dependencies","Explain the field-injection trade-off"], hint:"Ask whether an object can be valid without the dependency.", xp:160, reward:{kind:"Sticker",name:"Bean Whisperer",detail:"An original bean familiar that follows explicit dependencies."} },
    { id:"spring-autoconfig-autopsy", unlockAfter:1, type:"Debugging", threat:"Elite", title:"Auto-Configuration Autopsy", brief:"Explain why Boot created one bean, backed away from another and failed on a third.", skills:["Auto-configuration","Conditions","Configuration properties"], requirements:["Read a condition report","Identify a missing class/property/bean","Override one default safely","Avoid copying random annotations"], hint:"Auto-configuration is conditional configuration, not magic.", xp:220, reward:{kind:"Quote",name:"No Magic",detail:"“When the framework feels magical, inspect the condition.”"} },
    { id:"spring-broken-api-clinic", unlockAfter:3, type:"Refactoring", threat:"Elite", title:"Broken API Clinic", brief:"Repair an API that exposes entities, returns 200 for every failure and logs sensitive data.", skills:["REST contracts","DTOs","Validation","Error handling"], requirements:["Separate request/response DTOs","Use correct status codes","Return a stable error contract","Remove sensitive logging"], hint:"Treat the API contract as a product boundary, not a database window.", xp:280, reward:{kind:"Sticker",name:"500 Slayer",detail:"Unlocked after turning mysterious failures into useful contracts."} },
    { id:"spring-transaction-trap", unlockAfter:4, type:"Debugging", threat:"Nightmare", title:"The Transaction Trap", brief:"An order commits partially and a lazy relationship explodes outside the transaction. Find both causes.", skills:["JPA","Transactions","Fetch strategy"], requirements:["Identify the real transaction boundary","Explain proxy/self-invocation behavior","Remove the N+1 query","Add an integration test"], hint:"Trace where the proxied public method is entered—not merely where the annotation appears.", xp:360, reward:{kind:"Title",name:"Keeper of Transactions",detail:"For protecting atomic work without worshipping annotations."} },
    { id:"spring-outage-simulation", unlockAfter:7, type:"Incident", threat:"Nightmare", title:"Downstream Outage Simulation", brief:"Stop a slow supplier service from exhausting every request thread in your application.", skills:["Timeouts","Resilience","Idempotency","Capacity"], requirements:["Define timeouts","Use bounded retries","Add a circuit breaker decision","Protect repeated writes with idempotency"], hint:"Retrying faster can make an outage worse.", xp:420, reward:{kind:"Sticker",name:"Circuit Breaker",detail:"A neon shield awarded for containing cascading failure."} },
    { id:"spring-production-war-room", unlockAfter:8, type:"Incident", threat:"Nightmare", title:"Production War Room", brief:"Investigate rising latency and error rates using logs, metrics, health data and deployment history.", skills:["Actuator","Metrics","Logging","Incident response"], requirements:["Choose the first three signals","Separate mitigation from root-cause work","Define one actionable alert","Write a concise incident review"], hint:"Begin with impact and recent change before chasing the loudest log line.", xp:460, reward:{kind:"Quote",name:"War Room Rule",detail:"“Stabilise first. Explain second. Prevent the repeat.”"} },
  ],
};

export const capstoneOptions: Record<LearningTrack, CapstoneOption[]> = {
  Java: [
    { id:"commerce", title:"E-Commerce Order Engine", domain:"Retail", brief:"Build pricing, inventory, promotions, checkout and fulfilment workflows in Java 17.", coreFeatures:["Order and product domain","Promotion rules","Concurrent inventory reservation","Payment port and test fake","Audit-ready tests"], hardMode:"Handle duplicate checkout requests and concurrent stock depletion." },
    { id:"library", title:"Library Management System", domain:"Education", brief:"Manage catalogues, members, loans, reservations, fines and notifications.", coreFeatures:["Loan invariants","Reservation queue","Fine calculation","Search and reporting","Persistent repository boundary"], hardMode:"Resolve concurrent reservations for the final available copy." },
    { id:"accounts", title:"Financial Account Ledger", domain:"FinTech", brief:"Model accounts, transfers, holds, statements and immutable ledger entries.", coreFeatures:["BigDecimal money","Double-entry rules","Concurrent transfers","Idempotency","Reconciliation report"], hardMode:"Guarantee safe transfers between accounts without deadlock." },
    { id:"trading", title:"Stock Trading Simulator", domain:"Capital Markets", brief:"Process market prices, orders, positions, executions and portfolio valuation.", coreFeatures:["Order types","Price stream processing","Concurrent matching simulation","Position records","Risk limits"], hardMode:"Process bursts without corrupting order priority or portfolio state." },
    { id:"student", title:"Student Registration Platform", domain:"Education", brief:"Manage courses, students, enrolment rules, schedules and results.", coreFeatures:["Registration rules","Capacity control","Wait-list","Result processing","Reports and tests"], hardMode:"Prevent duplicate enrolment during concurrent registration." },
  ],
  "Spring Boot": [
    { id:"commerce", title:"E-Commerce Platform API", domain:"Retail", brief:"Deliver a secure order, inventory and payment-ready REST platform.", coreFeatures:["REST contracts","PostgreSQL/JPA","Transactions","Security","Metrics and tests"], hardMode:"Add idempotent checkout and resilient supplier integration." },
    { id:"library", title:"Library Operations API", domain:"Education", brief:"Expose catalogue, membership, lending, reservations and fine management.", coreFeatures:["DTO validation","JPA relationships","Role authorization","Scheduled reminders","Integration tests"], hardMode:"Add reservation events and an operational dashboard." },
    { id:"accounts", title:"Financial Account Service", domain:"FinTech", brief:"Build account, transfer, ledger and statement APIs with strict auditability.", coreFeatures:["Transactional transfers","Immutable ledger","Authentication and authorization","Idempotency","Audit and observability"], hardMode:"Add failure-safe integration with a payment network." },
    { id:"trading", title:"Stock Trading Backend", domain:"Capital Markets", brief:"Create order, execution, position and portfolio services with real-time concerns.", coreFeatures:["Order API","Optimistic locking","Event processing","Risk validation","Metrics"], hardMode:"Design an event-driven execution flow with replay-safe consumers." },
    { id:"student", title:"Student Registration Service", domain:"Education", brief:"Create an enterprise registration API from onboarding to course allocation.", coreFeatures:["Controller-service-repository layers","Validation","PostgreSQL/JPA","Security","Testing and deployment"], hardMode:"Add concurrent seat allocation and a wait-list event flow." },
  ],
};

export const rankNames = ["Unawakened","E Rank","D Rank","C Rank","B Rank","A Rank","S Rank","Legend"];
