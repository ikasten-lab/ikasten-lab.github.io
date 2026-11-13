"use client";

import { useEffect, useState } from "react";
import { load, type StudentState } from "./store";

const initial: StudentState = { name: "", email: "", purchased: [], completed: {}, certificates: [] };

/** Estado del alumno, sincronizado entre pestañas y componentes. */
export function useStudent(): [StudentState, boolean] {
  const [state, setState] = useState<StudentState>(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const refresh = () => setState(load());
    refresh();
    setReady(true);
    window.addEventListener("ikasten-store", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("ikasten-store", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);
  return [state, ready];
}
