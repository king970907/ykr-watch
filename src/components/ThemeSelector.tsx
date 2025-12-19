import React, { useState } from "react";
import { Palette, Check } from "lucide-react";
import { THEMES, ThemeType } from "../types/theme.typs";

interface Props {
  currentTheme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
}

const ThemeSelector: React.FC<Props> = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-full text-slate-400 hover:text-white transition-colors"
      >
        <Palette size={16} />
        <span className="text-xs font-bold hidden sm:inline">
          {THEMES[currentTheme].name}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-2 space-y-1">
              {(Object.keys(THEMES) as ThemeType[]).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    onThemeChange(key);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all ${
                    currentTheme === key
                      ? "bg-sky-500/10 text-sky-400"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${THEMES[key].bg.replace(
                        "bg-",
                        "bg-"
                      )}`}
                    />
                    <span>{THEMES[key].name}</span>
                  </div>
                  {currentTheme === key && <Check size={14} />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSelector;
