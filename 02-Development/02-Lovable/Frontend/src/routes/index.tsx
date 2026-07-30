import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  Plus,
  Sparkles,
  Settings,
  HelpCircle,
  Zap,
  Bell,
  Moon,
  Search,
  Users,
  Target,
  Code2,
  Briefcase,
  AlertTriangle,
  TrendingUp,
  Star,
  Lightbulb,
  Check,
  Clock,
  X,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: DiscoveryGalaxy,
});

type AgentStatus = "completed" | "working" | "pending" | "error";

type Agent = {
  id: string;
  name: string;
  short: string;
  description: string;
  icon: typeof Search;
  status: AgentStatus;
  color: string; // css color for glow
  ring: 0 | 1; // inner or outer orbit
  angle: number; // degrees
  progress: number;
  task: string;
  findings: string[];
  sources: number;
  confidence: number;
};

const AGENTS: Agent[] = [
  { id: "market", name: "Market Research", short: "Market", description: "Analyzing market size, trends & opportunities", icon: Search, status: "completed", color: "oklch(0.7 0.24 300)", ring: 0, angle: 270, progress: 100, task: "Industry landscape mapped", findings: ["$4.2B addressable market", "18% YoY growth in AI wellness", "Mobile-first cohort dominates"], sources: 42, confidence: 94 },
  { id: "competitor", name: "Competitor Analysis", short: "Competitors", description: "Scanning competitors, positioning & moats", icon: Users, status: "completed", color: "oklch(0.82 0.15 210)", ring: 0, angle: 330, progress: 100, task: "15 direct competitors profiled", findings: ["3 category leaders identified", "Pricing clusters at $9 – $19/mo", "Weak onboarding across incumbents"], sources: 61, confidence: 91 },
  { id: "gap", name: "Gap Analysis", short: "Gaps", description: "Identifying market gaps & unmet needs", icon: Target, status: "completed", color: "oklch(0.78 0.18 160)", ring: 0, angle: 30, progress: 100, task: "7 unmet needs surfaced", findings: ["No true adaptive coaching", "Nutrition + training rarely unified", "Weak community loops"], sources: 38, confidence: 88 },
  { id: "tech", name: "Technical Feasibility", short: "Tech", description: "Assessing stack, complexity & integrations", icon: Code2, status: "pending", color: "oklch(0.7 0.22 275)", ring: 0, angle: 90, progress: 0, task: "Queued", findings: [], sources: 0, confidence: 0 },
  { id: "business", name: "Business Feasibility", short: "Business", description: "Evaluating revenue model & unit economics", icon: Briefcase, status: "pending", color: "oklch(0.7 0.24 300)", ring: 0, angle: 150, progress: 0, task: "Queued", findings: [], sources: 0, confidence: 0 },
  { id: "risk", name: "Risk & Challenge", short: "Risks", description: "Identifying risks & mitigation strategies", icon: AlertTriangle, status: "working", color: "oklch(0.7 0.26 20)", ring: 0, angle: 210, progress: 62, task: "Scanning regulatory + retention risks", findings: ["Health data compliance flagged", "Churn benchmarks compiled"], sources: 24, confidence: 71 },
  { id: "score", name: "Opportunity Scoring", short: "Scoring", description: "Scoring idea potential & growth outlook", icon: TrendingUp, status: "working", color: "oklch(0.78 0.19 55)", ring: 1, angle: 240, progress: 45, task: "Weighting signals across agents", findings: ["Preliminary score: 84 – 89"], sources: 12, confidence: 68 },
  { id: "reco", name: "Recommendation Engine", short: "Strategy", description: "Generating strategic recommendations", icon: Star, status: "completed", color: "oklch(0.78 0.18 160)", ring: 1, angle: 120, progress: 100, task: "Top 5 moves drafted", findings: ["Lead with adaptive coaching", "Bundle nutrition in v1"], sources: 19, confidence: 90 },
];

