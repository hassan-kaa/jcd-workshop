import { DeepPartial } from "ai";
import { z } from "zod";

export const scoreSchema = z.object({
  homeTeam: z.string(),
  awayTeam: z.string(),
  awayLogo: z.string(),
  homeLogo: z.string(),
  homeScore: z.number(),
  awayScore: z.number(),
});
export type Score = DeepPartial<typeof scoreSchema>;
