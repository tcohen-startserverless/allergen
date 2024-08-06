import { bus } from "sst/aws/bus";
import { addMenuData } from "@core/menu";
import { Restaurant } from "@core/schemas";
// import { scrapeUrl } from "@core/scrape";

export const handler = bus.subscriber(
  [Restaurant.Event.CreatedEvent],
  async (event) => {
    console.log(event.type, event.properties, event.metadata);
    switch (event.type) {
      case "site.created": {
        await addMenuData(event.properties);
        break;
      }
    }
  },
);
