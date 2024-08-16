import { Resource } from "sst";
import { bus } from "sst/aws/bus";
import { Restaurant } from "./schemas";
import { RestaurantEntity } from "./entities/restaurant";
import type { RestaurantType } from "./schemas";

export const createRestaurant = async (params: RestaurantType["Input"]) => {
  const url = new URL(params.url);
  const domain = url.hostname;
  const name = domain.split(".")[1];
  if (!name) throw new Error("Invalid domain");
  const data = {
    domain: domain,
    page: url.pathname,
    name: name,
  };
  const response = await RestaurantEntity.create(data).go();
  const site = response.data;
  console.log("saved to database");
  await bus.publish(Resource.Bus, Restaurant.Event.CreatedEvent, site);
  return site;
};
