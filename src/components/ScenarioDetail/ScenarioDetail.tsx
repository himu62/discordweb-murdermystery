import { FC } from "react";
import { Card, Divider, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Scenario } from "@/src/store";
import PcEditor from "@/src/components/ScenarioDetail/PcEditor";

type Props = {
  scenario: Scenario;
  onSave: (data: Scenario) => void;
};

const ScenarioDetail: FC<Props> = ({ scenario, onSave }) => {
  const { control, register, handleSubmit, setValue } = useForm<Scenario>({
    defaultValues: scenario,
  });

  const onChangePcRenamable = (value: boolean) => {
    setValue("pcRenamable", value);
    handleSubmit(onSave)();
  };

  return (
    <Card sx={{ my: 1, p: 1 }}>
      <form onSubmit={handleSubmit(onSave)} onBlur={handleSubmit(onSave)}>
        <TextField
          label="シナリオ名"
          fullWidth
          sx={{ mt: 1 }}
          {...register("name")}
        />
        <Divider sx={{ my: 2 }} />

        <PcEditor
          control={control}
          register={register}
          setRenamable={onChangePcRenamable}
          onSave={handleSubmit(onSave)}
        />
      </form>
    </Card>
  );
};
export default ScenarioDetail;
