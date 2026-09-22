import { getChatGPTUser } from "../../chatgpt-auth";
import { getD1 } from "../../../lib/d1";
import { isLearningTrack, normalizeProgressUpdate, normalizeSectionProgressUpdate, stableMissionIdsFor, type ProgressUpdateInput, type SectionProgressUpdateInput } from "@/modules/progress/domain/progress-policy";
import type { TrackSectionProgress } from "@/modules/progress/model/progress";

export const dynamic = "force-dynamic";

function parseObject<T extends object>(value: unknown, fallback: T): T {
  try {
    const parsed = JSON.parse(String(value || "{}")) as unknown;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as T : fallback;
  } catch {
    return fallback;
  }
}

function parseArray<T>(value: unknown): T[] {
  try {
    const parsed = JSON.parse(String(value || "[]")) as unknown;
    return Array.isArray(parsed) ? parsed as T[] : [];
  } catch {
    return [];
  }
}

async function identify() {
  const user = await getChatGPTUser();
  if (!user) return null;
  const db = getD1(); const now = Date.now();
  await db.prepare("INSERT INTO learners (user_id,email,display_name,updated_at) VALUES (?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET email=excluded.email,display_name=excluded.display_name,updated_at=excluded.updated_at").bind(user.userId, user.email.toLowerCase(), user.displayName, now).run();
  await db.prepare("INSERT INTO progress (user_id,track,level,completed_json,xp,checkpoint,updated_at) VALUES (?, 'Java','Beginner','[]',0,0,?) ON CONFLICT(user_id) DO NOTHING").bind(user.userId, now).run();
  return { user, db };
}

export async function GET() {
  try {
    const auth = await identify(); if (!auth) return Response.json({ error: "Sign in required" }, { status: 401 });
    const own = await auth.db.prepare("SELECT track,level,completed_json,xp,checkpoint,updated_at FROM progress WHERE user_id=?").bind(auth.user.userId).first();
    const savedJourneys = await auth.db.prepare("SELECT track,completed_json,completed_mission_ids_json,section_progress_json,side_quests_json,capstone_key FROM journey_progress WHERE user_id=?").bind(auth.user.userId).all();
    const friends = await auth.db.prepare("SELECT f.friend_email AS email,l.display_name,p.track,p.level,p.xp,p.checkpoint,p.updated_at FROM friendships f LEFT JOIN learners l ON l.email=f.friend_email LEFT JOIN progress p ON p.user_id=l.user_id WHERE f.owner_user_id=? ORDER BY COALESCE(p.xp,0) DESC").bind(auth.user.userId).all();
    const journeys: Record<string, unknown[]> = { Java: [], "Spring Boot": [] };
    const sideQuests: Record<string, unknown[]> = { Java: [], "Spring Boot": [] };
    const capstones: Record<string, string | null> = { Java: null, "Spring Boot": null };
    const completedMissionIds: Record<string, unknown[]> = { Java: [], "Spring Boot": [] };
    const sectionProgress: Record<string, TrackSectionProgress> = { Java: {}, "Spring Boot": {} };
    for (const row of savedJourneys.results) {
      const savedTrack = String(row.track);
      const legacyCompleted = parseArray<number>(row.completed_json);
      const stableCompleted = parseArray<string>(row.completed_mission_ids_json);
      journeys[savedTrack] = legacyCompleted;
      completedMissionIds[savedTrack] = stableCompleted.length > 0 || !isLearningTrack(savedTrack) ? stableCompleted : stableMissionIdsFor(savedTrack, legacyCompleted);
      sectionProgress[savedTrack] = parseObject<TrackSectionProgress>(row.section_progress_json, {});
      sideQuests[savedTrack] = parseArray(row.side_quests_json);
      capstones[savedTrack] = row.capstone_key ? String(row.capstone_key) : null;
    }
    return Response.json({ own: own ? { ...own, completed: parseArray(own.completed_json) } : null, journeys, completedMissionIds, sectionProgress, sideQuests, capstones, friends: friends.results });
  } catch { return Response.json({ error: "Progress is temporarily unavailable" }, { status: 503 }); }
}

