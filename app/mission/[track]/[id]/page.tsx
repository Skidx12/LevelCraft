import { notFound } from "next/navigation";
import { requireChatGPTUser } from "../../../chatgpt-auth";
import { getMission, type LearningTrack } from "@/modules/curriculum/public";
import { loadStructuredMission } from "@/modules/content/server/load-structured-mission";
import MissionRouteClient from "./MissionRouteClient";

export const dynamic = "force-dynamic";

const trackBySlug: Record<string, LearningTrack> = {
  java: "Java",
  "spring-boot": "Spring Boot",
};

export default async function MissionRoute({ params }: { params: Promise<{ track: string; id: string }> }) {
  const { track: trackSlug, id: rawId } = await params;
  const track = trackBySlug[trackSlug];
  const missionId = Number(rawId) - 1;
  const mission = track && Number.isInteger(missionId) ? getMission(track, missionId) : undefined;
  if (!track || !mission) notFound();

  const [user, structuredMission] = await Promise.all([
    requireChatGPTUser(`/mission/${trackSlug}/${rawId}`),
    loadStructuredMission(track, missionId),
  ]);

  return <MissionRouteClient track={track} mission={mission} structuredMission={structuredMission} user={{ displayName: user.displayName, email: user.email }} />;
}
