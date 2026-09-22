import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

const nonEmpty = z.string().trim().min(1);
const missionIndexSchema = z.array(z.object({
  stableId: z.string().regex(/^[JS]\d+\.(?:\d+|T)$/),
  track: z.enum(["Java", "Spring Boot"]),
  legacyNumericId: z.number().int().min(0),
  contentVersion: nonEmpty,
  format: z.enum(["schema-v1", "legacy"]),
}));
const fileSchema = z.object({ path: nonEmpty, language: nonEmpty, code: nonEmpty });
const missionSchema = z.object({
  schemaVersion: z.literal(1),
  id: z.string().regex(/^[JS]\d+\.(?:\d+|T)$/),
  legacy: z.object({ track: z.enum(["Java", "Spring Boot"]), numericId: z.number().int().min(0) }),
  arcId: z.string().regex(/^[JS]\d+$/),
  rank: z.enum(["E", "D", "C", "B", "A", "S"]),
  status: z.enum(["draft", "technical_review", "beginner_review", "editorial_review", "approved", "published", "retired"]),
  title: nonEmpty,
  summary: nonEmpty,
  xp: z.number().int().positive(),
  estimatedMinutes: z.number().int().positive().max(180),
  prerequisiteIds: z.array(z.string().regex(/^[JS]\d+\.(?:\d+|T)$/)),
  outcomes: z.array(nonEmpty).min(2),
  briefing: z.object({
    story: nonEmpty,
    purpose: nonEmpty,
    mentalModel: nonEmpty,
    prerequisites: z.array(z.object({ name: nonEmpty, explanation: nonEmpty })),
    terms: z.array(z.object({ term: nonEmpty, meaning: nonEmpty, example: nonEmpty })).min(2),
    misconceptions: z.array(z.object({ belief: nonEmpty, correction: nonEmpty })).min(1),
    readinessCheck: nonEmpty,
  }),
  demonstration: z.object({
    title: nonEmpty,
    introduction: nonEmpty,
    files: z.array(fileSchema).min(1),
    runInstructions: z.array(nonEmpty).min(1),
    expectedOutput: nonEmpty,
    executionFlow: z.array(nonEmpty).min(2),
  }),
  training: z.object({
    workspace: nonEmpty,
    steps: z.array(z.object({ title: nonEmpty, goal: nonEmpty, why: nonEmpty, where: nonEmpty, action: nonEmpty, observe: nonEmpty, ifItFails: nonEmpty, checkpoint: nonEmpty })).min(3),
    breakRepair: z.object({ breakAction: nonEmpty, symptom: nonEmpty, repair: nonEmpty, lesson: nonEmpty }),
    pauseAndExplain: z.array(z.object({ level: z.enum(["recall", "trace", "compare", "predict"]), prompt: nonEmpty })).min(4),
  }),
  hunterNotes: z.object({
    coreRules: z.array(nonEmpty).min(2),
    useCases: z.array(nonEmpty).min(2),
    avoidWhen: z.array(nonEmpty).min(1),
    advantages: z.array(nonEmpty).min(1),
    costs: z.array(nonEmpty).min(1),
    alternatives: z.array(z.object({ option: nonEmpty, chooseWhen: nonEmpty, tradeOff: nonEmpty })).min(1),
    mistakes: z.array(z.object({ symptom: nonEmpty, cause: nonEmpty, correction: nonEmpty })).min(1),
    interviewRecall: z.array(z.object({ question: nonEmpty, answer: nonEmpty })).min(1),
    references: z.array(z.object({ title: nonEmpty, url: z.string().url(), kind: z.enum(["primary", "further-reading"]) })).min(1),
  }),
  quest: z.object({
    scenario: nonEmpty,
    currentState: nonEmpty,
    requirements: z.array(nonEmpty).min(2),
    constraints: z.array(nonEmpty).min(1),
    acceptanceCriteria: z.array(nonEmpty).min(2),
    nonGoals: z.array(nonEmpty).min(1),
    starterFiles: z.array(fileSchema).min(1),
    hints: z.array(nonEmpty).min(1),
    expectedBehaviour: z.array(nonEmpty).min(1),
    evidence: z.object({ instructions: nonEmpty, minimumCharacters: z.number().int().min(40).max(1000) }),
    validation: z.object({ mode: z.enum(["guided-evidence", "structural", "local-tests"]), instructions: z.array(nonEmpty).min(1) }),
  }),
  trial: z.object({ explainPrompt: nonEmpty, question: nonEmpty, options: z.array(nonEmpty).min(2), answer: z.number().int().min(0), explanation: nonEmpty }),
  debrief: z.object({ capability: nonEmpty, applicationEvolution: nonEmpty, tradeOff: nonEmpty, nextMission: nonEmpty, reflection: nonEmpty }),
  review: z.object({
    contentVersion: nonEmpty,
    author: nonEmpty,
    technicalReviewer: z.string().nullable(),
    beginnerReviewer: z.string().nullable(),
    editorialReviewer: z.string().nullable(),
    lastReviewed: z.string().date(),
    testedWith: z.object({ java: nonEmpty, springBoot: z.string().nullable() }),
    changeNote: nonEmpty,
  }),
}).superRefine((mission, context) => {
  if (mission.trial.answer >= mission.trial.options.length) {
    context.addIssue({ code: "custom", path: ["trial", "answer"], message: "answer must reference an available option" });
  }
  if (!mission.id.startsWith(mission.legacy.track === "Java" ? "J" : "S")) {
    context.addIssue({ code: "custom", path: ["id"], message: "mission ID prefix must match the legacy track" });
  }
});

