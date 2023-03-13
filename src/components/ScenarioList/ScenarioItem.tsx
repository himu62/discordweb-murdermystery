import { FC } from "react";
import { Card } from "@mui/material";

type Props = {
  id: string;
  name: string;
  playersCount: number;
};

const ScenarioItem: FC<Props> = ({ id, name, playersCount }) => {
  return (
    <Card>
      {name}
      {playersCount}人
    </Card>
  );
};
export default ScenarioItem;
