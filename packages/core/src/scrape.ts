import { Resource } from "sst";
import FirecrawlApp from "@mendable/firecrawl-js";

export const scrapeUrl = async (params: { url: string }) => {
  const url = new URL(params.url);
  const app = new FirecrawlApp({ apiKey: Resource.Firecrawl.value });
  const scrapedData = await app.scrapeUrl(url.href);
  return scrapedData.data;
};
