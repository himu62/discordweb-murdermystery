import { FC, useEffect, useState } from "react";
import { Box, Card, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Scenario, useStore } from "@/src/store";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

const ScenarioDetail: FC = () => {
  const id = useRouter().query["id"] as string;
  const { store, setStore } = useStore();
  const { enqueueSnackbar } = useSnackbar();
  const [scenario, setScenario] = useState<Scenario>();

  const { register, handleSubmit } = useForm<Scenario>({ mode: "onBlur" });
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const onSubmit = (data: Scenario) => {
    clearTimeout(timer);
    const t = setTimeout(() => {
      setScenario(data);
      store.scenarios.set(data.id, data);
      setStore(store);
      enqueueSnackbar("シナリオを保存しました。", { autoHideDuration: 1000 });
    }, 2000);
    setTimer(t);
  };

  useEffect(() => {
    setScenario(store.scenarios.get(id));
  }, [id, store.scenarios]);

  return (
    <Box sx={{ mt: 2, mx: 1 }}>
      {!scenario && <Typography>存在しないシナリオです。</Typography>}
      {scenario && (
        <Card sx={{ my: 1, p: 1 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField label="シナリオ名" size="small" {...register("name")} />
          </form>
        </Card>
      )}
    </Box>
  );
};
export default ScenarioDetail;
