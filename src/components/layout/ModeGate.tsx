import { useUIStore } from "@/lib/ui-store";
import { playSound } from "@/lib/sound";
import { motion } from "framer-motion";
import { Sparkles, Briefcase } from "lucide-react";

export function ModeGate() {
  const { transitionToMode } = useUIStore();

  function selectMode(mode: "game" | "simple") {
    playSound("click");
    transitionToMode(mode);
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950 px-4 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] bg-emerald-900/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-2xl bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-md p-8 md:p-10 shadow-2xl rounded-2xl text-center z-10"
      >
        <header className="space-y-3 mb-10">
          <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
            PORTFOLIO PORTAL
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight font-sans">
            Sandeep Roy
          </h1>
          <p className="text-zinc-400 text-sm max-w-md mx-auto font-sans leading-relaxed">
            Select a layout mode to explore my background, engineering builds, and technical
            certifications.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2">
          <button
            onClick={() => selectMode("game")}
            className="flex flex-col items-start justify-between p-6 bg-zinc-950/40 hover:bg-zinc-950/80 border border-zinc-800/80 hover:border-emerald-500/30 transition-all rounded-xl group text-left cursor-pointer h-full relative overflow-hidden"
          >
            <div className="space-y-4 w-full">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase font-sans">
                  Interactive
                </span>
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg group-hover:scale-110 transition-transform">
                  <Sparkles size={18} />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-base font-bold text-white font-sans">Game Mode</h2>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Explore a creative, Minecraft-inspired retro pixel HUD complete with an
                  interactive 3D voxel scene, dynamic item crafting bench, and audio feedback.
                </p>
              </div>
            </div>
            <div className="mt-8 w-full text-center py-2 bg-zinc-900 border border-zinc-800 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white font-semibold text-xs rounded-lg transition-all font-sans">
              Enter Interactive Mode
            </div>
          </button>

          <button
            onClick={() => selectMode("simple")}
            className="flex flex-col items-start justify-between p-6 bg-zinc-950/40 hover:bg-zinc-950/80 border border-zinc-800/80 hover:border-blue-500/30 transition-all rounded-xl group text-left cursor-pointer h-full relative overflow-hidden"
          >
            <div className="space-y-4 w-full">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider text-blue-400 uppercase font-sans">
                  Professional
                </span>
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg group-hover:scale-110 transition-transform">
                  <Briefcase size={18} />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-base font-bold text-white font-sans">Recruiter Mode</h2>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  A high-performance, clean developer resume layout highlighting technical skills,
                  research internships, and publications. Optimized for quick parsing.
                </p>
              </div>
            </div>
            <div className="mt-8 w-full text-center py-2 bg-zinc-900 border border-zinc-800 text-blue-400 group-hover:bg-blue-600 group-hover:text-white font-semibold text-xs rounded-lg transition-all font-sans">
              Enter Recruiter Mode
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
