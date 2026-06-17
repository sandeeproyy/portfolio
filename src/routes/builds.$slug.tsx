import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { PixelCard } from "@/components/ui/PixelCard";
import { PixelButton } from "@/components/ui/PixelButton";
import { ProjectIcon } from "@/components/ui/ProjectIcon";
import { HeartRow } from "@/components/ui/HeartRow";
import { ItemTooltip } from "@/components/ui/ItemTooltip";
import { projects, type Project } from "@/data/projects";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";

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
      <h1 className="font-display text-2xl text-foreground text-shadow-pixel">404 · Build not found</h1>
      <p className="mt-3 text-muted-foreground" style={{ fontFamily: "var(--font-hud)", fontSize: 18 }}>
        That recipe doesn't exist in the inventory.
      </p>
      <div className="mt-6">
        <Link to="/builds"><PixelButton variant="diamond">Back to builds</PixelButton></Link>
      </div>
    </div>
  ),
  component: BuildDetail,
});

function BuildDetail() {
  const { project: p } = Route.useLoaderData() as { project: Project };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 anim-slide-up">
      <div className="mb-6">
        <Link to="/builds" className="inline-flex items-center gap-2 font-hud text-diamond hover:brightness-110 transition-all" style={{ fontFamily: "var(--font-hud)", fontSize: 18 }}>
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
               <div className="font-display text-[10px] text-diamond text-shadow-pixel px-2 py-1 bg-stone/40 pixel-bevel-inset">{p.year.toUpperCase()}</div>
               <div className={`font-display text-[10px] text-shadow-pixel px-2 py-1 bg-stone/40 pixel-bevel-inset ${p.tier === 'diamond' ? 'text-diamond' : 'text-gold-mc'}`}>{p.tier.toUpperCase()} TIER</div>
            </div>
            <h1 className="font-display text-2xl md:text-3xl text-on-dark text-shadow-pixel leading-tight">
              {p.title}
            </h1>
            <p className="mt-3 text-on-dark-muted" style={{ fontFamily: "var(--font-hud)", fontSize: 20 }}>
              {p.tagline}
            </p>
            <div className="mt-4 flex gap-3">
               {p.github && (
                 <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 pixel-border pixel-bevel bg-stone hover:bg-cobble text-on-dark px-3 py-1.5 font-display text-[10px] transition-colors">
                   <Github size={14} /> View Code
                 </a>
               )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Image / Video Placeholder */}
      <div className="mt-6 w-full h-[300px] md:h-[450px] pixel-border pixel-bevel bg-stone/20 relative overflow-hidden flex items-center justify-center">
         <div className="absolute inset-0 section-gradient opacity-50" />
         <div className="z-10 text-center">
            <ProjectIcon variant={p.icon} size={120} className="mx-auto mb-4 opacity-50" />
            <div className="font-display text-sm text-on-dark-muted">Project Media Placeholder</div>
            <div className="font-hud text-on-dark-muted mt-2" style={{ fontFamily: "var(--font-hud)", fontSize: 18 }}>({p.image})</div>
         </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Body */}
        <div className="space-y-6">
          {p.sections.map((s) => (
            <PixelCard key={s.heading} tone="stone" className="p-5 md:p-6">
              <h2 className="font-display text-base md:text-lg text-gold-mc text-shadow-pixel mb-4 border-b-2 border-obsidian/20 pb-2">
                {s.heading}
              </h2>
              <p className="text-on-dark leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "var(--font-hud)", fontSize: 19 }}>
                {s.body}
              </p>
            </PixelCard>
          ))}

          {p.demo === "arm-ik" && (
            <div className="mt-8">
               <h3 className="font-display text-lg text-diamond text-shadow-pixel mb-4">Interactive Demo</h3>
               <Suspense fallback={<DemoSkeleton />}><ArmIK /></Suspense>
            </div>
          )}
          {p.demo === "ipmc-ml" && (
            <div className="mt-8">
               <h3 className="font-display text-lg text-diamond text-shadow-pixel mb-4">Interactive Demo</h3>
               <Suspense fallback={<DemoSkeleton />}><IpmcInference /></Suspense>
            </div>
          )}
        </div>

        {/* Sidebar: tooltip-style enchantments + metrics */}
        <aside className="space-y-6">
          <PixelCard tone="obsidian" className="p-5">
            <div className="font-display text-[12px] text-diamond text-shadow-pixel mb-4 flex items-center gap-2">
               <span className="text-xl leading-none">✨</span> ENCHANTMENTS
            </div>
            <ul className="space-y-2" style={{ fontFamily: "var(--font-hud)", fontSize: 18 }}>
              {p.stack.map((s) => (
                <li key={s.name} className="flex justify-between items-center border-b border-stone/30 pb-2 last:border-0 last:pb-0">
                  <span className="text-on-dark">{s.name}</span>
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
            <ul className="space-y-4" style={{ fontFamily: "var(--font-hud)", fontSize: 18 }}>
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