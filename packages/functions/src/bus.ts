import { bus } from "sst/aws/bus";
import { addMenuData } from "@core/menu";
import { Restaurant } from "@core/schemas";

export const handler = bus.subscriber(
  [Restaurant.Event.CreatedEvent],
  async (event) => {
    console.log(event.type, event.properties, event.metadata);
    switch (event.type) {
      case "site.created": {
        const menu = await addMenuData(event.properties);
        break;
      }
    }
  },
);
