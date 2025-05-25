import z from "zod";
import ISO6391 from "iso-639-1";

export const translated = z.record(
  z.enum(ISO6391.getAllCodes() as [string, ...string[]]),
  z.string()
);

export type Translated = z.infer<typeof translated>;
