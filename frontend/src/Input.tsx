import React, { useState } from "react";
import "./App.css";

export default function Input() {
    const [url, setUrl] = useState("");
    const [shortenUrl, setShortenUrl] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const API_URL = "http://localhost:3000";
    const isDisabled = !url.trim();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUrl(e.target.value);
    }

    function setResponse(errorValue: string, messageValue: string, shortenUrlValue: string) {
        setError(errorValue);
        setMessage(messageValue);
        const fullShortenUrl = shortenUrlValue ? `${API_URL}/${shortenUrlValue}` : "";
        setShortenUrl(fullShortenUrl);
    }

    async function handleSubmit() {
        await fetch(`${API_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setResponse(data.message, "", "");
                } else {
                    setResponse("", data.message, data.shorten_url);
                }
            })
            .catch((_) => {
                setResponse("An error occurred while shortening the URL.", "", "");
            });
    }

    return (
        <section className="bg-white border border-pink-100 rounded-3xl shadow-xl shadow-pink-50 p-8 space-y-6">
            <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-pink-500">Create</p>
                <h2 className="text-2xl font-semibold text-slate-900">Shorten a URL in one click</h2>
                <p className="text-sm text-slate-500">Paste your long link and get a friendly, shareable version.</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                    className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 text-base text-slate-800 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 placeholder:text-slate-400"
                    type="text"
                    value={url}
                    onChange={handleChange}
                    placeholder="Enter URL to shorten"
                />
                <button
                    onClick={handleSubmit}
                    disabled={isDisabled}
                    className={`inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition duration-200 bg-gradient-to-r from-pink-500 to-fuchsia-600 hover:shadow-pink-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 ${
                        isDisabled ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                >
                    Shorten
                </button>
            </div>

            {error && (
                <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700 text-sm font-medium">
                    {error}
                </p>
            )}
            {message && (
                <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700 text-sm font-medium">
                    {message}
                </p>
            )}

            {shortenUrl && (
                <div className="rounded-2xl border border-pink-100 bg-pink-50 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="space-y-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-600">Shortened URL</p>
                        <a
                            href={shortenUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold text-pink-700 hover:text-fuchsia-600 break-all"
                        >
                            {shortenUrl}
                        </a>
                    </div>
                    <a
                        href={shortenUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-pink-200 hover:shadow-pink-300"
                    >
                        Open
                    </a>
                </div>
            )}
        </section>
    );
}