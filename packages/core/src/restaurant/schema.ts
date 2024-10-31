import * as v from "valibot";
import { event } from "sst/event";
import { ValibotValidator } from "sst/event/validator";

export namespace RestaurantSchema {
  export const Query = v.object({
    domain: v.string("Missing domain"),
  });

  export const Lookup = v.object({
    restaurantId: v.string("Missing id"),
  });

  export const Input = v.object({
    url: v.string("Missing url"),
  });

  export const Created = v.object({
    domain: v.string("Missing domain"),
    page: v.string("Missing page"),
    restaurantId: v.string("Missing restaurantId"),
    createdAt: v.number("Missing createdAt"),
    updatedAt: v.number("Missing updatedAt"),
  });

  export const Events = {
    Created: event.builder({ validator: ValibotValidator })(
      "site.created",
      Created
    ),
  };

  export type Type = {
    Input: v.InferInput<typeof Input>;
    Created: v.InferInput<typeof Created>;
    Lookup: v.InferInput<typeof Lookup>;
  };
}
