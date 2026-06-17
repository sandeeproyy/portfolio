import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { PixelCard } from "@/components/ui/PixelCard";
import { skillsData } from "@/data/skills-data";
import { Boxes, Terminal, BrainCircuit, Eye, Bot, Wrench } from "lucide-react";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Sandeep Roy" },
      { name: "description", content: "Technical skills across mechanical engineering, programming, machine learning, computer vision, and robotics." },
      { property: "og:title", content: "Skills — Sandeep Roy" },
      { property: "og:description", content: "Technical skills across mechanical engineering, programming, machine learning, computer vision, and robotics." },
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

function FloatingSkill({ skill, color, delay }: { skill: { name: string; level: number }; color: string; delay: number }) {
  return (
    <div
      className="absolute anim-float-orbit"
      style={{
        animationDelay: `${delay}s`,
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
      }}
    >
      <div
        className="pixel-border pixel-bevel px-2 py-1 text-xs whitespace-nowrap text-on-dark transition-transform hover:scale-110 cursor-default"
        style={{ backgroundColor: `${color}80`, backdropFilter: 'blur(4px)' }}
        title={`Proficiency: ${skill.level}%`}
      >
        {skill.name}
      </div>
    </div>
  );
}

function SkillsPage() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-10 text-center anim-slide-up">
        <div className="font-display text-[10px] text-diamond text-shadow-pixel tracking-widest">TECH STACK</div>
        <h1 className="mt-2 font-display text-2xl md:text-4xl text-foreground text-shadow-pixel">Skills & Technologies</h1>
        <p className="mt-3 mx-auto max-w-2xl text-muted-foreground" style={{ fontFamily: "var(--font-hud)", fontSize: 18 }}>
          My toolkit spans mechanical design, software engineering, and artificial intelligence. 
          Here's what I use to build autonomous systems.
        </p>
      </header>

      {/* Floating Skills Visualization (Desktop Only) */}
      <div 
        ref={containerRef}
        className="hidden md:block relative h-64 mb-12 pixel-border pixel-bevel overflow-hidden section-gradient"
      >
         {mounted && skillsData.flatMap((category, catIdx) => 
            category.skills.slice(0, 3).map((skill, skillIdx) => (
              <FloatingSkill 
                key={`${category.name}-${skill.name}`}
                skill={skill}
                color={category.color}
                delay={(catIdx * 0.5) + (skillIdx * 0.2)}
              />
            ))
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
                <div 
                  className="p-2 pixel-border"
                  style={{ backgroundColor: category.color }}
                >
                  <Icon size={24} color="#111" />
                </div>
                <h2 className="font-display text-sm text-on-dark text-shadow-pixel">{category.name}</h2>
              </div>
              
              <ul className="space-y-3 flex-1" style={{ fontFamily: "var(--font-hud)", fontSize: 17 }}>
                {category.skills.map((skill) => (
                  <li key={skill.name}>
                    <div className="flex justify-between text-on-dark mb-1">
                      <span>{skill.name}</span>
                    </div>
                    {/* Minecraft-style progress bar */}
                    <div className="h-2 w-full bg-black/50 pixel-border border-b-0 border-r-0 border-l-0 overflow-hidden">
                       <div 
                         className="h-full" 
                         style={{ 
                           width: `${skill.level}%`, 
                           backgroundColor: category.color,
                           boxShadow: `inset 0 2px 0 0 rgba(255,255,255,0.3)`
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
