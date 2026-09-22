import { notFound } from "next/navigation";
import { requireChatGPTUser } from "../../../chatgpt-auth";
import { getMission, type LearningTrack } from "../../../content/catalog";
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

  const user = await requireChatGPTUser(`/mission/${trackSlug}/${rawId}`);
  return <MissionRouteClient track={track} mission={mission} user={{ displayName: user.displayName, email: user.email }} />;
}

