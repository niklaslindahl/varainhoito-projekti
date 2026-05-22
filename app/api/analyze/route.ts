import OpenAI from "openai";
import { SYSTEM_PROMPT } from "@/lib/system-prompt";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.startsWith("tähän-tulee")) {
    return Response.json(
      { virhe: "puuttuva-avain", selitys: "OPENAI_API_KEY-ympäristömuuttuja puuttuu palvelimelta. Päivitä .env.local ja käynnistä dev-palvelin uudelleen." },
      { status: 500 }
    );
  }

  let body: { salkku?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { virhe: "viallinen-pyynto", selitys: "Pyynnön rungon JSON oli viallinen." },
      { status: 400 }
    );
  }

  const text = typeof body?.salkku === "string" ? body.salkku.trim() : "";
  if (!text) {
    return Response.json(
      { virhe: "syote-epaselva", selitys: "Salkkuteksti puuttui pyynnöstä." },
      { status: 400 }
    );
  }

  const rows = text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((rivi) => ({ rivi }));

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-5-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: JSON.stringify(rows) },
      ],
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return Response.json(
        { virhe: "tyhja-vastaus", selitys: "OpenAI palautti tyhjän vastauksen." },
        { status: 502 }
      );
    }

    return Response.json(JSON.parse(content));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Tuntematon virhe";
    return Response.json(
      { virhe: "openai-virhe", selitys: message },
      { status: 502 }
    );
  }
}
