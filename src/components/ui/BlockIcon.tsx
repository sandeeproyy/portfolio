type Variant =
  | "grass" | "dirt" | "stone" | "cobble" | "diamond" | "redstone"
  | "gold" | "obsidian" | "wood" | "leather" | "emerald" | "lapis";

const colorMap: Record<Variant, { top: string; side: string; shade: string }> = {
  grass:    { top: "#7ec850", side: "#8b5a2b", shade: "#5fa83f" },
  dirt:     { top: "#a0682e", side: "#7a4d22", shade: "#693f1c" },
  stone:    { top: "#9aa0a6", side: "#7d828a", shade: "#5e6268" },
  cobble:   { top: "#7f848b", side: "#5c6066", shade: "#3f4248" },
  diamond:  { top: "#5cd6ff", side: "#34a3cf", shade: "#1f7a9a" },
  redstone: { top: "#e84a3b", side: "#a83025", shade: "#6f1d17" },
  gold:     { top: "#f6cf57", side: "#c79f2b", shade: "#8a6e1b" },
  obsidian: { top: "#2a1a44", side: "#1a0f2b", shade: "#0c0716" },
  wood:     { top: "#b8884b", side: "#8a6135", shade: "#5d401f" },
  leather:  { top: "#9a6b3e", side: "#73502d", shade: "#4d361d" },
  emerald:  { top: "#3ed47a", side: "#1f9a55", shade: "#136638" },
  lapis:    { top: "#3c6bd6", side: "#264698", shade: "#16285c" },
};

type Props = {
  variant?: Variant;
  size?: number;
  className?: string;
  /** Show a small face pattern on top (for "live" feel). */
  withFace?: boolean;
};

/**
 * Isometric pixel-style block icon (pure CSS, no textures).
 * Three diamond faces emulate a Minecraft block at any size.
 */
export function BlockIcon({ variant = "stone", size = 48, className = "", withFace }: Props) {
  const c = colorMap[variant];
  const s = size;
  const h = s * 0.5; // half
  return (
    <div
      aria-hidden
      className={`relative inline-block pixelated ${className}`}
      style={{ width: s, height: s }}
    >
      <svg viewBox="0 0 100 100" width={s} height={s} className="block pixelated" shapeRendering="crispEdges">
        {/* top diamond */}
        <polygon points="50,5 95,30 50,55 5,30" fill={c.top} />
        {/* left face */}
        <polygon points="5,30 50,55 50,95 5,70" fill={c.side} />
        {/* right face */}
        <polygon points="95,30 50,55 50,95 95,70" fill={c.shade} />
        {/* highlight lines */}
        <polyline points="50,5 95,30 50,55 5,30 50,5" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" fill="none" />
        <polyline points="50,55 50,95" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" />
        {withFace && (
          <g>
            <rect x="32" y="22" width="6" height="6" fill="rgba(0,0,0,0.55)" />
            <rect x="62" y="22" width="6" height="6" fill="rgba(0,0,0,0.55)" />
            <rect x="44" y="36" width="12" height="3" fill="rgba(0,0,0,0.55)" />
          </g>
        )}
      </svg>
      {/* unused param to keep layouts square */}
      <span className="sr-only" style={{ display: "none" }}>{h}</span>
    </div>
  );
}