import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { createPage } from "../../../core/src/page";
import { vValidator } from "@hono/valibot-validator";
import { PageInputSchema } from "../../../core/src/schemas";
import type { LambdaContext, LambdaEvent } from "hono/aws-lambda";

type Bindings = {
  event: LambdaEvent;
  context: LambdaContext;
};

const app = new Hono<{ Bindings: Bindings }>().post(
  "/scrape",
  vValidator("form", PageInputSchema),
  async (c) => {
    const data = c.req.valid("form");
    const page = await createPage(data);
    return c.text(`Hello, world! `);
  },
);

export type AppType = typeof app;

export const handler = handle(app);
