import { FC } from "react";
import { Card, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Scenario } from "@/src/store";

type Props = {
  scenario: Scenario;
  onSave: (data: Scenario) => void;
};

const ScenarioDetail: FC<Props> = ({ scenario, onSave }) => {
  const { register, handleSubmit } = useForm<Scenario>({
    defaultValues: scenario,
  });

  return (
    <Card sx={{ my: 1, p: 1 }}>
      <form onSubmit={handleSubmit(onSave)} onBlur={handleSubmit(onSave)}>
        <TextField label="シナリオ名" size="small" {...register("name")} />
      </form>
    </Card>
  );
};
export default ScenarioDetail;
