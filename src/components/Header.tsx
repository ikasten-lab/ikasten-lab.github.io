"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./ui";

const nav = [
  { href: "/cursos/", label: "Cursos" },
  { href: "/evaluacion/", label: "Evaluación" },
  { href: "/empresas/", label: "Empresas" },
  { href: "/mis-cursos/", label: "Mis cursos" },
];

export function Header() {
  const path = usePathname() ?? "/";
  return (
    <header className="border-b border-border bg-canvas">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-3">
        <Link href="/" className="py-1 text-[21px] font-bold tracking-tight text-accent">
          Ikasten
        </Link>
        <nav aria-label="Principal" className="-mx-2 flex flex-wrap">
          {nav.map((n) => {
            const active = path.startsWith(n.href) || path === n.href.slice(0, -1);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`px-2 py-2 text-[15px] font-medium ${
                  active
                    ? "text-accent underline decoration-2 underline-offset-[6px]"
                    : "text-text hover:text-accent"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}
