import { createFileRoute, Link } from "@tanstack/react-router";
import { PixelCard } from "@/components/ui/PixelCard";
import { ProjectIcon } from "@/components/ui/ProjectIcon";
import { ItemTooltip } from "@/components/ui/ItemTooltip";
import { projects } from "@/data/projects";
import { Github } from "lucide-react";

export const Route = createFileRoute("/builds/")({
  head: () => ({
    meta: [
      { title: "Builds — Sandeep Roy" },
      { name: "description", content: "A gallery of robotics, mechanical, and ML projects: VIO drone, 6-DOF arm, IPMC deep regressor, solar attendance system." },
      { property: "og:title", content: "Builds — Sandeep Roy" },
      { property: "og:description", content: "Gallery of shipped engineering projects." },
    ],
  }),
  component: BuildsGallery,
});

function BuildsGallery() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-10 text-center anim-slide-up">
        <div className="font-display text-[10px] text-diamond text-shadow-pixel tracking-widest">INVENTORY</div>
        <h1 className="mt-2 font-display text-2xl md:text-4xl text-foreground text-shadow-pixel">Builds</h1>
        <p className="mt-3 mx-auto max-w-2xl text-muted-foreground" style={{ fontFamily: "var(--font-hud)", fontSize: 18 }}>
          My featured engineering projects across robotics, ML, and hardware. Click a build to view details, metrics, and live demos.
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
            <PixelCard tone="stone" className="h-full flex flex-col p-0 overflow-hidden transition-transform hover:-translate-y-1">
              {/* Image placeholder */}
              <div className="h-48 bg-gradient-to-br from-obsidian/80 to-stone/60 flex items-center justify-center relative overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,oklch(0.78_0.14_200/0.05)_10px,oklch(0.78_0.14_200/0.05)_20px)]" />
                <ProjectIcon variant={p.icon} size={80} />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className={`font-display text-[10px] text-shadow-pixel ${p.tier === 'diamond' ? 'text-diamond' : 'text-gold-mc'}`}>
                    {p.tier.toUpperCase()} TIER
                  </div>
                  {p.github && (
                    <div className="flex items-center gap-1 text-on-dark-muted hover:text-diamond transition-colors">
                      <Github size={14} />
                      <span className="font-hud text-sm" style={{ fontFamily: "var(--font-hud)" }}>Code</span>
                    </div>
                  )}
                </div>
                <h2 className="font-display text-base text-on-dark text-shadow-pixel leading-tight mb-2">{p.title}</h2>
                <p className="text-on-dark-muted flex-1" style={{ fontFamily: "var(--font-hud)", fontSize: 17 }}>
                  {p.tagline}
                </p>
                <div className="mt-4 pt-4 border-t-2 border-obsidian/20 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 3).map((s) => (
                    <ItemTooltip key={s.name} title={`Level ${s.level}`}>
                      <span className="pixel-border bg-obsidian/70 text-diamond px-2 py-0.5 text-xs" style={{ fontFamily: "var(--font-hud)", fontSize: 14 }}>
                        {s.name}
                      </span>
                    </ItemTooltip>
                  ))}
                  {p.stack.length > 3 && (
                    <span className="pixel-border bg-obsidian/40 text-on-dark px-2 py-0.5 text-xs" style={{ fontFamily: "var(--font-hud)", fontSize: 14 }}>
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