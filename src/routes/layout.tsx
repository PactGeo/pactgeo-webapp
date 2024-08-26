import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { routeLoader$, useContent, useLocation } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

import Header from "../components/starter/header/header";
import Footer from "../components/starter/footer/footer";

import styles from "./styles.css?inline";
import Menu from "~/components/menu/menu";

// export const onRequest: RequestHandler = (event) => {
//   const session = event.sharedMap.get("session")
//   console.log('session!!', session)
//   if (!session || new Date(session.expires) < new Date()) {
//     throw event.redirect(302, `/`)
//   }
// }

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  useStyles$(styles);
  return (
    <div class="flex flex-col min-h-screen">
      <Header />
      <div class="flex">
        <Menu />
        <main class="flex-1 px-10 py-4">
          <Slot />
        </main>
      </div>
      <Footer />
    </div>
  );
});
