import { learningCatalog, type LearningTrack } from "@/app/content/catalog";
import type { LearnerLevel } from "@/app/content/learner-levels";
import { getMissionIdentity, getMissionIdentityByStableId } from "@/modules/curriculum/domain/mission-index";
import { missionSections, type MissionSection } from "../model/progress";

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
  completedMissionIds: string[];
};

export type SectionProgressUpdateInput = {
  track?: string;
  missionId?: string;
  section?: string;
  contentVersion?: string;
};

export type NormalizedSectionProgressUpdate = {
  track: LearningTrack;
  missionId: string;
  section: MissionSection;
  contentVersion: string;
};

export function isLearningTrack(value: string | undefined): value is LearningTrack {
  return learningTracks.some((track) => track === value);
}

function isLevel(value: string | undefined): value is LearnerLevel {
  return learnerLevels.some((level) => level === value);
}

export function normalizeProgressUpdate(input: ProgressUpdateInput): NormalizedProgressUpdate | null {
  const requestedLevel = input.level === "Fresher" ? "Beginner" : input.level;
  if (!isLearningTrack(input.track) || !isLevel(requestedLevel) || !Array.isArray(input.completed)) return null;

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
  const completedMissionIds = stableMissionIdsFor(input.track, completed);

  return {
    track: input.track,
    level: requestedLevel,
    completed,
    sideQuests,
    capstoneKey,
    xp: missionXp + sideQuestXp,
    checkpoint: completed.length,
    completedMissionIds,
  };
}

export function normalizeSectionProgressUpdate(input: SectionProgressUpdateInput): NormalizedSectionProgressUpdate | null {
  if (!isLearningTrack(input.track) || typeof input.missionId !== "string" || typeof input.contentVersion !== "string") return null;
  if (!missionSections.some((section) => section === input.section)) return null;
  const identity = getMissionIdentityByStableId(input.missionId);
  if (!identity || identity.track !== input.track) return null;
  return { track: input.track, missionId: identity.stableId, section: input.section as MissionSection, contentVersion: input.contentVersion };
}

export function stableMissionIdsFor(track: LearningTrack, completed: number[]) {
  return completed.flatMap((id) => {
    const identity = getMissionIdentity(track, id);
    return identity ? [identity.stableId] : [];
  });
}
