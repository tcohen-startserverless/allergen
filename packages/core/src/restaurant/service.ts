import { Resource } from "sst";
import { bus } from "sst/aws/bus";
import { RestaurantSchema } from "./schema";
import { Restaurant } from "./entity";
import { CoreService } from "..";

export namespace RestaurantService {
  export const create = async (params: RestaurantSchema.Type["Input"]) => {
    const url = new URL(params.url);
    const domain = url.hostname;
    const name = domain.split(".")[1];
    if (!name) throw new Error("Invalid domain");
    const data = {
      domain: domain,
      page: url.pathname,
      name: name,
    };
    const response = await Restaurant.create(data).go();
    const site = response.data;
    console.log("saved to database");
    await bus.publish(Resource.Bus, RestaurantSchema.Events.Created, site);
    return site;
  };

  export const lookup = async (data: RestaurantSchema.Type["Lookup"]) => {
    const response = await CoreService.collections
      .restaurant({
        restaurantId: data.restaurantId,
      })
      .go();
    console.log({ data: response.data });
    return response.data;
  };
}
