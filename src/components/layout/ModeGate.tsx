import { useUIStore } from "@/lib/ui-store";
import { playSound } from "@/lib/sound";
import { motion } from "framer-motion";

export function ModeGate() {
  const { setViewMode } = useUIStore();

  function selectMode(mode: "game" | "simple") {
    playSound("click");
    setViewMode(mode);
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950/90 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 p-8 shadow-2xl rounded-xl text-center"
      >
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2 font-sans">
          Welcome to Sandeep Roy's Portfolio
        </h1>
        <p className="text-zinc-400 text-sm mb-8 max-w-md mx-auto font-sans">
          Choose an interface mode to explore my background, engineering builds, and certifications.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Creative Mode */}
          <button
            onClick={() => selectMode("game")}
            className="flex flex-col items-center justify-between p-6 bg-zinc-800/40 hover:bg-zinc-800/80 border border-zinc-700 hover:border-zinc-500 transition-all rounded-lg group text-left cursor-pointer"
          >
            <div className="w-full">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase font-sans">
                  Interactive
                </span>
                <span className="text-xl group-hover:scale-110 transition-transform">🎮</span>
              </div>
              <h2 className="text-lg font-bold text-white mb-2 font-sans">Game Mode</h2>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Experience a creative Minecraft-themed HUD complete with a 3D voxel scene, item
                crafting, sound effects, and custom achievements.
              </p>
            </div>
            <span className="mt-6 w-full text-center py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded transition-colors font-sans">
              Enter Game Mode
            </span>
          </button>

          {/* Recruiter Mode */}
          <button
            onClick={() => selectMode("simple")}
            className="flex flex-col items-center justify-between p-6 bg-zinc-800/40 hover:bg-zinc-800/80 border border-zinc-700 hover:border-zinc-500 transition-all rounded-lg group text-left cursor-pointer"
          >
            <div className="w-full">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase font-sans">
                  Professional
                </span>
                <span className="text-xl group-hover:scale-110 transition-transform">💼</span>
              </div>
              <h2 className="text-lg font-bold text-white mb-2 font-sans">Recruiter Mode</h2>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                A clean, modern, high-performance portfolio layout focusing directly on my technical
                skills, engineering projects, and research internships.
              </p>
            </div>
            <span className="mt-6 w-full text-center py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded transition-colors font-sans">
              Enter Recruiter Mode
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
