import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  CircleHelp,
  FileText,
  Globe2,
  HelpCircle,
  Lightbulb,
  Link2,
  LockKeyhole,
  Moon,
  Plus,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Telescope,
  Upload,
  Users,
  Zap,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/new-analysis")({
  component: NewAnalysis,
});

type AnalysesTable = {
  insert(values: Record<string, unknown>): {
    select(columns: string): {
      single(): Promise<{
        data: { id: string } | null;
        error: { message: string } | null;
      }>;
    };
  };
};

const goals = [
  {
    label: "Validate Market",
    description: "Check market potential",
    icon: BarChart3,
    color: "#4c7dff",
  },
  {
    label: "Understand Competitors",
    description: "Analyze competition",
    icon: Users,
    color: "#bd55ff",
  },
  { label: "Identify Gaps", description: "Find unmet needs", icon: Target, color: "#25b9ff" },
  {
    label: "Feasibility Check",
    description: "Technical & business fit",
    icon: BriefcaseBusiness,
    color: "#16d9a0",
  },
  {
    label: "Go-to-Market",
    description: "Strategy & positioning",
    icon: Telescope,
    color: "#00d889",
  },
] as const;

const tips = [
  {
    title: "Be specific and clear",
    description: "Include key features, target users, and the main problem you solve.",
    icon: Sparkles,
    color: "#9b52ff",
  },
  {
    title: "Add more context",
    description: "Upload documents or links to help our AI understand your idea better.",
    icon: FileText,
    color: "#287dff",
  },
  {
    title: "Choose relevant industry",
    description: "This ensures accurate market research and competitor analysis.",
    icon: BriefcaseBusiness,
    color: "#00d99a",
  },
  {
    title: "Define your primary goal",
    description: "Helps us focus the analysis on what matters most to you.",
    icon: Target,
    color: "#ffab18",
  },
] as const;

