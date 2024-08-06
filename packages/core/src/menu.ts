import { Resource } from "sst";
// import { bus } from "sst/aws/bus";
// import { Restaurant } from "./schemas";
// import { RestaurantEntity } from "./entities/restaurant";
import { scrapeUrl } from "./scrape";
import { MenuEntity } from "./entities/menu";
import type { RestaurantType } from "./schemas";

export const addMenuData = async (data: RestaurantType["Created"]) => {
  const url = `https://${data.domain}${data.page}`;
  const menuData = MenuEntity.get(data).go();
  if (menuData) {
    return menuData;
  }
  const scrapedData = await scrapeUrl({ url });
  const record = await MenuEntity.upsert(data).go();
  return record;
};
