import { Service } from "electrodb";
import { config } from "./config";
import { MenuEntity } from "./entities";
import { Restaurant } from "./restaurant";

export const CoreService = new Service(
  {
    Restaurant,
    menu: MenuEntity,
  },
  config
);
