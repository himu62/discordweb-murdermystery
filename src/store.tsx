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
import { getCookie, setCookie } from "typescript-cookie";

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
  playersCount: { min: number; max: number };
  roles: { id: string; name: string }[];
  audienceRole: Map<string, string>; // profile.id, role.id
  textChannels: {
    id: string;
    name: string;
  }[];
  voiceChannels: {
    id: string;
    name: string;
  }[];
  scenes: {
    id: string;
    name: string;
    operations: Operation[];
  }[];
}

export interface Operation {
  id: string;
  type: "send" | "permission" | "playersToAudience";
  sendOperation?: {
    destination: string[];
    text: string;
    variables: {
      id: string;
      key: string;
    }[];
    files: {
      id: string;
      name: string;
    }[];
  };
  permissionOperation?: {
    channel: string;
    role: string;
    permission: "invisible" | "read" | "write";
  };
}

export interface Session {
  id: string;
  scenarioId: string;
  name: string;
  audience: boolean;
  roles: Map<string, DiscordResource>;
  textChannels: Map<string, DiscordResource>;
  voiceChannels: Map<string, DiscordResource>;
}

type DiscordResource = {
  discordId: string;
  name: string;
};

type ScenarioLike = Omit<Scenario, "audienceRole"> & {
  audienceRole: { [key: string]: string };
};

type SessionLike = Omit<Session, "roles" | "textChannels" | "voiceChannels"> & {
  roles: { [key: string]: DiscordResource };
  textChannels: { [key: string]: DiscordResource };
  voiceChannels: { [key: string]: DiscordResource };
};

const STORAGE_KEY = "discordweb-murdermystery/store";

const saveStore = (store: Store) => {
  const masked = new Map<string, Profile>();
  store.profiles.forEach((pr) => {
    setCookie(`token/${pr.id}`, pr.token, {
      expires: 365,
      sameSite: "strict",
      secure: true,
    });
    pr.token = "";
    masked.set(pr.id, pr);
  });

  const scenerios: { [key: string]: ScenarioLike } = {};
  store.scenarios.forEach((s) => {
    scenerios[s.id] = {
      ...s,
      audienceRole: Object.fromEntries(s.audienceRole.entries()),
    };
  });

  const sessions: { [key: string]: SessionLike } = {};
  store.sessions.forEach((s) => {
    sessions[s.id] = {
      ...s,
      roles: Object.fromEntries(s.roles.entries()),
      textChannels: Object.fromEntries(s.textChannels.entries()),
      voiceChannels: Object.fromEntries(s.voiceChannels.entries()),
    };
  });

  const j = JSON.stringify({
    version: store.version,
    darkMode: store.darkMode,
    currentProfileId: store.currentProfileId,
    profiles: Object.fromEntries(masked),
    scenarios: scenerios,
    sessions: sessions,
  });
  localStorage.setItem(STORAGE_KEY, j);
};

const loadStore = () => {
  const j =
    typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
  if (!j) {
    return {
      version: VERSION,
      darkMode: true,
      currentProfileId: "",
      profiles: new Map(),
      scenarios: new Map(),
      sessions: new Map(),
    } as Store;
  }

  const { version, darkMode, currentProfileId, profiles, scenarios, sessions } =
    JSON.parse(j);

  const unmasked = new Map<string, Profile>();
  Object.values<Profile>(profiles).forEach((pr) => {
    unmasked.set(pr.id, { ...pr, token: getCookie(`token/${pr.id}`) ?? "" });
  });

  const mapScenarios = new Map<string, Scenario | ScenarioLike>(
    Object.entries(scenarios)
  );
  mapScenarios.forEach((s) => {
    mapScenarios.set(s.id, {
      ...s,
      audienceRole: new Map(Object.entries(s.audienceRole)),
    });
  });

  const mapSessions = new Map<string, Session | SessionLike>(
    Object.entries(sessions)
  );
  mapSessions.forEach((s) => {
    mapSessions.set(s.id, {
      ...s,
      roles: new Map(Object.entries(s.roles)),
      textChannels: new Map(Object.entries(s.textChannels)),
      voiceChannels: new Map(Object.entries(s.voiceChannels)),
    });
  });

  return {
    version,
    darkMode,
    currentProfileId,
    profiles: unmasked,
    scenarios: mapScenarios,
    sessions: mapSessions,
  } as Store;
};

interface StoreContext {
  store: Store;
  setStore: (store: Store) => void;
}

const _StoreContext = createContext<StoreContext>({
  store: loadStore(),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setStore: (store: Store) => {},
});

export const StoreProvider: FC<{
  children: ReactNode | ReactNode[];
}> = ({ children }) => {
  const context = useContext(_StoreContext);
  const [store, _setStore] = useState(context.store);

  const _context = {
    store,
    setStore: (_store: Store) => {
      saveStore(_store);
      _setStore(_store);
    },
  };

  useEffect(() => {
    _setStore(loadStore());
  }, []);

  return (
    <_StoreContext.Provider value={_context}>{children}</_StoreContext.Provider>
  );
};

export const useStore = () => {
  return useContext(_StoreContext);
};
