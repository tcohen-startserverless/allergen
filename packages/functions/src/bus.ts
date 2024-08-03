import { bus } from "sst/aws/bus";
import { NewSiteEvent } from "@core/schemas";

export const handler = bus.subscriber([Order.Event.Created, User.Events.Updated], async (event) => {
  console.log(event.type, event.properties, event.metadata);
  switch (event.type) {
    case "order.created": {
      await Shippo.createShipment(event.properties.orderID);
      await Template.sendOrderConfirmation(event.properties.orderID);
      await EmailOctopus.addToCustomersList(event.properties.orderID);
      break;
    }
    case "user.updated": {
      await Stripe.syncUser(event.properties.userID);
      await EmailOctopus.addToMarketingList(event.properties.userID);
      break;
    }
  }
});
