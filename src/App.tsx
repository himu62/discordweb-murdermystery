import { useEffect, useState } from 'react'
import "./wasm/wasm_exec.js";
import "./wasm/wasmTypes.d.ts";

function App() {
  const [num, setNum] = useState(0)
  const [hoge, setHoge] = useState(0)

  useEffect(() => {
    void (async () => {
      const go = new window.Go();
      const r = await WebAssembly.instantiateStreaming(fetch("/add.wasm"), go.importObject);
      go.run(r.instance);
    })();
  }, [])

  const handleAdd = () => {
    console.log("hoge");
    const n = window.add(num);
    setHoge(n);
  }

  return (
    <>
      <input type="text" value={num} onChange={(e) => setNum(parseInt(e.target.value))} />
      <button onClick={handleAdd}>add</button>

      <span>{hoge}</span>
    </>
  )
}

export default App