const directory = path.resolve("app/content/v1/missions");
const missionIndexPath = path.resolve("app/content/v1/mission-index.json");
const files = (await readdir(directory)).filter((file) => file.endsWith(".json")).sort();
const missions = [];
let failed = false;

for (const file of files) {
  const raw = JSON.parse(await readFile(path.join(directory, file), "utf8"));
  const result = missionSchema.safeParse(raw);
  if (!result.success) {
    failed = true;
    console.error(`\n${file}`);
    for (const issue of result.error.issues) console.error(`  ${issue.path.join(".")}: ${issue.message}`);
  } else {
    missions.push({ file, mission: result.data });
  }
}

const ids = new Set();
const routes = new Set();
for (const { file, mission } of missions) {
  const route = `${mission.legacy.track}:${mission.legacy.numericId}`;
  if (ids.has(mission.id)) { failed = true; console.error(`Duplicate mission ID ${mission.id} in ${file}`); }
  if (routes.has(route)) { failed = true; console.error(`Duplicate legacy route ${route} in ${file}`); }
  ids.add(mission.id);
  routes.add(route);
}

const missionIndexResult = missionIndexSchema.safeParse(JSON.parse(await readFile(missionIndexPath, "utf8")));
if (!missionIndexResult.success) {
  failed = true;
  console.error("\nmission-index.json");
  for (const issue of missionIndexResult.error.issues) console.error(`  ${issue.path.join(".")}: ${issue.message}`);
} else {
  const stableIds = new Set();
  const legacyRoutes = new Set();
  for (const entry of missionIndexResult.data) {
    const route = `${entry.track}:${entry.legacyNumericId}`;
    if (stableIds.has(entry.stableId)) { failed = true; console.error(`Duplicate stable mission ID ${entry.stableId}`); }
    if (legacyRoutes.has(route)) { failed = true; console.error(`Duplicate mission index route ${route}`); }
    stableIds.add(entry.stableId);
    legacyRoutes.add(route);
  }
  for (const track of ["Java", "Spring Boot"]) {
    for (let numericId = 0; numericId < 10; numericId += 1) {
      if (!legacyRoutes.has(`${track}:${numericId}`)) { failed = true; console.error(`Missing mission index route ${track}:${numericId}`); }
    }
  }
  for (const { mission } of missions) {
    const indexed = missionIndexResult.data.find((entry) => entry.track === mission.legacy.track && entry.legacyNumericId === mission.legacy.numericId);
    if (!indexed || indexed.stableId !== mission.id || indexed.contentVersion !== mission.review.contentVersion || indexed.format !== "schema-v1") {
      failed = true;
      console.error(`Mission index does not match structured mission ${mission.id}`);
    }
  }
}

if (failed) process.exit(1);
console.log(`Validated ${missions.length} schema-v1 missions and the stable mission index.`);
