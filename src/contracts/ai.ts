import { oc } from "@orpc/contract";
import { z } from "zod";

export const exerciseSchema = z.object({
  healthScore: z.enum(["low", "medium", "high"]),
  isHealthy: z.boolean(),
  isDiet: z.boolean(),
  exercises: z.object({
    home: z.object({
      activity: z.string(),
      durationMinutes: z.number(),
    }),
    gym: z.object({
      activity: z.string(),
      durationMinutes: z.number(),
    }),
  }),
  mightContain: z
    .array(z.string())
    .describe(
      "The food might contain like gluten, spicy, high salt, protein, etc. If it does, it will be in this field."
    ),
  notes: z
    .string()
    .optional()
    .describe("Any additional information about the food."),
});

export const suggestExerciseContract = oc
  .route({ path: "/suggest-exercise", method: "POST" })
  // The input will be information about the food the user ate
  .input(
    z.object({
      name: z.string(),
      description: z.string(),
      variation: z.string(),
      language: z.enum(["en", "ar"]),
      photoUrl: z.string().url().optional(),
      calories: z.number().int().min(0),
      metadata: z.record(z.string(), z.string()).optional(),
    })
  )
  // The output will be a list of exercises that the user can do to burn the calories
  .output(exerciseSchema);

export const aiContract = oc.prefix("/ai").router({
  suggestExercise: suggestExerciseContract,
});
