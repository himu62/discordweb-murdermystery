import { FC } from "react";
import { Box, Card, Divider, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Scenario } from "@/src/store";
import RoleEditor from "@/src/components/ScenarioDetail/RoleEditor";
import ChannelEditor from "@/src/components/ScenarioDetail/ChannelEditor";
import SceneEditor from "@/src/components/ScenarioDetail/SceneEditor";

type Props = {
  scenario: Scenario;
  onSave: (data: Scenario) => void;
};

const ScenarioDetail: FC<Props> = ({ scenario, onSave }) => {
  const { control, register, handleSubmit } = useForm<Scenario>({
    defaultValues: scenario,
  });

  return (
    <Card sx={{ my: 1, p: 1 }}>
      <form onSubmit={handleSubmit(onSave)} onBlur={handleSubmit(onSave)}>
        <TextField
          label="シナリオ名"
          fullWidth
          sx={{ mt: 1 }}
          {...register("name")}
        />
        <Divider sx={{ my: 1 }} />

        <Box>
          <Typography>プレイヤー人数</Typography>
          <TextField
            label="最少"
            margin="dense"
            size="small"
            {...register("playersCount.min")}
          />
          <TextField
            label="最大"
            margin="dense"
            size="small"
            {...register("playersCount.max")}
          />
        </Box>
        <Divider sx={{ my: 1 }} />

        <RoleEditor control={control} onSave={handleSubmit(onSave)} />
        <Divider sx={{ my: 1 }} />

        <ChannelEditor
          type="text"
          control={control}
          onSave={handleSubmit(onSave)}
        />
        <Divider sx={{ my: 1 }} />

        <ChannelEditor
          type="voice"
          control={control}
          onSave={handleSubmit(onSave)}
        />
        <Divider sx={{ my: 1 }} />

        <SceneEditor control={control} onSave={handleSubmit(onSave)} />
      </form>
    </Card>
  );
};
export default ScenarioDetail;
