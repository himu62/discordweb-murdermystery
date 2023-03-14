import { FC } from "react";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { Scenario } from "@/src/store";
import { Box, Button, Icon, TextField } from "@mui/material";

type Props = {
  type: "text" | "voice";
  control: Control<Scenario>;
  register: UseFormRegister<Scenario>;
  onSave: () => void;
};

const ChannelEditor: FC<Props> = ({ type, control, register, onSave }) => {
  const name = type === "text" ? "textChannels" : "voiceChannels";
  const word = type === "text" ? "テキスト" : "ボイス";

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const onAppend = () => {
    append({ name: "" });
    onSave();
  };

  const onRemove = (index: number) => () => {
    remove(index);
    onSave();
  };

  return (
    <Box>
      {fields.map((c, index) => (
        <Box key={index} sx={{ mt: 2, display: "flex" }}>
          <TextField
            label={`${word}チャンネル名`}
            size="small"
            sx={{ flexGrow: 1, mr: 1 }}
            {...register(`${name}.${index}.name`)}
          />
          <Button
            startIcon={<Icon>delete</Icon>}
            onClick={onRemove(index)}
            color="error"
          >
            削除
          </Button>
        </Box>
      ))}
      <Box sx={{ mt: 1 }}>
        <Button startIcon={<Icon>add</Icon>} onClick={onAppend}>
          {word}チャンネル追加
        </Button>
      </Box>
    </Box>
  );
};
export default ChannelEditor;
