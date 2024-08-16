import { Resource } from "sst";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: Resource.Anthropic.value,
});

async function main() {
  const message = await client.messages.create({
    max_tokens: 1024,
    messages: [{ role: "user", content: "Hello, Claude" }],
    model: "claude-3-opus-20240229",
  });

  console.log(message.content);
}

main();
