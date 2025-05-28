import { merchant, merchantOwner } from "@/types/merchant";
import { oc } from "@orpc/contract";
import z from "zod/v4";

const createMerchant = oc
  .route({ path: "/", method: "POST" })
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
    })
  )
  .output(z.object({ id: z.string() }));

export const getMerchant = oc
  .route({ path: "/{merchantId}", method: "GET" })
  .input(z.object({ merchantId: z.uuid() }))
  .output(merchant);

export const getMerchantOwner = oc
  .route({ path: "/{merchantId}/owner", method: "GET" })
  .input(z.object({ merchantId: z.uuid() }))
  .output(merchantOwner);

export const getAllMerchants = oc
  .route({ path: "/", method: "GET" })
  .output(z.array(merchant));

export const getAllMerchantOwners = oc
  .route({ path: "/owners", method: "GET" })
  .output(z.array(merchantOwner));

export const updateMerchant = oc
  .route({ path: "/{merchantId}", method: "PATCH" })
  .input(z.object({ merchantId: z.uuid(), data: merchant.omit({ id: true }) }));

export const updateOwner = oc
  .route({ path: "/{merchantId}/owner", method: "PATCH" })
  .input(
    z.object({ merchantId: z.uuid(), data: merchantOwner.omit({ id: true }) })
  );

export const deleteMerchant = oc
  .route({ path: "/{merchantId}", method: "DELETE" })
  .input(z.object({ merchantId: z.uuid() }));

export const merchantContract = oc.prefix("/merchants").router({
  createMerchant,
  getMerchant,
  getMerchantOwner,
  getAllMerchants,
  getAllMerchantOwners,
  updateMerchant,
  updateOwner,
  deleteMerchant,
});
