import { Link } from "@tanstack/react-router";
import { Github, ArrowRight, Plane, Cpu, Activity, Sun, Lock } from "lucide-react";
import { type Project } from "@/data/projects";

type Props = {
  project: Project;
};

export function ProjectCard({ project: p }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-full font-sans transition-all duration-300 hover:border-zinc-700 hover:shadow-lg">
      <div className="h-48 bg-zinc-950 relative flex items-center justify-center overflow-hidden border-b border-zinc-800 group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-zinc-950/20 group-hover:opacity-60 transition-opacity z-10" />
        {p.image ? (
          <img
            src={p.image}
            alt={p.title}
            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
          />
        ) : (
          <div className="text-zinc-500 opacity-60 group-hover:scale-110 group-hover:text-blue-400 transition-all duration-300 z-10">
            {p.icon === "drone" && <Plane size={44} className="stroke-[1.5]" />}
            {p.icon === "arm" && <Cpu size={44} className="stroke-[1.5]" />}
            {p.icon === "ipmc" && <Activity size={44} className="stroke-[1.5]" />}
            {p.icon === "solar" && <Sun size={44} className="stroke-[1.5]" />}
            {p.icon === "locked" && <Lock size={44} className="stroke-[1.5]" />}
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase">
            {p.tier} tier
          </span>
          <span className="text-xs text-zinc-500 font-medium">{p.year}</span>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{p.title}</h3>

        <p className="text-zinc-400 text-sm mb-6 flex-1 leading-relaxed">{p.tagline}</p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {p.stack.slice(0, 4).map((s) => (
            <span
              key={s.name}
              className="text-[11px] font-medium bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-md"
            >
              {s.name}
            </span>
          ))}
          {p.stack.length > 4 && (
            <span className="text-[11px] font-medium bg-zinc-800/40 text-zinc-500 px-2 py-1 rounded">
              +{p.stack.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80">
          {p.github ? (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <Github size={14} />
              <span>Source code</span>
            </a>
          ) : (
            <span />
          )}

          <Link
            to="/builds/$slug"
            params={{ slug: p.slug }}
            className="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>View Details</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
