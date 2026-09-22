import type { ProgressSnapshot, SaveProgressCommand } from "../model/progress";

async function readJson<T>(response: Response): Promise<T> {
  const body = (await response.json()) as T & { error?: string };
  if (!response.ok) throw new Error(body.error || "Progress request failed");
  return body;
}

export async function loadProgress(signal?: AbortSignal) {
  const response = await fetch("/api/progress", { cache: "no-store", signal });
  return readJson<ProgressSnapshot>(response);
}

export async function saveProgress(command: SaveProgressCommand) {
  const response = await fetch("/api/progress", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action: "save_progress", ...command }),
  });
  return readJson<{ status: "saved"; xp: number; checkpoint: number }>(response);
}
