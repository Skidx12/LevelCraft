import { curricula, type LearningMission, type LearningTrack } from "./curriculum";
import { trainingDepth, type TrainingDepth } from "./training-depth";
import { capstoneOptions, focusModules, sideQuests } from "./levelcraft-v2";

/**
 * Curriculum content boundary.
 *
 * Product screens must read learning content through this module instead of
 * owning lesson copy. This keeps route behaviour independent from curriculum
 * revisions and gives us one migration point for a future CMS or database.
 */
export const learningCatalog = {
  tracks: curricula,
  training: trainingDepth,
  sideQuests,
  focusModules,
  capstones: capstoneOptions,
} as const;

export function getMission(track: LearningTrack, id: number): LearningMission | undefined {
  return learningCatalog.tracks[track].find((mission) => mission.id === id);
}

export function getTrainingDepth(track: LearningTrack, id: number): TrainingDepth | undefined {
  return learningCatalog.training[track][id];
}

export type { LearningMission, LearningTrack, TrainingDepth };
