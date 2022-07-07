import Head from "next/head";
import "../styles/globals.css";
import "../styles/map.css";
import { SWRConfig } from "swr";
import { fetcher } from "../libs/axios";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  const fallback = pageProps.fallback || {};
  return (
    <>
      <Head>
        <title>Admin - Location Mapper</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
          integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
          crossOrigin=""
        />
      </Head>
      <SWRConfig value={{ fetcher, fallback }}>
        <NextNProgress
          height={5}
          options={{ easing: "ease", speed: 500, showSpinner: false }}
        />
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}

export default MyApp;
