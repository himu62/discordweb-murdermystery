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

const _filterName = (input: string, searchable: string): boolean => {
  return searchable.toUpperCase().includes(input.toUpperCase());
};

const _filterCount = (
  inputs: number[],
  between: { min: number; max: number }
): boolean => {
  for (const i of inputs) {
    if (i >= between.min && i <= between.max) return true;
  }
  return false;
};

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
    const _scenarios = Array.from(store.scenarios.values());

    if (filterName === "" && filterCounts.length === 0) {
      setScenarios(_scenarios);
      return;
    }

    if (filterName !== "" && filterCounts.length > 0) {
      const filtered = _scenarios.filter((s) =>
        _filterName(filterName, s.name)
      );
      setScenarios(
        filtered.filter((s) => _filterCount(filterCounts, s.playersCount))
      );
    }

    if (filterName !== "") {
      setScenarios(_scenarios.filter((s) => _filterName(filterName, s.name)));
    }

    if (filterCounts.length > 0) {
      setScenarios(
        _scenarios.filter((s) => _filterCount(filterCounts, s.playersCount))
      );
    }
  }, [filterName, filterCounts, store.scenarios]);

  const handleSubmitNew = (data: Inputs) => {
    const n: Scenario = {
      id: v4(),
      name: data.name,
      playersCount: { min: 0, max: 0 },
      roles: [],
      audienceRole: new Map(),
      textChannels: [],
      voiceChannels: [],
      scenes: [],
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
        <Typography>フィルター</Typography>
        <TextField
          label="名前の一部"
          size="small"
          onChange={handleNameChanged}
          sx={{ mx: 1 }}
        />
        <FormControl>
          <InputLabel size="small" htmlFor="scenario-list-filter-count">
            人数
          </InputLabel>
          <Select
            id="scenario-list-filter-count"
            label="人数"
            size="small"
            multiple
            value={filterCounts}
            sx={{ minWidth: "8em" }}
            onChange={handleCountsChanged}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
              playersCount={s.playersCount}
              onDelete={handleDelete}
            />
          );
        })}
      </Stack>
    </Box>
  );
};
export default ScenarioList;
