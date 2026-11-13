import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Quiz } from "@/components/Quiz";
import { Container } from "@/components/ui";
import { repo } from "@/data/repo";

export const metadata: Metadata = { title: "Quiz final" };

export function generateStaticParams() {
  return repo
    .listCourses()
    .filter((c) => c.status === "disponible" && c.quiz.length > 0)
    .map((c) => ({ curso: c.slug }));
}

export default async function QuizPage({ params }: { params: Promise<{ curso: string }> }) {
  const { curso } = await params;
  const course = repo.getCourse(curso);
  if (!course || course.quiz.length === 0) notFound();
  return (
    <Container className="py-10">
      <Quiz slug={course.slug} />
    </Container>
  );
}
