import { oc } from "@orpc/contract";
import z from "zod/v4";

const createMerchant = oc
  .input(
    z.object({
      // owner
      ownerName: z.string(),
      ownerAddress: z.string(),
      ownerEmail: z.email(),
      ownerPhone: z.string(),
      ownerIdNumber: z.int().transform((value) => value.toString()),
      // merchant
      merchantName: z.string(),
      merchantDescription: z.string(),
      merchantSlug: z.string(),
      merchantLogoUrl: z.string().optional(),
      merchantBannerUrl: z.string().optional(),
      merchantBusinessEmail: z.email(),
      merchantPhoneNumber: z.string(),
      merchantCountry: z.string().default("SA"),
      merchantStatus: z.enum(["ACTIVE", "INACTIVE"]).default("INACTIVE"),
    })
  )
  .output(z.object({ id: z.string() }));

export const merchantContract = oc.prefix("/merchant").router({
  createMerchant,
});
