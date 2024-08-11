import { Hono } from "hono";
import { logger } from "hono/logger";
import { handle } from "hono/aws-lambda";
import { Restaurant } from "@core/schemas";
import { createRestaurant } from "@core/restaurant";
import { vValidator } from "@hono/valibot-validator";
import type { LambdaContext, LambdaEvent } from "hono/aws-lambda";

type Bindings = {
  event: LambdaEvent;
  context: LambdaContext;
};

const app = new Hono<{ Bindings: Bindings }>()
  .use(logger())
  .get("/search", vValidator("query", Restaurant.Query), async (c) => {
    const data = c.req.valid("query");
    console.log({ data });
    return c.text("Hello, world!");
  })
  .post(
    "/restaurant/create",
    vValidator("form", Restaurant.Input),
    async (c) => {
      const data = c.req.valid("form");
      const site = await createRestaurant(data);
      return c.json(site);
    },
  );

export type AppType = typeof app;

export const handler = handle(app);
