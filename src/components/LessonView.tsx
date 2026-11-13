"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { repo } from "@/data/repo";
import { update } from "@/lib/store";
import { useStudent } from "@/lib/useStudent";
import { Blocks } from "./Blocks";
import { Button, ButtonLink, Container } from "./ui";

export function LessonView({ courseSlug, lessonSlug }: { courseSlug: string; lessonSlug: string }) {
  const router = useRouter();
  const [student, ready] = useStudent();
  const found = repo.getLesson(courseSlug, lessonSlug);
  if (!found) return null;
  const { course, lesson, index } = found;

  const owned = student.purchased.includes(course.slug);
  const done = student.completed[course.slug] ?? [];
  const locked = !lesson.preview && !owned;
  const next = course.lessons[index + 1];
  const prev = course.lessons[index - 1];
  const isLast = index === course.lessons.length - 1;

  const markDone = () => {
    if (owned) {
      update((s) => {
        const list = s.completed[course.slug] ?? [];
        return {
          ...s,
          completed: { ...s.completed, [course.slug]: list.includes(lesson.slug) ? list : [...list, lesson.slug] },
        };
      });
    }
    if (next) router.push(`/aprender/${course.slug}/${next.slug}/`);
    else router.push(`/aprender/${course.slug}/quiz/`);
  };

  return (
    <Container className="py-8">
      <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
        <nav aria-label="Temario" className="order-2 lg:order-1">
          <Link href={`/cursos/${course.slug}/`} className="font-semibold hover:text-accent">
            {course.title}
          </Link>
          {owned && (
            <p className="mt-1 text-[14px] text-muted">
              {done.length} de {course.lessons.length} lecciones hechas
            </p>
          )}
          <ol className="mt-4 divide-y divide-border border-y border-border">
            {course.lessons.map((l, i) => {
              const current = l.slug === lesson.slug;
              const isDone = done.includes(l.slug);
              const canOpen = l.preview || owned;
              return (
                <li key={l.slug}>
                  {canOpen ? (
                    <Link
                      href={`/aprender/${course.slug}/${l.slug}/`}
                      aria-current={current ? "page" : undefined}
                      className={`flex gap-3 py-2.5 text-[15px] ${current ? "font-semibold text-accent" : "hover:text-accent"}`}
                    >
                      <span className="w-5 shrink-0 font-mono text-[13px] text-muted">{isDone ? "✓" : i + 1}</span>
                      {l.title}
                    </Link>
                  ) : (
                    <span className="flex gap-3 py-2.5 text-[15px] text-muted">
                      <span className="w-5 shrink-0 font-mono text-[13px]">{i + 1}</span>
                      {l.title}
                    </span>
                  )}
                </li>
              );
            })}
            <li>
              {owned ? (
                <Link href={`/aprender/${course.slug}/quiz/`} className="flex gap-3 py-2.5 text-[15px] hover:text-accent">
                  <span className="w-5 shrink-0" />
                  Quiz final y certificado
                </Link>
              ) : (
                <span className="flex gap-3 py-2.5 text-[15px] text-muted">
                  <span className="w-5 shrink-0" />
                  Quiz final y certificado
                </span>
              )}
            </li>
          </ol>
        </nav>

        <article className="order-1 lg:order-2">
          <p className="text-[14px] text-muted">
            Lección {index + 1} de {course.lessons.length} · {lesson.minutes} min
            {lesson.preview && !owned ? " · Abierta" : ""}
          </p>
          <h1 className="mt-1 max-w-prose text-[28px] font-bold sm:text-[34px]">{lesson.title}</h1>

          {!ready ? (
            <div className="mt-8 h-40 max-w-prose rounded-md bg-surface" />
          ) : locked ? (
            <div className="mt-8 max-w-prose rounded-lg border border-border bg-card p-6">
              <p className="font-semibold">Esta lección es parte del curso completo.</p>
              <p className="mt-2 text-muted">Las primeras lecciones son abiertas. Para seguir, comprá el curso.</p>
              <ButtonLink href={`/compra/${course.slug}/`} className="mt-5">
                Comprar el curso
              </ButtonLink>
            </div>
          ) : (
            <>
              <Blocks blocks={lesson.blocks} />
              <div className="mt-10 flex max-w-prose flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                {prev ? (
                  <Link href={`/aprender/${course.slug}/${prev.slug}/`} className="text-accent underline underline-offset-4">
                    Lección anterior
                  </Link>
                ) : (
                  <span />
                )}
                {owned ? (
                  <Button onClick={markDone}>{isLast ? "Terminar e ir al quiz" : "Marcar como leída y seguir"}</Button>
                ) : next && next.preview ? (
                  <ButtonLink href={`/aprender/${course.slug}/${next.slug}/`}>Siguiente lección</ButtonLink>
                ) : (
                  <ButtonLink href={`/compra/${course.slug}/`}>Comprar para seguir</ButtonLink>
                )}
              </div>
            </>
          )}
        </article>
      </div>
    </Container>
  );
}
