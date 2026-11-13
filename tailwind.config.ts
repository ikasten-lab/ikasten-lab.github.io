import type { Config } from "tailwindcss";

// Todos los colores salen de variables CSS definidas en src/app/globals.css.
// Nunca escribir un hex suelto en un componente.
const v = (name: string) => `var(--${name})`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      canvas: v("canvas"),
      surface: v("surface"),
      card: v("card"),
      border: v("border"),
      "border-strong": v("border-strong"),
      text: v("text"),
      muted: v("text-muted"),
      faint: v("text-faint"),
      accent: v("accent"),
      "accent-hover": v("accent-hover"),
      "accent-soft": v("accent-soft"),
      "accent-wash": v("accent-wash"),
      positive: v("positive"),
      "positive-wash": v("positive-wash"),
      attention: v("attention"),
      "attention-wash": v("attention-wash"),
      white: v("card"),
    },
    fontFamily: {
      sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      mono: ["var(--font-mono)", "ui-monospace", "monospace"],
    },
    borderRadius: { none: "0", sm: "4px", DEFAULT: "6px", md: "8px", lg: "12px", full: "9999px" },
    boxShadow: { none: "none" },
    extend: {
      maxWidth: { prose: "68ch", page: "1120px" },
    },
  },
  plugins: [],
};
export default config;
