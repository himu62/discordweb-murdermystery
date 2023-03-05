import { ReactElement } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import Layout from "@/src/components/Layout";

const Page: NextPageWithLayout = () => {
  return <></>;
};

Page.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Page;
