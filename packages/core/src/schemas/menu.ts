import * as v from "valibot";
import { event } from "sst/event";
import { ValibotValidator } from "sst/event/validator";

const defineEvent = event.builder({ validator: ValibotValidator });

const Created = v.object({
  domain: v.string("Missing domain"),
  page: v.string("Missing page"),
  restaurantId: v.string("Missing restaurantId"),
  menuId: v.string("Missing menuId"),
  data: v.string("Missing data"),
  createdAt: v.number("Missing createdAt"),
  updatedAt: v.number("Missing updatedAt"),
});

const CreatedEvent = defineEvent("menu.created", Created);

export const Menu = {
  Created,
  Event: {
    CreatedEvent,
  },
};

export type MenuType = {
  Created: v.InferInput<typeof Created>;
};
