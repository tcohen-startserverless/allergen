import { Page } from "./entities/page";
import type { PageInput } from "./schemas";

// export const getPage = async (params: Omit<PageInputType, "text">) => {
//   console.log({ params });
// };

export const createPage = async (params: PageInput) => {
  const url = new URL(params.url);
  const data = {
    domain: url.hostname,
    page: url.pathname,
  };
  const response = await Page.upsert(data).go();
  console.log("saved to database");
  return response.data;
};
