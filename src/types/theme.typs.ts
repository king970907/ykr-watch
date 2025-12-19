export type ThemeType = "slate" | "ocean" | "forest" | "midnight";

export interface ThemeConfig {
  name: string;
  bg: string;
  primary: string;
  border: string;
}

export const THEMES: Record<ThemeType, ThemeConfig> = {
  slate: {
    name: "經典深灰",
    bg: "bg-slate-500",
    primary: "sky",
    border: "border-slate-800",
  },
  ocean: {
    name: "深海藍",
    bg: "bg-blue-500",
    primary: "blue",
    border: "border-blue-900",
  },
  forest: {
    name: "森夜綠",
    bg: "bg-emerald-500",
    primary: "emerald",
    border: "border-emerald-900",
  },
  midnight: {
    name: "幻夜紫",
    bg: "bg-violet-500",
    primary: "violet",
    border: "border-violet-900",
  },
};
