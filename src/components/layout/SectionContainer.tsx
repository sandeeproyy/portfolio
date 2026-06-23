import { type HTMLAttributes, type ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  id?: string;
  className?: string;
};

export function SectionContainer({ children, id, className = "", ...rest }: Props) {
  return (
    <section
      id={id}
      className={`max-w-6xl mx-auto px-6 py-20 md:py-28 font-sans ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
}
