import { openai } from "@ai-sdk/openai";
import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { ReactNode } from "react";
import { ServerMessage } from "./generate-ui-stream/action";
import { z } from "zod";
import { generateObject } from "ai";
import Scorecard from "./MatchScoreComponent";
import { scoreSchema } from "./ScoreSchema";
import { nanoid } from "nanoid";
import { Skeleton } from "@/components/ui/skeleton";
import JokeCard from "./JokeComponent";
import { jokeSchema } from "./JokeSchema";

export interface ChatMessage {
  id: string;
  role: string;
  display: ReactNode;
}
export async function continueConversation(
  input: string
): Promise<ChatMessage> {
  "use server";
  const history = getMutableAIState();
  const result = await streamUI({
    model: openai("gpt-4o"),
    prompt: input,
    text: ({ content, done }) => {
      if (done)
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: "ai", content },
        ]);
      return <div>{content}</div>;
    },
    tools: {
      tellMatchScore: {
        description: "Tell me the score of the match",
        parameters: z.object({
          team1: z.string().describe("The name of the first team"),
          team2: z.string().describe("The name of the second team"),
        }),
        generate: async function* ({ team1, team2 }) {
          yield <Skeleton className="h-30 w-full bg-slate-200"></Skeleton>;
          const response = await generateObject({
            model: openai("gpt-4o"),
            schema: scoreSchema,
            prompt: `if possible check from an external source a result of the match between ${team1} and ${team2}, or give a random logical score , with links to the source logo images of both teams if possible. `,
          });
          return <Scorecard {...response.object} />;
        },
      },
      tellJokePunchline: {
        description:
          "Tell me a joke about a specific setup, and give me the punchline",
        parameters: z.object({
          context: z.string().describe("The setup context of the joke"),
        }),
        generate: async function* ({ context }) {
          yield <Skeleton className="h-30 w-full bg-slate-200"></Skeleton>;
          const response = await generateObject({
            model: openai("gpt-4o"),
            schema: jokeSchema,
            prompt: `Tell me a joke about ${context}, and give me the punchline`,
          });
          return <JokeCard {...response.object} />;
        },
      },
    },
  });
  return {
    id: nanoid(),
    role: "assistant",
    display: result.value,
  };
}

export const AI = createAI<ServerMessage[], ChatMessage[]>({
  actions: {
    continueConversation,
  },
  initialAIState: [],
  initialUIState: [],
});
