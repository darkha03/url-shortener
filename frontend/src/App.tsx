import React, { useState } from 'react'
import './App.css'

function App() {
  const [url, setUrl] = useState("");
  const [shortenUrl, setShortenUrl] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const API_URL = "http://localhost:3000";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setUrl(e.target.value);
  }

  async function handleSubmit() {
    await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })  
    }).then(res => res.json())
    .then(data => {
      if (data.error){
        setError(data.message || "Failed to shorten URL. Please try again.");
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

    async function fetchUrls() {
      await fetch(`${API_URL}`)
        .then(res => res.json())
        .then(data => {
          const tableBody = document.getElementById("url-table-body");
          if (tableBody) {
            tableBody.innerHTML = "";
            data.forEach((url: { url: string; shorten_url: string; count: number }) => {
              const row = document.createElement("tr");
              row.innerHTML = `
                <td>${url.url}</td>
                <td><a href="${API_URL}/${url.shorten_url}">${API_URL}/${url.shorten_url}</a></td>
                <td>${url.count}</td>
              `;
              tableBody.appendChild(row);
            });
          }
        })
        .catch(_ => {
          console.error("Failed to fetch URLs.");
        });
    }

    fetchUrls();
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <h1>Welcome to URL Shortener</h1>
        </div>

        <div>
          <input type="text" placeholder="Enter your URL here" value={url} onChange={handleChange}/>
          <button onClick={handleSubmit}> Shorten URL</button>
          {error && <p style={{ color: "red"}}>{error}</p>}
          {message && <p style={{ color: "green"}}>{message}</p>}
          {shortenUrl && 
            <p>
              Shorten Url <a href={`${shortenUrl}`}>{shortenUrl}</a>
            </p>}
        </div>
        <div>
          <h3>Url Dashboard</h3>
          <p>View all shortened URLs and their access counts.</p>
          <table>
            <thead>
              <tr>
                <th>Original URL</th>
                <th>Shortened URL</th>
                <th>Access Count</th>
              </tr>
            </thead>
            <tbody id="url-table-body">
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default App
