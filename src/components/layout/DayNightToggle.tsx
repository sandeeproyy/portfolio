import { Moon, Sun } from "lucide-react";
import { useUIStore } from "@/lib/ui-store";
import { playSound } from "@/lib/sound";

export function DayNightToggle() {
  const { theme, toggleTheme, triggerToast } = useUIStore();

  function handleToggle() {
    toggleTheme();
    playSound("click");
    if (theme === "day") {
      triggerToast("Into the Dark", "Toggled night mode");
    } else {
      triggerToast("Rise and Shine", "Toggled day mode");
    }
  }

  return (
    <button
      onClick={handleToggle}
      className="pixel-border pixel-bevel p-2 bg-obsidian/80 backdrop-blur-sm text-diamond hover:brightness-110 transition-all active:translate-y-px"
      title="Toggle Day/Night Mode"
    >
      {theme === "day" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}