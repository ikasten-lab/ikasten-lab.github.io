import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseActions } from "@/components/CourseActions";
import { Container, Dot, formatMinutes } from "@/components/ui";
import { repo } from "@/data/repo";

export function generateStaticParams() {
  return repo.listCourses().map((c) => ({ curso: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ curso: string }> }): Promise<Metadata> {
  const { curso } = await params;
  const course = repo.getCourse(curso);
  return { title: course?.title ?? "Curso", description: course?.subtitle };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border py-8">
      <h2 className="text-[22px] font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function CoursePage({ params }: { params: Promise<{ curso: string }> }) {
  const { curso } = await params;
  const course = repo.getCourse(curso);
  if (!course) notFound();
  const soon = course.status === "proximamente";

  return (
    <Container className="py-10">
      <Link href="/cursos/" className="text-[15px] text-muted hover:text-accent">
        Cursos
      </Link>
      <div className="mt-3 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <h1 className="text-[32px] font-bold sm:text-[40px]">{course.title}</h1>
          <p className="mt-3 max-w-prose text-[18px] text-muted">{course.subtitle}</p>
          <p className="mt-4 flex flex-wrap items-center gap-x-2 text-[15px] text-muted">
            <span>{course.level}</span>
            <Dot />
            <span>{formatMinutes(course.minutes)}</span>
            <Dot />
            <span>{course.lessons.length} lecciones</span>
            <Dot />
            <span>{course.teachers.map((t) => t.name).join(" y ")}</span>
          </p>

          <div className="mt-8 lg:hidden">
            <CourseActions slug={course.slug} soon={soon} hasPreview={course.lessons.some((l) => l.preview)} />
          </div>

          <Section title="Qué vas a poder hacer">
            <ul className="max-w-prose list-disc space-y-2 pl-6 marker:text-accent">
              {course.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </Section>

          <Section title="Para quién es">
            <div className="grid max-w-prose gap-6 sm:grid-cols-2">
              <div>
                <h3 className="font-semibold">Te sirve si</h3>
                <ul className="mt-2 space-y-2">
                  {course.forWhom.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">No es para vos si</h3>
                <ul className="mt-2 space-y-2 text-muted">
                  {course.notForWhom.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          <Section title="Temario">
            <ol className="divide-y divide-border border-y border-border">
              {course.lessons.map((l, i) => (
                <li key={l.slug} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="flex gap-3">
                    <span className="w-5 shrink-0 font-mono text-[14px] text-muted">{i + 1}</span>
                    {l.preview && !soon ? (
                      <Link href={`/aprender/${course.slug}/${l.slug}/`} className="underline decoration-1 underline-offset-4 hover:text-accent">
                        {l.title}
                      </Link>
                    ) : (
                      <span>{l.title}</span>
                    )}
                  </span>
                  <span className="shrink-0 text-[14px] text-muted">
                    {l.preview && !soon ? "Abierta · " : ""}
                    {l.minutes} min
                  </span>
                </li>
              ))}
            </ol>
          </Section>

          <Section title="Qué incluye">
            <ul className="max-w-prose list-disc space-y-2 pl-6 marker:text-accent">
              {course.includes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </Section>

          <Section title="Quién enseña">
            <ul className="space-y-3">
              {course.teachers.map((t) => (
                <li key={t.name}>
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-muted"> · {t.role}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Que lo pague tu empresa">
            <p className="max-w-prose">
              Si querés que este curso lo pague tu empresa, escribinos y te armamos una propuesta para presentarle
              a tu área de RR.HH. o a quien decida.
            </p>
            <Link href="/empresas/" className="mt-3 inline-block font-semibold text-accent underline underline-offset-4">
              Ver opciones para empresas
            </Link>
          </Section>

          {course.faq.length > 0 && (
            <Section title="Preguntas frecuentes">
              <div className="max-w-prose divide-y divide-border border-y border-border">
                {course.faq.map((f) => (
                  <details key={f.q} className="group py-3">
                    <summary className="cursor-pointer list-none font-semibold marker:hidden">
                      <span className="flex items-center justify-between gap-4">
                        {f.q}
                        <span aria-hidden className="text-muted group-open:rotate-45">
                          +
                        </span>
                      </span>
                    </summary>
                    <p className="mt-2 text-muted">{f.a}</p>
                  </details>
                ))}
              </div>
            </Section>
          )}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-6 rounded-lg border border-border bg-card p-5">
            <CourseActions slug={course.slug} soon={soon} hasPreview={course.lessons.some((l) => l.preview)} />
          </div>
        </aside>
      </div>
    </Container>
  );
}
