import Anthropic from "@anthropic-ai/sdk";
import { Resource } from "sst";
import { MenuEntity } from "./entities";
import type { MenuType } from "./schemas";

const client = new Anthropic({
  apiKey: Resource.Anthropic.value,
});

const allergens = [
  "Milk",
  "Fish",
  "Wheat",
];

export const structureMenu = async (menu: MenuType['Created']) => {
  const response = await client.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 1024,
    tools: [{
      name: "structure_menu",
      description: "Parse and structure menu data into an array of menu items",
      input_schema: {
        type: "object",
        properties: {
          menu_data: {
            type: "string",
            description: "Stringified JSON of scraped menu data"
          },
          allergens: {
            type: "array",
            items: { type: "string" },
            description: "List of allergens to consider"
          }
        },
        required: ["menu_data", "allergens"]
      }
    }],
    tool_choice: { type: "tool", name: "structure_menu" },
    messages: [{
      role: "user",
      content: `Parse and structure the following menu data. Each menu item should include name, price, description, ingredients, and accommodates fields. The "accommodates" field should list dietary restrictions the item accommodates.`,
    }]
  });

  if (response.content[0].type !== 'tool_use') {
    throw new Error("Unexpected response from Claude");
  }

  const toolUse = response.content[0];

  // Simulate tool execution
  const structuredMenu = JSON.parse(toolUse.input.menu_data);

  // Update the database with the structured menu
  const updatedMenu = await MenuEntity.patch(menu).set({
    structuredMenu: JSON.stringify(structuredMenu),
  }).go({response: 'all_new'});

  return updatedMenu.data;
};
