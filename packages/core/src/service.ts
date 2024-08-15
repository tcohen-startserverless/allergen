import { Service } from "electrodb";
import { config } from "./entities/config";
import type { RestaurantType } from "@core/schemas";
import { RestaurantEntity, MenuEntity } from "./entities";

export const RestaurantService = new Service(
  {
    restaurant: RestaurantEntity,
    menu: MenuEntity,
  },
  config,
);

export const lookupRestaurant = async (data: RestaurantType["Lookup"]) => {
  const response = await RestaurantService.collections
    .restaurant({
      restaurantId: data.restaurantId,
    })
    .go();
  console.log({ data: response.data });
  return response.data;
};
