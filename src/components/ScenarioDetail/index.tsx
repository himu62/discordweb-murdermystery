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

  const onSave = (data: Scenario) => {
    setScenario(data);
    store.scenarios.set(data.id, data);
    setStore(store);
    enqueueSnackbar("シナリオを保存しました。", {
      preventDuplicate: true,
    });
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
