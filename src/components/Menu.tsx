import { createSignal, Show } from "solid-js";
import type { AppType } from "@functions/api";
import { hc } from "hono/client";
import { Resource } from "sst";
import type { RestaurantEntity, MenuEntity } from "@core/entities";

type MenuProps = {
  restaurantId: string;
  menu: MenuEntity;
  restaurant: RestaurantEntity;
};

export default function Menu(props: MenuProps) {
  const [menuData, setMenuData] = createSignal<string | undefined>(props.menu);
  const api = Resource.Api.url;
  const client = hc<AppType>(api);

  const scrapeMenu = async () => {
    // const res = await client.menu.scrape.$post({
    //   json: { restaurantId: props.restaurantId },
    // });
    // if (res.ok) {
    //   const newMenuData = await res.json();
    //   setMenuData(newMenuData.data);
    // }
  };

  const structureMenu = async () => {
    const res = await client.menu.translate.$post({
      form: {
        restaurantId: props.restaurant.restaurantId,
        domain: props.restaurant.domain,
        menuId: props.menu.menuId,
        page: props.menu.page,
      },
    });
    if (res.ok) {
      const structuredMenu = await res.json();
      setMenuData(JSON.stringify(structuredMenu));
    }
  };

  return (
    <div>
      <Show
        when={menuData()}
        fallback={
          <div>
            <p>No menu found</p>
            <button onClick={scrapeMenu}>Scrape Menu</button>
          </div>
        }
      >
        <p>We got menu data</p>
        <button onClick={structureMenu}>Structure Menu</button>
      </Show>
    </div>
  );
}
