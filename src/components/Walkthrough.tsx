"use client";
import { useCallback, useEffect, useState } from "react";

const STEPS = [
  "The issue",
  "Without Schedules",
  "The moment",
  "With Schedules",
  "The value",
];

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-border bg-card p-5 ${className}`}>{children}</div>;
}
function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-xs uppercase tracking-wider text-subtle mb-2">{children}</div>;
}
function Btn({
  onClick,
  children,
  primary = false,
  disabled = false,
}: {
  onClick: () => void;
  children: React.ReactNode;
  primary?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md px-4 py-2 text-sm font-medium transition disabled:opacity-40 ${
        primary
          ? "bg-white text-black hover:bg-neutral-200"
          : "border border-border bg-card-2 hover:bg-neutral-800"
      }`}
    >
      {children}
    </button>
  );
}

function StepIssue() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="md:col-span-2">
        <Label>Saltbush Retail · Sydney · Customer Service agent</Label>
        <p className="text-muted text-sm mb-4">
          Saltbush runs a CS agent that browses orders, prices and stock. Customers ask for follow-ups
          that are not due today — &ldquo;check this price again in three days,&rdquo; &ldquo;remind me when the
          jacket is back,&rdquo; &ldquo;re-quote freight next Monday.&rdquo;
        </p>
        <div className="rounded-lg border border-border bg-card-2 p-4 space-y-3">
          {[
            ["Customer", "Can you recheck the price on the Merino coat in 3 days and message me if it drops?"],
            ["Agent", "I can watch it now. For a follow-up in three days I need an engineer to add a cron."],
            ["Customer", "…so you can’t just book that yourself?"],
          ].map(([who, text]) => (
            <div key={who + text} className="text-sm">
              <span className="text-subtle font-medium">{who}</span>
              <div className="mt-1 text-foreground">{text}</div>
            </div>
          ))}
        </div>
      </Card>
      <div className="grid gap-4 content-start">
        <Card>
          <Label>Follow-up requests / week</Label>
          <div className="text-3xl font-semibold">186</div>
          <div className="text-sm text-muted">across chat, email and SMS</div>
        </Card>
        <Card>
          <Label>Ones that need a future job</Label>
          <div className="text-3xl font-semibold text-warn">41%</div>
          <div className="text-sm text-muted">not due in this conversation</div>
        </Card>
        <Card>
          <Label>Engineers owning crons</Label>
          <div className="text-3xl font-semibold">2</div>
          <div className="text-sm text-muted">for every agent product change</div>
        </Card>
      </div>
    </div>
  );
}

