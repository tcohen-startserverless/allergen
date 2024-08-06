// import { Resource } from "sst";
// import { bus } from "sst/aws/bus";
// import { Restaurant } from "./schemas";
// import { RestaurantEntity } from "./entities/restaurant";
import { scrapeUrl } from "./scrape";
import { MenuEntity } from "./entities/menu";
import type { RestaurantType } from "./schemas";

export const addMenuData = async (data: RestaurantType["Created"]) => {
  const url = `https://${data.domain}${data.page}`;
  const response = await MenuEntity.get(data).go();
  // console.log({ response.data });
  if (response.data) {
    console.log("returning");
    return response.data;
  }
  const scrapedData = await scrapeUrl({ url });
  console.log("saving to menu");
  const record = await MenuEntity.upsert({
    ...data,
    data: JSON.stringify(scrapedData),
  }).go();
  return record;
};
