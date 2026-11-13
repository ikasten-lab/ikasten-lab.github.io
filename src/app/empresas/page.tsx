import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Para empresas",
  description: "Cursos para equipos de RR.HH., talleres presenciales en Salta y diagnóstico de uso de IA.",
};

const options = [
  {
    title: "Cursos para todo el equipo",
    text: "Acceso a los cursos para las personas de tu área, con seguimiento de quién avanzó y quién se certificó.",
  },
  {
    title: "Taller presencial",
    text: "Una jornada práctica en Salta: cada persona sale con prompts propios armados sobre sus tareas reales.",
  },
  {
    title: "Diagnóstico de uso de IA",
    text: "Revisamos cómo usa hoy la IA tu equipo de RR.HH., dónde hay riesgo y por dónde conviene empezar.",
  },
];

export default function CompaniesPage() {
  return (
    <Container className="py-12">
      <h1 className="max-w-3xl text-[34px] font-bold sm:text-[40px]">IA aplicada a RR.HH. para tu equipo</h1>
      <p className="mt-4 max-w-prose text-[18px] text-muted">
        Para áreas de RR.HH. que quieren usar IA con criterio y sin que cada persona invente su propio método.
      </p>

      <ul className="mt-12 divide-y divide-border border-y border-border">
        {options.map((o) => (
          <li key={o.title} className="grid gap-2 py-6 md:grid-cols-[280px_1fr] md:gap-8">
            <h2 className="text-[20px] font-semibold">{o.title}</h2>
            <p className="max-w-prose text-muted">{o.text}</p>
          </li>
        ))}
      </ul>

      <section className="mt-14 max-w-prose">
        <h2 className="text-[24px] font-semibold">Hablemos</h2>
        <p className="mt-2 text-muted">
          Contanos cuántas personas son en el equipo y qué les gustaría resolver. Te respondemos con una propuesta.
        </p>
        {site.companiesContactUrl ? (
          <a
            href={site.companiesContactUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center rounded border border-accent bg-accent px-5 font-semibold text-card hover:bg-accent-hover"
          >
            Escribirnos
          </a>
        ) : (
          <p className="mt-6 rounded-md bg-surface px-4 py-3 text-[15px]">
            El formulario de contacto se publica junto con la inscripción a la charla del 28 de noviembre.
          </p>
        )}
      </section>
    </Container>
  );
}
