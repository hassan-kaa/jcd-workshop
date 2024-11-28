import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(request: Request) {
  const { messages, prompt } = await request.json();
  const stream = await streamText({
    model: openai("gpt-4o"),
    messages,
    prompt,
  });
  return stream.toDataStreamResponse();
}
