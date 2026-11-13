import Link from "next/link";
import type { Course } from "@/data/types";
import { Dot, formatMinutes } from "./ui";

export function CourseList({ courses }: { courses: Course[] }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {courses.map((c) => (
        <li key={c.slug}>
          <Link
            href={`/cursos/${c.slug}/`}
            className="group grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
          >
            <div>
              <h3 className="text-[20px] font-semibold group-hover:text-accent">{c.title}</h3>
              <p className="mt-1 max-w-prose text-muted">{c.subtitle}</p>
            </div>
            <p className="flex flex-wrap items-center gap-x-2 text-[14px] text-muted sm:justify-end">
              <span>{c.level}</span>
              <Dot />
              <span>{formatMinutes(c.minutes)}</span>
              <Dot />
              <span>{c.lessons.length} lecciones</span>
              {c.status === "proximamente" && (
                <>
                  <Dot />
                  <span className="font-medium text-attention">Próximamente</span>
                </>
              )}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
