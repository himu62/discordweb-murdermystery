import ProfileList from "@/src/components/ProfileList";
import { ReactElement } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import Layout from "@/src/components/Layout";

const Page: NextPageWithLayout = () => {
  return <ProfileList />;
};

Page.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Page;
