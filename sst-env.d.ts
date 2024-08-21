/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    "Anthropic": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "Api": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "Bus": {
      "arn": string
      "name": string
      "type": "sst.aws.Bus"
    }
    "Firecrawl": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "Site": {
      "type": "sst.aws.Astro"
      "url": string
    }
    "Table": {
      "name": string
      "type": "sst.aws.Dynamo"
    }
  }
}
export {}
