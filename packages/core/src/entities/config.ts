import { Resource } from "sst";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});
const table = Resource.Table.name;

export const config = {
  client,
  table,
};
