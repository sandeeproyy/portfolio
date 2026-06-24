import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { PixelCard } from "@/components/ui/PixelCard";
import { skillsData } from "@/data/skills-data";
import { projects } from "@/data/projects";
import { useUIStore } from "@/lib/ui-store";
import { playSound } from "@/lib/sound";
import { Boxes, Terminal, BrainCircuit, Eye, Bot, Wrench } from "lucide-react";
import { TechIcon } from "@/components/ui/TechIcon";

// Recruiter Mode imports
import { SectionContainer } from "@/components/layout/SectionContainer";
import { ProjectCard } from "@/components/recruiter/ProjectCard";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Sandeep Roy" },
      {
        name: "description",
        content:
          "Technical skills across mechanical engineering, programming, machine learning, computer vision, and robotics.",
      },
      { property: "og:title", content: "Skills — Sandeep Roy" },
      {
        property: "og:description",
        content:
          "Technical skills across mechanical engineering, programming, machine learning, computer vision, and robotics.",
      },
    ],
  }),
  component: SkillsPage,
});

const iconMap: Record<string, React.ElementType> = {
  Boxes,
  Terminal,
  BrainCircuit,
  Eye,
  Bot,
  Wrench,
};

function FloatingSkill({
  skill,
  color,
  delay,
}: {
  skill: { name: string; level: number };
  color: string;
  delay: number;
}) {
  return (
    <div
      className="absolute anim-float-orbit"
      style={{
        animationDelay: `${delay}s`,
        top: `${Math.random() * 70 + 15}%`,
        left: `${Math.random() * 80 + 10}%`,
      }}
    >
      <div
        className="pixel-border pixel-bevel p-2 flex items-center justify-center transition-transform hover:scale-110 cursor-default group relative bg-obsidian/80 backdrop-blur-sm"
        style={{ borderColor: color }}
        title={`${skill.name}: ${skill.level}%`}
      >
        <TechIcon name={skill.name} size={32} className="text-white" />
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-obsidian text-on-dark text-[10px] px-2 py-0.5 pixel-border whitespace-nowrap z-30 font-mono">
          {skill.name} ({skill.level}%)
        </span>
      </div>
    </div>
  );
}

