import { Resource } from "sst";
import { bus } from "sst/aws/bus";
import { Site } from "./entities/site";
import { NewSiteEvent } from "./schemas";
import type { SiteInput } from "./schemas";

export const createSite = async (params: SiteInput) => {
  const url = new URL(params.url);
  const data = {
    domain: url.hostname,
    page: url.pathname,
  };
  // const response = await Site.create(data).go();
  const response = await Site.upsert(data).go({ response: "all_new" });
  const site = response.data;
  console.log("saved to database");
  await bus.publish(Resource.Bus, NewSiteEvent, site);
  return site;
};
