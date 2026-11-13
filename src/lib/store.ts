"use client";

import type { Certificate } from "@/data/types";

// Estado simulado del alumno, guardado en el navegador. Es solo para el borrador:
// en el sprint 2 todo esto vive en la base de datos.

const KEY = "ikasten-campus-v1";

export interface StudentState {
  name: string;
  email: string;
  purchased: string[];
  completed: Record<string, string[]>;
  certificates: Certificate[];
  evaluation?: { answers: Record<string, number>; at: string };
}

const empty: StudentState = { name: "", email: "", purchased: [], completed: {}, certificates: [] };

export function load(): StudentState {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty;
    return { ...empty, ...(JSON.parse(raw) as Partial<StudentState>) };
  } catch {
    return empty;
  }
}

export function save(state: StudentState): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
    window.dispatchEvent(new Event("ikasten-store"));
  } catch {
    // Navegación privada o almacenamiento bloqueado: el borrador sigue funcionando sin guardar.
  }
}

export function update(fn: (s: StudentState) => StudentState): StudentState {
  const next = fn(load());
  save(next);
  return next;
}

export function reset(): void {
  try {
    window.localStorage.removeItem(KEY);
    window.dispatchEvent(new Event("ikasten-store"));
  } catch {
    /* sin almacenamiento */
  }
}

/** Código de certificado: IK-AAAA-XXXX, sin caracteres que se confunden (0/O, 1/I). */
export function newCertificateCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  for (const b of bytes) s += alphabet[b % alphabet.length];
  return `IK-${new Date().getFullYear()}-${s}`;
}
