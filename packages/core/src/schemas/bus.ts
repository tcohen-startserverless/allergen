import * as v from "valibot";
import { event } from "sst/event";
import { ValibotValidator } from "sst/event/validator";

const defineEvent = event.builder({ validator: ValibotValidator });

export const NewSiteEvent = defineEvent(
  "Allergen.Site.Created",
  v.object({
    domain: v.string("Missing domain"),
    page: v.string("Missing page"),
  }),
);
