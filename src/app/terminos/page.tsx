import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Términos y privacidad",
  description: "Qué datos pedimos en las inscripciones de Ikasten, para qué los usamos y cómo pedir que los borremos.",
};

const sections: { title: string; body: string[] }[] = [
  {
    title: "Quiénes somos",
    body: [
      "Ikasten organiza charlas, talleres y cursos de IA aplicada a Recursos Humanos, desde Salta. Para cualquier consulta sobre tus datos, escribinos a ikasten.app@gmail.com.",
    ],
  },
  {
    title: "Qué datos pedimos",
    body: [
      "Cuando te anotás a una charla o un taller te pedimos nombre y apellido, WhatsApp y, si querés, tu mail. También te preguntamos en qué área trabajás y qué tarea te gustaría delegar.",
      "No te pedimos datos sensibles, como salud, religión u opiniones políticas. Te pedimos que en las respuestas abiertas no pongas nombres ni datos de otras personas.",
    ],
  },
  {
    title: "Para qué los usamos",
    body: [
      "Tu nombre y tu WhatsApp, para confirmarte el lugar y avisarte cambios del evento.",
      "Tus respuestas sobre el trabajo, para preparar el contenido. Las mostramos todas juntas y sin nombres, para encontrar patrones.",
      "Si marcaste que querés sumarte al grupo de WhatsApp de la comunidad, te agregamos. Podés salir cuando quieras.",
    ],
  },
  {
    title: "Con quién los compartimos",
    body: [
      "Con nadie. Tampoco con la sede del evento.",
      "Los formularios están hechos con Tally, una herramienta externa, así que tus respuestas quedan guardadas en sus servidores.",
    ],
  },
  {
    title: "Fotos y videos",
    body: [
      "Solo aparecés en fotos o videos que publiquemos si lo aceptaste en el formulario. La sede del evento también puede publicarlos. Si después cambiás de opinión, escribinos y los sacamos.",
    ],
  },
  {
    title: "Tus derechos",
    body: [
      "Podés pedirnos ver, corregir o borrar tus datos cuando quieras, escribiendo a ikasten.app@gmail.com. Te respondemos por el mismo medio.",
      "Esto se rige por la Ley 25.326 de Protección de Datos Personales.",
      "La Agencia de Acceso a la Información Pública, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.",
    ],
  },
];

export default function TermsPage() {
  return (
    <Container className="py-12">
      <h1 className="text-[34px] font-bold sm:text-[40px]">Términos y privacidad</h1>
      <p className="mt-4 max-w-prose text-[18px] text-muted">
        Qué datos te pedimos cuando te anotás a algo de Ikasten, para qué los usamos y cómo pedir que los borremos.
      </p>
      <div className="mt-10 max-w-prose space-y-10">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="text-[22px] font-semibold">{s.title}</h2>
            <div className="mt-3 space-y-3">
              {s.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
      <p className="mt-12 text-[14px] text-muted">Última actualización: 13 de noviembre de 2026.</p>
    </Container>
  );
}
