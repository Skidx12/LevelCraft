"use client";

import { lazy, Suspense } from "react";
import SchemaMissionPage from "@/app/components/mission/SchemaMissionPage";
import type { MissionPageProps } from "../model/mission-page";

const LegacyMissionPage = lazy(() =>
  import("@/app/LevelCraftClient").then((module) => ({
    default: module.LegacyMissionPage,
  })),
);

/**
 * Public mission UI boundary.
 *
 * Schema missions stay independent from the dashboard bundle. Legacy content is
 * loaded only when a route still needs the migration bridge.
 */
export default function MissionPage(props: MissionPageProps) {
  const structured = props.structuredMission;

  if (structured) {
    return (
      <SchemaMissionPage
        mission={structured}
        completed={props.completed}
        learnerLevel={props.learnerLevel || "Beginner"}
        onLevelChange={props.onLevelChange || (() => undefined)}
        onBack={props.onBack}
        onComplete={props.onComplete}
      />
    );
  }

  return (
    <Suspense fallback={<main className="route-loading">Loading legacy mission content…</main>}>
      <LegacyMissionPage {...props} />
    </Suspense>
  );
}
