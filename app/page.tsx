"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpen, Check, ChevronRight, Code2, Flame, Gauge, GitBranch, LockKeyhole, Menu, Play, ShieldCheck, Sparkles, Swords, Target, Trophy, Wrench, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

declare global {
  interface Document { modelContext?: { registerTool: (tool: Record<string, unknown>, options?: { signal?: AbortSignal }) => void | Promise<void> } }
}

type Track = "Java" | "Python" | "Node.js" | "JavaScript" | "Spring Boot" | "Django" | "React" | "Angular" | "SDLC Tools";
type Level = "Beginner" | "Fresher" | "Intermediate" | "Professional";
type Mission = { title: string; detail: string; type: string; xp: number };

const tracks: { name: Track; icon: string; kind: string }[] = [
  { name: "Java", icon: "J", kind: "Language" }, { name: "Python", icon: "Py", kind: "Language" },
  { name: "Node.js", icon: "N", kind: "Runtime" }, { name: "JavaScript", icon: "JS", kind: "Language" },
  { name: "Spring Boot", icon: "Sp", kind: "Framework" }, { name: "Django", icon: "Dj", kind: "Framework" },
  { name: "React", icon: "R", kind: "Framework" }, { name: "Angular", icon: "A", kind: "Framework" },
  { name: "SDLC Tools", icon: "∞", kind: "Toolchain" },
];
const levelStart: Record<Level, number> = { Beginner: 0, Fresher: 1, Intermediate: 2, Professional: 3 };
const phases: { phase: string; rank: string; focus: string; missions: Mission[] }[] = [
  { phase: "Foundation Gate", rank: "E", focus: "Language mechanics & mental models", missions: [
    { title: "Build the right mental model", detail: "Understand runtime, syntax, data types, control flow and how code becomes behavior.", type: "Concept", xp: 120 },
    { title: "Solve the input-to-output trial", detail: "Process validated input, transform data and return predictable output with clean naming.", type: "Code Lab", xp: 180 },
    { title: "Debug the broken inventory", detail: "Trace a real defect, explain the root cause, then write the smallest safe fix.", type: "Debug", xp: 220 }]},
  { phase: "Builder Gate", rank: "D", focus: "Modularity, testing & maintainability", missions: [
    { title: "Design a maintainable module", detail: "Separate responsibilities, define contracts and keep dependencies moving in one direction.", type: "Build", xp: 260 },
    { title: "Bad code boss battle", detail: "Refactor hidden coupling, misleading names and duplicated logic; justify every change.", type: "Best Practice", xp: 320 },
    { title: "Guard it with tests", detail: "Add unit and integration tests around behavior, boundaries and failure paths.", type: "Test Lab", xp: 300 }]},
  { phase: "Production Gate", rank: "C", focus: "APIs, persistence, security & observability", missions: [
    { title: "Ship a real service slice", detail: "Build an API flow with validation, error contracts, persistence and idempotent behavior.", type: "Real-world", xp: 420 },
    { title: "Survive production failure", detail: "Add structured logs, metrics, timeouts and a graceful recovery path for a failing dependency.", type: "Incident", xp: 460 },
    { title: "Threat-model the gate", detail: "Find trust boundaries, protect secrets and test authorization—not only authentication.", type: "Security", xp: 440 }]},
  { phase: "Enterprise Gate", rank: "B", focus: "Architecture, scale & delivery", missions: [
    { title: "Make the architecture decision", detail: "Choose a design using constraints, document trade-offs and reject a tempting wrong alternative.", type: "Architecture", xp: 560 },
    { title: "Performance raid", detail: "Profile a bottleneck, form a hypothesis, improve it and prove the result with measurements.", type: "Optimization", xp: 580 },
    { title: "Build the delivery path", detail: "Create quality gates, CI checks, release strategy and a safe rollback plan.", type: "DevOps", xp: 600 }]},
  { phase: "Expert Ascension", rank: "A → S", focus: "Ownership under real constraints", missions: [
    { title: "Enterprise capstone", detail: "Deliver a production-shaped system from brief to deployment, including ADRs, tests, telemetry and runbook.", type: "Capstone", xp: 1200 },
    { title: "Defend your system", detail: "Explain trade-offs, respond to review findings and diagnose a live incident simulation.", type: "Rank Trial", xp: 900 }]},
];
const trackFocus: Record<Track, string> = {
  Java: "JVM, OOP, collections, concurrency and service engineering", Python: "Pythonic design, typing, automation, data and services",
  "Node.js": "Event loop, APIs, async reliability and production services", JavaScript: "Language depth, browser runtime, async patterns and clean modules",
  "Spring Boot": "IoC, REST, JPA, security, testing and enterprise services", Django: "ORM, views, APIs, security and deployable web systems",
  React: "Components, state, rendering, accessibility and frontend architecture", Angular: "TypeScript, RxJS, DI, forms and scalable applications",
  "SDLC Tools": "Git, issue tracking, CI/CD, containers, observability and release governance",
};

