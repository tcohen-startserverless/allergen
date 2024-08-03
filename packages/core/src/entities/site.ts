import { Resource } from "sst";
import { Entity } from "electrodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

const table = Resource.Table.name;
export const Site = new Entity(
  {
    model: {
      entity: "site",
      version: "1",
      service: "allergen",
    },
    attributes: {
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
