import type { LearningTrack } from "./curriculum";

// Guided explanations and labs are curriculum content, not UI behaviour.

export type TrainingDepth = {
  opening: string;
  scenario: string;
  prerequisites: { name: string; explanation: string }[];
  terms: { term: string; meaning: string; example: string }[];
  guided: { title: string; action: string; why: string; observe: string }[];
  coaching: { wrong: string; better: string; reason: string }[];
  coachQuestion: string;
};

const java: TrainingDepth[] = [
  {
    opening:"You are not expected to know how Java works yet. This mission starts with one question: what happens between writing a line of code and seeing a result on screen?",
    scenario:"Imagine sending cooking instructions to kitchens around the world. Java first converts your instructions into a common format—bytecode. Each computer's JVM then translates that common format for its own operating system.",
    prerequisites:[
      {name:"File",explanation:"A named piece of data on your computer. Java source files end in .java."},
      {name:"Command",explanation:"An instruction given to the computer, such as compiling or running a program."},
      {name:"Variable",explanation:"A named place that holds a value while the program runs."}
    ],
    terms:[
      {term:"JDK",meaning:"The development kit containing the compiler and tools used to build Java programs.",example:"javac is supplied by the JDK."},
      {term:"Compiler",meaning:"A program that checks source code and converts it into another form.",example:"javac OrderTotal.java creates OrderTotal.class."},
      {term:"Bytecode",meaning:"Java's operating-system-neutral compiled instructions.",example:"The .class file contains bytecode."},
      {term:"JVM",meaning:"The runtime that loads and executes Java bytecode on a particular machine.",example:"java OrderTotal starts a JVM and runs main."}
    ],
    guided:[
      {title:"Create the smallest program",action:"Create HelloHunter.java with a class and public static void main(String[] args). Print one message.",why:"main is the entry point—the first method Java calls for this console application.",observe:"Before compilation, only a readable .java source file exists."},
      {title:"Compile it",action:"Run javac HelloHunter.java.",why:"Compilation catches syntax and type errors before the program runs.",observe:"A HelloHunter.class file appears. This is bytecode, not another source file."},
      {title:"Run it",action:"Run java HelloHunter.",why:"The java launcher starts the JVM and asks it to execute the compiled class.",observe:"The JVM locates main and the message appears."},
      {title:"Break it safely",action:"Assign text to an int variable, compile, read the error, then repair it.",why:"Learning to read compiler feedback is a foundational debugging skill.",observe:"Compilation fails before any JVM execution begins."}
    ],
    coaching:[
      {wrong:"Java source runs directly because Java is interpreted.",better:"Source is normally compiled to bytecode, which the JVM executes and may further optimize.",reason:"This explains the difference between compile-time and runtime failures."},
      {wrong:"Use double for every decimal value.",better:"Use BigDecimal for exact money; use double for approximate measurements.",reason:"Binary floating point cannot represent many decimal fractions exactly."}
    ],
    coachQuestion:"If javac reports an incompatible-types error, has the JVM started executing your program yet? Explain why."
  },
  {
    opening:"Programs become useful when they can choose, repeat and reject bad input. You will build those abilities from individual conditions before combining them.",
    scenario:"An ATM does not begin by dispensing cash. It checks the request through a sequence of gates: Is the amount valid? Is it supported? Is the balance enough? Each gate either stops the request or lets it continue.",
    prerequisites:[
      {name:"Boolean",explanation:"A value that is either true or false."},
      {name:"Comparison",explanation:"An expression such as amount > 0 that produces a boolean."},
      {name:"Block",explanation:"Statements grouped inside braces and controlled together."}
    ],
    terms:[
      {term:"Branch",meaning:"A possible path through the program selected by a condition.",example:"if (age >= 18) chooses the adult path."},
      {term:"Guard clause",meaning:"An early check that rejects an invalid case before the main logic.",example:"if (amount <= 0) return INVALID;"},
      {term:"Loop",meaning:"A structure that repeats work while a rule remains true.",example:"for processes a known number of items."},
      {term:"Infinite loop",meaning:"A loop whose stopping condition is never reached.",example:"while(true) without a controlled break."}
    ],
    guided:[
      {title:"Write one decision",action:"Return VALID only when an amount is greater than zero.",why:"A single rule makes condition evaluation visible.",observe:"Zero and negative values follow the rejection branch."},
      {title:"Stack guard clauses",action:"Add denomination, balance and daily-limit checks one at a time.",why:"Each failure stays readable and produces one precise message.",observe:"The approved path remains at the bottom without deep nesting."},
      {title:"Trace the program",action:"On paper, trace which checks run for amounts -100, 250 and 2000.",why:"Tracing turns invisible control flow into a sequence you can reason about.",observe:"Later checks are skipped after an early return."},
      {title:"Add bounded repetition",action:"Process three withdrawal examples using a for loop.",why:"The iteration count is known, making for clearer than an open-ended while.",observe:"The validation method stays unchanged and reusable."}
    ],
    coaching:[
      {wrong:"Nest every condition inside the previous condition.",better:"Reject invalid states early with named guard clauses.",reason:"The successful path becomes easy to read and extend."},
      {wrong:"Use while(true) for every repeated task.",better:"Choose a loop whose stopping rule is explicit and bounded.",reason:"Unbounded loops can consume resources forever."}
    ],
    coachQuestion:"Which ATM validation should run first, and what makes that ordering easier to maintain?"
  },
  {
    opening:"A class is not merely a bag of fields. It is a boundary that protects valid state and provides meaningful behavior.",
    scenario:"A bank account should never allow a random screen to replace its balance. The account itself should decide whether a withdrawal is legal and perform the change safely.",
    prerequisites:[
      {name:"Object",explanation:"A runtime instance containing state and behavior defined by a class."},
      {name:"Method",explanation:"Named behavior an object or class can perform."},
      {name:"Constructor",explanation:"The operation that creates and initializes a new object."}
    ],
    terms:[
      {term:"Encapsulation",meaning:"Keeping state private and allowing controlled access through behavior.",example:"withdraw changes balance only after validation."},
      {term:"Invariant",meaning:"A rule that must always remain true for an object.",example:"An account balance cannot be negative."},
      {term:"Entity",meaning:"An object tracked by identity across changes.",example:"A bank account keeps the same account number."},
      {term:"Value object",meaning:"An immutable object defined by its value rather than identity.",example:"Money(100, INR) equals another Money(100, INR)."}
    ],
    guided:[
      {title:"Build an unsafe object",action:"Create an Account with a public balance field, then set it to a negative number.",why:"Seeing the failure makes the purpose of encapsulation concrete.",observe:"Any caller can violate the business rule."},
      {title:"Protect construction",action:"Make fields private and reject an invalid opening balance in the constructor.",why:"An object should be valid immediately after creation.",observe:"Invalid accounts can no longer be created normally."},
      {title:"Add behavior",action:"Create deposit and withdraw methods instead of setBalance.",why:"Business language communicates intent and centralizes rules.",observe:"Every balance change passes through the same validations."},
      {title:"Test the invariant",action:"Try zero, negative, exact-balance and over-balance withdrawals.",why:"Boundary examples reveal whether the invariant is truly protected.",observe:"Only valid transitions change state."}
    ],
    coaching:[
      {wrong:"Generate getters and setters for every field.",better:"Expose operations that represent allowed business behavior.",reason:"Generic setters allow invalid transitions and scatter rules."},
      {wrong:"Use inheritance whenever two classes share fields.",better:"Prefer composition unless one type can safely substitute for the other.",reason:"Shared structure alone does not establish an is-a relationship."}
    ],
    coachQuestion:"Why is setBalance(BigDecimal) more dangerous than deposit and withdraw methods?"
  },
  {
    opening:"Interfaces are useful when they protect business code from something that may change. You will create one only after seeing the coupling it removes.",
    scenario:"A checkout service that directly creates a card-payment client cannot switch to a wallet, cannot test without the network, and owns too many responsibilities.",
    prerequisites:[
      {name:"Dependency",explanation:"An object another object needs in order to do its job."},
      {name:"Constructor",explanation:"A creation boundary where required dependencies can be supplied."},
      {name:"Implementation",explanation:"Concrete code that fulfils a capability or contract."}
    ],
    terms:[
      {term:"Interface",meaning:"A contract describing what a collaborator can do without fixing how it does it.",example:"PaymentGateway exposes charge."},
      {term:"Composition",meaning:"Building behavior by combining collaborating objects.",example:"Checkout has a PaymentGateway."},
      {term:"Dependency inversion",meaning:"Business policy depends on a stable abstraction, while infrastructure implements it.",example:"Checkout depends on PaymentGateway, not StripeSdk."},
      {term:"Test fake",meaning:"A lightweight implementation used to observe behavior during tests.",example:"FakePaymentGateway records the charged amount."}
    ],
    guided:[
      {title:"Expose the coupling",action:"Write Checkout that constructs a CardGateway internally.",why:"The limitation must be visible before abstraction has meaning.",observe:"Tests would invoke or imitate external behavior awkwardly."},
      {title:"Extract the capability",action:"Define PaymentGateway with the smallest operation Checkout needs.",why:"The interface belongs to the business need, not the vendor API.",observe:"Checkout no longer needs vendor-specific types."},
      {title:"Inject the dependency",action:"Require PaymentGateway in the Checkout constructor.",why:"Required collaborators become explicit and immutable.",observe:"The compiler prevents creating an incomplete Checkout."},
      {title:"Prove replaceability",action:"Run the same checkout test with a fake, then wire a card implementation.",why:"A boundary earns its cost when implementations can change safely.",observe:"Business behavior is tested without network access."}
    ],
    coaching:[
      {wrong:"Create an interface for every class.",better:"Introduce an interface at a meaningful change or testing boundary.",reason:"Unnecessary abstractions add navigation without reducing coupling."},
      {wrong:"Fetch dependencies from a global service locator.",better:"Declare them in the constructor.",reason:"Hidden dependencies make objects harder to understand and test."}
    ],
    coachQuestion:"Which side should own the PaymentGateway contract: checkout policy or the payment vendor adapter? Why?"
  },
  {
    opening:"Collections answer different questions: ordered sequence, unique membership or lookup by key. You will choose by behavior before learning APIs.",
    scenario:"An inventory report receives duplicate warehouse rows, must combine them by SKU, identify shortages and return a predictable order.",
    prerequisites:[
      {name:"Array",explanation:"A fixed-size indexed sequence of values of one type."},
      {name:"Equality",explanation:"The rule Java uses to decide whether two values represent the same logical value."},
      {name:"Iteration",explanation:"Visiting each element of a group to process it."}
    ],
    terms:[
      {term:"List",meaning:"An ordered collection that permits duplicates.",example:"Lines in an order remain in display order."},
      {term:"Set",meaning:"A collection that keeps unique elements.",example:"A set removes duplicate permission names."},
      {term:"Map",meaning:"A collection associating unique keys with values.",example:"SKU points to its Product."},
      {term:"Generic",meaning:"A type parameter that preserves element types at compile time.",example:"List<Product> prevents adding a String."},
      {term:"Stream",meaning:"A pipeline describing transformations over data.",example:"filter low stock, map to alerts, then sort."}
    ],
    guided:[
      {title:"Choose by access pattern",action:"Write the question each collection must answer: position, membership or key lookup.",why:"Data-structure choice begins with required behavior.",observe:"List, Set and Map serve different questions."},
      {title:"Build the index",action:"Loop through stock rows and merge quantity into a Map keyed by SKU.",why:"The map makes duplicate consolidation explicit.",observe:"Each SKU has one accumulated value."},
      {title:"Transform safely",action:"Convert totals into immutable Alert records for shortages.",why:"Output records prevent callers from mutating internal calculations.",observe:"Only below-threshold SKUs remain."},
      {title:"Compare loop and stream",action:"Implement the final filter/sort once with a loop and once with a stream.",why:"The goal is clarity, not using the newest syntax.",observe:"Choose the version whose intent is easiest to explain."}
    ],
    coaching:[
      {wrong:"Use ArrayList for everything.",better:"Select List, Set or Map based on ordering, uniqueness and lookup needs.",reason:"The type should express and enforce the rule."},
      {wrong:"Call parallelStream to make code faster.",better:"Measure first and confirm the workload and execution environment are suitable.",reason:"Parallel overhead and shared resources can make it slower or unsafe."}
    ],
    coachQuestion:"Why is Map<String, Product> a better model than List<Product> for repeated lookup by SKU?"
  },
  {
    opening:"Failures are part of the program's contract. This mission separates user-correctable input, missing data and unexpected infrastructure failure.",
    scenario:"A registration form may contain three mistakes at once. The user needs all three corrections, while a database outage needs a different response and diagnostic trail.",
    prerequisites:[
      {name:"Method contract",explanation:"The inputs a method accepts, the result it promises and how failure is represented."},
      {name:"Call stack",explanation:"The chain of methods that led to the current operation."},
      {name:"Boundary",explanation:"A place where data or control crosses between layers or systems."}
    ],
    terms:[
      {term:"Exception",meaning:"An object describing an abnormal condition that interrupts normal flow.",example:"DatabaseUnavailable stops registration."},
      {term:"Validation error",meaning:"Expected feedback that lets a user correct supplied data.",example:"Email format is invalid."},
      {term:"Cause",meaning:"The original failure preserved inside a higher-level exception.",example:"RegistrationFailed wraps a database timeout."},
      {term:"Try-with-resources",meaning:"A construct that closes resources automatically.",example:"A file stream closes even when reading fails."}
    ],
    guided:[
      {title:"Classify failures",action:"Sort examples into correctable input, missing business data and infrastructure failure.",why:"Different failures require different handling and messages.",observe:"Not every failure should throw, retry or become a 500."},
      {title:"Collect validation issues",action:"Validate email, age and password without returning after the first error.",why:"A form user should fix all known problems in one round.",observe:"One result contains multiple field issues."},
      {title:"Translate a boundary failure",action:"Catch a repository-specific exception and throw RegistrationUnavailable with the original cause.",why:"Higher layers receive meaningful vocabulary without losing diagnostics.",observe:"The cause chain still contains the low-level failure."},
      {title:"Remove dangerous handling",action:"Find and replace a catch(Exception) block that logs and continues.",why:"Continuing with corrupted or incomplete state hides the real defect.",observe:"Failure becomes explicit and testable."}
    ],
    coaching:[
      {wrong:"Catch every exception so the app never crashes.",better:"Handle only failures you can resolve or translate; let others reach an owning boundary.",reason:"Swallowed failures create incorrect behavior and weak diagnostics."},
      {wrong:"Return null whenever something goes wrong.",better:"Use an explicit result, Optional for absence, or a meaningful exception.",reason:"Null does not explain what happened or what callers should do."}
    ],
    coachQuestion:"Why should an invalid password return validation feedback while a database outage should not?"
  },
  {
    opening:"Concurrency means multiple tasks can make progress during overlapping time. It does not automatically make work safe or faster.",
    scenario:"A dashboard needs a profile and recent orders from two independent services. Calling them one after another wastes time, but sharing mutable state can corrupt results.",
    prerequisites:[
      {name:"Task",explanation:"A unit of work that can be scheduled for execution."},
      {name:"Mutable state",explanation:"Data whose value can change after creation."},
      {name:"Blocking",explanation:"Waiting while a task cannot continue, such as waiting for a network response."}
    ],
    terms:[
      {term:"Thread",meaning:"An execution path scheduled by the runtime and operating system.",example:"Two threads can wait on two services concurrently."},
      {term:"Executor",meaning:"A component that accepts tasks and controls how they run.",example:"A fixed pool bounds active worker threads."},
      {term:"Race condition",meaning:"A defect where the result depends on unpredictable operation timing.",example:"Two increments lose one update."},
      {term:"Future",meaning:"A handle representing a result that may arrive later.",example:"profileFuture.get() waits for the profile."},
      {term:"Timeout",meaning:"A maximum wait before treating an operation as failed.",example:"A supplier call is abandoned after 500 ms."}
    ],
    guided:[
      {title:"Measure sequential work",action:"Simulate two one-second calls and run them one after another.",why:"A baseline proves whether concurrency provides value.",observe:"Total time is roughly two seconds."},
      {title:"Submit independent tasks",action:"Run both calls through an executor and combine their results.",why:"Independent waiting can overlap.",observe:"Total time approaches the slowest single call, not their sum."},
      {title:"Introduce a race",action:"Increment one shared counter from many tasks without protection.",why:"The defect demonstrates that an operation can contain multiple unsafe steps.",observe:"Some runs produce a smaller total than expected."},
      {title:"Remove shared mutation",action:"Return immutable task results and combine them after completion.",why:"Confinement is simpler and safer than coordinating writes.",observe:"Repeated runs become deterministic."}
    ],
    coaching:[
      {wrong:"Create a new Thread for every request.",better:"On Java 17, use a deliberately sized ExecutorService and define its queue, timeout and shutdown policy.",reason:"Execution capacity and lifecycle must be controlled; virtual threads are outside this Java 17 path."},
      {wrong:"Fix timing issues by adding sleep.",better:"Coordinate using futures, latches, locks or immutable task results.",reason:"Sleep guesses timing and makes failures intermittent."}
    ],
    coachQuestion:"If three supplier calls are independent, what must still be defined besides running them concurrently?"
  },
  {
    opening:"A test is executable evidence of behavior. You will start with one business rule, observe a failure, implement the smallest fix and then improve the design safely.",
    scenario:"A shipping calculator changes frequently. Without boundary tests, a small refactor can silently charge customers incorrectly.",
    prerequisites:[
      {name:"Expected value",explanation:"The result the requirement says should occur for a known input."},
      {name:"Deterministic",explanation:"The same controlled input always produces the same observable result."},
      {name:"Refactoring",explanation:"Improving internal structure without changing external behavior."}
    ],
    terms:[
      {term:"Unit test",meaning:"A fast test of focused behavior with controlled collaborators.",example:"Shipping fee for a total and zone."},
      {term:"Integration test",meaning:"A test proving components work across a real boundary.",example:"Repository mapping against PostgreSQL."},
      {term:"Assertion",meaning:"A check comparing actual behavior with the expected result.",example:"assertEquals(expected, actual)."},
      {term:"Test double",meaning:"A controlled replacement for a collaborator during testing.",example:"A fake clock returns a fixed time."}
    ],
    guided:[
      {title:"Name a behavior",action:"Write a test named returnsFreeShippingAtThreshold before implementation.",why:"The name describes the contract rather than the method internals.",observe:"The test initially fails for a useful reason."},
      {title:"Make it pass minimally",action:"Implement only enough logic for that behavior.",why:"Small feedback loops prevent speculative code.",observe:"The first test becomes green."},
      {title:"Add boundaries",action:"Test just below, exactly at and just above the threshold.",why:"Most rule defects hide at boundaries.",observe:"A comparison mistake becomes visible immediately."},
      {title:"Refactor with protection",action:"Remove duplicated branches while rerunning tests.",why:"Passing behavior tests create a safety net for structural change.",observe:"Design improves without changing results."}
    ],
    coaching:[
      {wrong:"Test private methods directly.",better:"Test observable behavior through the public contract.",reason:"Private structure should be free to change during refactoring."},
      {wrong:"Treat coverage percentage as proof of quality.",better:"Use coverage to find gaps, then assess whether meaningful risks are tested.",reason:"Lines can execute without checking correct outcomes."}
    ],
    coachQuestion:"Why do tests for just-below, exactly-at and just-above a threshold provide more value than three random values?"
  },
  {
    opening:"Architecture decides where rules live and which direction dependencies point. You will grow a small application from plain domain logic toward persistence without letting the database own the design.",
    scenario:"An order service must calculate totals, reserve inventory and save orders. If every concern lives in one class, changing the database or testing a rule becomes expensive.",
    prerequisites:[
      {name:"Layer",explanation:"A group of code with a related responsibility and dependency direction."},
      {name:"Persistence",explanation:"Storing state so it survives after the program stops."},
      {name:"Transaction",explanation:"A unit of work that commits completely or rolls back completely."}
    ],
    terms:[
      {term:"Domain",meaning:"Business concepts and rules independent of delivery technology.",example:"An Order decides whether it can be confirmed."},
      {term:"Application service",meaning:"Code that coordinates a use case across domain objects and ports.",example:"PlaceOrder loads, validates, reserves and saves."},
      {term:"Repository",meaning:"A domain-facing abstraction for loading and saving aggregates.",example:"OrderRepository finds an order by ID."},
      {term:"Adapter",meaning:"Infrastructure code translating a port to a technology.",example:"JdbcOrderRepository implements OrderRepository."},
      {term:"Transaction boundary",meaning:"The exact use-case scope that must succeed atomically.",example:"Saving an order and its lines commits together."}
    ],
    guided:[
      {title:"Separate the rule",action:"Implement order total and confirmation rules in plain Java with no database imports.",why:"Business behavior should run and test without infrastructure.",observe:"Unit tests require no framework or database."},
      {title:"Describe required persistence",action:"Create an OrderRepository contract using domain types.",why:"The use case states what it needs without choosing JDBC or JPA.",observe:"Application code depends inward on a stable vocabulary."},
      {title:"Coordinate the use case",action:"Build PlaceOrder with injected repository and inventory port.",why:"Application services orchestrate; entities protect their own rules.",observe:"Responsibilities become visible and replaceable."},
      {title:"Define atomic work",action:"Mark which writes must commit together and which remote calls cannot be rolled back.",why:"Transactions do not magically include external systems.",observe:"Failure and compensation decisions become explicit."}
    ],
    coaching:[
      {wrong:"Put every rule in controllers or repository classes.",better:"Keep domain policy in domain objects/services and orchestration in use cases.",reason:"Delivery and persistence technologies then change independently."},
      {wrong:"Keep a database transaction open across a slow remote call.",better:"Shorten the transaction and design an explicit consistency workflow.",reason:"Long locks reduce capacity and still cannot roll back the remote system."}
    ],
    coachQuestion:"Which part of placing an order belongs to the Order entity, and which part belongs to the application service?"
  },
  {
    opening:"The final Java trial is not a request to write everything at once. You will deliver one working vertical slice, prove it, and expand through controlled gates.",
    scenario:"A production-shaped order service must remain correct when input is bad, suppliers fail, requests repeat and maintainers change the code.",
    prerequisites:[
      {name:"Vertical slice",explanation:"A small feature completed through domain, application, persistence and interface layers."},
      {name:"Quality attribute",explanation:"A system property such as reliability, security, performance or maintainability."},
      {name:"Operational evidence",explanation:"Logs, metrics, tests and runbooks showing the system can be supported."}
    ],
    terms:[
      {term:"Idempotency",meaning:"Repeating the same request has no additional unintended effect.",example:"A retried order request does not create two orders."},
      {term:"Resilience",meaning:"The ability to handle failures without uncontrolled system collapse.",example:"A supplier timeout is bounded and reported."},
      {term:"ADR",meaning:"A short record of an important architectural decision and its trade-offs.",example:"Choose modular monolith before microservices."},
      {term:"Runbook",meaning:"Actionable operational instructions for detecting and responding to failure.",example:"Steps for investigating stuck order processing."}
    ],
    guided:[
      {title:"Choose the first slice",action:"Deliver create-order with validation, domain calculation, in-memory repository and tests.",why:"A complete small path exposes integration risks earlier than isolated layers.",observe:"One useful behavior works end to end."},
      {title:"Add durable persistence",action:"Replace the repository adapter while keeping domain and use-case tests unchanged.",why:"The architecture should protect policy from infrastructure change.",observe:"Only adapter and integration tests expand."},
      {title:"Inject controlled failure",action:"Make the supplier timeout and repeat the same request.",why:"Reliability claims need evidence under failure.",observe:"Timeout is bounded and idempotency prevents duplicates."},
      {title:"Prepare the handover",action:"Write an ADR, service overview and incident runbook from observed behavior.",why:"Enterprise readiness includes another engineer operating the system.",observe:"Decisions and recovery steps are reproducible."}
    ],
    coaching:[
      {wrong:"Start with microservices because the project is enterprise.",better:"Start with clear modular boundaries and split only for proven operational reasons.",reason:"Distribution adds failure modes, latency and deployment complexity."},
      {wrong:"Call the project complete when it works once locally.",better:"Require tests, repeatable build, failure evidence and operating instructions.",reason:"Deployability is broader than feature correctness."}
    ],
    coachQuestion:"What is the smallest vertical slice that proves your architecture before you add concurrency and persistence?"
  }
];