export async function POST(request: Request) {
  try {
    const auth = await identify(); if (!auth) return Response.json({ error: "Sign in required" }, { status: 401 });
    const body = await request.json() as ProgressUpdateInput & SectionProgressUpdateInput & { action?: string; email?: string };
    if (body.action === "save_progress") {
      const progress = normalizeProgressUpdate(body);
      if (!progress) return Response.json({ error: "Invalid progress" }, { status: 400 });
      await auth.db.prepare("UPDATE progress SET track=?,level=?,completed_json=?,xp=?,checkpoint=?,updated_at=? WHERE user_id=?").bind(progress.track, progress.level, JSON.stringify(progress.completed), progress.xp, progress.checkpoint, Date.now(), auth.user.userId).run();
      await auth.db.prepare("INSERT INTO journey_progress (user_id,track,completed_json,completed_mission_ids_json,side_quests_json,capstone_key,xp,checkpoint,updated_at) VALUES (?,?,?,?,?,?,?,?,?) ON CONFLICT(user_id,track) DO UPDATE SET completed_json=excluded.completed_json,completed_mission_ids_json=excluded.completed_mission_ids_json,side_quests_json=excluded.side_quests_json,capstone_key=excluded.capstone_key,xp=excluded.xp,checkpoint=excluded.checkpoint,updated_at=excluded.updated_at").bind(auth.user.userId, progress.track, JSON.stringify(progress.completed), JSON.stringify(progress.completedMissionIds), JSON.stringify(progress.sideQuests), progress.capstoneKey, progress.xp, progress.checkpoint, Date.now()).run();
      return Response.json({ status: "saved", xp: progress.xp, checkpoint: progress.checkpoint });
    }
    if (body.action === "save_section_progress") {
      const section = normalizeSectionProgressUpdate(body);
      if (!section) return Response.json({ error: "Invalid mission section" }, { status: 400 });
      const saved = await auth.db.prepare("SELECT section_progress_json FROM journey_progress WHERE user_id=? AND track=?").bind(auth.user.userId, section.track).first();
      const current = parseObject<TrackSectionProgress>(saved?.section_progress_json, {});
      const previous = current[section.missionId];
      const visitedSections = previous?.visitedSections.includes(section.section)
        ? previous.visitedSections
        : [...(previous?.visitedSections || []), section.section];
      current[section.missionId] = { lastSection: section.section, visitedSections, contentVersion: section.contentVersion, updatedAt: Date.now() };
      await auth.db.prepare("INSERT INTO journey_progress (user_id,track,completed_json,completed_mission_ids_json,section_progress_json,side_quests_json,xp,checkpoint,updated_at) VALUES (?,?,'[]','[]',?,'[]',0,0,?) ON CONFLICT(user_id,track) DO UPDATE SET section_progress_json=excluded.section_progress_json,updated_at=excluded.updated_at").bind(auth.user.userId, section.track, JSON.stringify(current), Date.now()).run();
      return Response.json({ status: "saved" });
    }
    if (body.action === "add_friend") {
      const email = String(body.email || "").trim().toLowerCase();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email === auth.user.email.toLowerCase()) return Response.json({ error: "Enter a valid friend email" }, { status: 400 });
      await auth.db.prepare("INSERT INTO friendships (owner_user_id,friend_email,created_at) VALUES (?,?,?) ON CONFLICT(owner_user_id,friend_email) DO NOTHING").bind(auth.user.userId, email, Date.now()).run();
      return Response.json({ status: "added", email });
    }
    return Response.json({ error: "Unknown action" }, { status: 400 });
  } catch { return Response.json({ error: "Could not save right now" }, { status: 503 }); }
}
