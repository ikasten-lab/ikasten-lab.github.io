import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-20">
      <h1 className="text-[30px] font-bold">No encontramos esta página</h1>
      <p className="mt-3 text-muted">Puede que el link esté mal escrito o que la página ya no exista.</p>
      <ButtonLink href="/" className="mt-6">
        Volver al inicio
      </ButtonLink>
    </Container>
  );
}
