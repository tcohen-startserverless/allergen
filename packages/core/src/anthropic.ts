import { Resource } from "sst";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: Resource.Anthropic.value,
});

const allergens = [
  "Milk",
  // "Eggs",
  "Fish",
  // "Crustacean shellfish",
  // "Tree nuts",
  // "Peanuts",
  "Wheat",
  // "Soybeans",
  // "Sesame",
];

export const structreMenu = async (menu: string) => {
  const content = `I need you to take this stringified json of sraped menu data, and organize it into a structured format. Organize it into menu items with the schema matching {name: string, price: number, description: string, ingredients: string[], accomodates: string[]}  Accomodates should be a string of dietary restrictions that the item accomodates.  JSON: ${menu} Here are a list of allergens ${allergens}`;
  const message = await client.messages.create({
    max_tokens: 1024,
    messages: [{ role: "user", content }],
    model: "claude-3-5-sonnet-20240620	",
  });
  return message.content;
};
