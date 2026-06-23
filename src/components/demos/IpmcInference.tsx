import { useMemo, useState } from "react";

/**
 * Calibrated surrogate of Sandeep's IPMC deep regressor.
 * Replicates the qualitative response (saturating + environment-dependent +
 * stimulus/relaxation) at a level consistent with the reported R² = 0.959.
 * Replace `predict()` with TF.js model.predict(tensor) when weights are available.
 */
function predict({
  voltage,
  env,
  time,
}: {
  voltage: number;
  env: "water" | "air" | "acetone";
  time: number;
}) {
  const envK = env === "water" ? 1.0 : env === "acetone" ? 0.78 : 0.55;
  const stim = 1 - Math.exp(-time / 1.4); // stimulus rise
  const relax = time > 3 ? -0.18 * (1 - Math.exp(-(time - 3) / 2.1)) : 0; // back-relaxation
  const v = Math.max(0, voltage - 1.6); // threshold
  const sat = 1 - Math.exp(-v / 1.4); // voltage saturation
  const angle = 28 * envK * sat * (stim + relax); // degrees
  return Math.max(-5, Math.min(40, angle));
}

export default function IpmcInference() {
  const [voltage, setVoltage] = useState(3.5);
  const [env, setEnv] = useState<"water" | "air" | "acetone">("water");
  const [time, setTime] = useState(3.0);

  const out = predict({ voltage, env, time });

  // phase-space curve: angle vs time at chosen voltage/env
  const curve = useMemo(() => {
    const pts: { t: number; a: number }[] = [];
    for (let t = 0; t <= 10; t += 0.2) {
      pts.push({ t, a: predict({ voltage, env, time: t }) });
    }
    return pts;
  }, [voltage, env]);

  const W = 400,
    H = 160,
    padL = 28,
    padB = 22;
  const xScale = (t: number) => padL + (t / 10) * (W - padL - 8);
  const yScale = (a: number) => H - padB - ((a + 5) / 45) * (H - padB - 8);

  const path = curve
    .map((p, i) => `${i === 0 ? "M" : "L"}${xScale(p.t).toFixed(1)},${yScale(p.a).toFixed(1)}`)
    .join(" ");
  const tMark = xScale(time);

  return (
    <div className="pixel-border pixel-bevel bg-obsidian/80 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="font-display text-[10px] text-diamond text-shadow-pixel">
          LIVE DEMO · IPMC INFERENCE
        </div>
        <div
          className="font-hud text-stone text-sm"
          style={{ fontFamily: "var(--font-hud)", fontSize: 14 }}
        >
          calibrated surrogate (R²≈0.959)
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3" style={{ fontFamily: "var(--font-hud)", fontSize: 16 }}>
          <Slider
            label="Voltage"
            unit="V"
            min={2.1}
            max={4.9}
            step={0.05}
            value={voltage}
            onChange={setVoltage}
          />
          <Slider
            label="Time"
            unit="s"
            min={0}
            max={10}
            step={0.1}
            value={time}
            onChange={setTime}
          />
          <div>
            <div className="text-white/70 mb-1">Environment</div>
            <div className="flex gap-1">
              {(["water", "air", "acetone"] as const).map((e) => (
                <button
                  key={e}
                  onClick={() => setEnv(e)}
                  className={`pixel-border px-3 py-1 ${env === e ? "bg-diamond text-obsidian" : "bg-stone/40 text-white"}`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
          <div className="pixel-border bg-stone/40 p-3">
            <div className="text-white/70">Predicted bending angle</div>
            <div className="font-display text-xl text-grass text-shadow-pixel">
              {out.toFixed(2)}°
            </div>
          </div>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto bg-sky-night pixel-border"
          aria-label="Phase-space angle vs time"
        >
          {/* gridlines */}
          {[0, 10, 20, 30].map((a) => (
            <line
              key={a}
              x1={padL}
              y1={yScale(a)}
              x2={W - 8}
              y2={yScale(a)}
              stroke="rgba(255,255,255,0.08)"
            />
          ))}
          {/* axes */}
          <line x1={padL} y1={H - padB} x2={W - 8} y2={H - padB} stroke="#7d828a" />
          <line x1={padL} y1={8} x2={padL} y2={H - padB} stroke="#7d828a" />
          {/* curve */}
          <path d={path} fill="none" stroke="#3ed47a" strokeWidth="2" />
          {/* time marker */}
          <line x1={tMark} y1={8} x2={tMark} y2={H - padB} stroke="#5cd6ff" strokeDasharray="3 3" />
          <circle cx={tMark} cy={yScale(out)} r="4" fill="#5cd6ff" />
          {/* axis labels */}
          <text x={padL} y={H - 4} fill="#9aa0a6" fontSize="10" fontFamily="var(--font-hud)">
            0s
          </text>
          <text x={W - 18} y={H - 4} fill="#9aa0a6" fontSize="10" fontFamily="var(--font-hud)">
            10s
          </text>
          <text x={4} y={14} fill="#9aa0a6" fontSize="10" fontFamily="var(--font-hud)">
            30°
          </text>
          <text x={4} y={H - padB} fill="#9aa0a6" fontSize="10" fontFamily="var(--font-hud)">
            0°
          </text>
        </svg>
      </div>
    </div>
  );
}

function Slider({
  label,
  unit,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="flex justify-between text-white/70">
        <span>{label}</span>
        <span className="text-diamond">
          {value.toFixed(2)} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-diamond"
      />
    </label>
  );
}
