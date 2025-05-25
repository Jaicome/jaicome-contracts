import z from "zod/v4";
import { money } from "./money";
import { translated } from "./translated";

export const CatalogVariation = z.object({
  id: z.uuid(),
  priceMoney: money,
  sku: z.number().optional(), // Adjust as needed if nullable
  upc: z.number().optional(), // Adjust as needed if nullable
  pricingType: z.enum(["FIXED", "VARIABLE"]),
  imageIds: z.array(z.string()),
  ordinal: z.int().optional(),
});

export const CatalogModifier = z.object({
  id: z.uuid().optional(),
  name: translated,
  description: translated,
  values: z.array(
    z.object({
      name: translated,
      description: translated,
      ordinal: z.int().optional(),
    })
  ),
});

export const CatalogOptions = z.object({
  id: z.uuid().optional(),
  options: z.array(
    z.object({
      name: translated,
    })
  ),
});

export const CatalogItem = z.object({
  id: z.uuid(),
  name: translated, // Language, text
  description: translated.optional(),
  type: z.enum(["FOOD_AND_BEV"]),
  categoryId: z.string(),
  imageIds: z.array(z.string()),
  variantIds: z.array(z.uuid()).optional(),
  modifierIds: z.array(z.uuid()).optional(),
  optionIds: z.array(z.uuid()).optional(),
});
