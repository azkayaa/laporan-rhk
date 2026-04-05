import React, { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleAI = async () => {
    const res = await fetch("http://localhost:3001/api/ai", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        contents: [{ parts: [{ text }] }]
      })
    });
    const data = await res.json();
    setResult(JSON.stringify(data));
  };

  return (
    <div style={{padding:20}}>
      <h2>PSNK Report AI</h2>
      <textarea value={text} onChange={e=>setText(e.target.value)} />
      <br/>
      <button onClick={handleAI}>Kirim ke AI</button>
      <pre>{result}</pre>
    </div>
  );
}
