import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { PixelCard } from "@/components/ui/PixelCard";
import { PixelButton } from "@/components/ui/PixelButton";
import { ProjectIcon } from "@/components/ui/ProjectIcon";
import { HeartRow } from "@/components/ui/HeartRow";
import { ItemTooltip } from "@/components/ui/ItemTooltip";
import { projects, type Project } from "@/data/projects";
import { useUIStore } from "@/lib/ui-store";
import { Github, ExternalLink, ArrowLeft, Plane, Cpu, Activity, Sun, Lock } from "lucide-react";
import { TechIcon } from "@/components/ui/TechIcon";

// Recruiter Mode imports
import { SectionContainer } from "@/components/layout/SectionContainer";

const ArmIK = lazy(() => import("@/components/demos/ArmIK"));
const IpmcInference = lazy(() => import("@/components/demos/IpmcInference"));

export const Route = createFileRoute("/builds/$slug")({
  loader: ({ params }): { project: Project } => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    if (!p) return { meta: [{ title: "Build — Sandeep Roy" }] };
    return {
      meta: [
        { title: `${p.title} — Sandeep Roy` },
        { name: "description", content: p.tagline },
        { property: "og:title", content: `${p.title} — Sandeep Roy` },
        { property: "og:description", content: p.tagline },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="font-display text-2xl text-foreground text-shadow-pixel">
        404 · Build not found
      </h1>
      <p className="mt-3 text-muted-foreground font-mono text-base">
        That recipe doesn't exist in the inventory.
      </p>
      <div className="mt-6">
        <Link to="/builds">
          <PixelButton variant="diamond">Back to builds</PixelButton>
        </Link>
      </div>
    </div>
  ),
  component: BuildDetail,
});

function RecruiterBuildDetail({ p }: { p: Project }) {
  return (
    <SectionContainer className="pt-24 space-y-10">
      {/* Back link */}
      <div>
        <Link
          to="/builds"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to builds</span>
        </Link>
      </div>

      {/* Header Panel */}
      <header className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl flex flex-col md:flex-row gap-6 md:items-center">
        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 shrink-0 self-start text-zinc-400 flex items-center justify-center">
          {p.icon === "drone" && <Plane size={36} className="stroke-[1.5] text-blue-400" />}
          {p.icon === "arm" && <Cpu size={36} className="stroke-[1.5] text-blue-400" />}
          {p.icon === "ipmc" && <Activity size={36} className="stroke-[1.5] text-blue-400" />}
          {p.icon === "solar" && <Sun size={36} className="stroke-[1.5] text-blue-400" />}
          {p.icon === "locked" && <Lock size={36} className="stroke-[1.5] text-blue-400" />}
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold px-2.5 py-1 bg-zinc-800 text-zinc-300 rounded-md uppercase">
              {p.year}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 bg-blue-900/40 text-blue-400 rounded-md uppercase">
              {p.tier} tier
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {p.title}
          </h1>
          <p className="text-zinc-400 text-base leading-relaxed">{p.tagline}</p>
          {p.github && (
            <div className="pt-2">
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
              >
                <Github size={14} />
                <span>View Source Code</span>
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Main Project Image / Video */}
      {p.image && (
        <div className="w-full h-[300px] md:h-[450px] bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg relative flex items-center justify-center">
          {p.image.endsWith(".mp4") ? (
            <video
              src={p.image}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
          )}
        </div>
      )}

      {/* Main Layout Grid */}
      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        {/* Left Column - Details & Demos */}
        <div className="space-y-8">
          {p.sections.map((s) => (
            <div
              key={s.heading}
              className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl space-y-4"
            >
              <h2 className="text-lg font-bold text-white tracking-tight border-b border-zinc-800 pb-3">
                {s.heading}
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap">{s.body}</p>
            </div>
          ))}

          {/* Demos styled with recruiter wrap */}
          {p.demo === "arm-ik" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Interactive Kinematics Simulator
              </h3>
              <Suspense fallback={<DemoSkeleton />}>
                <ArmIK />
              </Suspense>
            </div>
          )}
          {p.demo === "ipmc-ml" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Interactive Model Inference
              </h3>
              <Suspense fallback={<DemoSkeleton />}>
                <IpmcInference />
              </Suspense>
            </div>
          )}
        </div>

        {/* Right Column - Tech Stack & Stats */}
        <aside className="space-y-6">
          {/* Tech Stack */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase border-b border-zinc-800 pb-3">
              Technologies Used
            </h3>
            <ul className="space-y-3">
              {p.stack.map((s) => (
                <li
                  key={s.name}
                  className="flex justify-between items-center border-b border-zinc-800/40 pb-2 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-2">
                    <TechIcon name={s.name} size={16} className="shrink-0 text-zinc-400" />
                    <span className="text-zinc-300 text-sm">{s.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-blue-400">Level {s.level}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Metrics */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase border-b border-zinc-800 pb-3">
              Performance Indicators
            </h3>
            <ul className="space-y-4">
              {p.metrics.map((m) => (
                <li key={m.label} className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-medium">
                    <span className="text-zinc-400">{m.label}</span>
                    <span className="text-blue-400">{m.value}</span>
                  </div>
                  {typeof m.hearts === "number" && (
                    <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                      <div className="h-full bg-blue-600" style={{ width: `${m.hearts * 10}%` }} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </SectionContainer>
  );
}

function BuildDetail() {
  const { project: p } = Route.useLoaderData() as { project: Project };
  const { viewMode } = useUIStore();

  if (viewMode === "simple") {
    return <RecruiterBuildDetail p={p} />;
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 anim-slide-up">
      <div className="mb-6">
        <Link
          to="/builds"
          className="inline-flex items-center gap-2 font-mono text-diamond hover:brightness-110 transition-all text-base"
        >
          <ArrowLeft size={16} />
          back to builds
        </Link>
      </div>

      <header className="pixel-border pixel-bevel bg-obsidian/90 p-5 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 md:items-center">
          <div className="bg-stone/40 p-3 pixel-bevel-inset shrink-0 self-start">
            <ProjectIcon variant={p.icon} size={80} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <div className="font-display text-[10px] text-diamond text-shadow-pixel px-2 py-1 bg-stone/40 pixel-bevel-inset">
                {p.year.toUpperCase()}
              </div>
              <div
                className={`font-display text-[10px] text-shadow-pixel px-2 py-1 bg-stone/40 pixel-bevel-inset ${p.tier === "diamond" ? "text-diamond" : "text-gold-mc"}`}
              >
                {p.tier.toUpperCase()} TIER
              </div>
            </div>
            <h1 className="font-display text-2xl md:text-3xl text-on-dark text-shadow-pixel leading-tight">
              {p.title}
            </h1>
            <p className="mt-3 text-on-dark-muted font-mono text-lg">{p.tagline}</p>
            <div className="mt-4 flex gap-3">
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 pixel-border pixel-bevel bg-stone hover:bg-cobble text-on-dark px-3 py-1.5 font-display text-[10px] transition-colors"
                >
                  <Github size={14} /> View Code
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Image / Video Display */}
      <div className="mt-6 w-full h-[300px] md:h-[450px] pixel-border pixel-bevel bg-stone/20 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.01)_10px,rgba(255,255,255,0.01)_20px)] z-10 pointer-events-none" />
        {p.image ? (
          p.image.endsWith(".mp4") ? (
            <video
              src={p.image}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover pixelated"
            />
          ) : (
            <img
              src={p.image}
              alt={p.title}
              className="absolute inset-0 w-full h-full object-cover pixelated"
            />
          )
        ) : (
          <div className="z-10 text-center">
            <ProjectIcon variant={p.icon} size={120} className="mx-auto mb-4 opacity-50" />
            <div className="font-display text-sm text-on-dark-muted">No Media Available</div>
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Body */}
        <div className="space-y-6">
          {p.sections.map((s) => (
            <PixelCard key={s.heading} tone="stone" className="p-5 md:p-6">
              <h2 className="font-display text-base md:text-lg text-gold-mc text-shadow-pixel mb-4 border-b-2 border-obsidian/20 pb-2">
                {s.heading}
              </h2>
              <p
                className="text-on-dark leading-relaxed whitespace-pre-wrap font-mono"
                style={{ fontSize: 15 }}
              >
                {s.body}
              </p>
            </PixelCard>
          ))}

          {p.demo === "arm-ik" && (
            <div className="mt-8">
              <h3 className="font-display text-lg text-diamond text-shadow-pixel mb-4">
                Interactive Demo
              </h3>
              <Suspense fallback={<DemoSkeleton />}>
                <ArmIK />
              </Suspense>
            </div>
          )}
          {p.demo === "ipmc-ml" && (
            <div className="mt-8">
              <h3 className="font-display text-lg text-diamond text-shadow-pixel mb-4">
                Interactive Demo
              </h3>
              <Suspense fallback={<DemoSkeleton />}>
                <IpmcInference />
              </Suspense>
            </div>
          )}
        </div>

        {/* Sidebar: tooltip-style enchantments + metrics */}
        <aside className="space-y-6">
          <PixelCard tone="obsidian" className="p-5">
            <div className="font-display text-[12px] text-diamond text-shadow-pixel mb-4 flex items-center gap-2">
              <span className="text-xl leading-none">✨</span> ENCHANTMENTS
            </div>
            <ul className="space-y-2 font-mono text-base">
              {p.stack.map((s) => (
                <li
                  key={s.name}
                  className="flex justify-between items-center border-b border-stone/30 pb-2 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-2">
                    <TechIcon name={s.name} size={16} className="text-white shrink-0" />
                    <span className="text-on-dark">{s.name}</span>
                  </div>
                  <ItemTooltip title={`Level ${s.level}`}>
                    <span className="text-diamond font-display text-[10px]">LVL {s.level}</span>
                  </ItemTooltip>
                </li>
              ))}
            </ul>
          </PixelCard>

          <PixelCard tone="obsidian" className="p-5">
            <div className="font-display text-[12px] text-redstone text-shadow-pixel mb-4 flex items-center gap-2">
              <span className="text-xl leading-none">📊</span> METRICS
            </div>
            <ul className="space-y-4 font-mono text-base">
              {p.metrics.map((m) => (
                <li key={m.label}>
                  <div className="flex justify-between text-on-dark-muted mb-1">
                    <span>{m.label}</span>
                    <span className="text-grass">{m.value}</span>
                  </div>
                  {typeof m.hearts === "number" && (
                    <HeartRow count={m.hearts} max={10} className="mt-1" />
                  )}
                </li>
              ))}
            </ul>
          </PixelCard>
        </aside>
      </div>
    </main>
  );
}

function DemoSkeleton() {
  return (
    <div className="pixel-border pixel-bevel bg-stone/30 h-72 grid place-items-center">
      <span className="font-display text-[10px] text-on-dark-muted">loading demo…</span>
    </div>
  );
}
