import { Resource } from "sst";
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
    },
  },
  { table, client },
);
