import Link from "next/link";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border">
      <Container className="flex flex-col gap-3 py-8 text-[14px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>Ikasten · Cursos de IA aplicada a RR.HH., desde Salta.</p>
        <nav aria-label="Pie" className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/verificar/" className="hover:text-accent">
            Verificar un certificado
          </Link>
          <Link href="/empresas/" className="hover:text-accent">
            Para empresas
          </Link>
          <Link href="/terminos/" className="hover:text-accent">
            Términos y privacidad
          </Link>
        </nav>
      </Container>
      <p className="border-t border-border px-4 py-3 text-center text-[13px] text-muted">
        Versión de prueba: las compras y las cuentas son simuladas y se guardan solo en este navegador.
      </p>
    </footer>
  );
}
