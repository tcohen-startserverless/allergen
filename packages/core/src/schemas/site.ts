import * as v from "valibot";

export const SiteInputSchema = v.object({
  url: v.string("Missing url"),
});

export type SiteInput = v.InferInput<typeof SiteInputSchema>;
