import { FC } from "react";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { Scenario } from "@/src/store";
import { Box, Button, Icon, TextField } from "@mui/material";
import { v4 } from "uuid";

type Props = {
  type: "text" | "voice";
  control: Control<Scenario>;
  onSave: () => void;
};

const ChannelEditor: FC<Props> = ({ type, control, onSave }) => {
  const name = type === "text" ? "textChannels" : "voiceChannels";
  const word = type === "text" ? "テキスト" : "ボイス";

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const onAppend = () => {
    append({ id: v4(), name: "" });
    onSave();
  };

  const onRemove = (index: number) => () => {
    remove(index);
    onSave();
  };

  return (
    <Box>
      {fields.map((c, index) => (
        <Box key={c.id} sx={{ display: "flex" }}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextField
                label={`${word}チャンネル名`}
                margin="dense"
                size="small"
                sx={{ flexGrow: 1, mr: 1 }}
                onChange={(e) => {
                  onChange(e.target.value.toLowerCase()); // Discordのチャンネル名には大文字が使えない
                }}
                onBlur={onBlur}
                value={value}
                inputRef={ref}
              />
            )}
            name={`${name}.${index}.name`}
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
