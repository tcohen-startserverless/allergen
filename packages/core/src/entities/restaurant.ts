import { Resource } from "sst";
import { nanoid } from "nanoid";
import { Entity } from "electrodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

const table = Resource.Table.name;
export const RestaurantEntity = new Entity(
  {
    model: {
      entity: "restaurant",
      version: "1",
      service: "allergen",
    },
    attributes: {
      id: {
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
      text: {
        type: "string",
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
          composite: ["id"],
        },
      },
      lookup: {
        pk: {
          field: "gsi1pk",
          composite: ["id"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["name"],
        },
      },
    },
  },
  { table, client },
);
