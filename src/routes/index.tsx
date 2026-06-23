import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, useEffect, useState } from "react";
import { ClientOnly } from "@/components/util/ClientOnly";
import { PixelButton } from "@/components/ui/PixelButton";
import { PixelCard } from "@/components/ui/PixelCard";
import { ProjectIcon } from "@/components/ui/ProjectIcon";
import { ItemTooltip } from "@/components/ui/ItemTooltip";
import { DayNightToggle } from "@/components/layout/DayNightToggle";
import { projects } from "@/data/projects";
import { playSound } from "@/lib/sound";
import { useUIStore } from "@/lib/ui-store";

// Recruiter Mode imports
import { SectionContainer } from "@/components/layout/SectionContainer";
import { MetricStat } from "@/components/recruiter/MetricStat";
import { ProjectCard } from "@/components/recruiter/ProjectCard";

const Hero = lazy(() => import("@/components/voxel/Hero"));

const RESUME_URL = "/resume.pdf";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sandeep Roy — Robotics & ML Portfolio" },
      {
        name: "description",
        content:
          "Mech eng undergrad building autonomous drones, 6-DOF robotic arms, and deep-learning models for soft actuators.",
      },
      { property: "og:title", content: "Sandeep Roy — Robotics & ML Portfolio" },
      { property: "og:description", content: "Voxel-style portfolio with live IK and ML demos." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Sandeep Roy",
          jobTitle: "Undergraduate Mechanical Engineer · Robotics & ML",
          email: "mailto:sandeeproy4984@gmail.com",
          url: "https://github.com/sandeeproyy",
          sameAs: ["https://github.com/sandeeproyy", "https://www.linkedin.com/in/sandeeproyy/"],
        }),
      },
    ],
  }),
  component: Spawn,
});

const STATS = [
  { label: "Projects", value: "4+" },
  { label: "Internships", value: "3" },
  { label: "Certifications", value: "9" },
  { label: "Hackathon Wins", value: "4" },
];

function Typewriter({ text, speed = 30 }: { text: string; speed?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= text.length) return;
    const t = setTimeout(() => setN(n + 1), speed);
    return () => clearTimeout(t);
  }, [n, text, speed]);
  return (
    <span style={{ fontFamily: "var(--font-hud)" }} className="text-grass text-xl md:text-2xl">
      {text.slice(0, n)}
      <span className="anim-caret">▌</span>
    </span>
  );
}

function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 pointer-events-none">
      <span
        className="font-hud text-on-dark-muted text-sm"
        style={{ fontFamily: "var(--font-hud)" }}
      >
        scroll
      </span>
      <svg width="20" height="20" viewBox="0 0 20 20" className="anim-bob text-on-dark-muted">
        <path d="M4 7 L10 13 L16 7" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
}

const SPLASH_TEXTS = [
  "ROS 2 is awesome!",
  "Inverse Kinematics inside!",
  "Powered by Coffee!",
  "Now with 100% more blocks!",
  "R² = 0.959 deep regressor!",
  "Autonomous state estimation!",
  "State-of-the-art prototyping!",
  "Biocompatible acoustics!",
  "Voxel particle engines!",
  "Operator level V!",
];

