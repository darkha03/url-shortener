import { useEffect, useState } from "react";

export default function Dashboard() {
    const [urls, setUrls] = useState([]);

    const API_URL = "http://localhost:3000";
    useEffect(() => {
        async function fetchUrls() {
            await fetch(`${API_URL}`)
                .then((res) => res.json())
                .then((data) => {
                    const date = new Date();
                    setUrls(data);
                    for (const url of data) {
                        const lastAccessed = new Date(url.last_update);
                        const timeDiff = date.getTime() - lastAccessed.getTime();
                        const daysDiff = timeDiff / (1000 * 3600 * 24);
                        url.expiredIn = daysDiff >= 30 ? "Expired" : `${Math.ceil(30 - daysDiff)} days`;
                        console.log(`URL: ${url.url}, Last Accessed: ${lastAccessed}, Expired In: ${url.expiredIn}`);
                    }
                })
                .catch((error) => console.error(error));
        }
        fetchUrls();
    }, []);

    return (
        <section className="bg-white border border-pink-100 rounded-3xl shadow-xl shadow-pink-50 p-8 space-y-6">
            <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-pink-500">Overview</p>
                <h2 className="text-2xl font-semibold text-slate-900">Dashboard</h2>
                <p className="text-sm text-slate-500">Track every link: original, shortened, visits, and expiry.</p>
            </div>

            <div className="overflow-x-auto">
                {urls.length ? (
                    <table className="w-full text-left text-sm text-slate-700">
                        <thead className="bg-gradient-to-r from-pink-50 to-fuchsia-50 text-pink-700 uppercase text-xs font-semibold tracking-wide">
                            <tr>
                                <th className="px-4 py-3 rounded-tl-2xl">Original URL</th>
                                <th className="px-4 py-3">Shortened URL</th>
                                <th className="px-4 py-3">Access Count</th>
                                <th className="px-4 py-3 rounded-tr-2xl">Expired In</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-pink-50">
                            {urls.map((url: any) => (
                                <tr key={url.id} className="hover:bg-pink-50/60 transition">
                                    <td className="px-4 py-3 font-medium text-slate-900 break-all">
                                        <a
                                            href={url.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-pink-700 hover:text-fuchsia-600"
                                        >
                                            {url.url}
                                        </a>
                                    </td>
                                    <td className="px-4 py-3 text-pink-700 break-all">
                                        <a
                                            href={`${API_URL}/${url.shorten_url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-semibold hover:text-fuchsia-600"
                                        >
                                            {`${API_URL}/${url.shorten_url}`}
                                        </a>
                                    </td>
                                    <td className="px-4 py-3 text-slate-900 font-semibold">{url.count}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                                                url.expiredIn === "Expired"
                                                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                                                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                            }`}
                                        >
                                            {url.expiredIn}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="rounded-2xl border border-pink-100 bg-pink-50 px-4 py-6 text-pink-700 text-sm font-medium">
                        No URLs yet. Shorten your first link to see it here.
                    </div>
                )}
            </div>
        </section>
    );
}