import { type ReactNode } from "react";
import { ExternalLink } from "lucide-react";

type Props = {
  title: string;
  subtitle: string;
  date: string;
  location?: string;
  details?: string[];
  extraContent?: ReactNode;
  verifyUrl?: string;
};

export function TimelineEntry({
  title,
  subtitle,
  date,
  location,
  details = [],
  extraContent,
  verifyUrl,
}: Props) {
  return (
    <div className="relative pl-8 pb-10 last:pb-0 border-l border-zinc-800 font-sans group">
      <div className="absolute left-0 top-1.5 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-zinc-800 bg-zinc-950 group-hover:border-blue-500 transition-colors" />

      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-3">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
          <div className="text-sm font-semibold text-blue-400 mt-0.5">{subtitle}</div>
        </div>
        <div className="text-left md:text-right">
          <span className="text-xs font-semibold text-zinc-500 tracking-wide block md:inline">
            {date}
          </span>
          {location && (
            <span className="text-[11px] font-medium text-zinc-600 block md:mt-0.5">
              {location}
            </span>
          )}
        </div>
      </div>

      {details.length > 0 && (
        <ul className="space-y-2 text-zinc-400 text-sm leading-relaxed mb-4 list-disc pl-4">
          {details.map((item, idx) => (
            <li key={idx} className="marker:text-blue-500/60">
              {item}
            </li>
          ))}
        </ul>
      )}

      {extraContent}

      {verifyUrl && (
        <a
          href={verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900 px-3 py-1.5 rounded transition-all mt-2"
        >
          <span>Verify Credential</span>
          <ExternalLink size={12} />
        </a>
      )}
    </div>
  );
}
