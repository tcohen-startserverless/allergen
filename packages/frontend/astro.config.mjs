import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import aws from "astro-sst";

export default defineConfig({
  output: "server",
  adapter: aws(),
  integrations: [solid({ devtools: true })],
});
