import { z } from "zod/v4";

export const money = z.object({
  amount: z.number(),
  currency: z.string().length(3),
});
export type Money = z.infer<typeof money>;
