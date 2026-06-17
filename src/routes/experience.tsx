import { createFileRoute } from "@tanstack/react-router";
import { PixelCard } from "@/components/ui/PixelCard";
import { experiences, education, certifications, positions } from "@/data/experience-data";
import { Briefcase, GraduationCap, Award, Users } from "lucide-react";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Sandeep Roy" },
      { name: "description", content: "Work experience, education, certifications, and positions of responsibility." },
      { property: "og:title", content: "Experience — Sandeep Roy" },
      { property: "og:description", content: "Work experience, education, certifications, and positions of responsibility." },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-10 text-center anim-slide-up">
        <div className="font-display text-[10px] text-diamond text-shadow-pixel tracking-widest">JOURNEY</div>
        <h1 className="mt-2 font-display text-2xl md:text-4xl text-foreground text-shadow-pixel">Experience</h1>
        <p className="mt-3 mx-auto max-w-2xl text-muted-foreground" style={{ fontFamily: "var(--font-hud)", fontSize: 18 }}>
          My professional timeline, academic background, and technical certifications.
        </p>
      </header>

      <div className="space-y-16">
        {/* Work Experience */}
        <section className="anim-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 pixel-border bg-diamond">
              <Briefcase size={24} color="#111" />
            </div>
            <h2 className="font-display text-xl text-foreground text-shadow-pixel">Work Experience</h2>
          </div>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-stone/30 before:to-transparent">
            {experiences.map((exp, idx) => (
              <div key={exp.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 border-4 border-background bg-stone/95 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_2px_var(--color-obsidian)] z-10 pixelated">
                  <div className="w-3 h-3 bg-diamond anim-glow-pulse" />
                </div>
                <PixelCard tone="obsidian" className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-5">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                    <div>
                      <h3 className="font-display text-sm text-on-dark text-shadow-pixel leading-tight">{exp.role}</h3>
                      <div className="font-display text-[10px] text-gold-mc mt-1">{exp.company}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-hud text-on-dark-muted text-sm whitespace-nowrap" style={{ fontFamily: "var(--font-hud)" }}>{exp.date}</div>
                      <div className="font-display text-[8px] text-stone mt-1">{exp.type.toUpperCase()}</div>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2 font-hud text-on-dark" style={{ fontFamily: "var(--font-hud)", fontSize: 17 }}>
                    {exp.details.map((detail, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-diamond mt-0.5">▸</span>
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </PixelCard>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="anim-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 pixel-border bg-grass">
              <GraduationCap size={24} color="#111" />
            </div>
            <h2 className="font-display text-xl text-foreground text-shadow-pixel">Education</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {education.map((edu, idx) => (
              <PixelCard key={idx} tone="stone" className="p-5 flex flex-col justify-between">
                <div>
                  <div className="font-display text-[10px] text-grass text-shadow-pixel mb-2">CLASS OF {edu.year}</div>
                  <h3 className="font-display text-sm text-on-dark text-shadow-pixel leading-tight">{edu.degree}</h3>
                  <div className="mt-2 text-on-dark-muted font-hud" style={{ fontFamily: "var(--font-hud)", fontSize: 18 }}>{edu.institute}</div>
                </div>
                <div className="mt-4 pt-4 border-t-2 border-obsidian/30 font-display text-[12px] text-on-dark">
                  {edu.score}
                </div>
              </PixelCard>
            ))}
          </div>
        </section>

        {/* Certifications (The new "Enchantments") */}
        <section className="anim-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 pixel-border" style={{ backgroundColor: "#3c6bd6" }}>
              <Award size={24} color="#fff" />
            </div>
            <h2 className="font-display text-xl text-foreground text-shadow-pixel">Certifications & Awards</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {certifications.map((cert, idx) => (
              <PixelCard key={idx} tone="obsidian" className="p-4 flex flex-col justify-between min-h-[120px]">
                <div className="flex items-start gap-3">
                  <div className="pixel-border size-10 grid place-items-center shrink-0" style={{ background: "#3c6bd6" }}>
                    <svg viewBox="0 0 12 12" width="24" height="24" shapeRendering="crispEdges" className="pixelated" aria-hidden>
                      <rect x="4" y="2" width="4" height="1" fill="#5cd6ff" />
                      <rect x="3" y="3" width="6" height="1" fill="#5cd6ff" />
                      <rect x="3" y="4" width="1" height="5" fill="#5cd6ff" />
                      <rect x="8" y="4" width="1" height="5" fill="#5cd6ff" />
                      <rect x="3" y="9" width="6" height="1" fill="#5cd6ff" />
                      <rect x="5" y="5" width="2" height="3" fill="#fff" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-xs text-diamond text-shadow-pixel leading-tight">{cert.name}</div>
                    <div className="mt-1 text-on-dark-muted flex justify-between items-center" style={{ fontFamily: "var(--font-hud)", fontSize: 16 }}>
                      <span>{cert.issuer}</span>
                      <span className="font-display text-[8px] text-stone">{cert.year}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-obsidian/20 flex justify-end">
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" className="block">
                    <button className="pixel-bevel pixel-border px-3 py-1 bg-[#3c6bd6]/20 border-[#3c6bd6] text-diamond font-display text-[9px] hover:bg-[#3c6bd6]/40 hover:brightness-110 active:translate-y-px transition-all uppercase tracking-wider">
                      View Certificate
                    </button>
                  </a>
                </div>
              </PixelCard>
            ))}
          </div>
        </section>

        {/* Positions of Responsibility */}
        <section className="anim-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 pixel-border bg-redstone">
              <Users size={24} color="#fff" />
            </div>
            <h2 className="font-display text-xl text-foreground text-shadow-pixel">Positions of Responsibility</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {positions.map((pos, idx) => (
              <PixelCard key={idx} tone="dirt" className="p-4 flex flex-col justify-between">
                 <div>
                    <h3 className="font-display text-sm text-gold-mc text-shadow-pixel leading-tight">{pos.title}</h3>
                    <div className="mt-2 text-on-dark font-hud" style={{ fontFamily: "var(--font-hud)", fontSize: 17 }}>{pos.organization}</div>
                 </div>
                 <div className="mt-3 font-display text-[10px] text-stone text-right">
                    {pos.year}
                 </div>
              </PixelCard>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
