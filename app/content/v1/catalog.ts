import javaJ01 from "./missions/java-j0-1.json";
import springS01 from "./missions/spring-s0-1.json";
import { missionRouteKey, type MissionContent } from "../mission-schema";
import type { LearningTrack } from "../curriculum";

const missions = [javaJ01, springS01] as MissionContent[];

const missionsByRoute = new Map(
  missions.map((mission) => [missionRouteKey(mission.legacy.track, mission.legacy.numericId), mission]),
);

export function getStructuredMission(track: LearningTrack, numericId: number) {
  return missionsByRoute.get(missionRouteKey(track, numericId));
}

export const structuredMissions = missions;

