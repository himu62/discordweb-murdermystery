import { FC, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Scenario, useStore } from "@/src/store";
import { useSnackbar } from "notistack";
import ScenarioDetail from "@/src/components/ScenarioDetail/ScenarioDetail";

const ScenarioDetailContainer: FC = () => {
  const id = useRouter().query["id"] as string;
  const { store, setStore } = useStore();
  const { enqueueSnackbar } = useSnackbar();
  const [scenario, setScenario] = useState<Scenario>();
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const onSave = (data: Scenario) => {
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
      {scenario && <ScenarioDetail scenario={scenario} onSave={onSave} />}
    </Box>
  );
};
export default ScenarioDetailContainer;
