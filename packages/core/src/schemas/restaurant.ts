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

const Created = defineEvent(
  "site.created",
  v.object({
    domain: v.string("Missing domain"),
    page: v.string("Missing page"),
  }),
);

export const Restaurant = {
  Input: Input,
  Event: {
    Created,
  },
  Query,
};

export type RestaurantType = {
  Input: v.InferInput<typeof Input>;
};
