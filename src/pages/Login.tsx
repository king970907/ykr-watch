import React, { useState } from "react";
import { Sparkles, ArrowRight, Shield, User as UserIcon } from "lucide-react";
import { UserRole, type IUser } from "../types/user.type";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.VIEWER);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newUser: IUser = {
      id: Math.random().toString(36).substring(7),
      name: name.trim(),
      role: role,
      avatar: `https://picsum.photos/seed/${name})}/40`,
    };

    login(newUser);
    navigate("/index", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0f172a]">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-8">
          <div className="inline-block bg-sky-500 p-4 rounded-2xl shadow-2xl shadow-sky-500/20 mb-4">
            <Sparkles className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">SyncWatch</h1>
          <p className="text-slate-400">進入多人同步影音空間</p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                你的暱稱
              </label>
              <div className="relative">
                <UserIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="例如：觀影達人"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-3">
                身分選擇
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole(UserRole.VIEWER)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                    role === UserRole.VIEWER
                      ? "bg-sky-500/10 border-sky-500 text-sky-400"
                      : "bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-600"
                  }`}
                >
                  <UserIcon size={24} />
                  <span className="text-sm font-bold">一般觀眾</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole(UserRole.ADMIN)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                    role === UserRole.ADMIN
                      ? "bg-amber-500/10 border-amber-500 text-amber-400"
                      : "bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-600"
                  }`}
                >
                  <Shield size={24} />
                  <span className="text-sm font-bold">管理員</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all group shadow-lg shadow-sky-600/20"
            >
              即刻加入房間
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-500 font-mono">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            目前在線使用者：128 人
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-600">
          系統將為您生成臨時 ID，關閉瀏覽器即失效，無需註冊。
        </p>
      </div>
    </div>
  );
};

export default Login;
