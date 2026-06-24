import { Link } from "@tanstack/react-router";
import { useUIStore } from "@/lib/ui-store";
import { playSound } from "@/lib/sound";

export function StickyNav() {
  const { viewMode, setViewMode } = useUIStore();

  function toggleMode(mode: "game" | "simple") {
    playSound("click");
    setViewMode(mode);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[49] bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800 text-zinc-100 py-3 px-6 flex justify-between items-center font-sans">
      {/* Brand Logo */}
      <Link
        to="/"
        className="text-lg font-bold tracking-tight text-white hover:text-blue-400 transition-colors"
      >
        Sandeep Roy
      </Link>

      {/* Center Links */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        <Link
          to="/"
          className="hover:text-blue-400 transition-colors [&.active]:text-blue-400"
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        <Link
          to="/builds"
          className="hover:text-blue-400 transition-colors [&.active]:text-blue-400"
        >
          Builds
        </Link>
        <Link
          to="/skills"
          className="hover:text-blue-400 transition-colors [&.active]:text-blue-400"
        >
          Skills
        </Link>
        <Link
          to="/experience"
          className="hover:text-blue-400 transition-colors [&.active]:text-blue-400"
        >
          Experience
        </Link>
        <Link
          to="/portal"
          className="hover:text-blue-400 transition-colors [&.active]:text-blue-400"
        >
          Contact
        </Link>
      </div>

      {/* Mode Switcher and Resume CTA */}
      <div className="flex items-center gap-4">
        {/* Toggle Controls */}
        <div className="flex rounded-lg bg-zinc-900 border border-zinc-800 p-0.5 text-xs font-semibold relative">
          <button
            onClick={() => toggleMode("game")}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              viewMode === "game"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Interactive
          </button>
          <button
            onClick={() => toggleMode("simple")}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              viewMode === "simple"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Professional
          </button>
        </div>

        {/* Resume Download */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playSound("levelup")}
          className="text-xs font-semibold px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-all whitespace-nowrap shadow-sm hover:shadow"
        >
          Download CV
        </a>
      </div>
    </nav>
  );
}
