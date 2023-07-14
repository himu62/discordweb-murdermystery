import { ReactElement } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import Layout from "@/src/components/Layout";
import ScenarioDetail from "@/src/components/ScenarioDetail";

const Page: NextPageWithLayout = () => {
  return <ScenarioDetail />;
};

Page.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Page;
