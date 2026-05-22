import OpenAI from "openai";
import { SYSTEM_PROMPT } from "@/lib/system-prompt";

export const runtime = "nodejs";

const MAX_INPUT_CHARS = 8_000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const hits = new Map<string, number[]>();

function rateLimit(ip: string): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const arr = (hits.get(ip) ?? []).filter((t) => t > cutoff);
  if (arr.length >= RATE_LIMIT_MAX) {
    const oldest = arr[0];
    return { ok: false, retryAfterSec: Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000) };
  }
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => t <= cutoff)) hits.delete(k);
    }
  }
  return { ok: true, retryAfterSec: 0 };
}

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.startsWith("tähän-tulee")) {
    return Response.json(
      { virhe: "palvelimen-virhe", selitys: "Palvelin ei ole oikein konfiguroitu." },
      { status: 500 }
    );
  }

  const ip = clientIp(req);
  const rl = rateLimit(ip);
  if (!rl.ok) {
    return Response.json(
      {
        virhe: "liikaa-pyyntoja",
        selitys: `Liian monta pyyntöä lyhyessä ajassa. Yritä uudelleen ${Math.ceil(rl.retryAfterSec / 60)} minuutin kuluttua.`,
      },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
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

  if (text.length > MAX_INPUT_CHARS) {
    return Response.json(
      {
        virhe: "syote-liian-pitka",
        selitys: `Salkkuteksti on liian pitkä (max ${MAX_INPUT_CHARS} merkkiä, sait ${text.length}).`,
      },
      { status: 413 }
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
        { virhe: "tyhja-vastaus", selitys: "Analyysi epäonnistui, yritä myöhemmin uudelleen." },
        { status: 502 }
      );
    }

    return Response.json(JSON.parse(content));
  } catch (err) {
    console.error("OpenAI error:", err);
    return Response.json(
      { virhe: "analyysi-epaonnistui", selitys: "Analyysi epäonnistui, yritä myöhemmin uudelleen." },
      { status: 502 }
    );
  }
}
