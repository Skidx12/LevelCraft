import type { LearningTrack } from "@/app/content/curriculum";
import type { MissionContent } from "@/app/content/mission-schema";

type MissionLoader = () => Promise<MissionContent>;

const missionLoaders: Record<string, MissionLoader> = {
  "Java:0": async () => (await import("@/app/content/v1/missions/java-j0-1.json")).default as MissionContent,
  "Spring Boot:0": async () => (await import("@/app/content/v1/missions/spring-s0-1.json")).default as MissionContent,
};

/** Load only the structured content requested by the current route. */
export async function loadStructuredMission(track: LearningTrack, numericId: number) {
  const loader = missionLoaders[`${track}:${numericId}`];
  return loader ? loader() : null;
}
