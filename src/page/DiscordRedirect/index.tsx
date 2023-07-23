import { FC, useEffect } from "react";
import * as config from "../../../discord.json";

const DiscordRedirectPage: FC = () => {
  useEffect(() => {
    void (async () => {
      console.log("start to login");

      const url = new URL(location.href);
      const code = url.searchParams.get("code");
      if (!code) {
        console.log("missing code");
        return;
      }

      const params = new URLSearchParams([
        ...Object.entries({
          client_id: config.CLIENT_ID,
          client_secret: config.CLIENT_SECRET,
          grant_type: "authorization_code",
          code: code,
          redirect_uri: "http://localhost:5173/discord_redirect",
        }),
      ]);

      const res = await fetch(`${config.API_ENDPOINT}/oauth2/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      console.log(await res.json());
    })();
  });

  return <></>;
};
export default DiscordRedirectPage;
