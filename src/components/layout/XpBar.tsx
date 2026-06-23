import { useEffect, useState } from "react";

export function XpBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const handler = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);
  const level = Math.floor(pct / 10);
  return (
    <div className="fixed left-0 right-0 bottom-0 z-30 pointer-events-none" aria-hidden>
      <div className="relative h-3 bg-black/70">
        <div
          className="absolute inset-y-0 left-0 bg-xp"
          style={{ width: `${pct}%`, boxShadow: "0 0 12px var(--xp)" }}
        />
        <div className="absolute right-2 -top-4 font-display text-[10px] text-xp text-shadow-pixel">
          LVL {level}
        </div>
      </div>
    </div>
  );
}
