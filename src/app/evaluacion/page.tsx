import type { Metadata } from "next";
import { Evaluation } from "@/components/Evaluation";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Evaluación de 3 minutos",
  description: "8 preguntas para saber cómo usás la IA en tu trabajo de RR.HH. y por qué curso conviene empezar.",
};

export default function EvaluationPage() {
  return (
    <Container className="py-10">
      <Evaluation />
    </Container>
  );
}
