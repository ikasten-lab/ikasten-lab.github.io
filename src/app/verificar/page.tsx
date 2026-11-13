import type { Metadata } from "next";
import { Suspense } from "react";
import { Verify } from "@/components/Verify";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "Verificar un certificado" };

export default function VerifyPage() {
  return (
    <Container className="py-10">
      <Suspense fallback={<div className="h-40 max-w-2xl rounded-md bg-surface" />}>
        <Verify />
      </Suspense>
    </Container>
  );
}
