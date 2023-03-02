"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from "react";

export interface Store {
  darkMode: boolean;
  currentProfileId: string;

  profiles: Profile[];
  scenarios: Scenario[];
  sessions: Session[];
}

export interface Profile {
  id: string;
  name: string;
  token: string;
  clientId: string;
  guildId: string;
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

const _s =
  typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
const _defaultStore = _s
  ? (JSON.parse(_s) as Store)
  : ({
      darkMode: true,
      currentProfileId: "",
      profiles: [],
      scenarios: [],
      sessions: [],
    } as Store);

interface StoreContextType {
  store: Store;
  setStore: (store: Store) => void;
}

export const StoreContext = createContext<StoreContextType>({
  store: _defaultStore,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setStore: (store: Store) => {},
});

export const StoreContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const context = useContext(StoreContext);
  const [store, setStore] = useState(context.store);

  const _context = {
    store,
    setStore: (store: Store) => {
      console.log("save!");
      console.log(store);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      setStore(store);
    },
  };

  return (
    <StoreContext.Provider value={_context}>{children}</StoreContext.Provider>
  );
};
