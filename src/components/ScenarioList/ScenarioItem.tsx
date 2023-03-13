import { FC } from "react";
import { Box, Button, Card, Icon, Typography } from "@mui/material";

type Props = {
  id: string;
  name: string;
  playersCount: number;
  onDelete: (id: string) => void;
};

const ScenarioItem: FC<Props> = ({ id, name, playersCount, onDelete }) => {
  return (
    <Card sx={{ m: 1, p: 1, display: "flex" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h5">{name}</Typography>
        <Typography color="text.secondary">{playersCount}人</Typography>
      </Box>
      <Box sx={{ alignSelf: "end" }}>
        <Button
          size="small"
          startIcon={<Icon>edit</Icon>}
          href={`/scenarios/${id}`}
        >
          編集
        </Button>
        <Button
          size="small"
          startIcon={<Icon>delete</Icon>}
          color="error"
          onClick={() => onDelete(id)}
        >
          削除
        </Button>
      </Box>
    </Card>
  );
};
export default ScenarioItem;
