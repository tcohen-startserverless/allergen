import { scrapeUrl } from "./scrape";
import { MenuEntity } from "./entities/menu";
import type { MenuType, RestaurantType } from "./schemas";

export const getMenu = async (data: MenuType["Keys"]) => {};

export const addMenuData = async (data: RestaurantType["Created"]) => {
  const url = `https://${data.domain}${data.page}`;
  const response = await MenuEntity.get(data).go();
  if (response.data) {
    console.log("returning");
    return response.data;
  }
  const scrapedData = await scrapeUrl({ url });
  console.log("saving menu");
  const menuResponse = await MenuEntity.create({
    ...data,
    data: JSON.stringify(scrapedData),
  }).go();
  const menu = menuResponse.data;
  return menu;
};
