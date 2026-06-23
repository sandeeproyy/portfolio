type Props = {
  value: string;
  label: string;
  className?: string;
};

export function MetricStat({ value, label, className = "" }: Props) {
  return (
    <div
      className={`p-6 bg-zinc-900 border border-zinc-800 rounded-xl text-center font-sans ${className}`}
    >
      <div className="text-4xl font-extrabold text-white tracking-tight">{value}</div>
      <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mt-2">
        {label}
      </div>
    </div>
  );
}
