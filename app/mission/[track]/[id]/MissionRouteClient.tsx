"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MissionPage from "@/modules/missions/ui/MissionPage";
import type { LearningMission, LearningTrack } from "../../../content/catalog";
import type { LearnerLevel } from "../../../content/learner-levels";
import type { MissionContent } from "../../../content/mission-schema";
import type { MissionIdentity } from "@/modules/curriculum/public";
import { loadProgress, saveProgress, saveSectionProgress } from "@/modules/progress/client/progress-api";
import type { CapstoneState, JourneyState, MissionSection, SideQuestState } from "@/modules/progress/model/progress";

export default function MissionRouteClient({ track, mission, missionIdentity, structuredMission }: { track: LearningTrack; mission: LearningMission; missionIdentity: MissionIdentity; structuredMission: MissionContent | null; user: { displayName: string; email: string } }) {
  const router = useRouter();
  const [completed, setCompleted] = useState<number[]>([]);
  const [sideQuests, setSideQuests] = useState<string[]>([]);
  const [capstoneKey, setCapstoneKey] = useState<string | null>(null);
  const [level, setLevel] = useState<LearnerLevel>("Beginner");
  const [initialSection, setInitialSection] = useState<MissionSection>("briefing");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    void loadProgress(controller.signal)
      .then((data) => {
        const journeys = (data.journeys || {}) as JourneyState;
        const sideQuestJourneys = (data.sideQuests || {}) as SideQuestState;
        const capstones = (data.capstones || {}) as CapstoneState;
        setCompleted(journeys[track] || []);
        setSideQuests(sideQuestJourneys[track] || []);
        setCapstoneKey(capstones[track] || null);
        const savedSection = data.sectionProgress?.[track]?.[missionIdentity.stableId];
        setInitialSection(savedSection?.contentVersion === missionIdentity.contentVersion ? savedSection.lastSection : "briefing");
        const savedLevel = data.own?.level;
        setLevel(savedLevel === "Fresher" ? "Beginner" : savedLevel || "Beginner");
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) setLoaded(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoaded(true);
      });
    return () => controller.abort();
  }, [track, missionIdentity.contentVersion, missionIdentity.stableId]);

  const save = async (nextCompleted: number[], nextCapstone = capstoneKey, nextLevel = level) => {
    await saveProgress({ track, level: nextLevel, completed: nextCompleted, sideQuests, capstoneKey: nextCapstone });
  };

  const completeMission = (id: number) => {
    const next = completed.includes(id) ? completed : [...completed, id].sort((a, b) => a - b);
    setCompleted(next);
    void save(next);
  };

  const selectCapstone = (key: string) => {
    setCapstoneKey(key);
    void save(completed, key);
  };

  const selectLevel = (next: LearnerLevel) => {
    setLevel(next);
    void save(completed, capstoneKey, next);
  };

  const selectSection = (section: MissionSection) => {
    void saveSectionProgress({ track, missionId: missionIdentity.stableId, section, contentVersion: missionIdentity.contentVersion }).catch(() => undefined);
  };

  if (!loaded) return <main className="route-loading">Preparing your mission…</main>;

  return (
    <div className="standalone-mission">
    <MissionPage
      track={track}
      mission={mission}
      structuredMission={structuredMission}
      initialSection={initialSection}
      completed={completed.includes(mission.id)}
      capstoneKey={capstoneKey}
      learnerLevel={level}
      onLevelChange={selectLevel}
      onSelectCapstone={selectCapstone}
      onSectionChange={selectSection}
      onBack={() => router.push(`/?track=${track === "Java" ? "java" : "spring-boot"}#curriculum`)}
      onComplete={completeMission}
    />
    </div>
  );
}