const STAGES = ["Idea", "Research", "Competition", "Gap", "Feasibility", "Recommendations", "Blueprint"] as const;
const CURRENT_STAGE_IDX = 3;

const ACTIVITY = [
  { time: "10:31", agent: "Market Research", msg: "Analyzing industry reports and market data…", color: "oklch(0.7 0.24 300)", icon: Lightbulb },
  { time: "10:30", agent: "Competitor Agent", msg: "Found 15 key competitors", color: "oklch(0.82 0.15 210)", icon: Users },
  { time: "10:29", agent: "Gap Analysis", msg: "Identified 7 major market gaps", color: "oklch(0.78 0.18 160)", icon: Target },
  { time: "10:28", agent: "Recommendation", msg: "Generating strategic recommendations…", color: "oklch(0.78 0.18 160)", icon: Star },
  { time: "10:27", agent: "Risk & Challenge", msg: "Scanning potential risks…", color: "oklch(0.7 0.26 20)", icon: AlertTriangle },
];

function statusLabel(s: AgentStatus) {
  return s === "completed" ? "Completed" : s === "working" ? "In Progress" : s === "pending" ? "Pending" : "Error";
}
function statusColor(s: AgentStatus) {
  return s === "completed" ? "oklch(0.78 0.18 160)" : s === "working" ? "oklch(0.7 0.24 300)" : s === "pending" ? "oklch(0.65 0.02 270)" : "oklch(0.7 0.26 20)";
}

