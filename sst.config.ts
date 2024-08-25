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
          profile: "start-serverless-dev",
        },
      },
    };
  },
  async run() {
    const firecrawl = new sst.Secret("Firecrawl");
    const anthropic = new sst.Secret("Anthropic");
    const bus = new sst.aws.Bus("Bus");
    const table = new sst.aws.Dynamo("Table", {
      fields: {
        pk: "string",
        sk: "string",
        gsi1pk: "string",
        gsi1sk: "string",
      },
      globalIndexes: {
        gsi1: {
          hashKey: "gsi1pk",
          rangeKey: "gsi1sk",
        },
      },
      primaryIndex: { hashKey: "pk", rangeKey: "sk" },
    });

    const api = new sst.aws.Function("Api", {
      handler: "packages/functions/src/api.handler",
      link: [table, bus, anthropic],
      url: true,
    });

    const site = new sst.aws.Astro("Site", {
      link: [api],
    });

    bus.subscribe({
      handler: "packages/functions/src/bus.handler",
      link: [table, firecrawl, anthropic],
    });
    return {
      api: api.url,
      site: site.url,
    };
  },
});
