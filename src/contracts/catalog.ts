import { oc } from "@orpc/contract";
import { z } from "zod/v4";

export const Money = () =>
  z.object({
    amount: z.number(),
    currency: z.string().length(3),
  });

export const CatalogVariation = () =>
  z.object({
    id: z.uuid(),
    priceMoney: Money,
    sku: z.number().optional(), // Adjust as needed if nullable
    upc: z.number().optional(), // Adjust as needed if nullable
    pricingType: z.enum(["FIXED", "VARIABLE"]),
    imageIds: z.array(z.string()),
    ordinal: z.int().optional(),
  });

export const Transtaled = () => z.record(z.string(), z.string());

export const CatalogModifier = () =>
  z.object({
    id: z.uuid().optional(),
    name: z.record(z.string(), z.string()),
    description: z.record(z.string(), z.string()),
    values: z.array(
      z.object({
        name: Transtaled(),
        description: Transtaled(),
        ordinal: z.int().optional(),
      })
    ),
  });

export const CatalogOptions = () =>
  z.object({
    id: z.uuid().optional(),
    options: z.array(
      z.object({
        name: Transtaled(),
      })
    ),
  });

export const CatalogItem = () =>
  z.object({
    id: z.uuid(),
    name: Transtaled(), // Language, text
    description: z.record(z.string(), z.string()).optional(),
    type: z.enum(["FOOD_AND_BEV"]),
    categoryId: z.string(),
    imageIds: z.array(z.string()),
    variantIds: z.array(z.uuid()).optional(),
    modifierIds: z.array(z.uuid()).optional(),
    optionIds: z.array(z.uuid()).optional(),
  });

const createCatalogItem = oc
  .route({ path: "/", method: "POST" })
  .input(
    CatalogItem().extend({
      id: z.uuid().optional(),
    })
  )
  .output(
    z.object({
      id: z.uuid(),
    })
  );

const updateCatalogItem = oc.route({ path: "/", method: "PATCH" }).input(
  z.object({
    id: z.uuid(),
    data: CatalogItem().omit({ id: true }),
  })
);

const getAllItems = oc
  .route({ path: "/", method: "POST" })
  .input(z.void())
  .output(
    z.object({
      id: z.uuid(),
      name: Transtaled(), // Language, text
      description: z.record(z.string(), z.string()).optional(),
      type: z.enum(["FOOD_AND_BEV"]),
      categoryId: z.string(),
      photos: z.array(z.url()),
    })
  );

const getById = oc
  .route({ path: "/{id}", method: "POST" })
  .input(z.uuid())
  .output(
    z.object({
      id: z.uuid(),
      name: Transtaled(), // Language, text
      description: z.record(z.string(), z.string()).optional(),
      // type: z.enum(["FOOD_AND_BEV"]),
      categoryId: z.string(),
      photos: z.array(z.url()),
      variations: z.array(CatalogVariation()),
      modifiers: z.array(CatalogModifier()),
      options: z.array(CatalogOptions()),
    })
  );

const deleteCatalogItem = oc.input(z.object({ id: z.uuid() }));

export const catalogItem = oc.prefix("/catalog").router({
  create: createCatalogItem,
  update: updateCatalogItem,
  delete: deleteCatalogItem,
  all: getAllItems,
  getById,
});
