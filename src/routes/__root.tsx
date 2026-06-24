import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase } from "lucide-react";

import appCss from "../styles.css?url";
import { Hotbar } from "../components/layout/Hotbar";
import { CommandConsole } from "../components/layout/CommandConsole";
import { XpBar } from "../components/layout/XpBar";
import { AdvancementsToast } from "../components/layout/AdvancementsToast";
import { useUIStore } from "../lib/ui-store";
import { ModeGate } from "../components/layout/ModeGate";
import { StickyNav } from "../components/layout/StickyNav";
import { DayNightToggle } from "../components/layout/DayNightToggle";
import { playSound } from "../lib/sound";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sandeep Roy — Portfolio" },
      {
        name: "description",
        content:
          "Undergrad mechanical engineer building robotics + AI: GPS-denied drones, 6-DOF arms, deep regression on IPMC actuators.",
      },
      { name: "author", content: "Sandeep Roy" },
      { property: "og:title", content: "Sandeep Roy — Portfolio" },
      {
        property: "og:description",
        content:
          "Undergrad mechanical engineer building robotics + AI: GPS-denied drones, 6-DOF arms, deep regression on IPMC actuators.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Sandeep Roy — Portfolio" },
      {
        name: "twitter:description",
        content:
          "Undergrad mechanical engineer building robotics + AI: GPS-denied drones, 6-DOF arms, deep regression on IPMC actuators.",
      },
      {
        property: "og:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/3bb98c3e-8f58-4aa1-a007-fa1e1cc4f1df",
      },
      {
        name: "twitter:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/3bb98c3e-8f58-4aa1-a007-fa1e1cc4f1df",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { viewMode, visitorModeChosen, isTransitioning, transitionToMode } = useUIStore();

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={
          viewMode === "game"
            ? "min-h-screen bg-background text-foreground pb-36"
            : "min-h-screen bg-background text-foreground pt-16"
        }
        data-mode={viewMode}
      >
        {visitorModeChosen && viewMode === "game" && (
          <div className="fixed top-4 right-4 z-[100] flex items-center gap-2 pointer-events-auto">
            <DayNightToggle />
            <button
              onClick={() => {
                playSound("click");
                transitionToMode("simple");
              }}
              className="pixel-border pixel-bevel bg-obsidian/90 hover:bg-stone/85 text-diamond px-3 py-2 font-display text-[9px] md:text-[10px] flex items-center gap-2 transition-all shadow-lg active:translate-y-0.5 cursor-pointer"
              title="Switch to Professional Mode"
            >
              <Briefcase size={14} className="text-diamond" />
              <span>PROFESSIONAL MODE</span>
            </button>
          </div>
        )}

        {!visitorModeChosen ? (
          <ModeGate />
        ) : (
          <>
            {viewMode === "simple" && <StickyNav />}
            <Outlet />
          </>
        )}
      </div>

      {visitorModeChosen && viewMode === "game" && (
        <>
          <Hotbar />
          <CommandConsole />
          <XpBar />
          <AdvancementsToast />
        </>
      )}

      <AnimatePresence>
        {isTransitioning && (
          <div className="fixed inset-0 z-[999999] pointer-events-none">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.45, ease: [0.77, 0, 0.175, 1] }}
              className="absolute top-0 left-0 bottom-0 w-1/2 bg-zinc-950 border-r border-zinc-800/30 flex items-center justify-end pr-4 md:pr-10"
              style={{ pointerEvents: "auto" }}
            >
              <div className="w-1.5 h-24 bg-zinc-800 rounded-full opacity-20" />
            </motion.div>

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.77, 0, 0.175, 1] }}
              className="absolute top-0 right-0 bottom-0 w-1/2 bg-zinc-950 border-l border-zinc-800/30 flex items-center justify-start pl-4 md:pl-10"
              style={{ pointerEvents: "auto" }}
            >
              <div className="w-1.5 h-24 bg-zinc-800 rounded-full opacity-20" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.9 }}
              className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-cyan-400 shadow-[0_0_15px_#22d3ee]"
            />
          </div>
        )}
      </AnimatePresence>
    </QueryClientProvider>
  );
}
