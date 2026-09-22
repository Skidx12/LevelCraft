import type { LearnerLevel } from "@/app/content/learner-levels";

export type JourneyState = Record<string, number[]>;
export type SideQuestState = Record<string, string[]>;
export type CapstoneState = Record<string, string | null>;
export const missionSections = ["briefing", "training", "notes", "quest", "checkpoint", "debrief"] as const;
export type MissionSection = (typeof missionSections)[number];
export type MissionSectionProgress = {
  lastSection: MissionSection;
  visitedSections: MissionSection[];
  contentVersion: string;
  updatedAt: number;
};
export type TrackSectionProgress = Record<string, MissionSectionProgress>;
export type SectionProgressState = Record<string, TrackSectionProgress>;

export type ProgressSnapshot = {
  own?: { level?: LearnerLevel | "Fresher" };
  journeys?: JourneyState;
  sideQuests?: SideQuestState;
  capstones?: CapstoneState;
  completedMissionIds?: Record<string, string[]>;
  sectionProgress?: SectionProgressState;
};

export type SaveSectionProgressCommand = {
  track: string;
  missionId: string;
  section: MissionSection;
  contentVersion: string;
};

export type SaveProgressCommand = {
  track: string;
  level: LearnerLevel;
  completed: number[];
  sideQuests: string[];
  capstoneKey: string | null;
};
