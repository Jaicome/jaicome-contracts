import { oc } from "@orpc/contract";
import { z } from "zod/v4";
import { translated } from "@/types/translated";
import {
  CatalogItem,
  CatalogModifier,
  CatalogOptions,
  CatalogVariation,
} from "@/types/catalog";

const createItem = oc
  .route({ path: "/items", method: "POST" })
  .input(
    CatalogItem.extend({
      id: z.uuid().optional(),
    })
  )
  .output(
    z.object({
      id: z.uuid(),
    })
  );

const updateItem = oc.route({ path: "/items/{id}", method: "PATCH" }).input(
  z.object({
    id: z.uuid(),
    data: CatalogItem.omit({ id: true }),
  })
);

const getAllItems = oc
  .route({ path: "/items", method: "POST" })
  .input(
    z.object({
      merchantId: z.uuid(),
    })
  )
  .output(
    z.object({
      id: z.uuid(),
      name: translated, // Language, text
      description: translated.optional(),
      type: z.enum(["FOOD_AND_BEV"]),
      categoryId: z.string(),
      photos: z.array(z.url()),
    })
  );

const getItemById = oc
  .route({ path: "/items/{id}", method: "POST" })
  .input(z.uuid())
  .output(
    z.object({
      id: z.uuid(),
      name: translated, // Language, text
      description: translated.optional(),
      // type: z.enum(["FOOD_AND_BEV"]),
      categoryId: z.string(),
      photos: z.array(z.url()),
      variations: z.array(CatalogVariation),
      modifiers: z.array(CatalogModifier),
      options: z.array(CatalogOptions),
    })
  );

const deleteItem = oc.input(z.object({ id: z.uuid() })).output(z.boolean());

const createVariation = oc.route({ path: "/variations", method: "POST" }).input(
  CatalogVariation.extend({
    id: z.uuid().optional(),
  })
);

const updateVariation = oc
  .route({ path: "/variations/{id}", method: "PATCH" })
  .input(
    z.object({
      id: z.uuid(),
      data: CatalogVariation.omit({ id: true }),
    })
  );

const deleteVariation = oc
  .input(z.object({ id: z.uuid() }))
  .output(z.boolean());

const getAllVariations = oc
  .route({ path: "/variations", method: "POST" })
  .input(z.object({ merchantId: z.uuid() }))
  .output(z.array(CatalogVariation));

const getVariationById = oc
  .route({ path: "/variations/{id}", method: "POST" })
  .input(z.uuid())
  .output(CatalogVariation);

const deleteVariationById = oc
  .route({ path: "/variations/{id}", method: "DELETE" })
  .input(z.uuid());

const createModifier = oc.route({ path: "/modifiers", method: "POST" }).input(
  CatalogModifier.extend({
    id: z.uuid().optional(),
  })
);

const updateModifier = oc
  .route({ path: "/modifiers/{id}", method: "PATCH" })
  .input(
    z.object({
      id: z.uuid(),
      data: CatalogModifier.omit({ id: true }),
    })
  );

const deleteModifier = oc
  .route({ path: "/modifiers/{id}", method: "DELETE" })
  .input(z.uuid());

const getAllModifiers = oc
  .route({ path: "/modifiers", method: "POST" })
  .input(z.object({ merchantId: z.uuid() }))
  .output(z.array(CatalogModifier));

const getModifierById = oc
  .route({ path: "/modifiers/{id}", method: "POST" })
  .input(z.object({ merchantId: z.uuid(), id: z.uuid() }))
  .output(CatalogModifier);

const deleteModifierById = oc
  .route({ path: "/modifiers/{id}", method: "DELETE" })
  .input(z.uuid());

const createOption = oc.route({ path: "/options", method: "POST" }).input(
  CatalogOptions.extend({
    id: z.uuid().optional(),
  })
);

const updateOption = oc.route({ path: "/options/{id}", method: "PATCH" }).input(
  z.object({
    id: z.uuid(),
    data: CatalogOptions.omit({ id: true }),
  })
);

const deleteOption = oc
  .route({ path: "/options/{id}", method: "DELETE" })
  .input(z.uuid());

const getAllOptions = oc
  .route({ path: "/options", method: "POST" })
  .input(z.object({ merchantId: z.uuid() }))
  .output(z.array(CatalogOptions));

const getOptionById = oc
  .route({ path: "/options/{id}", method: "POST" })
  .input(z.uuid())
  .output(CatalogOptions);

const deleteOptionById = oc
  .route({ path: "/options/{id}", method: "DELETE" })
  .input(z.uuid());

export const catalogVariantContract = oc.prefix("/variants").router({
  createVariation,
  updateVariation,
  deleteVariation,
  getAllVariations,
  getVariationById,
  deleteVariationById,
});

export const catalogModifierContract = oc.prefix("/modifiers").router({
  createModifier,
  updateModifier,
  deleteModifier,
  getAllModifiers,
  getModifierById,
  deleteModifierById,
});

export const catalogOptionContract = oc.prefix("/options").router({
  createOption,
  updateOption,
  deleteOption,
  getAllOptions,
  getOptionById,
  deleteOptionById,
});

export const catalogItemContract = oc.prefix("/catalog").router({
  createItem,
  updateItem,
  deleteItem,
  getAllItems,
  getItemById,
});

export const catalogContract = oc
  .prefix("/merchant/{merchantId}/catalog")
  .router({
    catalogItemContract,
    catalogVariantContract,
    catalogModifierContract,
    catalogOptionContract,
  });
