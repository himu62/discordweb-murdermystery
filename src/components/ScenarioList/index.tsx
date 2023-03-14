import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Scenario, useStore } from "@/src/store";
import NewScenarioButton, {
  Inputs,
} from "@/src/components/ScenarioList/NewScenarioButton";
import { v4 } from "uuid";
import ScenarioItem from "@/src/components/ScenarioList/ScenarioItem";
import { useSnackbar } from "notistack";

const ScenarioList: FC = () => {
  const { store, setStore } = useStore();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  const [filterName, setFilterName] = useState("");
  const [filterCounts, setFilterCounts] = useState<number[]>([]);

  useEffect(() => {
    setScenarios(Array.from(store.scenarios.values()));
  }, [store.scenarios]);

  useEffect(() => {
    if (filterName === "" && filterCounts.length === 0) {
      setScenarios(Array.from(store.scenarios.values()));
      return;
    }

    if (filterName !== "" && filterCounts.length > 0) {
      setScenarios(
        Array.from(store.scenarios.values()).filter((s) => {
          return (
            s.name.includes(filterName) && filterCounts.includes(s.pcs.length)
          );
        })
      );
    }

    if (filterName !== "") {
      setScenarios(
        Array.from(store.scenarios.values()).filter((s) => {
          return s.name.includes(filterName);
        })
      );
    }

    if (filterCounts.length > 0) {
      setScenarios(
        Array.from(store.scenarios.values()).filter((s) => {
          return filterCounts.includes(s.pcs.length);
        })
      );
    }
  }, [filterName, filterCounts, store.scenarios]);

  const handleSubmitNew = (data: Inputs) => {
    const n: Scenario = {
      id: v4(),
      name: data.name,
      pcs: [],
      pcRenamable: false,
      textChannels: [],
      voiceChannels: [],
      audienceRole: new Map(),
    };
    store.scenarios.set(n.id, n);
    setStore(store);
    setScenarios(Array.from(store.scenarios.values()));
    enqueueSnackbar(`シナリオ「${data.name}」を追加しました。`, {
      variant: "success",
    });
  };

  const handleNameChanged = (ev: ChangeEvent<HTMLInputElement>) => {
    setFilterName(ev.target.value);
  };

  const handleCountsChanged = (ev: SelectChangeEvent<number[]>) => {
    setFilterCounts(ev.target.value as number[]);
  };

  const handleDelete = (id: string) => {
    const deleted = store.scenarios.get(id);
    if (deleted) {
      store.scenarios.delete(id);
      setStore(store);
      setScenarios(Array.from(store.scenarios.values()));

      const snackKey = v4();
      enqueueSnackbar(`シナリオ「${deleted.name}」を削除しました。`, {
        variant: "error",
        autoHideDuration: 10000,
        key: snackKey,
        action: (
          <Button
            onClick={() => {
              store.scenarios.set(deleted.id, deleted);
              setStore(store);
              setScenarios(Array.from(store.scenarios.values()));
              closeSnackbar(snackKey);
            }}
          >
            取り消し
          </Button>
        ),
      });
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ m: 1 }}>
        <NewScenarioButton onCreate={handleSubmitNew} />
      </Box>
      <Box
        sx={{
          m: 1,
          p: 1,
          border: 1,
          borderStyle: "solid",
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography component="span">フィルター</Typography>
        <TextField label="名前の一部" onChange={handleNameChanged} />
        <FormControl>
          <InputLabel htmlFor="scenario-list-filter-count">人数</InputLabel>
          <Select
            id="scenario-list-filter-count"
            label="人数"
            multiple
            value={filterCounts}
            sx={{ minWidth: "8em" }}
            onChange={handleCountsChanged}
          >
            {Array.from(
              new Set(
                Array.from(store.scenarios.values()).map((s) => s.pcs.length)
              )
            )
              .sort((a, b) => a - b)
              .map((c) => {
                return (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </Box>
      <Stack sx={{ m: 1 }}>
        {scenarios.map((s) => {
          return (
            <ScenarioItem
              key={s.id}
              id={s.id}
              name={s.name}
              playersCount={s.pcs.length}
              onDelete={handleDelete}
            />
          );
        })}
      </Stack>
    </Box>
  );
};
export default ScenarioList;
