import { FC, useContext, useEffect, useRef, useState } from "react";
import { Profile, StoreContext } from "@/src/store";
import { Button, ButtonGroup, Card, CardActionArea, CardActions, CardContent, Icon, Modal, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import TextField from "@/src/atom/TextField";
import { v4 } from "uuid";
import { OptionsObject, SnackbarProvider } from "notistack";

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

type Inputs = Profile;

const ProfileItem: FC<{
  profile: Profile;
  onSave: (profile: Profile) => void;
  onDelete: (id: string) => void;
}> = ({ profile, onSave, onDelete }) => {
  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: profile,
  });
  const [defaultValues, setDefaultValues] = useState(profile);

  const onSubmit = (data: Inputs) => {
    onSave(data);
    setDefaultValues(data);
  };

  return (
    <Card variant="outlined" sx={card}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <TextField
            name="name"
            label="プロフィール名"
            required
            margin="dense"
            size="small"
            inputProps={{ required: true, ...register("name") }}
          />
          <TextField
            name="token"
            label="トークン"
            required
            type="password"
            margin="dense"
            size="small"
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
            margin="dense"
            size="small"
            inputProps={{
              required: true,
              pattern: "[1-9]\\d*",
              ...register("clientId",
            }}
            helperText="クライアントIDは数字だけです"
          />
          <TextField
            name="guildId"
            label="サーバID"
            required
            margin="dense"
            size="small"
            inputProps={{
              required: true,
              pattern: "[1-9]\\d*",
              ...register("guildId")
            }}
            helperText="サーバIDは数字だけです"
          />
          <TextField
            name="gmUserId"
            label="GMユーザID"
            required
            margin="dense"
            size="small"
            inputProps={{
              required: true,
              pattern: "[1-9]\\d*",
              ...register("gmUserId")
            }}
            helperText="ユーザIDは数字だけです"
          />
        </CardContent>
        <CardActions>
          <ButtonGroup variant="contained">
            <Button type="submit">
              <Icon>save</Icon>保存
            </Button>
            <Button type="button" onClick={() => reset(defaultValues)}>
              <Icon>refresh</Icon>リセット
            </Button>
            <Button
              type="button"
              color="error"
              onClick={() => onDelete(profile.id)}
            >
              <Icon>delete</Icon>削除
            </Button>
          </ButtonGroup>
        </CardActions>
      </form>
    </Card>
  );
};

const NewProfile: FC<{ onCreate: (data: Inputs) => void }> = ({ onCreate }) => {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit } = useForm<Inputs>();

  const toggleModal = () => {
    setOpen(!open);
  };

  const onSubmit = (data: Inputs) => {
    onCreate(data);
    setOpen(false);
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
              margin="dense"
              inputProps={{ required: true, ...register("name") }}
            />
            <TextField
              name="token"
              label="トークン"
              required
              type="password"
              margin="dense"
              inputProps={{
                required: true,
                pattern: "[0-9a-zA-Z-.]+",
                ...register("token")
              }}
              helperText="トークンが間違っています"
            />
            <TextField
              name="clientId"
              label="クライアントID"
              required
              margin="dense"
              inputProps={{
                required: true,
                pattern: "[1-9]\\d*",
                ...register("clientId")
              }}
              helperText="クライアントIDは数字だけです"
            />
            <TextField
              name="guildId"
              label="サーバID"
              required
              margin="dense"
              inputProps={{
                required: true,
                pattern: "[1-9]\\d*",
                ...register("guildId")
              }}
              helperText="サーバIDは数字だけです"
            />
            <TextField
              name="gmUserId"
              label="GMユーザID"
              required
              margin="dense"
              inputProps={{
                required: true,
                pattern: "[1-9]\\d*",
                ...register("gmUserId")
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
  const { store, setStore } = useContext(StoreContext);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const providerRef = useRef<SnackbarProvider>(null);

  useEffect(() => {
    setProfiles(Array.from(store.profiles.values()));
  }, [store.profiles]);

  const snack = (message: string, options?: OptionsObject) => {
    if (providerRef.current) {
      providerRef.current.enqueueSnackbar(message, options);
    }
  };

  const onCreate = (data: Inputs) => {
    data.id = v4();
    store.profiles.set(data.id, data);
    setStore(store);
    setProfiles(Array.from(store.profiles.values()));
    snack(`プロフィール「${data.name}」を追加しました。`, {
      variant: "success"
    });
  };

  const onSave = (profile: Profile) => {
    store.profiles.set(profile.id, profile);
    setStore(store);
    setProfiles(Array.from(store.profiles.values()));
    snack("プロフィールを保存しました。");
  };

  const onDelete = (id: string) => {
    const deleted = store.profiles.get(id);
    if (deleted) {
      store.profiles.delete(id);
      setStore(store);
      setProfiles(Array.from(store.profiles.values()));
      const snackKey = v4();
      snack(`プロフィール「${deleted.name}」を削除しました。`, {
        variant: "error",
        autoHideDuration: 10000,
        key: snackKey,
        action: (
          <Button
            onClick={() => {
              store.profiles.set(deleted.id, deleted);
              setStore(store);
              setProfiles(Array.from(store.profiles.values()));
              providerRef.current?.closeSnackbar(snackKey);
            }}
          >
            取り消し
          </Button>
        )
      });
    }
  };

  return (
    <SnackbarProvider ref={providerRef} hideIconVariant>
      <Stack sx={{ mt: 2 }}>
        {profiles.map((pr) => (
          <ProfileItem
            key={pr.id}
            profile={pr}
            onSave={onSave}
            onDelete={onDelete}
          />
        ))}
        <NewProfile onCreate={onCreate} />
      </Stack>
    </SnackbarProvider>
  );
};
export default ProfileList;
