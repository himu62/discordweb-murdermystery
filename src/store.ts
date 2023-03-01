export interface Store {
  profiles: Profile[];
  scenarios: Scenario[];
  sessions: Session[];
}

interface Profile {
  id: string;
  name: string;
  guildId: string;
  token: string;
  clientId: string;
  gmUserId: string;
}

interface Scenario {
  id: string;
  name: string;
}

interface Session {
  id: string;
  name: string;
}

export const loadStore = () => {
  const s = window.localStorage.getItem("store");
  if (s) {
    return JSON.parse(s) as Store;
  }
  return {
    profiles: [],
    scenarios: [],
    sessions: [],
  } as Store;
};

export const saveStore = (store: Store) => {
  window.localStorage.setItem("store", JSON.stringify(store));
};
