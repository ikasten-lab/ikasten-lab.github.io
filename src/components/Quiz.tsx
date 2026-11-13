"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { repo } from "@/data/repo";
import type { Certificate, QuizQuestion } from "@/data/types";
import { newCertificateCode, update } from "@/lib/store";
import { useStudent } from "@/lib/useStudent";
import { Button, ButtonLink } from "./ui";

const PASS = 0.8;

interface Shown {
  q: QuizQuestion;
  /** Orden en que se muestran las opciones (índices originales). */
  order: number[];
}

function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j] as T, a[i] as T];
  }
  return a;
}

export function Quiz({ slug }: { slug: string }) {
  const course = repo.getCourse(slug);
  const [student, ready] = useStudent();
  const [attempt, setAttempt] = useState(1);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ score: number; cert?: Certificate } | null>(null);

  // Preguntas y opciones en otro orden en cada intento.
  const shown: Shown[] = useMemo(() => {
    if (!course) return [];
    return shuffle(course.quiz, attempt * 7919).map((q, i) => ({
      q,
      order: shuffle(
        q.options.map((_, k) => k),
        attempt * 104729 + i,
      ),
    }));
  }, [course, attempt]);

  if (!course) return null;
  if (!ready) return <div className="h-40 max-w-2xl rounded-md bg-surface" />;

  const existing = student.certificates.find((c) => c.courseSlug === slug);
  const owned = student.purchased.includes(slug);

  if (!owned) {
    return (
      <div className="max-w-xl">
        <h1 className="text-[30px] font-bold">Quiz final</h1>
        <p className="mt-3 text-muted">El quiz y el certificado son parte del curso completo.</p>
        <ButtonLink href={`/compra/${slug}/`} className="mt-6">
          Comprar el curso
        </ButtonLink>
      </div>
    );
  }

  const cert = result?.cert ?? existing;
  if (cert && (!result || result.cert)) {
    return (
      <div className="max-w-xl">
        <p className="text-[15px] font-semibold text-positive">Aprobado</p>
        <h1 className="mt-2 text-[30px] font-bold">Tu certificado está listo</h1>
        <p className="mt-3 text-muted">
          Cualquiera puede verificarlo con el código <span className="font-mono text-text">{cert.code}</span>.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`/verificar/?codigo=${cert.code}`}>Ver el certificado</ButtonLink>
          <ButtonLink href="/mis-cursos/" variant="secondary">
            Ir a mis cursos
          </ButtonLink>
        </div>
      </div>
    );
  }

  const total = course.quiz.length;
  const answered = Object.keys(answers).length;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = course.quiz.filter((q) => answers[q.id] === q.answer).length;
    const score = correct / total;
    if (score >= PASS) {
      const newCert: Certificate = {
        code: newCertificateCode(),
        name: student.name || "Alumno de prueba",
        courseSlug: slug,
        courseTitle: course.title,
        issuedAt: new Date().toISOString(),
        score: Math.round(score * 100),
      };
      update((s) => ({ ...s, certificates: [...s.certificates.filter((c) => c.courseSlug !== slug), newCert] }));
      setResult({ score, cert: newCert });
    } else {
      setResult({ score });
    }
  };

  if (result && !result.cert) {
    const correct = Math.round(result.score * total);
    return (
      <div className="max-w-2xl">
        <h1 className="text-[30px] font-bold">
          {correct} de {total} correctas
        </h1>
        <p className="mt-3 text-muted">
          Para el certificado hacen falta {Math.ceil(PASS * total)} de {total}. No mostramos la respuesta correcta:
          repasá la lección con la pista y volvé a intentar. Las preguntas cambian de orden.
        </p>
        <ol className="mt-8 space-y-6">
          {course.quiz.map((q) => {
            const ok = answers[q.id] === q.answer;
            return (
              <li key={q.id} className="border-l-2 border-border pl-4">
                <p className="font-semibold">{q.prompt}</p>
                <p className={`mt-1 text-[15px] ${ok ? "text-positive" : "text-accent"}`}>
                  {ok ? "Correcta" : "Incorrecta"}
                </p>
                {!ok && <p className="mt-1 text-[15px] text-muted">Pista: {q.explanation}</p>}
              </li>
            );
          })}
        </ol>
        <Button
          className="mt-8"
          onClick={() => {
            setAnswers({});
            setResult(null);
            setAttempt((a) => a + 1);
          }}
        >
          Volver a intentar
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="max-w-2xl">
      <Link href={`/cursos/${slug}/`} className="text-[15px] text-muted hover:text-accent">
        {course.title}
      </Link>
      <h1 className="mt-2 text-[30px] font-bold">Quiz final</h1>
      <p className="mt-2 text-muted">
        {total} preguntas. Con {Math.ceil(PASS * total)} correctas obtenés el certificado.
      </p>
      <ol className="mt-8 space-y-8">
        {shown.map(({ q, order }, i) => (
          <li key={q.id}>
            <fieldset>
              <legend className="font-semibold">
                <span className="mr-2 font-mono text-[14px] text-muted">{i + 1}</span>
                {q.prompt}
              </legend>
              <div className="mt-3 space-y-2">
                {order.map((k) => {
                  const checked = answers[q.id] === k;
                  return (
                    <label
                      key={k}
                      className={`flex min-h-11 cursor-pointer items-center gap-3 rounded border px-3 py-2 ${
                        checked ? "border-accent bg-accent-wash" : "border-border bg-card hover:border-border-strong"
                      }`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        checked={checked}
                        onChange={() => setAnswers((a) => ({ ...a, [q.id]: k }))}
                        className="accent-[var(--accent)]"
                      />
                      <span>{q.options[k]}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>
      <div className="mt-8 flex items-center gap-4">
        <Button type="submit" disabled={answered < total}>
          Enviar respuestas
        </Button>
        <span className="text-[14px] text-muted">
          {answered} de {total} respondidas
        </span>
      </div>
    </form>
  );
}
