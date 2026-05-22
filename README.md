# Varainhoidon AI-avustaja

Demosovellus, jossa sijoittaja liittää salkkunsa tekstikenttään (rivi per positio) ja saa kielimallin tuottaman nelio­saisen analyysin:

1. **Allokaatio** — osakkeet / korot / vaihtoehtoiset / käteinen
2. **Hajautusvaroitukset** — yhtiö-, sektori- ja aluekeskittymät
3. **Riskiprofiili** — varovainen / maltillinen / aktiivinen / aggressiivinen
4. **Kolme suositusta** vaikutusarvioilla

Tarkoitus on näyttää varainhoidon ammattilaisille mitä yhdessä iltapäivässä voi rakentaa, kun kielimalli tekee parsimisen ja yhteenvedon ja sovellus huolehtii vain käyttöliittymästä ja palvelinpuolen API-kutsusta.

## Tekniikka

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- OpenAI Chat Completions API (`gpt-5-mini`, JSON mode)
- Palvelinpuolen Route Handler `/api/analyze` — API-avain ei vuoda selaimeen

## Ajaminen paikallisesti

```bash
npm install
cp .env.local.example .env.local   # lisää oma OPENAI_API_KEY
npm run dev
```

Avaa <http://localhost:3000>.

## Vastuuvapauslauseke

Analyysi perustuu käyttäjän syöttämään tekstiin ja kielimallin tuottamaan arvioon. **Ei ole sijoitusneuvonta.**

---

Rakentanut [Niklas Lindahl](https://www.linkedin.com/in/niklas-lindahl/) yhden iltapäivän aikana Claude Coden avustamana.
