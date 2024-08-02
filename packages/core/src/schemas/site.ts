import * as v from "valibot";

export const PageInputSchema = v.object({
  url: v.string("Missing url"),
});

export type PageInput = v.InferInput<typeof PageInputSchema>;
