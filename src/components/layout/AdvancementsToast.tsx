import { useEffect } from "react";
import { useUIStore } from "@/lib/ui-store";
import { Trophy } from "lucide-react";

export function AdvancementsToast() {
  const { toast, hideToast } = useUIStore();

  useEffect(() => {
    if (toast?.show) {
      const t = setTimeout(() => {
        hideToast();
      }, 3500);
      return () => clearTimeout(t);
    }
  }, [toast?.show, hideToast]);

  if (!toast) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-[999] transition-all duration-500 ease-[cubic-bezier(.25,1.2,.5,1)]
        ${toast.show ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0 pointer-events-none"}`}
    >
      <div 
        className="flex items-center gap-3 p-4 bg-[#2a2a2a] border-4 border-[#1a1a1a] shadow-[8px_8px_0_0_rgba(0,0,0,0.4)] min-w-[300px]"
        style={{
          boxShadow: "inset 2px 2px 0 0 rgba(255,255,255,0.15), inset -2px -2px 0 0 rgba(0,0,0,0.6), 8px 8px 0 0 rgba(0,0,0,0.4)"
        }}
      >
        {/* Icon slot */}
        <div className="p-2 border-2 border-black bg-black/40 shrink-0">
          <Trophy size={20} className="text-[#f6cf57] anim-bob" />
        </div>
        
        <div className="flex-1">
          {/* Gold MC Title */}
          <div className="font-display text-[9px] text-[#f6cf57] text-shadow-pixel tracking-wide select-none">
            Advancement Unlocked!
          </div>
          {/* White HUD Description */}
          <div 
            className="text-white text-base mt-1 select-none leading-none"
            style={{ fontFamily: "var(--font-hud)" }}
          >
            {toast.title}
          </div>
          {toast.description && (
            <div 
              className="text-[#9aa0a6] text-xs mt-1 select-none font-mono"
            >
              {toast.description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
