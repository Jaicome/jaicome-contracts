import { payment, purposeEnum } from "@/types/anb";
import { getPurposeCode } from "@/utils/anb";
import { oc } from "@orpc/contract";
import { z } from "zod";
const webhook = oc
  .route({ path: "/webhook", method: "POST" })
  .input(z.unknown())
  .output(z.void());

const createPayout = oc
  .route({ path: "/create", method: "POST" })
  .input(
    z.object({
      bankAccountId: z.string(),
      amount: z.number(),
      currency: z.string().default("SAR"),
      purpose: purposeEnum.transform((value) => getPurposeCode(value)),
      narrative: z.string().optional(),
      transactionComment: z.string().optional(),
    })
  )
  .output(payment);

export const payoutContract = oc.prefix("/payout").router({
  webhook,
  createPayout,
});
