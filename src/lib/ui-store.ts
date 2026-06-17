import { create } from "zustand";

type UIState = {
  theme: "day" | "night";
  toggleTheme: () => void;
  soundOn: boolean;
  toggleSound: () => void;
  consoleOpen: boolean;
  setConsoleOpen: (v: boolean) => void;
  activeHotbarSlot: number;
  setActiveHotbarSlot: (v: number) => void;
  toggleConsole: () => void;
  toast: { title: string; description: string; show: boolean } | null;
  triggerToast: (title: string, description: string) => void;
  hideToast: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  theme: "night",
  toggleTheme: () =>
    set((s) => {
      const next = s.theme === "day" ? "night" : "day";
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", next === "night");
      }
      return { theme: next };
    }),
  soundOn: false,
  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
  consoleOpen: false,
  setConsoleOpen: (v) => set({ consoleOpen: v }),
  activeHotbarSlot: 0,
  setActiveHotbarSlot: (v) => set({ activeHotbarSlot: v }),
  toggleConsole: () => set((s) => ({ consoleOpen: !s.consoleOpen })),
  toast: null,
  triggerToast: (title, description) => set({ toast: { title, description, show: true } }),
  hideToast: () => set((s) => s.toast ? { toast: { ...s.toast, show: false } } : {}),
}));