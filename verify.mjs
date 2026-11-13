// Chequeo de reglas de diseño contra la estética genérica de IA.
// Corre en cada build (npm run check) y en GitHub Actions: si falla, no se publica.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL(".", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const SRC = join(ROOT, "src");

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const files = walk(SRC).filter((f) => /\.(tsx?|css)$/.test(f));
const problems = [];

// Archivos donde se permite escribir hex (tokens) y textos literales de las guías.
const HEX_ALLOWED = ["src/app/globals.css", "src/app/layout.tsx"];
const CONTENT_FILES = ["src/data/courses.ts"];

const rules = [
  { id: "gradiente", re: /gradient/i, msg: "Gradientes prohibidos." },
  { id: "sombra", re: /\bshadow-(?!none)[a-z0-9]/, msg: "Sombras prohibidas (solo shadow-none)." },
  { id: "box-shadow", re: /box-shadow|drop-shadow/i, msg: "Sombras prohibidas." },
  { id: "vidrio", re: /backdrop-blur|backdrop-filter/i, msg: "Efecto vidrio prohibido." },
  { id: "animacion", re: /\banimate-(?!none)|@keyframes/, msg: "Animaciones decorativas prohibidas." },
  { id: "inter", re: /\bInter\b|Geist/, msg: "Fuente por defecto de plantilla (Inter/Geist) prohibida." },
  { id: "emoji", re: /\p{Extended_Pictographic}/u, msg: "Emojis prohibidos." },
  { id: "eyebrow", re: /uppercase/, msg: "Etiquetas en mayúsculas prohibidas." },
  { id: "eslogan", re: /\bNo es [^."]{1,40}\. Es /, msg: 'Frase tipo "No es X. Es Z." prohibida.', skipContent: true },
  {
    id: "marketing",
    re: /potenci[aá]|clase mundial|revolucion|supercharge|world-class|desbloque[aá]/i,
    msg: "Frase de marketing genérica.",
  },
  { id: "hex", re: /#[0-9a-fA-F]{3,8}\b/, msg: "Hex suelto: usar tokens de globals.css.", skipHexAllowed: true },
];

for (const file of files) {
  const rel = relative(ROOT, file).replaceAll("\\", "/");
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const r of rules) {
      if (r.skipHexAllowed && HEX_ALLOWED.includes(rel)) continue;
      if (r.skipContent && CONTENT_FILES.includes(rel)) continue;
      if (r.id === "hex" && /&#x?[0-9a-f]+;/i.test(line)) continue;
      if (r.re.test(line)) problems.push(`${rel}:${i + 1}  [${r.id}] ${r.msg}\n    ${line.trim().slice(0, 140)}`);
    }
  });
}

// Guiones largos en textos de interfaz (no en el contenido literal de las guías).
for (const file of files) {
  const rel = relative(ROOT, file).replaceAll("\\", "/");
  if (CONTENT_FILES.includes(rel)) continue;
  const count = (readFileSync(file, "utf8").match(/—/g) ?? []).length;
  if (count > 0) problems.push(`${rel}  [guion-largo] ${count} guion(es) largo(s) en texto de interfaz.`);
}

if (problems.length) {
  console.error(`verify: ${problems.length} problema(s)\n`);
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`verify: OK (${files.length} archivos revisados)`);
