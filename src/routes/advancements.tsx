import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { advancements, type AdvancementNode } from "@/data/timeline";
import { useUIStore } from "@/lib/ui-store";
import { SectionContainer } from "@/components/layout/SectionContainer";

export const Route = createFileRoute("/advancements")({
  head: () => ({
    meta: [
      { title: "Advancements — Sandeep Roy" },
      {
        name: "description",
        content:
          "Education and experience as an advancement tree: Foundations → Mechanical → Robotics → AI/ML.",
      },
      { property: "og:title", content: "Advancements — Sandeep Roy" },
      { property: "og:description", content: "Timeline of education and projects." },
    ],
  }),
  component: AdvancementsPage,
});

const BRANCH_COLOR: Record<AdvancementNode["branch"], string> = {
  foundations: "#9aa0a6",
  mechanical: "#f6cf57",
  robotics: "#5cd6ff",
  ai: "#3ed47a",
};

function RecruiterAdvancementsPage() {
  return (
    <SectionContainer className="pt-24 flex items-center justify-center min-h-[60vh]">
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl max-w-md text-center space-y-4 shadow-xl">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Interactive Advancement Tree
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed">
          The scrollable 2D node map connecting my projects is part of <strong>Game Mode</strong>.
          For professional review, please use the Certifications and Education logs on the
          Experience page.
        </p>
        <div className="pt-2 flex flex-col gap-2">
          <Link
            to="/experience"
            className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold tracking-wide transition-colors cursor-pointer text-center block"
          >
            Open Experience & Certs
          </Link>
          <button
            onClick={() => useUIStore.getState().setViewMode("game")}
            className="w-full py-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 rounded-lg text-xs font-semibold tracking-wide transition-colors cursor-pointer"
          >
            Switch to Game Mode
          </button>
        </div>
      </div>
    </SectionContainer>
  );
}

function GameAdvancementsPage() {
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<AdvancementNode | null>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        setUnlocked((u) => {
          const next = new Set(u);
          entries.forEach((e) => e.isIntersecting && next.add(e.target.getAttribute("data-id")!));
          return next;
        });
      },
      { threshold: 0.4 },
    );
    Object.values(nodeRefs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const COLS = 5;
  const ROWS = 5;
  const CELL = 160;
  const W = COLS * CELL;
  const H = ROWS * CELL;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 font-mono">
      <header className="mb-6">
        <div className="font-display text-[10px] text-grass text-shadow-pixel">
          ADVANCEMENT TREE
        </div>
        <h1 className="mt-2 font-display text-2xl md:text-3xl text-on-dark text-shadow-pixel">
          Education & Experience
        </h1>
        <p className="mt-3 max-w-2xl text-on-dark/85" style={{ fontSize: 16 }}>
          Scroll to unlock nodes. Click a node to read the lore.
        </p>
      </header>

      <div className="pixel-border pixel-bevel bg-black/50 p-4 overflow-x-auto">
        <div
          className="relative"
          style={{
            width: W,
            height: H,
            backgroundImage:
              "radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 0), radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 0)",
            backgroundSize: "40px 40px, 20px 20px",
            backgroundPosition: "0 0, 10px 10px",
            backgroundColor: "#0d0f15",
          }}
        >
          <svg className="absolute inset-0 pointer-events-none" width={W} height={H}>
            {advancements.flatMap((n) =>
              (n.parents ?? []).map((pid) => {
                const p = advancements.find((x) => x.id === pid);
                if (!p) return null;
                const x1 = p.col * CELL + CELL / 2;
                const y1 = p.row * CELL + CELL / 2;
                const x2 = n.col * CELL + CELL / 2;
                const y2 = n.row * CELL + CELL / 2;
                const active = unlocked.has(n.id);
                return (
                  <line
                    key={`${pid}-${n.id}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={active ? BRANCH_COLOR[n.branch] : "rgba(255,255,255,0.18)"}
                    strokeWidth="3"
                    strokeDasharray="6 6"
                  />
                );
              }),
            )}
          </svg>

          {advancements.map((n) => {
            const x = n.col * CELL;
            const y = n.row * CELL;
            const active = unlocked.has(n.id);
            const shape =
              n.kind === "task" ? "rounded-none" : n.kind === "goal" ? "rounded-full" : "rotate-45";
            return (
              <div
                key={n.id}
                ref={(el) => {
                  nodeRefs.current[n.id] = el;
                }}
                data-id={n.id}
                className="absolute"
                style={{ left: x, top: y, width: CELL, height: CELL }}
              >
                <button
                  onClick={() => setSelected(n)}
                  className={`group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-20 grid place-items-center transition-all ${
                    active ? "anim-block-pop" : "opacity-30 grayscale"
                  }`}
                  aria-label={n.title}
                >
                  <span
                    className={`pixel-border pixel-bevel grid size-16 place-items-center ${shape}`}
                    style={{ background: active ? BRANCH_COLOR[n.branch] : "#3f4248" }}
                  >
                    <span
                      className={`font-display text-[8px] text-obsidian text-center leading-tight px-1 ${
                        n.kind === "challenge" ? "-rotate-45" : ""
                      }`}
                    >
                      {n.title.split(" ").slice(0, 2).join(" ")}
                    </span>
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-40 grid place-items-center bg-black/60 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="pixel-border pixel-bevel bg-obsidian/95 max-w-md w-full p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="font-display text-[10px] text-shadow-pixel"
              style={{ color: BRANCH_COLOR[selected.branch] }}
            >
              {selected.branch.toUpperCase()} · {selected.kind.toUpperCase()}
            </div>
            <h2 className="mt-2 font-display text-lg text-on-dark text-shadow-pixel">
              {selected.title}
            </h2>
            <div className="mt-1 text-stone" style={{ fontSize: 14 }}>
              {selected.date}
            </div>
            <p className="mt-3 text-on-dark/90 leading-relaxed font-mono" style={{ fontSize: 14 }}>
              {selected.description}
            </p>
            <button
              onClick={() => setSelected(null)}
              className="mt-4 pixel-border bg-stone text-foreground px-3 py-1 font-display text-[10px]"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}

      <ol className="sr-only">
        {advancements.map((a) => (
          <li key={a.id}>
            {a.title} — {a.date} — {a.description}
          </li>
        ))}
      </ol>
    </main>
  );
}

function AdvancementsPage() {
  const { viewMode } = useUIStore();

  if (viewMode === "simple") {
    return <RecruiterAdvancementsPage />;
  }

  return <GameAdvancementsPage />;
}
