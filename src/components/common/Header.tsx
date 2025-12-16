import type React from "react";
import { useState } from "react";
import { Sparkles, Terminal, PlayCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"demo" | "architecture">("demo");
  const { user, logout } = useAuth();

  return (
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-sky-500 p-2 rounded-lg shadow-lg shadow-sky-500/20">
            <Sparkles className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              SyncWatch Assistant
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              多人同步影音平台設計助手
            </p>
          </div>
        </div>

        <nav className="flex bg-slate-800/50 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab("demo")}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === "demo"
                ? "bg-sky-600 text-white shadow-lg shadow-sky-600/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <PlayCircle size={18} />
            功能示範
          </button>
          <button
            onClick={() => setActiveTab("architecture")}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === "architecture"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Terminal size={18} />
            技術架構
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-3 bg-slate-800/30 px-3 py-1.5 rounded-full border border-slate-700/50">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          {user && (
            <div className="hidden md:flex items-center gap-3 bg-slate-900/30 px-3 py-1.5 rounded-full border border-slate-800">
              <img
                src={user.avatar}
                className="w-5 h-5 rounded-full"
                alt={user.name}
              />
              <span className="text-[10px] font-mono text-slate-400">
                {user.name} ({user.role})
              </span>
              <button
                onClick={logout}
                className="text-slate-500 hover:text-rose-400 transition-colors"
                title="登出"
              >
                <LogOut size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
