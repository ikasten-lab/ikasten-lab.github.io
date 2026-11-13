"use client";

import Link from "next/link";
import { useState } from "react";
import { repo } from "@/data/repo";
import { update } from "@/lib/store";
import { useStudent } from "@/lib/useStudent";
import { Button, ButtonLink } from "./ui";

const field =
  "mt-1 block min-h-11 w-full rounded border border-border-strong bg-card px-3 text-[16px] focus:border-accent focus:outline-none";

export function Checkout({ slug }: { slug: string }) {
  const course = repo.getCourse(slug);
  const [student, ready] = useStudent();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  if (!course) return null;

  const owned = ready && student.purchased.includes(slug);
  const first = course.lessons[0];

  if (done || owned) {
    return (
      <div className="max-w-xl">
        <p className="text-[15px] font-semibold text-positive">Compra confirmada (simulada)</p>
        <h1 className="mt-2 text-[30px] font-bold">Ya tenés {course.title}</h1>
        <p className="mt-3 text-muted">
          En la versión real te llegaría un mail con el acceso y la factura. Acá ya podés empezar.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {first && <ButtonLink href={`/aprender/${slug}/${first.slug}/`}>Empezar el curso</ButtonLink>}
          {course.samplePdf && (
            <a
              href={course.samplePdf}
              download
              className="inline-flex min-h-11 items-center justify-center rounded border border-border-strong bg-card px-5 text-[15px] font-semibold hover:border-text"
            >
              Descargar la guía en PDF
            </a>
          )}
        </div>
        <Link href="/mis-cursos/" className="mt-6 inline-block text-accent underline underline-offset-4">
          Ir a mis cursos
        </Link>
      </div>
    );
  }

  const knownStudent = ready && student.name;

  const confirm = (e: React.FormEvent) => {
    e.preventDefault();
    update((s) => ({
      ...s,
      name: s.name || name.trim(),
      email: s.email || email.trim(),
      purchased: s.purchased.includes(slug) ? s.purchased : [...s.purchased, slug],
    }));
    setDone(true);
  };

  return (
    <div className="grid max-w-4xl gap-10 md:grid-cols-[1fr_300px]">
      <form onSubmit={confirm} className="space-y-5">
        <h1 className="text-[30px] font-bold">Comprar el curso</h1>
        <p className="rounded-md bg-attention-wash px-4 py-3 text-[15px]">
          Esta es una compra simulada. No se cobra nada y no se piden datos de pago.
        </p>
        {knownStudent ? (
          <p>
            Comprás como <span className="font-semibold">{student.name}</span>
            {student.email && <span className="text-muted"> ({student.email})</span>}.
          </p>
        ) : (
          <>
            <label className="block">
              <span className="font-medium">Nombre</span>
              <input
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={field}
              />
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
              <span className="mt-1 block text-[14px] text-muted">
                En esta versión de prueba queda guardado solo en tu navegador.
              </span>
            </label>
          </>
        )}
        <Button type="submit" className="w-full sm:w-auto">
          Confirmar compra simulada
        </Button>
      </form>
      <aside className="h-fit rounded-lg border border-border bg-card p-5">
        <p className="text-[14px] text-muted">Estás comprando</p>
        <p className="mt-1 font-semibold">{course.title}</p>
        <p className="mt-4 text-[14px] text-muted">Precio de lanzamiento</p>
        <p className="font-semibold">A definir</p>
        <ul className="mt-4 space-y-1 text-[14px] text-muted">
          {course.includes.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
