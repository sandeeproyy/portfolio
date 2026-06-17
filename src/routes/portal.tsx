import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PixelCard } from "@/components/ui/PixelCard";
import { PixelButton } from "@/components/ui/PixelButton";

const LINKS = [
  { label: "GitHub", value: "github.com/sandeeproyy", href: "https://github.com/sandeeproyy", tint: "#9aa0a6" },
  { label: "LinkedIn", value: "linkedin.com/in/sandeeproyy", href: "https://www.linkedin.com/in/sandeeproyy/", tint: "#3c6bd6" },
  { label: "Email", value: "sandeeproy4984@gmail.com", href: "mailto:sandeeproy4984@gmail.com", tint: "#3ed47a" },
  { label: "Resume", value: "view PDF →", href: "/resume.pdf", tint: "#f6cf57" },
];

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Portal — Contact · Sandeep Roy" },
      { name: "description", content: "Get in touch: GitHub, LinkedIn, email, and resume — through the obsidian portal." },
      { property: "og:title", content: "Portal — Contact · Sandeep Roy" },
      { property: "og:description", content: "Contact links + resume." },
    ],
  }),
  component: PortalPage,
});

function PortalPage() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard?.writeText("sandeeproy4984@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8 text-center anim-slide-up">
        <div className="font-display text-[10px] text-redstone text-shadow-pixel">NETHER PORTAL</div>
        <h1 className="mt-2 font-display text-2xl md:text-3xl text-on-dark text-shadow-pixel">Contact</h1>
        <p className="mt-3 mx-auto max-w-xl text-on-dark/85" style={{ fontFamily: "var(--font-hud)", fontSize: 18 }}>
          Pick a sign post to leave the overworld. The portal is always open.
        </p>
      </header>

      {/* Portal */}
      <div className="mx-auto w-fit pixel-border pixel-bevel bg-obsidian p-3 anim-slide-up" style={{ animationDelay: "0.15s" }}>
        <div
          className="relative grid grid-cols-4 grid-rows-5"
          style={{ width: 280, height: 350 }}
        >
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
      <div className="mt-10 grid gap-4 sm:grid-cols-2 anim-slide-up" style={{ animationDelay: "0.3s" }}>
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <PixelCard tone="stone" className="p-0 overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:brightness-105">
              <div className="flex items-stretch">
                <div className="w-3 shrink-0" style={{ background: l.tint }} />
                <div className="p-4 flex-1">
                  <div className="font-display text-[10px] text-gold-mc text-shadow-pixel">SIGN POST</div>
                  <div className="mt-1 font-display text-base text-on-dark text-shadow-pixel">{l.label}</div>
                  <div className="mt-1 text-on-dark/85" style={{ fontFamily: "var(--font-hud)", fontSize: 17 }}>
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
      <div className="mt-8 pixel-border pixel-bevel bg-black/70 p-3 flex items-center gap-3 flex-wrap anim-slide-up" style={{ animationDelay: "0.45s" }}>
        <span className="font-hud text-grass" style={{ fontFamily: "var(--font-hud)", fontSize: 18 }}>
          / msg sandeeproy4984@gmail.com
        </span>
        <PixelButton variant="diamond" onClick={copyEmail}>
          {copied ? "Copied!" : "Copy email"}
        </PixelButton>
      </div>
    </main>
  );
}