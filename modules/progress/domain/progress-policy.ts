import { learningCatalog, type LearningTrack } from "@/app/content/catalog";
import type { LearnerLevel } from "@/app/content/learner-levels";

export const learningTracks = ["Java", "Spring Boot"] as const satisfies readonly LearningTrack[];
export const learnerLevels = ["Beginner", "Intermediate", "Advanced", "Professional"] as const satisfies readonly LearnerLevel[];

export type ProgressUpdateInput = {
  track?: string;
  level?: string;
  completed?: unknown;
  sideQuests?: unknown;
  capstoneKey?: unknown;
};

export type NormalizedProgressUpdate = {
  track: LearningTrack;
  level: LearnerLevel;
  completed: number[];
  sideQuests: string[];
  capstoneKey: string | null;
  xp: number;
  checkpoint: number;
};

function isTrack(value: string | undefined): value is LearningTrack {
  return learningTracks.some((track) => track === value);
}

function isLevel(value: string | undefined): value is LearnerLevel {
  return learnerLevels.some((level) => level === value);
}

export function normalizeProgressUpdate(input: ProgressUpdateInput): NormalizedProgressUpdate | null {
  const requestedLevel = input.level === "Fresher" ? "Beginner" : input.level;
  if (!isTrack(input.track) || !isLevel(requestedLevel) || !Array.isArray(input.completed)) return null;

  const missions = learningCatalog.tracks[input.track];
  const missionById = new Map(missions.map((mission) => [mission.id, mission]));
  const completed = [...new Set(input.completed.filter((value): value is number => Number.isInteger(value) && missionById.has(value as number)))];

  const sideQuestById = new Map(learningCatalog.sideQuests[input.track].map((quest) => [quest.id, quest]));
  const sideQuests = Array.isArray(input.sideQuests)
    ? [...new Set(input.sideQuests.filter((value): value is string => typeof value === "string" && sideQuestById.has(value)))]
    : [];

  const validCapstoneIds = new Set(learningCatalog.capstones[input.track].map((capstone) => capstone.id));
  const capstoneKey = typeof input.capstoneKey === "string" && validCapstoneIds.has(input.capstoneKey)
    ? input.capstoneKey
    : null;

  const missionXp = completed.reduce((sum, id) => sum + (missionById.get(id)?.xp || 0), 0);
  const sideQuestXp = sideQuests.reduce((sum, id) => sum + (sideQuestById.get(id)?.xp || 0), 0);

  return {
    track: input.track,
    level: requestedLevel,
    completed,
    sideQuests,
    capstoneKey,
    xp: missionXp + sideQuestXp,
    checkpoint: completed.length,
  };
}
