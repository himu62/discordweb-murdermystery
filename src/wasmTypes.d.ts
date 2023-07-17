interface WasmWindow {
  Go: {
    new (): {
      importObject: WebAssembly.Imports;
      run: (instance: WebAssembly.Instance) => void;
    };
  };
  ping: () => void;
  start: (token: string) => {
    error?: string;
    userName: string;
    guilds: { id: string; name: string }[];
  };
}
