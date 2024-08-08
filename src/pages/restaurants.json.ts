import { Resource } from "sst";
import { hc } from "hono/client";
import type { APIRoute } from "astro";
import type { AppType } from "@functions/api";

const api = Resource.Api.url;
const client = hc<AppType>(api);

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const url = data.get("url");
  if (!url) return new Response("Missing url", { status: 400 });
  const res = await client.site.create.$post({
    form: {
      url,
    },
  });
  const site = await res.json();
  console.log({ site });
  // return new redirect();
  return new Response(JSON.stringify(site));
};
