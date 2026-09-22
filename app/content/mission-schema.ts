import type { LearningTrack } from "./curriculum";

export const MISSION_SCHEMA_VERSION = 1 as const;

export type ContentStatus =
  | "draft"
  | "technical_review"
  | "beginner_review"
  | "editorial_review"
  | "approved"
  | "published"
  | "retired";

export type MissionTerm = { term: string; meaning: string; example: string };
export type MissionReference = { title: string; url: string; kind: "primary" | "further-reading" };
export type MissionFile = { path: string; language: string; code: string };

export type MissionContent = {
  schemaVersion: typeof MISSION_SCHEMA_VERSION;
  id: string;
  legacy: { track: LearningTrack; numericId: number };
  arcId: string;
  rank: "E" | "D" | "C" | "B" | "A" | "S";
  status: ContentStatus;
  title: string;
  summary: string;
  xp: number;
  estimatedMinutes: number;
  prerequisiteIds: string[];
  outcomes: string[];
  briefing: {
    story: string;
    purpose: string;
    mentalModel: string;
    prerequisites: { name: string; explanation: string }[];
    terms: MissionTerm[];
    misconceptions: { belief: string; correction: string }[];
    readinessCheck: string;
  };
  demonstration: {
    title: string;
    introduction: string;
    files: MissionFile[];
    runInstructions: string[];
    expectedOutput: string;
    executionFlow: string[];
  };
  training: {
    workspace: string;
    steps: {
      title: string;
      goal: string;
      why: string;
      where: string;
      action: string;
      observe: string;
      ifItFails: string;
      checkpoint: string;
    }[];
    breakRepair: { breakAction: string; symptom: string; repair: string; lesson: string };
    pauseAndExplain: { level: "recall" | "trace" | "compare" | "predict"; prompt: string }[];
  };
  hunterNotes: {
    coreRules: string[];
    useCases: string[];
    avoidWhen: string[];
    advantages: string[];
    costs: string[];
    alternatives: { option: string; chooseWhen: string; tradeOff: string }[];
    mistakes: { symptom: string; cause: string; correction: string }[];
    interviewRecall: { question: string; answer: string }[];
    references: MissionReference[];
  };
  quest: {
    scenario: string;
    currentState: string;
    requirements: string[];
    constraints: string[];
    acceptanceCriteria: string[];
    nonGoals: string[];
    starterFiles: MissionFile[];
    hints: string[];
    expectedBehaviour: string[];
    evidence: { instructions: string; minimumCharacters: number };
    validation: { mode: "guided-evidence" | "structural" | "local-tests"; instructions: string[] };
  };
  trial: {
    explainPrompt: string;
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  };
  debrief: {
    capability: string;
    applicationEvolution: string;
    tradeOff: string;
    nextMission: string;
    reflection: string;
  };
  review: {
    contentVersion: string;
    author: string;
    technicalReviewer: string | null;
    beginnerReviewer: string | null;
    editorialReviewer: string | null;
    lastReviewed: string;
    testedWith: { java: string; springBoot: string | null };
    changeNote: string;
  };
};

export function missionRouteKey(track: LearningTrack, numericId: number) {
  return `${track}:${numericId}`;
}

