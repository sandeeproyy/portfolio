import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PixelCard } from "@/components/ui/PixelCard";
import { ProjectIcon } from "@/components/ui/ProjectIcon";
import { ItemTooltip } from "@/components/ui/ItemTooltip";
import { projects } from "@/data/projects";
import { useUIStore } from "@/lib/ui-store";
import { Github } from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { ProjectCard } from "@/components/recruiter/ProjectCard";

export const Route = createFileRoute("/builds/")({
  head: () => ({
    meta: [
      { title: "Builds — Sandeep Roy" },
      {
        name: "description",
        content:
          "A gallery of robotics, mechanical, and ML projects: VIO drone, 6-DOF arm, IPMC deep regressor, solar attendance system.",
      },
      { property: "og:title", content: "Builds — Sandeep Roy" },
      { property: "og:description", content: "Gallery of shipped engineering projects." },
    ],
  }),
  component: BuildsGallery,
});

function RecruiterBuildsGallery() {
  const [filter, setFilter] = useState<"all" | "robotics" | "ml" | "mechanical">("all");

  const filtered = projects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "robotics") return p.slug === "autonomous-drone" || p.slug === "robotic-arm";
    if (filter === "ml") return p.slug === "ipmc-ml" || p.slug === "solar-attendance";
    if (filter === "mechanical") return p.slug === "robotic-arm" || p.slug === "autonomous-drone";
    return true;
  });

  return (
    <SectionContainer className="pt-24 space-y-10">
      <header className="text-center space-y-4">
        <span className="text-xs font-bold tracking-wider text-blue-500 uppercase">
          PROJECT INVENTORY
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Engineering Builds
        </h1>
        <p className="text-zinc-400 max-w-xl mx-auto text-base leading-relaxed">
          A showcase of hardware and software prototypes validating systems theory in robotics,
          machine learning, and mechanical design.
        </p>
      </header>

      <div className="flex flex-wrap justify-center gap-2 border-b border-zinc-900 pb-6">
        {(["all", "robotics", "ml", "mechanical"] as const).map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all capitalize cursor-pointer ${
              filter === tag
                ? "bg-zinc-100 text-zinc-950 shadow-sm"
                : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            {tag === "ml" ? "Machine Learning" : tag === "all" ? "All projects" : `${tag} design`}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </SectionContainer>
  );
}

function BuildsGallery() {
  const { viewMode } = useUIStore();

  if (viewMode === "simple") {
    return <RecruiterBuildsGallery />;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-10 text-center anim-slide-up">
        <div className="font-display text-[10px] text-diamond text-shadow-pixel tracking-widest">
          INVENTORY
        </div>
        <h1 className="mt-2 font-display text-2xl md:text-4xl text-foreground text-shadow-pixel">
          Builds
        </h1>
        <p className="mt-3 mx-auto max-w-2xl text-muted-foreground font-mono text-sm leading-relaxed">
          My featured engineering projects across robotics, ML, and hardware. Click a build to view
          details, metrics, and live demos.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            to="/builds/$slug"
            params={{ slug: p.slug }}
            className="block group anim-slide-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <PixelCard
              tone="stone"
              className="h-full flex flex-col p-0 overflow-hidden transition-transform hover:-translate-y-1"
            >
              <div className="h-48 bg-gradient-to-br from-obsidian/80 to-stone/60 flex items-center justify-center relative overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,oklch(0.78_0.14_200/0.05)_10px,oklch(0.78_0.14_200/0.05)_20px)] z-10 pointer-events-none" />
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover pixelated hover:scale-105 transition-all duration-300"
                  />
                ) : (
                  <ProjectIcon variant={p.icon} size={80} />
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div
                    className={`font-display text-[10px] text-shadow-pixel ${p.tier === "diamond" ? "text-diamond" : "text-gold-mc"}`}
                  >
                    {p.tier.toUpperCase()} TIER
                  </div>
                  {p.github && (
                    <div className="flex items-center gap-1 text-on-dark-muted hover:text-diamond transition-colors">
                      <Github size={14} />
                      <span className="font-mono text-xs">Code</span>
                    </div>
                  )}
                </div>
                <h2 className="font-display text-base text-on-dark text-shadow-pixel leading-tight mb-2">
                  {p.title}
                </h2>
                <p className="text-on-dark-muted flex-1 font-mono text-[14px]">{p.tagline}</p>
                <div className="mt-4 pt-4 border-t-2 border-obsidian/20 flex flex-wrap gap-1.5 font-mono">
                  {p.stack.slice(0, 3).map((s) => (
                    <ItemTooltip key={s.name} title={`Level ${s.level}`}>
                      <span className="pixel-border bg-obsidian/70 text-diamond px-2 py-0.5 text-xs font-mono">
                        {s.name}
                      </span>
                    </ItemTooltip>
                  ))}
                  {p.stack.length > 3 && (
                    <span className="pixel-border bg-obsidian/40 text-on-dark px-2 py-0.5 text-xs font-mono">
                      +{p.stack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </PixelCard>
          </Link>
        ))}
      </div>
    </main>
  );
}
