"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const VERSION = "1";

export interface Store {
  version: string;
  darkMode: boolean;
  currentProfileId: string;

  profiles: Map<string, Profile>;
  scenarios: Map<string, Scenario>;
  sessions: Map<string, Session>;
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

const encodeStore = (store: Store) => {
  return JSON.stringify({
    version: store.version,
    darkMode: store.darkMode,
    currentProfileId: store.currentProfileId,
    profiles: Object.fromEntries(store.profiles),
    scenarios: Object.fromEntries(store.scenarios),
    sessions: Object.fromEntries(store.sessions),
  });
};

const decodeStore = (s: string) => {
  const { version, darkMode, currentProfileId, profiles, scenarios, sessions } =
    JSON.parse(s);

  return {
    version,
    darkMode,
    currentProfileId,
    profiles: new Map(Object.entries(profiles)),
    scenarios: new Map(Object.entries(scenarios)),
    sessions: new Map(Object.entries(sessions)),
  } as Store;
};

const STORAGE_KEY = "discordweb-murdermystery/store";

const emptyStore = {
  version: VERSION,
  darkMode: true,
  currentProfileId: "",
  profiles: new Map(),
  scenarios: new Map(),
  sessions: new Map(),
} as Store;

interface StoreContextType {
  store: Store;
  setStore: (store: Store) => void;
}

export const StoreContext = createContext<StoreContextType>({
  store: emptyStore,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setStore: (store: Store) => {},
});

export const StoreContextProvider: FC<{
  children: ReactNode | ReactNode[];
}> = ({ children }) => {
  const context = useContext(StoreContext);
  const [store, _setStore] = useState(context.store);

  const _context = {
    store,
    setStore: (_store: Store) => {
      console.log(_store);
      localStorage.setItem(STORAGE_KEY, encodeStore(_store));
      _setStore(_store);
    },
  };

  useEffect(() => {
    const _s =
      typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (_s) {
      _setStore(decodeStore(_s));
    }
  }, []);

  return (
    <StoreContext.Provider value={_context}>{children}</StoreContext.Provider>
  );
};
