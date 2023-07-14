import { FC, useEffect, useState } from "react";
import { Session, useStore } from "@/src/store";
import { Link, MenuItem, MenuList } from "@mui/material";

const SessionLinks: FC = () => {
  const { store } = useStore();
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    setSessions(Array.from(store.sessions.values()));
  }, [store.sessions]);

  return (
    <MenuList>
      {sessions.map((s) => (
        <Link key={s.id} href={`/sessions/${s.id}`} underline="none">
          <MenuItem>{s.name}</MenuItem>
        </Link>
      ))}
    </MenuList>
  );
};
export default SessionLinks;
