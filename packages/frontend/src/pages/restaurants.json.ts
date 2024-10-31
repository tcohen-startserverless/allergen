import type { AppType } from "@functions/api";
import type { APIRoute } from "astro";
import { hc } from "hono/client";
import { Resource } from "sst";

const api = Resource.Api.url;
const client = hc<AppType>(api);

export const POST: APIRoute = async ({ request, redirect }) => {
  const data = await request.formData();
  const url = data.get("url");
  if (!url) return new Response("Missing url", { status: 400 });
  const res = await client.restaurant.create.$post({
    form: {
      url,
    },
  });
  console.log({res})
  const restaurant = await res.json();
  return redirect(`/restaurant/${restaurant.restaurantId}/${restaurant.name}`);
};
