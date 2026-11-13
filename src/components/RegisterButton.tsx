import { site } from "@/data/site";

/** Botón de inscripción a la charla. Hasta que exista el formulario externo, avisa que se publica pronto. */
export function RegisterButton() {
  if (site.registrationFormUrl) {
    return (
      <a
        href={site.registrationFormUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center justify-center rounded border border-accent bg-accent px-5 text-[15px] font-semibold text-card hover:bg-accent-hover"
      >
        Anotarme a la charla
      </a>
    );
  }
  return (
    <p className="text-[15px] text-muted">
      La inscripción se abre pronto. Es gratis y el cupo es limitado.
    </p>
  );
}
