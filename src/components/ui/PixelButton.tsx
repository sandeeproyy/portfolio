import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "diamond" | "gold" | "stone" | "grass" | "redstone";

const variantClasses: Record<Variant, string> = {
  diamond: "bg-diamond text-obsidian hover:brightness-110",
  gold: "bg-gold-mc text-obsidian hover:brightness-110",
  stone: "bg-stone text-foreground hover:bg-cobble",
  grass: "bg-grass text-obsidian hover:bg-grass-dark",
  redstone: "bg-redstone text-white hover:brightness-110",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

export function PixelButton({ variant = "stone", className = "", children, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`pixel-bevel pixel-border font-display text-[10px] tracking-wider uppercase px-4 py-3 transition-[filter,transform] active:translate-y-[2px] active:shadow-none ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}