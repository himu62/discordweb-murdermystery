import { Control, useFieldArray } from "react-hook-form";
import { Scenario } from "@/src/store";
import { FC } from "react";
import { Box, Button, Icon, TextField, Typography } from "@mui/material";
import { v4 } from "uuid";

type Props = {
  control: Control<Scenario>;
  onSave: () => void;
};

const RoleEditor: FC<Props> = ({ control, onSave }) => {
  const { fields, append, remove } = useFieldArray({ control, name: "roles" });

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
      <Typography>※卓PL、観戦ロールをここで作る必要はありません。</Typography>
      {fields.map((pc, index) => (
        <Box key={pc.id} sx={{ display: "flex" }}>
          <TextField
            label="ロール名"
            margin="dense"
            size="small"
            sx={{ flexGrow: 1, mr: 1 }}
            {...control.register(`roles.${index}.name`)}
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
          ロール追加
        </Button>
      </Box>
    </Box>
  );
};
export default RoleEditor;