const spring: TrainingDepth[] = [
  {
    opening:"Spring is not annotation magic. It is an object factory and wiring system. This mission begins with ordinary Java objects. You will understand the repository, service and manual wiring first; only then will Spring take responsibility for creating and connecting them.",
    scenario:"A StudentService registers students but should not also decide where they are stored. StudentRepository is a small storage contract. The first implementation uses an in-memory Map—no database, JPA or Spring Data. Once that plain Java design works, Spring can create and connect the same collaborators.",
    prerequisites:[
      {name:"Class and object",explanation:"A class defines a type; an object is a created instance of that type."},
      {name:"Constructor",explanation:"The operation used to create an object and supply required starting values."},
      {name:"Interface",explanation:"A contract that lets code depend on a capability instead of one concrete implementation."},
      {name:"Repository in this mission",explanation:"A plain Java storage boundary with save and find operations. It is not a database feature yet; the first version stores students in a Map."}
    ],
    terms:[
      {term:"Dependency",meaning:"An object a class needs to perform its responsibility.",example:"StudentService needs StudentRepository."},
      {term:"Dependency Injection",meaning:"Supplying dependencies from outside instead of constructing them inside the class.",example:"StudentService receives its repository in the constructor."},
      {term:"Inversion of Control",meaning:"Your code gives object creation and wiring control to a container.",example:"Spring decides when to create StudentService."},
      {term:"Bean",meaning:"An object created and managed by the Spring container.",example:"A @Service discovered during scanning becomes a bean."},
      {term:"ApplicationContext",meaning:"Spring's container: the registry and factory holding bean definitions and managed objects.",example:"It resolves the repository needed by the service."}
    ],
    guided:[
      {title:"Run the supplied plain Java example",action:"Copy the Student, StudentRepository, InMemoryStudentRepository and StudentService starter code. Import java.util.Map, HashMap, Optional and Objects; place the wiring statements in main, run it, then retrieve S-001 from the repository.",why:"You need a working baseline and must understand why the repository exists before Spring or injection styles are introduced.",observe:"The Map stores the student. StudentService uses only the repository contract and knows nothing about Map or a database."},
      {title:"Trace manual constructor injection",action:"On paper, draw repository → StudentService. Remove the constructor argument and observe why StudentService can no longer be created correctly, then restore it.",why:"Constructor injection is ordinary object construction: a required collaborator is supplied when the object is born.",observe:"Every successfully created StudentService has a non-null repository and can immediately perform its job."},
      {title:"Compare setter injection separately",action:"Create StudentServiceWithSetter with a setRepository method. Instantiate it without calling the setter, observe the invalid state, then inject and run it.",why:"Setter injection can be useful for a truly optional or deliberately replaceable collaborator, but it allows construction before configuration.",observe:"The service can temporarily exist without its repository; the caller must remember a second setup step."},
      {title:"Compare field injection separately",action:"Create StudentServiceWithField with @Autowired on a repository field. Notice that new StudentServiceWithField() leaves the field null outside Spring; start Spring only after making that observation.",why:"Field injection works through container reflection, but the Java constructor no longer communicates what the class requires.",observe:"Plain unit construction cannot supply the dependency normally, and final immutability is lost."},
      {title:"Let Spring manage the constructor version",action:"Mark InMemoryStudentRepository with @Repository and StudentService with @Service. Keep the single constructor unannotated and retrieve StudentService from ApplicationContext.",why:"Component scanning registers both types; Spring resolves the constructor parameter and performs the same wiring you did manually.",observe:"The container creates one valid StudentService and supplies the discovered repository bean."},
      {title:"Choose by dependency contract",action:"Keep required StudentRepository in the constructor. Add an optional AuditSink only after defining a safe no-op default, then compare whether a setter is justified.",why:"Required and optional collaborators have different validity rules.",observe:"The chosen style now follows the object's contract rather than a memorized slogan."},
      {title:"Break scanning deliberately",action:"Move the repository outside the scan path, run, read the failure, then repair the package layout.",why:"A failed experiment makes component scanning concrete.",observe:"Startup reports that no StudentRepository bean is available."},
      {title:"Inspect the container",action:"Print selected bean names or request StudentService from ApplicationContext in a small runner.",why:"The container becomes observable rather than magical.",observe:"The same singleton service instance is returned within one context."}
    ],
    coaching:[
      {wrong:"Spring removes the need to understand object construction.",better:"Design plain Java objects first; use Spring to assemble application-level collaborators.",reason:"Framework wiring cannot rescue unclear responsibilities."},
      {wrong:"Use @Autowired on private fields because it is shorter.",better:"Implement field injection in the comparison lab, then use constructor injection for required production dependencies.",reason:"Field injection works, but hides the construction contract and makes plain unit testing and immutability harder."},
      {wrong:"Assume setter injection is always wrong.",better:"Use a setter only when a collaborator is genuinely optional or intentionally reconfigurable and a safe default exists.",reason:"The choice should describe the object's validity rules rather than follow a slogan."},
      {wrong:"Make every object a bean.",better:"Keep DTOs, entities and value objects as ordinary objects unless the container must manage them.",reason:"Container ownership should serve lifecycle or application wiring."}
    ],
    coachQuestion:"After running all three versions, which ones allow StudentService to exist without a repository, and why does that matter for testing and correctness?"
  },
  {
    opening:"Spring Boot is Spring with an opinionated startup system. You will inspect what it configures, why it chooses that configuration and how your own bean or property changes the decision.",
    scenario:"Without Boot, you select libraries, create a web server, register infrastructure and configure defaults. Boot reads the classpath and properties, then supplies sensible conditional configuration.",
    prerequisites:[
      {name:"Classpath",explanation:"The libraries and compiled classes available to the application."},
      {name:"Configuration",explanation:"Values and object definitions controlling how an application behaves."},
      {name:"Dependency",explanation:"A library declared in the build or an object required by another object."}
    ],
    terms:[
      {term:"Starter",meaning:"A curated dependency group for a capability.",example:"spring-boot-starter-web supplies the web stack."},
      {term:"Auto-configuration",meaning:"Conditional bean configuration selected from the classpath and application state.",example:"A web server is configured when web classes are present."},
      {term:"Conditional bean",meaning:"A bean created only when stated conditions match.",example:"Back off when the application provides its own bean."},
      {term:"External configuration",meaning:"Values supplied outside compiled code.",example:"application.yml or an environment variable sets a URL."},
      {term:"Configuration properties",meaning:"Typed binding of related settings into one validated object.",example:"storage.bucket maps to StorageProperties.bucket."}
    ],
    guided:[
      {title:"Start from Initializr",action:"Create a minimal application with only Spring Web and run it.",why:"A small dependency set makes Boot's contribution easier to inspect.",observe:"An embedded server starts without manual server creation."},
      {title:"Inspect conditions",action:"Run with the conditions report and locate web auto-configuration matches.",why:"The report explains why configuration was or was not selected.",observe:"Classpath and missing-bean conditions are visible."},
      {title:"Bind typed settings",action:"Create validated StorageProperties for endpoint, bucket and timeout.",why:"Typed configuration fails early and avoids scattered string lookups.",observe:"Values bind from YAML or environment variables."},
      {title:"Fail startup intentionally",action:"Remove a required property and run the app.",why:"Invalid deployment configuration should fail before serving traffic.",observe:"Startup points to the exact invalid property."},
      {title:"Override deliberately",action:"Provide your own client bean and confirm auto-configuration backs off.",why:"Boot provides defaults without taking control away.",observe:"Your application-defined bean becomes the selected implementation."}
    ],
    coaching:[
      {wrong:"Add many starters until the error disappears.",better:"Add the smallest capability starter and inspect dependency/configuration reports.",reason:"Unnecessary libraries increase startup, attack surface and confusion."},
      {wrong:"Hard-code production URLs in Java.",better:"Use validated external configuration with environment-specific values.",reason:"The same build should move safely across environments."}
    ],
    coachQuestion:"What evidence would prove that Boot configured a bean because of a classpath condition rather than an annotation you wrote?"
  },
  {
    opening:"A REST controller is a translation boundary, not the home of the business. You will follow one request from JSON to validated command to response.",
    scenario:"A client submits student data. The API must reject malformed fields, enforce business uniqueness and return a stable contract without exposing database entities.",
    prerequisites:[
      {name:"HTTP request",explanation:"A method, URL, headers and optional body sent to a server."},
      {name:"JSON",explanation:"A text format commonly used to represent request and response data."},
      {name:"Status code",explanation:"A standardized numeric summary of an HTTP outcome."}
    ],
    terms:[
      {term:"Controller",meaning:"The web adapter translating HTTP into application calls and results.",example:"POST /students calls RegisterStudent."},
      {term:"DTO",meaning:"A data shape created specifically for an external boundary.",example:"RegisterStudentRequest contains accepted JSON fields."},
      {term:"Serialization",meaning:"Converting objects to or from a transfer format.",example:"Jackson converts JSON into a request DTO."},
      {term:"Bean Validation",meaning:"Declarative checks for structural input rules.",example:"@Email rejects malformed email text."},
      {term:"Idempotent",meaning:"Repeating an operation has the same intended effect as performing it once.",example:"PUT commonly has idempotent semantics."}
    ],
    guided:[
      {title:"Define the contract first",action:"Write one valid request JSON, one response JSON and three invalid examples.",why:"The public contract should be clear before controller code.",observe:"Required fields and outcome semantics become explicit."},
      {title:"Create request and response DTOs",action:"Model only API fields and add structural validation annotations.",why:"DTOs prevent persistence changes from leaking into clients.",observe:"Malformed requests fail before business logic runs."},
      {title:"Map to a use-case command",action:"Translate the request DTO and call RegisterStudent.",why:"The application layer should not depend on HTTP annotations.",observe:"Controller code remains small and testable."},
      {title:"Return correct creation semantics",action:"Return 201 with a Location header and a response DTO.",why:"HTTP semantics help clients integrate predictably.",observe:"The response points to the newly created resource."},
      {title:"Separate business conflict",action:"Map duplicate email to 409 instead of treating it as field-format validation.",why:"Malformed data and conflicting valid data are different failures.",observe:"Clients receive actionable, stable outcomes."}
    ],
    coaching:[
      {wrong:"Return JPA entities directly from controllers.",better:"Map between API DTOs and application/domain types.",reason:"Persistence shape, lazy loading and sensitive fields must not define the contract."},
      {wrong:"Put uniqueness checks only in frontend JavaScript.",better:"Enforce them server-side and with a database constraint.",reason:"Clients are untrusted and concurrent requests can race."}
    ],
    coachQuestion:"Why are @Email validation and 'email must be unique' different kinds of rules?"
  },
  {
    opening:"A production API is defined as much by failure behavior as by success. You will design one error vocabulary that helps clients and operators without leaking internals.",
    scenario:"The same student endpoint can encounter invalid JSON, a duplicate email, a missing record or an unexpected database failure. Each needs a deliberate response.",
    prerequisites:[
      {name:"Exception",explanation:"A Java object representing an abnormal condition that interrupts normal flow."},
      {name:"Log",explanation:"A timestamped operational record intended for diagnosis."},
      {name:"Request lifecycle",explanation:"The sequence from receiving an HTTP request through returning its response."}
    ],
    terms:[
      {term:"Exception handler",meaning:"Central code translating known failures into HTTP responses.",example:"@RestControllerAdvice maps StudentNotFound to 404."},
      {term:"ProblemDetail",meaning:"Spring's structured representation of an HTTP problem.",example:"It carries status, title and safe custom fields."},
      {term:"Correlation ID",meaning:"An identifier connecting logs and calls for one request.",example:"The response and log share the same ID."},
      {term:"Metric",meaning:"A numeric time-series signal used to monitor behavior.",example:"HTTP error rate over five minutes."},
      {term:"Cardinality",meaning:"The number of distinct values a metric label can have.",example:"customerId creates unbounded cardinality."}
    ],
    guided:[
      {title:"Create an error matrix",action:"List failure, HTTP status, safe code, client message and logging level.",why:"Consistency begins as a contract, not scattered catch blocks.",observe:"Known and unexpected failures have different treatment."},
      {title:"Centralize mapping",action:"Implement handlers for validation, duplicate and not-found exceptions.",why:"Controllers should focus on successful translation.",observe:"Every controller produces the same problem shape."},
      {title:"Add correlation",action:"Generate or accept a correlation ID, put it in logging context and return it safely.",why:"Operators need to connect one client failure to its logs.",observe:"A reported ID finds the relevant request trail."},
      {title:"Measure outcomes",action:"Track request count, error count and latency using bounded labels.",why:"Metrics reveal trends that individual logs cannot.",observe:"A dashboard can show rate, failures and p95 latency."}
    ],
    coaching:[
      {wrong:"Return exception.getMessage() to the client.",better:"Return a stable safe code and message; keep technical detail in protected logs.",reason:"Exception text may expose schema, implementation or sensitive data."},
      {wrong:"Log the same failure in every layer.",better:"Preserve the cause and log once where the failure is handled.",reason:"Duplicate stack traces create noise without new evidence."}
    ],
    coachQuestion:"Which information belongs in a client error response, and which belongs only in operational logs?"
  },
  {
    opening:"JPA maps objects to relational data, but the database still executes SQL and enforces durable rules. You will observe both sides instead of treating repositories as magic.",
    scenario:"Two users can attempt registration with the same email at nearly the same time. Application checks help the message, but only the database constraint closes the race.",
    prerequisites:[
      {name:"Table and row",explanation:"A relational table defines columns; each row stores one record."},
      {name:"Primary key",explanation:"A value that uniquely identifies a stored row."},
      {name:"SQL",explanation:"The language used to query and modify relational data."}
    ],
    terms:[
      {term:"Entity",meaning:"A class mapped to persisted identity and lifecycle.",example:"Student maps to the students table."},
      {term:"Repository",meaning:"An interface exposing the persistence operations the application needs.",example:"findByEmail retrieves a student."},
      {term:"Persistence context",meaning:"The unit tracking managed entities and their changes.",example:"Dirty checking updates a modified managed Student at commit."},
      {term:"Transaction",meaning:"A unit of work that commits fully or rolls back fully.",example:"Enrollment and seat decrement succeed together."},
      {term:"N+1 query",meaning:"One initial query followed by one query per result due to relationship access.",example:"Loading 100 students triggers 101 queries."}
    ],
    guided:[
      {title:"Design the table first",action:"Write students columns, nullability, primary key and unique email constraint.",why:"Database rules must be intentional, not accidental ORM output.",observe:"The durable model is clear before annotations."},
      {title:"Map one entity",action:"Create Student with explicit column rules and no unnecessary relationships.",why:"Simple mapping reduces hidden loading and lifecycle behavior.",observe:"Generated SQL can be compared with the intended schema."},
      {title:"Trace a transaction",action:"Load a student, change state and observe SQL at commit.",why:"Managed entity changes may persist without an explicit save call.",observe:"Dirty checking and transaction scope become visible."},
      {title:"Expose N+1",action:"List students and access a lazy relationship while SQL logging is enabled.",why:"Repository convenience can hide expensive query patterns.",observe:"Query count grows with result count."},
      {title:"Repair the read model",action:"Use a projection or focused fetch query and compare counts.",why:"Reads should retrieve the shape they actually need.",observe:"The same result is produced with bounded queries."}
    ],
    coaching:[
      {wrong:"Use CascadeType.ALL on every relationship.",better:"Choose cascade operations from aggregate ownership and lifecycle rules.",reason:"Blind cascading can persist or delete data unexpectedly."},
      {wrong:"Keep transactions around remote API calls.",better:"Keep database transactions short and design cross-system consistency explicitly.",reason:"Remote work increases lock time and cannot join a local rollback."}
    ],
    coachQuestion:"Why can existsByEmail return false for two concurrent requests, and what finally prevents duplicate storage?"
  },
  {
    opening:"Security answers two different questions: who is making the request, and are they allowed to perform this action? You will test both questions separately.",
    scenario:"A signed-in student may read their own profile but must not access another student's profile by changing an ID in the URL.",
    prerequisites:[
      {name:"HTTP header",explanation:"Metadata sent with a request, often carrying authorization credentials."},
      {name:"Identity",explanation:"The verified account or system principal making a request."},
      {name:"Resource owner",explanation:"The identity allowed to control a particular record."}
    ],
    terms:[
      {term:"Authentication",meaning:"Establishing who the requester is.",example:"A validated token identifies student-123."},
      {term:"Authorization",meaning:"Deciding whether that identity may perform an action.",example:"student-123 may read profile 123, not 456."},
      {term:"Security filter chain",meaning:"Security processing that runs before controller logic.",example:"Token validation occurs before /students/123."},
      {term:"Password hash",meaning:"A one-way derived value used to verify a password without storing it.",example:"BCrypt or Argon2 encoded password."},
      {term:"CSRF",meaning:"A browser attack that tricks an authenticated session into submitting an unwanted request.",example:"Another site triggers a state-changing form using session cookies."}
    ],
    guided:[
      {title:"Protect by default",action:"Require authentication for all endpoints except health.",why:"A deny-by-default rule prevents newly added endpoints becoming public accidentally.",observe:"Anonymous requests receive 401."},
      {title:"Add role authorization",action:"Allow ADMIN to list students and deny STUDENT.",why:"Roles express broad capabilities.",observe:"Authenticated but unauthorized requests receive 403."},
      {title:"Add ownership authorization",action:"Compare the authenticated subject with the requested profile owner.",why:"A role alone cannot protect user-specific records.",observe:"Changing a path ID no longer bypasses policy."},
      {title:"Test the matrix",action:"Test anonymous, wrong role, wrong owner and allowed owner/admin cases.",why:"Security rules need positive and negative evidence.",observe:"Every rule has an executable proof."}
    ],
    coaching:[
      {wrong:"Hide buttons in the frontend and call that authorization.",better:"Enforce every sensitive rule on the server; the UI may mirror it for usability.",reason:"Clients and requests can be modified."},
      {wrong:"Disable CSRF whenever configuration is inconvenient.",better:"Decide based on whether browser credentials are sent automatically and document the model.",reason:"The correct defense depends on how authentication is transported."}
    ],
    coachQuestion:"A valid user token requests another user's profile. Should the result be 401 or 403, and why?"
  },
  {
    opening:"Spring tests are tools of different sizes. You will choose the smallest environment that can prove each risk instead of loading the whole application by habit.",
    scenario:"Student registration contains pure validation, HTTP mapping, database constraints and application wiring. One test style cannot prove all four efficiently.",
    prerequisites:[
      {name:"Unit test",explanation:"A focused test of code with controlled collaborators."},
      {name:"Integration boundary",explanation:"A point where components or infrastructure must work together."},
      {name:"Test fixture",explanation:"The controlled starting data and collaborators used by a test."}
    ],
    terms:[
      {term:"Test slice",meaning:"A focused Spring context containing one application concern.",example:"@WebMvcTest loads web components, not the database."},
      {term:"MockMvc",meaning:"A tool for exercising MVC request/response behavior without a network server.",example:"POST JSON and assert 400 response."},
      {term:"@DataJpaTest",meaning:"A persistence-focused context for entity and repository behavior.",example:"Verify a custom query and unique constraint."},
      {term:"@SpringBootTest",meaning:"A broad application context for a small number of full-flow checks.",example:"One registration smoke test."},
      {term:"Testcontainers",meaning:"Disposable real infrastructure started for tests.",example:"Run repository tests against PostgreSQL."}
    ],
    guided:[
      {title:"Map risks to test sizes",action:"List each registration risk and the smallest test scope that proves it.",why:"Test design follows risk, not annotation preference.",observe:"Most rules need no Spring context."},
      {title:"Write a plain unit test",action:"Test domain validation with JUnit and a fake repository.",why:"Pure tests are fast and explain business behavior clearly.",observe:"No framework startup occurs."},
      {title:"Test the web contract",action:"Use @WebMvcTest to submit invalid JSON and assert the problem response.",why:"Serialization, validation and controller advice need the web slice.",observe:"The HTTP contract is proven without a database."},
      {title:"Test real persistence",action:"Use PostgreSQL Testcontainers for the unique constraint and query.",why:"H2 behavior can differ from production PostgreSQL.",observe:"Schema and driver behavior match production more closely."},
      {title:"Add one smoke path",action:"Use @SpringBootTest for a critical complete registration flow.",why:"A small number of broad tests catches wiring gaps.",observe:"The full context proves components connect correctly."}
    ],
    coaching:[
      {wrong:"Use @SpringBootTest for every test.",better:"Use plain tests and slices for most risks, with a few full-context flows.",reason:"Broad tests are slower and make failures harder to localize."},
      {wrong:"Mock the class being tested.",better:"Use the real subject and replace only external collaborators when needed.",reason:"A mocked subject proves the mock setup, not the behavior."}
    ],
    coachQuestion:"Which test should prove a PostgreSQL unique constraint, and why is a mocked repository insufficient?"
  },
  {
    opening:"A remote call is an unreliable conversation: it may be slow, fail, or complete even when your client times out. This mission makes that uncertainty part of the design.",
    scenario:"Order placement reserves inventory over HTTP. A retry after an uncertain timeout must not reserve the same stock twice or exhaust every request thread.",
    prerequisites:[
      {name:"Network request",explanation:"Communication between processes that can fail independently of either program."},
      {name:"Latency",explanation:"The elapsed time between sending a request and receiving its result."},
      {name:"Side effect",explanation:"A change outside the local calculation, such as reserving stock."}
    ],
    terms:[
      {term:"Timeout",meaning:"The maximum time allowed for connection or response.",example:"Stop waiting after the response budget expires."},
      {term:"Retry",meaning:"A controlled repeat after a transient failure.",example:"Retry one 503 with backoff."},
      {term:"Circuit breaker",meaning:"A stateful guard that temporarily stops calls to a failing dependency.",example:"Open after repeated inventory failures."},
      {term:"Bulkhead",meaning:"A capacity boundary preventing one dependency from consuming all resources.",example:"Inventory calls have a bounded concurrency pool."},
      {term:"Idempotency key",meaning:"A stable request identifier used to deduplicate repeated commands.",example:"One order ID maps to one reservation effect."}
    ],
    guided:[
      {title:"Write the failure policy",action:"Define timeout, retryable outcomes, attempt limit and final behavior in plain language.",why:"Library configuration should implement a product decision.",observe:"Unsafe cases such as retrying validation failures are excluded."},
      {title:"Set time budgets",action:"Configure connection and response timeouts below the caller's deadline.",why:"A dependency must not hold resources indefinitely.",observe:"Slow calls fail within a predictable bound."},
      {title:"Add safe retry",action:"Retry only transient outcomes using one idempotency key and backoff.",why:"Repeated side effects require deduplication.",observe:"The dependency records one reservation despite repeated delivery."},
      {title:"Open the circuit",action:"Simulate repeated failure and observe calls being rejected temporarily.",why:"Failing fast protects capacity and gives dependencies recovery time.",observe:"Later requests do not all wait for the same known failure."},
      {title:"Test uncertainty",action:"Simulate a timeout after the server commits, then retry.",why:"This is the dangerous real-world case idempotency must handle.",observe:"The retry returns the original result without duplicating stock changes."}
    ],
    coaching:[
      {wrong:"Retry every failure three times.",better:"Retry only classified transient failures within a total deadline and safe idempotency model.",reason:"Blind retries amplify outages and duplicate effects."},
      {wrong:"Use a circuit breaker instead of a timeout.",better:"Use a timeout for each call; a breaker adds history-based protection.",reason:"A breaker cannot bound one slow call by itself."}
    ],
    coachQuestion:"What happens if the inventory server succeeds but the response is lost, and how does the idempotency key protect the retry?"
  },
  {
    opening:"Production readiness means the service can explain its health, behavior and failures to people and platforms operating it.",
    scenario:"A deployment may be running but unable to serve traffic because its database migration failed. Liveness and readiness must communicate different facts.",
    prerequisites:[
      {name:"Deployment",explanation:"A released application instance running in an environment."},
      {name:"Container",explanation:"A packaged process with its runtime dependencies and isolated filesystem view."},
      {name:"Environment",explanation:"The configuration and infrastructure surrounding an application instance."}
    ],
    terms:[
      {term:"Actuator",meaning:"Spring Boot's operational endpoints and instrumentation support.",example:"/actuator/health reports health groups."},
      {term:"Liveness",meaning:"Whether the process should be restarted because it cannot continue.",example:"A deadlocked process fails liveness."},
      {term:"Readiness",meaning:"Whether the instance can currently receive user traffic.",example:"Startup migration in progress means not ready."},
      {term:"Metric",meaning:"A numeric signal aggregated over time.",example:"Registration failure rate."},
      {term:"p95 latency",meaning:"A duration that 95% of measured requests complete within.",example:"p95 of 400 ms means 5% are slower."}
    ],
    guided:[
      {title:"Separate health meanings",action:"Write examples that should fail liveness, readiness, both or neither.",why:"Incorrect probes cause restart loops or traffic to broken instances.",observe:"Optional dependency failure need not always kill readiness."},
      {title:"Expose minimum endpoints",action:"Enable health, info and metrics needed by operations—nothing more.",why:"Operational endpoints can reveal sensitive internals.",observe:"Only intentional endpoints are reachable."},
      {title:"Instrument one business outcome",action:"Count successful and failed registrations with bounded reason labels.",why:"Business signals show user impact beyond CPU or memory.",observe:"A dashboard distinguishes validation from system failure."},
      {title:"Practice graceful shutdown",action:"Stop an instance during a simulated request and verify completion within a limit.",why:"Deployments should avoid dropping in-flight work.",observe:"Traffic drains before process termination."},
      {title:"Run a failure drill",action:"Break the database connection and follow a three-step runbook.",why:"A runbook must be tested against observable evidence.",observe:"The operator can identify impact, dependency and recovery action."}
    ],
    coaching:[
      {wrong:"Expose every actuator endpoint publicly.",better:"Expose only required endpoints and secure sensitive detail.",reason:"Environment, bean and configuration data can aid attackers."},
      {wrong:"Alert on every error log.",better:"Alert on sustained user impact using rate, error and latency signals.",reason:"Actionable alerts reduce noise and fatigue."}
    ],
    coachQuestion:"Give one failure that should make the service unready but not necessarily dead."
  },
  {
    opening:"The Spring capstone is a campaign, not one giant quest. Each gate produces a usable, tested increment and operational evidence before the next capability is added.",
    scenario:"You will deliver a student learning backend that another engineer can deploy, exercise, secure, observe and recover—not merely start on your laptop.",
    prerequisites:[
      {name:"Use case",explanation:"A goal an actor completes through the system, including success and failure outcomes."},
      {name:"Modular monolith",explanation:"One deployable application with enforced internal module boundaries."},
      {name:"Migration",explanation:"A versioned change that moves a database schema forward predictably."}
    ],
    terms:[
      {term:"Vertical delivery",meaning:"Completing a small behavior through API, application, domain and persistence.",example:"Registration works end to end before enrolment begins."},
      {term:"Threat model",meaning:"A structured review of assets, actors, entry points and likely attacks.",example:"Protect student identity and ownership boundaries."},
      {term:"CI pipeline",meaning:"Automated build, test and quality checks run for proposed changes.",example:"A failing integration test blocks release."},
      {term:"ADR",meaning:"A concise record of a significant technical decision and trade-offs.",example:"Why modular monolith was selected."},
      {term:"SLO",meaning:"A measurable reliability target for a user-visible service behavior.",example:"99.9% successful API availability per month."}
    ],
    guided:[
      {title:"Gate 1 — walking skeleton",action:"Create the project, health endpoint, CI build and one empty migration.",why:"Delivery mechanics should work before feature complexity grows.",observe:"Every commit can be built and deployed repeatably."},
      {title:"Gate 2 — registration slice",action:"Deliver validated API, domain rule, PostgreSQL persistence and tests.",why:"One complete slice validates architecture and contracts.",observe:"A learner can register and duplicate email is impossible."},
      {title:"Gate 3 — identity and ownership",action:"Add authentication plus student/admin authorization tests.",why:"Security is part of each use case, not a final decoration.",observe:"URL or body changes cannot bypass ownership."},
      {title:"Gate 4 — resilient integration",action:"Send registration notification with timeout, idempotency and failure policy.",why:"External failure must not corrupt the core transaction.",observe:"Repeated or failed delivery produces a controlled outcome."},
      {title:"Gate 5 — operate and defend",action:"Add metrics, dashboard, runbook, threat model and controlled failure drill.",why:"Enterprise readiness requires evidence beyond functional success.",observe:"Another engineer can diagnose and recover the service."}
    ],
    coaching:[
      {wrong:"Build all entities, controllers and repositories layer by layer before testing a flow.",better:"Complete one vertical use case, then extend the system.",reason:"Vertical delivery exposes integration and design problems early."},
      {wrong:"Claim enterprise readiness because Spring Security and Actuator are dependencies.",better:"Prove policies, telemetry and recovery behavior with tests and drills.",reason:"Libraries provide mechanisms; the application must define correct behavior."}
    ],
    coachQuestion:"What is your first deployable vertical slice, and which evidence proves it is complete?"
  }
];

export const trainingDepth: Record<LearningTrack, TrainingDepth[]> = { Java: java, "Spring Boot": spring };
