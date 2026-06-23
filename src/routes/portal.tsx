import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PixelCard } from "@/components/ui/PixelCard";
import { PixelButton } from "@/components/ui/PixelButton";
import { useUIStore } from "@/lib/ui-store";
import { playSound } from "@/lib/sound";
import { Mail, Github, Linkedin, FileText, Check, Copy } from "lucide-react";

// Recruiter Mode imports
import { SectionContainer } from "@/components/layout/SectionContainer";

const LINKS = [
  {
    label: "GitHub",
    value: "github.com/sandeeproyy",
    href: "https://github.com/sandeeproyy",
    tint: "#9aa0a6",
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/sandeeproyy",
    href: "https://www.linkedin.com/in/sandeeproyy/",
    tint: "#3c6bd6",
    icon: Linkedin,
  },
  {
    label: "Email",
    value: "sandeeproy4984@gmail.com",
    href: "mailto:sandeeproy4984@gmail.com",
    tint: "#3ed47a",
    icon: Mail,
  },
  { label: "Resume", value: "view PDF", href: "/resume.pdf", tint: "#f6cf57", icon: FileText },
];

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Portal — Contact · Sandeep Roy" },
      {
        name: "description",
        content: "Get in touch: GitHub, LinkedIn, email, and resume — through the obsidian portal.",
      },
      { property: "og:title", content: "Portal — Contact · Sandeep Roy" },
      { property: "og:description", content: "Contact links + resume." },
    ],
  }),
  component: PortalPage,
});

function RecruiterPortalPage() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    playSound("click");
    navigator.clipboard?.writeText("sandeeproy4984@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <SectionContainer className="pt-24 max-w-4xl space-y-12 font-sans">
      <header className="text-center space-y-4">
        <span className="text-xs font-bold tracking-wider text-blue-500 uppercase">
          CONTACT CHANNELS
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Connect With Me
        </h1>
        <p className="text-zinc-400 max-w-xl mx-auto text-base leading-relaxed">
          I am currently open to internship, research assistant, or full-time opportunities at the
          intersection of robotics, mechanical design, and AI.
        </p>
      </header>

      {/* Main Form/Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound("click")}
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 hover:bg-zinc-900/80 transition-all flex items-center gap-4 group"
            >
              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-850 text-blue-400 group-hover:text-blue-300 group-hover:scale-105 transition-all">
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-white tracking-tight">{link.label}</h3>
                <p className="text-zinc-500 text-xs mt-0.5 break-all font-mono">{link.value}</p>
              </div>
            </a>
          );
        })}
      </div>

      {/* Command-style Copy Widget */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-zinc-300 text-sm font-mono">
          <span className="text-blue-500 font-bold">&gt;</span>
          <span>email sandeeproy4984@gmail.com</span>
        </div>
        <button
          onClick={copyEmail}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow"
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy Email Address</span>
            </>
          )}
        </button>
      </div>
    </SectionContainer>
  );
}

function GamePortalPage() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard?.writeText("sandeeproy4984@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 font-mono">
      <header className="mb-8 text-center anim-slide-up">
        <div className="font-display text-[10px] text-redstone text-shadow-pixel">
          NETHER PORTAL
        </div>
        <h1 className="mt-2 font-display text-2xl md:text-3xl text-on-dark text-shadow-pixel">
          Contact
        </h1>
        <p className="mt-3 mx-auto max-w-xl text-on-dark/85" style={{ fontSize: 16 }}>
          Pick a sign post to leave the overworld. The portal is always open.
        </p>
      </header>

      {/* Portal */}
      <div
        className="mx-auto w-fit pixel-border pixel-bevel bg-obsidian p-3 anim-slide-up"
        style={{ animationDelay: "0.15s" }}
      >
        <div className="relative grid grid-cols-4 grid-rows-5" style={{ width: 280, height: 350 }}>
          {/* frame */}
          {Array.from({ length: 4 * 5 }).map((_, i) => {
            const r = Math.floor(i / 4);
            const c = i % 4;
            const isFrame = r === 0 || r === 4 || c === 0 || c === 3;
            return (
              <div
                key={i}
                className={`size-[70px] ${isFrame ? "bg-obsidian pixel-border" : ""}`}
                style={isFrame ? {} : { background: "transparent" }}
              />
            );
          })}
          {/* portal swirl */}
          <div
            className="absolute top-[70px] left-[70px] w-[140px] h-[210px] anim-bob"
            style={{
              background:
                "repeating-linear-gradient(45deg, #6b2a8a 0 6px, #a23bd6 6px 12px, #4b1a66 12px 18px)",
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.6)",
            }}
          />
        </div>
      </div>

      {/* Sign posts */}
      <div
        className="mt-10 grid gap-4 sm:grid-cols-2 anim-slide-up"
        style={{ animationDelay: "0.3s" }}
      >
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <PixelCard
              tone="stone"
              className="p-0 overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:brightness-105"
            >
              <div className="flex items-stretch">
                <div className="w-3 shrink-0" style={{ background: l.tint }} />
                <div className="p-4 flex-1">
                  <div className="font-display text-[10px] text-gold-mc text-shadow-pixel">
                    SIGN POST
                  </div>
                  <div className="mt-1 font-display text-base text-on-dark text-shadow-pixel">
                    {l.label}
                  </div>
                  <div className="mt-1 text-on-dark/85" style={{ fontSize: 15 }}>
                    {l.value}
                  </div>
                </div>
                <div className="grid place-items-center px-4 bg-wood/40 font-display text-diamond text-xl group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </div>
            </PixelCard>
          </a>
        ))}
      </div>

      {/* Console-style mail line */}
      <div
        className="mt-8 pixel-border pixel-bevel bg-black/70 p-3 flex items-center gap-3 flex-wrap anim-slide-up"
        style={{ animationDelay: "0.45s" }}
      >
        <span className="text-grass" style={{ fontSize: 16 }}>
          / msg sandeeproy4984@gmail.com
        </span>
        <PixelButton variant="diamond" onClick={copyEmail}>
          {copied ? "Copied!" : "Copy email"}
        </PixelButton>
      </div>
    </main>
  );
}

function PortalPage() {
  const { viewMode } = useUIStore();

  if (viewMode === "simple") {
    return <RecruiterPortalPage />;
  }

  return <GamePortalPage />;
}
