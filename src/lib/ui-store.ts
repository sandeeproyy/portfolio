import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  // Dual-mode state
  viewMode: "game" | "simple";
  visitorModeChosen: boolean;
  setViewMode: (mode: "game" | "simple") => void;
  resetModeChoice: () => void;
  isTransitioning: boolean;
  transitionTarget: "game" | "simple" | null;
  transitionToMode: (mode: "game" | "simple") => void;
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
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
      hideToast: () => set((s) => (s.toast ? { toast: { ...s.toast, show: false } } : {})),
      // Dual-mode defaults
      viewMode: "game",
      visitorModeChosen: false,
      setViewMode: (mode) => set({ viewMode: mode, visitorModeChosen: true }),
      resetModeChoice: () => set({ visitorModeChosen: false }),
      isTransitioning: false,
      transitionTarget: null,
      transitionToMode: (mode) => {
        set({ isTransitioning: true, transitionTarget: mode });

        // After doors close (450ms), toggle the mode under the hood
        setTimeout(() => {
          set({ viewMode: mode, visitorModeChosen: true, transitionTarget: null });
        }, 450);

        // After doors open (950ms), complete the transition state
        setTimeout(() => {
          set({ isTransitioning: false });
        }, 950);
      },
    }),
    {
      name: "view-mode-storage",
      partialize: (state) => ({
        viewMode: state.viewMode,
        visitorModeChosen: state.visitorModeChosen,
        soundOn: state.soundOn,
        theme: state.theme,
      }),
    },
  ),
);
