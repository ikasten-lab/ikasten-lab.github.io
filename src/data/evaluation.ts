import type { Dimension, EvalQuestion } from "./types";

// Evaluación de 3 minutos: "¿Cómo usás la IA en tu trabajo de RR.HH.?"
// 8 preguntas, 2 por dimensión, 0 a 3 puntos cada una. Describe hábitos, no mide inteligencia.

export const dimensionLabels: Record<Dimension, { title: string; low: string; high: string }> = {
  uso: {
    title: "Uso",
    low: "Todavía no tenés la IA en tu semana de trabajo.",
    high: "La IA ya es parte de tu semana de trabajo.",
  },
  contexto: {
    title: "Contexto",
    low: "Tus pedidos son cortos y la IA responde genérico.",
    high: "Le das a la IA el contexto que necesita para responder específico.",
  },
  criterio: {
    title: "Criterio",
    low: "Hay riesgo de usar lo que devuelve la IA sin revisarlo.",
    high: "Revisás todo y la decisión la tomás vos.",
  },
  proceso: {
    title: "Proceso",
    low: "Cada búsqueda se arma de cero, con la vara de cada uno.",
    high: "Tenés criterios y plantillas que se repiten.",
  },
};

export const evaluation: EvalQuestion[] = [
  {
    id: "uso-1",
    dimension: "uso",
    prompt: "¿Cuántas veces usaste un chat de IA para trabajo en la última semana?",
    options: [
      { label: "Ninguna", points: 0 },
      { label: "1 o 2 veces", points: 1 },
      { label: "Entre 3 y 10", points: 2 },
      { label: "Todos los días", points: 3 },
    ],
  },
  {
    id: "uso-2",
    dimension: "uso",
    prompt: "¿Para qué tareas de RR.HH. la usaste alguna vez?",
    options: [
      { label: "Para ninguna", points: 0 },
      { label: "Para corregir o reescribir un texto", points: 1 },
      { label: "Para avisos, preguntas o mails", points: 2 },
      { label: "Para varias etapas de una búsqueda o un proceso", points: 3 },
    ],
  },
  {
    id: "contexto-1",
    dimension: "contexto",
    prompt: "Necesitás un aviso de búsqueda. ¿Qué le escribís a la IA?",
    options: [
      { label: "No le pediría eso a una IA", points: 0 },
      { label: "\"Escribime un aviso para analista contable\"", points: 1 },
      { label: "El puesto y los requisitos", points: 2 },
      { label: "Puesto, empresa, tono, requisitos y qué no tiene que decir", points: 3 },
    ],
  },
  {
    id: "contexto-2",
    dimension: "contexto",
    prompt: "La primera respuesta no te sirve. ¿Qué hacés?",
    options: [
      { label: "Cierro el chat", points: 0 },
      { label: "Vuelvo a escribir lo mismo", points: 1 },
      { label: "La corrijo a mano", points: 2 },
      { label: "Le repregunto: \"más corta\", \"otro tono\", \"agregá esto\"", points: 3 },
    ],
  },
  {
    id: "criterio-1",
    dimension: "criterio",
    prompt: "La IA te arma un mail para un candidato. ¿Qué pasa después?",
    options: [
      { label: "No usaría la IA para eso", points: 1 },
      { label: "Lo mando como está", points: 0 },
      { label: "Lo leo por arriba y lo mando", points: 1 },
      { label: "Lo leo entero y chequeo cada dato", points: 3 },
    ],
  },
  {
    id: "criterio-2",
    dimension: "criterio",
    prompt: "¿Le pedirías a la IA que elija entre dos finalistas?",
    options: [
      { label: "Sí, y haría lo que diga", points: 0 },
      { label: "Sí, como opinión fuerte", points: 1 },
      { label: "Le pediría que ordene la evidencia, no que elija", points: 3 },
      { label: "No lo había pensado", points: 1 },
    ],
  },
  {
    id: "proceso-1",
    dimension: "proceso",
    prompt: "Cuando entrevistás para un mismo puesto, ¿usás las mismas preguntas con todos?",
    options: [
      { label: "No, voy viendo en cada charla", points: 0 },
      { label: "Más o menos, tengo una idea en la cabeza", points: 1 },
      { label: "Sí, tengo una lista escrita", points: 2 },
      { label: "Sí, con una rúbrica para puntuar", points: 3 },
    ],
  },
  {
    id: "proceso-2",
    dimension: "proceso",
    prompt: "¿Guardás los prompts que te funcionaron?",
    options: [
      { label: "No uso prompts", points: 0 },
      { label: "No, los escribo cada vez", points: 1 },
      { label: "Algunos, en notas sueltas", points: 2 },
      { label: "Sí, en un lugar que comparte el equipo", points: 3 },
    ],
  },
];

export type Scores = Record<Dimension, number>;

/** Puntaje por dimensión, de 0 a 100. */
export function scoreEvaluation(answers: Record<string, number>): Scores {
  const totals: Scores = { uso: 0, contexto: 0, criterio: 0, proceso: 0 };
  const max: Scores = { uso: 0, contexto: 0, criterio: 0, proceso: 0 };
  for (const q of evaluation) {
    max[q.dimension] += 3;
    const idx = answers[q.id];
    const opt = idx === undefined ? undefined : q.options[idx];
    if (opt) totals[q.dimension] += opt.points;
  }
  const out = { ...totals };
  for (const d of Object.keys(out) as Dimension[]) {
    out[d] = max[d] === 0 ? 0 : Math.round((totals[d] / max[d]) * 100);
  }
  return out;
}

/** Curso recomendado según el resultado. */
export function recommendCourse(scores: Scores): string {
  const base = (scores.uso + scores.contexto) / 2;
  if (base < 60) return "ia-rrhh-desde-cero";
  return "entrevistas-estructuradas";
}
