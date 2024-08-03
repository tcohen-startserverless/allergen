import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { createSite } from "@core/site";
import { SiteInputSchema } from "@core/schemas";
import { vValidator } from "@hono/valibot-validator";
import type { LambdaContext, LambdaEvent } from "hono/aws-lambda";

type Bindings = {
  event: LambdaEvent;
  context: LambdaContext;
};

const app = new Hono<{ Bindings: Bindings }>().post(
  "/scrape",
  vValidator("form", SiteInputSchema),
  async (c) => {
    const data = c.req.valid("form");
    const site = await createSite(data);
    return c.json(site);
  },
);

export type AppType = typeof app;

export const handler = handle(app);
