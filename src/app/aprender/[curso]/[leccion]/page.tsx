import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonView } from "@/components/LessonView";
import { repo } from "@/data/repo";

export function generateStaticParams() {
  return repo
    .listCourses()
    .filter((c) => c.status === "disponible")
    .flatMap((c) => c.lessons.map((l) => ({ curso: c.slug, leccion: l.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ curso: string; leccion: string }>;
}): Promise<Metadata> {
  const { curso, leccion } = await params;
  const found = repo.getLesson(curso, leccion);
  return { title: found ? `${found.lesson.title} · ${found.course.title}` : "Lección" };
}

export default async function LessonPage({ params }: { params: Promise<{ curso: string; leccion: string }> }) {
  const { curso, leccion } = await params;
  const found = repo.getLesson(curso, leccion);
  if (!found || found.course.status !== "disponible") notFound();
  return <LessonView courseSlug={curso} lessonSlug={leccion} />;
}
