import Head from "next/head";
import App from "@/src/components/App";

export default function Home() {
  return (
    <>
      <Head>
        <title>まだぼん</title>
        <meta name="description" content="マダミスGM支援ツールまだぼん" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App />
    </>
  );
}
