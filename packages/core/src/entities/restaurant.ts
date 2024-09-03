import { nanoid } from "nanoid";
import { config } from "./config";
import { Entity } from "electrodb";
import type { EntityItem } from "electrodb";

export const RestaurantEntity = new Entity(
  {
    model: {
      entity: "restaurant",
      version: "1",
      service: "allergen",
    },
    attributes: {
      restaurantId: {
        default: () => nanoid(),
        type: "string",
        required: true,
      },
      name: {
        type: "string",
        required: true,
      },
      domain: {
        type: "string",
        required: true,
      },
      page: {
        type: "string",
        required: true,
      },
      createdAt: {
        type: "number",
        readOnly: true,
        required: true,
        default: () => Date.now(),
        set: () => Date.now(),
      },
      updatedAt: {
        type: "number",
        watch: "*",
        required: true,
        default: () => Date.now(),
        set: () => Date.now(),
      },
    },
    indexes: {
      restaurant: {
        pk: {
          field: "pk",
          composite: ["domain"],
        },
        sk: {
          field: "sk",
          composite: ["page"],
        },
      },
      lookup: {
        index: "gsi1",
        collection: "restaurant",
        pk: {
          field: "gsi1pk",
          composite: ["restaurantId"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["name"],
        },
      },
    },
  },
  config,
);

export type RestaurantEntity = EntityItem<typeof RestaurantEntity>;