function RecruiterSkillsPage() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  function handleSkillClick(skillName: string) {
    playSound("click");
    setSelectedSkill((prev) => (prev === skillName ? null : skillName));
  }

  const matchingProjects = selectedSkill
    ? projects.filter((p) =>
        p.stack.some((s) => s.name.toLowerCase() === selectedSkill.toLowerCase()),
      )
    : [];

  return (
    <SectionContainer className="pt-24 space-y-16">
      <header className="text-center space-y-4">
        <span className="text-xs font-bold tracking-wider text-blue-500 uppercase">
          TECH STACK & CORE SKILLS
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Skills & Expertise
        </h1>
        <p className="text-zinc-400 max-w-xl mx-auto text-base leading-relaxed">
          My engineering toolkit bridges mechanical assembly design with real-time controls and
          machine learning pipelines.
        </p>
      </header>

      {/* Skills Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillsData.map((category) => {
          const Icon = iconMap[category.icon] || Boxes;
          return (
            <div
              key={category.name}
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col space-y-6"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3">
                <div
                  className="p-2.5 rounded-lg text-zinc-950 text-sm font-bold bg-zinc-800/80"
                  style={{ color: category.color }}
                >
                  <Icon size={20} />
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">{category.name}</h3>
              </div>

              {/* Skills list */}
              <ul className="space-y-4 flex-1">
                {category.skills.map((skill) => {
                  const isSelected = selectedSkill === skill.name;
                  return (
                    <li key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-medium">
                        <button
                          onClick={() => handleSkillClick(skill.name)}
                          className={`flex items-center gap-2 text-left hover:text-blue-400 transition-colors font-semibold py-0.5 px-1.5 rounded text-xs cursor-pointer ${
                            isSelected
                              ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                              : "text-zinc-300"
                          }`}
                        >
                          <TechIcon name={skill.name} size={16} className="shrink-0" />
                          <span>{skill.name}</span>
                        </button>
                        <span className="text-xs text-zinc-500 font-semibold">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                        <div
                          className="h-full bg-blue-600 transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Skills to Projects Cross-Reference section */}
      <div className="border-t border-zinc-900 pt-10 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Skills to Projects Finder</h3>
          <p className="text-zinc-400 text-sm mt-1">
            {selectedSkill
              ? `Showing builds that utilize: ${selectedSkill}`
              : "Click any highlighted skill text above to view related engineering projects."}
          </p>
        </div>

        {selectedSkill ? (
          matchingProjects.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {matchingProjects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-zinc-900 border border-zinc-800 rounded-xl">
              <p className="text-zinc-500 text-sm">
                No major featured project lists this skill in its core stack. More builds are coming
                soon!
              </p>
            </div>
          )
        ) : (
          <div className="p-8 text-center bg-zinc-900/40 border border-zinc-900 rounded-xl border-dashed">
            <p className="text-zinc-500 text-sm">Select a skill above to search my portfolio.</p>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}

function GameSkillsPage() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-10 text-center anim-slide-up">
        <div className="font-display text-[10px] text-diamond text-shadow-pixel tracking-widest">
          TECH STACK
        </div>
        <h1 className="mt-2 font-display text-2xl md:text-4xl text-foreground text-shadow-pixel">
          Skills & Technologies
        </h1>
        <p className="mt-3 mx-auto max-w-2xl text-muted-foreground font-mono text-sm leading-relaxed">
          My toolkit spans mechanical design, software engineering, and artificial intelligence.
          Here's what I use to build autonomous systems.
        </p>
      </header>

      {/* Floating Skills Visualization (Desktop Only) */}
      <div
        ref={containerRef}
        className="hidden md:block relative h-64 mb-12 pixel-border pixel-bevel overflow-hidden section-gradient"
      >
        {mounted &&
          skillsData.flatMap((category, catIdx) =>
            category.skills
              .slice(0, 3)
              .map((skill, skillIdx) => (
                <FloatingSkill
                  key={`${category.name}-${skill.name}`}
                  skill={skill}
                  color={category.color}
                  delay={catIdx * 0.5 + skillIdx * 0.2}
                />
              )),
          )}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-display text-4xl opacity-10 text-on-dark-muted">SKILL MATRIX</span>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillsData.map((category, idx) => {
          const Icon = iconMap[category.icon] || Boxes;
          return (
            <PixelCard
              key={category.name}
              tone="obsidian"
              className="p-5 flex flex-col anim-slide-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 pixel-border" style={{ backgroundColor: category.color }}>
                  <Icon size={24} color="#111" />
                </div>
                <h2 className="font-display text-sm text-on-dark text-shadow-pixel">
                  {category.name}
                </h2>
              </div>

              <ul className="space-y-3 flex-1 font-mono text-[14px]">
                {category.skills.map((skill) => (
                  <li key={skill.name}>
                    <div className="flex items-center gap-2 text-on-dark mb-1">
                      <TechIcon name={skill.name} size={16} className="text-white shrink-0" />
                      <span>{skill.name}</span>
                    </div>
                    {/* Minecraft-style progress bar */}
                    <div className="h-2 w-full bg-black/50 pixel-border border-b-0 border-r-0 border-l-0 overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: category.color,
                          boxShadow: `inset 0 2px 0 0 rgba(255,255,255,0.3)`,
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </PixelCard>
          );
        })}
      </div>
    </main>
  );
}

function SkillsPage() {
  const { viewMode } = useUIStore();

  if (viewMode === "simple") {
    return <RecruiterSkillsPage />;
  }

  return <GameSkillsPage />;
}
