"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MissionPage } from "../../../LevelCraftClient";
import type { LearningMission, LearningTrack } from "../../../content/catalog";
import type { LearnerLevel } from "../../../content/learner-levels";

type JourneyState = Record<string, number[]>;
type CapstoneState = Record<string, string | null>;
type ProgressResponse = { own?: { level?: LearnerLevel | "Fresher" }; journeys?: JourneyState; sideQuests?: Record<string, string[]>; capstones?: CapstoneState };

export default function MissionRouteClient({ track, mission }: { track: LearningTrack; mission: LearningMission; user: { displayName: string; email: string } }) {
  const router = useRouter();
  const [completed, setCompleted] = useState<number[]>([]);
  const [sideQuests, setSideQuests] = useState<string[]>([]);
  const [capstoneKey, setCapstoneKey] = useState<string | null>(null);
  const [level, setLevel] = useState<LearnerLevel>("Beginner");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    void fetch("/api/progress", { cache: "no-store" })
      .then((response) => response.json() as Promise<ProgressResponse>)
      .then((data) => {
        if (!active) return;
        const journeys = (data.journeys || {}) as JourneyState;
        const sideQuestJourneys = (data.sideQuests || {}) as Record<string, string[]>;
        const capstones = (data.capstones || {}) as CapstoneState;
        setCompleted(journeys[track] || []);
        setSideQuests(sideQuestJourneys[track] || []);
        setCapstoneKey(capstones[track] || null);
        const savedLevel = data.own?.level;
        setLevel(savedLevel === "Fresher" ? "Beginner" : savedLevel || "Beginner");
      })
      .finally(() => active && setLoaded(true));
    return () => { active = false; };
  }, [track]);

  const save = async (nextCompleted: number[], nextCapstone = capstoneKey, nextLevel = level) => {
    await fetch("/api/progress", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "save_progress", track, level: nextLevel, completed: nextCompleted, sideQuests, capstoneKey: nextCapstone }),
    });
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
