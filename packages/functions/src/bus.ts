import { bus } from "sst/aws/bus";
import { Restaurant } from "@core/schemas";
import { scrapeUrl } from "@core/scrape";

export const handler = bus.subscriber(
  [Restaurant.Event.Created],
  async (event) => {
    console.log(event.type, event.properties, event.metadata);
    switch (event.type) {
      case "site.created": {
        const url = `${event.properties.domain}${event.properties.page}`;
        await scrapeUrl({ url });
        break;
      }
    }
  },
);
