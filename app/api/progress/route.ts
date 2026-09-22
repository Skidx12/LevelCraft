import { getChatGPTUser } from "../../chatgpt-auth";
import { getD1 } from "../../../lib/d1";

export const dynamic = "force-dynamic";

const tracks = ["Java","Spring Boot"];
const levels = ["Beginner","Intermediate","Advanced","Professional"];
const missionXp: Record<string, number[]> = {
  Java: [180,220,300,340,420,420,760,560,720,1500],
  "Spring Boot": [260,280,420,420,560,620,580,720,720,1800],
};
const validSideQuests: Record<string, string[]> = {
  Java: ["java-input-gauntlet","java-contract-refactor","java-stream-ledger","java-race-hunter","java-deadlock-dungeon","java-architecture-tribunal"],
  "Spring Boot": ["spring-injection-arena","spring-autoconfig-autopsy","spring-broken-api-clinic","spring-transaction-trap","spring-outage-simulation","spring-production-war-room"],
};
const sideQuestXp: Record<string, number> = {"java-input-gauntlet":120,"java-contract-refactor":220,"java-stream-ledger":240,"java-race-hunter":380,"java-deadlock-dungeon":420,"java-architecture-tribunal":450,"spring-injection-arena":160,"spring-autoconfig-autopsy":220,"spring-broken-api-clinic":280,"spring-transaction-trap":360,"spring-outage-simulation":420,"spring-production-war-room":460};
const validCapstones = ["commerce","library","accounts","trading","student"];

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
    const savedJourneys = await auth.db.prepare("SELECT track,completed_json,side_quests_json,capstone_key FROM journey_progress WHERE user_id=?").bind(auth.user.userId).all();
    const friends = await auth.db.prepare("SELECT f.friend_email AS email,l.display_name,p.track,p.level,p.xp,p.checkpoint,p.updated_at FROM friendships f LEFT JOIN learners l ON l.email=f.friend_email LEFT JOIN progress p ON p.user_id=l.user_id WHERE f.owner_user_id=? ORDER BY COALESCE(p.xp,0) DESC").bind(auth.user.userId).all();
    const journeys: Record<string, unknown[]> = { Java: [], "Spring Boot": [] };
    const sideQuests: Record<string, unknown[]> = { Java: [], "Spring Boot": [] };
    const capstones: Record<string, string | null> = { Java: null, "Spring Boot": null };
    for (const row of savedJourneys.results) {
      journeys[String(row.track)] = JSON.parse(String(row.completed_json || "[]"));
      sideQuests[String(row.track)] = JSON.parse(String(row.side_quests_json || "[]"));
      capstones[String(row.track)] = row.capstone_key ? String(row.capstone_key) : null;
    }
    return Response.json({ own: own ? { ...own, completed: JSON.parse(String(own.completed_json || "[]")) } : null, journeys, sideQuests, capstones, friends: friends.results });
  } catch { return Response.json({ error: "Progress is temporarily unavailable" }, { status: 503 }); }
}

export async function POST(request: Request) {
  try {
    const auth = await identify(); if (!auth) return Response.json({ error: "Sign in required" }, { status: 401 });
    const body = await request.json() as { action?: string; track?: string; level?: string; completed?: unknown; sideQuests?: unknown; capstoneKey?: unknown; email?: string };
    if (body.action === "save_progress") {
      const requestedLevel = body.level === "Fresher" ? "Beginner" : body.level;
      if (!tracks.includes(body.track || "") || !levels.includes(requestedLevel || "") || !Array.isArray(body.completed)) return Response.json({ error: "Invalid progress" }, { status: 400 });
      const xpTable = missionXp[body.track!];
      const completed = [...new Set(body.completed.filter((x): x is number => Number.isInteger(x) && x >= 0 && x < xpTable.length))];
      const completedSideQuests = Array.isArray(body.sideQuests) ? [...new Set(body.sideQuests.filter((x): x is string => typeof x === "string" && validSideQuests[body.track!].includes(x)))] : [];
      const capstoneKey = typeof body.capstoneKey === "string" && validCapstones.includes(body.capstoneKey) ? body.capstoneKey : null;
      const xp = completed.reduce((sum,id) => sum + xpTable[id], 0) + completedSideQuests.reduce((sum,id) => sum + (sideQuestXp[id] || 0), 0); const checkpoint = completed.length;
      await auth.db.prepare("UPDATE progress SET track=?,level=?,completed_json=?,xp=?,checkpoint=?,updated_at=? WHERE user_id=?").bind(body.track, requestedLevel, JSON.stringify(completed), xp, checkpoint, Date.now(), auth.user.userId).run();
      await auth.db.prepare("INSERT INTO journey_progress (user_id,track,completed_json,side_quests_json,capstone_key,xp,checkpoint,updated_at) VALUES (?,?,?,?,?,?,?,?) ON CONFLICT(user_id,track) DO UPDATE SET completed_json=excluded.completed_json,side_quests_json=excluded.side_quests_json,capstone_key=excluded.capstone_key,xp=excluded.xp,checkpoint=excluded.checkpoint,updated_at=excluded.updated_at").bind(auth.user.userId, body.track, JSON.stringify(completed), JSON.stringify(completedSideQuests), capstoneKey, xp, checkpoint, Date.now()).run();
      return Response.json({ status: "saved", xp, checkpoint });
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
