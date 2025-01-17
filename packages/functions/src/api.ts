import { RestaurantSchema, RestaurantService } from "@core/restaurant";
import { vValidator } from "@hono/valibot-validator";
import { Hono } from "hono";
import type { LambdaContext, LambdaEvent } from "hono/aws-lambda";
import { handle } from "hono/aws-lambda";
import { logger } from "hono/logger";

type Bindings = {
  event: LambdaEvent;
  context: LambdaContext;
};

const app = new Hono<{ Bindings: Bindings }>()
  .use(logger())
  .get("/search", vValidator("query", RestaurantSchema.Query), async (c) => {
    const data = c.req.valid("query");
    console.log({ data });
    return c.text("Hello, world!");
  })
  .get(
    "/restaurant",
    vValidator("query", RestaurantSchema.Lookup),
    async (c) => {
      const data = c.req.valid("query");
      const restaurant = await RestaurantService.lookup(data);
      return c.json(restaurant);
    }
  )
  .post(
    "/restaurant/create",
    vValidator("form", RestaurantSchema.Input),
    async (c) => {
      const data = c.req.valid("form");
      const site = await RestaurantService.create(data);
      return c.json(site);
    }
  )
  .post("/menu/scrape", vValidator("form", Schema.Menu.Keys), async (c) => {
    const data = c.req.valid("form");
    const menu = await Core.getMenu(data);
    if (!menu) return;
    const updatedMenu = await Core.addMenuData(menu);
    return c.json(updatedMenu);
  })
  .post("/menu/translate", vValidator("form", Schema.Menu.Keys), async (c) => {
    const data = c.req.valid("form");
    const menu = await Core.getMenu(data);
    if (!menu) return;
    const updatedMenu = await Core.structureMenu(menu);
    return c.json(updatedMenu);
  });

export type AppType = typeof app;

export const handler = handle(app);
