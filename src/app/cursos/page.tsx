import type { Metadata } from "next";
import { CourseList } from "@/components/CourseList";
import { ButtonLink, Container } from "@/components/ui";
import { repo } from "@/data/repo";

export const metadata: Metadata = { title: "Cursos" };

export default function CoursesPage() {
  const courses = repo.listCourses();
  const available = courses.filter((c) => c.status === "disponible");
  const soon = courses.filter((c) => c.status === "proximamente");
  return (
    <Container className="py-12">
      <h1 className="text-[34px] font-bold">Cursos</h1>
      <p className="mt-3 max-w-prose text-[17px] text-muted">
        Cursos cortos de IA aplicada a tareas de RR.HH. Si no sabés por cuál empezar, la evaluación de 3
        minutos te lo dice.
      </p>
      <ButtonLink href="/evaluacion/" variant="quiet" className="mt-4 inline-block">
        Hacer la evaluación
      </ButtonLink>

      <h2 className="mb-2 mt-12 text-[22px] font-semibold">Disponibles</h2>
      <CourseList courses={available} />

      <h2 className="mb-2 mt-12 text-[22px] font-semibold">Próximamente</h2>
      <CourseList courses={soon} />
    </Container>
  );
}
