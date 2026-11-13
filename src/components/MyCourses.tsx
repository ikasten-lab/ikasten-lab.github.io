"use client";

import Link from "next/link";
import { useState } from "react";
import { repo } from "@/data/repo";
import { reset, update } from "@/lib/store";
import { useStudent } from "@/lib/useStudent";
import { Button, ButtonLink } from "./ui";

const field =
  "mt-1 block min-h-11 w-full rounded border border-border-strong bg-card px-3 text-[16px] focus:border-accent focus:outline-none";

export function MyCourses() {
  const [student, ready] = useStudent();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!ready) return <div className="h-40 max-w-2xl rounded-md bg-surface" />;

  if (!student.name) {
    return (
      <form
        className="max-w-md space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          update((s) => ({ ...s, name: name.trim(), email: email.trim() }));
        }}
      >
        <h1 className="text-[30px] font-bold">Entrar</h1>
        <p className="rounded-md bg-attention-wash px-4 py-3 text-[15px]">
          Cuenta simulada: no hay contraseña y los datos quedan solo en este navegador.
        </p>
        <label className="block">
          <span className="font-medium">Nombre</span>
          <input required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={field} />
        </label>
        <label className="block">
          <span className="font-medium">Mail</span>
          <input
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={field}
          />
        </label>
        <Button type="submit">Entrar</Button>
      </form>
    );
  }

  const mine = repo.listCourses().filter((c) => student.purchased.includes(c.slug));

  return (
    <div className="max-w-3xl">
      <h1 className="text-[30px] font-bold">Hola, {student.name.split(" ")[0]}</h1>

      <h2 className="mb-3 mt-10 text-[22px] font-semibold">Tus cursos</h2>
      {mine.length === 0 ? (
        <div>
          <p className="text-muted">Todavía no tenés cursos.</p>
          <ButtonLink href="/cursos/" variant="secondary" className="mt-4">
            Ver cursos
          </ButtonLink>
        </div>
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {mine.map((c) => {
            const done = student.completed[c.slug] ?? [];
            const next = c.lessons.find((l) => !done.includes(l.slug));
            const pct = Math.round((done.length / c.lessons.length) * 100);
            const cert = student.certificates.find((x) => x.courseSlug === c.slug);
            return (
              <li key={c.slug} className="grid gap-3 py-5 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <Link href={`/cursos/${c.slug}/`} className="text-[18px] font-semibold hover:text-accent">
                    {c.title}
                  </Link>
                  <div className="mt-2 h-1.5 max-w-xs rounded-full bg-surface" aria-hidden>
                    <div className="h-1.5 rounded-full bg-accent" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="mt-1 text-[14px] text-muted">
                    {done.length} de {c.lessons.length} lecciones
                    {cert ? ` · Certificado ${cert.code}` : ""}
                  </p>
                </div>
                {cert ? (
                  <ButtonLink href={`/verificar/?codigo=${cert.code}`} variant="secondary">
                    Ver certificado
                  </ButtonLink>
                ) : next ? (
                  <ButtonLink href={`/aprender/${c.slug}/${next.slug}/`}>
                    {done.length === 0 ? "Empezar" : "Seguir"}
                  </ButtonLink>
                ) : (
                  <ButtonLink href={`/aprender/${c.slug}/quiz/`}>Hacer el quiz</ButtonLink>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {mine.some((c) => c.samplePdf) && (
        <>
          <h2 className="mb-3 mt-10 text-[22px] font-semibold">Descargas</h2>
          <ul className="space-y-2">
            {mine
              .filter((c) => c.samplePdf)
              .map((c) => (
                <li key={c.slug}>
                  <a href={c.samplePdf} download className="text-accent underline underline-offset-4">
                    {c.title} (PDF)
                  </a>
                </li>
              ))}
          </ul>
        </>
      )}

      <div className="mt-14 border-t border-border pt-6">
        <Button variant="quiet" onClick={() => reset()}>
          Borrar mis datos de prueba
        </Button>
      </div>
    </div>
  );
}
