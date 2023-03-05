import type { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { StoreProvider } from "@/src/store";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const children = getLayout(<Component {...pageProps} />);

  return (
    <>
      <Head>
        <title>まだぼん</title>
        <meta name="description" content="マダミスGM支援ツールまだぼん" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StoreProvider>{children}</StoreProvider>
    </>
  );
}
