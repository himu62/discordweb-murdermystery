import { Link } from "@mui/material";
import { FC } from "react";
import * as config from "../../discord.json";

const AddBot: FC = () => {
  return (
    <Link
      target="_blank"
      href={`${config.API_ENDPOINT}/oauth2/authorize?client_id=${config.CLIENT_ID}&permissions=8&scope=bot`}
    >
      botをサーバに追加する
    </Link>
  );
};
export default AddBot;
