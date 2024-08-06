import * as v from "valibot";
import { event } from "sst/event";
import { ValibotValidator } from "sst/event/validator";

const defineEvent = event.builder({ validator: ValibotValidator });

const Query = v.object({
  domain: v.string("Missing domain"),
});

const Input = v.object({
  url: v.string("Missing url"),
});

const Created = v.object({
  domain: v.string("Missing domain"),
  page: v.string("Missing page"),
});

const CreatedEvent = defineEvent("site.created", Created);

export const Restaurant = {
  Input: Input,
  Created,
  Event: {
    CreatedEvent,
  },
  Query,
};

export type RestaurantType = {
  Input: v.InferInput<typeof Input>;
  Created: v.InferInput<typeof Created>;
};
