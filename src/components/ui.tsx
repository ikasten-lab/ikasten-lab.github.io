import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-page px-4 sm:px-6 ${className}`}>{children}</div>;
}

type Variant = "primary" | "secondary" | "quiet";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-card hover:bg-accent-hover border border-accent",
  secondary: "bg-card text-text border border-border-strong hover:border-text",
  quiet: "text-accent underline underline-offset-4 decoration-1 hover:decoration-2 font-semibold",
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded px-5 text-[15px] font-semibold disabled:cursor-not-allowed disabled:opacity-50";

function classes(variant: Variant): string {
  return variant === "quiet" ? variants.quiet : `${base} ${variants[variant]}`;
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={`${classes(variant)} ${className}`} {...props} />;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={`${classes(variant)} ${className}`} {...props} />;
}

export function Dot() {
  return (
    <span aria-hidden className="text-faint">
      ·
    </span>
  );
}

export function formatMinutes(m: number): string {
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const rest = m % 60;
  return rest ? `${h} h ${rest} min` : `${h} h`;
}
