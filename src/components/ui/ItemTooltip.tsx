import { type ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  enchants?: { name: string; level?: string }[];
  children: ReactNode;
};

export function ItemTooltip({ title, subtitle, enchants, children }: Props) {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="pointer-events-none absolute left-1/2 z-50 hidden -translate-x-1/2 -translate-y-2 group-hover:block group-focus-within:block bottom-full">
        <div className="pixel-border bg-obsidian/95 px-3 py-2 min-w-[180px] text-left">
          <div className="font-display text-[10px] text-white text-shadow-pixel">{title}</div>
          {subtitle && (
            <div
              className="font-hud text-stone text-sm mt-1"
              style={{ fontFamily: "var(--font-hud)" }}
            >
              {subtitle}
            </div>
          )}
          {enchants && enchants.length > 0 && (
            <div className="mt-1 space-y-0.5" style={{ fontFamily: "var(--font-hud)" }}>
              {enchants.map((e) => (
                <div key={e.name} className="text-diamond text-sm">
                  {e.name}
                  {e.level ? ` ${e.level}` : ""}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
