import type React from "react";
import { useState } from "react";
import { ChevronRight, Loader2, RefreshCcw } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { THEMES } from "../../types/theme.typs";
import LiveDemo from "../LiveDemo";

const Content: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [spec, setSpec] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"demo" | "architecture">("demo");
  const { theme } = useTheme();

  const themeConfig = THEMES[theme];

  return (
    <main className={`${themeConfig.bg} flex-1 max-w-7xl w-full mx-auto p-6`}>
      {activeTab === "demo" ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-bold text-white mb-2">
              同步播放模擬環境
            </h2>
            <p className="text-slate-400">
              此處為模擬前端介面，展示了管理員如何控制同步進度、踢出使用者以及在聊天室互動。
              <span className="text-sky-400 ml-2 cursor-pointer hover:underline inline-flex items-center gap-1">
                了解更多同步原理 <ChevronRight size={14} />
              </span>
            </p>
          </div>
          <LiveDemo />
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-8 flex justify-between items-end">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-white mb-2">
                系統設計與規格
              </h2>
              <p className="text-slate-400">
                由 Gemini AI
                生成的技術架構建議。包含前端元件劃分、後端服務設計、WebSocket
                訊息流與核心程式碼實作。
              </p>
            </div>
            <button className="flex items-center gap-2 text-sm bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-lg transition-all">
              {loading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <RefreshCcw size={16} />
              )}
              重新生成
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Content;
