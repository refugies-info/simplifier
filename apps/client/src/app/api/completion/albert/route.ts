import { generateText } from "ai";

import { createOpenAI } from "@ai-sdk/openai";

const albert = createOpenAI({
  // custom settings, e.g.
  baseURL: "https://albert.api.etalab.gouv.fr/v1",
  apiKey: process.env.ALBERT_API_KEY,
  compatibility: "strict", // strict mode, enable when using the OpenAI API
});

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const { text } = await generateText({
    model: albert("meta-llama/Llama-3.1-8B-Instruct"),
    system: `
    Format :
    --------
    Html avec titres et liens

    Instructions :
    --------------
    Tu es rédacteur spécialiste des démarches administratives.
    Pour chaque prompt tu traduira le texte en lagage clair en ajoutant des titres et des sous-titre 


`,
    prompt,
  });

  return Response.json({ text });
}
