import type { LearningMission, LearningTrack } from "@/app/content/catalog";
import type { LearnerLevel } from "@/app/content/learner-levels";
import type { MissionContent } from "@/app/content/mission-schema";

export type MissionPageProps = {
  track: LearningTrack;
  mission: LearningMission;
  structuredMission?: MissionContent | null;
  completed: boolean;
  capstoneKey: string | null;
  learnerLevel?: LearnerLevel;
  onLevelChange?: (level: LearnerLevel) => void;
  onSelectCapstone: (key: string) => void;
  onBack: () => void;
  onComplete: (id: number) => void;
};
