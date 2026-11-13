// Modelo de datos del campus. En el sprint 2 estos tipos pasan a tablas reales
// (Supabase) detrás de la misma interfaz CampusRepo: las pantallas no cambian.

export type Level = "Inicial" | "Intermedio";

export type Block =
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "terms"; items: { term: string; def: string }[] }
  | { kind: "prompt"; title: string; text: string }
  | { kind: "note"; text: string };

export interface Lesson {
  slug: string;
  title: string;
  minutes: number;
  /** Lección abierta sin comprar el curso. */
  preview: boolean;
  blocks: Block[];
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  /** Índice de la opción correcta. */
  answer: number;
  explanation: string;
}

export interface Teacher {
  name: string;
  role: string;
}

export interface Course {
  slug: string;
  title: string;
  subtitle: string;
  level: Level;
  /** Minutos totales estimados. */
  minutes: number;
  status: "disponible" | "proximamente";
  teachers: Teacher[];
  outcomes: string[];
  forWhom: string[];
  notForWhom: string[];
  includes: string[];
  lessons: Lesson[];
  quiz: QuizQuestion[];
  /** Ruta del PDF de muestra dentro de /public. */
  samplePdf?: string;
  faq: { q: string; a: string }[];
}

export type Dimension = "uso" | "contexto" | "criterio" | "proceso";

export interface EvalOption {
  label: string;
  points: 0 | 1 | 2 | 3;
}

export interface EvalQuestion {
  id: string;
  dimension: Dimension;
  prompt: string;
  options: EvalOption[];
}

export interface Certificate {
  code: string;
  name: string;
  courseSlug: string;
  courseTitle: string;
  /** ISO date. */
  issuedAt: string;
  score: number;
}
