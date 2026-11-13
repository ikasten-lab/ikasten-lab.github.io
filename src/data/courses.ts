import type { Course, Teacher } from "./types";

// Contenido tomado de las guías de HR + IA de Facu V. (labs/hr-ai-guide-*/CONTENT*.md).
// El texto de las lecciones es literal de esas guías: no parafrasear.

const equipo: Teacher[] = [
  { name: "Facu V.", role: "Cofundador de Ikasten" },
  { name: "Facu D.", role: "Cofundador de Ikasten" },
];

export const courses: Course[] = [
  {
    slug: "ia-rrhh-desde-cero",
    title: "IA para RR.HH. desde cero",
    subtitle:
      "Tu primera semana con un copiloto de IA, sin haber abierto nunca un chat antes.",
    level: "Inicial",
    minutes: 45,
    status: "disponible",
    teachers: equipo,
    outcomes: [
      "Escribir tu primer prompt útil de verdad, sobre una tarea real de tu semana.",
      "Redactar un aviso de búsqueda, armar preguntas de entrevista u ordenar notas con ayuda de la IA.",
      "Reconocer los 5 errores que hacen que la gente abandone en el primer intento.",
      "Revisar todo lo que te devuelve la IA antes de usarlo.",
    ],
    forWhom: [
      "Gente de RR.HH. que nunca usó IA en el trabajo.",
      "Quien probó una vez, no le sirvió y no volvió a intentar.",
      "Equipos chicos que quieren arrancar sin un curso de tres meses.",
    ],
    notForWhom: [
      "Quien ya usa IA todos los días y busca automatizar procesos completos.",
      "Quien busca asesoramiento legal sobre IA en selección.",
    ],
    includes: [
      "6 lecciones cortas para leer desde el celular.",
      "3 prompts listos para copiar y adaptar.",
      "Quiz final y certificado verificable.",
      "Guía en PDF para descargar.",
    ],
    samplePdf: "/descargas/ia-rrhh-desde-cero-muestra.pdf",
    faq: [
      {
        q: "¿Necesito saber programar?",
        a: "No. Si sabés escribir un mail, sabés escribir un prompt.",
      },
      {
        q: "¿Qué herramienta de IA tengo que usar?",
        a: "Cualquier chat de IA de uso general sirve para lo que ves en el curso.",
      },
      {
        q: "¿Cuánto tiempo me lleva?",
        a: "Unos 45 minutos de lectura. Lo que lleva más es probar los prompts con tus tareas reales.",
      },
      {
        q: "¿Lo puede pagar mi empresa?",
        a: "Sí. Escribinos desde la sección para empresas y armamos la propuesta.",
      },
    ],
    lessons: [
      {
        slug: "para-vos",
        title: "Esto es para vos, arranques de donde arranques",
        minutes: 4,
        preview: true,
        blocks: [
          {
            kind: "p",
            text: "No hace falta saber programar, no hace falta haber \"jugado\" con ChatGPT en tu casa, no hace falta ningún curso previo. Si nunca abriste una ventana de chat con una IA en tu vida laboral, esta guía empieza ahí.",
          },
          {
            kind: "p",
            text: "Pensalo así: abrir un chat de IA por primera vez es como escribirle a un compañero nuevo que sabe muchísimo de texto y de organización, pero no sabe nada de tu empresa, tu proceso ni tu vacante. No es magia, no lee tu mente — hay que contarle. Esta guía te enseña a contarle bien, con tres tareas reales de RR.HH. que podés resolver hoy mismo, no en un curso de tres meses.",
          },
          {
            kind: "p",
            text: "Al final de esta guía vas a haber escrito tu primer prompt útil de verdad, no un experimento.",
          },
        ],
      },
      {
        slug: "lo-minimo",
        title: "Lo mínimo que necesitás saber antes de escribir algo",
        minutes: 6,
        preview: true,
        blocks: [
          {
            kind: "p",
            text: "Un \"prompt\" es simplemente el mensaje que le escribís a la IA. No hay una forma \"correcta\" única — hay formas que dan mejores resultados, y las vas a ir viendo en esta guía con ejemplos.",
          },
          { kind: "h", text: "Tres cosas que cambian todo si las sabés desde el primer día" },
          { kind: "h", text: "Es una conversación, no una búsqueda" },
          {
            kind: "p",
            text: "En un buscador escribís tres palabras y esperás un link. Acá podés escribir un párrafo entero explicando la situación, y después seguir corrigiendo: \"no, más corto\", \"sacá el tono formal\", \"agregale esto que me olvidé\". Nadie escribe el prompt perfecto a la primera.",
          },
          { kind: "h", text: "Cuanto más contexto le das, mejor responde" },
          {
            kind: "p",
            text: "Si le pedís \"escribime un aviso de búsqueda\" a secas, te va a tirar algo genérico. Si le contás el puesto, la empresa, el tono que querés y qué NO tiene que decir, la respuesta se parece mucho más a lo que necesitás.",
          },
          { kind: "h", text: "Todo lo que te devuelve, lo revisás vos" },
          {
            kind: "p",
            text: "La IA puede inventar datos con total confianza (a esto se lo llama \"alucinar\"). Nunca mandes algo que te dio sin leerlo antes — esto no es un detalle menor, es la regla más importante de esta guía.",
          },
        ],
      },
      {
        slug: "primer-prompt",
        title: "Tu primer prompt real: elegí una de estas tres tareas",
        minutes: 10,
        preview: false,
        blocks: [
          {
            kind: "p",
            text: "No hace falta hacer las tres. Elegí la que más te sirva esta semana, copiá el prompt tal cual (ajustando lo que está entre corchetes) y probalo en cualquier chat de IA que tengas a mano.",
          },
          {
            kind: "prompt",
            title: "Tarea 1: redactar un aviso de búsqueda laboral",
            text: "Necesito un aviso de búsqueda laboral para el puesto de [nombre del puesto] en [nombre de la empresa o rubro]. El tono tiene que ser [formal / cercano / directo]. Estos son los requisitos excluyentes: [lista]. Estos son deseables pero no excluyentes: [lista]. No incluyas frases genéricas tipo 'buscamos gente proactiva' sin explicar qué significa eso para este puesto en particular.",
          },
          {
            kind: "prompt",
            title: "Tarea 2: armar preguntas de entrevista para un puesto sin proceso definido",
            text: "Voy a entrevistar candidatos para el puesto de [nombre del puesto]. Dame 5 preguntas de entrevista que me ayuden a evaluar si la persona tiene la experiencia real necesaria, no solo si sabe hablar bien del tema. El puesto requiere principalmente [2 o 3 responsabilidades clave].",
          },
          {
            kind: "prompt",
            title: "Tarea 3: ordenar notas sueltas de una entrevista ya hecha",
            text: "Estas son mis notas desordenadas de una entrevista que ya hice. Organizalas en tres bloques: fortalezas, dudas o alertas, y preguntas que me quedaron pendientes para la próxima instancia. No agregues nada que no esté en mis notas. Notas: [pegar tus notas tal cual las escribiste].",
          },
        ],
      },
      {
        slug: "cinco-errores",
        title: "Los 5 errores que te hacen abandonar en el primer intento",
        minutes: 8,
        preview: false,
        blocks: [
          { kind: "h", text: "1. Escribir un prompt de una línea y esperar magia" },
          {
            kind: "p",
            text: "Sin contexto, la respuesta va a ser genérica — y ahí es donde la mayoría concluye \"esto no sirve\" y no vuelve a probar.",
          },
          { kind: "h", text: "2. No repreguntar" },
          {
            kind: "p",
            text: "Si la primera respuesta no sirve, el error no es tuyo ni de la IA — es que falta una vuelta más de ida y vuelta. \"Hacela más corta\", \"sacale este párrafo\", \"dame otra versión\" son mensajes totalmente válidos.",
          },
          { kind: "h", text: "3. Pegar todo de una sin estructura" },
          {
            kind: "p",
            text: "Si tenés que darle mucha información, separala con guiones o títulos cortos. Un bloque de texto sin ningún orden es más difícil de procesar para la IA que para vos.",
          },
          { kind: "h", text: "4. No revisar antes de usar" },
          {
            kind: "p",
            text: "Ya lo dijimos en la lección 2, pero es el error que más cuesta después: mandar un aviso o un mail con un dato inventado por no haberlo leído.",
          },
          { kind: "h", text: "5. Tratarlo como una calculadora de decisiones" },
          {
            kind: "p",
            text: "La IA te ayuda a redactar, ordenar y estructurar más rápido. La decisión de a quién contratar la seguís tomando vos, con criterio humano — no le pidas que decida por vos.",
          },
        ],
      },
      {
        slug: "seis-palabras",
        title: "Seis palabras que vas a escuchar (y ya vas a entender)",
        minutes: 5,
        preview: false,
        blocks: [
          {
            kind: "terms",
            items: [
              { term: "Prompt", def: "el mensaje que le escribís a la IA." },
              {
                term: "Chat",
                def: "la conversación completa, con memoria de lo que fueron hablando (hasta cierto punto).",
              },
              {
                term: "Alucinar",
                def: "cuando la IA inventa un dato con total seguridad como si fuera cierto. Por eso siempre se revisa.",
              },
              {
                term: "Contexto",
                def: "toda la información de fondo que le das para que la respuesta sea específica y no genérica.",
              },
              {
                term: "Modelo",
                def: "el sistema de IA en sí (hay varios: Claude, ChatGPT, Gemini, entre otros). Para lo que ves en esta guía, cualquiera te sirve.",
              },
              {
                term: "Copiloto",
                def: "la idea central de toda esta guía — la IA te acompaña y acelera el trabajo, no lo hace en tu lugar.",
              },
            ],
          },
        ],
      },
      {
        slug: "esta-semana",
        title: "Qué hacer esta semana",
        minutes: 6,
        preview: false,
        blocks: [
          {
            kind: "list",
            items: [
              "Elegí una tarea real que tengas pendiente esta semana (un aviso por escribir, una entrevista por preparar, notas por ordenar) y probá el prompt correspondiente de la lección 3.",
              "Guardate el prompt que mejor te funcionó — la próxima vez que tengas una tarea parecida, arrancás de ahí en vez de la hoja en blanco.",
              "Repreguntale a la IA al menos una vez sobre la primera respuesta, aunque ya te sirva. Es la forma más rápida de aprender qué tan lejos podés llevar la conversación.",
            ],
          },
          { kind: "h", text: "Qué no cubre este curso" },
          {
            kind: "note",
            text: "Es un punto de partida, no un curso completo. No cubre cómo elegir entre distintos modelos de IA, ni cómo automatizar procesos completos de selección, ni aspectos legales del uso de IA en RR.HH. Para llevar la estructura de entrevistas al siguiente nivel, seguí con \"Entrevistas estructuradas con copiloto de IA\".",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Le pediste a la IA un aviso de búsqueda y te devolvió algo genérico. ¿Qué conviene hacer?",
        options: [
          "Concluir que la IA no sirve para esto.",
          "Darle más contexto: puesto, empresa, tono y qué no tiene que decir.",
          "Copiar el aviso y publicarlo igual.",
        ],
        answer: 1,
        explanation: "Cuanto más contexto le das, mejor responde.",
      },
      {
        id: "q2",
        prompt: "¿Qué significa que la IA \"alucina\"?",
        options: [
          "Que se cuelga y no responde.",
          "Que inventa un dato con total seguridad, como si fuera cierto.",
          "Que responde en otro idioma.",
        ],
        answer: 1,
        explanation: "Por eso todo lo que te devuelve se revisa antes de usarlo.",
      },
      {
        id: "q3",
        prompt: "La primera respuesta no te sirve. ¿Qué es lo más útil?",
        options: [
          "Repreguntar: \"hacela más corta\", \"dame otra versión\".",
          "Cerrar el chat y empezar de cero con otra herramienta.",
          "Escribir el mismo prompt otra vez.",
        ],
        answer: 0,
        explanation: "Nadie escribe el prompt perfecto a la primera: es una conversación.",
      },
      {
        id: "q4",
        prompt: "Tenés que pasarle mucha información. ¿Cómo conviene hacerlo?",
        options: [
          "Pegar todo junto en un solo bloque.",
          "Separarla con guiones o títulos cortos.",
          "Mandarla en diez mensajes cortos sin explicar nada.",
        ],
        answer: 1,
        explanation: "Un bloque sin orden es más difícil de procesar para la IA que para vos.",
      },
      {
        id: "q5",
        prompt: "¿Quién decide a quién contratar?",
        options: [
          "La IA, si tiene buenos datos.",
          "Vos, con criterio humano. La IA te ayuda a redactar y ordenar.",
          "Depende del puesto.",
        ],
        answer: 1,
        explanation: "La IA es un copiloto: acelera el trabajo, no decide por vos.",
      },
    ],
  },
  {
    slug: "entrevistas-estructuradas",
    title: "Entrevistas estructuradas con copiloto de IA",
    subtitle:
      "Rúbrica, banco de preguntas y prompts probados para no perder el criterio humano.",
    level: "Intermedio",
    minutes: 60,
    status: "disponible",
    teachers: equipo,
    outcomes: [
      "Armar una rúbrica de 5 puntos para las competencias del puesto.",
      "Usar un banco de preguntas conductuales en formato STAR.",
      "Usar la IA para repreguntar y ordenar notas sin que puntúe por vos.",
      "Detectar impresiones sin evidencia en tus propias notas.",
    ],
    forWhom: [
      "Quien entrevista seguido y quiere comparar candidatos con la misma vara.",
      "Equipos de selección que ya usan IA y quieren ordenar cómo la usan.",
    ],
    notForWhom: [
      "Quien nunca abrió un chat de IA: conviene empezar por \"IA para RR.HH. desde cero\".",
      "Quien busca asesoramiento legal sobre procesos de selección.",
    ],
    includes: [
      "6 lecciones con rúbrica y banco de preguntas.",
      "3 prompts para usar durante y después de la entrevista.",
      "Quiz final y certificado verificable.",
    ],
    faq: [
      {
        q: "¿Funciona con cualquier herramienta?",
        a: "Sí. El método funciona con cualquier copiloto de IA de uso general.",
      },
      {
        q: "¿La IA puntúa a los candidatos?",
        a: "No. Todo el curso está pensado para que la IA ordene tu criterio, nunca para que lo reemplace.",
      },
    ],
    lessons: [
      {
        slug: "por-que-importa",
        title: "Por qué esto importa",
        minutes: 5,
        preview: true,
        blocks: [
          {
            kind: "p",
            text: "Las entrevistas sin estructura son el punto más débil de casi todos los procesos de selección: cada entrevistador pregunta lo que se le ocurre, puntúa con su propia vara, y decide en gran parte por simpatía.",
          },
          {
            kind: "p",
            text: "Esta guía no es sobre reemplazar esa charla por IA. Es sobre usar un copiloto de IA para sostener la estructura sin perder el criterio humano que hace que una entrevista sirva.",
          },
          {
            kind: "h",
            text: "El error más común",
          },
          {
            kind: "p",
            text: "El error no es usar IA en el proceso de selección. El error es dejar que la IA decida. Cuando el copiloto pasa de \"ayudarte a estructurar\" a \"decirte a quién contratar\", perdés la trazabilidad de por qué se descartó a alguien, y heredás cualquier sesgo que el modelo haya aprendido sin que nadie lo audite.",
          },
        ],
      },
      {
        slug: "rubrica",
        title: "Elegí las competencias y armá tu rúbrica",
        minutes: 10,
        preview: true,
        blocks: [
          {
            kind: "p",
            text: "Antes de la entrevista, no durante. Elegí entre 3 y 5 competencias relevantes para el puesto. Si no sabés por dónde arrancar, esta base genérica sirve para la mayoría de los roles:",
          },
          {
            kind: "list",
            items: [
              "Resolución de problemas",
              "Comunicación",
              "Trabajo en equipo / colaboración",
              "Adaptabilidad",
              "Ownership / iniciativa",
            ],
          },
          { kind: "h", text: "Rúbrica de 5 puntos" },
          {
            kind: "terms",
            items: [
              { term: "1", def: "Sin evidencia. La respuesta no muestra la competencia o la contradice." },
              { term: "2", def: "Evidencia débil. Menciona la competencia pero sin ejemplo concreto." },
              { term: "3", def: "Evidencia parcial. Da un ejemplo, pero incompleto o poco relevante al rol." },
              { term: "4", def: "Evidencia clara. Un ejemplo concreto, bien explicado, relevante." },
              { term: "5", def: "Evidencia clara y repetida. Más de un ejemplo, o un ejemplo con impacto medible." },
            ],
          },
          {
            kind: "note",
            text: "Usá la misma rúbrica para todos los candidatos del mismo puesto. Sin excepciones.",
          },
        ],
      },
      {
        slug: "banco-de-preguntas",
        title: "Banco de preguntas conductuales",
        minutes: 12,
        preview: false,
        blocks: [
          {
            kind: "p",
            text: "Dos preguntas por competencia, formato STAR (Situación, Tarea, Acción, Resultado). Están escritas para adaptarse a casi cualquier rol — ajustá el vocabulario, no la estructura.",
          },
          { kind: "h", text: "Resolución de problemas" },
          {
            kind: "list",
            items: [
              "Contame de una situación en la que identificaste un problema antes de que se volviera crítico. ¿Cómo te diste cuenta y qué hiciste?",
              "Describí una decisión difícil que tomaste con información incompleta. ¿Qué información te faltaba y cómo decidiste igual?",
            ],
          },
          { kind: "h", text: "Comunicación" },
          {
            kind: "list",
            items: [
              "Contame de una vez que tuviste que explicar algo técnico o complejo a alguien sin ese background. ¿Cómo adaptaste el mensaje?",
              "Describí un desacuerdo con un compañero o superior. ¿Cómo lo manejaste?",
            ],
          },
          { kind: "h", text: "Trabajo en equipo / colaboración" },
          {
            kind: "list",
            items: [
              "Contame de un proyecto en el que dependías fuerte de otras personas para llegar a un resultado. ¿Qué rol jugaste?",
              "Describí una vez que tuviste que dar feedback difícil a alguien de tu equipo.",
            ],
          },
          { kind: "h", text: "Adaptabilidad" },
          {
            kind: "list",
            items: [
              "Contame de un cambio grande —de prioridades, de equipo, de herramienta— que tuviste que absorber rápido. ¿Cómo lo manejaste?",
              "Describí una situación en la que tu plan original no funcionó. ¿Qué hiciste?",
            ],
          },
          { kind: "h", text: "Ownership / iniciativa" },
          {
            kind: "list",
            items: [
              "Contame de algo que hiciste sin que nadie te lo pidiera, porque viste que hacía falta.",
              "Describí un error tuyo del que te hiciste cargo. ¿Qué aprendiste?",
            ],
          },
        ],
      },
      {
        slug: "copiloto",
        title: "Usá el copiloto durante y después, no en vez de",
        minutes: 12,
        preview: false,
        blocks: [
          {
            kind: "p",
            text: "Tres prompts pensados para sostener tu criterio, no para reemplazarlo. Los tres asumen que vos ya tenés la rúbrica y las preguntas de las lecciones anteriores.",
          },
          {
            kind: "prompt",
            title: "Prompt 1: preguntas de seguimiento en vivo",
            text: "Te voy a dar la respuesta de un candidato a una pregunta sobre [competencia]. Dame 2 preguntas de seguimiento que profundicen en esa competencia específica, sin sugerir cuál sería la respuesta correcta. Respuesta del candidato: [pegar respuesta].",
          },
          {
            kind: "prompt",
            title: "Prompt 2: ordenar tus notas después de la entrevista",
            text: "Estas son mis notas crudas de una entrevista, tomadas en el momento. Organizalas según esta rúbrica de 5 competencias [pegar rúbrica], una sección por competencia, citando textualmente lo que dijo el candidato como evidencia. No asignes ningún puntaje vos — dejá el puntaje en blanco para que yo lo complete. Notas: [pegar notas].",
          },
          {
            kind: "prompt",
            title: "Prompt 3: detectar sesgo en tus propias notas",
            text: "Revisá estas notas de entrevista y marcá cualquier frase que sea una impresión subjetiva sin evidencia concreta de una competencia —por ejemplo 'encajaría bien con el equipo', 'buena energía', 'no lo veo en el puesto'— sin que haya un ejemplo o hecho específico detrás. Notas: [pegar notas].",
          },
        ],
      },
      {
        slug: "documentar",
        title: "Documentá y compará con la misma vara",
        minutes: 6,
        preview: false,
        blocks: [
          {
            kind: "p",
            text: "Completá la rúbrica inmediatamente después de cada entrevista, no al final del día ni al final de la semana. La memoria es el sesgo más grande de todos: entrevistador que recuerda mejor al último candidato, o al que más se pareció a él.",
          },
          {
            kind: "p",
            text: "Compará candidatos por puntaje de rúbrica, competencia por competencia — no por impresión general.",
          },
        ],
      },
      {
        slug: "errores",
        title: "Errores a evitar",
        minutes: 5,
        preview: false,
        blocks: [
          {
            kind: "list",
            items: [
              "Dejar que la IA puntúe candidatos sin que vos leas las respuestas originales.",
              "Usar las mismas preguntas para todos los roles sin adaptar las competencias al puesto.",
              "No documentar en el momento — la memoria post-entrevista es el sesgo más grande.",
              "Usar el copiloto para \"adivinar\" qué candidato conviene, en vez de estructurar el juicio humano.",
              "Compartir el prompt o las notas con el candidato o con terceros sin anonimizar.",
            ],
          },
          {
            kind: "note",
            text: "Este curso no reemplaza el asesoramiento legal sobre procesos de selección en tu jurisdicción. Consultá con tu asesor legal antes de estandarizar un proceso a nivel compañía.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        prompt: "¿Cuándo se arma la rúbrica?",
        options: ["Durante la entrevista.", "Antes de la entrevista.", "Al final de la semana."],
        answer: 1,
        explanation: "Antes, no durante: así todos los candidatos se miden con la misma vara.",
      },
      {
        id: "q2",
        prompt: "En la rúbrica, \"un ejemplo concreto, bien explicado, relevante\" es un…",
        options: ["2", "3", "4"],
        answer: 2,
        explanation: "4 es evidencia clara. 5 pide más de un ejemplo o impacto medible.",
      },
      {
        id: "q3",
        prompt: "¿Qué le pedís a la IA cuando ordena tus notas?",
        options: [
          "Que asigne el puntaje final.",
          "Que cite lo que dijo el candidato y deje el puntaje en blanco.",
          "Que recomiende a quién contratar.",
        ],
        answer: 1,
        explanation: "El puntaje lo ponés vos. La IA ordena la evidencia.",
      },
      {
        id: "q4",
        prompt: "\"Buena energía, encajaría bien\" en tus notas es…",
        options: [
          "Evidencia de la competencia de comunicación.",
          "Una impresión subjetiva sin evidencia concreta.",
          "Un 5 en la rúbrica.",
        ],
        answer: 1,
        explanation: "Sin un ejemplo o hecho detrás, es una impresión, no evidencia.",
      },
      {
        id: "q5",
        prompt: "¿Cuándo completás la rúbrica?",
        options: [
          "Inmediatamente después de cada entrevista.",
          "Al final del día.",
          "Cuando terminás con todos los candidatos.",
        ],
        answer: 0,
        explanation: "La memoria post-entrevista es el sesgo más grande.",
      },
    ],
  },
  {
    slug: "screening-de-cvs",
    title: "Screening de CVs con copiloto de IA",
    subtitle: "El filtro que no descarta a la persona correcta por el motivo equivocado.",
    level: "Intermedio",
    minutes: 50,
    status: "proximamente",
    teachers: equipo,
    outcomes: [
      "Definir el criterio antes de abrir el primer CV.",
      "Usar la IA para extraer y ordenar información, no para calificar.",
      "Aplicar un checklist antes de descartar a alguien.",
    ],
    forWhom: ["Quien revisa muchos CVs por búsqueda y quiere un filtro justo."],
    notForWhom: ["Quien busca una herramienta que descarte sola."],
    includes: ["Lecciones, prompts y checklist.", "Quiz final y certificado verificable."],
    faq: [],
    lessons: [
      { slug: "criterio", title: "Definí el criterio antes de abrir el primer CV", minutes: 10, preview: false, blocks: [] },
      { slug: "extraer", title: "Usá el copiloto para extraer y ordenar, no para calificar", minutes: 15, preview: false, blocks: [] },
      { slug: "checklist", title: "Checklist antes de descartar a alguien", minutes: 10, preview: false, blocks: [] },
    ],
    quiz: [],
  },
  {
    slug: "pedirle-algo-a-la-ia",
    title: "Cómo pedirle algo a un copiloto de IA sin que invente",
    subtitle: "El método para delegar tareas reales sin perder el control del resultado.",
    level: "Inicial",
    minutes: 40,
    status: "proximamente",
    teachers: equipo,
    outcomes: [
      "Definir el pedido antes de mandarlo.",
      "Armar el pedido y validarlo antes de actuar.",
      "Usar un checklist antes de una acción que no se puede deshacer.",
    ],
    forWhom: ["Quien ya usa IA y quiere delegarle tareas más grandes sin sorpresas."],
    notForWhom: ["Quien busca automatizar sin revisar el resultado."],
    includes: ["Lecciones, prompts y checklist.", "Quiz final y certificado verificable."],
    faq: [],
    lessons: [
      { slug: "definir", title: "Definí el pedido antes de mandarlo", minutes: 10, preview: false, blocks: [] },
      { slug: "validar", title: "Armá el pedido y validalo antes de actuar", minutes: 15, preview: false, blocks: [] },
      { slug: "irreversible", title: "Checklist antes de una acción irreversible", minutes: 8, preview: false, blocks: [] },
    ],
    quiz: [],
  },
];