function SideNav({ open, close }: { open: boolean; close: () => void }) {
  return <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
    <div className="brand"><div className="brand-mark"><Swords /></div><div><strong>LEVELCRAFT</strong><span>ACADEMY</span></div></div>
    <button className="close-nav" onClick={close} aria-label="Close navigation"><X /></button>
    <nav aria-label="Primary"><a className="active" href="#dashboard"><Gauge /> Command Center</a><a href="#path"><GitBranch /> Quest Path</a><a href="#missions"><Target /> Missions <em>3</em></a><a href="#skills"><Sparkles /> Skill Tree</a><a href="#trials"><Trophy /> Rank Trials</a></nav>
    <div className="sidebar-bottom"><div className="streak-card"><Flame /><div><b>7 day streak</b><span>Momentum bonus +10%</span></div></div><p>TRAINING PROTOCOL</p><small>Consistency beats intensity.</small></div>
  </aside>;
}

export default function Home() {
  const [track, setTrack] = useState<Track>("Java"); const [level, setLevel] = useState<Level>("Beginner");
  const [completed, setCompleted] = useState<number[]>([0]); const [navOpen, setNavOpen] = useState(false); const [showTracks, setShowTracks] = useState(false);
  const activePhase = Math.min(levelStart[level], phases.length - 1);
  const missions = phases.flatMap((p, phaseIndex) => p.missions.map((m, i) => ({ ...m, phaseIndex, id: phases.slice(0, phaseIndex).reduce((n, x) => n + x.missions.length, 0) + i })));
  const available = missions.filter(m => m.phaseIndex <= activePhase + 1); const xp = completed.reduce((sum, id) => sum + (missions.find(m => m.id === id)?.xp || 0), 0);
  const rankIndex = Math.min(4, Math.floor(xp / 900)); const ranks = ["E", "D", "C", "B", "A"]; const nextXp = (rankIndex + 1) * 900; const progress = Math.min(100, Math.round((xp / nextXp) * 100));
  const nextMission = useMemo(() => available.find(m => !completed.includes(m.id)) || available[0], [available, completed]);
  useEffect(() => { const saved = localStorage.getItem("levelcraft-progress"); if (saved) try { const s = JSON.parse(saved); setTrack(s.track || "Java"); setLevel(s.level || "Beginner"); setCompleted(s.completed || [0]); } catch {} }, []);
  useEffect(() => { localStorage.setItem("levelcraft-progress", JSON.stringify({ track, level, completed })); }, [track, level, completed]);
  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const register = (tool: Record<string, unknown>) => Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => undefined);
    void register({ name: "configure_learning_path", title: "Configure learning path", description: "Choose the visible technology path and learner starting level.", inputSchema: { type: "object", properties: { track: { type: "string", enum: tracks.map(t => t.name) }, level: { type: "string", enum: ["Beginner","Fresher","Intermediate","Professional"] } }, required: ["track","level"], additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: false }, execute(input: unknown) { const value = input as { track?: Track; level?: Level }; if (!tracks.some(t => t.name === value.track) || !value.level || !(value.level in levelStart)) throw new Error("Invalid track or level"); setTrack(value.track); setLevel(value.level); setCompleted([]); return { track: value.track, level: value.level, status: "configured" }; } });
    void register({ name: "complete_current_mission", title: "Complete current mission", description: "Mark the currently displayed mission as cleared and award its XP.", inputSchema: { type: "object", properties: {}, additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: false }, execute() { setCompleted(c => c.includes(nextMission.id) ? c : [...c, nextMission.id]); return { mission: nextMission.title, xpAwarded: nextMission.xp, status: "cleared" }; } });
    return () => lifecycle.abort();
  }, [nextMission?.id, nextMission?.title, nextMission?.xp]);
  const toggleMission = (id: number) => setCompleted(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id]);

  return <div className="app-shell"><SideNav open={navOpen} close={() => setNavOpen(false)} />{navOpen && <button className="scrim" onClick={() => setNavOpen(false)} aria-label="Close menu" />}
    <main id="dashboard" className="main-content">
      <header className="topbar"><button className="menu-btn" onClick={() => setNavOpen(true)} aria-label="Open navigation"><Menu /></button><div><p>HUNTER ID / LC-2048</p><h1>Command Center</h1></div><div className="top-actions"><button className="track-switch" onClick={() => setShowTracks(!showTracks)}><span>{tracks.find(t => t.name === track)?.icon}</span><div><small>ACTIVE PATH</small><b>{track}</b></div><ChevronRight /></button><div className="avatar">SK<i /></div></div></header>
      {showTracks && <section className="track-picker" aria-label="Choose learning path"><div className="picker-head"><div><small>SELECT YOUR CLASS</small><h2>Choose a learning path</h2></div><button onClick={() => setShowTracks(false)}><X /></button></div><div className="track-grid">{tracks.map(t => <button key={t.name} onClick={() => { setTrack(t.name); setCompleted([]); setShowTracks(false); }} className={track === t.name ? "chosen" : ""}><span>{t.icon}</span><div><b>{t.name}</b><small>{t.kind}</small></div>{track === t.name && <Check />}</button>)}</div></section>}
      <section className="rank-hero"><div className="rank-emblem"><span>RANK</span><b>{ranks[rankIndex]}</b><i /></div><div className="rank-copy"><p className="eyebrow"><Zap /> CURRENT ASCENSION</p><h2>{track} {phases[activePhase].phase}</h2><p>{trackFocus[track]}. Your path adapts to your current experience without skipping production fundamentals.</p><div className="xp-row"><span>{xp.toLocaleString()} XP</span><Progress value={progress} /><span>{nextXp.toLocaleString()} XP</span></div></div><div className="rank-stats"><div><b>{completed.length}</b><span>MISSIONS CLEARED</span></div><div><b>{rankIndex + 1}</b><span>CURRENT RANK</span></div><div><b>7</b><span>DAY STREAK</span></div></div></section>
      <section className="control-strip"><div><span>STARTING LEVEL</span><div className="level-buttons">{(["Beginner","Fresher","Intermediate","Professional"] as Level[]).map(l => <button className={level === l ? "active" : ""} onClick={() => setLevel(l)} key={l}>{l}</button>)}</div></div><div className="readiness"><ShieldCheck /><div><span>OUTCOME</span><b>Deployable · Enterprise-ready</b></div></div></section>
      <div className="dashboard-grid"><section className="primary-column"><div className="section-title" id="missions"><div><span>ACTIVE QUEST</span><h2>Your next mission</h2></div><small>{available.filter(m => completed.includes(m.id)).length}/{available.length} available missions cleared</small></div>
        <article className="mission-card featured"><div className="mission-number">{String(nextMission.id + 1).padStart(2,"0")}</div><div className="mission-body"><div className="mission-tags"><span>{nextMission.type}</span><span>+{nextMission.xp} XP</span></div><h3>{nextMission.title}</h3><p>{nextMission.detail}</p><div className="mission-objectives"><b>VICTORY CONDITIONS</b><span><Check /> Explain why the naive approach fails</span><span><Check /> Build, test and document the better solution</span><span><Check /> Connect the lesson to a production scenario</span></div><Button className="start-btn" onClick={() => toggleMission(nextMission.id)}>{completed.includes(nextMission.id) ? <><Check /> Mission cleared</> : <><Play /> Clear mission</>}</Button></div></article>
        <Tabs defaultValue="path" className="quest-tabs"><TabsList variant="line"><TabsTrigger value="path">Quest path</TabsTrigger><TabsTrigger value="practice">Practice protocol</TabsTrigger><TabsTrigger value="proof">Proof of mastery</TabsTrigger></TabsList>
          <TabsContent value="path"><div className="quest-list" id="path">{phases.map((phase, p) => { const locked = p > activePhase + 1; const done = phase.missions.every(m => completed.includes(missions.find(x => x.title === m.title)?.id ?? -1)); return <article key={phase.phase} className={`${locked ? "locked" : ""} ${p === activePhase ? "current" : ""}`}><div className="node">{locked ? <LockKeyhole /> : done ? <Check /> : <span>{phase.rank}</span>}</div><div><small>{p === activePhase ? "CURRENT GATE" : locked ? "LOCKED" : "AVAILABLE"}</small><h3>{phase.phase}</h3><p>{phase.focus}</p></div><div className="quest-meta"><b>{phase.missions.length} missions</b><span>{phase.missions.reduce((n,m) => n+m.xp,0)} XP</span></div></article>})}</div></TabsContent>
          <TabsContent value="practice"><div className="protocol-grid"><article><Code2 /><h3>Learn by building</h3><p>Every concept becomes code in the same session. No passive tutorial marathons.</p></article><article><Wrench /><h3>Repair bad code</h3><p>Compare tempting mistakes with maintainable, secure and measurable solutions.</p></article><article><Flame /><h3>Face incidents</h3><p>Debug production-shaped failures using logs, tests and a repeatable method.</p></article></div></TabsContent>
          <TabsContent value="proof"><div className="proof-panel"><Trophy /><div><h3>Evidence, not completion badges</h3><p>Advance by shipping reviewed code, passing scenario tests, explaining trade-offs and defending architecture choices.</p></div></div></TabsContent></Tabs>
      </section><aside className="right-column"><section className="panel mastery" id="skills"><div className="panel-title"><span>MASTERY MATRIX</span><b>{track}</b></div>{[["Core concepts",72],["Applied coding",48],["Testing & quality",34],["Production readiness",18]].map(([label,val]) => <div className="skill" key={label as string}><div><span>{label}</span><b>{val}%</b></div><Progress value={val as number} /></div>)}</section><section className="panel boss" id="trials"><div className="boss-icon"><Swords /></div><span>RANK TRIAL</span><h3>The Production Incident</h3><p>Unlock by clearing the Production Gate. Diagnose latency, data inconsistency and a failing dependency under a time limit.</p><div><LockKeyhole /> Requires Rank C</div></section><section className="panel principle"><BookOpen /><div><span>TODAY&apos;S PRINCIPLE</span><p>“Working code is the entry fee. Explainable, testable and operable code is the profession.”</p></div></section></aside></div>
      <footer><span>LEVELCRAFT SYSTEM // LEARN → BUILD → BREAK → FIX → SHIP</span><span>Progress is saved on this device</span></footer>
    </main></div>;
}
