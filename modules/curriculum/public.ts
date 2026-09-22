import { curricula, type LearningMission, type LearningTrack } from "@/app/content/curriculum";
export { getMissionIdentity, getMissionIdentityByStableId, listMissionIdentities } from "./domain/mission-index";
export type { MissionIdentity } from "./domain/mission-index";

/** Public read boundary for curriculum sequencing and mission metadata. */
export function getMission(track: LearningTrack, id: number): LearningMission | undefined {
  return curricula[track].find((mission) => mission.id === id);
}

export type { LearningMission, LearningTrack };
