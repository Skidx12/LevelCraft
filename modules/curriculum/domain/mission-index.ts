import missionIndex from "@/app/content/v1/mission-index.json";
import type { LearningTrack } from "@/app/content/curriculum";

export type MissionIdentity = {
  stableId: string;
  track: LearningTrack;
  legacyNumericId: number;
  contentVersion: string;
  format: "schema-v1" | "legacy";
};

const identities = missionIndex as MissionIdentity[];
const byLegacyRoute = new Map(identities.map((identity) => [`${identity.track}:${identity.legacyNumericId}`, identity]));
const byStableId = new Map(identities.map((identity) => [identity.stableId, identity]));

export function getMissionIdentity(track: LearningTrack, legacyNumericId: number) {
  return byLegacyRoute.get(`${track}:${legacyNumericId}`);
}

export function getMissionIdentityByStableId(stableId: string) {
  return byStableId.get(stableId);
}

export function listMissionIdentities(track?: LearningTrack) {
  return track ? identities.filter((identity) => identity.track === track) : identities;
}
