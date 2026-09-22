import type { LearnerLevel } from "@/app/content/learner-levels";

export type JourneyState = Record<string, number[]>;
export type SideQuestState = Record<string, string[]>;
export type CapstoneState = Record<string, string | null>;

export type ProgressSnapshot = {
  own?: { level?: LearnerLevel | "Fresher" };
  journeys?: JourneyState;
  sideQuests?: SideQuestState;
  capstones?: CapstoneState;
};

export type SaveProgressCommand = {
  track: string;
  level: LearnerLevel;
  completed: number[];
  sideQuests: string[];
  capstoneKey: string | null;
};
