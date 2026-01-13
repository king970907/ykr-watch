import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { UserRole, type IUser } from "../types/user.type";
import type { IVideo } from "../types/video.type";
import type { IMessage } from "../types/message.type";
import {
  Send,
  Users,
  Shield,
  Play,
  Pause,
  Volume2,
  Link as LinkIcon,
  Trash2,
} from "lucide-react";

const EMOJIS = ["😊", "😂", "😍", "👏", "😮", "🔥", "🎉", "👍", "👎"];

const INITIAL_USERS: IUser[] = [
  {
    id: "1",
    name: "管理員 (你)",
    role: UserRole.ADMIN,
    avatar: "https://picsum.photos/seed/admin/40",
  },
  {
    id: "2",
    name: "小明",
    role: UserRole.VIEWER,
    avatar: "https://picsum.photos/seed/user1/40",
  },
  {
    id: "3",
    name: "小紅",
    role: UserRole.VIEWER,
    avatar: "https://picsum.photos/seed/user2/40",
  },
];

const LiveDemo: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  );
  const [inputUrl, setInputUrl] = useState("");
  const [videoState, setVideoState] = useState<IVideo>(() => ({
    url: videoUrl,
    playing: false,
    played: 0,
    volume: 0.8,
    lastUpdated: Date.now(),
  }));
  const [users, setUsers] = useState<IUser[]>(INITIAL_USERS);
  const [messages, setMessages] = useState<IMessage[]>(() => [
    {
      id: "m1",
      userId: "2",
      userName: "小明",
      text: "大家好！等一下看什麼？",
      timestamp: Date.now() - 5000,
    },
    {
      id: "m2",
      userId: "3",
      userName: "小紅",
      text: "準備好了嗎？🔥",
      timestamp: Date.now() - 2000,
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl) {
      setVideoUrl(inputUrl);
      setVideoState((prev) => ({
        ...prev,
        url: inputUrl,
        played: 0,
        playing: true,
      }));
      addSystemMessage(`管理員 更換影片源：${inputUrl}`);
      setInputUrl("");
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e?.preventDefault();
    if (chatInput.trim()) {
      const newMessage: IMessage = {
        id: Date.now().toString(),
        userId: "1",
        userName: "管理員",
        text: chatInput,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setChatInput("");
    }
  };

  const addEmoji = (emoji: string) => {
    const newMessage: IMessage = {
      id: Date.now().toString(),
      userId: "1",
      userName: "管理員",
      text: emoji,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const addSystemMessage = (message: string) => {
    const sysMsg: IMessage = {
      id: Date.now().toString(),
      userId: "0",
      userName: "系統訊息",
      text: message,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, sysMsg]);
  };

  const kickUser = (id: string) => {
    if (id === "1") return; // 管理員不能被踢
    const userName = users.find((u) => u.id === id)?.name;
    setUsers((prev) => prev.filter((u) => u.id !== id));
    addSystemMessage(`${userName} 已被移出房間`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full max-h-[1000px]">
      {/* Video區域 */}
      <div className="flex-1 flex flex-col gap-4">
        <form onSubmit={handleUrlSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <LinkIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="輸入 YouTube / Vimeo URL 或影片連結..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            更換
          </button>
        </form>

        {/* Player Container */}
        <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
          <ReactPlayer
            ref={playerRef}
            src={videoUrl}
            width="100%"
            height="100%"
            playing={videoState.playing}
            volume={videoState.volume}
            controls={true}
          ></ReactPlayer>
        </div>
      </div>

      {/* Chat區域 */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        {/* User List */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 flex flex-col h-48 overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-2 text-slate-300">
              <Users size={16} />
              <span className="text-sm font-bold">
                房間使用者 ({users.length})
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between group p-2 rounded hover:bg-slate-700/50"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    className="w-6 h-6 rounded-full"
                    alt={user.name}
                  />
                  <span
                    className={`text-xs ${
                      user.role === UserRole.ADMIN
                        ? "text-amber-400 font-bold"
                        : "text-slate-300"
                    }`}
                  >
                    {user.name}
                  </span>
                </div>
                {user.id !== "1" && (
                  <button
                    onClick={() => kickUser(user.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-rose-400 hover:text-rose-300 transition-all"
                    title="踢出使用者"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Chat Box */}
        <div className="flex-1 bg-slate-800 rounded-xl border border-slate-700 flex flex-col min-h-[300px] overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-700">
            <h3 className="text-sm font-bold text-slate-300">即時聊天室</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.userId === "1" ? "items-end" : "items-start"
                }`}
              >
                {msg.userId === "system" ? (
                  <div className="w-full text-center py-2">
                    <span className="text-[10px] bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">
                      {msg.text}
                    </span>
                  </div>
                ) : (
                  <>
                    <span className="text-[10px] text-slate-500 mb-1 px-1">
                      {msg.userName}
                    </span>
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                        msg.userId === "1"
                          ? "bg-sky-600 text-white rounded-tr-none"
                          : "bg-slate-700 text-slate-200 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="p-3 border-t border-slate-700 space-y-2">
            <div className="flex gap-1 overflow-x-auto py-1 no-scrollbar">
              {EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => addEmoji(emoji)}
                  className="text-lg hover:bg-slate-700 p-1 rounded transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="說點什麼..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg py-1.5 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              <button
                type="submit"
                className="p-1.5 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDemo;
