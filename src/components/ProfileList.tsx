import { FC, useContext } from "react";
import { Profile, StoreContext } from "@/src/store";
import { Card } from "@mui/material";

const ProfileItem: FC<{ profile: Profile }> = ({ profile }) => {
  return <Card>{profile.id}</Card>;
};

const NewProfile: FC<{}> = ({}) => {
  return <Card>new profile</Card>;
};

const ProfileList: FC = () => {
  const { store } = useContext(StoreContext);

  return (
    <>
      {store.profiles.map((pr) => (
        <ProfileItem key={pr.id} profile={pr} />
      ))}
      <NewProfile />
    </>
  );
};
export default ProfileList;
