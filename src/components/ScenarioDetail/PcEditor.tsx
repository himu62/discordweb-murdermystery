import {
  Control,
  Controller,
  useFieldArray,
  UseFormRegister,
} from "react-hook-form";
import { Scenario } from "@/src/store";
import { FC } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Icon,
  Switch,
  TextField,
} from "@mui/material";

type Props = {
  control: Control<Scenario>;
  register: UseFormRegister<Scenario>;
  setRenamable: (value: boolean) => void;
  onSave: () => void;
};

const PcEditor: FC<Props> = ({ control, register, setRenamable, onSave }) => {
  const { fields, append, remove } = useFieldArray({ control, name: "pcs" });

  const onAppend = () => {
    append({ name: "" });
    onSave();
  };

  const onRemove = (index: number) => () => {
    remove(index);
    onSave();
  };

  return (
    <Box sx={{ mt: 2 }}>
      {fields.map((pc, index) => (
        <Box key={index} sx={{ mb: 2, display: "flex" }}>
          <TextField
            label="キャラクター名"
            size="small"
            sx={{ flexGrow: 1, mr: 1 }}
            {...register(`pcs.${index}.name`)}
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
      <Button startIcon={<Icon>add</Icon>} onClick={onAppend}>
        PC追加
      </Button>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormControlLabel
            control={
              <Switch
                checked={value}
                onChange={(e, v) => {
                  setRenamable(v);
                  return onChange(v);
                }}
              />
            }
            label="キャラ名変更可能"
            labelPlacement="start"
          />
        )}
        name="pcRenamable"
      />
    </Box>
  );
};
export default PcEditor;
