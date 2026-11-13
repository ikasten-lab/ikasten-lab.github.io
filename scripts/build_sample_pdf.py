"""Genera el PDF de muestra del curso "IA para RR.HH. desde cero".

Solo las lecciones 1 a 3 (las de muestra). El repo es público: nunca generar acá
el material completo ni datos de contacto personales.

Uso: python scripts/build_sample_pdf.py
"""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import KeepTogether, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

OUT = Path(__file__).resolve().parent.parent / "public" / "descargas" / "ia-rrhh-desde-cero-muestra.pdf"

ACCENT = HexColor("#5A0F22")
TEXT = HexColor("#1A1816")
MUTED = HexColor("#6B665F")
SURFACE = HexColor("#EDE9E0")
BORDER = HexColor("#DDD8CD")

body = ParagraphStyle("body", fontName="Helvetica", fontSize=11, leading=16, textColor=TEXT, spaceAfter=8, alignment=TA_LEFT)
h1 = ParagraphStyle("h1", fontName="Helvetica-Bold", fontSize=24, leading=28, textColor=TEXT, spaceAfter=6)
sub = ParagraphStyle("sub", parent=body, fontSize=13, leading=18, textColor=MUTED, spaceAfter=4)
h2 = ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=15, leading=19, textColor=ACCENT, spaceBefore=14, spaceAfter=6)
h3 = ParagraphStyle("h3", fontName="Helvetica-Bold", fontSize=11.5, leading=16, textColor=TEXT, spaceBefore=6, spaceAfter=2)
small = ParagraphStyle("small", parent=body, fontSize=9, leading=12, textColor=MUTED)
brand = ParagraphStyle("brand", fontName="Helvetica-Bold", fontSize=13, textColor=ACCENT, spaceAfter=18)


def prompt_box(title: str, text: str) -> KeepTogether:
    t = Table(
        [[Paragraph(f"<b>{title}</b>", body)], [Paragraph(text, body)]],
        colWidths=[170 * mm],
    )
    t.setStyle(
        TableStyle(
            [
                ("BOX", (0, 0), (-1, -1), 0.8, BORDER),
                ("LINEBELOW", (0, 0), (-1, 0), 0.8, BORDER),
                ("BACKGROUND", (0, 1), (-1, 1), SURFACE),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return KeepTogether([t, Spacer(1, 8)])


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(20 * mm, 12 * mm, "Ikasten · IA para RR.HH. desde cero · Muestra gratuita")
    canvas.drawRightString(190 * mm, 12 * mm, str(doc.page))
    canvas.restoreState()


def build() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(OUT), pagesize=A4, leftMargin=20 * mm, rightMargin=20 * mm, topMargin=18 * mm, bottomMargin=20 * mm,
                            title="IA para RR.HH. desde cero (muestra)", author="Ikasten")
    s = []
    s.append(Paragraph("Ikasten", brand))
    s.append(Paragraph("IA para RR.HH. desde cero", h1))
    s.append(Paragraph("Tu primera semana con un copiloto de IA, sin haber abierto nunca un chat antes", sub))
    s.append(Paragraph("Muestra gratuita: lecciones 1 a 3 de 6", small))

    s.append(Paragraph("1. Esto es para vos, arranques de donde arranques", h2))
    s.append(Paragraph('No hace falta saber programar, no hace falta haber "jugado" con ChatGPT en tu casa, no hace falta ningún curso previo. Si nunca abriste una ventana de chat con una IA en tu vida laboral, esta guía empieza ahí.', body))
    s.append(Paragraph("Pensalo así: abrir un chat de IA por primera vez es como escribirle a un compañero nuevo que sabe muchísimo de texto y de organización, pero no sabe nada de tu empresa, tu proceso ni tu vacante. No es magia, no lee tu mente: hay que contarle. Esta guía te enseña a contarle bien, con tres tareas reales de RR.HH. que podés resolver hoy mismo, no en un curso de tres meses.", body))

    s.append(Paragraph("2. Lo mínimo que necesitás saber antes de escribir algo", h2))
    s.append(Paragraph('Un "prompt" es simplemente el mensaje que le escribís a la IA. No hay una forma "correcta" única: hay formas que dan mejores resultados, y las vas a ir viendo con ejemplos.', body))
    s.append(Paragraph("Es una conversación, no una búsqueda", h3))
    s.append(Paragraph('En un buscador escribís tres palabras y esperás un link. Acá podés escribir un párrafo entero explicando la situación, y después seguir corrigiendo: "no, más corto", "sacá el tono formal", "agregale esto que me olvidé". Nadie escribe el prompt perfecto a la primera.', body))
    s.append(Paragraph("Cuanto más contexto le das, mejor responde", h3))
    s.append(Paragraph('Si le pedís "escribime un aviso de búsqueda" a secas, te va a tirar algo genérico. Si le contás el puesto, la empresa, el tono que querés y qué NO tiene que decir, la respuesta se parece mucho más a lo que necesitás.', body))
    s.append(Paragraph("Todo lo que te devuelve, lo revisás vos", h3))
    s.append(Paragraph('La IA puede inventar datos con total confianza (a esto se lo llama "alucinar"). Nunca mandes algo que te dio sin leerlo antes: es la regla más importante de esta guía.', body))

    s.append(Paragraph("3. Tu primer prompt real: elegí una de estas tres tareas", h2))
    s.append(Paragraph("No hace falta hacer las tres. Elegí la que más te sirva esta semana, copiá el prompt tal cual (ajustando lo que está entre corchetes) y probalo en cualquier chat de IA que tengas a mano.", body))
    s.append(prompt_box("Tarea 1: redactar un aviso de búsqueda laboral", "Necesito un aviso de búsqueda laboral para el puesto de [nombre del puesto] en [nombre de la empresa o rubro]. El tono tiene que ser [formal / cercano / directo]. Estos son los requisitos excluyentes: [lista]. Estos son deseables pero no excluyentes: [lista]. No incluyas frases genéricas tipo 'buscamos gente proactiva' sin explicar qué significa eso para este puesto en particular."))
    s.append(prompt_box("Tarea 2: armar preguntas de entrevista", "Voy a entrevistar candidatos para el puesto de [nombre del puesto]. Dame 5 preguntas de entrevista que me ayuden a evaluar si la persona tiene la experiencia real necesaria, no solo si sabe hablar bien del tema. El puesto requiere principalmente [2 o 3 responsabilidades clave]."))
    s.append(prompt_box("Tarea 3: ordenar notas de una entrevista", "Estas son mis notas desordenadas de una entrevista que ya hice. Organizalas en tres bloques: fortalezas, dudas o alertas, y preguntas que me quedaron pendientes para la próxima instancia. No agregues nada que no esté en mis notas. Notas: [pegar tus notas tal cual las escribiste]."))

    s.append(Spacer(1, 6))
    s.append(Paragraph("El curso completo sigue con los 5 errores que te hacen abandonar en el primer intento, las palabras que vas a escuchar y qué hacer esta semana. Cierra con un quiz y un certificado verificable.", small))
    doc.build(s, onFirstPage=footer, onLaterPages=footer)
    print(f"PDF generado: {OUT}")


if __name__ == "__main__":
    build()
