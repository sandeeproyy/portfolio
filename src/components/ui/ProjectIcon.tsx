type Variant = "drone" | "arm" | "ipmc" | "solar" | "locked";
type Props = { variant: Variant; size?: number; className?: string };

/** Tiny 12x12 pixel-art glyphs rendered as SVG rects. Original art, no Mojang assets. */
export function ProjectIcon({ variant, size = 48, className = "" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      shapeRendering="crispEdges"
      className={`pixelated ${className}`}
      aria-hidden
    >
      <rect width="12" height="12" fill="rgba(0,0,0,0.25)" />
      {variant === "drone" && <DronePixels />}
      {variant === "arm" && <ArmPixels />}
      {variant === "ipmc" && <IpmcPixels />}
      {variant === "solar" && <SolarPixels />}
      {variant === "locked" && <LockedPixels />}
    </svg>
  );
}

function px(x: number, y: number, fill: string, w = 1, h = 1) {
  return <rect x={x} y={y} width={w} height={h} fill={fill} />;
}

function DronePixels() {
  const body = "#9aa0a6";
  const prop = "#5cd6ff";
  const led = "#e84a3b";
  return (
    <>
      {px(1, 2, prop, 3, 1)} {px(8, 2, prop, 3, 1)}
      {px(1, 9, prop, 3, 1)} {px(8, 9, prop, 3, 1)}
      {px(2, 3, body)} {px(9, 3, body)}
      {px(2, 8, body)} {px(9, 8, body)}
      {px(4, 4, body, 4, 4)}
      {px(5, 5, "#34a3cf", 2, 2)}
      {px(5, 6, led, 2, 1)}
    </>
  );
}

function ArmPixels() {
  const base = "#7d828a";
  const link = "#f6cf57";
  const joint = "#e84a3b";
  return (
    <>
      {px(3, 10, base, 6, 1)}
      {px(4, 9, base, 4, 1)}
      {px(5, 5, link, 2, 4)}
      {px(5, 4, joint, 2, 1)}
      {px(6, 2, link, 4, 2)}
      {px(9, 1, joint, 2, 1)}
    </>
  );
}

function IpmcPixels() {
  const wave = "#3ed47a";
  const dot = "#5cd6ff";
  return (
    <>
      {px(1, 6, wave)} {px(2, 5, wave)} {px(3, 4, wave)} {px(4, 5, wave)}
      {px(5, 6, wave)} {px(6, 7, wave)} {px(7, 8, wave)} {px(8, 7, wave)}
      {px(9, 6, wave)} {px(10, 5, wave)}
      {px(2, 2, dot)} {px(5, 2, dot)} {px(8, 2, dot)}
      {px(3, 10, "#f6cf57", 6, 1)}
    </>
  );
}

function SolarPixels() {
  const sun = "#f6cf57";
  const panel = "#3c6bd6";
  const grid = "#16285c";
  return (
    <>
      {px(5, 1, sun, 2, 2)}
      {px(4, 2, sun)} {px(7, 2, sun)}
      {px(2, 5, panel, 8, 4)}
      {px(2, 6, grid, 8, 1)}
      {px(2, 8, grid, 8, 1)}
      {px(5, 5, grid, 1, 4)}
      {px(8, 5, grid, 1, 4)}
    </>
  );
}

function LockedPixels() {
  const dark = "#3f4248";
  const k = "#1a1a2e";
  return (
    <>
      {px(4, 5, dark, 4, 5)}
      {px(4, 3, dark, 1, 2)} {px(7, 3, dark, 1, 2)}
      {px(5, 2, dark, 2, 1)}
      {px(5, 7, k, 2, 1)}
      {px(5, 8, k, 2, 1)}
    </>
  );
}
