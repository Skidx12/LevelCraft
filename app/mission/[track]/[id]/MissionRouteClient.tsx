"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MissionPage from "@/modules/missions/ui/MissionPage";
import type { LearningMission, LearningTrack } from "../../../content/catalog";
import type { LearnerLevel } from "../../../content/learner-levels";
import type { MissionContent } from "../../../content/mission-schema";
import { loadProgress, saveProgress } from "@/modules/progress/client/progress-api";
import type { CapstoneState, JourneyState, SideQuestState } from "@/modules/progress/model/progress";

export default function MissionRouteClient({ track, mission, structuredMission }: { track: LearningTrack; mission: LearningMission; structuredMission: MissionContent | null; user: { displayName: string; email: string } }) {
  const router = useRouter();
  const [completed, setCompleted] = useState<number[]>([]);
  const [sideQuests, setSideQuests] = useState<string[]>([]);
  const [capstoneKey, setCapstoneKey] = useState<string | null>(null);
  const [level, setLevel] = useState<LearnerLevel>("Beginner");
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
  }, [track]);

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

  if (!loaded) return <main className="route-loading">Preparing your mission…</main>;

  return (
    <div className="standalone-mission">
    <MissionPage
      track={track}
      mission={mission}
      structuredMission={structuredMission}
      completed={completed.includes(mission.id)}
      capstoneKey={capstoneKey}
      learnerLevel={level}
      onLevelChange={selectLevel}
      onSelectCapstone={selectCapstone}
      onBack={() => router.push(`/?track=${track === "Java" ? "java" : "spring-boot"}#curriculum`)}
      onComplete={completeMission}
    />
    </div>
  );
}
