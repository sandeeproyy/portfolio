import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PixelCard } from "@/components/ui/PixelCard";
import { ItemTooltip } from "@/components/ui/ItemTooltip";
import { ingredients, matchRecipe, type Ingredient } from "@/data/skills";
import { playSound } from "@/lib/sound";
import { useUIStore } from "@/lib/ui-store";

// Recruiter Mode imports
import { SectionContainer } from "@/components/layout/SectionContainer";

export const Route = createFileRoute("/crafting")({
  head: () => ({
    meta: [
      { title: "Crafting — Skills · Sandeep Roy" },
      {
        name: "description",
        content:
          "Drag skill ingredients into a 3×3 crafting grid to see what they build — CAD + Arduino + PID → Robotic Arm, LiDAR + IMU + EKF → VIO Drone, and more.",
      },
      { property: "og:title", content: "Crafting — Skills · Sandeep Roy" },
      { property: "og:description", content: "Skills as a real Minecraft crafting recipe." },
    ],
  }),
  component: CraftingPage,
});

function getCategoryName(cat: "mech" | "robotics" | "ai" | "embedded") {
  switch (cat) {
    case "mech":
      return "Mechanical Design";
    case "robotics":
      return "Robotics Integration";
    case "ai":
      return "Artificial Intelligence / ML";
    case "embedded":
      return "Embedded Systems";
    default:
      return "";
  }
}

