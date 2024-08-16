import { scrapeUrl } from "./scrape";
import { MenuEntity } from "./entities/menu";
import type { RestaurantType, MenuType } from "./schemas";

export const addMenuData = async (data: RestaurantType["Created"]) => {
  const url = `https://${data.domain}${data.page}`;
  const response = await MenuEntity.get(data).go();
  if (response.data) {
    console.log("returning");
    return response.data;
  }
  const scrapedData = await scrapeUrl({ url });
  console.log("saving menu");
  const record = await MenuEntity.upsert({
    ...data,
    data: JSON.stringify(scrapedData),
  }).go();
  return record;
};

export const structureMenu = async (data: MenuType["Created"]) => {};
