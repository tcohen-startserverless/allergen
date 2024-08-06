import { Resource } from "sst";
import { Entity } from "electrodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

const table = Resource.Table.name;
export const MenuEntity = new Entity(
  {
    model: {
      entity: "menu",
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
      data: {
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
