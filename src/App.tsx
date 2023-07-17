import { useEffect, useState } from 'react'
import "./wasm_exec.js";

// eslint-disable-next-line no-var
declare var window: Window & WasmWindow;

function App() {
  const [token, setToken] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    void (async () => {
      const go = new window.Go();
      const r = await WebAssembly.instantiateStreaming(fetch("/app.wasm"), go.importObject);
      go.run(r.instance);
    })();
  }, [])

  const handleStart = () => {
    const n = window.start(token);
    console.log(n);
    
    if (n.error) {
      setError(n.error);
    }
  }

  return (
    <>
      <input type="text" value={token} onChange={(e) => setToken(e.target.value)} />
      <button onClick={handleStart}>start</button>

      <div>{error}</div>
    </>
  )
}

export default App