function StepWithout() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <Label>The old way · vercel.json</Label>
        <pre className="rounded-lg bg-black border border-border p-4 text-xs font-mono overflow-x-auto leading-6">
{`{
  "crons": [{
    "path": "/api/price-recheck",
    "schedule": "0 9 * * *"
  }]
}`}
        </pre>
        <p className="text-sm text-muted mt-3">
          Timing lives in config. Change the schedule, add a one-off follow-up, or cancel one — and you
          edit the file and redeploy.
        </p>
      </Card>
      <Card>
        <Label>What that costs Saltbush</Label>
        <div className="space-y-3">
          {[
            ["Ticket to engineering", "1–2 business days"],
            ["Redeploy for every schedule change", "Yes"],
            ["One-time “in 3 days” jobs", "Not supported — poll a database instead"],
            ["Agent can create the job itself", "No"],
            ["Work runs after the sandbox ends", "Only if you built a separate poller"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-border pb-2 text-sm">
              <span className="text-muted">{k}</span>
              <span className="text-danger text-right">{v}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card className="md:col-span-2">
        <Label>Polling fallback they built</Label>
        <div className="grid gap-3 md:grid-cols-3 text-center">
          {[
            ["Every 15 min", "cron wakes a worker that scans a follow-ups table"],
            ["A$18k / yr", "compute and ops for a poller that mostly finds nothing"],
            ["Missed windows", "jobs land hours late when the poller is busy or paused"],
          ].map(([a, b]) => (
            <div key={a} className="rounded-lg bg-card-2 p-4">
              <div className="text-xl font-semibold">{a}</div>
              <div className="text-xs text-muted mt-1">{b}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function StepMoment() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="md:col-span-2">
        <Label>Live conversation · order #SB-88421</Label>
        <div className="rounded-lg border border-border bg-card-2 p-4 space-y-3 mb-4">
          <div className="text-sm">
            <span className="text-subtle font-medium">Maya · customer</span>
            <div className="mt-1">
              The Merino coat is A$489 today. If it drops below A$420 in the next three days, message me on
              SMS. Otherwise don’t bother me.
            </div>
          </div>
          <div className="text-sm">
            <span className="text-subtle font-medium">Saltbush CS agent</span>
            <div className="mt-1 text-danger">
              I can’t create a job that runs after this chat ends. I’ll open a ticket for engineering to add
              a cron, or you can check back yourself.
            </div>
          </div>
        </div>
        <p className="text-sm text-muted">
          The agent already browsed the product, confirmed the price, and has Maya’s consent. The only
          thing missing is a way to book work for three days from now — without a redeploy, and outside
          the sandbox that dies when this turn finishes.
        </p>
      </Card>
      <div className="grid gap-4 content-start">
        <Card>
          <Label>Time to book this follow-up today</Label>
          <div className="text-3xl font-semibold text-danger">2 days</div>
          <div className="text-sm text-muted">ticket → cron edit → redeploy</div>
        </Card>
        <Card>
          <Label>Maya’s window</Label>
          <div className="text-3xl font-semibold">3 days</div>
          <div className="text-sm text-muted">gone before engineering ships</div>
        </Card>
        <Card>
          <Label>Outcome</Label>
          <div className="text-xl font-semibold text-danger">Lost sale</div>
          <div className="text-sm text-muted">coat drops to A$399 on day 2 · nobody messages Maya</div>
        </Card>
      </div>
    </div>
  );
}

function StepWith() {
  const [phase, setPhase] = useState<"idle" | "creating" | "done">("idle");
  useEffect(() => {
    if (phase === "creating") {
      const t = setTimeout(() => setPhase("done"), 1400);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="md:col-span-2">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div>
            <Label>Vercel Schedules · runtime create</Label>
            <div className="text-sm text-muted">
              The agent calls the JS SDK mid-conversation. No vercel.json edit. No redeploy. Work is
              delivered later via Queues, outside the sandbox.
            </div>
          </div>
          <Btn primary onClick={() => setPhase("creating")} disabled={phase !== "idle"}>
            {phase === "idle" ? "Create schedule" : phase === "creating" ? "Creating…" : "Schedule live"}
          </Btn>
        </div>
        {phase === "creating" && <div className="mb-4 h-2 rounded shimmer" />}
        <pre className="rounded-lg bg-black border border-border p-4 text-xs font-mono overflow-x-auto leading-6">
{`Schedules.create({
  name: "price-recheck-sb-88421",
  namespace: "saltbush-retail",
  expression: { type: "single", at: "2026-11-09T09:00" },
  timezone: "Australia/Sydney",
  target: { topic: "cs-followups" },
  payload: {
    orderId: "SB-88421",
    sku: "MERINO-COAT-BLK",
    thresholdAud: 420,
    channel: "sms",
    customerId: "maya-1042",
  },
})`}
        </pre>
        {phase === "done" && (
          <div className="fade-in mt-4 rounded-lg border border-green-500/40 bg-card-2 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-success">✓</span>
              <span className="font-medium">Schedule created in 1.2 seconds</span>
            </div>
            <div className="text-sm text-muted">
              Runs Monday 9:00 Australia/Sydney · delivers to queue topic{" "}
              <span className="font-mono text-foreground">cs-followups</span> · no redeploy · survives
              after this sandbox ends
            </div>
          </div>
        )}
      </Card>
      <div className="grid gap-4 content-start">
        {[
          ["One-time or recurring", "both, from the same SDK"],
          ["Created by the agent", "at runtime, mid-chat"],
          ["Outside the sandbox", "Vercel fires the job later"],
          ["Preview-safe", "test on a branch before prod"],
        ].map(([a, b]) => (
          <Card key={a} className={phase === "done" ? "border-green-500/30" : ""}>
            <div className="font-medium text-sm">{a}</div>
            <div className="text-xs text-muted mt-1">{b}</div>
          </Card>
        ))}
        {phase === "done" && (
          <Card className="fade-in">
            <Label>Agent reply to Maya</Label>
            <div className="text-sm text-success">
              Done. I’ll recheck the Merino coat on Monday morning and SMS you only if it’s under A$420.
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function StepValue() {
  const rows = [
    ["Time to book a follow-up", "2 business days", "1.2 seconds"],
    ["Redeploys for schedule changes / year", "47", "0"],
    ["Engineer hours on cron tickets / year", "380", "12"],
    ["Follow-ups that miss their window", "18%", "<1%"],
    ["Poller infra cost / year", "A$18k", "A$0"],
  ];
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["2 days → 1.2s", "to book a customer follow-up"],
          ["47 → 0", "redeploys a year for schedule changes"],
          ["368 hours", "of engineering time back a year"],
          ["A$640k", "a year in recovered sales + engineer cost avoided"],
        ].map(([a, b]) => (
          <Card key={b}>
            <div className="text-2xl font-semibold">{a}</div>
            <div className="text-sm text-muted mt-1">{b}</div>
          </Card>
        ))}
      </div>
      <Card>
        <Label>Saltbush Retail · before and after</Label>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-subtle text-left">
              <th className="py-2 font-normal"></th>
              <th className="font-normal">Without Schedules</th>
              <th className="font-normal">With Vercel Schedules</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-t border-border">
                <td className="py-2">{r[0]}</td>
                <td className="text-danger">{r[1]}</td>
                <td className="text-success">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card>
        <Label>Why customers love it</Label>
        <div className="grid gap-3 md:grid-cols-3 text-sm">
          {[
            ["Agents book their own work", "No ticket, no cron edit, no waiting on a redeploy."],
            ["One-time and recurring", "“In 3 days” and “every Monday 9am” from the same API."],
            ["Outside the sandbox", "The chat can end. The job still runs when it’s due."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-lg bg-card-2 p-4">
              <div className="font-medium mb-1">{t}</div>
              <div className="text-muted">{d}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

const HEAD: [string, string][] = [
  [
    "The agent can help now. It can’t book later.",
    "Saltbush Retail’s CS agent browses orders and prices live — but any follow-up that isn’t due today becomes an engineering ticket.",
  ],
  [
    "Schedules lived in config. Changes meant redeploys.",
    "Static crons in vercel.json, a poller scanning a database every 15 minutes, and two engineers owning every schedule change.",
  ],
  [
    "Maya asks for a three-day price watch. The window closes first.",
    "The agent has the product, the threshold and the consent. It cannot create a job that runs after this chat ends.",
  ],
  [
    "One SDK call. Schedule live. No redeploy.",
    "Vercel Schedules lets the agent create a one-time job at runtime. Vercel delivers it later via Queues, outside the sandbox.",
  ],
  [
    "Follow-ups in seconds. Redeploys gone.",
    "Saltbush books every customer promise in the conversation — and gets engineering hours and recovered sales back.",
  ],
];

export default function Walkthrough() {
  const [step, setStep] = useState(0);
  const go = useCallback((d: number) => setStep((s) => Math.min(STEPS.length - 1, Math.max(0, s + d))), []);
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [go]);

  return (
    <main className="grid-bg min-h-screen flex flex-col">
      <div className="mx-auto max-w-6xl px-6 py-8 flex-1 w-full">
        <header className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-3">
            <svg width="22" height="20" viewBox="0 0 76 65" fill="white" aria-hidden>
              <path d="M37.5 0L75 65H0z" />
            </svg>
            <span className="font-semibold">Vercel Schedules</span>
            <span className="text-subtle">/</span>
            <span className="text-muted">Saltbush Retail</span>
          </div>
          <span className="text-xs rounded-full border border-border px-3 py-1 text-muted">
            Fictional company · simulated data
          </span>
        </header>
        <nav className="flex gap-2 flex-wrap mb-6">
          {STEPS.map((s, i) => (
            <button
              key={s}
              onClick={() => setStep(i)}
              className={`rounded-full px-3 py-1 text-sm border ${
                i === step ? "bg-white text-black border-white" : "border-border text-muted hover:text-white"
              }`}
            >
              {i + 1}. {s}
            </button>
          ))}
        </nav>
        <section key={step} className="fade-in">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{HEAD[step][0]}</h1>
          <p className="text-muted mt-2 mb-6 max-w-3xl">{HEAD[step][1]}</p>
          {step === 0 && <StepIssue />}
          {step === 1 && <StepWithout />}
          {step === 2 && <StepMoment />}
          {step === 3 && <StepWith />}
          {step === 4 && <StepValue />}
        </section>
        <footer className="flex items-center justify-between mt-8">
          <Btn onClick={() => go(-1)} disabled={step === 0}>
            ← Back
          </Btn>
          <span className="text-xs text-subtle">
            Step {step + 1} of {STEPS.length} · use the arrow keys
          </span>
          <Btn primary onClick={() => go(1)} disabled={step === STEPS.length - 1}>
            Next →
          </Btn>
        </footer>
      </div>
      <div className="border-t border-border py-3 text-center text-xs text-subtle">Simulated walkthrough</div>
    </main>
  );
}
