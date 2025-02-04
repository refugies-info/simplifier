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
    model: albert("AgentPublic/llama3-instruct-guillaumetell"),
    system: "You are a helpful assistant.",
    prompt,
  });

  return Response.json({ text });
}
