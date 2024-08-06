import { Resource } from "sst";
import { hc } from "hono/client";
import type { APIRoute } from "astro";
import type { AppType } from "@functions/api";

const api = Resource.Api.url;
const client = hc<AppType>(api);

// export async function GET({ params }) {
//   const id = params.id;
//   const product = await getProduct(id);
//   if (!product) {
//     return new Response(null, {
//       status: 404,
//       statusText: "Not found",
//     });
//   }
//   return new Response(JSON.stringify(product), {
//     status: 200,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// }

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const url = data.get("url");
  if (!url) return new Response("Missing url", { status: 400 });
  const site = await client.site.create.$post({
    form: {
      url,
    },
  });
  // return new redirect();
  return new Response(JSON.stringify(site));
};
