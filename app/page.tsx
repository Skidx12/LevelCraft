import { requireChatGPTUser } from "./chatgpt-auth";
import LevelCraftClient from "./LevelCraftClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await requireChatGPTUser("/");
  return <LevelCraftClient user={{ displayName: user.displayName, email: user.email }} />;
}
