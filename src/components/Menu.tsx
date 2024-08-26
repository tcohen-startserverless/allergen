import { createSignal, Show } from "solid-js";
import type { AppType } from "@functions/api";
import { hc } from "hono/client";
import { Resource } from "sst";

type MenuProps = {
  restaurantId: string;
  initialMenuData: string | null;
};

export default function Menu(props: MenuProps) {
  const [menuData, setMenuData] = createSignal<string | null>(
    props.initialMenuData,
  );
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
    // const res = await client.menu.structure.$post({
    //   json: { restaurantId: props.restaurantId },
    // });
    // if (res.ok) {
    //   const structuredMenu = await res.json();
    //   setMenuData(JSON.stringify(structuredMenu));
    // }
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
