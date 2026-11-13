import type { Metadata } from "next";
import { MyCourses } from "@/components/MyCourses";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "Mis cursos", robots: { index: false } };

export default function MyCoursesPage() {
  return (
    <Container className="py-10">
      <MyCourses />
    </Container>
  );
}
