import { useRef, useState } from "react";

/**
 * 2-link analytical inverse kinematics demo, rendered as SVG.
 * Drag the target dot; joint angles + arm pose update live.
 */
export default function ArmIK() {
  const L1 = 110;
  const L2 = 90;
  const baseX = 200;
  const baseY = 220;
  const svgRef = useRef<SVGSVGElement>(null);
  const [target, setTarget] = useState({ x: 290, y: 110 });
  const [dragging, setDragging] = useState(false);

  // analytical IK for 2-link planar arm
  const dx = target.x - baseX;
  const dy = baseY - target.y; // y is up in math, down in SVG
  const dist = Math.min(Math.hypot(dx, dy), L1 + L2 - 1);
  const reachable = Math.hypot(dx, dy) <= L1 + L2 && Math.hypot(dx, dy) >= Math.abs(L1 - L2);

  const cosT2 = (dist * dist - L1 * L1 - L2 * L2) / (2 * L1 * L2);
  const t2 = Math.acos(Math.max(-1, Math.min(1, cosT2)));
  const t1 =
    Math.atan2(dy, dx) -
    Math.atan2(L2 * Math.sin(t2), L1 + L2 * Math.cos(t2));

  const j1x = baseX + L1 * Math.cos(t1);
  const j1y = baseY - L1 * Math.sin(t1);
  const j2x = j1x + L2 * Math.cos(t1 + t2);
  const j2y = j1y - L2 * Math.sin(t1 + t2);

  function pointer(e: React.PointerEvent) {
    const svg = svgRef.current!;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const loc = pt.matrixTransform(ctm.inverse());
    setTarget({ x: loc.x, y: loc.y });
  }

  return (
    <div className="pixel-border pixel-bevel bg-obsidian/80 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="font-display text-[10px] text-diamond text-shadow-pixel">LIVE DEMO · 2-LINK IK</div>
        <div className="font-hud text-stone text-sm" style={{ fontFamily: "var(--font-hud)", fontSize: 14 }}>
          drag the diamond target
        </div>
      </div>
      <svg
        ref={svgRef}
        viewBox="0 0 400 260"
        className="w-full h-auto bg-sky-night pixel-border touch-none select-none"
        onPointerDown={(e) => {
          (e.target as Element).setPointerCapture?.(e.pointerId);
          setDragging(true);
          pointer(e);
        }}
        onPointerMove={(e) => dragging && pointer(e)}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        {/* reach circle */}
        <circle cx={baseX} cy={baseY} r={L1 + L2} fill="none" stroke="rgba(92,214,255,0.18)" strokeDasharray="4 4" />
        <circle cx={baseX} cy={baseY} r={Math.abs(L1 - L2)} fill="none" stroke="rgba(232,74,59,0.18)" strokeDasharray="4 4" />
        {/* ground */}
        <rect x="0" y={baseY + 8} width="400" height="40" fill="#7a4d22" />
        <rect x="0" y={baseY + 8} width="400" height="4" fill="#7ec850" />
        {/* base */}
        <rect x={baseX - 16} y={baseY - 4} width="32" height="20" fill="#7d828a" />
        {/* link 1 */}
        <line x1={baseX} y1={baseY} x2={j1x} y2={j1y} stroke="#f6cf57" strokeWidth="14" strokeLinecap="square" />
        <circle cx={j1x} cy={j1y} r="9" fill="#e84a3b" />
        {/* link 2 */}
        <line x1={j1x} y1={j1y} x2={j2x} y2={j2y} stroke="#f6cf57" strokeWidth="12" strokeLinecap="square" />
        <circle cx={j2x} cy={j2y} r="7" fill="#e84a3b" />
        {/* target */}
        <g transform={`translate(${target.x} ${target.y}) rotate(45)`}>
          <rect x="-9" y="-9" width="18" height="18" fill={reachable ? "#5cd6ff" : "#e84a3b"} stroke="#fff" strokeWidth="2" />
        </g>
      </svg>
      <div className="mt-3 grid gap-2 sm:grid-cols-3" style={{ fontFamily: "var(--font-hud)", fontSize: 16 }}>
        <Stat label="θ₁" value={`${((t1 * 180) / Math.PI).toFixed(1)}°`} />
        <Stat label="θ₂" value={`${((t2 * 180) / Math.PI).toFixed(1)}°`} />
        <Stat label="reach" value={reachable ? "in envelope" : "OUT OF REACH"} bad={!reachable} />
      </div>
    </div>
  );
}

function Stat({ label, value, bad }: { label: string; value: string; bad?: boolean }) {
  return (
    <div className="pixel-border bg-stone/40 px-2 py-1 flex justify-between">
      <span className="text-white/70">{label}</span>
      <span className={bad ? "text-redstone" : "text-grass"}>{value}</span>
    </div>
  );
}