function RecruiterSpawn() {
  const featured = projects.filter((p) => p.tier === "diamond");

  return (
    <div className="font-sans text-zinc-100 min-h-screen bg-zinc-950">
      {/* ─── Hero ─── */}
      <SectionContainer className="pt-24 pb-16 md:pt-32 md:pb-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs font-bold tracking-wider text-blue-500 uppercase block">
            Sandeep Roy · Mechanical Engineer & Robotics Developer
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Building autonomous systems that think, move, and learn.
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Mechanical engineering undergraduate designing GPS-denied UAVs, FEA-verified 6-DOF
            robotic arms, and deep neural networks for soft-actuator dynamics.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/builds"
              className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-lg transition-colors cursor-pointer shadow"
            >
              Explore Builds
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 border border-zinc-700 hover:border-zinc-500 text-white font-semibold text-sm rounded-lg transition-colors"
            >
              View CV
            </a>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="w-72 h-96 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl relative bg-zinc-900 flex items-center justify-center">
            <img
              src="/Project%20Images/Sandeep1.jpeg"
              alt="Sandeep Roy Profile Headshot"
              className="size-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </SectionContainer>

      {/* ─── Stats Row ─── */}
      <div className="bg-zinc-900/40 border-y border-zinc-900 py-8">
        <SectionContainer className="py-0 md:py-0 grid grid-cols-2 md:grid-cols-4 gap-6">
          <MetricStat value="4+" label="Engineering Builds" />
          <MetricStat value="3" label="R&D Internships" />
          <MetricStat value="9" label="Technical Certs" />
          <MetricStat value="4" label="Hackathon Wins" />
        </SectionContainer>
      </div>

      {/* ─── About Section ─── */}
      <SectionContainer id="about" className="space-y-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">About Me</h2>
        <p className="text-zinc-400 text-base leading-relaxed max-w-4xl">
          I operate at the intersection of classical mechanical engineering and modern artificial
          intelligence. A B.Tech candidate in Mechanical Engineering at Jorhat Engineering College,
          I specialize in building embedded sensor fusion loops, implementing EKF and SLAM
          perception loops on Jetson Nanos, and running dynamic FEA modeling for structurally sound
          linkages. My work focuses on replacing generic models with real-world, instrumented
          hardware validated by data.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {[
            "Jorhat Engineering College",
            "B.Tech Mechanical Engineering",
            "CGPA: 7.21 / 10",
            "Class of 2027",
          ].map((tag) => (
            <span
              key={tag}
              className="text-xs bg-zinc-900 border border-zinc-800 text-blue-400 px-3.5 py-1.5 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </SectionContainer>

      {/* ─── Featured Builds ─── */}
      <SectionContainer className="space-y-8 border-t border-zinc-900">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Featured Projects</h2>
            <p className="text-zinc-400 text-sm mt-1">
              High-impact, tested systems in Robotics, ML, and CAD
            </p>
          </div>
          <Link
            to="/builds"
            className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
          >
            View All Builds →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </SectionContainer>

      {/* ─── Core Pillars ─── */}
      <SectionContainer className="space-y-8 border-t border-zinc-900">
        <h2 className="text-2xl font-bold text-white tracking-tight">Core Competencies</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-3">
            <div className="text-xl font-bold text-white">Mechanical Engineering</div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              SolidWorks assembly modeling, structural FEA analysis in ANSYS, and Fusion 360
              manufacturing optimizations for additive manufacturing.
            </p>
          </div>
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-3">
            <div className="text-xl font-bold text-white">Robotics & Controls</div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              ROS 2 middleware configurations, autonomous SLAM navigation loops (ORB-SLAM3), state
              estimation via EKF, and Arduino micro-controller integration.
            </p>
          </div>
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-3">
            <div className="text-xl font-bold text-white">Data Science & AI</div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              TensorFlow deep regression architectures, computer vision pipelines using OpenCV and
              MediaPipe, and experimental data preprocessing.
            </p>
          </div>
        </div>
      </SectionContainer>

      <footer className="border-t border-zinc-900 bg-zinc-950 py-8 text-center text-zinc-500 text-xs font-medium">
        © 2026 Sandeep Roy · Built with React 19, Tailwind v4 and TanStack Start
      </footer>
    </div>
  );
}

function GameSpawn() {
  const featured = projects.filter((p) => p.tier === "diamond");
  const { triggerToast } = useUIStore();
  const [splash, setSplash] = useState("");

  useEffect(() => {
    setSplash(SPLASH_TEXTS[Math.floor(Math.random() * SPLASH_TEXTS.length)]);
  }, []);

  function handleViewResume() {
    playSound("levelup");
    triggerToast("operator_resume.pdf Acquired", "Opened operator portfolio resume");
  }

  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[90vh] overflow-hidden">
        {/* 3D background */}
        <div className="absolute inset-0">
          <ClientOnly fallback={<div className="size-full bg-[#0a0e1a]" />}>
            <Hero />
          </ClientOnly>
        </div>

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0e1a]/80 pointer-events-none" />

        {/* Day/night toggle */}
        <div className="absolute top-4 right-4 z-10">
          <DayNightToggle />
        </div>

        {/* Hero text overlay */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 pt-24 md:pt-32 pb-8 pointer-events-none">
          <div className="pointer-events-auto">
            {/* Name badge with backdrop blur and fixed splash position to prevent overlap */}
            <div className="inline-block pixel-border pixel-bevel bg-obsidian/85 backdrop-blur-md px-5 py-4 anim-slide-up relative">
              <div className="font-display text-[10px] text-diamond text-shadow-pixel tracking-widest">
                SPAWN POINT
              </div>
              <h1 className="mt-3 font-display text-3xl md:text-5xl text-on-dark text-shadow-pixel leading-tight relative pr-12">
                SANDEEP&nbsp;ROY
                {splash && (
                  <span className="absolute -bottom-8 -right-6 md:-right-8 font-display text-[8px] md:text-[10px] text-[#f6cf57] rotate-[-12deg] select-none scale-anim-bounce pointer-events-none drop-shadow-[0_2px_0_rgba(0,0,0,0.8)] z-20">
                    {splash}
                  </span>
                )}
              </h1>
              <p className="mt-2 font-display text-[10px] md:text-xs text-on-dark-muted tracking-wider">
                MECHANICAL ENGINEERING · ROBOTICS · AI / ML
              </p>
              <div className="mt-3">
                <Typewriter text="> building autonomous systems that think, move & learn" />
              </div>
            </div>

            {/* CTA buttons */}
            <div
              className="mt-6 flex flex-wrap gap-3 anim-slide-up"
              style={{ animationDelay: "0.15s" }}
            >
              <Link to="/builds">
                <PixelButton variant="diamond">View Builds</PixelButton>
              </Link>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleViewResume}
              >
                <PixelButton variant="gold">View Resume</PixelButton>
              </a>
              <Link to="/portal">
                <PixelButton variant="redstone">Open Portal</PixelButton>
              </Link>
            </div>

            {/* Stats row */}
            <div
              className="mt-8 flex flex-wrap gap-4 anim-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              {STATS.map((s, idx) => (
                <div
                  key={s.label}
                  className="pixel-border pixel-bevel bg-obsidian/60 backdrop-blur-sm px-4 py-2 text-center transition-all duration-300 hover:scale-105 hover:bg-obsidian/80 cursor-default"
                >
                  <div className="font-display text-lg md:text-xl text-diamond text-shadow-pixel">
                    {s.value}
                  </div>
                  <div
                    className="font-hud text-on-dark-muted text-sm"
                    style={{ fontFamily: "var(--font-hud)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ScrollIndicator />
      </section>

      {/* ─── About ─── */}
      <section className="section-gradient py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 anim-slide-up">
          <div className="font-display text-[10px] text-diamond text-shadow-pixel tracking-widest">
            CAREER OBJECTIVE
          </div>
          <h2 className="mt-2 font-display text-xl md:text-2xl text-foreground text-shadow-pixel">
            About Me
          </h2>
          <p
            className="mt-4 max-w-3xl text-muted-foreground leading-relaxed font-mono"
            style={{ fontSize: 16 }}
          >
            Undergraduate B.Tech student in Mechanical Engineering at Jorhat Engineering College,
            Assam. I work at the intersection of robotics, AI, and mechanical design — building
            autonomous systems that integrate computer vision, SLAM-based navigation, and deep
            learning. From GPS-denied drones to 6-DOF robotic arms to deep regression on soft
            actuators, I design, prototype, and deploy smart platforms for complex real-world
            environments.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Jorhat Engineering College",
              "B.Tech Mechanical Engineering",
              "CGPA: 7.21 / 10",
              "Class of 2027",
            ].map((tag) => (
              <span
                key={tag}
                className="pixel-border bg-obsidian/70 text-diamond px-3 py-1 text-xs font-mono"
                style={{ fontSize: 13 }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Builds ─── */}
      <section className="section-gradient-alt py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="font-display text-[10px] text-diamond text-shadow-pixel tracking-widest">
                DIAMOND TIER
              </div>
              <h2 className="mt-2 font-display text-xl md:text-2xl text-foreground text-shadow-pixel">
                Featured Builds
              </h2>
            </div>
            <Link
              to="/builds"
              className="font-hud text-diamond underline"
              style={{ fontFamily: "var(--font-hud)", fontSize: 18 }}
            >
              view all builds →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <Link
                key={p.slug}
                to="/builds/$slug"
                params={{ slug: p.slug }}
                className="block group"
              >
                <PixelCard
                  tone="stone"
                  className="p-0 overflow-hidden transition-transform hover:-translate-y-1"
                >
                  {/* Image placeholder */}
                  <div className="h-40 bg-gradient-to-br from-obsidian/80 to-stone/60 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,oklch(0.78_0.14_200/0.05)_10px,oklch(0.78_0.14_200/0.05)_20px)]" />
                    <ProjectIcon variant={p.icon} size={72} />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-display text-[10px] text-gold-mc text-shadow-pixel">
                        DIAMOND
                      </div>
                      {p.repo && (
                        <span
                          className="font-hud text-diamond text-sm"
                          style={{ fontFamily: "var(--font-hud)" }}
                        >
                          GitHub →
                        </span>
                      )}
                    </div>
                    <div className="mt-1 font-display text-sm text-on-dark text-shadow-pixel leading-tight">
                      {p.title}
                    </div>
                    <p className="mt-2 text-on-dark-muted font-mono" style={{ fontSize: 14 }}>
                      {p.tagline}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {p.stack.slice(0, 4).map((s) => (
                        <ItemTooltip key={s.name} title={`${s.name} ${s.level}`}>
                          <span
                            className="pixel-border bg-obsidian/70 text-diamond px-2 py-0.5 text-xs font-mono"
                            style={{ fontSize: 12 }}
                          >
                            {s.name}
                          </span>
                        </ItemTooltip>
                      ))}
                    </div>
                  </div>
                </PixelCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Three Pillars ─── */}
      <section className="section-gradient py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-xl md:text-2xl text-foreground text-shadow-pixel">
            Three Pillars
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground font-mono" style={{ fontSize: 15 }}>
            Mechanical fundamentals · Robotics integration · Machine learning on real data. Each one
            backed by a shipped, instrumented project — not a tutorial.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <PixelCard tone="dirt" className="p-5 transition-transform hover:-translate-y-1">
              <div className="font-display text-[10px] text-gold-mc">MECHANICAL</div>
              <p className="mt-3 text-on-dark font-mono" style={{ fontSize: 14 }}>
                SolidWorks · ANSYS · Fusion 360 · DH parameters · PID control. From CAD to
                FEA-verified, 3D-printed hardware.
              </p>
            </PixelCard>
            <PixelCard tone="stone" className="p-5 transition-transform hover:-translate-y-1">
              <div className="font-display text-[10px] text-diamond">ROBOTICS</div>
              <p className="mt-3 text-on-dark font-mono" style={{ fontSize: 14 }}>
                ROS 2 · ORB-SLAM3 · EKF · PX4 · Jetson. Closed-loop perception → planning → control
                on real autopilots.
              </p>
            </PixelCard>
            <PixelCard tone="obsidian" className="p-5 transition-transform hover:-translate-y-1">
              <div className="font-display text-[10px] text-redstone">AI / ML</div>
              <p className="mt-3 text-on-dark font-mono" style={{ fontSize: 14 }}>
                TensorFlow · PyTorch · OpenCV · Embedded ML. R² = 0.959 deep regressor on 840 IPMC
                observations.
              </p>
            </PixelCard>
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-obsidian/60 bg-obsidian/60 py-6 text-center">
        <div
          className="font-hud text-stone"
          style={{ fontFamily: "var(--font-hud)", fontSize: 16 }}
        >
          © 2026 Sandeep Roy · Built with blocks and bytes · Minecraft-inspired (unaffiliated with
          Mojang/Microsoft)
        </div>
      </footer>
    </main>
  );
}

function Spawn() {
  const { viewMode } = useUIStore();

  if (viewMode === "simple") {
    return <RecruiterSpawn />;
  }

  return <GameSpawn />;
}
