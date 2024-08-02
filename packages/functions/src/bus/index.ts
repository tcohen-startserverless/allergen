import type { DynamoDBStreamEvent } from "aws-lambda";
export const handler = async (event: DynamoDBStreamEvent) => {
  console.log(event);
};
