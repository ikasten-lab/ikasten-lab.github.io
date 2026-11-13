"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { Certificate } from "@/data/types";
import { useStudent } from "@/lib/useStudent";
import { Button } from "./ui";

// Certificado de ejemplo para mostrar la página sin haber hecho un curso.
const demo: Certificate = {
  code: "IK-2026-DEMO01",
  name: "Persona de ejemplo",
  courseSlug: "ia-rrhh-desde-cero",
  courseTitle: "IA para RR.HH. desde cero",
  issuedAt: "2026-11-28T12:00:00.000Z",
  score: 100,
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" });
}

export function Verify() {
  const params = useSearchParams();
  const router = useRouter();
  const [student, ready] = useStudent();
  const code = (params.get("codigo") ?? "").trim().toUpperCase();
  const [input, setInput] = useState(code);

  const all = [demo, ...student.certificates];
  const cert = code ? all.find((c) => c.code === code) : undefined;

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    const c = input.trim().toUpperCase();
    router.push(c ? `/verificar/?codigo=${encodeURIComponent(c)}` : "/verificar/");
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-[30px] font-bold">Verificar un certificado</h1>
      <p className="mt-2 text-muted">Ingresá el código que figura en el certificado.</p>
      <form onSubmit={search} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">Código del certificado</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="IK-2026-XXXXXX"
            autoCapitalize="characters"
            className="block min-h-11 w-full rounded border border-border-strong bg-card px-3 font-mono text-[16px] focus:border-accent focus:outline-none"
          />
        </label>
        <Button type="submit">Verificar</Button>
      </form>

      {code && ready && !cert && (
        <p className="mt-8 rounded-md bg-attention-wash px-4 py-3">
          No encontramos un certificado con el código <span className="font-mono">{code}</span>. Revisá que esté bien
          escrito.
        </p>
      )}

      {cert && (
        <article className="mt-10 rounded-lg border-2 border-accent bg-card p-6 sm:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[20px] font-bold text-accent">Ikasten</p>
            <p className="text-[14px] font-semibold text-positive">Certificado válido</p>
          </div>
          <p className="mt-10 text-muted">Certificamos que</p>
          <p className="mt-1 text-[30px] font-bold leading-tight">{cert.name}</p>
          <p className="mt-6 text-muted">completó y aprobó el curso</p>
          <p className="mt-1 text-[22px] font-semibold">{cert.courseTitle}</p>
          <dl className="mt-10 grid gap-4 border-t border-border pt-6 text-[15px] sm:grid-cols-3">
            <div>
              <dt className="text-muted">Fecha</dt>
              <dd className="font-medium">{formatDate(cert.issuedAt)}</dd>
            </div>
            <div>
              <dt className="text-muted">Resultado del quiz</dt>
              <dd className="font-medium">{cert.score}%</dd>
            </div>
            <div>
              <dt className="text-muted">Código</dt>
              <dd className="font-mono">{cert.code}</dd>
            </div>
          </dl>
          {cert.code === demo.code && (
            <p className="mt-6 text-[14px] text-muted">Este es un certificado de ejemplo.</p>
          )}
        </article>
      )}

      {!code && (
        <p className="mt-6 text-[15px] text-muted">
          ¿Querés ver cómo se ve? Probá con el código <span className="font-mono">{demo.code}</span>.
        </p>
      )}

      <p className="mt-10 text-[14px] text-muted">
        En esta versión de prueba solo se verifican los certificados emitidos en este navegador y el de ejemplo.
      </p>
    </div>
  );
}
