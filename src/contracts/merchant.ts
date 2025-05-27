import { oc } from "@orpc/contract";
import z from "zod/v4";

const createMerchant = oc
  .input(
    z.object({
      name: z.string(),
      description: z.string(),
      slug: z.string(),
      logoUrl: z.string().optional(),
      bannerUrl: z.string().optional(),
      businessEmail: z.email(),
      phoneNumber: z.string(),
      country: z.string().default("SA"),
      status: z.enum(["ACTIVE", "INACTIVE"]).default("INACTIVE"),
    })
  )
  .output(z.object({ id: z.string() }));

export const merchantContract = oc.prefix("/merchant").router({
  createMerchant,
});
