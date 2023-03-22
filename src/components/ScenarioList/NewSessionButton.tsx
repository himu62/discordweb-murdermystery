import { FC, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Icon,
  Modal,
} from "@mui/material";
import TextField from "@/src/atom/TextField";
import { useForm } from "react-hook-form";
import { Session } from "@/src/store";
import { v4 } from "uuid";

type Props = {
  scenarioId: string;
};

type Inputs = {
  name: string;
};

const NewSessionButton: FC<Props> = ({ scenarioId }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm<Inputs>();

  const toggleModal = () => {
    setOpen(!open);
  };

  const onSubmit = (data: Inputs) => {
    // create discord category
    // roles, textChannels, voiceChannels

    const s: Session = {
      ...data,
      scenarioId,
      id: v4(),
      audience: false,
      roles: new Map(),
      textChannels: new Map(),
      voiceChannels: new Map(),
    };
  };

  return (
    <>
      <Button
        onClick={toggleModal}
        startIcon={<Icon>post_add</Icon>}
        size="small"
      >
        セッション作成
      </Button>

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
                label="セッション名"
                required
                margin="dense"
                inputProps={{ required: true, ...register("name") }}
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
    </>
  );
};
export default NewSessionButton;
