import { FC } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  FormControlLabel,
  Icon,
  Switch,
  TextField,
} from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Scenario } from "@/src/store";

type Props = {
  scenario: Scenario;
  onSave: (data: Scenario) => void;
};

const ScenarioDetail: FC<Props> = ({ scenario, onSave }) => {
  const { control, register, handleSubmit, setValue } = useForm<Scenario>({
    defaultValues: scenario,
  });
  const { fields: pcs, append: appendPc } = useFieldArray({
    control,
    name: "pcs",
  });

  return (
    <Card sx={{ my: 1, p: 1 }}>
      <form onSubmit={handleSubmit(onSave)} onBlur={handleSubmit(onSave)}>
        <TextField label="シナリオ名" fullWidth {...register("name")} />
        <Divider sx={{ my: 2 }} />

        {pcs.map((pc, index) => {
          return (
            <Box key={index} sx={{ display: "flex", mb: 1 }}>
              <TextField
                label="キャラクター名"
                size="small"
                {...register(`pcs.${index}.name`)}
                sx={{ flexGrow: 1, mr: 1 }}
              />
            </Box>
          );
        })}
        <Button
          startIcon={<Icon>add</Icon>}
          onClick={() => appendPc({ name: "" })}
        >
          PC追加
        </Button>
        <Controller
          control={control}
          render={({ field: { onChange } }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={scenario.pcRenamable}
                  onChange={(e, v) => {
                    setValue("pcRenamable", v);
                    handleSubmit(onSave)();
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
      </form>
    </Card>
  );
};
export default ScenarioDetail;
