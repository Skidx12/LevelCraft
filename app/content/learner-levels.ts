export type LearnerLevel = "Beginner" | "Intermediate" | "Advanced" | "Professional";

export const learnerLevels: { id: LearnerLevel; description: string; guidance: string }[] = [
  {
    id: "Beginner",
    description: "I am learning the vocabulary and building my first working examples.",
    guidance: "Explain every new term, show complete starter code, and verify one observation at a time.",
  },
  {
    id: "Intermediate",
    description: "I know the basics and need practice applying them correctly.",
    guidance: "Keep essential context, then emphasize implementation choices, tests, and common mistakes.",
  },
  {
    id: "Advanced",
    description: "I can build features and want deeper trade-offs and failure analysis.",
    guidance: "Emphasize alternatives, debugging evidence, performance, and design consequences.",
  },
  {
    id: "Professional",
    description: "I want production, architecture, and interview-level engineering judgment.",
    guidance: "Emphasize operability, security, scale, review defense, and rejected alternatives.",
  },
];

export function levelPrompt(level: LearnerLevel) {
  return learnerLevels.find((item) => item.id === level)?.guidance ?? learnerLevels[0].guidance;
}

