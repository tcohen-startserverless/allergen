import { nanoid } from "nanoid";
import { config } from "./config";
import { Entity } from "electrodb";
import type { EntityItem } from "electrodb";

export const MenuEntity = new Entity(
  {
    model: {
      entity: "menu",
      version: "1",
      service: "allergen",
    },
    attributes: {
      restaurantId: {
        type: "string",
        required: true,
      },
      menuId: {
        type: "string",
        required: true,
        default: () => nanoid(),
      },
      domain: {
        type: "string",
        required: true,
      },
      page: {
        type: "string",
        required: true,
      },
      data: {
        type: "string",
        required: true,
      },
      structuredMenu: {
        type: "map",
        properties: {},
      },
      allergenMenu: {
        type: "map",
        properties: {},
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
      page: {
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
          composite: ["menuId"],
        },
      },
    },
  },
  config,
);

export type MenuEntity = EntityItem<typeof MenuEntity>;
