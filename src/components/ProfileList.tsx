import { FC, useContext, useEffect, useState } from "react";
import { Profile, StoreContext } from "@/src/store";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Modal,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import TextField from "@/src/atom/TextField";
import { v4 } from "uuid";

const card = {
  m: 1,
};

const newcard = {
  border: 2,
  borderStyle: "dashed",
  backgroundColor: "transparent",
  boxShadow: "none",
  textAlign: "center",
};

const textfield = {
  mt: 2,
  display: "block",
};

type Inputs = Profile;

const ProfileItem: FC<{ profile: Profile }> = ({ profile }) => {
  return <Card sx={card}>{profile.id}</Card>;
};

const NewProfile: FC = () => {
  const { store, setStore } = useContext(StoreContext);

  const [open, setOpen] = useState(false);

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: { id: v4() },
  });

  const toggleModal = () => {
    setOpen(!open);
  };

  const onSubmit = (data: Inputs) => {
    console.log(data);
    store.profiles.push(data);
    setStore(store);
  };

  const modal = (
    <Modal open={open} onClose={toggleModal}>
      <Card
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <TextField
              name="name"
              label="プロフィール名"
              required
              sx={textfield}
              inputProps={{ required: true, ...register("name") }}
            />
            <TextField
              name="token"
              label="トークン"
              required
              sx={textfield}
              inputProps={{
                required: true,
                pattern: "[0-9a-zA-Z-.]+",
                ...register("token"),
              }}
              helperText="トークンが間違っています"
            />
            <TextField
              name="clientId"
              label="クライアントID"
              required
              sx={textfield}
              inputProps={{
                required: true,
                pattern: "[1-9]\\d*",
                ...register("clientId"),
              }}
              helperText="クライアントIDは数字だけです"
            />
            <TextField
              name="guildId"
              label="サーバID"
              required
              sx={textfield}
              inputProps={{
                required: true,
                pattern: "[1-9]\\d*",
                ...register("guildId"),
              }}
              helperText="サーバIDは数字だけです"
            />
            <TextField
              name="gmUserId"
              label="GMユーザID"
              required
              sx={textfield}
              inputProps={{
                required: true,
                pattern: "[1-9]\\d*",
                ...register("gmUserId"),
              }}
              helperText="ユーザIDは数字だけです"
            />
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button type="button" onClick={toggleModal} color="info">
              キャンセル
            </Button>
            <Button type="submit" color="primary">
              追加
            </Button>
          </CardActions>
        </form>
      </Card>
    </Modal>
  );

  return (
    <>
      <Card sx={{ ...card, ...newcard }}>
        <CardActionArea sx={{ p: 2 }} onClick={toggleModal}>
          プロフィールを追加する
        </CardActionArea>
      </Card>
      {modal}
    </>
  );
};

const ProfileList: FC = () => {
  const { store } = useContext(StoreContext);

  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    setProfiles(store.profiles);
  });

  return (
    <Stack sx={{ mt: 2 }}>
      {profiles.map((pr) => (
        <ProfileItem key={pr.id} profile={pr} />
      ))}
      <NewProfile />
    </Stack>
  );
};
export default ProfileList;
