import React, { useState } from 'react'
import './App.css'

function App() {
  const [url, setUrl] = useState("");
  const [shortenUrl, setShortenUrl] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setUrl(e.target.value);
  }

  async function handleSubmit() {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })  
    }).then(res => res.json())
    .then(data => {
      if (data.error){
        setError(data.error);
        setMessage("");
        setShortenUrl("");
      } else {
        setMessage("URL shortened successfully!");
        setShortenUrl(`${API_URL}/${data.shorten_url}`);
        setError("");
      }
    })
    .catch(_ => {
      setError("Failed to shorten URL. Please try again.");
      setMessage("");
      setShortenUrl("");
    })
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <h1>Welcome to URL Shortener</h1>
        </div>

        <div>
          <input type="text" placeholder="Enter your URL here" value={url} onChange={handleChange}/>
          <button onSubmit={handleSubmit}></button>
          {error && <p style={{ color: "red"}}>{error}</p>}
          {message && <p style={{ color: "green"}}>{message}</p>}
          {shortenUrl && 
            <p>
              Shorten Url <a href={`${shortenUrl}`}>{shortenUrl}</a>
            </p>}
        </div>
      </section>
    </>
  )
}

export default App
