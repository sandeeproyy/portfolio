import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useUIStore } from "@/lib/ui-store";
import { playSound } from "@/lib/sound";

const HELP = [
  "/tp spawn          — go to home",
  "/tp builds         — open builds",
  "/tp skills         — open skills & tech stack",
  "/tp experience     — open experience & certs",
  "/tp crafting       — open crafting table",
  "/tp advancements   — open advancement tree",
  "/tp portal         — open contact portal",
  "/tp recruiter      — switch to Recruiter Mode",
  "/give resume       — view resume PDF",
  "/whoami            — print operator info",
  "/help              — list commands",
];

const ROUTES: Record<
  string,
  "/" | "/builds" | "/crafting" | "/advancements" | "/skills" | "/experience" | "/portal"
> = {
  spawn: "/",
  home: "/",
  builds: "/builds",
  projects: "/builds",
  crafting: "/crafting",
  skills: "/skills",
  advancements: "/advancements",
  timeline: "/advancements",
  experience: "/experience",
  certs: "/experience",
  enchantments: "/experience",
  portal: "/portal",
  contact: "/portal",
};

export function CommandConsole() {
  const { consoleOpen, setConsoleOpen, triggerToast } = useUIStore();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [log, setLog] = useState<string[]>(["[op] Sandeep Roy console v1.0 — type /help"]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (consoleOpen) setTimeout(() => inputRef.current?.focus(), 30);
  }, [consoleOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && consoleOpen) setConsoleOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [consoleOpen, setConsoleOpen]);

  function run(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;
    setLog((l) => [...l, `> ${cmd}`]);
    const [head, ...rest] = cmd.replace(/^\//, "").split(/\s+/);
    if (head === "help") {
      setLog((l) => [...l, ...HELP]);
    } else if (head === "tp" || head === "give") {
      const target = rest[0]?.toLowerCase();
      const to = target ? ROUTES[target] : undefined;
      if (head === "give" && target === "resume") {
        setLog((l) => [...l, `[op] Opening item [Resume PDF] for player`]);
        playSound("levelup");
        triggerToast("operator_resume.pdf Acquired", "Opened operator portfolio resume");
        window.open("/resume.pdf", "_blank");
        setTimeout(() => setConsoleOpen(false), 500);
      } else if (target === "recruiter" || target === "simple" || target === "professional") {
        setLog((l) => [...l, `[op] Switching to Recruiter Mode...`]);
        playSound("portal");
        triggerToast("Mode Shift", "Entering Professional Mode");
        useUIStore.getState().setViewMode("simple");
        navigate({ to: "/" });
        setTimeout(() => setConsoleOpen(false), 250);
      } else if (target === "game" || target === "interactive") {
        setLog((l) => [...l, `[op] Switching to Game Mode...`]);
        playSound("portal");
        triggerToast("Mode Shift", "Entering Game Mode");
        useUIStore.getState().setViewMode("game");
        navigate({ to: "/" });
        setTimeout(() => setConsoleOpen(false), 250);
      } else if (to) {
        setLog((l) => [...l, `[op] Teleporting → ${to}`]);
        playSound("portal");
        triggerToast("Beam Me Up", `Teleported to ${target}`);
        navigate({ to });
        setTimeout(() => setConsoleOpen(false), 250);
      } else {
        setLog((l) => [...l, `[err] Unknown destination/item "${target ?? ""}"`]);
      }
    } else if (head === "whoami") {
      setLog((l) => [
        ...l,
        "[op] sandeep_roy — undergrad mech_eng",
        "[op] perms: robotics:V, ai_ml:IV, cad:V",
      ]);
    } else if (head === "clear") {
      setLog([]);
    } else {
      setLog((l) => [...l, `[err] Unknown command. Type /help`]);
    }
    setValue("");
  }

  if (!consoleOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
      onClick={() => setConsoleOpen(false)}
    >
      <div
        className="pixel-border pixel-bevel bg-obsidian/95 w-full max-w-2xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-display text-[10px] text-redstone text-shadow-pixel mb-2">
          / COMMAND BLOCK
        </div>
        <div
          className="bg-black/60 p-3 h-64 overflow-y-auto text-[15px] leading-tight"
          style={{ fontFamily: "var(--font-hud)" }}
        >
          {log.map((line, i) => (
            <div
              key={i}
              className={
                line.startsWith("[err]")
                  ? "text-redstone"
                  : line.startsWith("[op]")
                    ? "text-grass"
                    : line.startsWith(">")
                      ? "text-diamond"
                      : "text-on-dark/85"
              }
            >
              {line}
            </div>
          ))}
        </div>
        <form
          className="mt-2 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            run(value);
          }}
        >
          <span className="text-grass font-hud text-lg" style={{ fontFamily: "var(--font-hud)" }}>
            &gt;
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="/help"
            className="flex-1 bg-black/50 px-2 py-1 text-on-dark outline-none border-2 border-stone/60 focus:border-diamond"
            style={{ fontFamily: "var(--font-hud)", fontSize: 16 }}
            spellCheck={false}
            autoComplete="off"
          />
        </form>
        <div className="mt-2 font-hud text-stone text-sm" style={{ fontFamily: "var(--font-hud)" }}>
          esc to close · 1–9 hotbar · / to reopen
        </div>
      </div>
    </div>
  );
}
