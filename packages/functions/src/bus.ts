import { structreMenu } from "@core/anthropic";
import { addMenuData } from "@core/menu";
import { Restaurant } from "@core/schemas";
import { bus } from "sst/aws/bus";

export const handler = bus.subscriber(
  [Restaurant.Event.CreatedEvent],
  async (event) => {
    console.log(event.type, event.properties, event.metadata);
    switch (event.type) {
      case "site.created": {
        const menu = await addMenuData(event.properties);
        const structuredMenu = await structreMenu(menu);
        break;
      }
    }
  },
);
