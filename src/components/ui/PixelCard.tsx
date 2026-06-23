import { type HTMLAttributes, type ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  tone?: "stone" | "obsidian" | "dirt" | "glass";
};

const toneClasses = {
  stone: "bg-stone/95 text-on-dark",
  obsidian: "bg-obsidian/90 text-on-dark",
  dirt: "bg-dirt/90 text-on-dark",
  glass: "glass-card text-foreground",
};

export function PixelCard({ tone = "obsidian", className = "", children, ...rest }: Props) {
  return (
    <div {...rest} className={`pixel-border pixel-bevel ${toneClasses[tone]} ${className}`}>
      {children}
    </div>
  );
}
