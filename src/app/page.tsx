import { CourseList } from "@/components/CourseList";
import { PromptBox } from "@/components/PromptBox";
import { RegisterButton } from "@/components/RegisterButton";
import { ButtonLink, Container } from "@/components/ui";
import { repo } from "@/data/repo";
import { site } from "@/data/site";

export default function Home() {
  const courses = repo.listCourses();
  return (
    <>
      <section className="border-b border-border">
        <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <h1 className="text-[34px] font-bold sm:text-[46px]">
              Cursos cortos para usar IA en tu trabajo de RR.HH.
            </h1>
            <p className="mt-4 max-w-prose text-[18px] text-muted">
              Avisos, entrevistas, screening de CVs. Cada lección termina con un prompt que podés
              probar esa misma semana con una tarea real, y la decisión la seguís tomando vos.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href="/evaluacion/">Hacer la evaluación de 3 minutos</ButtonLink>
              <ButtonLink href="/cursos/" variant="secondary">
                Ver los cursos
              </ButtonLink>
            </div>
          </div>
          <div aria-label="Así se ve una lección" className="rounded-lg border border-border bg-surface p-4 sm:p-6">
            <p className="text-[14px] text-muted">IA para RR.HH. desde cero · Lección 3 de 6</p>
            <p className="mt-1 text-[18px] font-semibold">Tu primer prompt real</p>
            <PromptBox
              title="Redactar un aviso de búsqueda"
              text="Necesito un aviso de búsqueda laboral para el puesto de [nombre del puesto] en [nombre de la empresa o rubro]. El tono tiene que ser [formal / cercano / directo]. No incluyas frases genéricas tipo 'buscamos gente proactiva' sin explicar qué significa eso para este puesto en particular."
            />
            <p className="text-[14px] text-muted">Copialo, cambiá lo que está entre corchetes y probalo.</p>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-card">
        <Container className="grid gap-6 py-10 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-[24px] font-semibold">{site.charla.title}</h2>
            <p className="mt-2 text-[17px]">
              {site.charla.dateLabel} · {site.charla.timeLabel} · {site.charla.place}
            </p>
            <p className="mt-2 max-w-prose text-muted">
              Una charla gratis para ver en vivo cómo se usa la IA en tareas de RR.HH. y conocer a otras
              personas que trabajan en lo mismo.
            </p>
          </div>
          <RegisterButton />
        </Container>
      </section>

      <Container className="py-14">
        <h2 className="text-[26px] font-semibold">Cómo funciona</h2>
        <ol className="mt-6 grid gap-8 md:grid-cols-3">
          <li>
            <p className="font-mono text-[14px] text-accent">1</p>
            <h3 className="mt-1 text-[18px] font-semibold">Hacé la evaluación</h3>
            <p className="mt-1 text-muted">
              8 preguntas sobre cómo usás la IA hoy. Te muestra dónde estás fuerte y qué curso conviene
              empezar.
            </p>
          </li>
          <li>
            <p className="font-mono text-[14px] text-accent">2</p>
            <h3 className="mt-1 text-[18px] font-semibold">Leé una lección por día</h3>
            <p className="mt-1 text-muted">
              Lecciones de 5 a 10 minutos, pensadas para el celular. Las dos primeras de cada curso son
              abiertas.
            </p>
          </li>
          <li>
            <p className="font-mono text-[14px] text-accent">3</p>
            <h3 className="mt-1 text-[18px] font-semibold">Probalo con una tarea real</h3>
            <p className="mt-1 text-muted">
              Cada curso cierra con un quiz y un certificado con código que cualquiera puede verificar.
            </p>
          </li>
        </ol>
      </Container>

      <Container className="py-4">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 className="text-[26px] font-semibold">Cursos</h2>
          <ButtonLink href="/cursos/" variant="quiet">
            Ver todos
          </ButtonLink>
        </div>
        <CourseList courses={courses} />
      </Container>

      <Container className="py-14">
        <div className="rounded-lg border border-border-strong px-5 py-8 sm:px-8">
          <h2 className="text-[24px] font-semibold">Para equipos de RR.HH.</h2>
          <p className="mt-2 max-w-prose text-muted">
            Cursos para todo el equipo, un taller presencial en Salta o un diagnóstico de cómo usan la IA
            hoy.
          </p>
          <ButtonLink href="/empresas/" variant="secondary" className="mt-6">
            Ver opciones para empresas
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
