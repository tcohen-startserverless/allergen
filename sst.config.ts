/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "allergen",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      profile: input?.stage === "prod" ? "prod" : "dev",
      providers: {
        aws: {
          region: "us-west-2",
          profile: "dev",
        },
      },
    };
  },
  async run() {
    const firecrawl = new sst.Secret("Firecrawl");
    const bus = new sst.aws.Bus("Bus");
    const table = new sst.aws.Dynamo("Table", {
      fields: {
        pk: "string",
        sk: "string",
      },
      primaryIndex: { hashKey: "pk", rangeKey: "sk" },
      stream: "new-image",
    });
    table.subscribe("packages/functions/src/bus/index.handler");

    const api = new sst.aws.Function("Api", {
      handler: "packages/functions/src/api/index.handler",
      link: [table],
      url: true,
    });

    const site = new sst.aws.Astro("Site", {
      link: [api],
    });

    bus.subscribe(
      {
        handler: "packages/functions/src/bus/index.handler",
        link: [table, firecrawl],
      },
      {
        pattern: {
          source: ["table"],
          detailType: ["page"],
        },
      },
    );
    return {
      api: api.url,
      site: site.url,
    };
  },
});