function NewAnalysis() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [activeTab, setActiveTab] = useState<"idea" | "supporting">("idea");
  const [supportingInput, setSupportingInput] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const analysesTable = (supabase as unknown as { from(table: string): AnalysesTable }).from(
      "analyses",
    );
    const { data, error } = await analysesTable
      .insert({ title: title.trim(), description: description.trim(), status: "pending" })
      .select("id")
      .single();

    if (error || !data) {
      setErrorMessage(error?.message ?? "We could not create this analysis. Please try again.");
      setIsSubmitting(false);
      return;
    }

    await navigate({ to: "/discovery/$id", params: { id: data.id } });
  }

  return (
    <div className="min-h-screen overflow-x-hidden text-foreground">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <TopBar />

          <div className="px-4 pb-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1440px] rounded-2xl border border-white/[0.09] bg-[#030b1c]/65 p-4 shadow-[0_0_60px_rgba(44,62,180,0.08)] backdrop-blur-xl sm:p-6">
              <div className="mb-6 flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-[36px]">
                    New Analysis
                  </h1>
                  <p className="mt-1 text-sm text-slate-300">
                    Let&apos;s forge your idea into a powerful product blueprint.
                  </p>
                </div>
                <StepProgress />
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_390px]"
              >
                <section className="rounded-xl border border-white/[0.08] bg-[#020a1a]/75 p-5 sm:p-7">
                  <div className="mb-7 grid grid-cols-2 rounded-lg border border-white/[0.09] bg-white/[0.02] p-1">
                    <button
                      type="button"
                      onClick={() => setActiveTab("idea")}
                      className={`rounded-md px-4 py-2.5 text-sm font-medium transition ${activeTab === "idea" ? "bg-violet-600/90 text-white shadow-[0_0_18px_rgba(124,80,255,0.3)]" : "text-slate-400 hover:text-white"}`}
                    >
                      Idea Details
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("supporting")}
                      className={`rounded-md px-4 py-2.5 text-sm font-medium transition ${activeTab === "supporting" ? "bg-violet-600/90 text-white shadow-[0_0_18px_rgba(124,80,255,0.3)]" : "text-slate-400 hover:text-white"}`}
                    >
                      Provide Your Idea
                    </button>
                  </div>

                  {activeTab === "idea" && (
                    <FormSection
                      title="What's your idea?"
                      icon={<Sparkles className="h-4 w-4" />}
                    >
                      <p className="mb-3 text-sm text-slate-400">
                        Describe your product idea in detail. The more context you provide, the
                        better our AI agents can analyze.
                      </p>
                      <label className="sr-only" htmlFor="idea-title">
                        Idea title
                      </label>
                      <input
                        id="idea-title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Give your idea a short title"
                        required
                        className="mb-3 w-full rounded-lg border border-white/[0.1] bg-white/[0.025] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500/80 focus:ring-2 focus:ring-violet-500/15"
                      />
                      <label className="sr-only" htmlFor="idea-description">
                        Idea description
                      </label>
                      <div className="relative">
                        <textarea
                          id="idea-description"
                          value={description}
                          onChange={(event) => setDescription(event.target.value.slice(0, 2000))}
                          placeholder="Example: An AI-powered fitness app that provides personalized workout plans, nutrition tracking, and real-time coaching..."
                          required
                          rows={5}
                          className="w-full resize-none rounded-lg border border-violet-500 bg-white/[0.025] px-3 py-3 text-sm leading-6 text-white outline-none shadow-[0_0_25px_rgba(129,73,255,0.12)] transition placeholder:text-slate-400 focus:ring-2 focus:ring-violet-500/20"
                        />
                        <span className="absolute bottom-2 right-3 text-[11px] text-slate-500">
                          {description.length}/2000
                        </span>
                      </div>
                    </FormSection>
                  )}

                  {activeTab === "supporting" && (
                    <FormSection                      
                      title={
                        <>
                          Add any supporting input{" "}
                        </>
                      }
                      icon={<FileText className="h-4 w-4" />}
                    >
                      <p className="mb-3 text-sm text-slate-400">
                        You can add documents, links or notes to help our AI understand your idea
                        better.
                      </p>
                      <div className="grid gap-3 md:grid-cols-3">
                        <SupportCard
                          icon={<Upload />}
                          title="Upload Document"
                          description={
                            supportingInput === "document"
                              ? "Document selected"
                              : "PDF, DOCX, TXT · Max 10MB"
                          }
                          onClick={() => setSupportingInput("document")}
                        />
                        <SupportCard
                          icon={<Link2 />}
                          title="Paste URL"
                          description={
                            supportingInput === "url"
                              ? "URL ready to add"
                              : "Website, landing page, product page, etc."
                          }
                          onClick={() => setSupportingInput("url")}
                        />
                        <SupportCard
                          icon={<FileText />}
                          title="Add Notes"
                          description={
                            supportingInput === "notes"
                              ? "Notes ready to add"
                              : "Any additional context or information"
                          }
                          onClick={() => setSupportingInput("notes")}
                        />
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                        <LockKeyhole className="h-3.5 w-3.5" /> All inputs are secure and private.
                        Your data is never shared.
                      </div>
                    </FormSection>
                  )}

                  <FormSection
                    title="The main outcome from this analysis"
                    icon={<Target className="h-4 w-4" />}
                  >
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                      {goals.map((item) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={item.label}
                            className="min-h-[88px] rounded-lg border border-white/[0.09] bg-white/[0.02] p-3 text-left"
                          >
                            <Icon className="mb-2 h-4 w-4" style={{ color: item.color }} />
                            <span className="block text-xs font-semibold text-white">
                              {item.label}
                            </span>
                            <span className="mt-1 block text-[11px] leading-4 text-slate-400">
                              {item.description}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </FormSection>

                  {errorMessage && (
                    <p
                      role="alert"
                      className="mb-4 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
                    >
                      {errorMessage}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mx-auto flex w-full max-w-[505px] items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-5 py-3 text-base font-semibold text-white shadow-[0_0_28px_rgba(117,69,255,0.35)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Sparkles className="h-4 w-4" />
                    {isSubmitting ? "Forging..." : "Forge Idea"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="mt-3 text-center text-xs text-slate-500">
                    You will be taken to the{" "}
                    <span className="text-violet-300">Discovery Galaxy</span> to start the analysis.
                  </p>
                </section>

                <aside className="space-y-4">
                  <ForgePreview />
                  <TipsPanel />
                </aside>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="hidden w-[252px] shrink-0 border-r border-white/[0.07] bg-[#020817]/70 px-5 py-6 backdrop-blur-xl lg:flex lg:flex-col">
      <div className="flex items-center gap-3 px-2">
        <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-violet-600 to-amber-300 shadow-[0_0_25px_rgba(181,71,255,0.45)]">
          <Lightbulb className="h-6 w-6 text-white" />
        </div>
        <div>
          <div className="text-[17px] font-semibold tracking-tight text-white">AI Idea Forge</div>
          <div className="text-[11px] text-slate-300">Forge Ideas. Build Impact.</div>
        </div>
      </div>
      <nav className="mt-12 space-y-2">
        <NavItem to="/dashboard" icon={<BookOpen />} label="Dashboard" />
        <NavItem to="/new-analysis" icon={<Plus />} label="New Analysis" active />
        <NavItem to="/" icon={<Settings />} label="Settings" />
      </nav>
      <div className="mt-auto space-y-16">
        <div className="rounded-xl border border-white/[0.09] bg-white/[0.02] p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <Zap className="h-4 w-4 text-amber-400" /> AI Credits
          </div>
          <div className="mt-4 text-sm text-white">8,540 / 10,000</div>
          <div className="mt-3 h-2 rounded-full bg-slate-800">
            <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-violet-600 to-blue-400" />
          </div>
          <button
            type="button"
            className="mt-5 flex w-full items-center gap-2 border-t border-white/[0.08] pt-4 text-sm text-white"
          >
            <Sparkles className="h-4 w-4 text-amber-400" /> Upgrade Plan
          </button>
        </div>
        <div className="rounded-xl border border-white/[0.09] bg-white/[0.02] p-4">
          <div className="flex items-center gap-3 text-sm font-medium text-white">
            <HelpCircle className="h-5 w-5 text-violet-300" /> Need Help?
          </div>
          <div className="mt-1 pl-8 text-xs text-slate-400">View documentation</div>
        </div>
      </div>
    </aside>
  );
}

function NavItem({
  to,
  icon,
  label,
  active = false,
}: {
  to: "/" | "/dashboard" | "/new-analysis";
  icon: ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-4 rounded-lg px-4 py-3 text-sm transition ${active ? "bg-gradient-to-r from-indigo-600 to-blue-700 text-white shadow-[0_0_22px_rgba(66,67,230,0.35)]" : "text-slate-200 hover:bg-white/[0.05]"}`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function TopBar() {
  return (
    <header className="mx-auto flex max-w-[1440px] items-center justify-end gap-3 px-4 py-5 sm:px-6 lg:px-8">
      <button
        type="button"
        aria-label="Toggle theme"
        className="rounded-full border border-white/[0.12] bg-white/[0.03] p-2.5 text-slate-200"
      >
        <Moon className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Notifications"
        className="rounded-full border border-white/[0.12] bg-white/[0.03] p-2.5 text-slate-200"
      >
        <CircleHelp className="h-4 w-4" />
      </button>
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-xs font-semibold text-white">
        SK
        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#050b1b] bg-emerald-400" />
      </div>
    </header>
  );
}

function StepProgress() {
  return (
    <div className="flex items-start justify-center gap-0 sm:min-w-[550px]">
      {["Idea Details", "Context", "Preferences", "Review"].map((label, index) => (
        <div key={label} className="flex flex-1 items-start">
          <div className="flex min-w-[72px] flex-col items-center gap-2">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm ${index === 0 ? "border-violet-400 bg-violet-600 text-white shadow-[0_0_18px_rgba(124,80,255,0.45)]" : "border-white/30 bg-[#071127] text-white"}`}
            >
              {index + 1}
            </div>
            <span className="text-[11px] text-slate-300 sm:text-xs">{label}</span>
          </div>
          {index < 3 && (
            <div className="mt-5 h-px flex-1 border-t border-dashed border-slate-600" />
          )}
        </div>
      ))}
    </div>
  );
}

