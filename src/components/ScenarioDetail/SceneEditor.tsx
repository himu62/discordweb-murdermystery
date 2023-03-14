import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { Scenario } from "@/src/store";
import { FC } from "react";
import { Box, Button, Icon, TextField } from "@mui/material";

type Props = {
  control: Control<Scenario>;
  register: UseFormRegister<Scenario>;
  onSave: () => void;
};

const SceneEditor: FC<Props> = ({ control, register, onSave }) => {
  const { fields, append, remove } = useFieldArray({ control, name: "scenes" });

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
      {fields.map((s, index) => (
        <Box key={index} sx={{ m: 1, p: 1, border: 1, borderRadius: 1 }}>
          <Box sx={{ display: "flex" }}>
            <TextField
              label="シーン名"
              size="small"
              fullWidth
              {...register(`scenes.${index}.name`)}
            />
            <Button
              size="small"
              onClick={onRemove(index)}
              startIcon={<Icon>delete</Icon>}
              color="error"
            >
              削除
            </Button>
          </Box>
        </Box>
      ))}
      <Box>
        <Button startIcon={<Icon>add</Icon>} onClick={onAppend}>
          シーンを追加する
        </Button>
      </Box>
    </Box>
  );
};
export default SceneEditor;
