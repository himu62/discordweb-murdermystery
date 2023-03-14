import { ReactElement } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import Layout from "@/src/components/Layout";
import ScenarioList from "@/src/components/ScenarioList";

const Page: NextPageWithLayout = () => {
  return <ScenarioList />;
};

Page.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Page;
