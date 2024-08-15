import * as v from "valibot";
import { event } from "sst/event";
import { ValibotValidator } from "sst/event/validator";

const defineEvent = event.builder({ validator: ValibotValidator });

const Query = v.object({
  domain: v.string("Missing domain"),
});

const Lookup = v.object({
  restaurantId: v.string("Missing id"),
});

const Input = v.object({
  url: v.string("Missing url"),
});

const Created = v.object({
  domain: v.string("Missing domain"),
  page: v.string("Missing page"),
  restaurantId: v.string("Missing id"),
  createdAt: v.number("Missing createdAt"),
  updatedAt: v.number("Missing updatedAt"),
});

const CreatedEvent = defineEvent("site.created", Created);

export const Restaurant = {
  Input: Input,
  Created,
  Lookup,
  Event: {
    CreatedEvent,
  },
  Query,
};

export type RestaurantType = {
  Input: v.InferInput<typeof Input>;
  Created: v.InferInput<typeof Created>;
  Lookup: v.InferInput<typeof Lookup>;
};
