import Anthropic from "@anthropic-ai/sdk";
import { Resource } from "sst";
import { MenuEntity } from "./entities";
import type { MenuType } from "./schemas";

const client = new Anthropic({
  apiKey: Resource.Anthropic.value,
});

const tools: Anthropic.Tool[] = [{
  name: "structure_menu",
  description: "Parse and structure menu data into an array of menu items",
  input_schema: {
    type: "object",
    properties: {
      menu_data: {
        type: "string",
        description: "Raw string of web scraped menu data"
      }
    },
    required: ["menu_data"]
  }
}];

export const structureMenu = async (menu: MenuType['Created']) => {
  const response = await client.messages.create({
    model: "claude-3-sonnet-20240229",
    max_tokens: 1024,
    tools: tools,
    tool_choice: { type: "tool", name: "structure_menu" },
    messages: [{
      role: "user",
      content: `Parse and structure the following menu data into an array of menu items. Each menu item should include name, price, description, ingredients, and accommodates fields. The "accommodates" field should list dietary restrictions the item accommodates. Here's the raw menu data:

${menu.data}

Please structure this data and return it as JSON.`
    }]
  });

  if (!response.content[0]) {
    throw new Error("No response from Claude")
  }
  if (response.content[0].type !== 'tool_use') {
    throw new Error("Unexpected response from Claude");
  }
  const toolUse = response.content[0];
  console.log({toolUse})
  if (!('input' in toolUse)) {
    throw new Error("Tool use response doesn't contain input");
  }
  const structuredMenu = JSON.parse(toolUse.input.menu_data);
  const updatedMenu = await MenuEntity.patch(menu).set({
    structuredMenu: JSON.stringify(structuredMenu),
  }).go({response: 'all_new'});

  return updatedMenu.data;
};
