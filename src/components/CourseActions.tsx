"use client";

import { repo } from "@/data/repo";
import { useStudent } from "@/lib/useStudent";
import { ButtonLink } from "./ui";

export function CourseActions({ slug, soon, hasPreview }: { slug: string; soon: boolean; hasPreview: boolean }) {
  const [student, ready] = useStudent();
  const course = repo.getCourse(slug);
  if (!course) return null;

  if (soon) {
    return (
      <div className="space-y-3">
        <p className="font-semibold">Este curso está en preparación.</p>
        <p className="text-[15px] text-muted">Mientras tanto, podés empezar por los cursos disponibles.</p>
        <ButtonLink href="/cursos/" variant="secondary" className="w-full">
          Ver cursos disponibles
        </ButtonLink>
      </div>
    );
  }

  const owned = ready && student.purchased.includes(slug);
  const done = student.completed[slug] ?? [];
  const next = course.lessons.find((l) => !done.includes(l.slug));
  const first = course.lessons[0];
  const cert = student.certificates.find((c) => c.courseSlug === slug);

  if (owned && !next) {
    return (
      <div className="space-y-3">
        <p className="font-semibold">Terminaste las {course.lessons.length} lecciones.</p>
        {cert ? (
          <ButtonLink href={`/verificar/?codigo=${cert.code}`} className="w-full">
            Ver mi certificado
          </ButtonLink>
        ) : (
          <ButtonLink href={`/aprender/${slug}/quiz/`} className="w-full">
            Hacer el quiz final
          </ButtonLink>
        )}
        {first && (
          <ButtonLink href={`/aprender/${slug}/${first.slug}/`} variant="secondary" className="w-full">
            Repasar desde el principio
          </ButtonLink>
        )}
      </div>
    );
  }

  if (owned && next) {
    return (
      <div className="space-y-3">
        <p className="font-semibold">Ya tenés este curso.</p>
        <p className="text-[15px] text-muted">
          {done.length} de {course.lessons.length} lecciones hechas.
        </p>
        <ButtonLink href={`/aprender/${slug}/${next.slug}/`} className="w-full">
          {done.length === 0 ? "Empezar" : "Seguir donde dejé"}
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-[15px] text-muted">Precio de lanzamiento</p>
      <p className="text-[22px] font-semibold">A definir</p>
      <ButtonLink href={`/compra/${slug}/`} className="w-full">
        Comprar el curso
      </ButtonLink>
      {hasPreview && first && (
        <ButtonLink href={`/aprender/${slug}/${first.slug}/`} variant="secondary" className="w-full">
          Leer la primera lección gratis
        </ButtonLink>
      )}
      <p className="text-[13px] text-muted">Compra simulada: es una versión de prueba.</p>
    </div>
  );
}
