export type Reward = { kind: "Sticker" | "Quote" | "Title"; name: string; detail: string; symbol: string };

export const starterRewards: Reward[] = [
  {
    kind: "Sticker",
    name: "First Step Slime",
    detail: "A tiny LevelCraft companion for hunters brave enough to begin at level zero.",
    symbol: "◉",
  },
  {
    kind: "Sticker",
    name: "Compile Sprite",
    detail: "It glows when code compiles—and judges missing semicolons in complete silence.",
    symbol: "✦",
  },
  {
    kind: "Quote",
    name: "The Beginner's Oath",
    detail: "Every expert once stared at code that made absolutely no sense.",
    symbol: "❝",
  },
];

