import { FC, useContext } from "react";
import { Profile, StoreContext } from "@/src/store";
import { Card } from "@mui/material";

const card = {
  m: 1,
  p: 1,
};

const newcard = {
  border: 2,
  borderStyle: "dashed",
  backgroundColor: "transparent",
};

const ProfileItem: FC<{ profile: Profile }> = ({ profile }) => {
  return <Card sx={card}>{profile.id}</Card>;
};

const NewProfile: FC<{}> = ({}) => {
  return <Card sx={{ ...card, ...newcard }}>new profile</Card>;
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
