"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, Check, ChevronRight, ClipboardCheck, Code2, ExternalLink, FileCode2, Lightbulb, ShieldCheck, Swords, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { MissionContent, MissionFile } from "@/app/content/mission-schema";
import { learnerLevels, levelPrompt, type LearnerLevel } from "@/app/content/learner-levels";

type SchemaMissionPageProps = {
  mission: MissionContent;
  completed: boolean;
  learnerLevel: LearnerLevel;
  onLevelChange: (level: LearnerLevel) => void;
  onBack: () => void;
  onComplete: (legacyId: number) => void;
};

function FileSet({ files, label }: { files: MissionFile[]; label: string }) {
  return (
    <section className="schema-files">
      <div className="depth-heading"><span>{label}</span><h2>Files supplied for this stage</h2></div>
      {files.map((file, index) => (
        <details key={file.path} open={index === 0}>
          <summary><FileCode2/><span>{file.path}</span><small>{file.language}</small></summary>
          <pre><code>{file.code}</code></pre>
        </details>
      ))}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return <ul>{items.map((item) => <li key={item}><Check/>{item}</li>)}</ul>;
}

function ContentReviewBadge({ mission }: { mission: MissionContent }) {
  return (
    <div className="schema-review-badge">
      <span>SCHEMA V{mission.schemaVersion}</span>
      <b>{mission.id}</b>
      <small>{mission.status.replaceAll("_", " ")}</small>
    </div>
  );
}

export default function SchemaMissionPage({ mission, completed, learnerLevel, onLevelChange, onBack, onComplete }: SchemaMissionPageProps) {
  const [tab, setTab] = useState("briefing");
  const [trainingComplete, setTrainingComplete] = useState(false);
  const [checked, setChecked] = useState<number[]>([]);
  const [evidence, setEvidence] = useState("");
  const [answer, setAnswer] = useState("");
  const [quizChecked, setQuizChecked] = useState(false);
  const [claimed, setClaimed] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  const trained = trainingComplete || completed;
  const allChecked = checked.length === mission.quest.acceptanceCriteria.length;
  const evidenceReady = evidence.trim().length >= mission.quest.evidence.minimumCharacters;
  const quizCorrect = Number(answer) === mission.trial.answer;
  const canClaim = trained && allChecked && evidenceReady && quizChecked && quizCorrect;
  const move = (next: string) => { setTab(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const toggle = (index: number) => setChecked((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);

  if (claimed) {
    return (
      <main className="lesson-page">
        <div className="lesson-page-top"><button onClick={onBack}><ArrowLeft/> Quest map</button></div>
        <div className="mission-complete schema-debrief">
          <div className="complete-emblem"><Trophy/></div><span>MISSION CLEARED</span><h2>{mission.title}</h2>
          <p>{mission.debrief.capability}</p>
          <div><b>Application evolved</b><p>{mission.debrief.applicationEvolution}</p></div>
          <div><b>Engineering trade-off</b><p>{mission.debrief.tradeOff}</p></div>
          <div><b>Next mission</b><p>{mission.debrief.nextMission}</p></div>
          <blockquote>{mission.debrief.reflection}</blockquote>
          <Button onClick={onBack}>Continue your journey <ChevronRight/></Button>
        </div>
      </main>
    );
  }

  return (
    <main className="lesson-page schema-mission-page">
      <header className="lesson-page-head">
        <div className="lesson-page-top"><button onClick={onBack}><ArrowLeft/> Quest map</button><span>{completed ? <><Check/> Mission cleared</> : <>Content Review Mode</>}</span></div>
        <div className="lesson-page-title">
          <div><span>{mission.arcId} campaign · Rank {mission.rank}</span><h1>{mission.title}</h1><p>{mission.summary}</p></div>
          <div><ContentReviewBadge mission={mission}/><div className="mission-reward"><b>+{mission.xp} XP</b><small>{mission.estimatedMinutes} min</small></div></div>
        </div>
      </header>

      <Tabs value={tab} onValueChange={move} className="lesson-page-tabs">
        <div className="lesson-stage-bar"><TabsList>
          <TabsTrigger value="briefing"><BookOpen/> 1. Briefing</TabsTrigger>
          <TabsTrigger value="training"><Code2/> 2. Training</TabsTrigger>
          <TabsTrigger value="notes"><ShieldCheck/> 3. Hunter Notes</TabsTrigger>
          <TabsTrigger value="quest"><Swords/> 4. Quest</TabsTrigger>
          <TabsTrigger value="checkpoint"><ClipboardCheck/> 5. Rank Trial</TabsTrigger>
        </TabsList></div>

        <TabsContent value="briefing" className="lesson-scroll">
          <div className="system-briefing"><span>SYSTEM BRIEFING</span><h2>{mission.briefing.purpose}</h2><p>{mission.briefing.story}</p></div>
          <section className="learner-level-panel"><div><span>YOUR EXPLANATION DEPTH</span><h3>{learnerLevel} path</h3><p>{levelPrompt(learnerLevel)}</p></div><div className="learner-level-options" role="group" aria-label="Learner experience level">{learnerLevels.map((level) => <button key={level.id} className={learnerLevel === level.id ? "selected" : ""} onClick={() => onLevelChange(level.id)}><b>{level.id}</b><small>{level.description}</small></button>)}</div></section>
          <section className="schema-outcomes"><div className="depth-heading"><span>VICTORY CONDITIONS</span><h2>What you will be able to do</h2></div><BulletList items={mission.outcomes}/></section>
          <section className="scenario-card"><div><span>MENTAL MODEL</span><h3>Make the invisible visible</h3></div><p>{mission.briefing.mentalModel}</p></section>
          <section className="depth-section"><div className="depth-heading"><span>FOUNDATIONAL LOADOUT</span><h2>Knowledge used in this mission</h2><p>These explanations prepare you; they are not an entrance exam.</p></div><div className="prerequisite-grid">{mission.briefing.prerequisites.map((item) => <article key={item.name}><b>{item.name}</b><p>{item.explanation}</p></article>)}</div></section>
          <section className="depth-section"><div className="depth-heading"><span>TERMINOLOGY DECODER</span><h2>Translate the language</h2></div><div className="term-list">{mission.briefing.terms.map((item, index) => <article key={item.term}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.term}</h3><p>{item.meaning}</p><small>Example: {item.example}</small></div></article>)}</div></section>
          <section className="schema-misconceptions"><div className="depth-heading"><span>FALSE SIGNALS</span><h2>Correct the mental model early</h2></div>{mission.briefing.misconceptions.map((item) => <article key={item.belief}><p><b>Misconception:</b> {item.belief}</p><p><b>Correction:</b> {item.correction}</p></article>)}</section>
          <div className="coach-prompt"><Lightbulb/><div><span>CHECK YOUR FOUNDATION</span><p>{mission.briefing.readinessCheck}</p><small>This uses only the explanations supplied above.</small></div></div>
          <div className="lesson-next"><span>Next: observe a complete working example before changing it.</span><Button onClick={() => move("training")}>Begin guided training <ChevronRight/></Button></div>
        </TabsContent>

        <TabsContent value="training" className="lesson-scroll">
          <div className="training-intro"><span>GUIDED DEMONSTRATION</span><h2>{mission.demonstration.title}</h2><p>{mission.demonstration.introduction}</p></div>
          <section className="workspace-guide"><div><span>WHERE TO WORK</span><h3>{mission.training.workspace}</h3><p>Integrated execution is deliberately deferred. Follow the declared environment and record the requested evidence honestly.</p></div><ol>{mission.demonstration.runInstructions.map((item) => <li key={item}>{item}</li>)}</ol></section>
          <FileSet files={mission.demonstration.files} label="KNOWN-GOOD DEMONSTRATION"/>
          <section className="lesson-columns schema-execution"><div><h3>Expected output</h3><pre><code>{mission.demonstration.expectedOutput}</code></pre></div><div><h3>Execution flow</h3><ol>{mission.demonstration.executionFlow.map((item) => <li key={item}>{item}</li>)}</ol></div></section>
          <div className="training-steps">{mission.training.steps.map((step, index) => <article key={step.title}><div className="step-rank"><span>STEP</span><b>{index + 1}</b></div><div><h3>{step.title}</h3><p><b>Goal:</b> {step.goal}</p><p><b>Why:</b> {step.why}</p><p><b>Where:</b> {step.where}</p><p><b>Do:</b> {step.action}</p><div className="observe"><span>EXPECTED OBSERVATION</span>{step.observe}</div><div className="step-recovery"><p><b>If it fails:</b> {step.ifItFails}</p><p><b>Checkpoint:</b> {step.checkpoint}</p></div></div></article>)}</div>
          <section className="break-repair"><div className="depth-heading"><span>BREAK → FIX → LEARN</span><h2>Controlled failure drill</h2></div><p><b>Break:</b> {mission.training.breakRepair.breakAction}</p><p><b>Symptom:</b> {mission.training.breakRepair.symptom}</p><p><b>Repair:</b> {mission.training.breakRepair.repair}</p><p><b>Lesson:</b> {mission.training.breakRepair.lesson}</p></section>
          <section className="pause-grid"><div className="depth-heading"><span>PAUSE AND EXPLAIN</span><h2>Progress from recall to prediction</h2></div><div>{mission.training.pauseAndExplain.map((item) => <article key={item.level}><span>{item.level}</span><p>{item.prompt}</p></article>)}</div></section>
          <label className={`training-confirm ${trainingComplete ? "complete" : ""}`}><Checkbox checked={trainingComplete} onCheckedChange={(value) => setTrainingComplete(value === true)}/><span><b>I completed the guided training</b><small>I ran the example, followed each checkpoint, completed the failure drill and can answer the explanation prompts.</small></span></label>
          <div className="lesson-next"><span>{trained ? "Training evidence acknowledged." : "Complete the lab before claiming the mission."}</span><Button onClick={() => move("notes")}>Open Hunter Notes <ChevronRight/></Button></div>
        </TabsContent>

        <TabsContent value="notes" className="lesson-scroll">
          <div className="lesson-callout"><Lightbulb/><div><b>Engineering field guide</b><p>Use these notes to choose deliberately rather than memorize a preferred answer.</p></div></div>
          <div className="lesson-columns"><section><h3>Core rules</h3><BulletList items={mission.hunterNotes.coreRules}/></section><section><h3>Real use cases</h3><BulletList items={mission.hunterNotes.useCases}/></section></div>
          <div className="lesson-columns"><section><h3>Advantages</h3><BulletList items={mission.hunterNotes.advantages}/></section><section><h3>Costs and limits</h3><BulletList items={mission.hunterNotes.costs}/></section></div>
          <section className="lesson-section caution"><h3>When not to use it</h3>{mission.hunterNotes.avoidWhen.map((item) => <p key={item}>• {item}</p>)}</section>
          <section className="schema-table"><div className="depth-heading"><span>DECISION GUIDE</span><h2>Alternatives and trade-offs</h2></div><div role="table">{mission.hunterNotes.alternatives.map((item) => <article role="row" key={item.option}><h3>{item.option}</h3><p><b>Choose when:</b> {item.chooseWhen}</p><p><b>Trade-off:</b> {item.tradeOff}</p></article>)}</div></section>
          <section className="schema-table"><div className="depth-heading"><span>DIAGNOSTIC NOTES</span><h2>Symptom → cause → correction</h2></div><div>{mission.hunterNotes.mistakes.map((item) => <article key={item.symptom}><h3>{item.symptom}</h3><p><b>Likely cause:</b> {item.cause}</p><p><b>Correction:</b> {item.correction}</p></article>)}</div></section>
          <section className="interview-recall"><div className="depth-heading"><span>INTERVIEW RECALL</span><h2>Explain, do not chant</h2></div>{mission.hunterNotes.interviewRecall.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</section>
          <section className="reference-list"><h3>Primary references</h3>{mission.hunterNotes.references.map((reference) => <a key={reference.url} href={reference.url} target="_blank" rel="noreferrer"><ExternalLink/>{reference.title}<small>{reference.kind}</small></a>)}</section>
          <div className="lesson-next"><span>Next: apply the capability to the continuing Student Management campaign.</span><Button onClick={() => move("quest")}>Inspect independent quest <Swords/></Button></div>
        </TabsContent>

        <TabsContent value="quest" className="lesson-scroll">
          <div className="quest-brief"><span>INDEPENDENT PRACTICAL QUEST</span><h3>{mission.quest.scenario}</h3><p>{mission.quest.currentState}</p></div>
          <div className="lesson-columns"><section><h3>Requirements</h3><BulletList items={mission.quest.requirements}/></section><section><h3>Constraints</h3><BulletList items={mission.quest.constraints}/></section></div>
          <section className="lesson-section caution"><h3>Not part of this mission</h3>{mission.quest.nonGoals.map((item) => <p key={item}>• {item}</p>)}</section>
          <FileSet files={mission.quest.starterFiles} label="QUEST STARTER WORKSPACE"/>
          <section className="quest-requirements"><h3>Acceptance criteria</h3>{mission.quest.acceptanceCriteria.map((item, index) => <label key={item}><Checkbox checked={checked.includes(index)} onCheckedChange={() => toggle(index)}/><span><b>{String(index + 1).padStart(2, "0")}</b>{item}</span></label>)}</section>
          <details className="hint-box"><summary><Lightbulb/> Request progressive hints</summary>{mission.quest.hints.map((hint, index) => <p key={hint}><b>Hint {index + 1}:</b> {hint}</p>)}</details>
          <section className="lesson-section expected"><h3>Expected behaviour</h3>{mission.quest.expectedBehaviour.map((item) => <p key={item}>• {item}</p>)}</section>
          <section className="validation-mode"><span>{mission.quest.validation.mode.replaceAll("-", " ")}</span><h3>How this attempt is validated</h3><ol>{mission.quest.validation.instructions.map((item) => <li key={item}>{item}</li>)}</ol><small>LevelCraft does not claim that this code was compiled automatically.</small></section>
          <section className="evidence-box"><h3>Your implementation evidence</h3><p>{mission.quest.evidence.instructions}</p><textarea value={evidence} onChange={(event) => setEvidence(event.target.value)} placeholder="Record code, output, decisions and verification evidence…"/><small>{evidence.trim().length}/{mission.quest.evidence.minimumCharacters} minimum</small></section>
          <div className="lesson-next"><span>{allChecked && evidenceReady ? "Practical evidence ready." : "Confirm every criterion and supply the requested evidence."}</span><Button disabled={!allChecked || !evidenceReady} onClick={() => move("checkpoint")}>Enter rank trial <ChevronRight/></Button></div>
        </TabsContent>

        <TabsContent value="checkpoint" className="lesson-scroll">
          <div className="coach-prompt trial-question"><Lightbulb/><div><span>EXPLAIN BEFORE YOU ANSWER</span><p>{mission.trial.explainPrompt}</p><small>Your reasoning is part of the evidence.</small></div></div>
          <div className="quiz-card"><span>RANK TRIAL · KNOWLEDGE CHECK</span><h3>{mission.trial.question}</h3><RadioGroup value={answer} onValueChange={(value) => { setAnswer(value); setQuizChecked(false); }}>{mission.trial.options.map((option, index) => <label className={`quiz-option ${quizChecked && index === mission.trial.answer ? "correct" : ""} ${quizChecked && answer === String(index) && index !== mission.trial.answer ? "wrong" : ""}`} key={option}><RadioGroupItem value={String(index)}/><span>{option}</span></label>)}</RadioGroup><Button variant="outline" disabled={answer === ""} onClick={() => setQuizChecked(true)}>Check answer</Button>{quizChecked ? <div className={`quiz-feedback ${quizCorrect ? "success" : "error"}`}><b>{quizCorrect ? "Correct — rank trial passed" : "Not yet — revisit the evidence"}</b><p>{mission.trial.explanation}</p></div> : null}</div>
          <div className="claim-panel"><div><span>MISSION VALIDATION</span><p><i className={trained ? "done" : ""}>{trained ? <Check/> : null}</i>Guided training acknowledged</p><p><i className={allChecked ? "done" : ""}>{allChecked ? <Check/> : null}</i>Acceptance criteria confirmed</p><p><i className={evidenceReady ? "done" : ""}>{evidenceReady ? <Check/> : null}</i>Evidence submitted</p><p><i className={quizCorrect && quizChecked ? "done" : ""}>{quizCorrect && quizChecked ? <Check/> : null}</i>Knowledge check passed</p></div><Button disabled={!canClaim} onClick={() => { onComplete(mission.legacy.numericId); setClaimed(true); }}><Trophy/> Complete mission & claim {mission.xp} XP</Button></div>
        </TabsContent>
      </Tabs>
    </main>
  );
}