function FormSection({
  number,
  title,
  icon,
  children,
}: {
  number: string;
  title: ReactNode;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mb-7">
      <h2 className="flex items-center gap-2 text-base font-semibold text-white">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-500/20 text-xs font-medium text-violet-300">
          {number}.
        </span>
        {title}
        <span className="text-violet-300">{icon}</span>
      </h2>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function SupportCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group min-h-[112px] rounded-lg border border-white/[0.1] bg-white/[0.02] p-4 text-center transition hover:border-violet-400/60 hover:bg-violet-500/[0.06]"
    >
      <span className="mx-auto mb-2 flex h-7 w-7 items-center justify-center text-blue-400 transition group-hover:scale-110">
        {icon}
      </span>
      <span className="block text-sm font-medium text-white">{title}</span>
      <span className="mt-1 block text-xs leading-5 text-slate-400">{description}</span>
    </button>
  );
}

function ForgePreview() {
  return (
    <div className="rounded-xl border border-white/[0.1] bg-[#020a1a]/75 p-5 text-center">
      <div className="relative mx-auto mb-4 h-44 max-w-[310px] overflow-hidden rounded-full bg-[radial-gradient(circle_at_48%_48%,#3528a3_0%,#17115e_32%,#03071b_68%)] shadow-[0_0_40px_rgba(70,48,255,0.45)]">
        <div className="absolute left-[-8%] top-[48%] h-5 w-[116%] -rotate-[14deg] rounded-[50%] border-2 border-fuchsia-400 shadow-[0_0_16px_#ff55dc,0_0_30px_#ff9b23]" />
        <div className="absolute inset-[29%] rounded-full bg-gradient-to-br from-indigo-400/40 to-violet-950/40 blur-md" />
        <Sparkles className="absolute left-1/2 top-5 h-3 w-3 -translate-x-1/2 text-fuchsia-300" />
      </div>
      <h2 className="text-xl font-semibold text-white">Forge your idea.</h2>
      <p className="mx-auto mt-1 max-w-[280px] text-sm leading-5 text-slate-300">
        Our AI agents will research, analyze and create a powerful blueprint.
      </p>
    </div>
  );
}

function TipsPanel() {
  return (
    <div className="rounded-xl border border-white/[0.1] bg-[#020a1a]/75 p-5">
      <h2 className="flex items-center gap-2 text-base font-semibold text-white">
        <Lightbulb className="h-5 w-5 text-fuchsia-300" /> Tips for better analysis
      </h2>
      <div className="mt-5 space-y-5">
        {tips.map((tip) => {
          const Icon = tip.icon;
          return (
            <div key={tip.title} className="flex gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04]"
                style={{ color: tip.color }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">{tip.title}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-400">{tip.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 rounded-lg border border-violet-500/70 bg-violet-500/[0.07] p-4">
        <div className="flex gap-3">
          <ShieldCheck className="h-7 w-7 shrink-0 text-violet-400" />
          <div>
            <h3 className="text-sm font-medium text-white">Your ideas are safe with us</h3>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              We use enterprise-grade security and never share your data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
