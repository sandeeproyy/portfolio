import { useEffect } from "react";
import { Link, useRouter, useLocation } from "@tanstack/react-router";
import { Home, Hammer, Cpu, Trophy, Grid3x3, Compass, DoorOpen, Terminal } from "lucide-react";
import { useUIStore } from "../../lib/ui-store";
import { playSound } from "../../lib/sound";

const HOTBAR_SLOTS = [
  { id: 0, label: "Home", path: "/", icon: Home, color: "#7ec850" },
  { id: 1, label: "Builds", path: "/builds", icon: Hammer, color: "#9aa0a6" },
  { id: 2, label: "Skills", path: "/skills", icon: Cpu, color: "#e84a3b" },
  { id: 3, label: "Experience", path: "/experience", icon: Trophy, color: "#5cd6ff" },
  { id: 4, label: "Crafting", path: "/crafting", icon: Grid3x3, color: "#b8884b" },
  { id: 5, label: "Advancements", path: "/advancements", icon: Compass, color: "#f6cf57" },
  { id: 6, label: "Portal", path: "/portal", icon: DoorOpen, color: "#a23bd6" },
  { id: 7, label: "", path: null, icon: null, color: null },
  { id: 8, label: "Console", path: null, icon: Terminal, color: "#3c6bd6", isConsole: true },
] as const;

export function Hotbar() {
  const { activeHotbarSlot, setActiveHotbarSlot, toggleConsole } = useUIStore();
  const router = useRouter();
  const location = useLocation();

  // Sync active slot with route
  useEffect(() => {
    const slot = HOTBAR_SLOTS.find((s) => {
      if (s.path === "/") return location.pathname === "/";
      return s.path && location.pathname.startsWith(s.path);
    });
    if (slot) setActiveHotbarSlot(slot.id);
  }, [location.pathname, setActiveHotbarSlot]);

  // Keyboard navigation (1-9 to select slot)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't hijack if typing in an input/textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      
      const key = parseInt(e.key);
      if (key >= 1 && key <= 9) {
        const slotIdx = key - 1;
        const slot = HOTBAR_SLOTS[slotIdx];
        if (slot) {
          setActiveHotbarSlot(slotIdx);
          playSound("click");
          if (slot.isConsole) {
            toggleConsole();
          } else if (slot.path) {
            router.navigate({ to: slot.path });
          }
        }
      } else if (e.key === "/") {
        // quick toggle console
        e.preventDefault();
        toggleConsole();
        setActiveHotbarSlot(8);
        playSound("click");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, setActiveHotbarSlot, toggleConsole]);

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      {/* Label showing current hovered/active item */}
      <div className="mb-2 text-center h-5">
         <span className="font-display text-[10px] text-shadow-pixel text-on-dark drop-shadow-md transition-all duration-200">
           {HOTBAR_SLOTS[activeHotbarSlot]?.label}
         </span>
      </div>
      
      <div className="flex h-12 md:h-14 bg-obsidian/95 p-1 pixel-border pixel-bevel shadow-2xl gap-1">
        {HOTBAR_SLOTS.map((slot, i) => {
          const isActive = activeHotbarSlot === i;
          const Icon = slot.icon;
          return (
            <button
              key={slot.id}
              onClick={() => {
                setActiveHotbarSlot(i);
                playSound("click");
                if (slot.isConsole) {
                  toggleConsole();
                } else if (slot.path) {
                  router.navigate({ to: slot.path });
                }
              }}
              style={isActive && slot.color ? {
                boxShadow: `inset 0 0 10px ${slot.color}60, 0 0 8px ${slot.color}35`,
                borderColor: slot.color,
                backgroundColor: `${slot.color}15`,
              } : {}}
              className={`group relative flex aspect-square h-full items-center justify-center p-1 md:p-1.5 border-2 border-transparent
                ${isActive ? "pixel-bevel" : "hover:bg-white/5"}
                transition-all duration-200`}
              onMouseEnter={() => !isActive && setActiveHotbarSlot(i)}
            >
              {/* Item Icon */}
              {Icon ? (
                <Icon 
                  size={20} 
                  className={`transition-all duration-300 stroke-[2.5]
                    ${isActive ? 'scale-115 rotate-[4deg]' : 'group-hover:scale-110 group-hover:-translate-y-0.5'}
                  `}
                  style={{
                    color: isActive ? slot.color : "oklch(0.75 0.015 250 / 0.7)",
                    filter: isActive ? `drop-shadow(0 0 3px ${slot.color}80)` : "none",
                  }}
                />
              ) : null}

              {/* Slot number hint */}
              <span className="absolute bottom-0.5 right-1 font-hud text-[9px] text-on-dark-muted/30 pointer-events-none" style={{ fontFamily: "var(--font-hud)" }}>
                {i + 1}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}