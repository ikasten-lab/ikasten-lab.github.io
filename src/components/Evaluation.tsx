"use client";

import { useEffect, useState } from "react";
import { dimensionLabels, evaluation, recommendCourse, scoreEvaluation } from "@/data/evaluation";
import { repo } from "@/data/repo";
import type { Dimension } from "@/data/types";
import { update } from "@/lib/store";
import { useStudent } from "@/lib/useStudent";
import { Button, ButtonLink } from "./ui";

const order: Dimension[] = ["uso", "contexto", "criterio", "proceso"];

export function Evaluation() {
  const [student, ready] = useStudent();
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);

  // Si ya la hizo, mostrar el último resultado.
  useEffect(() => {
    if (ready && student.evaluation && step === -1 && !finished) {
      setAnswers(student.evaluation.answers);
      setFinished(true);
    }
  }, [ready, student.evaluation, step, finished]);

  if (finished) {
    const scores = scoreEvaluation(answers);
    const course = repo.getCourse(recommendCourse(scores));
    return (
      <div className="max-w-2xl">
        <h1 className="text-[30px] font-bold">Tu resultado</h1>
        <p className="mt-2 text-muted">
          Describe cómo usás la IA hoy, según lo que respondiste. No mide cuánto sabés de RR.HH.
        </p>
        <dl className="mt-8 space-y-6">
          {order.map((d) => {
            const value = scores[d];
            const label = dimensionLabels[d];
            return (
              <div key={d}>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-semibold">{label.title}</dt>
                  <dd className="font-mono text-[15px]">{value}</dd>
                </div>
                <div className="mt-2 h-2 rounded-full bg-surface" aria-hidden>
                  <div className="h-2 rounded-full bg-accent" style={{ width: `${Math.max(value, 3)}%` }} />
                </div>
                <p className="mt-2 text-[15px] text-muted">{value >= 60 ? label.high : label.low}</p>
              </div>
            );
          })}
        </dl>
        {course && (
          <div className="mt-10 rounded-lg border border-border bg-card p-6">
            <p className="text-[14px] text-muted">Te conviene empezar por</p>
            <p className="mt-1 text-[22px] font-semibold">{course.title}</p>
            <p className="mt-2 text-muted">{course.subtitle}</p>
            <ButtonLink href={`/cursos/${course.slug}/`} className="mt-5">
              Ver el curso
            </ButtonLink>
          </div>
        )}
        <Button
          variant="quiet"
          className="mt-8"
          onClick={() => {
            setAnswers({});
            setFinished(false);
            setStep(0);
          }}
        >
          Hacerla de nuevo
        </Button>
      </div>
    );
  }

  if (step === -1) {
    return (
      <div className="max-w-2xl">
        <h1 className="text-[32px] font-bold sm:text-[40px]">¿Cómo usás la IA en tu trabajo de RR.HH.?</h1>
        <p className="mt-4 text-[18px] text-muted">
          8 preguntas, unos 3 minutos. Al final ves en qué estás fuerte, qué conviene trabajar primero y por qué
          curso empezar.
        </p>
        <p className="mt-4 text-[15px] text-muted">No hace falta registrarse. Las respuestas quedan en tu navegador.</p>
        <Button className="mt-8" onClick={() => setStep(0)}>
          Empezar
        </Button>
      </div>
    );
  }

  const q = evaluation[step];
  if (!q) return null;
  const selected = answers[q.id];
  const last = step === evaluation.length - 1;

  const choose = (k: number) => setAnswers((a) => ({ ...a, [q.id]: k }));
  const next = () => {
    if (last) {
      update((s) => ({ ...s, evaluation: { answers, at: new Date().toISOString() } }));
      setFinished(true);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between text-[14px] text-muted">
        <span>
          Pregunta {step + 1} de {evaluation.length}
        </span>
        <span>{dimensionLabels[q.dimension].title}</span>
      </div>
      <div className="mt-2 h-1 rounded-full bg-surface" aria-hidden>
        <div className="h-1 rounded-full bg-accent" style={{ width: `${((step + 1) / evaluation.length) * 100}%` }} />
      </div>
      <fieldset className="mt-8">
        <legend className="text-[24px] font-semibold leading-snug">{q.prompt}</legend>
        <div className="mt-6 space-y-2">
          {q.options.map((o, k) => {
            const checked = selected === k;
            return (
              <label
                key={o.label}
                className={`flex min-h-12 cursor-pointer items-center gap-3 rounded border px-4 py-3 ${
                  checked ? "border-accent bg-accent-wash" : "border-border bg-card hover:border-border-strong"
                }`}
              >
                <input
                  type="radio"
                  name={q.id}
                  checked={checked}
                  onChange={() => choose(k)}
                  className="accent-[var(--accent)]"
                />
                <span>{o.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>
      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 0 ? (
          <Button variant="quiet" onClick={() => setStep(step - 1)}>
            Anterior
          </Button>
        ) : (
          <span />
        )}
        <Button onClick={next} disabled={selected === undefined}>
          {last ? "Ver mi resultado" : "Siguiente"}
        </Button>
      </div>
    </div>
  );
}
