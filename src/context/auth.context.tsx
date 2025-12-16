import { createContext, useState, type ReactNode } from "react";
import type { IUser } from "../types/user.type";

interface AuthContextValue {
  user: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "syncwatch_user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser) as IUser;
    } catch {
      return null;
    }
  });

  const login = (userData: IUser) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
