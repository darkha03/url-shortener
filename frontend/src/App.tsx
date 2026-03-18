import { useState } from 'react';
import Dashboard from './Dashboard';
import Input from './Input';
import './App.css';

function App() {
  const [inputVisible, setInputVisible] = useState(true);

  const navButton = (isActive: boolean) =>
    `px-4 py-2 text-sm font-semibold rounded-full transition duration-200 border border-white/20 shadow-sm ` +
    (isActive
      ? 'bg-white text-pink-600 shadow-lg shadow-pink-200'
      : 'text-white/90 hover:text-white');

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <header className="bg-gradient-to-r from-pink-500 to-fuchsia-600 rounded-3xl p-6 shadow-xl shadow-pink-300/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold tracking-[0.2em] text-white/80 uppercase">Lightning-fast links</p>
              <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">URL Shortener</h1>
              <p className="text-white/80 text-sm sm:text-base">Shorten, share, and track with a pink-violet touch.</p>
            </div>
            <nav className="flex items-center gap-3">
              <button className={navButton(inputVisible)} onClick={() => setInputVisible(true)}>
                Shorten URL
              </button>
              <button className={navButton(!inputVisible)} onClick={() => setInputVisible(false)}>
                Dashboard
              </button>
            </nav>
          </div>
        </header>

        <main>{inputVisible ? <Input /> : <Dashboard />}</main>
      </div>
    </div>
  );
}

export default App;
