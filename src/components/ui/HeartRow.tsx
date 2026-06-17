type Props = { count: number; max?: number; className?: string };

export function HeartRow({ count, max = 10, className = "" }: Props) {
  const full = Math.floor(count);
  const half = count - full >= 0.5;
  const empty = max - full - (half ? 1 : 0);
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${count} of ${max}`}>
      {Array.from({ length: full }).map((_, i) => (
        <Heart key={`f${i}`} state="full" />
      ))}
      {half && <Heart state="half" />}
      {Array.from({ length: Math.max(empty, 0) }).map((_, i) => (
        <Heart key={`e${i}`} state="empty" />
      ))}
    </div>
  );
}

function Heart({ state }: { state: "full" | "half" | "empty" }) {
  const fill = state === "empty" ? "transparent" : "var(--redstone)";
  const halfFill = state === "half" ? "var(--redstone)" : "transparent";
  return (
    <svg width="14" height="14" viewBox="0 0 10 10" shapeRendering="crispEdges" className="pixelated">
      <rect x="1" y="2" width="3" height="1" fill={fill} />
      <rect x="6" y="2" width="3" height="1" fill={fill} />
      <rect x="0" y="3" width="4" height="1" fill={fill} />
      <rect x="5" y="3" width="5" height="1" fill={fill} />
      <rect x="0" y="4" width="10" height="1" fill={fill} />
      <rect x="1" y="5" width="8" height="1" fill={fill} />
      <rect x="2" y="6" width="6" height="1" fill={fill} />
      <rect x="3" y="7" width="4" height="1" fill={fill} />
      <rect x="4" y="8" width="2" height="1" fill={fill} />
      {state === "half" && (
        <>
          <rect x="6" y="2" width="3" height="1" fill={halfFill} />
          <rect x="5" y="3" width="5" height="1" fill={halfFill} />
          <rect x="5" y="4" width="5" height="1" fill={halfFill} />
          <rect x="5" y="5" width="4" height="1" fill={halfFill} />
          <rect x="5" y="6" width="3" height="1" fill={halfFill} />
          <rect x="5" y="7" width="2" height="1" fill={halfFill} />
          <rect x="5" y="8" width="1" height="1" fill={halfFill} />
        </>
      )}
      <rect x="1" y="1" width="3" height="1" fill="rgba(0,0,0,0.6)" />
      <rect x="6" y="1" width="3" height="1" fill="rgba(0,0,0,0.6)" />
      <rect x="0" y="2" width="1" height="6" fill="rgba(0,0,0,0.6)" />
      <rect x="9" y="2" width="1" height="6" fill="rgba(0,0,0,0.6)" />
    </svg>
  );
}