function RecruiterCraftingPage() {
  return (
    <SectionContainer className="pt-24 flex items-center justify-center min-h-[60vh]">
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl max-w-md text-center space-y-4 shadow-xl">
        <h2 className="text-xl font-bold text-white tracking-tight">Interactive Crafting Bench</h2>
        <p className="text-zinc-400 text-sm leading-relaxed">
          The interactive item-crafting bench is part of <strong>Game Mode</strong>. For
          professional review, please use the Skills to Projects finder on the Skills page.
        </p>
        <div className="pt-2 flex flex-col gap-2">
          <Link
            to="/skills"
            className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold tracking-wide transition-colors cursor-pointer text-center block"
          >
            Open Skills Finder
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

function GameCraftingPage() {
  const [grid, setGrid] = useState<(string | null)[]>(Array(9).fill(null));
  const [picked, setPicked] = useState<Ingredient | null>(null);
  const [prevMatch, setPrevMatch] = useState<string | null>(null);
  const { triggerToast } = useUIStore();

  const match = matchRecipe(grid);

  useEffect(() => {
    if (match) {
      if (prevMatch !== match.output.name) {
        playSound("levelup");
        triggerToast("Recipe Crafted!", `Created: ${match.output.name}`);
        setPrevMatch(match.output.name);
      }
    } else {
      setPrevMatch(null);
    }
  }, [match, prevMatch, triggerToast]);

  function place(i: number) {
    playSound("click");
    setGrid((g) => {
      const next = [...g];
      next[i] = picked ? picked.id : null;
      return next;
    });
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 font-mono">
      <header className="mb-6 anim-slide-up">
        <div className="font-display text-[10px] text-diamond text-shadow-pixel">
          CRAFTING TABLE
        </div>
        <h1 className="mt-2 font-display text-2xl md:text-3xl text-on-dark text-shadow-pixel">
          Skills
        </h1>
        <p className="mt-3 max-w-2xl text-on-dark/85" style={{ fontSize: 16 }}>
          Pick an ingredient, then tap a slot. Some combinations produce a known build — try CAD +
          Arduino + PID.
        </p>
      </header>

      <div
        className="grid gap-6 lg:grid-cols-[auto_1fr] anim-slide-up"
        style={{ animationDelay: "0.15s" }}
      >
        {/* Crafting table */}
        <div className="pixel-border pixel-bevel bg-wood/85 p-3 inline-block self-start">
          <div className="flex items-center gap-3">
            <div className="grid grid-cols-3 gap-2">
              {grid.map((id, i) => {
                const ing = ingredients.find((x) => x.id === id);
                const cellButton = (
                  <button
                    onClick={() => place(i)}
                    className="pixel-bevel-inset size-16 md:size-20 bg-stone/40 grid place-items-center hover:bg-stone/60"
                    aria-label={`slot ${i + 1}${ing ? `, ${ing.name}` : ", empty"}`}
                  >
                    {ing && (
                      <span
                        className={`size-10 md:size-12 pixel-border ${ing.color} grid place-items-center`}
                      >
                        <span className="font-display text-[10px] text-obsidian text-center leading-none px-0.5">
                          {ing.label}
                        </span>
                      </span>
                    )}
                  </button>
                );

                return ing ? (
                  <ItemTooltip key={i} title={ing.name} subtitle={getCategoryName(ing.category)}>
                    {cellButton}
                  </ItemTooltip>
                ) : (
                  <div key={i}>{cellButton}</div>
                );
              })}
            </div>
            <div className="font-display text-xl text-stone">→</div>
            <div
              className={`pixel-bevel-inset size-20 md:size-24 bg-obsidian/60 grid place-items-center transition-all duration-300 ${match ? "shadow-[0_0_25px_#5cd6ff] border border-diamond bg-obsidian" : ""}`}
            >
              {match ? (
                <ItemTooltip title={match.output.name} subtitle="Crafted Output">
                  <span className="size-14 md:size-16 pixel-border bg-diamond grid place-items-center text-center anim-block-pop">
                    <span className="font-display text-[9px] text-obsidian leading-tight px-1">
                      {match.output.name}
                    </span>
                  </span>
                </ItemTooltip>
              ) : (
                <span
                  className="font-hud text-stone text-sm"
                  style={{ fontFamily: "var(--font-hud)" }}
                >
                  ?
                </span>
              )}
            </div>
          </div>
          <div className="mt-3 flex gap-2 items-center">
            <button
              onClick={() => setGrid(Array(9).fill(null))}
              className="pixel-border bg-redstone text-on-dark px-3 py-1 font-display text-[10px]"
            >
              CLEAR
            </button>
            {match && (
              <div
                className="pixel-border bg-obsidian/80 px-3 py-1 text-grass"
                style={{ fontSize: 14 }}
              >
                {match.output.lore}
              </div>
            )}
            {match?.output.href && (
              <Link
                to={match.output.href as "/builds"}
                className="pixel-border bg-diamond text-obsidian px-3 py-1 font-display text-[10px]"
              >
                OPEN BUILD →
              </Link>
            )}
          </div>
        </div>

        {/* Inventory */}
        <PixelCard tone="obsidian" className="p-4">
          <div className="font-display text-[10px] text-gold-mc text-shadow-pixel mb-3">
            INVENTORY · {picked ? `selected: ${picked.name}` : "pick an ingredient"}
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {ingredients.map((ing) => (
              <ItemTooltip key={ing.id} title={ing.name} subtitle={getCategoryName(ing.category)}>
                <button
                  onClick={() => setPicked(ing)}
                  aria-pressed={picked?.id === ing.id}
                  className={`pixel-bevel-inset size-14 grid place-items-center hover:bg-stone/60 ${
                    picked?.id === ing.id ? "outline outline-2 outline-diamond" : "bg-stone/30"
                  }`}
                >
                  <span className={`size-10 pixel-border ${ing.color} grid place-items-center`}>
                    <span className="font-display text-[9px] text-obsidian leading-none text-center px-0.5">
                      {ing.label}
                    </span>
                  </span>
                </button>
              </ItemTooltip>
            ))}
          </div>
          <p className="mt-3 text-on-dark/70 text-sm" style={{ fontSize: 13 }}>
            Tip: tap an empty slot to remove. The output diamond locks in when a known recipe
            matches.
          </p>
        </PixelCard>
      </div>

      {/* SR fallback */}
      <section className="sr-only">
        <h2>All skills</h2>
        <ul>
          {ingredients.map((i) => (
            <li key={i.id}>{i.name}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function CraftingPage() {
  const { viewMode } = useUIStore();

  if (viewMode === "simple") {
    return <RecruiterCraftingPage />;
  }

  return <GameCraftingPage />;
}
