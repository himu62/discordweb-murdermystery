import { Button, Card, CardActions, CardContent, Modal } from "@mui/material";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@/src/atom/TextField";

export type Inputs = {
  name: string;
  playersCount: string;
};

type Props = {
  onCreate: (data: Inputs) => void;
};

const NewScenarioButton: FC<Props> = ({ onCreate }) => {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit } = useForm<Inputs>();

  const toggleModal = () => {
    setOpen(!open);
  };

  const onSubmit = (data: Inputs) => {
    onCreate(data);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={toggleModal}>シナリオを追加する</Button>

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
                label="シナリオ名"
                required
                margin="dense"
                inputProps={{ required: true, ...register("name") }}
              />
              <TextField
                name="playersCount"
                label="人数"
                required
                type="number"
                margin="dense"
                inputProps={{
                  required: true,
                  ...register("playersCount"),
                }}
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
export default NewScenarioButton;
