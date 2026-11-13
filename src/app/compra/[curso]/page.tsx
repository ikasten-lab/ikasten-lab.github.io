import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Checkout } from "@/components/Checkout";
import { Container } from "@/components/ui";
import { repo } from "@/data/repo";

export const metadata: Metadata = { title: "Compra", robots: { index: false } };

export function generateStaticParams() {
  return repo
    .listCourses()
    .filter((c) => c.status === "disponible")
    .map((c) => ({ curso: c.slug }));
}

export default async function CheckoutPage({ params }: { params: Promise<{ curso: string }> }) {
  const { curso } = await params;
  const course = repo.getCourse(curso);
  if (!course || course.status !== "disponible") notFound();
  return (
    <Container className="py-10">
      <Checkout slug={course.slug} />
    </Container>
  );
}
