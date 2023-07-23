import { Link } from "@mui/material";
import { FC } from "react";

const AddBot: FC = () => {
  return (
    <Link
      target="_blank"
      href="https://discord.com/api/oauth2/authorize?client_id=1074232444787638362&permissions=8&scope=bot"
    >
      botをサーバに追加する
    </Link>
  );
};
export default AddBot;
