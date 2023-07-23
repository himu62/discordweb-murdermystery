import { Link } from "@mui/material";
import { FC } from "react";
import * as config from "../../discord.json";

const DiscordLogin: FC = () => {
  return (
    <Link
      target="_self"
      href={`${config.API_ENDPOINT}/oauth2/authorize?client_id=${config.CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fdiscord_redirect&response_type=code&scope=identify%20guilds`}
    >
      ユーザーログイン
    </Link>
  );
};
export default DiscordLogin;
