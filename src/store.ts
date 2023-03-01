import { useCallback, useEffect, useState } from "react";

export interface Store {
  profiles: Profile[];
  scenarios: Scenario[];
  sessions: Session[];
}

export interface Profile {
  id: string;
  name: string;
  guildId: string;
  token: string;
  clientId: string;
  gmUserId: string;
}

export interface Scenario {
  id: string;
  name: string;
}

export interface Session {
  id: string;
  name: string;
}

const STORAGE_KEY = "discordweb-murdermystery/store";

export const useStore = (): [Store, (store: Store) => void] => {
  const [_store, _setStore] = useState({
    profiles: [],
    scenarios: [],
    sessions: [],
  } as Store);

  useEffect(() => {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) {
      _setStore(JSON.parse(s) as Store);
    }
  }, [_setStore]);

  const setStore = useCallback(
    (store: Store) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      _setStore(store);
    },
    [_setStore]
  );

  return [_store, setStore];
};
