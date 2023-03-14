import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { Scenario } from "@/src/store";
import { FC } from "react";
import { Box, Button, Divider, Icon, TextField } from "@mui/material";
import OperationEditor from "@/src/components/ScenarioDetail/OperationEditor";
import { v4 } from "uuid";

type Props = {
  control: Control<Scenario>;
  register: UseFormRegister<Scenario>;
  onSave: () => void;
};

const SceneEditor: FC<Props> = ({ control, register, onSave }) => {
  const { fields, append, remove } = useFieldArray({ control, name: "scenes" });

  const onAppend = () => {
    append({ id: v4(), name: "", operations: [] });
    onSave();
  };

  const onRemove = (index: number) => () => {
    remove(index);
    onSave();
  };

  return (
    <Box>
      {fields.map((s, index) => (
        <Box key={s.id} sx={{ m: 1, p: 1, border: 1, borderRadius: 1 }}>
          <Box sx={{ display: "flex" }}>
            <TextField
              label="シーン名"
              size="small"
              sx={{ flexGrow: 1, mr: 1 }}
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
          <Divider sx={{ my: 1 }} />

          <OperationEditor
            control={control}
            register={register}
            onSave={onSave}
            sceneIndex={index}
          />
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