function DiscoveryGalaxy() {
  const [selected, setSelected] = useState<Agent | null>(null);
  const overall = 57;

  const stars = useMemo(
    () =>
      Array.from({ length: 80 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 4,
        size: Math.random() * 1.6 + 0.6,
        dur: 2 + Math.random() * 4,
      })),
    [],
  );

  return (
    <div className="relative min-h-screen text-foreground overflow-hidden">
      {/* Cosmic backdrop */}
      <StarField stars={stars} />

      <div className="relative z-10 flex min-h-screen">
        <Sidebar />

        <main className="flex-1 min-w-0 flex flex-col">
          <TopBar />

          <div className="flex flex-1 min-h-0 gap-6 px-6 pb-6">
            {/* Galaxy takes ~70% */}
            <section className="relative flex-1 min-w-0">
              <Galaxy agents={AGENTS} onSelect={setSelected} overall={overall} />
              <StageTrack />
            </section>

            <aside className="w-[340px] shrink-0 flex flex-col gap-4">
              <LiveActivity />
              <ProgressPanel agents={AGENTS} overall={overall} />
            </aside>
          </div>
        </main>
      </div>

      {selected && <AgentPanel agent={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

/* ---------- Star field ---------- */
function StarField({ stars }: { stars: { top: number; left: number; delay: number; size: number; dur: number }[] }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.55 0.28 320 / 0.55), transparent 65%)", animation: "drift 18s ease-in-out infinite" }}
      />
      <div
        className="absolute top-40 right-0 h-[420px] w-[420px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.5 0.25 260 / 0.55), transparent 65%)", animation: "drift 22s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.5 0.24 300 / 0.5), transparent 65%)", animation: "drift 26s ease-in-out infinite" }}
      />
      {stars.map((s, i) => (
        <span
          key={i}
          className="star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
            boxShadow: "0 0 6px white",
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Sidebar ---------- */
function Sidebar() {
  const items = [
    { icon: LayoutDashboard, label: "Dashboard", active: false },
    { icon: Plus, label: "New Analysis", active: false },
    { icon: Sparkles, label: "Discovery Galaxy", active: true },
    { icon: Settings, label: "Settings", active: false },
  ];
  return (
    <aside className="w-[260px] shrink-0 border-r border-white/5 bg-[oklch(0.14_0.04_275/0.5)] backdrop-blur-xl flex flex-col">
      <div className="px-6 pt-6 pb-8 flex items-center gap-3">
        <div className="relative h-11 w-11 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, oklch(0.7 0.24 300), oklch(0.55 0.28 320))", boxShadow: "var(--shadow-glow)" }}>
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="text-[15px] font-semibold tracking-tight">AI Idea Forge</div>
          <div className="text-[11px] text-muted-foreground">Forge Ideas. Build Impact.</div>
        </div>
      </div>

      <nav className="px-3 flex flex-col gap-1">
        {items.map((it) => (
          <button
            key={it.label}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
              it.active
                ? "text-white"
                : "text-muted-foreground hover:text-white hover:bg-white/5"
            }`}
            style={
              it.active
                ? { background: "linear-gradient(135deg, oklch(0.7 0.24 300 / 0.25), oklch(0.55 0.28 320 / 0.15))", border: "1px solid oklch(0.7 0.24 300 / 0.4)", boxShadow: "0 0 24px oklch(0.7 0.24 300 / 0.25)" }
                : {}
            }
          >
            <it.icon className="h-4 w-4" />
            <span className="font-medium">{it.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-6 px-4">
        <div className="glass p-4">
          <div className="text-xs text-muted-foreground mb-3">Analysis Details</div>
          <div className="space-y-2.5 text-[13px]">
            <div><div className="text-muted-foreground text-[11px]">Idea</div><div className="font-medium">AI Fitness Coach</div></div>
            <div><div className="text-muted-foreground text-[11px]">Industry</div><div className="font-medium">Health & Fitness</div></div>
            <div><div className="text-muted-foreground text-[11px]">Goal</div><div className="font-medium leading-snug">Validate market & build product blueprint</div></div>
            <div><div className="text-muted-foreground text-[11px]">Started</div><div className="font-medium">May 25, 2025 · 10:30 AM</div></div>
          </div>
        </div>
      </div>

      <div className="mt-4 px-4">
        <div className="glass p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4" style={{ color: "oklch(0.78 0.19 55)" }} />
            <span className="text-sm font-medium">AI Credits</span>
          </div>
          <div className="text-lg font-semibold">8,540 <span className="text-sm text-muted-foreground font-normal">/ 10,000</span></div>
          <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: "85%", background: "linear-gradient(90deg, oklch(0.7 0.24 300), oklch(0.82 0.15 210))" }} />
          </div>
          <button className="mt-3 w-full rounded-lg text-xs font-medium py-2 text-white/90 border border-white/10 hover:bg-white/5 transition">
            ✦ Upgrade Plan
          </button>
        </div>
      </div>

      <div className="mt-auto px-4 pb-5">
        <button className="w-full glass p-3 flex items-center gap-3 text-left hover:bg-white/[0.03] transition">
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="text-sm font-medium">Need Help?</div>
            <div className="text-[11px] text-muted-foreground">View documentation</div>
          </div>
        </button>
      </div>
    </aside>
  );
}

/* ---------- Top bar ---------- */
function TopBar() {
  return (
    <header className="flex items-center justify-between gap-6 px-6 pt-6 pb-5">
      <div>
        <h1 className="text-[28px] font-semibold tracking-tight text-gradient">Discovery Galaxy</h1>
        <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
          Our AI agents are researching, analyzing and forging your idea into actionable insights.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button className="glass px-4 py-2 text-xs font-medium flex items-center gap-2 hover:bg-white/5 transition">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "oklch(0.78 0.18 160)" }} />
          View After Completion
        </button>
        <button className="glass px-4 py-2 text-xs font-medium flex items-center gap-2 hover:bg-white/5 transition text-muted-foreground">
          <X className="h-3.5 w-3.5" /> Cancel Analysis
        </button>
        <div className="mx-2 h-6 w-px bg-white/10" />
        <IconBtn><Moon className="h-4 w-4" /></IconBtn>
        <div className="relative"><IconBtn><Bell className="h-4 w-4" /></IconBtn>
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full text-[10px] font-semibold flex items-center justify-center text-white" style={{ background: "oklch(0.65 0.24 20)" }}>3</span>
        </div>
        <div className="ml-1 h-9 w-9 rounded-full flex items-center justify-center text-xs font-semibold text-white ring-2 ring-white/10" style={{ background: "linear-gradient(135deg, oklch(0.62 0.22 275), oklch(0.7 0.24 300))" }}>SK</div>
      </div>
    </header>
  );
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="h-9 w-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/5 transition">
      {children}
    </button>
  );
}

/* ---------- Galaxy ---------- */
function Galaxy({ agents, onSelect, overall }: { agents: Agent[]; onSelect: (a: Agent) => void; overall: number }) {
  return (
    <div className="relative glass-strong h-[640px] overflow-hidden">
      {/* Nebula inside galaxy */}
      <div aria-hidden className="absolute inset-0 opacity-70" style={{ background: "radial-gradient(circle at 50% 50%, oklch(0.35 0.22 300 / 0.35), transparent 60%)" }} />
      <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(circle at 20% 80%, oklch(0.5 0.28 320 / 0.25), transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.5 0.25 220 / 0.2), transparent 50%)" }} />

      {/* Orbits */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Orbit size={640} dashed color="oklch(0.7 0.24 300 / 0.25)" spin={90} />
        <Orbit size={460} color="oklch(0.7 0.24 300 / 0.35)" spin={-60} />
        <Orbit size={300} color="oklch(0.7 0.24 300 / 0.45)" spin={45} />
      </div>

      {/* Center core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div
            className="relative h-56 w-56 rounded-full flex flex-col items-center justify-center text-center border"
            style={{
              background: "radial-gradient(circle at 50% 40%, oklch(0.35 0.2 300 / 0.9), oklch(0.18 0.08 280 / 0.9) 70%)",
              borderColor: "oklch(0.7 0.24 300 / 0.5)",
              animation: "core-pulse 4s ease-in-out infinite",
            }}
          >
            <div className="h-10 w-10 rounded-full flex items-center justify-center mb-2" style={{ background: "linear-gradient(135deg, oklch(0.78 0.19 55), oklch(0.7 0.24 300))" }}>
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <div className="text-[11px] uppercase tracking-[0.15em] text-white/60">Your Product Idea</div>
            <div className="mt-1 text-lg font-semibold">AI Fitness Coach</div>
            <div className="mt-3 text-[10px] uppercase tracking-widest text-white/50">Idea Fitness Score</div>
            <div className="text-3xl font-bold" style={{ color: "oklch(0.85 0.18 160)" }}>87<span className="text-sm text-white/50 font-normal">/100</span></div>
            <div className="mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ background: "oklch(0.78 0.18 160 / 0.15)", color: "oklch(0.85 0.18 160)", border: "1px solid oklch(0.78 0.18 160 / 0.3)" }}>
              Strong Opportunity · {overall}%
            </div>
          </div>
        </div>
      </div>

      {/* Agents on rings */}
      {agents.map((a) => (
        <AgentNode key={a.id} agent={a} onClick={() => onSelect(a)} />
      ))}
    </div>
  );
}

function Orbit({ size, color, dashed, spin }: { size: number; color: string; dashed?: boolean; spin: number }) {
  return (
    <div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        border: `1px ${dashed ? "dashed" : "solid"} ${color}`,
        animation: `${spin > 0 ? "slow-spin" : "orbit-spin-reverse"} ${Math.abs(spin) * 2}s linear infinite`,
        boxShadow: `inset 0 0 60px ${color}`,
      }}
    >
      {/* Traveling dots on orbit */}
      <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full" style={{ background: color, boxShadow: `0 0 12px ${color}` }} />
      <span className="absolute top-1/2 -right-1 h-1.5 w-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
    </div>
  );
}

function AgentNode({ agent, onClick }: { agent: Agent; onClick: () => void }) {
  const radius = agent.ring === 0 ? 230 : 310;
  const rad = (agent.angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;
  const isWorking = agent.status === "working";
  const isCompleted = agent.status === "completed";
  const isPending = agent.status === "pending";

  const glow = isCompleted ? "oklch(0.78 0.18 160)" : isWorking ? agent.color : isPending ? "oklch(0.55 0.02 270)" : "oklch(0.7 0.26 20)";
  const Icon = agent.icon;
  const badgeText = statusLabel(agent.status);
  const badgeColor = statusColor(agent.status);

  // Label placement: agent on left half → label to the left
  const isLeft = Math.cos(rad) < -0.15;
  const isRight = Math.cos(rad) > 0.15;

  return (
    <button
      onClick={onClick}
      className="absolute left-1/2 top-1/2 group"
      style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
    >
      <div
        className="relative h-16 w-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
        style={{
          background: "oklch(0.16 0.05 275 / 0.85)",
          border: `1.5px solid ${glow}`,
          color: glow,
          boxShadow: `0 0 24px ${glow}, inset 0 0 16px ${glow}`,
          animation: isWorking ? "agent-pulse 2s ease-in-out infinite" : undefined,
        }}
      >
        <Icon className="h-6 w-6" />
        {isCompleted && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-white" style={{ background: "oklch(0.78 0.18 160)" }}>
            <Check className="h-3 w-3" />
          </span>
        )}
      </div>

      {/* Label */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 w-44 text-center ${isLeft ? "right-full mr-3 text-right" : isRight ? "left-full ml-3 text-left" : "left-1/2 -translate-x-1/2 mt-2 top-full translate-y-0"}`}
      >
        <div className="flex items-center gap-1.5 justify-inherit" style={{ justifyContent: isLeft ? "flex-end" : isRight ? "flex-start" : "center" }}>
          <span className="text-[13px] font-semibold text-white whitespace-nowrap">{agent.name}</span>
          <span
            className="text-[9px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap"
            style={{ color: badgeColor, background: `${badgeColor} / 0.15`, backgroundColor: "transparent", border: `1px solid ${badgeColor}` }}
          >
            {badgeText}
          </span>
        </div>
        <div className="mt-0.5 text-[11px] text-white/55 leading-tight">{agent.description}</div>
      </div>
    </button>
  );
}

/* ---------- Live activity ---------- */
function LiveActivity() {
  return (
    <div className="glass-strong p-5">
      <div className="flex items-center gap-2 mb-1">
        <span className="h-2 w-2 rounded-full" style={{ background: "oklch(0.78 0.18 160)", boxShadow: "0 0 8px oklch(0.78 0.18 160)" }} />
        <h3 className="text-sm font-semibold">Live Activity</h3>
      </div>
      <p className="text-[11px] text-muted-foreground mb-4">Live updates from our AI agents</p>
      <ul className="space-y-3.5 max-h-[240px] overflow-hidden">
        {ACTIVITY.map((a, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="text-[10px] text-muted-foreground w-10 pt-1.5">{a.time}</div>
            <div className="h-8 w-8 shrink-0 rounded-lg flex items-center justify-center" style={{ background: "oklch(0.2 0.05 275)", border: `1px solid ${a.color}`, color: a.color, boxShadow: `0 0 10px ${a.color}` }}>
              <a.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[12px] font-medium truncate">{a.agent}</div>
              <div className="text-[11px] text-muted-foreground truncate">{a.msg}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Progress panel ---------- */
function ProgressPanel({ agents, overall }: { agents: Agent[]; overall: number }) {
  return (
    <div className="glass-strong p-5 flex-1 flex flex-col">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold">Overall Progress</h3>
          <p className="text-[11px] text-muted-foreground">Completion status of all AI agents</p>
        </div>
        <div className="text-2xl font-bold text-gradient">{overall}%</div>
      </div>

      <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${overall}%`, background: "linear-gradient(90deg, oklch(0.7 0.24 300), oklch(0.82 0.15 210))", boxShadow: "0 0 12px oklch(0.7 0.24 300)" }} />
      </div>

      <ul className="mt-5 space-y-2.5 flex-1">
        {agents.map((a) => {
          const c = statusColor(a.status);
          return (
            <li key={a.id} className="flex items-center gap-3 text-[12px]">
              <span className="h-4 w-4 rounded-full flex items-center justify-center shrink-0" style={{ background: `${a.status === "completed" ? "oklch(0.78 0.18 160 / 0.15)" : "oklch(0.2 0.05 275)"}`, border: `1px solid ${c}`, color: c }}>
                {a.status === "completed" ? <Check className="h-2.5 w-2.5" /> : <span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />}
              </span>
              <span className="flex-1 truncate">{a.name}</span>
              <span className="text-[10px] font-medium" style={{ color: c }}>{statusLabel(a.status)}</span>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-[12px]" style={{ color: "oklch(0.7 0.24 300)" }}>
        <Clock className="h-3.5 w-3.5" />
        <span>Est. time remaining: <span className="font-semibold">2 min 14 sec</span></span>
      </div>
    </div>
  );
}

/* ---------- Stage track ---------- */
function StageTrack() {
  return (
    <div className="glass-strong mt-4 px-6 py-4 flex items-center gap-2">
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground shrink-0 mr-3">Stage</div>
      <div className="flex items-center gap-1.5 flex-wrap flex-1">
        {STAGES.map((s, i) => {
          const done = i < CURRENT_STAGE_IDX;
          const active = i === CURRENT_STAGE_IDX;
          return (
            <div key={s} className="flex items-center gap-1.5">
              <div
                className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-all"
                style={
                  active
                    ? { background: "linear-gradient(135deg, oklch(0.7 0.24 300 / 0.35), oklch(0.82 0.15 210 / 0.25))", border: "1px solid oklch(0.7 0.24 300 / 0.6)", color: "white", boxShadow: "0 0 20px oklch(0.7 0.24 300 / 0.5)" }
                    : done
                    ? { background: "oklch(0.78 0.18 160 / 0.12)", border: "1px solid oklch(0.78 0.18 160 / 0.35)", color: "oklch(0.85 0.18 160)" }
                    : { background: "oklch(0.2 0.04 275 / 0.5)", border: "1px solid oklch(1 0 0 / 0.06)", color: "oklch(0.65 0.02 270)" }
                }
              >
                {done && "✓ "}{s}
              </div>
              {i < STAGES.length - 1 && (
                <span className="h-px w-4" style={{ background: done ? "oklch(0.78 0.18 160 / 0.6)" : "oklch(1 0 0 / 0.1)" }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Agent detail panel ---------- */
function AgentPanel({ agent, onClose }: { agent: Agent; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  const Icon = agent.icon;
  const c = statusColor(agent.status);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md glass-strong p-6 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: `0 0 60px ${agent.color}` }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10">
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "oklch(0.2 0.05 275)", border: `1.5px solid ${agent.color}`, color: agent.color, boxShadow: `0 0 20px ${agent.color}` }}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">AI Agent</div>
            <h3 className="text-lg font-semibold">{agent.name}</h3>
            <span className="mt-1 inline-block text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ color: c, border: `1px solid ${c}` }}>{statusLabel(agent.status)}</span>
          </div>
        </div>

        <div className="mt-5">
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">Current task</div>
          <div className="text-sm">{agent.task}</div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="uppercase tracking-widest text-muted-foreground">Progress</span>
            <span className="font-semibold" style={{ color: c }}>{agent.progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${agent.progress}%`, background: `linear-gradient(90deg, ${agent.color}, oklch(0.82 0.15 210))`, boxShadow: `0 0 10px ${agent.color}` }} />
          </div>
        </div>

        {agent.findings.length > 0 && (
          <div className="mt-5">
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Key findings</div>
            <ul className="space-y-1.5">
              {agent.findings.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px]">
                  <span className="mt-1.5 h-1 w-1 rounded-full shrink-0" style={{ background: agent.color }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="glass p-3">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Sources analyzed</div>
            <div className="mt-1 text-xl font-semibold">{agent.sources}</div>
          </div>
          <div className="glass p-3">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Confidence</div>
            <div className="mt-1 text-xl font-semibold" style={{ color: agent.color }}>{agent.confidence}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
